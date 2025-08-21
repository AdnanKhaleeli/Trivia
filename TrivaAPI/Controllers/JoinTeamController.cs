using Microsoft.AspNetCore.Mvc;
using TriviaAPI.Models;
using TriviaAPI.Dtos;
using System.Linq;   




[ApiController]
[Route("api/[controller]")]
public class JoinTeamController : ControllerBase 
{

    private readonly TriviaContext _context; 

    public JoinTeamController(TriviaContext context) 
    {
        _context = context;
    }

    [HttpPost]
    public IActionResult JoinTeam([FromBody] JoinTeamDto Dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);


        var team = _context.Team.FirstOrDefault(t => t.TeamId ==  Dto.TeamId);
        var user = _context.Users.FirstOrDefault(u => u.UserId == Dto.UserId);  
        
        if(user == null || team == null) 
        {
            return NotFound("Error Team or User not found"); 
        }

        user.Team = team; 

        _context.SaveChanges(); 

        return Ok(user);
        

        
    }


}