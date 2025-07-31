using Architecture.Localization;
using Volo.Abp.Authorization.Permissions;
using Volo.Abp.Localization;
using Volo.Abp.MultiTenancy;

namespace Architecture.Permissions;

public class ArchitecturePermissionDefinitionProvider : PermissionDefinitionProvider
{
    public override void Define(IPermissionDefinitionContext context)
    {
        var myGroup = context.AddGroup(ArchitecturePermissions.GroupName);

        myGroup.AddPermission(ArchitecturePermissions.Dashboard.Host, L("Permission:Dashboard"), MultiTenancySides.Host);
        myGroup.AddPermission(ArchitecturePermissions.Dashboard.Tenant, L("Permission:Dashboard"), MultiTenancySides.Tenant);

        var booksPermission = myGroup.AddPermission(ArchitecturePermissions.Books.Default, L("Permission:Books"));
        booksPermission.AddChild(ArchitecturePermissions.Books.Create, L("Permission:Books.Create"));
        booksPermission.AddChild(ArchitecturePermissions.Books.Edit, L("Permission:Books.Edit"));
        booksPermission.AddChild(ArchitecturePermissions.Books.Delete, L("Permission:Books.Delete"));
        //Define your own permissions here. Example:
        //myGroup.AddPermission(ArchitecturePermissions.MyPermission1, L("Permission:MyPermission1"));
    }

    private static LocalizableString L(string name)
    {
        return LocalizableString.Create<ArchitectureResource>(name);
    }
}
