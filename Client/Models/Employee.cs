using System.Text.Json;
using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Client.Models;

[Table("tb_m_employees")]
public class Employee
{
	[Key, Column("nik", TypeName = "nchar(5)")]
	public string? NIK { get; set; }
	[Required, Column("first_name"), MaxLength(50)]
	public string? FirstName { get; set; }
	[Column("last_name"), MaxLength(50)]
	public string? LastName { get; set; }
	[Required, Column("birthdate")]
	public DateTime BirthDate { get; set; }
	[Required, Column("gender")]
	public GenderEnum Gender { get; set; }
	[Required, Column("hiring_date")]
	public DateTime HiringDate { get; set; } = DateTime.Now;
	[Required, Column("email"), MaxLength(50)]
	public string? Email { get; set; }
	[Column("phone_number"), MaxLength(20)]
	public string? PhoneNumber { get; set; }
	[Column("manager_id", TypeName = "nchar(5)")]
	public string? ManagerId { get; set; }


	// Cardinality
	[JsonIgnore]
	public ICollection<Profiling>? Profilings { get; set; }
	[JsonIgnore]
	public Account? Account { get; set; }

	[JsonIgnore]
	public ICollection<Employee>? Employees { get; set; }
	[JsonIgnore]
	public Employee? Manager { get; set; }
}

public enum GenderEnum
{
	Male,
	Female
}