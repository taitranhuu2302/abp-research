using Volo.Abp.Modularity;

namespace ModularCrm.Catalog;

[DependsOn(
    typeof(CatalogDomainModule),
    typeof(CatalogTestBaseModule)
)]
public class CatalogDomainTestModule : AbpModule
{

}
