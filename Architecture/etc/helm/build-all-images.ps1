./build-image.ps1 -ProjectPath "../../src/Architecture.DbMigrator/Architecture.DbMigrator.csproj" -ImageName architecture/dbmigrator
./build-image.ps1 -ProjectPath "../../src/Architecture.Web.Public/Architecture.Web.Public.csproj" -ImageName architecture/webpublic
./build-image.ps1 -ProjectPath "../../src/Architecture.HttpApi.Host/Architecture.HttpApi.Host.csproj" -ImageName architecture/httpapihost
./build-image.ps1 -ProjectPath "../../angular" -ImageName architecture/angular -ProjectType "angular"
