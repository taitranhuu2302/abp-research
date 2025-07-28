using Volo.Abp.Modularity;

namespace ModularCrm.Catalog;

[DependsOn(
    typeof(CatalogApplicationModule),
    typeof(CatalogDomainTestModule)
    )]
public class CatalogApplicationTestModule : AbpModule
{

}
