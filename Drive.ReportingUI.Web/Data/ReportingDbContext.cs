using Drive.ReportingUI.Web.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace Drive.ReportingUI.Web.Data
{
    public class ReportingDbContext : DbContext
    {
        public ReportingDbContext(DbContextOptions<ReportingDbContext> options) : base(options) { }

        public DbSet<BusinessEvent> BusinessEvents { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<BusinessEvent>(entity =>
            {
                entity.HasKey(e => e.EventId);

                entity.ToTable("BusinessEvents", "businessevent");
            });

            base.OnModelCreating(modelBuilder);
        }
    }
}