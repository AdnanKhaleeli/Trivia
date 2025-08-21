using System.Text.Json.Serialization;
namespace TriviaAPI.Models; 


public class Team 
{

    public int TeamId { get; set; }
    public required string TeamName { get; set; } 
    public required int Points { get; set; }
    [JsonIgnore]
    public ICollection<User> Members { get; set; } = new List<User>();
}