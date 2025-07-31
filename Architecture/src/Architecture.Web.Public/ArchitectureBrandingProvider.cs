using Volo.Abp.Ui.Branding;
using Volo.Abp.DependencyInjection;
using Microsoft.Extensions.Localization;
using Architecture.Localization;

namespace Architecture.Web.Public;

[Dependency(ReplaceServices = true)]
public class ArchitectureBrandingProvider : DefaultBrandingProvider
{
    private IStringLocalizer<ArchitectureResource> _localizer;

    public ArchitectureBrandingProvider(IStringLocalizer<ArchitectureResource> localizer)
    {
        _localizer = localizer;
    }

    public override string AppName => _localizer["AppName"];
}
