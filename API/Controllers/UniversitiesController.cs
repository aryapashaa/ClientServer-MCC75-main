using API.Repositories.Data;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using API.Base;

namespace API.Controllers;
[Route("api/[controller]")]
[ApiController]
//[Authorize]
public class UniversitiesController : BaseController<int, University, UniversityRepository>
{
    public UniversitiesController(UniversityRepository repository) : base(repository)
    {
    }
}
