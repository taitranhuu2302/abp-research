using Architecture.Samples;
using Xunit;

namespace Architecture.EntityFrameworkCore.Domains;

[Collection(ArchitectureTestConsts.CollectionDefinitionName)]
public class EfCoreSampleDomainTests : SampleDomainTests<ArchitectureEntityFrameworkCoreTestModule>
{

}
