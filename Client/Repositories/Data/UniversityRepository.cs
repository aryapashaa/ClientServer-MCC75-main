using Client.Models;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using System.Net.Http;

namespace Client.Repositories.Data;

public class UniversityRepository : GeneralRepository<University, int>
{
	public UniversityRepository(string request = "Universities/") : base(request)
	{
	}
}
