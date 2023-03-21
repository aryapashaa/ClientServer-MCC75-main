using API.Models;
using System.ComponentModel.DataAnnotations;

namespace API.ViewModels;

public class RegisterVM
{
    public string NIK { get; set; }
    public string FirstName { get; set; }
    public string? LastName { get; set; }
    public DateTime BirthDate { get; set; }
    public GenderEnum Gender { get; set; }
    public DateTime HiringDate { get; set; }
    [EmailAddress]
    public string Email { get; set; }
    [Phone]
    public string? PhoneNumber { get; set; }
    public string Major { get; set; }
    [MaxLength(2, ErrorMessage = "Ex : D3/S1/S2"), MinLength(2, ErrorMessage = "Ex : D3/S1/S2")]
    public string Degree { get; set; }
    [Range(0, 4, ErrorMessage = "The value should be more than {1} and less than {2}")]
    public double GPA { get; set; }
    public string UniversityName { get; set; }
    [StringLength(255, ErrorMessage = "The {0} must be at least {2} and at max {1} characters long.", MinimumLength = 6)]
    public string Password { get; set; }
    [Compare(nameof(Password), ErrorMessage = "The password and confirmation password do not match.")]
    public string ConfirmPassword { get; set; }
}
