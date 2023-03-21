using API.Repositories.Data;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using API.Base;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
//[Authorize]
public class RolesController : BaseController<int, Role, RoleRepository>
{
    public RolesController(RoleRepository repository) : base(repository)
    {
    }
}
