using Microsoft.EntityFrameworkCore;

namespace CMP.Models;

public class Quote
{
    public int QuoteId { get; set; }
    public string QuoteText { get; set; } = "";
}
