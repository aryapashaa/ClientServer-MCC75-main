using API.Repositories.Data;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using API.Base;

namespace API.Controllers;
[Route("api/[controller]")]
[ApiController]
public class EducationsController : BaseController<int, Education, EducationRepository>
{
    public EducationsController(EducationRepository repository) : base(repository)
    {
    }
}
