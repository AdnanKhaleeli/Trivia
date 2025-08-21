using Microsoft.OpenApi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Builder;
using TriviaAPI.Models;
using TriviaAPI.MyHub;




var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSignalR(); //Allow for SignalR


builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Trivia API",
        Version = "v1"
    });
});


var myLocalIp = "http://192.168.12.172:5173"; 
var localhost = "http://localhost:5173";

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy => policy.WithOrigins("http://192.168.12.172:5173") // React dev server Need to adjust for other use.
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials());
});


// Setting up the Database
builder.Services.AddDbContext<TriviaContext>(options =>
    options.UseMySql(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("DefaultConnection"))
    ));
var app = builder.Build();

// Use middleware
app.UseCors("AllowReactApp");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();

app.MapControllers();

//Mapping the SignalR endpoint to /Triviahub
app.MapHub<TriviaHub>("/triviahub");

app.Run();