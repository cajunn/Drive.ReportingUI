using Drive.ReportingUI.Web.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

public class BusinessEventController : Controller
{
    private readonly ReportingDbContext _context;
    public BusinessEventController(ReportingDbContext context) => _context = context;

    public async Task<IActionResult> Index()
    {
        var events = await _context.BusinessEvents
            .OrderByDescending(e => e.EventTimestamp)
            .ToListAsync();
        return View(events);
    }
}