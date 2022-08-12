using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using CMP.Data;
using NuGet.Common;

namespace CMP.Models;

public class ApplicationUser : IdentityUser
{
    [PersonalData]
    public string FirstName { get; set; }
    [PersonalData]
    public string LastName { get; set; }
    [PersonalData]
    public DateTime BirthDate { get; set; }
    [PersonalData]
    public string? Fax { get; set; }
    [PersonalData]
    public int TaxationTypeId { get; set; }
    public TaxationType? TaxationType { get; set; }
    public int TypeOfActivityId { get; set; }
    public TypeOfActivity? TypeOfActivity { get; set; }

}