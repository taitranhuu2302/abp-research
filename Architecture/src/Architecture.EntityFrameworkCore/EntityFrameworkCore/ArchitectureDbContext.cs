using Microsoft.EntityFrameworkCore;
using Volo.Abp.Data;
using Volo.Abp.MultiTenancy;

namespace Architecture.EntityFrameworkCore;

[ConnectionStringName("Default")]
public class ArchitectureDbContext : ArchitectureDbContextBase<ArchitectureDbContext>
{
    public ArchitectureDbContext(DbContextOptions<ArchitectureDbContext> options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.SetMultiTenancySide(MultiTenancySides.Both);

        base.OnModelCreating(builder);
    }
}
