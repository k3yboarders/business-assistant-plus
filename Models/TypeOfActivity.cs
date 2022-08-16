namespace CMP.Models;
using System.ComponentModel.DataAnnotations.Schema;

public class TypeOfActivity
{
    public int TypeOfActivityId { get; set; } = 0;
    [Column(TypeName = "VARCHAR(150)")]
    public string ActivityName { get; set; } = "";
    public List<ApplicationUser>? ApplicationUsers { get; set; }
    public float Percentage { get; set; } = 0.0f;
}
