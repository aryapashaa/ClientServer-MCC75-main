using API.Contexts;
using API.Models;

namespace API.Repositories.Data;

public class EducationRepository : GeneralRepository<int, Education>
{
    public EducationRepository(MyContext context) : base(context)
    {
    }
}
