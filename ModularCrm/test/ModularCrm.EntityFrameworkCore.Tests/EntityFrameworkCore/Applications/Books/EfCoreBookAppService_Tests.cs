using ModularCrm.Books;
using Xunit;

namespace ModularCrm.EntityFrameworkCore.Applications.Books;

[Collection(ModularCrmTestConsts.CollectionDefinitionName)]
public class EfCoreBookAppService_Tests : BookAppService_Tests<ModularCrmEntityFrameworkCoreTestModule>
{

}