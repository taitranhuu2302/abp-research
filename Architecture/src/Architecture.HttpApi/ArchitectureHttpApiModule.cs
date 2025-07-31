using Localization.Resources.AbpUi;
using Architecture.Localization;
using Volo.Abp.Account;
using Volo.Abp.SettingManagement;
using Volo.Abp.FeatureManagement;
using Volo.Abp.Identity;
using Volo.Abp.Modularity;
using Volo.Abp.PermissionManagement.HttpApi;
using Volo.Abp.Localization;
using Volo.Abp.AuditLogging;
using Volo.Abp.LanguageManagement;
using Volo.FileManagement;
using Volo.Saas.Host;
using Volo.Abp.TextTemplateManagement;
using Volo.Abp.Gdpr;
using Volo.Abp.OpenIddict;
using Volo.CmsKit;
using Volo.Chat;
using Volo.Abp.LeptonXTheme.Management;

namespace Architecture;

 [DependsOn(
    typeof(ArchitectureApplicationContractsModule),
    typeof(AbpPermissionManagementHttpApiModule),
    typeof(AbpSettingManagementHttpApiModule),
    typeof(AbpIdentityHttpApiModule),
    typeof(AbpAccountAdminHttpApiModule),
    typeof(TextTemplateManagementHttpApiModule),
    typeof(AbpAuditLoggingHttpApiModule),
    typeof(AbpOpenIddictProHttpApiModule),
    typeof(LanguageManagementHttpApiModule),
    typeof(FileManagementHttpApiModule),
    typeof(SaasHostHttpApiModule),
    typeof(AbpGdprHttpApiModule),
    typeof(CmsKitProHttpApiModule),
    typeof(ChatHttpApiModule),
    typeof(AbpAccountPublicHttpApiModule),
    typeof(LeptonXThemeManagementHttpApiModule),
    typeof(AbpFeatureManagementHttpApiModule)
    )]
public class ArchitectureHttpApiModule : AbpModule
{
    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        ConfigureLocalization();
    }

    private void ConfigureLocalization()
    {
        Configure<AbpLocalizationOptions>(options =>
        {
            options.Resources
                .Get<ArchitectureResource>()
                .AddBaseTypes(
                    typeof(AbpUiResource)
                );
        });
    }
}
