using Architecture.Localization;
using Volo.Abp.Application.Services;

namespace Architecture;

/* Inherit your application services from this class.
 */
public abstract class ArchitectureAppService : ApplicationService
{
    protected ArchitectureAppService()
    {
        LocalizationResource = typeof(ArchitectureResource);
    }
}
