using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using CMP.Models;


namespace CMP.Data;

public partial class ApplicationDbContext : IdentityDbContext<ApplicationUser>
{
 
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }



    public DbSet<CMP.Models.ApplicationUser>? ApplicationUser { get; set; }
    public DbSet<CMP.Models.TypeOfActivity>? TypeOfActivity { get; set; }

}
