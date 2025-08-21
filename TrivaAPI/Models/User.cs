namespace TriviaAPI.Models;


public enum Role {
    Admin, 
    Member
}


public class User() {
    
    public int UserId { get; set; } 
    public required string Name {get; set;}
    public required string  Email { get; set; }
    public required string Pwd {get; set;}
    public required Role Role {get; set;}
    public Team? Team { get; set; }
    
  
  

}