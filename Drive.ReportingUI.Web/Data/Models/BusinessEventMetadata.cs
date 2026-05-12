namespace Drive.ReportingUI.Web.Data.Models
{
    public class BusinessEventMetadata
    {
        public Guid EventId { get; set; }
        public string MetadataKey { get; set; } = "";
        public string? EntityType { get; set; }
        public string? EntityId { get; set; }
        public string? MetadataValue { get; set; }
        public string? DataType { get; set; }
    }
}
