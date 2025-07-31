using System.Threading.Tasks;
using Volo.Abp.DependencyInjection;

namespace Architecture.Data;

/* This is used if database provider does't define
 * IArchitectureDbSchemaMigrator implementation.
 */
public class NullArchitectureDbSchemaMigrator : IArchitectureDbSchemaMigrator, ITransientDependency
{
    public Task MigrateAsync()
    {
        return Task.CompletedTask;
    }
}
