using Architecture.EntityFrameworkCore;
using Volo.Abp.Autofac;
using Volo.Abp.Modularity;

namespace Architecture.DbMigrator;

[DependsOn(
    typeof(AbpAutofacModule),
    typeof(ArchitectureEntityFrameworkCoreModule),
    typeof(ArchitectureApplicationContractsModule)
)]
public class ArchitectureDbMigratorModule : AbpModule
{
}
