using Localization.Resources.AbpUi;
using ModularCrm.Catalog.Localization;
using Volo.Abp.AspNetCore.Mvc;
using Volo.Abp.Localization;
using Volo.Abp.Modularity;
using Microsoft.Extensions.DependencyInjection;

namespace ModularCrm.Catalog;

[DependsOn(
    typeof(CatalogApplicationContractsModule),
    typeof(AbpAspNetCoreMvcModule))]
public class CatalogHttpApiModule : AbpModule
{
    public override void PreConfigureServices(ServiceConfigurationContext context)
    {
        PreConfigure<IMvcBuilder>(mvcBuilder =>
        {
            mvcBuilder.AddApplicationPartIfNotExists(typeof(CatalogHttpApiModule).Assembly);
        });
    }

    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        Configure<AbpLocalizationOptions>(options =>
        {
            options.Resources
                .Get<CatalogResource>()
                .AddBaseTypes(typeof(AbpUiResource));
        });
    }
}
