using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TriviaAPI.Models;

namespace TriviaApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class UsersController : ControllerBase
{
    private readonly TriviaContext _context;

    public UsersController(TriviaContext context)
    {
        _context = context;
    }

    [HttpGet("test-connection")]
    public IActionResult TestConnection()
    {
        try
        {
            _context.Database.CanConnect();
            return Ok("Successfully connected to the Triva database!");
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Failed to connect to the database: {ex.Message}");
        }
    }

    [HttpGet]
    public async Task<IActionResult> GetUsers()
    {
        var users = await _context.Users.ToListAsync();
        return Ok(users);
    }
}