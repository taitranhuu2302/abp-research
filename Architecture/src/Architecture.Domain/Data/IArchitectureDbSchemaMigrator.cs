using System.Threading.Tasks;

namespace Architecture.Data;

public interface IArchitectureDbSchemaMigrator
{
    Task MigrateAsync();
}
