using Client.Base;
using Client.Repositories.Data;
using Client.Models;
using Microsoft.AspNetCore.Mvc;
using Client.ViewModels;

namespace Client.Controllers;

public class AccountController : BaseController<Account, AccountRepository, string>
{
	private readonly AccountRepository _accountRepository;

	public AccountController(AccountRepository repository) : base (repository)
    {
		this._accountRepository = repository;
	}
    public IActionResult Index()
    {
        return View();
    }

    public IActionResult Register()
    {
        return View();
    }

    [HttpPost]
    //[ValidateAntiForgeryToken]
    public async Task<IActionResult> Register(Account account)
    {
        var result = await _accountRepository.Post(account);
        if (result.StatusCode == "200")
        {
            RedirectToAction("Index");
        }
        return View();
    }
    [HttpGet]
    public IActionResult Login()
    {
        return View();
    }

    [HttpPost]
    //[ValidateAntiForgeryToken]
    public async Task<IActionResult> Login(LoginVM entity)
    {
        var result = await _accountRepository.Login(entity);
        if (result.StatusCode == "200")
        {
            return RedirectToAction("Index","Home");
        }
        return View();
    }
}
