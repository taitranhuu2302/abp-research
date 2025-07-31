using Microsoft.EntityFrameworkCore;
using Volo.Abp.Data;
using Volo.Abp.MultiTenancy;

namespace Architecture.EntityFrameworkCore;

[ConnectionStringName("Default")]
public class ArchitectureTenantDbContext : ArchitectureDbContextBase<ArchitectureTenantDbContext>
{
    public ArchitectureTenantDbContext(DbContextOptions<ArchitectureTenantDbContext> options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.SetMultiTenancySide(MultiTenancySides.Tenant);

        base.OnModelCreating(builder);
    }
}
