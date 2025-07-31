using Microsoft.EntityFrameworkCore;

namespace Architecture.EntityFrameworkCore;

public class ArchitectureTenantDbContextFactory :
    ArchitectureDbContextFactoryBase<ArchitectureTenantDbContext>
{
    protected override ArchitectureTenantDbContext CreateDbContext(
        DbContextOptions<ArchitectureTenantDbContext> dbContextOptions)
    {
        return new ArchitectureTenantDbContext(dbContextOptions);
    }
}
