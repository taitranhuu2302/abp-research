using Architecture.Books;
using Xunit;

namespace Architecture.EntityFrameworkCore.Applications.Books;

[Collection(ArchitectureTestConsts.CollectionDefinitionName)]
public class EfCoreBookAppService_Tests : BookAppService_Tests<ArchitectureEntityFrameworkCoreTestModule>
{

}