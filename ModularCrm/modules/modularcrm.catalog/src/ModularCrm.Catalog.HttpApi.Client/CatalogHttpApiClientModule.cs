using Microsoft.Extensions.DependencyInjection;
using Volo.Abp.Http.Client;
using Volo.Abp.Modularity;
using Volo.Abp.VirtualFileSystem;

namespace ModularCrm.Catalog;

[DependsOn(
    typeof(CatalogApplicationContractsModule),
    typeof(AbpHttpClientModule))]
public class CatalogHttpApiClientModule : AbpModule
{
    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        context.Services.AddHttpClientProxies(
            typeof(CatalogApplicationContractsModule).Assembly,
            CatalogRemoteServiceConsts.RemoteServiceName
        );

        Configure<AbpVirtualFileSystemOptions>(options =>
        {
            options.FileSets.AddEmbedded<CatalogHttpApiClientModule>();
        });

    }
}
