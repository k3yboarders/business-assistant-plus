using CMP.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace CMP.Data;

public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }


    public DbSet<ApplicationUser>? ApplicationUser { get; set; }
    public DbSet<TypeOfActivity>? TypeOfActivity { get; set; }
    public DbSet<Quote>? Quotes { get; set; }
}