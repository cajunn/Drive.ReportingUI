namespace Drive.ReportingUI.Web.Helpers
{
    public static class DateTimeOffsetExtensions
    {
        public static string ToServerLocalDisplay(this DateTimeOffset utcDate)
        {
            // Convert to local time zone of the server
            var local = utcDate.ToLocalTime();

            var zone = TimeZoneInfo.Local;
            var abbreviation = zone.IsDaylightSavingTime(local) 
                ? "ADT" : "AST";// TODO : this is bad 

            // Format the date time for display (e.g., "MM/dd/yyyy HH:mm:ss")
            return $"{local:yyyy-MM-dd HH:mm:ss} {abbreviation}";
        }
    }
}
