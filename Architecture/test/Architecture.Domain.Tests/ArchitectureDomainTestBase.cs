using Volo.Abp.Modularity;

namespace Architecture;

/* Inherit from this class for your domain layer tests. */
public abstract class ArchitectureDomainTestBase<TStartupModule> : ArchitectureTestBase<TStartupModule>
    where TStartupModule : IAbpModule
{

}
