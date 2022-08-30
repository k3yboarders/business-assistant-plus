using System.ComponentModel.DataAnnotations.Schema;

namespace CMP.Models;

public class TaxationType
{
    public int TaxationTypeId { get; set; } = 0;

    [Column(TypeName = "VARCHAR(25)")] public string TypeName { get; set; } = "";
}