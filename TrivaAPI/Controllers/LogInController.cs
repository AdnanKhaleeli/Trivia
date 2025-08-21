using Microsoft.AspNetCore.Mvc; 
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity; 
using TriviaAPI.Models;
using TriviaAPI.Dtos;

namespace TriviaApi.Controllers; 

[ApiController]
[Route("api/[controller]")]
public class LoginController : ControllerBase 
{

    private readonly TriviaContext _context;

    public LoginController(TriviaContext context) 
    {
        _context = context;
    }


    [HttpPost]
    public IActionResult Login( [FromBody] LoginDto loginDto ) 
    {

        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        
        var userInDb = _context.Users.Include(u => u.Team).FirstOrDefault(u => u.Email == loginDto.Email);
    
        
        if (userInDb == null)
        {
            return Unauthorized("Invalid credentials");
        }

        var hasher = new PasswordHasher<User>();
        var result = hasher.VerifyHashedPassword(userInDb, userInDb.Pwd, loginDto.Pwd);



    if (result == PasswordVerificationResult.Success)
    {
      
        return Ok(new
        {
            userId = userInDb.UserId,
            name = userInDb.Name,
            email = userInDb.Email,
            role = userInDb.Role,
            team = userInDb.Team
        });
    }
    else
    {
        
        return Unauthorized("Invalid credentials");
    }
    }




}