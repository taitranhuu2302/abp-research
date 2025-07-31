using Volo.Abp.Modularity;

namespace Architecture;

public abstract class ArchitectureApplicationTestBase<TStartupModule> : ArchitectureTestBase<TStartupModule>
    where TStartupModule : IAbpModule
{

}
