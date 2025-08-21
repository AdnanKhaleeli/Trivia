using Microsoft.AspNetCore.Mvc; 
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using TriviaAPI.Models;
using TriviaAPI.Dtos;

namespace TriviaApi.Controllers;

      [ApiController]
      [Route("api/[controller]")]
    public class SignupController : ControllerBase
    {

        private readonly TriviaContext _context; 

        public SignupController(TriviaContext context) 
        {
            _context = context;
        }


    [HttpPost]
    public IActionResult SignUp([FromBody] SignUpDto registrationDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var hasher = new PasswordHasher<User>();
        string hashed = hasher.HashPassword(null, registrationDto.Pwd);

        User user = new User
        {
            Name = registrationDto.Name,
            Email = registrationDto.Email,
            Pwd = hashed,
            Role = registrationDto.Role
        };

        _context.Users.Add(user);
        _context.SaveChanges();



        return StatusCode(201, user);
    }

    

    } 
