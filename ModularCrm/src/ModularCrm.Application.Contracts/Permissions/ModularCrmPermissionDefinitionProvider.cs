using ModularCrm.Localization;
using Volo.Abp.Authorization.Permissions;
using Volo.Abp.Localization;
using Volo.Abp.MultiTenancy;

namespace ModularCrm.Permissions;

public class ModularCrmPermissionDefinitionProvider : PermissionDefinitionProvider
{
    public override void Define(IPermissionDefinitionContext context)
    {
        var myGroup = context.AddGroup(ModularCrmPermissions.GroupName);

        var booksPermission = myGroup.AddPermission(ModularCrmPermissions.Books.Default, L("Permission:Books"));
        booksPermission.AddChild(ModularCrmPermissions.Books.Create, L("Permission:Books.Create"));
        booksPermission.AddChild(ModularCrmPermissions.Books.Edit, L("Permission:Books.Edit"));
        booksPermission.AddChild(ModularCrmPermissions.Books.Delete, L("Permission:Books.Delete"));
        //Define your own permissions here. Example:
        //myGroup.AddPermission(ModularCrmPermissions.MyPermission1, L("Permission:MyPermission1"));
    }

    private static LocalizableString L(string name)
    {
        return LocalizableString.Create<ModularCrmResource>(name);
    }
}
