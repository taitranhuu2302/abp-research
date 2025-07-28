using Volo.Abp.Application;
using Volo.Abp.Modularity;
using Volo.Abp.Authorization;

namespace ModularCrm.Catalog;

[DependsOn(
    typeof(CatalogDomainSharedModule),
    typeof(AbpDddApplicationContractsModule),
    typeof(AbpAuthorizationModule)
    )]
public class CatalogApplicationContractsModule : AbpModule
{

}
