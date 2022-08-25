using System.Diagnostics;
using CMP.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using CMP.Models;
using Microsoft.AspNetCore.Identity;

namespace CMP.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;
    private readonly ApplicationDbContext _context;
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
    {/*
        using (_context)
        {
            List<TypeOfActivity> types = new List<TypeOfActivity>();
            var query = from b in _context.TypeOfActivity
                select b;
            foreach (var item in query)
            {
                types.Add(item);
            }

            ViewBag.ListOfTypes = types;
        }*/

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