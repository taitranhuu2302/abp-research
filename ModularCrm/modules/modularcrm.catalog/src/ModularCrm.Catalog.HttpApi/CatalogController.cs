using ModularCrm.Catalog.Localization;
using Volo.Abp.AspNetCore.Mvc;

namespace ModularCrm.Catalog;

public abstract class CatalogController : AbpControllerBase
{
    protected CatalogController()
    {
        LocalizationResource = typeof(CatalogResource);
    }
}
