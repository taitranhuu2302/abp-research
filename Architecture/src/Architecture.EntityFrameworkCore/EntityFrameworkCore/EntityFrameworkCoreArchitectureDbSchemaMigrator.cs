using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Architecture.Data;
using Volo.Abp.DependencyInjection;
using Volo.Abp.MultiTenancy;

namespace Architecture.EntityFrameworkCore;

public class EntityFrameworkCoreArchitectureDbSchemaMigrator
    : IArchitectureDbSchemaMigrator, ITransientDependency
{
    private readonly IServiceProvider _serviceProvider;

    public EntityFrameworkCoreArchitectureDbSchemaMigrator(IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }

    public async Task MigrateAsync()
    {
        /* We intentionally resolve the DbContext
         * from IServiceProvider (instead of directly injecting it)
         * to properly get the connection string of the current tenant in the
         * current scope (connection string is dynamically resolved).
         */

        var dbContextType = _serviceProvider.GetRequiredService<ICurrentTenant>().IsAvailable
            ? typeof(ArchitectureTenantDbContext)
            : typeof(ArchitectureDbContext);

        await ((DbContext)_serviceProvider.GetRequiredService(dbContextType))
            .Database
            .MigrateAsync();
    }
}
