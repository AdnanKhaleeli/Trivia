using System.ComponentModel.DataAnnotations;
using TriviaAPI.Models;
namespace TriviaAPI.Dtos; 

public class SignUpDto
{
    [Required(ErrorMessage = "Name Attribute is required")]
    public required string Name { get; set; }

    [Required(ErrorMessage = "Email is required.")]
    [EmailAddress(ErrorMessage = "Invalid email format.")]
    public required string Email { get; set; }

    [Required(ErrorMessage = "Password is required.")]
    [DataType(DataType.Password)]
    public required string Pwd { get; set; }

    [Required(ErrorMessage = "Role is Required")]
    public required Role Role { get; set; }
}