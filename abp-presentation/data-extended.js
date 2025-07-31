// Extended ABP Framework Presentation Data
// --- Infrastructure Slides ---
const infrastructureSlides = [
  // 1. Audit Logging
  {
    id: 'infra-1',
    title: 'Audit Logging',
    subtitle: 'Ghi nhật ký kiểm tra, theo dõi hoạt động hệ thống',
    content: `
      <p>Hệ thống ghi nhật ký kiểm tra (Audit Logging) của ABP Framework tự động ghi lại các hoạt động quan trọng: request, action, entity changes, exception, thời gian thực thi... giúp kiểm tra bảo mật và truy vết người dùng.</p>
      <ul>
        <li>Ghi log chi tiết: URL, HTTP method, user, entity changes, exception, execution time</li>
        <li>Tuỳ chỉnh qua <code>AbpAuditingOptions</code>, hỗ trợ <code>IAuditingStore</code> cho flexible storage</li>
        <li>Gắn <code>[Audited]</code> hoặc <code>[DisableAuditing]</code> cho entity/method/property</li>
        <li>Có thể mở rộng qua <code>AuditLogContributor</code></li>
      </ul>
      <div class="code-block"><pre><code class="language-csharp">// Kích hoạt Audit Logging
Configure<AbpAuditingOptions>(options => {
    options.IsEnabled = true;
    options.IsEnabledForAnonymousUsers = false;
    options.IsEnabledForGetRequests = true;
});

// Ghi log entity cụ thể
options.EntityHistorySelectors.AddAllEntities();

[Audited]
public class MyUser : Entity<Guid> {
    public string Name { get; set; }
    public string Email { get; set; }

    [DisableAuditing] // Thuộc tính này sẽ không bị log vào audit log
    public string Password { get; set; }
}

// Chỉ log một số property, còn lại bỏ qua
[DisableAuditing]
public class MyUser : Entity<Guid> {
    [Audited]  // Chỉ log biến này
    public string Name { get; set; }
    // Email và Password không bị log
    public string Email { get; set; }
    public string Password { get; set; }
}

// Ignore toàn bộ entity/type
options.IgnoredTypes.Add(typeof(MyUser));
</code></pre></div>
      <p>Có thể cấu hình nâng cao bằng lambda selector để log chi tiết hơn cho các class, module, hoặc property đạt điều kiện tùy chọn.</p>
      <p><b>Kết luận:</b> Có thể hoàn toàn exclude/ignore các trường nhạy cảm mà bạn không muốn log trong audit log bằng attribute <code>[DisableAuditing]</code> trên từng property hoặc entity. Các thực thể, hoặc property không được đánh dấu <code>[Audited]</code>, hoặc có <code>[DisableAuditing]</code>, sẽ không xuất hiện trong cơ sở dữ liệu audit log, đạt yêu cầu tuân thủ bảo mật HIPAA và các tiêu chuẩn quản lý thông tin nhạy cảm.</p>
    `
  },
  // 2. Background Jobs
  {
    id: 'infra-2',
    title: 'Background Jobs',
    subtitle: 'Công việc nền, xử lý bất đồng bộ, persistent',
    content: `
      <p>Background Jobs dùng để xếp hàng các tác vụ chạy nền (gửi email, xuất báo cáo, retry khi lỗi...). Job persistent, có thể retry, lưu DB, tích hợp Hangfire/RabbitMQ/Quartz.</p>
      <ul>
        <li>Thực thi tác vụ dài, không ảnh hưởng trải nghiệm người dùng</li>
        <li>Persistent, tự động retry khi lỗi, lưu DB qua <code>IBackgroundJobStore</code></li>
        <li>Hỗ trợ ưu tiên, delay, tích hợp Hangfire, RabbitMQ, Quartz</li>
      </ul>
      <div class="code-block"><pre><code class="language-csharp">// Định nghĩa job
public class EmailSendingJob : AsyncBackgroundJob<EmailSendingArgs>, ITransientDependency {
    public override async Task ExecuteAsync(EmailSendingArgs args) {
        await _emailSender.SendAsync(args.EmailAddress, args.Subject, args.Body);
    }
}
// Thêm job vào queue
await _backgroundJobManager.EnqueueAsync(new EmailSendingArgs {
    EmailAddress = "test@example.com",
    Subject = "Hello!",
    Body = "Test email."
});</code></pre></div>
      <p><b>Lưu ý:</b> Có thể cấu hình ưu tiên, delay, tích hợp với Hangfire/RabbitMQ/Quartz qua NuGet.</p>
    `
  },
  // 3. Background Workers
  {
    id: 'infra-3',
    title: 'Background Workers',
    subtitle: 'Worker nền, chạy định kỳ, liên tục',
    content: `
      <p>Background Workers là các thread chạy nền liên tục hoặc định kỳ (ví dụ: cleanup, đồng bộ dữ liệu). Khác với Background Jobs (chạy 1 lần), worker thường là singleton, chạy suốt vòng đời app.</p>
      <ul>
        <li>Dùng <code>AsyncPeriodicBackgroundWorkerBase</code> để tạo worker định kỳ</li>
        <li>Đăng ký worker qua <code>IBackgroundWorkerManager</code></li>
        <li>Chạy tốt trên môi trường cluster (nên dùng distributed lock)</li>
      </ul>
      <div class="code-block"><pre><code class="language-csharp">// Worker định kỳ 10 phút
public class PassiveUserCheckerWorker : AsyncPeriodicBackgroundWorkerBase {
    public PassiveUserCheckerWorker(AbpAsyncTimer timer, IServiceScopeFactory sf)
        : base(timer, sf) { Timer.Period = 600000; }
    protected override async Task DoWorkAsync(PeriodicBackgroundWorkerContext ctx) {
        // Logic kiểm tra user không hoạt động
    }
}
// Đăng ký worker
await context.AddBackgroundWorkerAsync<PassiveUserCheckerWorker>();</code></pre></div>
      <p><b>Lưu ý:</b> Nếu chạy nhiều instance, nên dùng distributed lock để tránh trùng lặp tác vụ.</p>
    `
  },
  // 4. BLOB Storing
  {
    id: 'infra-4',
    title: 'BLOB Storing',
    subtitle: 'Lưu trữ BLOB (file, ảnh, video, ...)',
    content: `
      <p>BLOB Storing cung cấp abstraction lưu trữ và truy xuất các đối tượng nhị phân lớn (file, ảnh, video, ...), hỗ trợ nhiều provider (File System, Azure, AWS, ...), multi-tenancy.</p>
      <ul>
        <li>Quản lý qua <code>IBlobContainer</code> hoặc <code>IBlobContainer&lt;T&gt;</code></li>
        <li>Dễ dàng cấu hình provider, đổi nhà cung cấp không cần sửa code</li>
        <li>Hỗ trợ container typed, multi-tenancy</li>
      </ul>
      <div class="code-block"><pre><code class="language-csharp">// Định nghĩa container
[BlobContainerName("profile-pictures")]
public class ProfilePictureContainer { }

// Lưu file
await _blobContainer.SaveAsync("file.txt", stream);

// Cấu hình provider
Configure<AbpBlobStoringOptions>(options => {
  options.Containers.Configure<ProfilePictureContainer>(c => {
    c.UseFileSystem(fs => { fs.BasePath = "C:\\files"; });
  });
});</code></pre></div>
    `
  },
  // 5. Cancellation Token Provider
  {
    id: 'infra-5',
    title: 'Cancellation Token Provider',
    subtitle: 'Quản lý hủy tác vụ bất đồng bộ',
    content: `
      <p><code>ICancellationTokenProvider</code> giúp lấy CancellationToken nhất quán cho các tác vụ async, tự động lấy từ <code>HttpContext.RequestAborted</code> trong ASP.NET Core.</p>
      <ul>
        <li>Tự động hóa truyền token cho các service async</li>
        <li>Provider mặc định: HttpContext, Null (không bao giờ bị hủy)</li>
      </ul>
      <div class="code-block"><pre><code class="language-csharp">// Lấy CancellationToken
var token = cancellationTokenProvider.Token;

// Sử dụng trong service
while (!cancellationTokenProvider.Token.IsCancellationRequested) {
  await Task.Delay(1000, cancellationTokenProvider.Token);
}</code></pre></div>
    `
  },
  // 6. Anti-Forgery (CSRF)
  {
    id: 'infra-6',
    title: 'Anti-Forgery (CSRF)',
    subtitle: 'Chống tấn công CSRF/XSRF',
    content: `
      <p>ABP tự động bảo vệ CSRF qua cookie + header, không cần cấu hình thủ công. Có thể tuỳ chỉnh qua <code>AbpAntiForgeryOptions</code>.</p>
      <ul>
        <li>Server tạo token, client tự động gửi lại qua header</li>
        <li>Thuộc tính: <code>[AbpAutoValidateAntiforgeryToken]</code>, <code>[AbpValidateAntiForgeryToken]</code>, <code>[AbpIgnoreAntiforgeryToken]</code></li>
      </ul>
      <div class="code-block"><pre><code class="language-csharp">// Cấu hình
Configure<AbpAntiForgeryOptions>(options => {
  options.TokenCookie.Name = "MY-XSRF-TOKEN";
});

[AbpValidateAntiForgeryToken]
public IActionResult Post() { ... }</code></pre></div>
    `
  },
  // 7. Concurrency Check
  {
    id: 'infra-7',
    title: 'Concurrency Check',
    subtitle: 'Kiểm soát truy cập đồng thời (Optimistic)',
    content: `
      <p>Kiểm soát đồng thời lạc quan với <code>IHasConcurrencyStamp</code>, tự động phát hiện xung đột khi nhiều người sửa cùng lúc.</p>
      <ul>
        <li>Entity/DTO triển khai <code>IHasConcurrencyStamp</code></li>
        <li>ABP tự động kiểm tra, ném <code>AbpDbConcurrencyException</code> nếu xung đột</li>
      </ul>
      <div class="code-block"><pre><code class="language-csharp">public class Book : FullAuditedAggregateRoot<Guid> { }
public class UpdateBookDto : IHasConcurrencyStamp { ... }

// Trong UpdateAsync: gán ConcurrencyStamp từ DTO vào entity</code></pre></div>
    `
  },
  // 8. Current User
  {
    id: 'infra-8',
    title: 'Current User',
    subtitle: 'Truy cập thông tin user hiện tại',
    content: `
      <p>Dịch vụ <code>ICurrentUser</code> giúp truy cập Id, UserName, TenantId, Roles, Email... của user hiện tại, dùng cho kiểm tra quyền, log, cá nhân hoá.</p>
      <ul>
        <li>Inject <code>ICurrentUser</code> vào service/controller</li>
        <li>Các extension: <code>GetId()</code>, <code>IsInRole()</code>, <code>FindClaim()</code></li>
      </ul>
      <div class="code-block"><pre><code class="language-csharp">if (_currentUser.IsAuthenticated) {
  var userId = _currentUser.Id;
  var roles = _currentUser.Roles;
}</code></pre></div>
    `
  },
  // 9. Data Filtering
  {
    id: 'infra-9',
    title: 'Data Filtering',
    subtitle: 'Lọc dữ liệu động (soft-delete, multi-tenancy)',
    content: `
      <p>Hệ thống lọc dữ liệu tự động: <code>ISoftDelete</code> (xóa mềm), <code>IMultiTenant</code> (lọc theo tenant), <code>IDataFilter</code> (bật/tắt filter).</p>
      <ul>
        <li>Entity triển khai <code>ISoftDelete</code> hoặc <code>IMultiTenant</code></li>
        <li>Dùng <code>IDataFilter</code> để tạm thời tắt filter</li>
      </ul>
      <div class="code-block"><pre><code class="language-csharp">using (_dataFilter.Disable<ISoftDelete>()) {
  var all = await _bookRepository.GetListAsync();
}</code></pre></div>
    `
  },
  // 10. Data Seeding
  {
    id: 'infra-10',
    title: 'Data Seeding',
    subtitle: 'Cung cấp dữ liệu ban đầu',
    content: `
      <p>Khởi tạo dữ liệu mẫu (admin, roles, cấu hình...) qua <code>IDataSeedContributor</code>. Chạy khi migrate hoặc khởi động app.</p>
      <ul>
        <li>Mỗi module có thể có seeder riêng</li>
        <li>Inject service vào seeder, hỗ trợ multi-tenancy</li>
      </ul>
      <div class="code-block"><pre><code class="language-csharp">public class MyDataSeedContributor : IDataSeedContributor {
  public async Task SeedAsync(DataSeedContext ctx) {
    // Insert dữ liệu mẫu
  }
}</code></pre></div>
    `
  },
  // 11. Distributed Locking
  {
    id: 'infra-11',
    title: 'Distributed Locking',
    subtitle: 'Đồng bộ truy cập tài nguyên trong môi trường phân tán',
    content: `
      <h3>Mục đích</h3>
      <p>Distributed Locking là cơ chế giúp <strong>đồng bộ truy cập tài nguyên dùng chung</strong> giữa nhiều instance của ứng dụng, đặc biệt cần thiết khi chạy trong môi trường phân tán (nhiều web server, container, microservices).</p>
      
      <h3>Ý nghĩa</h3>
      <p>Distributed Lock đảm bảo tại một thời điểm chỉ có <strong>một instance</strong> được phép truy cập, sửa đổi tài nguyên quan trọng để tránh:</p>
      <ul>
        <li>Race condition</li>
        <li>Hỏng dữ liệu do nhiều tiến trình cùng thao tác</li>
        <li>Trùng lặp tác vụ định kỳ</li>
        <li>Xung đột khi cập nhật số dư, đơn hàng</li>
      </ul>

      <h3>Cách hoạt động</h3>
      <p>ABP Framework triển khai Distributed Lock dựa trên thư viện bên ngoài (Medallion DistributedLock) và cung cấp service <code>IAbpDistributedLock</code> để lập trình viên dễ sử dụng.</p>
      
      <h3>Cấu hình</h3>
      <ul>
        <li>Cài đặt package <code>Volo.Abp.DistributedLocking</code></li>
        <li>Cấu hình provider: Redis, ZooKeeper, SQL Server</li>
        <li>Inject <code>IAbpDistributedLock</code> qua dependency injection</li>
      </ul>

      <h3>Vì sao phải dùng Distributed Lock</h3>
      <p>Khi ứng dụng scale out, các biến lock thông thường (trong memory/process) sẽ không còn hiệu quả vì mỗi instance là một vùng nhớ tách biệt. Distributed Lock giải quyết bằng cơ chế khóa toàn hệ thống thông qua Redis, DB hoặc dịch vụ bên ngoài.</p>

      <div class="code-block">
        <pre><code class="language-csharp">// Sử dụng Distributed Lock
public class OrderService : ApplicationService
{
    private readonly IAbpDistributedLock _distributedLock;
    
    public OrderService(IAbpDistributedLock distributedLock)
    {
        _distributedLock = distributedLock;
    }
    
    public async Task ProcessOrderAsync(string orderId)
    {
        await using (var handle = await _distributedLock.TryAcquireAsync($"Order_{orderId}"))
        {
            if (handle != null)
            {
                // Critical section - chỉ 1 instance được thực thi
                await ProcessOrderInternalAsync(orderId);
            }
            else
            {
                // Lock không khả dụng, có thể retry hoặc bỏ qua
                throw new BusinessException("Order is being processed by another instance");
            }
        }
    }
}

// Cấu hình provider (Redis)
services.AddAbpDistributedLocking(options =>
{
    options.UseRedis(redisConnectionString);
});</code></pre>
      </div>
    `
  },
  // 12. Emailing
  {
    id: 'infra-12',
    title: 'Emailing',
    subtitle: 'Gửi email qua IEmailSender',
    content: `
      <p>Gửi email qua <code>IEmailSender</code>, hỗ trợ MailKit, cấu hình SMTP động qua Setting Management.</p>
      <ul>
        <li>Inject <code>IEmailSender</code>, dùng <code>SendAsync</code> hoặc <code>QueueAsync</code></li>
        <li>Cấu hình SMTP qua UI hoặc appsettings.json</li>
      </ul>
      <div class="code-block"><pre><code class="language-csharp">await _emailSender.SendAsync("to@example.com", "Subject", "Body");
// Cấu hình SMTP trong appsettings.json
{
  "Settings": {
    "Abp.Mailing.Smtp.Host": "smtp.domain.com"
  }
}</code></pre></div>
    `
  },
  // 13. Entity Cache
  {
    id: 'infra-13',
    title: 'Entity Cache',
    subtitle: 'Cache thực thể, tự động invalidate',
    content: `
      <p>Cache entity theo khoá, tự động invalidate khi entity thay đổi. Dùng <code>IDistributedEntityCache</code>.</p>
      <ul>
        <li>Cache phân tán, tự động refresh khi update/delete</li>
        <li>Cấu hình thời gian hết hạn cho từng entity</li>
      </ul>
      <div class="code-block"><pre><code class="language-csharp">var book = await _bookCache.GetAsync(id);
// Cấu hình
Configure<AbpDistributedCacheOptions>(options => {
  options.EntityCacheOptions.Add(typeof(Book), new DistributedCacheEntryOptions {
    SlidingExpiration = TimeSpan.FromMinutes(20)
  });
});</code></pre></div>
    `
  },
  // 14. Event Bus
  {
    id: 'infra-14',
    title: 'Event Bus',
    subtitle: 'Bus sự kiện (Local/Distributed)',
    content: `
      <p>Event Bus cho phép các thành phần giao tiếp lỏng lẻo qua sự kiện. Hỗ trợ Local (in-process) và Distributed (RabbitMQ, Kafka, ...).</p>
      <ul>
        <li>Phát/lắng nghe sự kiện qua <code>ILocalEventBus</code>, <code>IDistributedEventBus</code></li>
        <li>Hỗ trợ transactional, Inbox/Outbox pattern</li>
      </ul>
      <div class="code-block"><pre><code class="language-csharp">// Phát sự kiện
await _localEventBus.PublishAsync(new MyEventData { ... });
// Lắng nghe
public class MyHandler : ILocalEventHandler<MyEventData> {
  public Task HandleEventAsync(MyEventData e) { ... }
}</code></pre></div>
    `
  },
  // 15. Features System
  {
    id: 'infra-15',
    title: 'Features System',
    subtitle: 'Quản lý feature động, multi-tenant',
    content: `
      <p>Hệ thống Features cho phép bật/tắt hoặc thay đổi hành vi chức năng tại runtime, đặc biệt hữu ích cho SaaS/multi-tenant.</p>
      <ul>
        <li>Định nghĩa feature qua <code>FeatureDefinitionProvider</code></li>
        <li>Kiểm tra feature qua <code>IFeatureChecker</code> hoặc <code>[RequiresFeature]</code></li>
      </ul>
      <div class="code-block"><pre><code class="language-csharp">if (await featureChecker.IsEnabledAsync("MyApp.PdfReporting")) { ... }
[RequiresFeature("MyApp.PdfReporting")]
public class MyService { ... }</code></pre></div>
    `
  },
  // 16. Global Features
  {
    id: 'infra-16',
    title: 'Global Features',
    subtitle: 'Tính năng toàn cục, ảnh hưởng cấu trúc app',
    content: `
      <p>Global Features cho phép bật/tắt tính năng ở cấp phát triển (development time), ảnh hưởng đến việc đăng ký service, tạo bảng DB, ...</p>
      <ul>
        <li>Định nghĩa qua <code>[GlobalFeatureName]</code></li>
        <li>Bật/tắt qua <code>GlobalFeatureManager.Instance.Enable()</code></li>
      </ul>
      <div class="code-block"><pre><code class="language-csharp">[GlobalFeatureName("Shopping.Payment")]
public class PaymentFeature { }

GlobalFeatureManager.Instance.Enable<PaymentFeature>();</code></pre></div>
    `
  },
  // 17. GUID Generation
  {
    id: 'infra-17',
    title: 'GUID Generation',
    subtitle: 'Sinh GUID tuần tự, unique',
    content: `
      <p>Dùng <code>IGuidGenerator</code> để sinh GUID tuần tự, tối ưu cho DB, tránh dùng <code>Guid.NewGuid()</code> cho entity.</p>
      <ul>
        <li>Inject <code>IGuidGenerator</code>, dùng <code>Create()</code></li>
        <li>Cấu hình loại sequential phù hợp DBMS</li>
      </ul>
      <div class="code-block"><pre><code class="language-csharp">var id = guidGenerator.Create();
Configure<AbpSequentialGuidGeneratorOptions>(options => {
  options.DefaultSequentialGuidType = SequentialGuidType.SequentialAtEnd;
});</code></pre></div>
    `
  },
  // 18. Image Manipulation
  {
    id: 'infra-18',
    title: 'Image Manipulation',
    subtitle: 'Tích hợp thư viện xử lý ảnh .NET',
    content: `
      <p>ABP không tích hợp sẵn xử lý ảnh, nhưng dễ dàng tích hợp ImageSharp, SkiaSharp, ... bằng cách tạo service riêng.</p>
      <ul>
        <li>Cài NuGet ImageSharp/SkiaSharp</li>
        <li>Tạo service (IImageManipulator) để trừu tượng hóa</li>
      </ul>
      <div class="code-block"><pre><code class="language-csharp">// Ví dụ dùng ImageSharp
using (var image = Image.Load(inputStream)) {
  image.Mutate(x => x.Resize(200, 200));
  image.Save(outputStream, new PngEncoder());
}</code></pre></div>
    `
  },
  // 19. JSON Serialization
  {
    id: 'infra-19',
    title: 'JSON Serialization',
    subtitle: 'Xử lý JSON, đổi thư viện dễ dàng',
    content: `
      <p>Dùng <code>IJsonSerializer</code> để serialize/deserialize object, dễ dàng chuyển đổi giữa System.Text.Json và Newtonsoft.Json.</p>
      <ul>
        <li>Inject <code>IJsonSerializer</code></li>
        <li>Cấu hình format, date-time, ... qua <code>AbpJsonOptions</code></li>
      </ul>
      <div class="code-block"><pre><code class="language-csharp">var json = jsonSerializer.Serialize(obj);
Configure<AbpJsonOptions>(options => {
  options.OutputDateTimeFormat = "yyyy-MM-dd HH:mm:ss";
});</code></pre></div>
    `
  },
  // 20. Object Mapping
  {
    id: 'infra-20',
    title: 'Object Mapping',
    subtitle: 'Ánh xạ object giữa các layer',
    content: `
      <p>Dùng <code>IObjectMapper</code> (tích hợp AutoMapper) để map entity &lt;=&gt; DTO, giảm code lặp, dễ bảo trì.</p>
      <ul>
        <li>Định nghĩa mapping profile (AutoMapper)</li>
        <li>Dùng <code>ObjectMapper.Map&lt;TSource, TDest&gt;()</code></li>
      </ul>
      <div class="code-block"><pre><code class="language-csharp">public class MyMappingProfile : Profile {
  public MyMappingProfile() {
    CreateMap<User, UserDto>();
  }
}
var dto = ObjectMapper.Map<User, UserDto>(user);</code></pre></div>
    `
  },
  // 21. Settings Hierarchy
  {
    id: 'infra-21',
    title: 'Settings Hierarchy',
    subtitle: 'Cài đặt động, phân cấp, mã hóa',
    content: `
      <p>Hệ thống Settings cho phép quản lý cấu hình động, phân cấp (User > Tenant > Global > appsettings.json > Default), hỗ trợ mã hóa giá trị nhạy cảm.</p>
      <ul>
        <li>Định nghĩa setting qua <code>SettingDefinitionProvider</code></li>
        <li>Đọc giá trị qua <code>ISettingProvider</code></li>
        <li>isEncrypted: tự động mã hóa/giải mã</li>
      </ul>
      <div class="code-block"><pre><code class="language-csharp">var smtpHost = await SettingProvider.GetOrNullAsync("Smtp.Host");
public class MySettingDefinitionProvider : SettingDefinitionProvider { ... }</code></pre></div>
    `
  },
  // 23. SMS Sending
  {
    id: 'infra-23',
    title: 'SMS Sending',
    subtitle: 'Gửi SMS qua ISmsSender',
    content: `
      <p>Gửi SMS qua <code>ISmsSender</code>, dễ dàng tích hợp provider bên thứ ba (Twilio, Vonage, ...).</p>
      <ul>
        <li>Inject <code>ISmsSender</code>, dùng <code>SendAsync</code></li>
        <li>Có thể custom provider, NullSmsSender mặc định (log ra file)</li>
      </ul>
      <div class="code-block"><pre><code class="language-csharp">await _smsSender.SendAsync("0123456789", "Your code: 1234");</code></pre></div>
    `
  },
  // 24. String Encryption
  {
    id: 'infra-24',
    title: 'String Encryption',
    subtitle: 'Mã hóa/giải mã chuỗi (AES)',
    content: `
      <p>Dùng <code>IStringEncryptionService</code> để mã hóa/giải mã chuỗi (AES), bảo vệ dữ liệu nhạy cảm.</p>
      <ul>
        <li>Inject <code>IStringEncryptionService</code>, dùng <code>Encrypt</code> và <code>Decrypt</code></li>
        <li>Cấu hình pass-phrase, salt qua <code>AbpStringEncryptionOptions</code></li>
      </ul>
      <div class="code-block"><pre><code class="language-csharp">var encrypted = stringEncryptionService.Encrypt("abc");
var plain = stringEncryptionService.Decrypt(encrypted);
Configure<AbpStringEncryptionOptions>(options => {
  options.DefaultPassPhrase = "my-secret";
});</code></pre></div>
    `
  },
  // 25. Text Templating
  {
    id: 'infra-25',
    title: 'Text Templating',
    subtitle: 'Sinh nội dung động với template (Scriban)',
    content: `
      <p>Text Templating giúp sinh nội dung động (email, báo cáo, SMS) dựa trên template Scriban và model dữ liệu.</p>
      <ul>
        <li>Định nghĩa template qua <code>TemplateDefinitionProvider</code></li>
        <li>Render template qua <code>ITemplateRenderer</code></li>
      </ul>
      <div class="code-block"><pre><code class="language-csharp">var result = await templateRenderer.RenderAsync("Hello", new { name = "John" });
public class MyTemplateDefinitionProvider : TemplateDefinitionProvider { ... }</code></pre></div>
    `
  },
  // 26. Timing
  {
    id: 'infra-26',
    title: 'Timing',
    subtitle: 'Quản lý thời gian và múi giờ trong môi trường phân tán',
    content: `
      <h3>Mục đích</h3>
      <p>Hạ tầng chuyên biệt giúp <strong>quản lý thời gian, múi giờ</strong> trong ứng dụng phục vụ người dùng nhiều múi giờ khác nhau.</p>
      
      <h3>Tính năng</h3>
      <ul>
        <li>Cấu hình múi giờ qua setting <code>Abp.Timing.TimeZone</code></li>
        <li>Service <code>IClock</code>, <code>ICurrentTimezoneProvider</code></li>
        <li>Middleware <code>UseAbpTimeZone</code> tự động detect timezone</li>
        <li>Lưu UTC, hiển thị theo múi giờ user</li>
      </ul>

      <h3>Lợi ích</h3>
      <ul>
        <li>Đảm bảo tính nhất quán dữ liệu trong multi-instance</li>
        <li>Tự động chuyển đổi múi giờ</li>
        <li>Chuẩn hóa DateTime, hỗ trợ DateTimeKind</li>
        <li>API trả về ISO 8601 format</li>
      </ul>

      <div class="code-block">
        <pre><code class="language-csharp">// Sử dụng IClock
public class MeetingService : ApplicationService
{
    private readonly IClock _clock;
    
    public async Task<MeetingDto> CreateMeetingAsync(CreateMeetingDto input)
    {
        var meeting = new Meeting
        {
            StartTime = _clock.Normalize(input.StartTime), // Chuyển về UTC
            CreatedTime = _clock.Now // Thời gian hiện tại UTC
        };
        
        await _meetingRepository.InsertAsync(meeting);
        return ObjectMapper.Map<Meeting, MeetingDto>(meeting);
    }
}

// Cấu hình
Configure<AbpClockOptions>(options =>
{
    options.Kind = DateTimeKind.Utc;
});
app.UseAbpTimeZone();</code></pre>
      </div>
    `
  },
  // 27. Virtual File System (VFS)
  {
    id: 'infra-27',
    title: 'Virtual File System (VFS)',
    subtitle: 'Quản lý file ảo, nhúng resource vào assembly',
    content: `
      <h3>Mục đích</h3>
      <p>Hạ tầng cho phép quản lý file không nhất thiết tồn tại vật lý trên ổ đĩa, chủ yếu để <strong>nhúng JS, CSS, ảnh, localization</strong> vào assembly và sử dụng như file vật lý tại runtime.</p>
      
      <h3>Loại file được quản lý</h3>
      <ul>
        <li><strong>Embedded files:</strong> File nhúng vào assembly (en.json, JS, CSS, ảnh...)</li>
        <li><strong>Physical files:</strong> File thường lưu ngoài đĩa (wwwroot, views...)</li>
        <li><strong>Dynamic files:</strong> File sinh động trong quá trình chạy</li>
      </ul>

      <h3>Lợi ích</h3>
      <ul>
        <li><strong>Đóng gói tài nguyên:</strong> Deploy gọn, không cần copy file phụ bên ngoài</li>
        <li><strong>Tối ưu modularity:</strong> Module đóng gói tài nguyên thành khối duy nhất</li>
        <li><strong>Dễ mở rộng:</strong> Override file module khác bằng virtual path</li>
        <li><strong>Truy cập nhất quán:</strong> API chung cho file vật lý và embedded</li>
        <li><strong>Hỗ trợ localization:</strong> File dịch đa ngôn ngữ tự động nhúng</li>
      </ul>

      <div class="code-block">
        <pre><code class="language-csharp">// Nhúng file vào assembly
&lt;ItemGroup&gt;
  &lt;EmbeddedResource Include="Resources\en.json" /&gt;
  &lt;EmbeddedResource Include="wwwroot\js\app.js" /&gt;
&lt;/ItemGroup&gt;

// Đăng ký với VFS
Configure&lt;AbpVirtualFileSystemOptions&gt;(options =&gt;
{
    options.FileSets.AddEmbedded&lt;MyModule&gt;();
});

// Truy cập file
public class ResourceService
{
    private readonly IVirtualFileProvider _virtualFileProvider;
    
    public ResourceService(IVirtualFileProvider virtualFileProvider)
    {
        _virtualFileProvider = virtualFileProvider;
    }
    
    public string GetLocalizationFile()
    {
        var fileInfo = _virtualFileProvider.GetFileInfo("/Resources/en.json");
        return fileInfo.ReadAsString();
    }
    
    public string GetJavaScriptFile()
    {
        var fileInfo = _virtualFileProvider.GetFileInfo("/js/app.js");
        return fileInfo.ReadAsString();
    }
}</code></pre>
      </div>
    `
  }
];

// --- Module Slides ---
const moduleSlides = [
    // Slide 4: Account Module
    {
        id: 'slide-4',
        title: 'Account Module',
        subtitle: 'Core authentication và account management',
        content: `
            <h3>Mục đích</h3>
            <p>Xử lý các chức năng <strong>core authentication</strong> như login, registration, password reset và account management.</p>
            
            <h3>Tính năng</h3>
            <ul>
                <li>Cung cấp UI pages (<code>/Account/Login</code>, <code>/Account/Register</code>)</li>
                <li>Hỗ trợ <strong>Single Sign-On (SSO)</strong> và external logins (Facebook, Google)</li>
                <li>Tích hợp với Microsoft's Identity library, IdentityServer và <strong>OpenIddict</strong></li>
            </ul>

            <h3>Clean Code</h3>
            <p>Tuân thủ <strong>Single Responsibility Principle</strong> bằng cách delegate authentication logic cho separate services.</p>

            <div class="code-block">
                <pre><code class="language-csharp">// Example: Account configuration
services.Configure&lt;IdentityOptions&gt;(options =&gt;
{
    options.Password.RequireDigit = true;
    options.Password.RequireLowercase = true;
    options.Password.RequireUppercase = true;
    options.Password.RequireNonAlphanumeric = true;
    options.Password.RequiredLength = 8;
});</code></pre>
            </div>
        `
    },

    // Slide 7: CMS Kit Module
    {
        id: 'slide-7',
        title: 'CMS Kit Module',
        subtitle: 'Content Management System capabilities',
        content: `
            <h3>Mục đích</h3>
            <p>Cung cấp <strong>Content Management System (CMS) capabilities</strong> để xây dựng dynamic websites.</p>
            
            <h3>Tính năng</h3>
            <ul>
                <li>Page management và blogging</li>
                <li>Tagging, comments, reactions, ratings</li>
                <li>Menus và dynamic widgets</li>
                <li>Marked items</li>
            </ul>

            <h3>Dependencies</h3>
            <p>Yêu cầu BlobStoring module và recommend Redis cho caching.</p>

            <div class="code-block">
                <pre><code class="language-csharp">// Example: CMS Kit configuration
services.Configure&lt;CmsKitOptions&gt;(options =&gt;
{
    options.Comments.IsEnabled = true;
    options.Reactions.IsEnabled = true;
    options.Ratings.IsEnabled = true;
    options.Tags.IsEnabled = true;
});</code></pre>
            </div>
        `
    },

    // Slide 8: Docs Module
    {
        id: 'slide-8',
        title: 'Docs Module',
        subtitle: 'Software documentation management',
        content: `
            <h3>Mục đích</h3>
            <p>Quản lý <strong>software documentation</strong>, lưu trữ content trên GitHub hoặc file system.</p>
            
            <h3>Tính năng</h3>
            <ul>
                <li>Hỗ trợ versioning cho GitHub-based storage</li>
                <li>Tuân thủ <strong>Single Responsibility Principle</strong> bằng cách tập trung chỉ vào documentation management</li>
            </ul>

            <div class="code-block">
                <pre><code class="language-csharp">// Example: Docs configuration
services.Configure&lt;DocsOptions&gt;(options =&gt;
{
    options.RootPath = "docs";
    options.SearchEngineType = SearchEngineType.Elastic;
    options.Versioning = true;
});</code></pre>
            </div>
        `
    },

    // Slide 10: File Management Module
    {
        id: 'slide-10',
        title: 'File Management Module',
        subtitle: 'File upload, download và organization',
        content: `
            <h3>Mục đích</h3>
            <p>Cho phép <strong>file upload, download và organization</strong> trong hierarchical folder structure.</p>
            
            <h3>Tính năng</h3>
            <ul>
                <li>Hỗ trợ <strong>multi-tenancy</strong> với configurable storage limits per tenant</li>
                <li>Tích hợp với BlobStoring system</li>
                <li><strong>Lưu ý</strong>: Module này yêu cầu ABP Team hoặc license cao hơn</li>
            </ul>

            <div class="code-block">
                <pre><code class="language-csharp">// Example: File management
public class FileAppService : ApplicationService, IFileAppService
{
    public async Task&lt;FileDto&gt; UploadAsync(IFormFile file)
    {
        var fileName = await _fileManager.SaveAsync(file);
        return new FileDto { Name = fileName };
    }
    
    public async Task&lt;Stream&gt; DownloadAsync(string fileName)
    {
        return await _fileManager.GetAsync(fileName);
    }
}</code></pre>
            </div>
        `
    },

    // Slide 11: Identity Module
    {
        id: 'slide-11',
        title: 'Identity Module',
        subtitle: 'Users, roles, permissions và organization units',
        content: `
            <h3>Mục đích</h3>
            <p>Quản lý <strong>users, roles, permissions và organization units</strong>, được xây dựng trên Microsoft's Identity library.</p>
            
            <h3>Tính năng</h3>
            <ul>
                <li>Cung cấp UI cho user/role management</li>
                <li>Security logs</li>
                <li>Hỗ trợ multiple UI frameworks (Blazor, Angular, MVC/Razor Pages)</li>
                <li>Tuân thủ <strong>Liskov Substitution Principle</strong></li>
            </ul>

            <div class="code-block">
                <pre><code class="language-csharp">// Example: Identity configuration
services.Configure&lt;IdentityOptions&gt;(options =&gt;
{
    options.Password.RequireDigit = true;
    options.Password.RequireLowercase = true;
    options.Password.RequireUppercase = true;
    options.Password.RequireNonAlphanumeric = true;
    options.Password.RequiredLength = 8;
    
    options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
    options.Lockout.MaxFailedAccessAttempts = 5;
});</code></pre>
            </div>
        `
    },

    // Slide 11.5: IdentityServer Module
    {
        id: 'slide-11-identityserver',
        title: 'IdentityServer Module',
        subtitle: 'OAuth2, SSO, IdentityServer4',
        content: `
            <h3>Mục đích</h3>
            <p>Tích hợp xác thực hiện đại, SSO, OAuth2, OpenID Connect cho ứng dụng ABP (trước ABP v6).</p>
            <h3>Tính năng</h3>
            <ul>
                <li>Hỗ trợ OAuth2, OpenID Connect, SSO</li>
                <li>Tích hợp <strong>IdentityServer4</strong></li>
                <li>Quản lý client, scope, API resource</li>
                <li>Hỗ trợ external login (Google, Facebook, ...)</li>
            </ul>
            <h3>Ví dụ cấu hình</h3>
            <div class="code-block">
                <pre><code class="language-csharp">// Startup.cs
services.AddIdentityServer()
    .AddDeveloperSigningCredential()
    .AddInMemoryClients(Config.GetClients())
    .AddInMemoryIdentityResources(Config.GetIdentityResources())
    .AddInMemoryApiResources(Config.GetApiResources())
    .AddAspNetIdentity<ApplicationUser>();

// Đăng ký client
public static IEnumerable<Client> GetClients() => new List<Client> {
    new Client {
        ClientId = "my-app",
        AllowedGrantTypes = GrantTypes.Code,
        RedirectUris = { "https://localhost:5001/signin-oidc" },
        AllowedScopes = { "openid", "profile", "api1" }
    }
};</code></pre>
            </div>
            <p><b>Lưu ý:</b> Từ ABP v6+, <strong>OpenIddict</strong> là lựa chọn mặc định thay thế IdentityServer4.</p>
        `
    },

    // Slide 12: OpenIddict Module
    {
        id: 'slide-12',
        title: 'OpenIddict Module',
        subtitle: 'Modern authentication features',
        content: `
            <h3>Mục đích</h3>
            <p>Tích hợp với <strong>OpenIddict</strong> cho modern authentication features, bao gồm <strong>SSO, single log-out và API access control</strong>. Đây là <strong>authentication module được ưa chuộng trong ABP v6.0+</strong>.</p>
            
            <h3>Tính năng</h3>
            <ul>
                <li>Hỗ trợ OpenIddict với refresh tokens và PKCE</li>
                <li>Single Sign-On (SSO)</li>
                <li>Single log-out</li>
                <li>API access control</li>
            </ul>

            <div class="code-block">
                <pre><code class="language-csharp">// Example: OpenIddict configuration
services.Configure&lt;AbpOpenIddictAspNetCoreOptions&gt;(options =&gt;
{
    options.AddDevelopmentEncryptionAndSigningCertificate = true;
});

services.Configure&lt;OpenIddictServerOptions&gt;(options =&gt;
{
    options.SetTokenEndpointUris("/connect/token");
    options.SetAuthorizationEndpointUris("/connect/authorize");
    options.SetLogoutEndpointUris("/connect/logout");
});</code></pre>
            </div>
        `
    },

    // Slide 13: Permission Management Module
    {
        id: 'slide-13',
        title: 'Permission Management Module',
        subtitle: 'Permissions trong database',
        content: `
            <h3>Mục đích</h3>
            <p>Triển khai <code>IPermissionStore</code> để quản lý <strong>permissions trong database</strong> và cung cấp UI cho role và user permission settings.</p>
            
            <h3>Tính năng</h3>
            <ul>
                <li>Extensible với <code>UserPermissionManagementProvider</code> và <code>RolePermissionManagementProvider</code></li>
                <li>Hỗ trợ <strong>Interface Segregation Principle</strong> bằng cách cung cấp focused <code>IPermissionStore</code> interface</li>
            </ul>

            <div class="code-block">
                <pre><code class="language-csharp">// Example: Permission definition
public class MyPermissionDefinitionProvider : PermissionDefinitionProvider
{
    public override void Define(IPermissionDefinitionContext context)
    {
        var myGroup = context.AddGroup("MyApp");
        
        var bookPermission = myGroup.AddPermission("MyApp.Books");
        bookPermission.AddChild("MyApp.Books.Create");
        bookPermission.AddChild("MyApp.Books.Edit");
        bookPermission.AddChild("MyApp.Books.Delete");
    }
}

// Usage
[RequiresPermission("MyApp.Books.Create")]
public async Task&lt;BookDto&gt; CreateAsync(CreateBookDto input)
{
    // Create book logic
}</code></pre>
            </div>
        `
    },

    // Slide 14: Setting Management Module
    {
        id: 'slide-14',
        title: 'Setting Management Module',
        subtitle: 'Application settings tại runtime',
        content: `
            <h3>Mục đích</h3>
            <p>Triển khai <code>ISettingStore</code> để lưu trữ và quản lý <strong>application settings tại runtime</strong>, với UI cho email, feature và timezone settings.</p>
            
            <h3>Tính năng</h3>
            <ul>
                <li>Extensible với various providers (<code>DefaultValueSettingManagementProvider</code>, <code>TenantSettingManagementProvider</code>)</li>
                <li>Hierarchy: User > Tenant > Global > Configuration > Default</li>
                <li>Hỗ trợ encryption cho sensitive values</li>
            </ul>

            <div class="code-block">
                <pre><code class="language-csharp">// Example: Setting definition
public class MySettingDefinitionProvider : SettingDefinitionProvider
{
    public override void Define(ISettingDefinitionContext context)
    {
        context.Add(
            new SettingDefinition("MyApp.Smtp.Host", "smtp.gmail.com"),
            new SettingDefinition("MyApp.Smtp.Port", "587"),
            new SettingDefinition("MyApp.Smtp.EnableSsl", "true")
        );
    }
}

// Usage
var smtpHost = await _settingProvider.GetAsync("MyApp.Smtp.Host");</code></pre>
            </div>
        `
    },

    // Slide 15: Tenant Management Module
    {
        id: 'slide-15',
        title: 'Tenant Management Module',
        subtitle: 'Multi-tenant applications',
        content: `
            <h3>Mục đích</h3>
            <p>Tenant Management Module giúp quản lý đa tenant trong ứng dụng, bao gồm:</p>
            <ul>
                <li>Tạo, sửa, xóa tenant cùng với quản lý trạng thái.</li>
                <li>Quản lý user, role, permission riêng theo từng tenant.</li>
                <li>Tách biệt dữ liệu theo tenant (data isolation) đảm bảo an toàn.</li>
                <li>Cung cấp context tenant tự động qua middleware và filter.</li>
                <li>Hỗ trợ migrate, seed dữ liệu riêng cho từng tenant.</li>
                <li>Tích hợp dễ dàng với các module khác của ABP.</li>
            </ul>
            <h3>Lợi ích</h3>
            <ul>
                <li>Triển khai nhanh hệ thống đa tenant chuẩn, bảo mật và mở rộng tốt.</li>
                <li>Phù hợp cho SaaS (Software as a Service).</li>
            </ul>
            <h3>Tính năng</h3>
            <ul>
                <li>Hỗ trợ distributed events với <code>TenantEto</code></li>
                <li>Tuân thủ <strong>Clean Architecture</strong> bằng cách tách biệt tenant management logic thành domain và application layers</li>
            </ul>
            <div class="code-block">
                <pre><code class="language-csharp">// Example: Tenant configuration
services.Configure&lt;AbpMultiTenancyOptions&gt;(options =&gt;
{
    options.IsEnabled = true;
});</code></pre>
            </div>
        `
    },

    // Slide 16: Virtual File Explorer Module
    {
        id: 'slide-16',
        title: 'Virtual File Explorer Module',
        subtitle: 'Browse files trong virtual file system',
        content: `
            <h3>Mục đích</h3>
            <p>Cung cấp <strong>simple UI để browse files trong ABP's virtual file system</strong> tại <code>/VirtualFileExplorer</code>.</p>
            
            <h3>Lưu ý</h3>
            <ul>
                <li>Không được pre-install trong templates</li>
                <li>Được thêm qua ABP CLI</li>
                <li>Hữu ích cho development và debugging</li>
            </ul>

            <div class="code-block">
                <pre><code class="language-bash"># Install via ABP CLI
abp add-module Volo.Abp.VirtualFileExplorer.Web

# Or via NuGet
Install-Package Volo.Abp.VirtualFileExplorer.Web</code></pre>
            </div>
        `
    }
];

// Merge Infrastructure trước, rồi đến Module
if (window.presentationData) {
    window.presentationData.slides = window.presentationData.slides.concat(infrastructureSlides, moduleSlides);
} 