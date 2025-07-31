using Microsoft.EntityFrameworkCore;

namespace Architecture.EntityFrameworkCore;

public class ArchitectureDbContextFactory :
    ArchitectureDbContextFactoryBase<ArchitectureDbContext>
{
    protected override ArchitectureDbContext CreateDbContext(
        DbContextOptions<ArchitectureDbContext> dbContextOptions)
    {
        return new ArchitectureDbContext(dbContextOptions);
    }
}
