using Volo.Abp.Modularity;

namespace Architecture;

[DependsOn(
    typeof(ArchitectureApplicationModule),
    typeof(ArchitectureDomainTestModule)
)]
public class ArchitectureApplicationTestModule : AbpModule
{

}
