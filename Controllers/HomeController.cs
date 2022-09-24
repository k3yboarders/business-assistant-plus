using System.Diagnostics;
using CMP.Data;
using CMP.Models;
using Microsoft.AspNetCore.Mvc;

namespace CMP.Controllers;

public class HomeController : Controller
{
    private readonly ApplicationDbContext _context;
    private readonly ILogger<HomeController> _logger;

    public HomeController(ILogger<HomeController> logger, ApplicationDbContext context)
    {
        _logger = logger;
        _context = context;
    }


    public IActionResult Index()
    {
        var Quote = new List<Quote>();
        var query = from b in _context.Quotes select b;
        foreach (var item in query) Quote.Add(item);
        Random r = new Random();
        int x = r.Next(1, Quote.Count-1);
        var result = Quote[x].QuoteText;
        ViewBag.quote = result;
        return View();
    }

    public IActionResult Calculator()
    {
        var ActivityTypes = new List<TypeOfActivity>();
        var TaxationTypes = new List<TaxationType>();
        var query = from b in _context.TypeOfActivity
            select b;
        foreach (var item in query) ActivityTypes.Add(item);
        ViewBag.ListOfTypes = ActivityTypes;
        return View();
    }

    public IActionResult RegularCalculator()
    {
        return View();
    }
    
    
    public IActionResult Privacy()
    {
        return View();
    }
    

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
