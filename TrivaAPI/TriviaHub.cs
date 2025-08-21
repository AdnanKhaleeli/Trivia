using Microsoft.AspNetCore.SignalR; 
using Microsoft.EntityFrameworkCore;
using TriviaAPI.Models;

namespace TriviaAPI.MyHub; 

public class TriviaHub : Hub 
{

    private static (string Question, string Answer, int Points )? _latestQuestion;
    private readonly TriviaContext _context;


    public TriviaHub(TriviaContext context) {
        _context = context;
    }


    //The client calls this message method
    public async Task SendMessageAsync(string name, string message, bool isSystem, Team? team = null) {
        
        //Sever calls the RecieveMessage on the Server side
        await Clients.All.SendAsync("ReceiveMessage", name, message, isSystem, null);

       if (_latestQuestion.HasValue)
        {
        var q = _latestQuestion.Value;

        if (!string.IsNullOrEmpty(message) && !string.IsNullOrEmpty(q.Answer) &&
            message.Contains(q.Answer, StringComparison.OrdinalIgnoreCase))
        {
        
            await Clients.All.SendAsync("ReceiveMessage", "System", $"{name} got the right answer! {_latestQuestion.Value.Points} points to team {team.TeamName}", true, team );
            var winningTeam = _context.Team.FirstOrDefault(t => t.TeamId ==  team.TeamId); 
            winningTeam.Points += _latestQuestion.Value.Points;
            _context.SaveChanges();
            _latestQuestion = null;
        }
    }


    }

    public async Task SendQuestionAsync(string question, string answer, int points )
    {
        _latestQuestion = (question, answer, points);
        await Clients.All.SendAsync("ReceiveQuestion", question, answer, points);
    }

     public override async Task OnConnectedAsync()
    {
        if (_latestQuestion.HasValue)
        {
            var q = _latestQuestion.Value;
            // Send the latest question only to the newly connected client
            await Clients.Caller.SendAsync("ReceiveQuestion", q.Question, q.Answer, q.Points);
        }

        await base.OnConnectedAsync();
    }
}