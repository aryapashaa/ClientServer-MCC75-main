using System.Text.Json;
using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models;

[Table("tb_tr_profilings")]
public class Profiling
{
    [Key, Column("id")]
    public int Id { get; set; }
    [Required, Column("employee_nik", TypeName = "nchar(5)")]
    public string EmployeeNIK { get; set; }
    [Required, Column("education_id")]
    public int EducationId { get; set; }


    // Cardinality
    [JsonIgnore]
    [ForeignKey(nameof(EducationId))]
    public Education? Education { get; set; }
    [JsonIgnore]
    [ForeignKey(nameof(EmployeeNIK))]
    public Employee? Employees { get; set; }
}
