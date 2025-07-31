using Volo.Abp.Modularity;

namespace Architecture;

[DependsOn(
    typeof(ArchitectureDomainModule),
    typeof(ArchitectureTestBaseModule)
)]
public class ArchitectureDomainTestModule : AbpModule
{

}
