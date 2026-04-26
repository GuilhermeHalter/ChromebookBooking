using ChromebookBooking.Api.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace ChromebookBooking.Api.Configurations;

public static class MigrationSetup
{
    public static void ApplyMigrations(this WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        dbContext.Database.Migrate();
    }
}
