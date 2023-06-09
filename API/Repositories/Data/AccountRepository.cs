﻿using API.Contexts;
using API.Handlers;
using API.ViewModels;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories.Data;

public class AccountRepository : GeneralRepository<string, Account>
{
    private readonly MyContext context;

    public AccountRepository(MyContext context) : base(context)
    {
        this.context = context;
    }

    public async Task<int> Register(RegisterVM registerVM)
    {
        int result = 0;
        University university = new University
        {
            Name = registerVM.UniversityName
        };

        // Bikin kondisi untuk mengecek apakah data university sudah ada
        if (await context.Universities.AnyAsync(u => u.Name == university.Name))
        {
            university.Id = context.Universities.FirstOrDefault(u => u.Name == university.Name).Id;
        }
        else
        {
            await context.Universities.AddAsync(university);
            result = await context.SaveChangesAsync();
        }

        Education education = new Education
        {
            Major = registerVM.Major,
            Degree = registerVM.Degree,
            GPA = registerVM.GPA,
            UniversityId = university.Id
        };
        await context.Educations.AddAsync(education);
        result = await context.SaveChangesAsync();

        Employee employee = new Employee
        {
            NIK = registerVM.NIK,
            FirstName = registerVM.FirstName,
            LastName = registerVM.LastName,
            BirthDate = registerVM.BirthDate,
            Gender = registerVM.Gender,
            HiringDate = registerVM.HiringDate,
            Email = registerVM.Email,
            PhoneNumber = registerVM.PhoneNumber,
        };
        await context.Employees.AddAsync(employee);
        result = await context.SaveChangesAsync();

        Account account = new Account
        {
            EmployeeNIK = registerVM.NIK,
            Password = Hashing.HashPassword(registerVM.Password),
        };
        await context.Accounts.AddAsync(account);
        result = await context.SaveChangesAsync();

        AccountRole accountRole = new AccountRole
        {
            AccountNIK = registerVM.NIK,
            RoleId = 2
        };

        await context.AccountRoles.AddAsync(accountRole);
        result = await context.SaveChangesAsync();

        Profiling profiling = new Profiling
        {
            EmployeeNIK = registerVM.NIK,
            EducationId = education.Id
        };
        await context.Profilings.AddAsync(profiling);
        result = await context.SaveChangesAsync();

        return result;
    }
    public async Task<bool> Login(LoginVM loginVM)
    {
        var getAccount = await context.Employees
            .Include(e => e.Account)
            .Select(e => new LoginVM
            {
                Email = e.Email,
                Password = e.Account.Password
            }).SingleOrDefaultAsync(a => a.Email == loginVM.Email);

        if (getAccount is null)
        {
            return false;
        }

        return Hashing.ValidatePassword(loginVM.Password, getAccount.Password);
    }
    public async Task<UserdataVM> GetUserdata(string email)
    {
        var userdata = await (from e in context.Employees
                              join a in context.Accounts
                              on e.NIK equals a.EmployeeNIK
                              join ar in context.AccountRoles
                              on a.EmployeeNIK equals ar.AccountNIK
                              join r in context.Roles
                              on ar.RoleId equals r.Id
                              where e.Email == email
                              select new UserdataVM
                              {
                                  Email = e.Email,
                                  FullName = String.Concat(e.FirstName, " ", e.LastName)
                              }).FirstOrDefaultAsync();

        return userdata;
    }
    public async Task<IEnumerable<string>> GetRolesByNIK(string email)
    {
        var getNIK = await context.Employees.FirstOrDefaultAsync(e => e.Email == email);
        return await context.AccountRoles.Where(ar => ar.AccountNIK == getNIK.NIK).Join(
            context.Roles,
            ar => ar.RoleId,
            r => r.Id,
            (ar, r) => r.Name).ToListAsync();
    }
}
