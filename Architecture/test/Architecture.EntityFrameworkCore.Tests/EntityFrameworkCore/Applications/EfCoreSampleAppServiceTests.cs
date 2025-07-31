using Architecture.Samples;
using Xunit;

namespace Architecture.EntityFrameworkCore.Applications;

[Collection(ArchitectureTestConsts.CollectionDefinitionName)]
public class EfCoreSampleAppServiceTests : SampleAppServiceTests<ArchitectureEntityFrameworkCoreTestModule>
{

}
