using Client.Base;
using Client.Models;
using Client.Repositories.Data;
using Microsoft.AspNetCore.Mvc;
using NuGet.Protocol.Core.Types;

namespace Client.Controllers;

public class UniversityController : BaseController<University,UniversityRepository,int>
{
	private readonly UniversityRepository _universityrepository;

	public UniversityController(UniversityRepository repository) : base(repository)
	{
		this._universityrepository = repository;
	}
	// Index
	public async Task<IActionResult> Index()
	{
		var result = await _universityrepository.Get();
		var universities = new List<University>();

		if (result.Data != null)
		{
			universities = result.Data.ToList();
		}

		return View(universities);
	}

	// Details
    public async Task<IActionResult> Details(int id)
    {
        var result = await _universityrepository.Get(id);
        return View(result.Data);
    }

    // Create - GET
    [HttpGet]
	public async Task<IActionResult> Create()
	{
		return View();
	}

	// Create - POST
	[HttpPost]
	[ValidateAntiForgeryToken]
	public async Task<IActionResult> Create(University university)
	{
		if (ModelState.IsValid)
		{
			var result = await _universityrepository.Post(university);
			if (result.StatusCode == "200")
			{
				TempData["Success"] = "Data berhasil masuk";
				return RedirectToAction(nameof(Index));
			}
			else if (result.StatusCode == "409")
			{
				ModelState.AddModelError(string.Empty, result.Message);
				return View();
			}
		}
		return View();
	}

    // Edit - GET
    [HttpGet]
    public async Task<IActionResult> Edit(int id)
    {
		var result = await _universityrepository.Get(id);
		return View(result.Data);
	}

    // Edit - POST
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Edit(University university, int id)
    {
        if (ModelState.IsValid)
        {
            var result = await _universityrepository.Put(university, id);
            if (result.StatusCode == "200")
            {
                TempData["Success"] = "Data berhasil diedit";
                return RedirectToAction(nameof(Index));
            }
            else if (result.StatusCode == "409")
            {
                ModelState.AddModelError(string.Empty, result.Message);
                return View();
            }
        }
        return View();
    }

    // Delete - GET
    [HttpGet]
    public async Task<IActionResult> Delete(int id)
    {
        var result = await _universityrepository.Get(id);
        return View(result.Data);
	}

    // Delete - POST
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Remove(int id)
    {
        if (ModelState.IsValid)
        {
            var result = await _universityrepository.Delete(id);
            if (result.StatusCode == "200")
            {
                TempData["Success"] = "Data berhasil dihapus";
                return RedirectToAction(nameof(Index));
            }
            else if (result.StatusCode == "409")
            {
                ModelState.AddModelError(string.Empty, result.Message);
                return View();
            }
        }
        return View();
    }
}
