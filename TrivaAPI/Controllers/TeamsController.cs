

using Microsoft.AspNetCore.Mvc; 
using Microsoft.EntityFrameworkCore;
using TriviaAPI.Models;

namespace TriviaAPI.Controllers;


[ApiController]
[Route("api/[controller]")] 
public class TeamsController : ControllerBase 
{
    private readonly TriviaContext _context; 

    public TeamsController(TriviaContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IActionResult getTeams()
    {
        return Ok(_context.Team);
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id) 
    {
        var team = _context.Team
        .Include(t => t.Members)
        .Where(t => t.TeamId == id)
        .Select(t => new 
        {
            t.TeamId,
            t.TeamName,
            t.Points,
            Members = t.Members.Select(m => new
            {
                m.UserId,
                m.Name
                // add other user fields you want to expose here
            }).ToList()
        })
        .FirstOrDefault();

        if (team == null)
                return NotFound();

        return Ok(team);
    }
}