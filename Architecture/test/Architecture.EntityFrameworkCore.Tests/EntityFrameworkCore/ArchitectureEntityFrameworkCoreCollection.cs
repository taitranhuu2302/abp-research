using Xunit;

namespace Architecture.EntityFrameworkCore;

[CollectionDefinition(ArchitectureTestConsts.CollectionDefinitionName)]
public class ArchitectureEntityFrameworkCoreCollection : ICollectionFixture<ArchitectureEntityFrameworkCoreFixture>
{

}
