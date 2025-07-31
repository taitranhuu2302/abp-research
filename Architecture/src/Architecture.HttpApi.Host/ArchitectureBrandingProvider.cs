using Microsoft.Extensions.Localization;
using Architecture.Localization;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Ui.Branding;

namespace Architecture;

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
