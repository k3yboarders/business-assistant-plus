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

    public IActionResult About()
    {
        return View();
    }

    public IActionResult Chart()
    {
        return View();
    }

    public IActionResult Privacy()
    {
        return View();
    }

    public IActionResult Contact()
    {
        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}