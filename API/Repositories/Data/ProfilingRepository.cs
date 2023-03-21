using API.Contexts;
using API.Models;

namespace API.Repositories.Data;

public class ProfilingRepository : GeneralRepository<int, Profiling>
{
    public ProfilingRepository(MyContext context) : base(context)
    {
    }
}
