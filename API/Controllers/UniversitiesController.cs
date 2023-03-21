using API.Repositories.Data;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using API.Base;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers;
[Route("api/[controller]")]
[ApiController]
[Authorize]
public class UniversitiesController : BaseController<int, University, UniversityRepository>
{
    public UniversitiesController(UniversityRepository repository) : base(repository)
    {
    }
}
