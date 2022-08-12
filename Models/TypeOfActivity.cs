namespace CMP.Models;

public class TypeOfActivity
{
    public int TypeOfActivityId { get; set; }
    public string ActivityName { get; set; }
    public List<ApplicationUser>? ApplicationUsers { get; set; }
}