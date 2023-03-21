using Microsoft.AspNetCore.Mvc;

namespace Client.Controllers;

public class ValorantController : Controller
{
    public IActionResult Index()
    {
        return View();
    }
}
