using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc; 
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
namespace TriviaAPI.Dtos;  


public class JoinTeamDto
{
    [Required(ErrorMessage = "UserID is required.")]
    public required int UserId { get; set; } 

    [Required(ErrorMessage = "TeamID is required.")]
    public required int TeamId { get; set; }
}