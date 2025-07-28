using Volo.Abp.Modularity;

namespace ModularCrm.Catalog;

/* Inherit from this class for your domain layer tests.
 * See SampleManager_Tests for example.
 */
public abstract class CatalogDomainTestBase<TStartupModule> : CatalogTestBase<TStartupModule>
    where TStartupModule : IAbpModule
{

}
