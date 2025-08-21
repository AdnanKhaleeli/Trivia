using Microsoft.EntityFrameworkCore; 

namespace TriviaAPI.Models;

public class TriviaContext : DbContext
{ 

    public DbSet<User> Users {get; set;}
    public DbSet<Team> Team {get; set;}

    public TriviaContext(DbContextOptions<TriviaContext> options) : base(options)
    {

    }




protected override void OnModelCreating(ModelBuilder modelBuilder)
{
   
    modelBuilder.Entity<User>()
        .HasIndex(u => u.Email)
        .IsUnique();

    
    modelBuilder.Entity<Team>()
        .HasData( 
            new Team {TeamId = 1, TeamName = "UN", Points = 0},
            new Team {TeamId = 2, TeamName = "Shenangians", Points = 0},
            new Team {TeamId = 3, TeamName = "Andy Mustache", Points = 0},
            new Team {TeamId = 4, TeamName = "Vegie Mart", Points = 0}
        );


    base.OnModelCreating(modelBuilder);

}



}