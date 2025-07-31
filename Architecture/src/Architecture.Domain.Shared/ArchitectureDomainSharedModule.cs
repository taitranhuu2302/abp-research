using Architecture.Localization;
using Volo.Abp.AuditLogging;
using Volo.Abp.BackgroundJobs;
using Volo.Abp.FeatureManagement;
using Volo.Abp.Identity;
using Volo.Abp.Localization;
using Volo.Abp.Localization.ExceptionHandling;
using Volo.Abp.Validation.Localization;
using Volo.Abp.Modularity;
using Volo.Abp.PermissionManagement;
using Volo.Abp.SettingManagement;
using Volo.Abp.VirtualFileSystem;
using Volo.Abp.OpenIddict;
using Volo.Abp.BlobStoring.Database;
using Volo.Abp.LanguageManagement;
using Volo.FileManagement;
using Volo.Abp.TextTemplateManagement;
using Volo.Saas;
using Volo.Chat;
using Volo.Abp.Gdpr;
using Volo.CmsKit;
using Volo.Abp.LeptonXTheme.Management;

namespace Architecture;

[DependsOn(
    typeof(AbpAuditLoggingDomainSharedModule),
    typeof(AbpBackgroundJobsDomainSharedModule),
    typeof(AbpFeatureManagementDomainSharedModule),
    typeof(AbpPermissionManagementDomainSharedModule),
    typeof(AbpSettingManagementDomainSharedModule),
    typeof(AbpIdentityProDomainSharedModule),
    typeof(AbpOpenIddictProDomainSharedModule),
    typeof(LanguageManagementDomainSharedModule),
    typeof(FileManagementDomainSharedModule),
    typeof(SaasDomainSharedModule),
    typeof(ChatDomainSharedModule),
    typeof(TextTemplateManagementDomainSharedModule),
    typeof(AbpGdprDomainSharedModule),
    typeof(CmsKitProDomainSharedModule),
    typeof(LeptonXThemeManagementDomainSharedModule),
    typeof(BlobStoringDatabaseDomainSharedModule)
    )]
public class ArchitectureDomainSharedModule : AbpModule
{
    public override void PreConfigureServices(ServiceConfigurationContext context)
    {
        ArchitectureGlobalFeatureConfigurator.Configure();
        ArchitectureModuleExtensionConfigurator.Configure();
    }

    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        Configure<AbpVirtualFileSystemOptions>(options =>
        {
            options.FileSets.AddEmbedded<ArchitectureDomainSharedModule>();
        });

        Configure<AbpLocalizationOptions>(options =>
        {
            options.Resources
                .Add<ArchitectureResource>("en")
                .AddBaseTypes(typeof(AbpValidationResource))
                .AddVirtualJson("/Localization/Architecture");

            options.DefaultResourceType = typeof(ArchitectureResource);
            
            options.Languages.Add(new LanguageInfo("en", "en", "English")); 
            options.Languages.Add(new LanguageInfo("en-GB", "en-GB", "English (United Kingdom)")); 
            options.Languages.Add(new LanguageInfo("zh-Hans", "zh-Hans", "简体中文")); 
            options.Languages.Add(new LanguageInfo("es", "es", "Español")); 
            options.Languages.Add(new LanguageInfo("ar", "ar", "العربية")); 
            options.Languages.Add(new LanguageInfo("hi", "hi", "हिन्दी")); 
            options.Languages.Add(new LanguageInfo("pt-BR", "pt-BR", "Português (Brasil)")); 
            options.Languages.Add(new LanguageInfo("fr", "fr", "Français")); 
            options.Languages.Add(new LanguageInfo("ru", "ru", "Русский")); 
            options.Languages.Add(new LanguageInfo("de-DE", "de-DE", "Deutsch (Deuthschland)")); 
            options.Languages.Add(new LanguageInfo("tr", "tr", "Türkçe")); 
            options.Languages.Add(new LanguageInfo("it", "it", "Italiano")); 
            options.Languages.Add(new LanguageInfo("cs", "cs", "Čeština")); 
            options.Languages.Add(new LanguageInfo("hu", "hu", "Magyar")); 
            options.Languages.Add(new LanguageInfo("ro-RO", "ro-RO", "Română (România)")); 
            options.Languages.Add(new LanguageInfo("sv", "sv", "Svenska")); 
            options.Languages.Add(new LanguageInfo("fi", "fi", "Suomi")); 
            options.Languages.Add(new LanguageInfo("sk", "sk", "Slovenčina")); 
            options.Languages.Add(new LanguageInfo("is", "is", "Íslenska")); 
            options.Languages.Add(new LanguageInfo("zh-Hant", "zh-Hant", "繁體中文")); 

        });
        
        Configure<AbpExceptionLocalizationOptions>(options =>
        {
            options.MapCodeNamespace("Architecture", typeof(ArchitectureResource));
        });
    }
}
