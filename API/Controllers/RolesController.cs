using API.Repositories.Data;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using API.Base;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class RolesController : BaseController<int, Role, RoleRepository>
{
    public RolesController(RoleRepository repository) : base(repository)
    {
    }
}
