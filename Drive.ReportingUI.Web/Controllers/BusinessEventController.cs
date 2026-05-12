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

    [HttpGet]
    public IActionResult Metadata(Guid eventId)
    {
        var metadata = _context.BusinessEventMetadata
            .Where(m => m.EventId == eventId)
            .OrderBy(m => m.MetadataKey)
            .Select(x => new
            {
                x.MetadataKey,
                x.EntityType,
                x.EntityId,
                x.MetadataValue,
                x.DataType
            })
            .ToList();

        return Json(metadata);
    }
}