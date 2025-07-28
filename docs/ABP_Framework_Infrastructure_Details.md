# Tổng quan về cơ sở hạ tầng (Infrastructure) của ABP Framework

Tài liệu này cung cấp một cái nhìn tổng quan chi tiết về các thành phần cơ sở hạ tầng khác nhau trong ABP Framework. Mỗi phần sẽ giải thích một tính năng cụ thể, cách cấu hình và sử dụng nó trong ứng dụng của bạn.

## Mục lục

#### 1. [Ghi nhật ký kiểm tra (Audit Logging)](#1-ghi-nhật-ký-kiểm-tra-audit-logging)

#### 2. [Công việc nền (Background Jobs)](#2-công-việc-nền-background-jobs)

#### 3. [Worker nền (Background Workers)](#3-worker-nền-background-workers)

#### 4. [Lưu trữ BLOB (BLOB Storing)](#4-lưu-trữ-blob-blob-storing)

#### 5. [Cancellation Token Provider](#5-cancellation-token-provider)

#### 6. [Chống tấn công CSRF/XSRF (Anti-Forgery)](#6-chống-tấn-công-csrfxsrf-anti-forgery)

#### 7. [Kiểm soát truy cập đồng thời (Concurrency Check)](#7-kiểm-soát-truy-cập-đồng-thời-concurrency-check)

#### 8. [Người dùng hiện tại (Current User)](#8-người-dùng-hiện-tại-current-user)

#### 9. [Lọc dữ liệu (Data Filtering)](#9-lọc-dữ-liệu-data-filtering)

#### 10. [Cung cấp dữ liệu ban đầu (Data Seeding)](#10-cung-cấp-dữ-liệu-ban-đầu-data-seeding)

#### 11. [Khóa phân tán (Distributed Locking)](#11-khóa-phân-tán-distributed-locking)

#### 12. [Gửi Email (Emailing)](#12-gửi-email-emailing)

#### 13. [Cache thực thể (Entity Cache)](#13-cache-thực-thể-entity-cache)

#### 14. [Bus sự kiện (Event Bus)](#14-bus-sự-kiện-event-bus)


#### 15. [Hệ thống Tính năng (Features)](#15-hệ-thống-tính-năng-features)


#### 16. [Tính năng toàn cục (Global Features)](#16-tính-năng-toàn-cục-global-features)


#### 17. [Tạo GUID (GUID Generation)](#17-tạo-guid-guid-generation)

#### 18. [Xử lý ảnh (Image Manipulation)](#18-xử-lý-ảnh-image-manipulation)

#### 19. [Xử lý JSON (JSON Serialization)](#19-xử-lý-json-json-serialization)

#### 20. [Ánh xạ đối tượng (Object To Object Mapping)](#20-ánh-xạ-đối-tượng-object-to-object-mapping)

#### 21. [Cài đặt (Settings)](#21-cài-đặt-settings)

#### 22. [Kiểm tra trạng thái đơn giản (Simple State Checker)](#22-kiểm-tra-trạng-thái-đơn-giản-simple-state-checker)

#### 23. [Gửi tin nhắn SMS (SMS Sending)](#23-gửi-tin-nhắn-sms-sms-sending)

#### 24. [Mã hóa chuỗi (String Encryption)](#24-mã-hóa-chuỗi-string-encryption)

#### 25. [Tạo mẫu văn bản (Text Templating)](#25-tạo-mẫu-văn-bản-text-templating)

#### 26. [Thời gian và Múi giờ (Timing)](#26-thời-gian-và-múi-giờ-timing)

#### 27. [Hệ thống tệp ảo (Virtual File System)](#27-hệ-thống-tệp-ảo-virtual-file-system)

---

## 1. Ghi nhật ký kiểm tra (Audit Logging)

Hệ thống ghi nhật ký kiểm tra (Audit Logging) của ABP Framework cung cấp một cơ chế mở rộng để tự động ghi lại các hoạt động quan trọng trong ứng dụng. Nó tạo ra một bản ghi theo trình tự thời gian về các sự kiện, hoạt động và thủ tục, rất hữu ích cho việc kiểm tra bảo mật và theo dõi hoạt động của người dùng.

### Các tính năng chính

Một bản ghi kiểm tra (audit log) thường được tạo cho mỗi yêu cầu web và bao gồm các thông tin sau:

*   **Chi tiết yêu cầu và phản hồi**: URL, phương thức HTTP, thông tin trình duyệt, mã trạng thái HTTP, v.v.
*   **Các hành động đã thực hiện**: Các phương thức controller và service ứng dụng đã được gọi, cùng với các tham số của chúng.
*   **Thay đổi thực thể (Entity Changes)**: Ghi lại các thay đổi đối với các thực thể (tạo, cập nhật, xóa) trong một yêu cầu web.
*   **Thông tin ngoại lệ (Exception)**: Ghi lại thông tin chi tiết nếu có lỗi xảy ra trong quá trình thực thi yêu cầu.
*   **Thời gian thực thi**: Giúp đo lường hiệu suất của ứng dụng.

### Cấu hình và sử dụng

#### Kích hoạt Audit Logging

Để kích hoạt, bạn cần thêm middleware `UseAuditing()` vào pipeline của ASP.NET Core. Trong các mẫu dự án khởi động của ABP, điều này đã được cấu hình sẵn.

#### Cấu hình `AbpAuditingOptions`

Bạn có thể tùy chỉnh hành vi của hệ thống ghi nhật ký kiểm tra thông qua `AbpAuditingOptions` trong phương thức `ConfigureServices` của module:

```csharp
Configure<AbpAuditingOptions>(options =>
{
    // Tắt hoàn toàn hệ thống audit logging
    options.IsEnabled = true; 

    // Chỉ ghi log cho người dùng đã xác thực
    options.IsEnabledForAnonymousUsers = false;

    // Kích hoạt ghi log cho các yêu cầu GET (mặc định là false)
    options.IsEnabledForGetRequests = true; 
});
```

#### Lựa chọn thực thể để ghi log

Theo mặc định, ABP không ghi lại các thay đổi của thực thể để tiết kiệm dung lượng cơ sở dữ liệu. Bạn cần phải cấu hình một cách rõ ràng:

*   **Ghi log tất cả các thực thể**:
    ```csharp
    options.EntityHistorySelectors.AddAllEntities();
    ```
*   **Sử dụng thuộc tính (Attribute)**: Dùng `[Audited]` trên một lớp thực thể để kích hoạt hoặc `[DisableAuditing]` để vô hiệu hóa việc ghi log cho thực thể hoặc thuộc tính cụ thể.

    ```csharp
    [Audited]
    public class MyUser : Entity<Guid>
    {
        public string Name { get; set; }
        
        [DisableAuditing] // Bỏ qua thuộc tính này khi ghi log
        public string Password { get; set; }
    }
    ```

### Vô hiệu hóa Audit Logging

Bạn có thể sử dụng thuộc tính `[DisableAuditing]` ở các cấp độ khác nhau:

*   **Controller hoặc Action**:
    ```csharp
    [DisableAuditing]
    public class MyController : AbpController { ... }

    public class AnotherController : AbpController 
    {
        [DisableAuditing]
        public async Task<ActionResult> MyAction() { ... }
    }
    ```
*   **Application Service hoặc Method**: Tương tự như với controller.

### Mở rộng hệ thống Audit Logging

Bạn có thể thêm thông tin tùy chỉnh vào các bản ghi kiểm tra bằng cách tạo một lớp kế thừa từ `AuditLogContributor` và đăng ký nó.

```csharp
public class MyAuditLogContributor : AuditLogContributor
{
    public override void PreContribute(AuditLogContributionContext context)
    {
        var currentUser = context.ServiceProvider.GetRequiredService<ICurrentUser>();
        context.AuditInfo.SetProperty(
            "MyCustomClaimValue",
            currentUser.FindClaimValue("MyCustomClaim")
        );
    }
}

// Đăng ký trong module của bạn
Configure<AbpAuditingOptions>(options =>
{
    options.Contributors.Add(new MyAuditLogContributor());
});
```

### Lưu trữ (Storage)

Hệ thống ghi nhật ký kiểm tra sử dụng `IAuditingStore` để lưu trữ các bản ghi. Module Audit Logging được cài đặt sẵn trong các mẫu dự án sẽ lưu trữ chúng vào cơ sở dữ liệu, hỗ trợ nhiều nhà cung cấp cơ sở dữ liệu khác nhau.

## 2. Công việc nền (Background Jobs)

Các công việc nền (Background Jobs) được sử dụng để xếp hàng các tác vụ sẽ được thực thi ở chế độ nền. Điều này rất hữu ích cho các tác vụ chạy dài mà không muốn người dùng phải chờ đợi, hoặc để đảm bảo một tác vụ sẽ được thực thi thành công thông qua việc thử lại.

### Các tính năng chính

*   **Tác vụ chạy dài**: Thực thi các công việc tốn nhiều thời gian (ví dụ: xuất báo cáo) mà không ảnh hưởng đến trải nghiệm người dùng.
*   **Độ tin cậy**: Các công việc nền có tính bền bỉ (persistent), nghĩa là chúng sẽ được thử lại nếu thất bại và sẽ được thực thi ngay cả khi ứng dụng khởi động lại.
*   **Hàng đợi (Queue)**: Các công việc được thêm vào một hàng đợi và được xử lý tuần tự hoặc song song, tùy thuộc vào cấu hình.

### Tạo một Background Job

Để tạo một công việc nền, bạn cần tạo một lớp kế thừa từ `BackgroundJob<TArgs>` hoặc `AsyncBackgroundJob<TArgs>`.

1.  **Định nghĩa đối số (Arguments)**: Tạo một lớp đơn giản để chứa dữ liệu cho công việc.
    ```csharp
    public class EmailSendingArgs
    {
        public string EmailAddress { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
    }
    ```

2.  **Tạo lớp công việc**:
    ```csharp
    public class EmailSendingJob : AsyncBackgroundJob<EmailSendingArgs>, ITransientDependency
    {
        private readonly IEmailSender _emailSender;

        public EmailSendingJob(IEmailSender emailSender)
        {
            _emailSender = emailSender;
        }

        public override async Task ExecuteAsync(EmailSendingArgs args)
        {
            await _emailSender.SendAsync(
                args.EmailAddress,
                args.Subject,
                args.Body
            );
        }
    }
    ```

### Thêm công việc vào hàng đợi

Sử dụng `IBackgroundJobManager` để thêm công việc vào hàng đợi.

```csharp
public class MyService : ITransientDependency
{
    private readonly IBackgroundJobManager _backgroundJobManager;

    public MyService(IBackgroundJobManager backgroundJobManager)
    {
        _backgroundJobManager = backgroundJobManager;
    }

    public async Task DoSomethingAsync()
    {
        await _backgroundJobManager.EnqueueAsync(
            new EmailSendingArgs
            {
                EmailAddress = "test@example.com",
                Subject = "Hello World!",
                Body = "This is a test email."
            }
        );
    }
}
```

Bạn cũng có thể đặt độ ưu tiên (`priority`) hoặc độ trễ (`delay`) cho công việc.

### Trình quản lý mặc định (Default Manager)

ABP cung cấp một trình quản lý công việc nền mặc định:

*   Hoạt động theo cơ chế **FIFO** trong một luồng duy nhất.
*   **Tự động thử lại** khi có lỗi, với khoảng thời gian chờ tăng dần.
*   **Lưu trữ** công việc trong cơ sở dữ liệu (sử dụng `IBackgroundJobStore`).
*   Tương thích với môi trường **cluster** (nhiều instance chạy đồng thời) thông qua distributed lock.

### Tích hợp

ABP Framework cho phép tích hợp với các thư viện quản lý công việc nền mạnh mẽ khác như:

*   **Hangfire**: Cung cấp giao diện dashboard để theo dõi và quản lý công việc.
*   **RabbitMQ**: Sử dụng message queue để xử lý các công việc một cách hiệu quả và tin cậy trong các hệ thống phân tán.
*   **Quartz**: Một thư viện lập lịch công việc mạnh mẽ, cho phép định cấu hình các công việc chạy theo lịch trình phức tạp.

Để sử dụng các trình quản lý này, bạn cần cài đặt gói NuGet tương ứng và cấu hình trong ứng dụng của mình.

## 3. Worker nền (Background Workers)

Worker nền là các luồng (thread) độc lập chạy trong nền của ứng dụng, thường được sử dụng để thực hiện các tác vụ định kỳ.

### Sự khác biệt giữa Background Workers và Background Jobs

*   **Background Workers** thường chạy liên tục trong suốt vòng đời của ứng dụng để thực hiện các công việc định kỳ (ví dụ: xóa log cũ sau mỗi giờ). Chúng là các dịch vụ singleton.
*   **Background Jobs** được xếp vào hàng đợi để thực thi một lần (có thể thử lại nếu thất bại) cho một tác vụ cụ thể (ví dụ: gửi email xác nhận đăng ký).

### Tạo một Background Worker

ABP Framework cung cấp các lớp cơ sở để tạo worker một cách dễ dàng:

*   **`BackgroundWorkerBase`**: Lớp cơ sở chung cho các worker. Bạn cần tự quản lý vòng lặp và logic bắt đầu/dừng.
*   **`AsyncPeriodicBackgroundWorkerBase`**: Lớp tiện ích để tạo các worker chạy định kỳ.

#### Ví dụ về `AsyncPeriodicBackgroundWorkerBase`

Worker này sẽ kiểm tra và cập nhật trạng thái của những người dùng không hoạt động sau mỗi 10 phút.

```csharp
public class PassiveUserCheckerWorker : AsyncPeriodicBackgroundWorkerBase
{
    public PassiveUserCheckerWorker(
            AbpAsyncTimer timer,
            IServiceScopeFactory serviceScopeFactory
        ) : base(timer, serviceScopeFactory)
    {
        Timer.Period = 600000; // 10 phút
    }

    protected async override Task DoWorkAsync(PeriodicBackgroundWorkerContext workerContext)
    {
        Logger.LogInformation("Bắt đầu kiểm tra người dùng không hoạt động...");

        var userRepository = workerContext
            .ServiceProvider
            .GetRequiredService<IUserRepository>();

        await userRepository.UpdateInactiveUserStatusesAsync();

        Logger.LogInformation("Hoàn thành kiểm tra người dùng không hoạt động.");
    }
}
```

*   `Timer.Period` xác định khoảng thời gian giữa các lần thực thi.
*   Logic công việc được đặt trong phương thức `DoWorkAsync`.
*   Nên resolve các dependency từ `workerContext.ServiceProvider` thay vì tiêm vào constructor để đảm bảo quản lý scope chính xác.

### Đăng ký Background Worker

Bạn cần đăng ký worker của mình với `IBackgroundWorkerManager`, thường là trong phương thức `OnApplicationInitializationAsync` của module.

```csharp
[DependsOn(typeof(AbpBackgroundWorkersModule))]
public class MyModule : AbpModule
{
    public override async Task OnApplicationInitializationAsync(
        ApplicationInitializationContext context)
    {
        await context.AddBackgroundWorkerAsync<PassiveUserCheckerWorker>();
    }
}
```

### Chạy trên môi trường Cluster

Khi chạy ứng dụng trên nhiều instance, cần lưu ý rằng mỗi instance sẽ chạy cùng một worker. Điều này có thể gây ra xung đột nếu các worker cùng truy cập vào một tài nguyên. Các giải pháp bao gồm:

*   **Sử dụng Distributed Lock**: Đảm bảo chỉ một worker thực thi tại một thời điểm.
*   **Vô hiệu hóa worker**: Tắt worker trên tất cả các instance trừ một.
*   **Tạo một ứng dụng riêng**: Xây dựng một ứng dụng riêng chỉ để chạy các background worker.

### Tích hợp

Tương tự như Background Jobs, Background Workers cũng có thể tích hợp với các thư viện như **Hangfire** và **Quartz** để có khả năng lập lịch và quản lý mạnh mẽ hơn.

## 4. Lưu trữ BLOB (BLOB Storing)

Hệ thống lưu trữ BLOB (Binary Large Object) cung cấp một lớp trừu tượng để lưu trữ và truy xuất các đối tượng nhị phân lớn, chẳng hạn như tệp tin, hình ảnh, video, v.v.

### Lợi ích của việc sử dụng Abstraction

*   **Dễ dàng tích hợp**: Kết nối với các nhà cung cấp lưu trữ phổ biến (File System, Azure Blob Storage, AWS S3, v.v.) chỉ với vài dòng cấu hình.
*   **Dễ dàng thay đổi**: Thay đổi nhà cung cấp lưu trữ mà không cần sửa đổi mã nguồn ứng dụng.
*   **Tương thích với Multi-Tenancy**: Tự động phân tách dữ liệu của các tenant khác nhau.

### Container

Hệ thống lưu trữ BLOB hoạt động dựa trên khái niệm **container**. Mỗi container là một không gian lưu trữ riêng biệt và có thể được cấu hình để sử dụng một nhà cung cấp lưu trữ khác nhau.

*   **Container mặc định (`IBlobContainer`)**: Dành cho các trường hợp sử dụng đơn giản.
*   **Container được định kiểu (`IBlobContainer<T>`)**: Cách tiếp cận được khuyến nghị, giúp quản lý và cấu hình các container một cách rõ ràng và an toàn.

#### Tạo một Typed Container

```csharp
[BlobContainerName("profile-pictures")]
public class ProfilePictureContainer
{
}
```

### Sử dụng `IBlobContainer`

Tiêm `IBlobContainer<T>` vào service của bạn để thực hiện các thao tác lưu, đọc và xóa BLOB.

```csharp
public class MyService : ITransientDependency
{
    private readonly IBlobContainer<ProfilePictureContainer> _blobContainer;

    public MyService(IBlobContainer<ProfilePictureContainer> blobContainer)
    {
        _blobContainer = blobContainer;
    }

    public async Task SaveBytesAsync(string blobName, byte[] bytes)
    {
        // Ghi đè nếu đã tồn tại
        await _blobContainer.SaveAsync(blobName, bytes, overrideExisting: true);
    }

    public async Task<byte[]> GetBytesAsync(string blobName)
    {
        return await _blobContainer.GetAllBytesOrNullAsync(blobName);
    }
}
```

### Cấu hình nhà cung cấp (Provider)

Bạn cần cấu hình ít nhất một nhà cung cấp lưu trữ để hệ thống hoạt động. Cấu hình được thực hiện trong phương thức `ConfigureServices` của module.

#### Ví dụ: Cấu hình File System Provider

```csharp
Configure<AbpBlobStoringOptions>(options =>
{
    options.Containers.Configure<ProfilePictureContainer>(container =>
    {
        container.UseFileSystem(fileSystem =>
        {
            fileSystem.BasePath = "C:\\my-files\\profile-pictures";
        });
    });
});
```

#### Ví dụ: Cấu hình Azure Blob Storage Provider

```csharp
Configure<AbpBlobStoringOptions>(options =>
{
    options.Containers.ConfigureDefault(container =>
    {
        container.UseAzure(azure =>
        {
            azure.ConnectionString = "your-azure-connection-string";
            azure.ContainerName = "your-azure-container-name";
            azure.CreateContainerIfNotExists = true;
        });
    });
});
```

ABP Framework hỗ trợ nhiều nhà cung cấp khác nhau, bao gồm:

*   File System
*   Database
*   Azure Blob Storage
*   Amazon S3
*   Aliyun OSS
*   MinIO
*   Google Cloud Storage
*   Bunny.net 

## 5. Cancellation Token Provider

`CancellationToken` cho phép hủy bỏ các tác vụ một cách hợp tác giữa các luồng (threads) hoặc các đối tượng `Task`. ABP Framework cung cấp `ICancellationTokenProvider` để lấy `CancellationToken` từ một nguồn cụ thể, giúp quản lý việc hủy bỏ một cách nhất quán.

### Tự động hóa

Trong hầu hết các trường hợp, **ABP tự động hóa việc sử dụng cancellation token**. Ví dụ, trong các ứng dụng ASP.NET Core, ABP tự động lấy token từ `HttpContext.RequestAborted` và truyền nó vào các truy vấn cơ sở dữ liệu và các hoạt động có thể hủy khác. Do đó, bạn thường không cần phải quản lý `CancellationToken` một cách thủ công.

### Khi nào cần sử dụng `ICancellationTokenProvider`

Bạn chỉ cần sử dụng `ICancellationTokenProvider` khi muốn:

*   Thêm logic hủy bỏ tùy chỉnh vào các tác vụ của riêng bạn.
*   Truyền `CancellationToken` đến các phương thức bên ngoài ABP Framework.

### Sử dụng `ICancellationTokenProvider`

Tiêm `ICancellationTokenProvider` vào dịch vụ của bạn thông qua Dependency Injection để truy cập vào token.

```csharp
public class MyService : ITransientDependency
{
    private readonly ICancellationTokenProvider _cancellationTokenProvider;

    public MyService(ICancellationTokenProvider cancellationTokenProvider)
    {
        _cancellationTokenProvider = cancellationTokenProvider;
    }

    public async Task DoLongRunningTaskAsync()
    {
        while (!_cancellationTokenProvider.Token.IsCancellationRequested)
        {
            // Thực hiện công việc...
            await Task.Delay(1000, _cancellationTokenProvider.Token);
        }

        // Dọn dẹp sau khi tác vụ bị hủy
    }
}
```

### Các Provider tích hợp sẵn

*   `HttpContextCancellationTokenProvider`: Provider mặc định cho các ứng dụng ASP.NET Core, lấy token từ yêu cầu HTTP hiện tại. Khi người dùng hủy yêu cầu (ví dụ: đóng tab trình duyệt), token sẽ được kích hoạt.
*   `NullCancellationTokenProvider`: Cung cấp `CancellationToken.None`, một token không bao giờ bị hủy. Đây là provider dự phòng khi không có provider nào khác được cấu hình.

Việc sử dụng `ICancellationTokenProvider` giúp mã nguồn của bạn gọn gàng hơn vì không cần phải truyền `CancellationToken` qua nhiều lớp phương thức.

## 6. Chống tấn công CSRF/XSRF (Anti-Forgery)

Tấn công giả mạo yêu cầu chéo trang (Cross-Site Request Forgery - CSRF hoặc XSRF) là một loại hình tấn công mà kẻ xấu lừa trình duyệt của người dùng thực hiện một hành động không mong muốn trên một trang web mà người dùng đã được xác thực.

### Giải pháp của ABP Framework

ABP **tự động hóa hoàn toàn** việc ngăn chặn tấn công CSRF và hoạt động ngay lập tức mà không cần cấu hình.

Cơ chế hoạt động như sau:

1.  **Server-side**: ABP tạo ra một anti-forgery token và lưu trữ nó trong một cookie đặc biệt (mặc định là `XSRF-TOKEN`).
2.  **Client-side**: Phía client (ví dụ: ứng dụng Angular) đọc token từ cookie này và tự động thêm nó vào header của mỗi yêu cầu AJAX (mặc định là header `RequestVerificationToken`).
3.  **Validation**: Server xác thực token này cho các yêu cầu từ trình duyệt. Các yêu cầu từ các client không phải trình duyệt (non-browser clients) sẽ được bỏ qua vì chúng không có nguy cơ bị tấn công CSRF.

Hệ thống này giúp bảo vệ ứng dụng một cách liền mạch mà không yêu cầu nhà phát triển phải can thiệp thủ công.

### Cấu hình và tùy chỉnh

Mặc dù hệ thống hoạt động tự động, bạn vẫn có thể tùy chỉnh nó thông qua `AbpAntiForgeryOptions`.

```csharp
Configure<AbpAntiForgeryOptions>(options =>
{
    // Thay đổi tên cookie chứa token
    options.TokenCookie.Name = "MY-XSRF-TOKEN";

    // Bỏ qua xác thực cho một số phương thức HTTP nhất định
    options.AutoValidateIgnoredHttpMethods.Add("PUT");
});
```

### Các thuộc tính (Attributes)

*   `[AbpAutoValidateAntiforgeryToken]`: Được áp dụng toàn cục, tự động xác thực token cho các phương thức HTTP không an toàn (POST, PUT, DELETE, PATCH).
*   `[AbpValidateAntiForgeryToken]`: Sử dụng để buộc xác thực token trên một action hoặc controller cụ thể, ngay cả với các phương thức như GET.
*   `[AbpIgnoreAntiforgeryToken]`: Dùng để bỏ qua việc xác thực token cho một action hoặc controller.

### Lưu ý cho Angular UI

Khi triển khai ứng dụng Angular và API trên cùng một domain, hãy đảm bảo rằng URL của API trong file `environment.ts` được đặt thành một chuỗi rỗng (`''`) hoặc một đường dẫn tương đối để cơ chế anti-forgery hoạt động chính xác.

```typescript
// environment.ts
export const environment = {
  // ...
  apis: {
    default: {
      url: '', // Hoặc '/my-api-base-path'
      // ...
    },
  },
};
```

## 7. Kiểm soát truy cập đồng thời (Concurrency Check)

Kiểm soát truy cập đồng thời là cơ chế đảm bảo tính nhất quán của dữ liệu khi có nhiều người dùng hoặc tiến trình cùng truy cập và sửa đổi dữ liệu tại cùng một thời điểm.

### Phương pháp tiếp cận của ABP: Optimistic Concurrency Control

ABP sử dụng phương pháp **Kiểm soát đồng thời lạc quan (Optimistic Concurrency Control)**. Thay vì khóa (lock) bản ghi khi có một người dùng đang chỉnh sửa, hệ thống cho phép nhiều người dùng cùng đọc và cố gắng cập nhật. Khi một người dùng lưu thay đổi, hệ thống sẽ kiểm tra xem dữ liệu có bị thay đổi bởi người khác trong thời gian đó hay không.

### Cách hoạt động với `IHasConcurrencyStamp`

Để kích hoạt tính năng này cho một thực thể (entity), bạn cần triển khai interface `IHasConcurrencyStamp`.

```csharp
public interface IHasConcurrencyStamp 
{
    string ConcurrencyStamp { get; set; }
}
```

*   **Tạo mới**: Khi một thực thể mới được tạo, ABP sẽ tự động gán một giá trị duy nhất (GUID) cho thuộc tính `ConcurrencyStamp`.
*   **Cập nhật**:
    1.  Khi người dùng yêu cầu chỉnh sửa một thực thể, giá trị `ConcurrencyStamp` hiện tại sẽ được gửi về phía client.
    2.  Khi người dùng gửi lại yêu cầu cập nhật, giá trị `ConcurrencyStamp` này sẽ được gửi kèm.
    3.  ABP sẽ so sánh giá trị `ConcurrencyStamp` từ client với giá trị hiện tại trong cơ sở dữ liệu.
        *   Nếu **khớp**, quá trình cập nhật diễn ra và một giá trị `ConcurrencyStamp` mới sẽ được tạo.
        *   Nếu **không khớp**, có nghĩa là một người dùng khác đã cập nhật thực thể này. ABP sẽ ném ra một ngoại lệ `AbpDbConcurrencyException` và hủy bỏ thao tác cập nhật.

### Triển khai

1.  **Entity**: Đảm bảo thực thể của bạn kế thừa từ các lớp cơ sở như `AggregateRoot` hoặc `FullAuditedAggregateRoot`, vì chúng đã triển khai sẵn `IHasConcurrencyStamp`.
    ```csharp
    public class Book : FullAuditedAggregateRoot<Guid>
    {
        // ConcurrencyStamp đã được kế thừa
        public string Name { get; set; }
    }
    ```

2.  **DTO**: DTO dùng để cập nhật (Update DTO) cũng cần triển khai `IHasConcurrencyStamp` để nhận giá trị từ client.
    ```csharp
    public class UpdateBookDto : IHasConcurrencyStamp 
    {
        public string Name { get; set; }
        public string ConcurrencyStamp { get; set; }
    }
    ```

3.  **Application Service**: Trong phương thức `UpdateAsync`, gán giá trị `ConcurrencyStamp` từ DTO vào thực thể trước khi cập nhật.
    ```csharp
    public async Task<BookDto> UpdateAsync(Guid id, UpdateBookDto input) 
    {
        var book = await _bookRepository.GetAsync(id);
        
        // Gán giá trị ConcurrencyStamp từ input vào entity
        book.ConcurrencyStamp = input.ConcurrencyStamp;

        book.Name = input.Name;
        // ...
        
        await _bookRepository.UpdateAsync(book);
        return ObjectMapper.Map<Book, BookDto>(book);
    }
    ```

Khi có xung đột xảy ra, ABP sẽ tự động xử lý và hiển thị một thông báo lỗi thân thiện cho người dùng, yêu cầu họ tải lại dữ liệu mới nhất trước khi thực hiện thay đổi.

## 8. Người dùng hiện tại (Current User)

Trong hầu hết các ứng dụng, chúng ta cần truy cập thông tin của người dùng đang đăng nhập để thực hiện các kiểm tra về quyền hạn, hiển thị thông tin cá nhân hoặc ghi lại dấu vết hoạt động. ABP Framework cung cấp một dịch vụ `ICurrentUser` để dễ dàng thực hiện việc này.

### `ICurrentUser` Service

`ICurrentUser` là một dịch vụ có phạm vi (scoped), có thể được tiêm (inject) vào bất kỳ lớp nào (như Application Services, Domain Services, Controllers, v.v.) thông qua Dependency Injection.

#### Các thuộc tính chính

*   `IsAuthenticated` (bool): Trả về `true` nếu người dùng đã đăng nhập.
*   `Id` (Guid?): ID của người dùng hiện tại, hoặc `null` nếu chưa đăng nhập.
*   `UserName` (string): Tên đăng nhập của người dùng.
*   `TenantId` (Guid?): ID của tenant hiện tại (trong ứng dụng multi-tenant).
*   `Roles` (string[]): Danh sách các vai trò (role) của người dùng.
*   `Email` (string), `PhoneNumber` (string), `Name` (string), `SurName` (string): Các thông tin cơ bản khác của người dùng.

### Sử dụng

Bạn có thể tiêm `ICurrentUser` vào constructor của một lớp và sử dụng các thuộc tính của nó.

```csharp
public class MyService : ITransientDependency
{
    private readonly ICurrentUser _currentUser;

    public MyService(ICurrentUser currentUser)
    {
        _currentUser = currentUser;
    }

    public void DoSomething()
    {
        if (_currentUser.IsAuthenticated)
        {
            var userId = _currentUser.Id;
            var userRoles = _currentUser.Roles;
            // ... thực hiện logic dựa trên thông tin người dùng
        }
    }
}
```

### Các phương thức mở rộng (Extension Methods)

`ICurrentUser` cũng cung cấp các phương thức mở rộng hữu ích:

*   `GetId()`: Trả về ID của người dùng. Ném ra một `AbpAuthorizationException` nếu người dùng chưa đăng nhập.
*   `IsInRole(string roleName)`: Kiểm tra xem người dùng có thuộc một vai trò cụ thể hay không.
*   `FindClaim(string claimType)`: Tìm một claim cụ thể.
*   `FindClaimValue(string claimType)`: Lấy giá trị của một claim.

### Tùy chỉnh và thay thế

`ICurrentUser` được triển khai bởi lớp `CurrentUser`. Bạn có thể thay thế nó bằng một triển khai tùy chỉnh của riêng mình nếu cần. Ví dụ, bạn có thể thêm một thuộc tính mới vào `ICurrentUser` bằng cách kế thừa và đăng ký lại trong hệ thống Dependency Injection.

Việc sử dụng `ICurrentUser` giúp tách biệt logic nghiệp vụ khỏi các chi tiết về xác thực và session, làm cho mã nguồn trở nên sạch sẽ và dễ kiểm thử hơn. 

## 9. Lọc dữ liệu (Data Filtering)

ABP Framework cung cấp một hệ thống lọc dữ liệu tự động, giúp dễ dàng triển khai các kịch bản phổ biến như soft-delete và multi-tenancy.

### Các bộ lọc được định nghĩa sẵn

ABP đi kèm với một số bộ lọc được tích hợp sẵn, hoạt động tự động khi bạn truy vấn dữ liệu thông qua repository.

#### `ISoftDelete`

Khi một thực thể triển khai interface `ISoftDelete`, nó sẽ không bị xóa vĩnh viễn khỏi cơ sở dữ liệu. Thay vào đó, thuộc tính `IsDeleted` của nó sẽ được đặt thành `true`.

```csharp
public class Book : AggregateRoot<Guid>, ISoftDelete
{
    public string Name { get; set; }
    public bool IsDeleted { get; set; } // Được định nghĩa bởi ISoftDelete
}
```

Theo mặc định, các thực thể đã bị "xóa mềm" sẽ **tự động được lọc ra** khỏi các truy vấn. Điều này có nghĩa là bạn không cần phải thêm điều kiện `x.IsDeleted == false` vào mỗi truy vấn của mình.

#### `IMultiTenant`

Trong các ứng dụng multi-tenant (đa khách hàng), việc cô lập dữ liệu giữa các tenant là rất quan trọng. Bằng cách triển khai interface `IMultiTenant`, bạn có thể đảm bảo rằng người dùng chỉ có thể truy cập dữ liệu thuộc về tenant của họ.

```csharp
public class Book : AggregateRoot<Guid>, IMultiTenant
{
    public string Name { get; set; }
    public Guid? TenantId { get; set; } // Được định nghĩa bởi IMultiTenant
}
```

Hệ thống sẽ tự động thêm điều kiện `x.TenantId == CurrentTenant.Id` vào các truy vấn.

### Kích hoạt và vô hiệu hóa bộ lọc (`IDataFilter`)

Đôi khi, bạn cần truy cập vào cả những dữ liệu đã bị lọc (ví dụ: xem các bản ghi đã bị xóa). Bạn có thể sử dụng dịch vụ `IDataFilter` để tạm thời vô hiệu hóa một bộ lọc.

```csharp
public class MyService : ITransientDependency
{
    private readonly IDataFilter _dataFilter;
    private readonly IRepository<Book, Guid> _bookRepository;

    public MyService(IDataFilter dataFilter, IRepository<Book, Guid> bookRepository)
    {
        _dataFilter = dataFilter;
        _bookRepository = bookRepository;
    }

    public async Task<List<Book>> GetAllBooksIncludingDeletedAsync()
    {
        // Tạm thời vô hiệu hóa bộ lọc ISoftDelete
        using (_dataFilter.Disable<ISoftDelete>())
        {
            return await _bookRepository.GetListAsync();
        }
    }
}
```

Việc sử dụng `using` đảm bảo rằng bộ lọc sẽ được kích hoạt lại sau khi khối mã kết thúc, tránh ảnh hưởng đến các phần khác của ứng dụng.

### Định nghĩa bộ lọc tùy chỉnh

Bạn cũng có thể tạo các bộ lọc của riêng mình. Ví dụ, bạn có thể tạo một bộ lọc `IIsActive` để chỉ lấy các bản ghi đang hoạt động.

1.  **Tạo Interface**:
    ```csharp
    public interface IIsActive
    {
        bool IsActive { get; }
    }
    ```

2.  **Triển khai trên Entity**:
    ```csharp
    public class Product : AggregateRoot<Guid>, IIsActive
    {
        public string Name { get; set; }
        public bool IsActive { get; set; }
    }
    ```

3.  **Cấu hình trong `DbContext` (đối với EF Core)**: Ghi đè phương thức `CreateFilterExpression` trong `DbContext` của bạn để áp dụng bộ lọc.
    ```csharp
    protected override Expression<Func<TEntity, bool>> CreateFilterExpression<TEntity>()
    {
        var expression = base.CreateFilterExpression<TEntity>();
        if (typeof(IIsActive).IsAssignableFrom(typeof(TEntity)))
        {
            Expression<Func<TEntity, bool>> isActiveFilter =
                e => !DataFilter.IsEnabled<IIsActive>() || EF.Property<bool>(e, "IsActive");
            expression = expression == null ? isActiveFilter : CombineExpressions(expression, isActiveFilter);
        }
        return expression;
    }
    ```

Hệ thống lọc dữ liệu của ABP giúp đơn giản hóa việc truy vấn và đảm bảo các quy tắc nghiệp vụ được áp dụng một cách nhất quán trên toàn bộ ứng dụng. 

## 10. Cung cấp dữ liệu ban đầu (Data Seeding)

Nhiều ứng dụng cần có một số dữ liệu ban đầu (initial data) để có thể hoạt động, ví dụ như tài khoản quản trị viên (admin), các vai trò (roles) mặc định, hoặc các dữ liệu cấu hình cơ bản. Hệ thống Data Seeding của ABP Framework cung cấp một cơ chế mạnh mẽ và linh hoạt để thực hiện việc này.

### `IDataSeedContributor`

Để thêm dữ liệu ban đầu, bạn cần tạo một lớp triển khai interface `IDataSeedContributor`. ABP sẽ tự động phát hiện và thực thi các lớp này.

```csharp
public class MyDataSeedContributor : IDataSeedContributor, ITransientDependency
{
    private readonly IRepository<Book, Guid> _bookRepository;

    public MyDataSeedContributor(IRepository<Book, Guid> bookRepository)
    {
        _bookRepository = bookRepository;
    }

    public async Task SeedAsync(DataSeedContext context)
    {
        // Kiểm tra xem đã có dữ liệu chưa để tránh thêm trùng lặp
        if (await _bookRepository.GetCountAsync() > 0)
        {
            return;
        }

        await _bookRepository.InsertAsync(
            new Book { Name = "Default Book 1" },
            autoSave: true
        );
    }
}
```

*   **Tính module**: Mỗi module có thể có `IDataSeedContributor` của riêng mình để cung cấp dữ liệu ban đầu cần thiết cho module đó.
*   **Dependency Injection**: Bạn có thể tiêm (inject) bất kỳ dịch vụ nào bạn cần vào `IDataSeedContributor` để thực hiện các logic phức tạp.
*   **Multi-Tenancy**: `DataSeedContext` chứa `TenantId`, cho phép bạn cung cấp dữ liệu cho một tenant cụ thể.

### Khi nào và làm thế nào để thực thi Data Seeding?

ABP Framework khuyến nghị một quy trình rõ ràng để thực thi việc seeding dữ liệu, đặc biệt là trong môi trường production.

*   **Trong môi trường Production**: Các mẫu dự án của ABP thường đi kèm với một dự án Console có tên là `*.DbMigrator`. Đây là công cụ được đề xuất để thực hiện cả việc di chuyển (migrate) schema cơ sở dữ liệu và seeding dữ liệu. Việc chạy `DbMigrator` trước khi triển khai phiên bản mới của ứng dụng đảm bảo rằng cơ sở dữ liệu luôn ở trạng thái sẵn sàng.
*   **Trong môi trường Development**: Sử dụng `*.DbMigrator` cũng là cách tiếp cận được khuyến khích trong quá trình phát triển.
*   **Trong môi trường Testing**: Dữ liệu ban đầu cũng rất quan trọng cho việc kiểm thử tự động (automated testing). Bạn có thể tạo các `IDataSeedContributor` riêng cho môi trường test để cung cấp các dữ liệu cần thiết cho các kịch bản kiểm thử.

Sử dụng hệ thống Data Seeding của ABP giúp đảm bảo rằng ứng dụng của bạn luôn có dữ liệu cần thiết để khởi động và hoạt động một cách chính xác, đồng thời giữ cho logic seeding được tổ chức một cách rõ ràng và có thể tái sử dụng. 

## 11. Khóa phân tán (Distributed Locking)

Trong các hệ thống phân tán hoặc chạy trên nhiều instance (clustered environment), việc nhiều tiến trình cùng lúc cố gắng truy cập hoặc sửa đổi một tài nguyên dùng chung có thể dẫn đến xung đột và làm hỏng dữ liệu. Khóa phân tán là một kỹ thuật được sử dụng để đảm bảo rằng tại một thời điểm, chỉ có một tiến trình duy nhất được phép truy cập vào tài nguyên đó.

### Tích hợp và Cấu hình

ABP Framework tích hợp với thư viện [DistributedLock](https://github.com/madelson/DistributedLock), cung cấp một lớp trừu tượng (`IAbpDistributedLock`) và hỗ trợ nhiều nhà cung cấp (provider) khác nhau như Redis, ZooKeeper, SQL Server, v.v.

Để sử dụng, bạn cần:

1.  **Cài đặt gói NuGet**: Thêm gói `Volo.Abp.DistributedLocking` vào dự án của bạn.
2.  **Cấu hình Provider**: Cài đặt gói NuGet cho provider bạn muốn sử dụng (ví dụ: `DistributedLock.Redis`) và cấu hình nó trong phương thức `ConfigureServices` của module.

    ```csharp
    // Cấu hình Redis provider
    context.Services.AddSingleton<IDistributedLockProvider>(sp =>
    {
        var connection = ConnectionMultiplexer.Connect(configuration["Redis:Configuration"]);
        return new RedisDistributedSynchronizationProvider(connection.GetDatabase());
    });
    ```

### Sử dụng `IAbpDistributedLock`

Cách đơn giản nhất để sử dụng khóa phân tán là tiêm (inject) dịch vụ `IAbpDistributedLock`.

```csharp
public class MyService : ITransientDependency
{
    private readonly IAbpDistributedLock _distributedLock;

    public MyService(IAbpDistributedLock distributedLock)
    {
        _distributedLock = distributedLock;
    }

    public async Task DoCriticalWorkAsync()
    {
        // Cố gắng chiếm giữ khóa với tên "MyLockName"
        await using (var handle = await _distributedLock.TryAcquireAsync("MyLockName"))
        {
            if (handle != null)
            {
                // Khóa đã được chiếm giữ thành công
                // Thực hiện các thao tác trên tài nguyên dùng chung ở đây
            }
            else
            {
                // Không thể chiếm giữ khóa, một tiến trình khác đang giữ nó
                // Xử lý logic phù hợp, ví dụ: thử lại sau hoặc thông báo lỗi
            }
        }
        // Khóa sẽ tự động được giải phóng khi ra khỏi khối `using`
    }
}
```

*   `TryAcquireAsync("MyLockName")`: Cố gắng lấy một khóa có tên là `"MyLockName"`. Nếu khóa đang bị giữ bởi một tiến trình khác, phương thức này sẽ trả về `null`.
*   `await using`: Đảm bảo rằng khóa sẽ được giải phóng (released) một cách an toàn ngay cả khi có lỗi xảy ra bên trong khối mã.
*   Bạn có thể truyền vào một `TimeSpan` để chỉ định thời gian chờ (timeout) để lấy khóa.

Sử dụng khóa phân tán là rất quan trọng để đảm bảo tính toàn vẹn của dữ liệu và tránh các điều kiện tranh chấp (race conditions) trong các hệ thống phức tạp, có nhiều tiến trình chạy đồng thời.

## 12. Gửi Email (Emailing)

ABP Framework cung cấp một hệ thống gửi email được trừu tượng hóa, giúp bạn dễ dàng gửi email mà không phụ thuộc vào một nhà cung cấp cụ thể.

### `IEmailSender` Service

Cách tiếp cận được khuyến nghị để gửi email là sử dụng dịch vụ `IEmailSender`. Bạn có thể tiêm (inject) dịch vụ này vào bất kỳ lớp nào và sử dụng phương thức `SendAsync`.

```csharp
public class MyService : ITransientDependency
{
    private readonly IEmailSender _emailSender;

    public MyService(IEmailSender emailSender)
    {
        _emailSender = emailSender;
    }

    public async Task SendTestEmailAsync()
    {
        await _emailSender.SendAsync(
            "target@example.com", // Địa chỉ email người nhận
            "Test Subject",       // Tiêu đề email
            "<h1>This is a test email body</h1>" // Nội dung email (hỗ trợ HTML)
        );
    }
}
```

Việc sử dụng `IEmailSender` giúp mã nguồn của bạn không bị phụ thuộc vào một thư viện gửi email cụ thể.

### Tích hợp với MailKit

Mặc dù ABP cung cấp một triển khai mặc định dựa trên `SmtpClient`, khuyến nghị sử dụng [MailKit](https://github.com/jstedfast/MailKit), một thư viện gửi email mạnh mẽ và phổ biến.

Để sử dụng MailKit, bạn cần:
1.  Cài đặt gói NuGet `Volo.Abp.MailKit`.
2.  Thêm `AbpMailKitModule` vào danh sách phụ thuộc của module của bạn.

Sau khi cài đặt, `IEmailSender` sẽ tự động sử dụng MailKit để gửi email.

### Cấu hình

Hệ thống gửi email sử dụng `Setting Management` để cấu hình các thông số SMTP. Các cài đặt này có thể được quản lý thông qua giao diện người dùng (nếu bạn sử dụng mô-đun Setting Management) hoặc cấu hình trực tiếp trong file `appsettings.json`.

```json
{
  "Settings": {
    "Abp.Mailing.Smtp.Host": "smtp.your-provider.com",
    "Abp.Mailing.Smtp.Port": "587",
    "Abp.Mailing.Smtp.UserName": "your-username",
    "Abp.Mailing.Smtp.Password": "your-encrypted-password",
    "Abp.Mailing.Smtp.EnableSsl": "true",
    "Abp.Mailing.DefaultFromAddress": "noreply@yourdomain.com",
    "Abp.Mailing.DefaultFromDisplayName": "Your Application Name"
  }
}
```

**Lưu ý**: Mật khẩu SMTP (`Abp.Mailing.Smtp.Password`) cần được mã hóa. Bạn có thể sử dụng `ISettingEncryptionService` để mã hóa giá trị trước khi đặt vào file cấu hình.

### Xếp hàng Email (Queueing)

Để tránh làm chậm các yêu cầu của người dùng, bạn có thể xếp hàng email để gửi chúng ở chế độ nền. `IEmailSender` cung cấp phương thức `QueueAsync`, phương thức này sẽ thêm email vào hệ thống `Background Jobs`.

```csharp
await _emailSender.QueueAsync(
    "target@example.com",
    "Test Subject",
    "This is a test email body"
);
```

### Mẫu Email (Email Templating)

Bạn có thể kết hợp hệ thống gửi email với `Text Templating` để tạo các nội dung email động và có thể tùy chỉnh. Điều này rất hữu ích cho việc gửi các email chào mừng, email đặt lại mật khẩu, v.v. 

## 13. Cache thực thể (Entity Cache)

Hệ thống cache thực thể của ABP Framework cung cấp một cách hiệu quả để lưu trữ các thực thể thường xuyên được truy cập vào bộ nhớ đệm, giúp giảm tải cho cơ sở dữ liệu và cải thiện hiệu suất ứng dụng. Đây là một hệ thống cache chỉ đọc (read-only), được thiết kế để tự động vô hiệu hóa (invalidate) khi thực thể tương ứng bị thay đổi hoặc xóa.

### `IDistributedEntityCache`

Dịch vụ cốt lõi của hệ thống này là `IDistributedEntityCache<TEntity, TKey>`, cho phép bạn dễ dàng cache các thực thể theo khóa chính (primary key) của chúng.

```csharp
public class MyService : ITransientDependency
{
    private readonly IDistributedEntityCache<Book, Guid> _bookCache;

    public MyService(IDistributedEntityCache<Book, Guid> bookCache)
    {
        _bookCache = bookCache;
    }

    public async Task<Book> GetBookAsync(Guid id)
    {
        // Lấy sách từ cache, nếu không có sẽ tự động truy vấn từ cơ sở dữ liệu và cache lại
        return await _bookCache.GetAsync(id);
    }
}
```

### Cách hoạt động

*   **Tự động truy vấn**: Khi bạn gọi `GetAsync(id)`, nếu thực thể không có trong cache, hệ thống sẽ tự động sử dụng repository để truy vấn từ cơ sở dữ liệu, sau đó lưu kết quả vào cache trước khi trả về.
*   **Tự động vô hiệu hóa**: Hệ thống tự động lắng nghe các sự kiện thay đổi dữ liệu (Data Change Events). Khi một thực thể được cập nhật hoặc xóa, mục cache tương ứng sẽ tự động bị xóa bỏ, đảm bảo rằng lần truy cập tiếp theo sẽ lấy dữ liệu mới nhất từ cơ sở dữ liệu.
*   **Hỗ trợ cache phân tán**: `IDistributedEntityCache` hoạt động tốt trong các môi trường phân tán (ví dụ: nhiều instance của ứng dụng). Khi một instance cập nhật một thực thể, các instance khác sẽ được thông báo để vô hiệu hóa cache của chúng.

### Cấu hình

Bạn có thể cấu hình các tùy chọn cache cho từng loại thực thể, chẳng hạn như thời gian hết hạn (expiration time).

```csharp
Configure<AbpDistributedCacheOptions>(options =>
{
    options.EntityCacheOptions.Add(
        typeof(Book),
        new DistributedCacheEntryOptions
        {
            // Cache sẽ hết hạn sau 20 phút không được truy cập
            SlidingExpiration = TimeSpan.FromMinutes(20)
        }
    );
});
```

Hệ thống cache thực thể là một công cụ mạnh mẽ để tối ưu hóa hiệu suất cho các hoạt động đọc dữ liệu, đặc biệt hữu ích cho các thực thể ít thay đổi nhưng được truy cập thường xuyên. 

## 14. Bus sự kiện (Event Bus)

Event Bus là một cơ chế trung gian cho phép các thành phần khác nhau của ứng dụng giao tiếp với nhau một cách lỏng lẻo (loosely coupled) thông qua việc phát và lắng nghe các sự kiện. Điều này giúp giảm sự phụ thuộc trực tiếp giữa các module và service.

ABP Framework cung cấp hai loại Event Bus:

### Local Event Bus

*   **Phạm vi**: Hoạt động bên trong một tiến trình duy nhất (in-process).
*   **Sử dụng**: Phù hợp cho việc giao tiếp giữa các thành phần trong cùng một ứng dụng monolith hoặc trong cùng một microservice.
*   **Giao dịch (Transactional)**: Các handler (trình xử lý sự kiện) được thực thi trong cùng một unit of work với nơi phát sinh sự kiện. Nếu một handler ném ra ngoại lệ, toàn bộ giao dịch sẽ được rollback.

#### Phát sự kiện (Publishing)

Sử dụng `ILocalEventBus` để phát một sự kiện.

```csharp
public class MyService : ITransientDependency
{
    private readonly ILocalEventBus _localEventBus;

    public MyService(ILocalEventBus localEventBus)
    {
        _localEventBus = localEventBus;
    }

    public async Task DoSomethingAsync()
    {
        // ... logic nghiệp vụ
        await _localEventBus.PublishAsync(new MyEventData { Value = 42 });
    }
}
```

#### Lắng nghe sự kiện (Subscribing)

Tạo một lớp triển khai `ILocalEventHandler<TEventData>`.

```csharp
public class MyEventHandler : ILocalEventHandler<MyEventData>, ITransientDependency
{
    public Task HandleEventAsync(MyEventData eventData)
    {
        // Xử lý sự kiện ở đây
        Console.WriteLine($"Event handled with value: {eventData.Value}");
        return Task.CompletedTask;
    }
}
```

### Distributed Event Bus

*   **Phạm vi**: Hoạt động giữa các tiến trình khác nhau (inter-process), phù hợp cho kiến trúc microservices hoặc các ứng dụng phân tán.
*   **Sử dụng**: Cho phép các microservice hoặc các module khác nhau giao tiếp với nhau một cách bất đồng bộ.
*   **Nhà cung cấp (Providers)**: Cần một nhà cung cấp hàng đợi tin nhắn (message broker) như RabbitMQ, Kafka, hoặc Azure Service Bus để hoạt động. Nếu không có provider nào được cấu hình, nó sẽ hoạt động giống như Local Event Bus.
*   **Độ tin cậy**: Để đảm bảo tính nhất quán dữ liệu trong môi trường phân tán, ABP hỗ trợ mẫu **Inbox/Outbox** để đảm bảo không có sự kiện nào bị mất.

#### Phát sự kiện (Publishing)

Sử dụng `IDistributedEventBus`.

```csharp
await _distributedEventBus.PublishAsync(new MyDistributedEventData { ... });
```

#### Lắng nghe sự kiện (Subscribing)

Tạo một lớp triển khai `IDistributedEventHandler<TEventData>`.

```csharp
public class MyDistributedEventHandler : IDistributedEventHandler<MyDistributedEventData>, ITransientDependency
{
    public Task HandleEventAsync(MyDistributedEventData eventData)
    {
        // Xử lý sự kiện phân tán
        return Task.CompletedTask;
    }
}
```

### Các sự kiện được định nghĩa sẵn (Pre-built Events)

ABP tự động phát ra các sự kiện local khi có các thay đổi trên thực thể (entity), giúp bạn dễ dàng thực hiện các hành động phản ứng lại với các thay đổi dữ liệu.

*   `EntityCreatedEventData<TEntity>`
*   `EntityUpdatedEventData<TEntity>`
*   `EntityDeletedEventData<TEntity>`

Bạn có thể lắng nghe các sự kiện này để thực hiện các logic bổ sung, chẳng hạn như xóa cache, gửi thông báo, v.v. 

## 15. Hệ thống Tính năng (Features)

Hệ thống tính năng của ABP Framework cho phép bạn **bật/tắt** hoặc **thay đổi hành vi** của các chức năng ứng dụng một cách linh hoạt tại thời gian chạy (runtime). Điều này đặc biệt hữu ích trong các ứng dụng multi-tenant (SaaS), nơi bạn muốn cung cấp các gói dịch vụ khác nhau cho từng tenant.

### Các loại giá trị của Feature

Mặc dù một tính năng thường có giá trị là `boolean` (bật/tắt), hệ thống này cũng hỗ trợ các giá trị khác như `string`, `integer`, v.v. Điều này cho phép bạn cấu hình các giới hạn hoặc các giá trị tùy chỉnh.

### Định nghĩa Features

Để sử dụng một tính năng, trước tiên bạn cần định nghĩa nó bằng cách tạo một lớp kế thừa từ `FeatureDefinitionProvider`.

```csharp
public class MyFeatureDefinitionProvider : FeatureDefinitionProvider
{
    public override void Define(IFeatureDefinitionContext context)
    {
        var myGroup = context.AddGroup("MyApp");

        // Một tính năng boolean
        myGroup.AddFeature(
            "MyApp.PdfReporting", 
            defaultValue: "false",
            displayName: L("PdfReporting"),
            valueType: new ToggleStringValueType()
        );
        
        // Một tính năng với giá trị số
        myGroup.AddFeature(
            "MyApp.MaxProductCount",
            defaultValue: "10",
            displayName: L("MaxProductCount"),
            valueType: new FreeTextStringValueType(new NumericValueValidator(0, 1000))
        );
    }
}
```
*   **Feature Group**: Các tính năng được nhóm lại để dễ quản lý.
*   **Tên duy nhất**: Mỗi tính năng có một tên duy nhất (ví dụ: `MyApp.PdfReporting`).
*   **Giá trị mặc định**: `defaultValue` sẽ được sử dụng nếu không có giá trị nào khác được thiết lập.
*   **`valueType`**: Xác định loại giá trị và cách nó được hiển thị trên giao diện người dùng (ví dụ: `ToggleStringValueType` sẽ hiển thị một checkbox).

### Kiểm tra Features

Bạn có thể kiểm tra giá trị của một tính năng trong mã nguồn của mình bằng hai cách chính:

#### 1. Sử dụng `[RequiresFeature]` Attribute

Đây là cách khai báo đơn giản để yêu cầu một tính năng phải được bật. Nếu tính năng bị tắt, một `AbpAuthorizationException` sẽ được ném ra.

```csharp
[RequiresFeature("MyApp.PdfReporting")]
public class MyService : ApplicationService
{
    public async Task<FileResult> GetPdfReportAsync()
    {
        // Logic để tạo báo cáo PDF
    }
}
```

#### 2. Sử dụng `IFeatureChecker` Service

Tiêm (inject) `IFeatureChecker` để kiểm tra giá trị của một tính năng một cách linh hoạt hơn trong mã nguồn.

```csharp
public class ProductService : ApplicationService
{
    private readonly IFeatureChecker _featureChecker;

    public ProductService(IFeatureChecker featureChecker)
    {
        _featureChecker = featureChecker;
    }

    public async Task CreateProductAsync(CreateProductDto input)
    {
        var maxProductCount = await _featureChecker.GetAsync<int>("MyApp.MaxProductCount");
        var currentProductCount = await _productRepository.GetCountAsync();

        if (currentProductCount >= maxProductCount)
        {
            throw new BusinessException("MaxProductCountReached");
        }

        // Logic để tạo sản phẩm
    }
}
```
*   `IsEnabledAsync(name)`: Kiểm tra xem một tính năng boolean có được bật hay không.
*   `GetAsync<T>(name)`: Lấy giá trị của một tính năng với kiểu dữ liệu cụ thể.

### Quản lý Features

Hệ thống tính năng đi kèm với một giao diện quản lý tích hợp sẵn, cho phép quản trị viên dễ dàng cấu hình giá trị cho từng tenant. Nếu cần, bạn cũng có thể sử dụng `IFeatureManager` để thay đổi giá trị của các tính năng một cách programmatic.

Hệ thống tính năng là một công cụ mạnh mẽ để xây dựng các ứng dụng linh hoạt, đặc biệt là các giải pháp SaaS có nhiều cấp độ dịch vụ khác nhau. 

## 16. Tính năng toàn cục (Global Features)

Hệ thống Global Features được sử dụng để bật/tắt các tính năng của ứng dụng ở cấp độ phát triển (development time). Khác với hệ thống `Features` thông thường (hoạt động ở runtime), Global Features ảnh hưởng đến cấu trúc của ứng dụng, chẳng hạn như việc có đăng ký các service, tạo các bảng trong cơ sở dữ liệu hay không.

### Mục đích

Global Features đặc biệt hữu ích khi bạn phát triển các module có thể tái sử dụng. Ví dụ, một module CMS có thể bao gồm nhiều chức năng như blog, bình luận, diễn đàn, v.v. Thay vì buộc ứng dụng cuối cùng phải sử dụng tất cả các chức năng này, bạn có thể cho phép họ bật hoặc tắt từng chức năng riêng lẻ.

Nếu một tính năng bị tắt, các thành phần liên quan như controllers, services, và các bảng cơ sở dữ liệu sẽ không được đăng ký hoặc tạo ra, giúp ứng dụng trở nên gọn nhẹ hơn.

### Định nghĩa một Global Feature

Một Global Feature được định nghĩa bằng một lớp đơn giản với thuộc tính `[GlobalFeatureName]`.

```csharp
[GlobalFeatureName("Shopping.Payment")]
public class PaymentFeature
{
}
```

### Kích hoạt và vô hiệu hóa

Bạn sử dụng `GlobalFeatureManager.Instance` để bật hoặc tắt các tính năng. Việc này nên được thực hiện trong phương thức `PreConfigureServices` của module.

```csharp
public override void PreConfigureServices(ServiceConfigurationContext context)
{
    GlobalFeatureManager.Instance.Enable<PaymentFeature>();
    // Hoặc
    GlobalFeatureManager.Instance.Enable("Shopping.Payment");
}
```

Theo mặc định, tất cả các Global Features đều bị **tắt** (disabled).

### Kiểm tra Global Feature

Bạn có thể kiểm tra xem một tính năng có được bật hay không bằng cách sử dụng `GlobalFeatureManager.Instance.IsEnabled<T>()`.

```csharp
if (GlobalFeatureManager.Instance.IsEnabled<PaymentFeature>())
{
    // Đăng ký các service liên quan đến thanh toán
    context.Services.AddTransient<IPaymentService, MyPaymentService>();
}
```

Ngoài ra, bạn có thể sử dụng thuộc tính `[RequiresGlobalFeature]` trên các controllers hoặc Razor Pages. Nếu tính năng tương ứng bị tắt, ABP sẽ trả về lỗi HTTP 404 (Not Found).

```csharp
[RequiresGlobalFeature(typeof(PaymentFeature))]
public class PaymentController : AbpController
{
    // ...
}
```

Global Features là một cách tiếp cận mạnh mẽ để xây dựng các module có tính tùy biến cao, cho phép các ứng dụng cuối cùng chỉ lựa chọn và sử dụng những chức năng mà họ thực sự cần.

## 17. Tạo GUID (GUID Generation)

GUID (Globally Unique Identifier) là một kiểu dữ liệu phổ biến được sử dụng làm khóa chính (primary key) trong cơ sở dữ liệu. ABP Framework khuyến khích sử dụng GUID cho các module được xây dựng sẵn và coi ID của người dùng (`ICurrentUser.Id`) luôn là GUID.

### Tại sao nên sử dụng GUID?

*   **Tính duy nhất toàn cục**: GUID được tạo ra là duy nhất trên toàn cầu, rất hữu ích trong các hệ thống phân tán, microservices, hoặc khi cần tích hợp với các hệ thống bên ngoài.
*   **Tạo ở Client-side**: Có thể tạo ID ở phía client hoặc trong application layer mà không cần một chuyến đi-về (round trip) tới cơ sở dữ liệu, giúp cải thiện hiệu suất khi thêm mới bản ghi.
*   **Bảo mật**: Khó đoán hơn so với các khóa tự tăng (auto-increment), giúp tăng tính bảo mật trong một số trường hợp.

### Vấn đề về hiệu suất và giải pháp của ABP

Một nhược điểm lớn của GUID là chúng không tuần tự (non-sequential) theo mặc định. Khi sử dụng GUID làm khóa chính và là clustered index trong cơ sở dữ liệu quan hệ (như SQL Server), việc chèn bản ghi mới có thể làm giảm hiệu suất đáng kể do phải sắp xếp lại các bản ghi hiện có.

Để giải quyết vấn đề này, **không bao giờ sử dụng `Guid.NewGuid()` để tạo ID cho các thực thể của bạn**.

Thay vào đó, ABP cung cấp dịch vụ `IGuidGenerator` để tạo ra các GUID tuần tự (sequential GUIDs), được tối ưu hóa cho hiệu suất cơ sở dữ liệu.

### Sử dụng `IGuidGenerator`

Bạn nên tiêm (inject) `IGuidGenerator` và sử dụng phương thức `Create()` của nó để tạo ID cho các thực thể mới.

```csharp
public class MyProductService : ITransientDependency
{
    private readonly IRepository<Product, Guid> _productRepository;
    private readonly IGuidGenerator _guidGenerator;

    public MyProductService(
        IRepository<Product, Guid> productRepository,
        IGuidGenerator guidGenerator)
    {
        _productRepository = productRepository;
        _guidGenerator = guidGenerator;
    }
    
    public async Task CreateAsync(string productName)
    {
        var product = new Product(_guidGenerator.Create(), productName);
        await _productRepository.InsertAsync(product);
    }
}
```
*   Nhiều lớp cơ sở của ABP như `ApplicationService` đã tiêm sẵn `IGuidGenerator` và cung cấp nó qua thuộc tính `GuidGenerator`, giúp bạn sử dụng một cách tiện lợi.

### Cấu hình

Các nhà cung cấp cơ sở dữ liệu khác nhau có thể xử lý GUID theo những cách khác nhau. ABP cho phép bạn cấu hình loại GUID tuần tự phù hợp thông qua `AbpSequentialGuidGeneratorOptions`.

```csharp
Configure<AbpSequentialGuidGeneratorOptions>(options =>
{
    // Phù hợp cho SQL Server (mặc định)
    options.DefaultSequentialGuidType = SequentialGuidType.SequentialAtEnd; 

    // Phù hợp cho MySQL và PostgreSQL
    // options.DefaultSequentialGuidType = SequentialGuidType.SequentialAsString;

    // Phù hợp cho Oracle
    // options.DefaultSequentialGuidType = SequentialGuidType.SequentialAsBinary;
});
```

Tuy nhiên, trong hầu hết các trường hợp, bạn không cần phải cấu hình tùy chọn này vì các gói tích hợp EF Core của ABP đã tự động thiết lập giá trị phù hợp cho DBMS tương ứng.

## 18. Xử lý ảnh (Image Manipulation)

ABP Framework không cung cấp một hệ thống xử lý ảnh (Image Manipulation) tích hợp sẵn trong core framework. Đây là một chức năng chuyên biệt và thường được xử lý bởi các thư viện của bên thứ ba.

Tuy nhiên, bạn hoàn toàn có thể tích hợp các thư viện xử lý ảnh mạnh mẽ của .NET vào ứng dụng ABP của mình để thực hiện các tác vụ như thay đổi kích thước, cắt, xoay, áp dụng bộ lọc, hoặc thêm watermark vào ảnh.

### Các thư viện phổ biến

Dưới đây là một số thư viện xử lý ảnh phổ biến và mạnh mẽ mà bạn có thể sử dụng trong dự án ABP:

*   **[ImageSharp](https://github.com/SixLabors/ImageSharp)**: Là một thư viện xử lý ảnh 2D hiện đại, đa nền tảng (cross-platform), và hoàn toàn được quản lý (fully managed). Nó được coi là sự thay thế cho `System.Drawing` và được cộng đồng phát triển rất tích cực.
*   **[SkiaSharp](https://github.com/mono/SkiaSharp)**: Là một thư viện đồ họa 2D đa nền tảng, được xây dựng dựa trên thư viện Skia của Google. Nó cung cấp hiệu suất cao và được sử dụng rộng rãi trong các ứng dụng yêu cầu xử lý đồ họa phức tạp.
*   **[System.Drawing.Common](https://docs.microsoft.com/en-us/dotnet/api/system.drawing)**: Là thư viện xử lý ảnh truyền thống của .NET. Tuy nhiên, kể từ .NET 6, thư viện này **chỉ được hỗ trợ trên Windows**. Do đó, nó không phải là lựa chọn tốt cho các ứng dụng đa nền tảng.

### Tích hợp vào ABP

Việc tích hợp các thư viện này vào một dự án ABP cũng tương tự như với bất kỳ ứng dụng .NET nào khác:

1.  **Cài đặt gói NuGet**: Thêm gói NuGet của thư viện bạn chọn vào dự án của mình.
2.  **Tạo một Service**: Tạo một service (ví dụ: `IImageManipulator`) để trừu tượng hóa các hoạt động xử lý ảnh. Điều này giúp mã nguồn của bạn không bị phụ thuộc trực tiếp vào một thư viện cụ thể và dễ dàng thay thế trong tương lai.
3.  **Sử dụng Service**: Tiêm (inject) service của bạn vào các lớp khác (như Application Services) để thực hiện các tác vụ xử lý ảnh cần thiết.

Bằng cách này, bạn có thể dễ dàng bổ sung các chức năng xử lý ảnh mạnh mẽ vào ứng dụng ABP của mình.

## 19. Xử lý JSON (JSON Serialization)

ABP Framework cung cấp một lớp trừu tượng (`IJsonSerializer`) để làm việc với JSON, giúp mã nguồn của bạn không bị phụ thuộc vào một thư viện cụ thể nào. Điều này cho phép bạn dễ dàng chuyển đổi giữa các thư viện JSON mà không cần thay đổi logic nghiệp vụ.

### `IJsonSerializer` Service

Dịch vụ `IJsonSerializer` cung cấp các phương thức cơ bản để serialize (chuyển đổi đối tượng C# sang chuỗi JSON) và deserialize (chuyển đổi chuỗi JSON sang đối tượng C#).

```csharp
public interface IJsonSerializer
{
    string Serialize(object obj, bool camelCase = true, bool indented = false);
    T Deserialize<T>(string jsonString, bool camelCase = true);
    object Deserialize(Type type, string jsonString, bool camelCase = true);
}
```

Bạn có thể tiêm (inject) dịch vụ này vào các lớp của mình để sử dụng.

```csharp
public class MyService : ITransientDependency
{
    private readonly IJsonSerializer _jsonSerializer;

    public MyService(IJsonSerializer jsonSerializer)
    {
        _jsonSerializer = jsonSerializer;
    }

    public void ProcessProduct(Product product)
    {
        var jsonString = _jsonSerializer.Serialize(product);
        // ... gửi chuỗi JSON đi đâu đó
    }
}
```

### Các thư viện hỗ trợ

ABP hỗ trợ hai thư viện JSON phổ biến:

1.  **System.Text.Json**:
    *   Là thư viện mặc định được sử dụng trong ABP và .NET Core.
    *   Nó có hiệu suất cao và được tích hợp sâu vào hệ sinh thái .NET.
    *   Bạn có thể cấu hình các tùy chọn thông qua `AbpSystemTextJsonSerializerOptions`.

2.  **Newtonsoft.Json (Json.NET)**:
    *   Là một thư viện JSON rất phổ biến và mạnh mẽ.
    *   Để sử dụng, bạn cần thêm gói NuGet `Volo.Abp.Json.Newtonsoft` và phụ thuộc vào `AbpJsonNewtonsoftModule`. Thao tác này sẽ thay thế triển khai `System.Text.Json` mặc định.
    *   Bạn có thể cấu hình các tùy chọn thông qua `AbpNewtonsoftJsonSerializerOptions`.

### Cấu hình

Bạn có thể cấu hình các tùy chọn chung cho việc xử lý JSON, chẳng hạn như định dạng ngày giờ, thông qua `AbpJsonOptions`.

```csharp
Configure<AbpJsonOptions>(options =>
{
    // Thêm các định dạng ngày giờ mà hệ thống có thể parse khi deserialize
    options.InputDateTimeFormats.Add("yyyy-MM-dd HH:mm:ss");

    // Thiết lập định dạng ngày giờ khi serialize
    options.OutputDateTimeFormat = "yyyy'-'MM'-'dd'T'HH':'mm':'ss.FFFFFFFK";
});
```

Việc có một lớp trừu tượng cho việc xử lý JSON giúp ứng dụng của bạn linh hoạt và dễ bảo trì hơn, đồng thời cho phép bạn tận dụng các tính năng của các thư viện JSON khác nhau một cách nhất quán.

## 20. Ánh xạ đối tượng (Object To Object Mapping)

Trong các ứng dụng nhiều lớp, việc chuyển đổi dữ liệu giữa các đối tượng khác nhau (ví dụ: từ Entity sang DTO) là một tác vụ rất phổ biến. Việc ánh xạ thủ công từng thuộc tính không chỉ tốn thời gian mà còn dễ gây ra lỗi. ABP Framework giải quyết vấn đề này bằng cách cung cấp một hệ thống ánh xạ đối tượng được trừu tượng hóa.

### `IObjectMapper` Service

ABP cung cấp interface `IObjectMapper` làm lớp trừu tượng cho các hoạt động ánh xạ. Điều này giúp mã nguồn của bạn không bị phụ thuộc vào một thư viện ánh xạ cụ thể.

```csharp
public class MyService : ApplicationService // ApplicationService đã có sẵn thuộc tính ObjectMapper
{
    public async Task<UserDto> GetUserAsync(Guid id)
    {
        var user = await _userRepository.GetAsync(id);
        
        // Ánh xạ từ User (entity) sang UserDto (DTO)
        return ObjectMapper.Map<User, UserDto>(user);
    }
    
    public async Task UpdateUserAsync(Guid id, UpdateUserDto input)
    {
        var user = await _userRepository.GetAsync(id);

        // Ánh xạ từ UpdateUserDto vào một đối tượng User đã tồn tại
        ObjectMapper.Map(input, user);
    }
}
```

### Tích hợp với AutoMapper

ABP tích hợp sẵn với [AutoMapper](https://automapper.org/), một trong những thư viện ánh xạ đối tượng phổ biến nhất cho .NET.

#### Định nghĩa ánh xạ

Để sử dụng, bạn cần định nghĩa các quy tắc ánh xạ. Cách phổ biến nhất là tạo một lớp kế thừa từ `Profile` của AutoMapper.

```csharp
public class MyMappingProfile : Profile
{
    public MyMappingProfile()
    {
        CreateMap<User, UserDto>();
        CreateMap<CreateUserDto, User>();
    }
}
```

#### Đăng ký Profile

Sau khi tạo profile, bạn cần đăng ký nó với ABP trong phương thức `ConfigureServices` của module.

```csharp
Configure<AbpAutoMapperOptions>(options =>
{
    // Tự động tìm và đăng ký tất cả các profile trong assembly của MyModule
    options.AddMaps<MyModule>();
});
```

### Các phương thức mở rộng hữu ích

ABP cung cấp một số phương thức mở rộng để đơn giản hóa việc định nghĩa ánh xạ:

*   **`MapExtraProperties()`**: Tự động ánh xạ các thuộc tính mở rộng (extra properties) giữa hai đối tượng có triển khai `IHasExtraProperties`. Rất hữu ích khi bạn sử dụng hệ thống [Object Extensions](https://docs.abp.io/en/abp/latest/Object-Extensions).
*   **`IgnoreAuditedObjectProperties()`**: Tự động bỏ qua các thuộc tính kiểm toán (auditing properties) như `CreationTime`, `CreatorId`, v.v., khi ánh xạ từ DTO sang Entity. Điều này rất hữu ích vì các thuộc tính này thường được quản lý tự động bởi ABP.

Việc sử dụng hệ thống ánh xạ đối tượng của ABP không chỉ giúp mã nguồn của bạn ngắn gọn và dễ bảo trì hơn mà còn tuân thủ các nguyên tắc thiết kế tốt, tách biệt rõ ràng giữa các lớp của ứng dụng.

## 21. Cài đặt (Settings)

Hệ thống cài đặt (Setting System) của ABP Framework cung cấp một cơ chế linh hoạt để quản lý các giá trị cấu hình của ứng dụng tại thời gian chạy (runtime). Khác với hệ thống `IConfiguration` của ASP.NET Core (chủ yếu đọc từ file `appsettings.json` lúc khởi động), hệ thống Settings của ABP lưu trữ các giá trị trong một nguồn dữ liệu động (thường là cơ sở dữ liệu), cho phép chúng có thể được thay đổi mà không cần khởi động lại ứng dụng.

### Các trường hợp sử dụng

*   Cấu hình các thông số của ứng dụng mà quản trị viên có thể thay đổi qua giao diện người dùng (ví dụ: cấu hình SMTP để gửi email).
*   Lưu trữ các cài đặt riêng cho từng tenant trong ứng dụng multi-tenant.
*   Lưu trữ các tùy chọn cá nhân hóa cho từng người dùng.

### Định nghĩa Settings

Một cài đặt cần được định nghĩa trước khi sử dụng. Điều này được thực hiện bằng cách tạo một lớp kế thừa từ `SettingDefinitionProvider`.

```csharp
public class MySettingDefinitionProvider : SettingDefinitionProvider
{
    public override void Define(ISettingDefinitionContext context)
    {
        context.Add(
            new SettingDefinition(
                "Smtp.Host", // Tên duy nhất của setting
                "127.0.0.1", // Giá trị mặc định
                L("DisplayName:Smtp.Host"),
                L("Description:Smtp.Host")
            ),
            new SettingDefinition(
                "Smtp.Password",
                isEncrypted: true // Đánh dấu để mã hóa giá trị
            )
        );
    }
}
```
*   Mỗi cài đặt có một **tên duy nhất**.
*   Có thể cung cấp **giá trị mặc định**, **tên hiển thị** và **mô tả** (có thể được đa ngôn ngữ).
*   **`isEncrypted`**: Cho phép tự động mã hóa giá trị khi lưu và giải mã khi đọc, rất hữu ích cho các thông tin nhạy cảm.
*   **`isVisibleToClients`**: Kiểm soát xem giá trị của cài đặt có được gửi về phía client hay không.

### Đọc giá trị Settings

Sử dụng dịch vụ `ISettingProvider` để đọc giá trị của một cài đặt.

```csharp
public class MyService : ApplicationService
{
    public async Task DoSomethingAsync()
    {
        // SettingProvider đã được tiêm sẵn trong ApplicationService
        var smtpHost = await SettingProvider.GetOrNullAsync("Smtp.Host");
        var smtpPort = await SettingProvider.GetAsync<int>("Smtp.Port");
    }
}
```

### Các nhà cung cấp giá trị (Setting Value Providers)

Hệ thống cài đặt có cấu trúc phân cấp, cho phép ghi đè giá trị ở các cấp độ khác nhau. Khi bạn yêu cầu một giá trị, ABP sẽ tìm kiếm theo thứ tự ưu tiên sau:

1.  **User**: Cài đặt riêng của người dùng hiện tại.
2.  **Tenant**: Cài đặt của tenant hiện tại (trong ứng dụng multi-tenant).
3.  **Global**: Cài đặt chung cho toàn bộ ứng dụng.
4.  **Configuration**: Giá trị từ `appsettings.json` (trong mục `Settings`).
5.  **Default**: Giá trị mặc định được định nghĩa trong `SettingDefinitionProvider`.

Hệ thống này cho phép bạn cung cấp các giá trị mặc định, cho phép quản trị viên hệ thống ghi đè chúng, và cuối cùng cho phép người dùng hoặc tenant tùy chỉnh các giá trị đó cho riêng mình.

## 22. Kiểm tra trạng thái đơn giản (Simple State Checker)

Hệ thống kiểm tra trạng thái đơn giản cung cấp một cách chung để bật hoặc tắt một đối tượng dựa trên các điều kiện động. Ví dụ, bạn có thể sử dụng nó để ẩn một mục menu trên giao diện người dùng nếu người dùng hiện tại không có quyền truy cập.

### Cách hoạt động

Hệ thống này hoạt động dựa trên các "checker" (trình kiểm tra) được liên kết với một đối tượng. Mỗi checker sẽ kiểm tra một điều kiện cụ thể.

1.  **`IHasSimpleStateCheckers<T>`**: Một đối tượng cần được kiểm tra trạng thái phải triển khai interface này. Interface này chứa một danh sách các `ISimpleStateChecker<T>`.
    ```csharp
    public class MyObject : IHasSimpleStateCheckers<MyObject>
    {
        public List<ISimpleStateChecker<MyObject>> SimpleStateCheckers { get; }
        // ...
    }
    ```

2.  **`ISimpleStateChecker<T>`**: Đây là interface cho một trình kiểm tra. Bạn triển khai phương thức `IsEnabledAsync` để định nghĩa logic kiểm tra.
    ```csharp
    public class MyObjectStateChecker : ISimpleStateChecker<MyObject>
    {
        public Task<bool> IsEnabledAsync(SimpleStateCheckerContext<MyObject> context)
        {
            var currentUser = context.ServiceProvider.GetRequiredService<ICurrentUser>();
            // Chỉ bật nếu người dùng là admin
            return Task.FromResult(currentUser.IsInRole("admin"));
        }
    }
    ```
    *   `SimpleStateCheckerContext` cung cấp quyền truy cập vào `IServiceProvider`, cho phép bạn resolve các dịch vụ cần thiết.

### Kiểm tra trạng thái

Sử dụng dịch vụ `ISimpleStateCheckerManager<T>` để kiểm tra trạng thái của một đối tượng. Dịch vụ này sẽ tự động thực thi tất cả các checker được liên kết với đối tượng.

```csharp
var myObject = new MyObject();
myObject.SimpleStateCheckers.Add(new MyObjectStateChecker());

var isEnabled = await _stateCheckerManager.IsEnabledAsync(myObject);
```

Một đối tượng được coi là `enabled` chỉ khi **tất cả** các checker của nó đều trả về `true`.

### Các trình kiểm tra tích hợp sẵn

ABP Framework cung cấp một số trình kiểm tra trạng thái tích hợp sẵn cho các đối tượng phổ biến như `PermissionDefinition`, `ApplicationMenuItem`, và `ToolbarItem`. Các phương thức mở rộng (extension methods) giúp việc sử dụng trở nên dễ dàng:

*   `RequireAuthenticated()`: Yêu cầu người dùng phải đăng nhập.
*   `RequirePermissions(...)`: Yêu cầu người dùng phải có một hoặc tất cả các quyền được chỉ định.
*   `RequireFeatures(...)`: Yêu cầu một hoặc tất cả các tính năng (features) phải được bật.
*   `RequireGlobalFeatures(...)`: Yêu cầu một hoặc tất cả các tính năng toàn cục (global features) phải được bật.

Hệ thống này cung cấp một cách tiếp cận linh hoạt và có thể mở rộng để quản lý trạng thái của các thành phần khác nhau trong ứng dụng của bạn, đặc biệt là các thành phần trên giao diện người dùng.

## 23. Gửi tin nhắn SMS (SMS Sending)

Tương tự như hệ thống gửi email, ABP Framework cung cấp một lớp trừu tượng để gửi tin nhắn SMS, giúp ứng dụng của bạn không bị phụ thuộc vào một nhà cung cấp dịch vụ cụ thể.

### `ISmsSender` Service

Cách tiếp cận chính để gửi SMS là sử dụng dịch vụ `ISmsSender`. Bạn có thể tiêm (inject) dịch vụ này vào bất kỳ lớp nào và sử dụng phương thức `SendAsync`.

```csharp
public class MyService : ITransientDependency
{
    private readonly ISmsSender _smsSender;

    public MyService(ISmsSender smsSender)
    {
        _smsSender = smsSender;
    }

    public async Task SendVerificationCodeAsync(string phoneNumber, string code)
    {
        await _smsSender.SendAsync(
            phoneNumber,          // Số điện thoại người nhận
            $"Your verification code is: {code}" // Nội dung tin nhắn
        );
    }
}
```

### Triển khai `ISmsSender`

ABP Framework cung cấp một triển khai mặc định là `NullSmsSender`, không thực sự gửi SMS mà chỉ ghi nội dung tin nhắn vào log. Điều này rất hữu ích trong môi trường phát triển và kiểm thử.

Để gửi SMS thật, bạn cần phải tự triển khai `ISmsSender` bằng cách tích hợp với một nhà cung cấp dịch vụ SMS của bên thứ ba (ví dụ: Twilio, Vonage, v.v.).

#### Ví dụ về triển khai tùy chỉnh

```csharp
public class MyCustomSmsSender : ISmsSender, ITransientDependency
{
    private readonly IMySmsServiceProvider _smsServiceProvider;

    public MyCustomSmsSender(IMySmsServiceProvider smsServiceProvider)
    {
        _smsServiceProvider = smsServiceProvider;
    }

    public async Task SendAsync(SmsMessage smsMessage)
    {
        // Gọi API của nhà cung cấp dịch vụ SMS để gửi tin nhắn
        await _smsServiceProvider.SendAsync(
            smsMessage.PhoneNumber,
            smsMessage.Text
        );
    }
}
```
Sau khi tạo triển khai của riêng mình, bạn cần đăng ký nó vào hệ thống Dependency Injection để thay thế `NullSmsSender` mặc định.

Lớp `SmsMessage` cho phép bạn truyền các thuộc tính bổ sung (`Properties`) dưới dạng một `Dictionary<string, object>`, rất hữu ích khi nhà cung cấp dịch vụ SMS yêu cầu các tham số tùy chỉnh.

Hệ thống gửi SMS của ABP cung cấp một nền tảng linh hoạt để bạn có thể dễ dàng tích hợp và thay đổi các nhà cung cấp dịch vụ SMS mà không cần phải thay đổi logic nghiệp vụ của ứng dụng.

## 24. Mã hóa chuỗi (String Encryption)

ABP Framework cung cấp một dịch vụ đơn giản để mã hóa và giải mã các chuỗi, rất hữu ích khi bạn cần lưu trữ các thông tin nhạy cảm.

### `IStringEncryptionService`

Dịch vụ cốt lõi cho việc mã hóa là `IStringEncryptionService`. Bạn có thể tiêm (inject) dịch vụ này và sử dụng hai phương thức chính của nó: `Encrypt` và `Decrypt`.

```csharp
public class MySensitiveDataHandler : ITransientDependency
{
    private readonly IStringEncryptionService _stringEncryptionService;

    public MySensitiveDataHandler(IStringEncryptionService stringEncryptionService)
    {
        _stringEncryptionService = stringEncryptionService;
    }

    public string ProtectData(string plainText)
    {
        // Mã hóa một chuỗi
        return _stringEncryptionService.Encrypt(plainText);
    }

    public string UnprotectData(string cipherText)
    {
        // Giải mã một chuỗi
        return _stringEncryptionService.Decrypt(cipherText);
    }
}
```

### Cấu hình

Dịch vụ mã hóa mặc định sử dụng thuật toán AES và yêu cầu một số tham số để hoạt động:

*   **Pass-phrase**: Một cụm mật khẩu được sử dụng làm khóa chính cho việc mã hóa.
*   **Salt**: Một giá trị ngẫu nhiên được thêm vào để tăng cường bảo mật.
*   **Initialization Vector (IV)**: Một giá trị ngẫu nhiên khác được sử dụng trong thuật toán mã hóa.

Bạn có thể tùy chỉnh các giá trị này thông qua `AbpStringEncryptionOptions` trong phương thức `ConfigureServices` của module.

```csharp
Configure<AbpStringEncryptionOptions>(options =>
{
    options.DefaultPassPhrase = "a-very-strong-and-secret-passphrase";
    options.DefaultSalt = Encoding.UTF8.GetBytes("a-unique-salt");
});
```

**Quan trọng**: Bạn nên thay đổi các giá trị mặc định để tăng cường bảo mật cho ứng dụng của mình.

### Tùy chỉnh Pass-phrase và Salt cho từng lần mã hóa

Ngoài việc sử dụng các giá trị mặc định, bạn cũng có thể cung cấp một `passPhrase` và `salt` tùy chỉnh cho mỗi lần gọi phương thức `Encrypt` hoặc `Decrypt`.

```csharp
var customSalt = Encoding.UTF8.GetBytes("another-salt");

var encryptedText = _stringEncryptionService.Encrypt(plainText, "custom-pass", customSalt);
var decryptedText = _stringEncryptionService.Decrypt(encryptedText, "custom-pass", customSalt);
```

Điều này rất hữu ích khi bạn cần mã hóa các dữ liệu khác nhau với các khóa khác nhau. Hệ thống `Settings` của ABP cũng sử dụng dịch vụ này để tự động mã hóa các cài đặt được đánh dấu là `isEncrypted`.

## 25. Tạo mẫu văn bản (Text Templating)

Hệ thống Text Templating của ABP Framework cung cấp một cách đơn giản nhưng hiệu quả để tạo ra các nội dung động dựa trên một mẫu (template) và một mô hình dữ liệu (model). Nó tương tự như Razor View/Page của ASP.NET Core và rất hữu ích trong các trường hợp như tạo nội dung email, báo cáo, hoặc các tin nhắn SMS động.

### Cách hoạt động

Hệ thống này dựa trên thư viện [Scriban](https://github.com/scriban/scriban), cho phép bạn sử dụng các logic điều kiện, vòng lặp và các tính năng mạnh mẽ khác trong template của mình.

**Ví dụ về một template đơn giản:**
```
Hello {{model.name}} :)
```

Khi render template này với một đối tượng có thuộc tính `Name` là "John", kết quả sẽ là: `Hello John :)`.

### Định nghĩa Template

Để sử dụng một template, bạn cần định nghĩa nó bằng cách tạo một lớp kế thừa từ `TemplateDefinitionProvider`.

```csharp
public class MyTemplateDefinitionProvider : TemplateDefinitionProvider
{
    public override void Define(ITemplateDefinitionContext context)
    {
        context.Add(
            new TemplateDefinition("Hello") // Tên duy nhất của template
                .WithVirtualFilePath(
                    "/MyTemplates/Hello.tpl", // Đường dẫn tới file template
                    isInlineLocalized: true // Hỗ trợ đa ngôn ngữ inline
                )
        );
    }
}
```

*   File template (`.tpl`) cần được thêm vào dự án và cấu hình như một "embedded resource" để có thể truy cập thông qua [Virtual File System](https://docs.abp.io/en/abp/latest/Virtual-File-System).

### Render Template

Sử dụng dịch vụ `ITemplateRenderer` để render một template.

```csharp
public class MyService : ITransientDependency
{
    private readonly ITemplateRenderer _templateRenderer;

    public MyService(ITemplateRenderer templateRenderer)
    {
        _templateRenderer = templateRenderer;
    }

    public async Task<string> GenerateWelcomeMessageAsync(string userName)
    {
        return await _templateRenderer.RenderAsync(
            "Hello", // Tên của template
            new { name = userName } // Model
        );
    }
}
```

### Các tính năng nâng cao

*   **Đa ngôn ngữ (Localization)**: Bạn có thể sử dụng hàm `L(...)` bên trong template để dịch các chuỗi văn bản, hoặc tạo các file template riêng cho từng ngôn ngữ.
*   **Layout Templates**: Tương tự như layout trong MVC/Razor Pages, bạn có thể định nghĩa các template layout để tái sử dụng cấu trúc chung (ví dụ: header, footer của email) cho nhiều template khác.
*   **Tùy chỉnh và Ghi đè**: Bạn có thể dễ dàng ghi đè các template được định nghĩa sẵn bởi các module của ABP (ví dụ: template email đặt lại mật khẩu) để tùy chỉnh giao diện và nội dung cho phù hợp với ứng dụng của mình.

Hệ thống Text Templating là một công cụ linh hoạt, giúp bạn tạo ra các nội dung động một cách có cấu trúc và dễ dàng bảo trì.

## 26. Thời gian và Múi giờ (Timing)

Làm việc với thời gian và múi giờ là một thách thức, đặc biệt trong các ứng dụng toàn cầu có người dùng ở nhiều khu vực khác nhau. ABP Framework cung cấp một số công cụ để đơn giản hóa việc này.

### `IClock` Service

Việc sử dụng `DateTime.Now` trong ứng dụng có thể gây ra nhiều vấn đề, vì nó trả về thời gian cục bộ của máy chủ. Khi lưu trữ hoặc gửi giá trị này cho client ở múi giờ khác, có thể xảy ra nhầm lẫn.

Giải pháp tốt nhất là luôn làm việc với thời gian UTC. Dịch vụ `IClock` của ABP giúp bạn thực hiện điều này một cách nhất quán.

```csharp
public class MyService : ITransientDependency
{
    private readonly IClock _clock;

    public MyService(IClock clock)
    {
        _clock = clock;
    }

    public void DoSomething()
    {
        // Lấy thời gian hiện tại (đã được cấu hình là UTC)
        var currentTime = _clock.Now;
    }
}
```

#### Cấu hình `IClock`

Bạn nên cấu hình `IClock` để luôn sử dụng UTC trong phương thức `ConfigureServices` của module.

```csharp
Configure<AbpClockOptions>(options =>
{
    options.Kind = DateTimeKind.Utc;
});
```
*   **Khuyến nghị**: Luôn sử dụng `_clock.Now` thay vì `DateTime.Now` hoặc `DateTime.UtcNow` để mã nguồn của bạn nhất quán và dễ kiểm thử.

### Chuẩn hóa `DateTime` (Normalization)

`IClock` cũng cung cấp phương thức `Normalize` để đảm bảo các đối tượng `DateTime` luôn tuân thủ loại đồng hồ (clock kind) đã được cấu hình (UTC hoặc Local).

```csharp
var normalizedDateTime = _clock.Normalize(someDateTime);
```

ABP Framework tự động sử dụng phương thức này ở nhiều nơi, chẳng hạn như khi binding model trong ASP.NET Core, khi lưu và đọc dữ liệu từ cơ sở dữ liệu, hoặc khi deserialize JSON, giúp đảm bảo tính nhất quán về thời gian trên toàn bộ ứng dụng.

### Quản lý Múi giờ (Time Zones)

ABP định nghĩa một `Setting` có tên là `Abp.Timing.Timezone` (mặc định là "UTC"). Setting này cho phép bạn lưu trữ và quản lý múi giờ cho từng người dùng hoặc tenant. Khi cần hiển thị thời gian cho người dùng, bạn có thể đọc giá trị này và chuyển đổi thời gian UTC sang múi giờ của người dùng.

## 27. Hệ thống tệp ảo (Virtual File System)

Hệ thống tệp ảo (Virtual File System - VFS) cho phép bạn quản lý các tệp tin không tồn tại vật lý trên đĩa. Chức năng chính của nó là để nhúng (embed) các tài nguyên như file JavaScript, CSS, hình ảnh, hoặc các file mẫu (template) vào trong các assembly (DLL) và sử dụng chúng như thể chúng là các tệp tin vật lý trong quá trình chạy.

### Lợi ích chính

*   **Tính module**: Các module có thể đóng gói tất cả các tài nguyên giao diện người dùng của riêng mình (scripts, styles, views, v.v.) vào trong assembly của chúng. Điều này giúp các module trở nên độc lập và dễ dàng tái sử dụng.
*   **Tùy biến và ghi đè**: Một ứng dụng cuối có thể dễ dàng ghi đè (override) các tệp tin được nhúng bởi một module. Ví dụ, bạn có thể thay thế file `style.css` của một module bằng cách tạo một file có cùng đường dẫn trong dự án của mình.
*   **Tích hợp liền mạch**: VFS tích hợp hoàn toàn với ASP.NET Core, cho phép bạn phục vụ các tệp tin tĩnh (static files) và render các Razor view/page từ các tài nguyên được nhúng một cách trong suốt.

### Cách hoạt động

1.  **Nhúng tệp tin (Embedding Files)**: Trong file `.csproj` của module, bạn cần cấu hình để các tệp tin cần thiết được nhúng vào assembly dưới dạng `EmbeddedResource`.
    ```xml
    <ItemGroup>
      <EmbeddedResource Include="MyResources\**\*.*" />
      <Content Remove="MyResources\**\*.*" />
    </ItemGroup>
    ```

2.  **Đăng ký với VFS**: Trong phương thức `ConfigureServices` của module, đăng ký các tệp tin đã nhúng vào VFS.
    ```csharp
    Configure<AbpVirtualFileSystemOptions>(options =>
    {
        options.FileSets.AddEmbedded<MyModule>();
    });
    ```

3.  **Truy cập tệp tin**: Sau khi đã đăng ký, bạn có thể sử dụng dịch vụ `IVirtualFileProvider` để đọc nội dung của các tệp tin ảo này trong mã nguồn.
    ```csharp
    var fileInfo = _virtualFileProvider.GetFileInfo("/MyResources/js/test.js");
    var content = fileInfo.ReadAsString();
    ```

### Tích hợp với ASP.NET Core

VFS tích hợp sâu với ASP.NET Core. Các tệp tin tĩnh được phục vụ thông qua VFS và Razor View Engine cũng có thể tìm và render các view/page từ các tài nguyên ảo. Điều này giúp các trang và thành phần giao diện người dùng của các module có thể hoạt động liền mạch trong ứng dụng cuối.

### Ghi đè tệp tin

Một trong những tính năng mạnh mẽ nhất của VFS là khả năng ghi đè. Nếu ứng dụng của bạn tạo một tệp tin vật lý có cùng đường dẫn với một tệp tin ảo, tệp tin vật lý sẽ được ưu tiên sử dụng. Điều này cho phép bạn dễ dàng tùy chỉnh giao diện hoặc hành vi của các module mà không cần phải sửa đổi mã nguồn của chúng.

Hệ thống tệp ảo là một thành phần nền tảng quan trọng, giúp ABP Framework thực hiện được kiến trúc module hóa một cách hiệu quả.