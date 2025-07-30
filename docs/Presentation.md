## 1. Tổng quan về ABP Framework

ABP Framework là một **web application framework mã nguồn mở** cho **ASP.NET Core**, được thiết kế để tăng tốc độ phát triển các ứng dụng doanh nghiệp [1, 2]. Nó cung cấp một **kiến trúc hoàn chỉnh dựa trên Domain Driven Design (DDD)** với nhiều tính năng tích hợp sẵn [2].

### Ưu điểm chính:
*   **Phát triển nhanh**: Đạt được thông qua các công cụ scaffolding, các module có sẵn, tự động tạo API và các component UI tích hợp [3].
*   **Tính năng sẵn sàng cho doanh nghiệp**: Bao gồm hỗ trợ sẵn cho **multi-tenancy**, microservices, bảo mật nâng cao (OAuth 2.0, OpenIdConnect, JWT), tối ưu hóa hiệu suất (caching, async/await) và khả năng mở rộng [3].
*   **Trải nghiệm nhà phát triển**: Cung cấp IntelliSense, hỗ trợ testing tích hợp, tài liệu toàn diện và cộng đồng tích cực [4].
*   **Lợi ích kiến trúc**: Tuân thủ **Clean Architecture** và **SOLID principles**, đảm bảo tách biệt các mối quan tâm, khả năng test cao và dễ bảo trì thông qua cấu trúc modular [1, 4, 5].

## 2. Các khái niệm nền tảng

Hiểu các khái niệm cốt lõi của ABP là rất quan trọng cho việc phát triển hiệu quả.

### 2.1. Domain Driven Design (DDD)
DDD là một cách tiếp cận để thiết kế phần mềm phức tạp bằng cách **tập trung vào business domain** và **tách biệt business logic khỏi technical infrastructure** [6].
*   **Các khái niệm DDD cốt lõi trong ABP**:
    *   **Entities & Aggregate Roots**: Đại diện cho các đối tượng business cốt lõi. Aggregate Roots đảm bảo tính nhất quán dữ liệu bằng cách nhóm các entities liên quan [7].
    *   **Value Objects**: Mô tả các đặc điểm của một domain object [7].
    *   **Domain Services**: Chứa business logic không phù hợp tự nhiên với một Entity hoặc Value Object [7].
    *   **Repositories**: Trừu tượng hóa truy cập dữ liệu, định nghĩa interfaces trong Domain Layer và implementations trong Infrastructure Layer [7, 8].
    *   **Specifications**: Đóng gói logic truy vấn [7].
*   **Tại sao DDD?**: ABP chọn DDD vì tính **maintainability, testability, scalability** và **evolutionary capability**, đảm bảo business requirements có thể thay đổi mà không ảnh hưởng đáng kể đến technical infrastructure [9].

### 2.2. Layered Architecture
ABP triển khai **kiến trúc 4 lớp** để tách biệt các mối quan tâm và thực thi các dependencies rõ ràng [9]:
*   **Presentation Layer** (ví dụ: HttpApi.Host, UI projects): Xử lý tương tác người dùng và expose APIs.
*   **Application Layer**: Triển khai use cases và điều phối Domain Layer. Nó xử lý input validation, transaction management và mapping giữa entities và DTOs [10].
*   **Domain Layer**: **Trái tim của ứng dụng**, chứa pure business logic, entities, domain services và repository interfaces. **Nó không có dependencies vào các layer khác** [8].
*   **Infrastructure Layer**: Cung cấp technical implementations cho các mối quan tâm như data access (ví dụ: Entity Framework Core), caching, logging và các tích hợp external khác. **Nó triển khai interfaces được định nghĩa trong Domain Layer** [9, 11].

### 2.3. Modular System
ABP được xây dựng trên một hệ thống modular cao [12].
*   **Modules như Bounded Contexts**: Mỗi module thường đại diện cho một **bounded context** trong DDD, cho phép chúng được phát triển, test và deploy độc lập [13].
*   **Dependency Management**: Modules khai báo dependencies của chúng bằng attribute `[DependsOn]`, đảm bảo thứ tự khởi tạo chính xác [13, 14].
*   **Reusability và Extensibility**: Modules được thiết kế để có thể tái sử dụng và mở rộng, giảm boilerplate code và thúc đẩy best practices [1, 12].

### 2.4. Cross-cutting Concerns
ABP cung cấp các giải pháp tích hợp sẵn cho các cross-cutting concerns phổ biến, như Authentication, Authorization, Caching và Logging [12]. Chúng được xử lý thông qua các module chuyên dụng hoặc framework services, thường với **Convention over Configuration** [12].

### 2.5. Customization
ABP cung cấp **khả năng tùy chỉnh cao** trong các lĩnh vực như business logic, UI, database schema, authentication và authorization. Tùy chỉnh trung bình có sẵn cho module configuration và workflows, trong khi core framework internals bị hạn chế [15]. Nên sử dụng **proper extension points** thay vì sửa đổi framework internals [15].

## 3. Cấu trúc Project

Một ABP solution điển hình được tổ chức thành nhiều projects, mỗi project đại diện cho một layer hoặc concern riêng biệt, thường hoạt động như một ABP module [13, 16].

### 3.1. Phân tích từng Layer

*   **`[YourProject].Domain.Shared`**:
    *   **Mục đích**: Chứa **shared types** (enums, constants, DTOs cho shared entities) được sử dụng trên cả Domain và Application layers, đặc biệt cho contracts [8].
    *   **Key Files**: `[YourProject]DomainSharedModule.cs`.

*   **`[YourProject].Domain`**:
    *   **Mục đích**: Core của ứng dụng. Chứa **pure business logic**, bao gồm entities, aggregate roots, domain services và repository interfaces [8].
    *   **Key Principles**: **Quan trọng, nó không chứa database code, HTTP, UI hoặc external service calls**. Nó định nghĩa "cái gì" business làm, không phải "làm thế nào" để triển khai về mặt kỹ thuật [8].

*   **`[YourProject].Application.Contracts`**:
    *   **Mục đích**: Định nghĩa **contracts (interfaces)** cho Application layer, bao gồm Application Service interfaces và Data Transfer Objects (DTOs) [8, 10].
    *   **Lợi ích**: Cho phép client applications (ví dụ: mobile apps, other microservices) reference chỉ contracts, **không expose implementation details** [10].

*   **`[YourProject].Application`**:
    *   **Mục đích**: Triển khai **use cases** và điều phối tương tác với Domain layer [10].
    *   **Application Service Responsibilities**: Validate input DTOs, gọi Domain services/entities, xử lý transactions (Unit of Work), map entities sang DTOs và ngược lại, và tích hợp cross-cutting concerns như authorization và caching [10].

*   **`[YourProject].EntityFrameworkCore`** (phần của Infrastructure):
    *   **Mục đích**: Cung cấp **infrastructure implementation cho data access** sử dụng Entity Framework Core, bao gồm `DbContext` và concrete repository implementations [11].

*   **`[YourProject].HttpApi`**:
    *   **Mục đích**: Expose **API controllers**. ABP có thể **auto-generate APIs** từ Application Services, thường giảm nhu cầu viết controller code thủ công nhiều ở đây [11, 17].

*   **`[YourProject].HttpApi.Host`**:
    *   **Mục đích**: **Entry point** của ứng dụng, chịu trách nhiệm hosting web application (ví dụ: ASP.NET Core Kestrel) và configure startup modules [11].

### 3.2. Project Dependencies Flow
Các layers tuân theo quy tắc dependency nghiêm ngặt để duy trì separation of concerns [11]:
*   `Host` → `HttpApi` → `Application` → `Domain`
*   `EntityFrameworkCore` → `Domain` (cho repository interfaces)
*   **`Domain` layer chỉ depends vào `Domain.Shared`**, nhấn mạnh tính độc lập của nó khỏi infrastructure hoặc application concerns [11].

### 3.3. Key Takeaways cho Project Structure
*   **Nên làm**: Tuân thủ layer dependencies, đặt business logic trong Domain layer, sử dụng interfaces trong Domain và implementations trong Infrastructure, tách biệt contracts, và follow ABP naming conventions [16].
*   **Không nên**: Đặt database code trong Domain, bỏ qua `Application.Contracts`, vi phạm dependency rules, hoặc mix business logic với infrastructure concerns [18].

## 4. Các Module Chính

ABP Framework cung cấp 14 core modules, mỗi module xử lý các chức năng cụ thể, giảm boilerplate code và tuân thủ best practices [1, 19].

*   **1. Account Module** [20, 21]
    *   **Mục đích**: Xử lý các chức năng **core authentication** như login, registration, password reset và account management [20, 21].
    *   **Tính năng**: Cung cấp UI pages (`/Account/Login`, `/Account/Register`), hỗ trợ **Single Sign-On (SSO)** và external logins (ví dụ: Facebook, Google) thông qua tích hợp với Microsoft's Identity library, IdentityServer và **OpenIddict** [20, 21].
    *   **Clean Code**: Tuân thủ **Single Responsibility Principle** bằng cách delegate authentication logic cho separate services [20, 22].

*   **2. Audit Logging Module** [23]
    *   **Mục đích**: Theo dõi **user actions và entity changes** (create, update, delete) trong ứng dụng bằng cách triển khai `IAuditingStore` [23, 24].
    *   **Tính năng**: Lưu logs trong table/collection `AbpAuditLogs`, ghi lại request/response details, executed actions, exceptions và execution time [23, 24].
    *   **Performance**: Hỗ trợ thêm indexes cho frequent queries [25].

*   **3. Background Jobs Module** [25]
    *   **Mục đích**: Cho phép **asynchronous task processing** bằng cách lưu jobs vào database sử dụng `IBackgroundJobStore`, đảm bảo execution đáng tin cậy [25, 26].
    *   **Tính năng**: Jobs có tính persistent và có thể retry khi thất bại [26, 27].
    *   **Clean Code**: Tuân thủ **Dependency Inversion Principle** bằng cách cho phép custom `IBackgroundJobStore` implementations [26].

*   **4. CMS Kit Module** [28, 29]
    *   **Mục đích**: Cung cấp **Content Management System (CMS) capabilities** để xây dựng dynamic websites [28, 29].
    *   **Tính năng**: Bao gồm page management, blogging, tagging, comments, reactions, ratings, menus, dynamic widgets và marked items [28, 29].
    *   **Dependencies**: Yêu cầu BlobStoring module và recommend Redis cho caching [28, 29].

*   **5. Docs Module** [30, 31]
    *   **Mục đích**: Quản lý **software documentation**, lưu trữ content trên GitHub hoặc file system [30].
    *   **Tính năng**: Hỗ trợ versioning cho GitHub-based storage [31].
    *   **Clean Code**: Tuân thủ **Single Responsibility Principle** bằng cách tập trung chỉ vào documentation management [31].

*   **6. Feature Management Module** [31]
    *   **Mục đích**: Triển khai `IFeatureManagementStore` cho **dynamic feature toggling** cho tenants hoặc users tại runtime [31, 32].
    *   **Tính năng**: Persist feature values trong database và cung cấp UI cho management [33, 34].
    *   **Clean Code**: Hỗ trợ **Open/Closed Principle** thông qua extensible providers, cho phép custom feature logic mà không sửa đổi core code [33].

*   **7. File Management Module** [35]
    *   **Mục đích**: Cho phép **file upload, download và organization** trong hierarchical folder structure [35].
    *   **Tính năng**: Hỗ trợ **multi-tenancy** với configurable storage limits per tenant, và tích hợp với BlobStoring system [35]. **Lưu ý**: Module này yêu cầu ABP Team hoặc license cao hơn [35].

*   **8. Identity Module** [36]
    *   **Mục đích**: Quản lý **users, roles, permissions và organization units**, được xây dựng trên Microsoft's Identity library [36].
    *   **Tính năng**: Cung cấp UI cho user/role management, security logs và hỗ trợ multiple UI frameworks (Blazor, Angular, MVC/Razor Pages) [36].
    *   **Clean Code**: Tuân thủ **Liskov Substitution Principle**, cho phép `IdentityUser` và `IdentityRole` được extend mà không break functionality [37].

*   **9. Identity Server Module** [37, 38]
    *   **Mục đích**: Tích hợp với **IdentityServer4** cho advanced authentication features như SSO và API access control [37, 38].
    *   **Lưu ý**: Module này đã được **thay thế bằng OpenIddict Module trong ABP v6.0+ templates** [37, 38].

*   **10. OpenIddict Module** [39]
    *   **Mục đích**: Tích hợp với **OpenIddict** cho modern authentication features, bao gồm **SSO, single log-out và API access control**. Đây là **authentication module được ưa chuộng trong ABP v6.0+** [39].
    *   **Tính năng**: Hỗ trợ OpenIddict với refresh tokens và PKCE [39].

*   **11. Permission Management Module** [40]
    *   **Mục đích**: Triển khai `IPermissionStore` để quản lý **permissions trong database** và cung cấp UI cho role và user permission settings [40].
    *   **Tính năng**: Extensible với `UserPermissionManagementProvider` và `RolePermissionManagementProvider` [40].
    *   **Clean Code**: Hỗ trợ **Interface Segregation Principle** bằng cách cung cấp focused `IPermissionStore` interface [41].

*   **12. Setting Management Module** [41]
    *   **Mục đích**: Triển khai `ISettingStore` để lưu trữ và quản lý **application settings tại runtime**, với UI cho email, feature và timezone settings [41, 42].
    *   **Tính năng**: Extensible với various providers (ví dụ: `DefaultValueSettingManagementProvider`, `TenantSettingManagementProvider`) [43].

*   **13. Tenant Management Module** [44]
    *   **Mục đích**: Triển khai `ITenantStore` để quản lý **tenants trong multi-tenant applications**, cung cấp UI cho tenant và feature management [44].
    *   **Tính năng**: Hỗ trợ distributed events với `TenantEto` [44].
    *   **Clean Code**: Tuân thủ **Clean Architecture** bằng cách tách biệt tenant management logic thành domain và application layers [45].

*   **14. Virtual File Explorer Module** [45]
    *   **Mục đích**: Cung cấp **simple UI để browse files trong ABP's virtual file system** tại `/VirtualFileExplorer` [45].
    *   **Lưu ý**: Không được pre-install trong templates, được thêm qua ABP CLI [45].

## 5. Infrastructure Components

ABP Framework cung cấp một bộ infrastructure components phong phú để cung cấp các chức năng hỗ trợ và giải quyết các thách thức kiến trúc phổ biến.

*   **Audit Logging**: Ngoài việc là một module, nó là một infrastructure piece cốt lõi, tự động ghi lại web requests, actions, entity changes, exceptions và execution times [24].
*   **Background Jobs & Workers** [46, 47]
    *   **Background Jobs**: Được sử dụng cho **one-time, long-running hoặc retryable tasks** được queue và processed asynchronously (ví dụ: gửi email) [27, 46]. Chúng có tính persistent và có thể retry automatically [27].
    *   **Background Workers**: Independent threads chạy **continuously hoặc periodically** trong suốt application lifecycle (ví dụ: hourly cleanup tasks) [47, 48].
    *   **Integration**: Cả hai có thể tích hợp với powerful libraries như **Hangfire, RabbitMQ và Quartz** cho enhanced scheduling và management [49, 50].

*   **BLOB Storing** [50]
    *   **Mục đích**: Cung cấp một **abstraction layer để lưu trữ và retrieve Binary Large Objects (BLOBs)** như files hoặc images [50].
    *   **Lợi ích**: Dễ dàng tích hợp với various storage providers (File System, Azure Blob Storage, AWS S3) và hỗ trợ multi-tenancy [50, 51]. Nó sử dụng concept của **typed containers** (`IBlobContainer<T>`) cho clear management [52].

*   **Cancellation Token Provider** [51]
    *   **Mục đích**: Cho phép **cooperative cancellation của tasks**. ABP thường **automate** việc sử dụng cancellation tokens (ví dụ: từ `HttpContext.RequestAborted` trong ASP.NET Core) [53].
    *   **Usage**: `ICancellationTokenProvider` có thể được sử dụng để thêm custom cancellation logic hoặc pass tokens cho external methods [53, 54].

*   **Anti-Forgery** [55]
    *   **Mục đích**: **Tự động ngăn chặn Cross-Site Request Forgery (CSRF/XSRF) attacks** mà không cần manual configuration [55].
    *   **Mechanism**: Server tạo token (trong cookie), client (ví dụ: Angular) gửi nó trong AJAX header, và server validate nó cho browser-initiated requests [56].

*   **Concurrency Check** [57]
    *   **Mục đích**: Đảm bảo **data consistency** khi multiple users sửa đổi cùng dữ liệu concurrently sử dụng **Optimistic Concurrency Control** [57, 58].
    *   **Mechanism**: Entities triển khai `IHasConcurrencyStamp`. Khi một entity được update, `ConcurrencyStamp` từ client được so sánh với database. Nếu không match, một `AbpDbConcurrencyException` được throw, ngăn chặn lost updates [58].

*   **Current User** [59]
    *   **Mục đích**: Cung cấp easy access đến thông tin về **currently logged-in user** thông qua service `ICurrentUser` [59].
    *   **Properties**: Bao gồm `IsAuthenticated`, `Id`, `UserName`, `TenantId`, `Roles`, `Email`, etc. [60].

*   **Data Filtering** [61]
    *   **Mục đích**: Cung cấp một **automatic data filtering system** cho common scenarios như **soft-delete** (`ISoftDelete`) và **multi-tenancy** (`IMultiTenant`) [61, 62].
    *   **Control**: Service `IDataFilter` cho phép temporarily disable filters khi cần (ví dụ: để retrieve soft-deleted records) [63].

*   **Data Seeding** [64]
    *   **Mục đích**: Cung cấp flexible mechanism để **thêm initial data** (ví dụ: admin accounts, default roles) vào database [64].
    *   **Mechanism**: Developers tạo classes triển khai `IDataSeedContributor`, được automatically executed bởi ABP, thường qua `*.DbMigrator` console project trong production hoặc development environments [65, 66].

*   **Distributed Locking** [67]
    *   **Mục đích**: Đảm bảo rằng **chỉ một process có thể access shared resource tại một thời điểm** trong distributed hoặc clustered environments, ngăn chặn race conditions [67].
    *   **Integration**: Tích hợp với `DistributedLock` library, hỗ trợ various providers như Redis hoặc SQL Server qua `IAbpDistributedLock` [68].

*   **Emailing** [69]
    *   **Mục đích**: Cung cấp một **abstracted email sending system** qua `IEmailSender`, decoupling application khỏi specific email providers [69].
    *   **Tính năng**: Tích hợp tốt với **MailKit** cho robust email sending, cho phép configuration qua Setting Management và hỗ trợ **queueing emails** (sử dụng Background Jobs) cho improved performance [70, 71].

*   **Entity Cache** [71]
    *   **Mục đích**: Một **read-only caching system hiệu quả cho frequently accessed entities**, giảm database load [71].
    *   **Mechanism**: `IDistributedEntityCache` automatically queries từ database nếu không cached, và **automatically invalidates cached entries** khi underlying entity được change hoặc delete (thậm chí across distributed instances) [72].

*   **Event Bus** [73]
    *   **Mục đích**: Cho phép **loosely coupled communication** giữa các application components khác nhau bằng cách publish và subscribe events [73].
    *   **Types**:
        *   **Local Event Bus**: In-process communication, transactional (handlers chạy trong cùng Unit of Work) [74].
        *   **Distributed Event Bus**: Inter-process communication cho microservices hoặc distributed applications, yêu cầu message broker (ví dụ: RabbitMQ, Kafka) [75]. Hỗ trợ **Inbox/Outbox pattern** cho reliability [75].
    *   **Pre-built Events**: ABP automatically publish events cho entity changes (`EntityCreatedEventData`, `EntityUpdatedEventData`, `EntityDeletedEventData`) [76].

*   **Features System** [32]
    *   **Mục đích**: Cho phép **enable/disable hoặc thay đổi behavior của application functionalities tại runtime**, đặc biệt hữu ích cho **SaaS applications** với different service tiers [32].
    *   **Definition**: Features được định nghĩa sử dụng `FeatureDefinitionProvider` với unique names, default values và display types [77].
    *   **Checking**: Có thể được check sử dụng attribute `[RequiresFeature]` hoặc service `IFeatureChecker` [78].

*   **Global Features** [34]
    *   **Mục đích**: Được sử dụng để **enable/disable application features tại development time**, ảnh hưởng đến application structure (ví dụ: whether services hoặc database tables được register/create) [34].
    *   **Lợi ích**: Lý tưởng cho developing reusable modules, cho phép end applications opt-in hoặc opt-out specific functionalities [79].
    *   **Checking**: `GlobalFeatureManager.Instance` hoặc attribute `[RequiresGlobalFeature]` [80].

*   **GUID Generation** [81]
    *   **Mục đích**: Cung cấp `IGuidGenerator` để generate **sequential GUIDs**, được optimize cho database performance (đặc biệt như clustered indexes) [82].
    *   **Recommendation**: **Không bao giờ sử dụng `Guid.NewGuid()`** cho entity IDs trong ABP do potential performance issues với non-sequential GUIDs [82].

*   **Image Manipulation** [83]
    *   **Lưu ý**: ABP Framework **không cung cấp built-in image manipulation**.
    *   **Integration**: Developers có thể tích hợp powerful .NET third-party libraries như **ImageSharp** hoặc **SkiaSharp** cho tasks như resizing, cropping và applying filters [83-85].

*   **JSON Serialization** [86]
    *   **Mục đích**: Cung cấp một **abstraction (`IJsonSerializer`) để làm việc với JSON**, cho phép easy switching giữa different JSON libraries [86].
    *   **Support**: Hỗ trợ cả **System.Text.Json** (default) và **Newtonsoft.Json** [87].

*   **Object To Object Mapping** [88]
    *   **Mục đích**: Đơn giản hóa data conversion giữa different object types (ví dụ: Entity sang DTO) sử dụng abstracted system (`IObjectMapper`) [88].
    *   **Integration**: Tích hợp với **AutoMapper**, cho phép định nghĩa mapping rules và handling extra properties hoặc ignoring auditing properties automatically [89, 90].

*   **Settings** [42]
    *   **Mục đích**: Quản lý **application configuration values tại runtime** (ví dụ: SMTP settings) [42].
    *   **Mechanism**: Values được lưu trong dynamic source (thường là database) và có thể thay đổi mà không restart application [42].
    *   **Hierarchy**: Values có thể được override tại different levels: **User > Tenant > Global > Configuration (appsettings.json) > Default** [91]. Hỗ trợ encryption cho sensitive values [92].

*   **Simple State Checker** [93]
    *   **Mục đích**: Cung cấp generic way để **enable hoặc disable một object dựa trên dynamic conditions** (ví dụ: ẩn menu item nếu user thiếu permissions) [93].
    *   **Mechanism**: Objects triển khai `IHasSimpleStateCheckers<T>`, chứa list của `ISimpleStateChecker<T>` instances [94]. Một object được enable chỉ khi **tất cả** checkers của nó return true [95].

*   **SMS Sending** [96]
    *   **Mục đích**: Cung cấp một **abstracted service (`ISmsSender`) để gửi SMS messages**, tương tự như emailing [96].
    *   **Implementation**: Defaults to `NullSmsSender` (logs only) cho development. Yêu cầu custom implementation với third-party SMS provider (ví dụ: Twilio) cho actual sending [96, 97].

*   **String Encryption** [98]
    *   **Mục đích**: Cung cấp simple service (`IStringEncryptionService`) để **encrypt và decrypt strings**, hữu ích cho storing sensitive information [98].
    *   **Mechanism**: Sử dụng AES algorithm, configurable với pass-phrase, salt và initialization vector (IV) [98, 99].

*   **Text Templating** [100]
    *   **Mục đích**: Tạo **dynamic content dựa trên templates và data models** (ví dụ: email content, reports) [100].
    *   **Mechanism**: Sử dụng **Scriban** library, cho phép conditional logic, loops và localization trong templates [100, 101]. Templates được định nghĩa qua `TemplateDefinitionProvider` và có thể được render qua `ITemplateRenderer` [101].

*   **Timing** [102]
    *   **Mục đích**: Đơn giản hóa việc làm việc với **time và time zones** một cách nhất quán [102].
    *   **Recommendation**: Luôn sử dụng **`IClock.Now` (configured cho UTC)** thay vì `DateTime.Now` hoặc `DateTime.UtcNow` cho consistency và testability [103]. ABP automatically normalize `DateTime` objects across application [104].

*   **Virtual File System (VFS)** [105]
    *   **Mục đích**: Quản lý **files không tồn tại physically trên disk**, chủ yếu bằng cách embed resources (JS, CSS, images, templates) vào assemblies [105].
    *   **Lợi ích**: Thúc đẩy **modularity** (modules package their own UI resources), cho phép **customization và overriding** của embedded files bằng cách tạo physical files với cùng path, và tích hợp seamlessly với ASP.NET Core cho serving static files và rendering Razor views [105, 106].
