using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;

namespace Architecture.Web.Public.Pages;

public class IndexModel : ArchitecturePublicPageModel
{
    public void OnGet()
    {

    }

    public async Task OnPostLoginAsync()
    {
        await HttpContext.ChallengeAsync("oidc");
    }
}
