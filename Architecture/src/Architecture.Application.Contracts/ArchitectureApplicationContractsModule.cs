﻿using Volo.Abp.Account;
using Volo.Abp.Modularity;
using Volo.Abp.PermissionManagement;
using Volo.Abp.SettingManagement;
using Volo.Abp.FeatureManagement;
using Volo.Abp.Identity;
using Volo.Abp.AuditLogging;
using Volo.Abp.LanguageManagement;
using Volo.Abp.TextTemplateManagement;
using Volo.Saas.Host;
using Volo.Abp.Gdpr;
using Volo.Abp.OpenIddict;
using Volo.CmsKit;
using Volo.FileManagement;
    using Volo.Chat;
using Volo.Abp.LeptonXTheme.Management;

namespace Architecture;

[DependsOn(
    typeof(ArchitectureDomainSharedModule),
    typeof(AbpFeatureManagementApplicationContractsModule),
    typeof(AbpSettingManagementApplicationContractsModule),
    typeof(AbpIdentityApplicationContractsModule),
    typeof(AbpAccountPublicApplicationContractsModule),
    typeof(AbpAccountAdminApplicationContractsModule),
    typeof(SaasHostApplicationContractsModule),
    typeof(AbpAuditLoggingApplicationContractsModule),
    typeof(AbpOpenIddictProApplicationContractsModule),
    typeof(TextTemplateManagementApplicationContractsModule),
    typeof(LanguageManagementApplicationContractsModule),
    typeof(FileManagementApplicationContractsModule),
    typeof(AbpGdprApplicationContractsModule),
    typeof(ChatApplicationContractsModule),
    typeof(CmsKitProApplicationContractsModule),
    typeof(LeptonXThemeManagementApplicationContractsModule),
    typeof(AbpPermissionManagementApplicationContractsModule)
)]
public class ArchitectureApplicationContractsModule : AbpModule
{
    public override void PreConfigureServices(ServiceConfigurationContext context)
    {
        ArchitectureDtoExtensions.Configure();
    }
}
