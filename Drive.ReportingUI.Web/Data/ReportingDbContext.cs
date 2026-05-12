using Drive.ReportingUI.Web.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace Drive.ReportingUI.Web.Data
{
    public class ReportingDbContext : DbContext
    {
        public ReportingDbContext(DbContextOptions<ReportingDbContext> options) : base(options) { }

        public DbSet<BusinessEvent> BusinessEvents { get; set; }
        public DbSet<BusinessEventMetadata> BusinessEventMetadata { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<BusinessEvent>(entity =>
            {
                entity.HasKey(e => e.EventId);

                entity.ToTable("BusinessEvents", "businessevent");
            });


            modelBuilder.Entity<BusinessEventMetadata>(entity =>
            {
                entity.HasKey(e => new { e.EventId, e.MetadataKey });

                entity.ToTable("BusinessEventMetadata", "businessevent");
            });

            base.OnModelCreating(modelBuilder);
        }
    }
}