using Architecture.Localization;
using Volo.Abp.AspNetCore.Mvc.UI.RazorPages;

namespace Architecture.Web.Public.Pages;

/* Inherit your Page Model classes from this class.
 */
public abstract class ArchitecturePublicPageModel : AbpPageModel
{
    protected ArchitecturePublicPageModel()
    {
        LocalizationResourceType = typeof(ArchitectureResource);
    }
}
