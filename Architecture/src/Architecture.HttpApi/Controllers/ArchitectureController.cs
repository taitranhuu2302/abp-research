using Architecture.Localization;
using Volo.Abp.AspNetCore.Mvc;

namespace Architecture.Controllers;

/* Inherit your controllers from this class.
 */
public abstract class ArchitectureController : AbpControllerBase
{
    protected ArchitectureController()
    {
        LocalizationResource = typeof(ArchitectureResource);
    }
}
