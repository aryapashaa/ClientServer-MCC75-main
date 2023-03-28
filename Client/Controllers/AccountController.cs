using Client.Base;
using Client.Repositories.Data;
using Client.Models;
using Microsoft.AspNetCore.Mvc;

namespace Client.Controllers;

public class AccountController : BaseController<Account, AccountRepository, int>
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

    public IActionResult Create()
    {
        return View();
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Create(Account account)
    {
        var result = await _accountRepository.Post(account);
        if (result.Status == 200)
        {
            RedirectToAction("Index");
        }
        return View();
    }
}
