## 1. Account Module

### Overview
The Account Module handles core authentication functionalities, including login, registration, password reset, and account management. Built on Microsoft’s Identity library, it integrates with IdentityServer and OpenIddict for advanced authentication scenarios like single sign-on (SSO) and external logins (e.g., Facebook, Google).

### Key Features
- **User Interface Pages**: Login (`/Account/Login`), Register (`/Account/Register`), Forgot Password (`/Account/ForgotPassword`), and Account Management (`/Account/Manage`).
- **Integrations**: Supports IdentityServer and OpenIddict for SSO and API access control.
- **Social Logins**: Configurable external authentication providers.
- **Source Code**: Available at [GitHub](https://github.com/abpframework/abp/tree/dev/modules/account), MIT license.

### Installation
Pre-installed in ABP startup templates as NuGet/NPM packages. Use the ABP CLI (`abp get-source Volo.Abp.Account`) for source code inclusion.

### Code Example
Configuring Facebook authentication:

```csharp
public override void ConfigureServices(ServiceConfigurationContext context)
{
    var services = context.Services;
    services.AddAuthentication()
        .AddFacebook(options =>
        {
            options.AppId = Configuration["Authentication:Facebook:AppId"];
            options.AppSecret = Configuration["Authentication:Facebook:AppSecret"];
        });
}
```

### Clean Code Alignment
The module follows the Single Responsibility Principle by delegating authentication logic to separate services, ensuring maintainability. It integrates with the Identity Module for user management, adhering to Clean Architecture’s separation of concerns.

## 2. Audit Logging Module

### Overview
Audit Logging Module implement `IAuditingStore` interface để lưu trữ audit logs, theo dõi user actions và entity changes trong application. Nó hỗ trợ cả Entity Framework Core và MongoDB cho flexible storage.

### Key Features
- **Audit Log Storage**: Lưu trữ logs trong `AbpAuditLogs` table/collection.
- **Aggregates**: `AuditLog` (root) với `EntityChange` và `AuditLogAction` collections.
- **Repositories**: `IAuditLogRepository` cho data access.
- **Source Code**: Có sẵn tại [GitHub](https://github.com/abpframework/abp/tree/dev/modules/audit-logging), MIT license.

### Installation
Được cài đặt sẵn trong ABP templates. Cấu hình database tables/collections với prefix `Abp` (có thể tùy chỉnh qua `AbpAuditLoggingDbProperties`).

### Code Example
Kích hoạt audit logging với custom settings:

```csharp
public override void ConfigureServices(ServiceConfigurationContext context)
{
    Configure<AbpAuditingOptions>(options =>
    {
        options.IsEnabled = true;
        options.IsEnabledForGetRequests = true;
        options.ApplicationName = "MyApplication";
    });
}
```

### Performance Optimization
Để tối ưu database performance, thêm indexes vào `AbpAuditLogs` cho các frequent queries (ví dụ: theo `ExecutionTime`). Sử dụng distributed caching (ví dụ: Redis) cho read-heavy scenarios.

## 3. Background Jobs Module

### Overview
Background Jobs Module implement `IBackgroundJobStore` interface, cho phép asynchronous task processing bằng cách lưu trữ jobs vào database. Nó hỗ trợ custom job store implementations cho flexibility.

### Key Features
- **Job Persistence**: Lưu trữ jobs trong database để reliable execution.
- **Database Support**: Entity Framework Core và MongoDB.
- **Source Code**: Có sẵn tại [GitHub](https://github.com/abpframework/abp/tree/dev/modules/background-jobs), MIT license.

### Installation
Được cài đặt sẵn trong ABP templates. Sử dụng `abp get-source Volo.Abp.BackgroundJobs` cho source code.

### Code Example
Enqueuing một background job:

```csharp
public class MyJob : AsyncBackgroundJob<MyJobArgs>, ITransientDependency
{
    public override Task ExecuteAsync(MyJobArgs args)
    {
        // Job logic here
        return Task.CompletedTask;
    }
}

public async Task EnqueueJobAsync(IBackgroundJobManager backgroundJobManager)
{
    await backgroundJobManager.EnqueueAsync(new MyJobArgs { /* args */ });
}
```

### Clean Code Alignment
Module tuân thủ Dependency Inversion Principle bằng cách cho phép custom `IBackgroundJobStore` implementations, thúc đẩy loose coupling và testability.

## 4. CMS Kit Module

### Overview
CMS Kit Module cung cấp content management system (CMS) capabilities, cho phép các features như page management, blogging, tagging, comments, reactions, ratings, menus, global resources, dynamic widgets và marked items. Nó lý tưởng để xây dựng dynamic websites hoặc nâng cao existing ones.

### Key Features
- **Features**: Page management, blogging, tagging, comments, reactions, ratings, menus, global resources, dynamic widgets, marked items.
- **Dependencies**: Yêu cầu BlobStoring module; khuyến nghị Redis cho caching.

## 4. CMS Kit Module

### Overview
The CMS Kit Module provides content management system (CMS) capabilities, enabling features like page management, blogging, tagging, comments, reactions, ratings, menus, global resources, dynamic widgets, and marked items. It’s ideal for building dynamic websites or enhancing existing ones.

### Key Features
- **Features**: Page management, blogging, tagging, comments, reactions, ratings, menus, global resources, dynamic widgets, marked items.
- **Dependencies**: Yêu cầu BlobStoring module; khuyến nghị Redis cho caching.
- **Source Code**: Có sẵn tại [GitHub](https://github.com/abpframework/abp/tree/dev/modules/cms-kit), MIT license.

### Installation
Thêm qua ABP CLI: `abp add-module Volo.CmsKit --skip-db-migrations`. Kích hoạt features trong `ConfigureServices`:

```csharp
public override void ConfigureServices(ServiceConfigurationContext context)
{
    Configure<AbpCmsKitOptions>(options =>
    {
        options.EnableAll();
    });
}
```

### Code Example
Mở rộng blog entity với custom property:

```csharp
public static class MyProjectModuleExtensionConfigurator
{
    public static void ConfigureCmsKit(CmsKitOptions cmsKit)
    {
        cmsKit.ConfigureBlog(blog => 
        {
            blog.AddOrUpdateProperty<string>("BlogDescription", property => 
            {
                property.Attributes.Add(new RequiredAttribute());
            });
        });
    }
}
```

### Performance Optimization  
Sử dụng Redis cho distributed caching để cải thiện tốc độ truy xuất CMS content. Tối ưu database queries bằng cách indexing `Cms` tables/collections cho các frequently accessed entities như blog posts.

## 5. Docs Module

### Overview
Docs Module quản lý software documentation, lưu trữ content trên GitHub hoặc file system. Nó hỗ trợ versioning với GitHub, phù hợp để duy trì project documentation.

### Key Features
- **Storage**: GitHub hoặc file system.
- **Versioning**: Được hỗ trợ cho GitHub-based storage.
- **Source Code**: Có sẵn tại [GitHub](https://github.com/abpframework/abp/tree/dev/modules/docs), MIT license.

### Installation
Thêm qua ABP CLI: `abp add-module Volo.Abp.Docs`.

### Code Example
Truy xuất một document:

```csharp
public async Task<Document> GetDocumentAsync(IDocumentStore documentStore)
{
    return await documentStore.GetDocumentAsync("your-document-id");
}
```

### Clean Code Alignment
The module follows the Single Responsibility Principle by focusing solely on documentation management, integrating seamlessly with ABP’s modular architecture.

## 6. Feature Management Module

### Overview
The Feature Management Module implements the `IFeatureManagementStore` interface to persist feature values, enabling dynamic feature toggling for tenants or users.

### Key Features
- **Feature Storage**: Persists feature values in a database.
- **UI**: Provides a dialog for managing features.
- **Providers**: Extensible with `DefaultValueFeatureManagementProvider`, `EditionFeatureManagementProvider`, `TenantFeatureManagementProvider`.
- **Source Code**: Available at [GitHub](https://github.com/abpframework/abp/tree/dev/modules/feature-management), MIT license.

### Installation
Pre-installed in ABP templates. Use `abp get-source Volo.Abp.FeatureManagement` for source code.

### Code Example
Setting a feature value:

```csharp
public async Task SetFeatureAsync(IFeatureManager featureManager)
{
    await featureManager.SetAsync("PremiumFeature", "true", FeatureScopes.Tenant);
}
```

### Clean Code Alignment
Module hỗ trợ Open/Closed Principle thông qua extensible providers, cho phép custom feature logic mà không cần modify core code.

## 7. File Management Module

### Overview
File Management Module cho phép file upload, download và organization trong hierarchical folder structure. Nó hỗ trợ multi-tenancy và tích hợp với BlobStoring system.

### Key Features
- **File Operations**: Upload, download và organize files.
- **Multi-Tenancy**: Configurable storage limits per tenant.
- **License**: Yêu cầu ABP Team hoặc higher license.
- **Source Code**: Có sẵn tại [GitHub](https://github.com/abpframework/abp/tree/dev/modules/file-management).

### Installation
Thêm qua ABP CLI: `abp add-module Volo.FileManagement`.

### Code Example
Upload một file:

```csharp
public async Task UploadFileAsync(IFileManager fileManager, Stream stream)
{
    var file = new FileDescriptor
    {
        FileName = "example.txt",
        FileType = "text/plain"
    };
    await fileManager.CreateAsync(file, stream);
}
```

### Performance Optimization
Tối ưu file storage bằng cách cấu hình BlobStoring providers (ví dụ: Azure Blob Storage) và indexing `Fm` tables/collections để faster file retrieval.

## 8. Identity Module

### Overview
Identity Module quản lý users, roles, permissions và organization units, được xây dựng trên Microsoft's Identity library. Nó hỗ trợ multiple UI frameworks (Blazor, Angular, MVC/Razor Pages).

### Key Features
- **Entities**: `IdentityUser`, `IdentityRole`, `OrganizationUnit`, v.v.
- **UI**: User và role management pages dưới Administration.
- **Security Logs**: Theo dõi các operations như login và password changes.
- **Source Code**: Có sẵn tại [GitHub](https://github.com/abpframework/abp/tree/dev/modules/identity), MIT license.

### Installation
Được cài đặt sẵn trong ABP templates. Sử dụng `abp get-source Volo.Abp.Identity` cho source code.

### Code Example
Tạo một user:

```csharp
public async Task CreateUserAsync(IIdentityUserManager userManager)
{
    var user = new IdentityUser
    {
        UserName = "john.doe",
        Email = "john.doe@example.com"
    };
    await userManager.CreateAsync(user, "P@ssw0rd");
}
```

### Clean Code Alignment
Module tuân thủ Liskov Substitution Principle bằng cách đảm bảo `IdentityUser` và `IdentityRole` có thể được extend mà không phá vỡ functionality, hỗ trợ domain layer của Clean Architecture.

## 9. Identity Server Module

### Overview
Identity Server Module tích hợp với IdentityServer4 cho advanced authentication features như SSO và API access control. Nó đã được thay thế bởi OpenIddict Module trong ABP v6.0+ templates.

### Key Features
- **Integration**: Full IdentityServer4 support.
- **Entities**: `ApiResource`, `Client`, `PersistedGrant`, `IdentityResource`.
- **Source Code**: Có sẵn tại [GitHub](https://github.com/abpframework/abp/tree/dev/modules/identityserver), MIT license.

### Installation
Được cài đặt sẵn trong older ABP templates. Sử dụng `abp get-source Volo.Abp.IdentityServer` cho source code.

### Code Example
Cấu hình IdentityServer:

```csharp
public override void ConfigureServices(ServiceConfigurationContext context)
{
    context.Services.AddIdentityServer()
        .AddDeveloperSigningCredential()
        .AddInMemoryApiResources(Config.GetApiResources())
        .AddInMemoryClients(Config.GetClients());
}
```

### Clean Code Alignment
Module hỗ trợ Dependency Inversion Principle bằng cách override IdentityServer4 services (ví dụ: `AbpProfileService`) cho custom behavior.

## 9. Identity Server Module

### Overview
The Identity Server Module integrates with IdentityServer4 for advanced authentication features like SSO and API access control. It has been replaced by the OpenIddict Module in ABP v6.0+ templates.

### Key Features
- **Integration**: Full IdentityServer4 support.
- **Entities**: `ApiResource`, `Client`, `PersistedGrant`, `IdentityResource`.
- **Source Code**: Available at [GitHub](https://github.com/abpframework/abp/tree/dev/modules/identityserver), MIT license.

### Installation
Pre-installed in older ABP templates. Use `abp get-source Volo.Abp.IdentityServer` for source code.

### Code Example
Configuring IdentityServer:

```csharp
public override void ConfigureServices(ServiceConfigurationContext context)
{
    context.Services.AddIdentityServer()
        .AddDeveloperSigningCredential()
        .AddInMemoryApiResources(Config.GetApiResources())
        .AddInMemoryClients(Config.GetClients());
}
```

### Clean Code Alignment
The module supports the Dependency Inversion Principle by overriding IdentityServer4 services (e.g., `AbpProfileService`) for custom behavior.

## 10. OpenIddict Module

### Overview
The OpenIddict Module integrates with OpenIddict for modern authentication features, including SSO, single log-out, and API access control. It’s the preferred authentication module in ABP v6.0+.

### Key Features
- **Integration**: Supports OpenIddict with refresh tokens and PKCE.
- **Controllers**: MVC controllers for authorization, token, logout, and user info.
- **Source Code**: Available at [GitHub](https://github.com/abpframework/abp/tree/dev/modules/openiddict), MIT license.

### Installation
Được cài đặt sẵn trong newer ABP templates. Sử dụng `abp get-source Volo.Abp.OpenIddict` cho source code.

### Code Example
Cấu hình OpenIddict:

```csharp
public override void ConfigureServices(ServiceConfigurationContext context)
{
    context.Services.AddOpenIddict()
        .AddCore(options => { /* core options */ })
        .AddServer(options => { /* server options */ })
        .AddValidation(options => { /* validation options */ });
}
```

### Performance Optimization
Tối ưu token validation bằng cách kích hoạt caching trong `OpenIddictValidationBuilder` và sử dụng HTTPS để giảm latency.

## 11. Permission Management Module

### Overview
Permission Management Module implement `IPermissionStore` interface để quản lý permissions trong database, cung cấp UI cho role và user permission settings.

### Key Features
- **Permission Storage**: Lưu trữ permissions trong database.
- **UI**: Permission Management Dialog tích hợp với Identity Module.
- **Providers**: Extensible với `UserPermissionManagementProvider`, `RolePermissionManagementProvider`.
- **Source Code**: Có sẵn tại [GitHub](https://github.com/abpframework/abp/tree/dev/modules/permission-management), MIT license.

### Installation
Được cài đặt sẵn trong ABP templates. Sử dụng `abp get-source Volo.Abp.PermissionManagement` cho source code.

### Code Example
Kiểm tra một permission:

```csharp
public async Task<bool> CheckPermissionAsync(IPermissionChecker permissionChecker)
{
    return await permissionChecker.IsGrantedAsync("YourPermissionName");
}
```

### Clean Code Alignment
Module hỗ trợ Interface Segregation Principle bằng cách cung cấp focused `IPermissionStore` interface, đảm bảo clients chỉ phụ thuộc vào necessary methods.

## 12. Setting Management Module

### Overview
Setting Management Module implement `ISettingStore` interface để store và manage application settings, với UI cho email, feature và timezone settings.

### Key Features
- **Setting Storage**: Lưu trữ settings trong database.
- **UI**: Extensible setting management UI.
- **Providers**: Bao gồm `DefaultValueSettingManagementProvider`, `TenantSettingManagementProvider`, v.v.
- **Source Code**: Có sẵn tại [GitHub](https://github.com/abpframework/abp/tree/dev/modules/setting-management), MIT license.

### Installation
Được cài đặt sẵn trong ABP templates. Sử dụng `abp get-source Volo.Abp.SettingManagement` cho source code.

### Code Example
Truy xuất một setting:

```csharp
public async Task<string> GetSettingAsync(ISettingManager settingManager)
{
    return await settingManager.GetOrNullAsync("YourSettingName");
}
```

### Performance Optimization
Tận dụng distributed caching (ví dụ: Redis) cho setting retrieval để giảm database queries, phù hợp với performance optimization goals.

## 13. Tenant Management Module

### Overview
Tenant Management Module implement `ITenantStore` interface để quản lý tenants trong multi-tenant applications, cung cấp UI cho tenant và feature management.

### Key Features
- **Tenant Management**: Lưu trữ tenants trong database.
- **UI**: Tenant management dưới Administration menu.
- **Events**: Hỗ trợ distributed events với `TenantEto`.
- **Source Code**: Có sẵn tại [GitHub](https://github.com/abpframework/abp/tree/dev/modules/tenant-management), MIT license.

### Installation
Được cài đặt sẵn trong ABP templates. Sử dụng `abp get-source Volo.Abp.TenantManagement` cho source code.

### Code Example
Tạo một tenant:

```csharp
public async Task CreateTenantAsync(ITenantManager tenantManager)
{
    var tenant = new Tenant
    {
        Name = "NewTenant"
    };
    await tenantManager.CreateAsync(tenant);
}
```

### Clean Code Alignment
Module tuân thủ Clean Architecture bằng cách tách biệt tenant management logic thành domain và application layers, đảm bảo maintainability.

## 14. Virtual File Explorer Module

### Overview
The Virtual File Explorer Module provides a simple UI to browse files in ABP’s virtual file system, accessible at `/VirtualFileExplorer`.

### Key Features
- **UI**: Hiển thị virtual file system contents.
- **Installation**: Không được cài đặt sẵn; thêm qua ABP CLI.
- **Source Code**: Có sẵn tại [GitHub](https://github.com/abpframework/abp/tree/dev/modules/virtual-file-explorer), MIT license.

### Installation
Thêm qua ABP CLI: `abp add-module Volo.VirtualFileExplorer`.

### Code Example
Kích hoạt Virtual File Explorer:

```csharp
public override void PreConfigureServices(ServiceConfigurationContext context)
{
    Configure<AbpVirtualFileExplorerOptions>(options =>
    {
        options.IsEnabled = true;
    });
}
```

### Performance Optimization
Tối ưu virtual file access bằng cách caching frequently accessed files, giảm I/O operations.

## Module Summary Table

| Module                  | Purpose                                      | Key Features                              | Database Support         | License                     |
|-------------------------|----------------------------------------------|-------------------------------------------|--------------------------|-----------------------------|
| Account                 | Authentication (login, register)             | SSO, social logins                        | EF Core, MongoDB         | MIT                         |
| Audit Logging           | Tracks actions and changes                   | Audit log persistence                     | EF Core, MongoDB         | MIT                         |
| Background Jobs         | Asynchronous task processing                 | Job persistence                           | EF Core, MongoDB         | MIT                         |
| CMS Kit                 | Content management system                    | Blogging, tagging, comments               | EF Core, MongoDB         | MIT                         |
| Docs                    | Software documentation management            | GitHub/file system storage, versioning    | N/A                      | MIT                         |
| Feature Management      | Dynamic feature toggling                    | Feature storage, UI dialog                | EF Core, MongoDB         | MIT                         |
| File Management         | File upload/download/organization            | Hierarchical structure, multi-tenancy     | EF Core, MongoDB         | ABP Team or higher          |
| Identity                | User/role/permission management              | Organization units, security logs         | EF Core, MongoDB         | MIT                         |
| Identity Server         | IdentityServer4 integration                  | SSO, API access control                   | EF Core, MongoDB         | MIT                         |
| OpenIddict              | OpenIddict integration                       | SSO, refresh tokens, PKCE                 | EF Core, MongoDB         | MIT                         |
| Permission Management   | Permission storage and management            | Permission UI, extensible providers       | EF Core, MongoDB         | MIT                         |
| Setting Management      | Application settings management              | Setting UI, extensible providers          | EF Core, MongoDB         | MIT                         |
| Tenant Management       | Multi-tenant management                      | Tenant UI, feature management             | EF Core, MongoDB         | MIT                         |
| Virtual File Explorer   | Virtual file system browsing                 | Simple UI for file exploration            | N/A                      | MIT                         |

## Conclusion
The ABP Framework’s modular architecture empowers developers to build scalable, maintainable applications by leveraging pre-built modules that align with Clean Architecture and SOLID principles. These modules reduce boilerplate code, enhance performance through caching and optimized database interactions, and support extensibility for custom requirements. For a senior .NET developer, integrating these modules into a Full-Stack solution (e.g., with Next.js for Frontend and .NET with PostgreSQL for Backend) ensures rapid development while maintaining high code quality. Use the ABP CLI for seamless module integration and consider performance optimizations like indexing and caching for production environments.