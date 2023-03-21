﻿using API.Base;
using API.Models;
using API.Repositories.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
//[Authorize]
public class EmployeesController : BaseController<string, Employee, EmployeeRepository>
{
    public EmployeesController(EmployeeRepository repository) : base(repository)
    {
    }
}
