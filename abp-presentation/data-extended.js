// Extended ABP Framework Presentation Data

// --- Core Concepts Slides ---
const coreConceptsSlides = [
  // Slide 4: Understanding Module Structure
  {
    id: 'slide-4-module-structure',
    title: 'Understanding Module Structure',
    subtitle: 'Cấu trúc và lifecycle của ABP Module',
    content: `
      <h3>2.5 Understanding Module Structure</h3>
      <p>Mỗi project trong ABP là một Module. Module structure bao gồm các lifecycle methods được gọi theo thứ tự cụ thể trong quá trình khởi tạo ứng dụng.</p>

      <h4>Typical ABP Module Structure</h4>
      <div class="code-block">
        <pre><code class="language-csharp">// Typical ABP Module structure
[DependsOn(
    typeof(ParentModule1),      // Dependencies on other modules
    typeof(ParentModule2)
)]
public class MyProjectDomainModule : AbpModule
{
    // 1. PreConfigureServices - Chạy trước tất cả modules
    public override void PreConfigureServices(ServiceConfigurationContext context)
    {
        // Configure options that other modules might need
        // Setup Object Extensions
        // Configure conventions
    }

    // 2. ConfigureServices - Main configuration
    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        // Register services
        // Configure options
        // Setup AutoMapper profiles
    }

    // 3. PostConfigureServices - Chạy sau tất cả modules configure
    public override void PostConfigureServices(ServiceConfigurationContext context)
    {
        // Override configurations from other modules
        // Final configurations
    }

    // 4. OnApplicationInitialization - Application startup
    public override void OnApplicationInitialization(ApplicationInitializationContext context)
    {
        // Configure middleware pipeline (chỉ trong Host modules)
        // Initialize background services
    }

    // 5. OnApplicationShutdown - Application cleanup
    public override void OnApplicationShutdown(ApplicationShutdownContext context)
    {
        // Cleanup resources
        // Dispose services
    }
}</code></pre>
      </div>

      <h4>Lifecycle Methods Explanation</h4>
      
      <h5>1. PreConfigureServices</h5>
      <ul>
        <li><strong>Thời điểm:</strong> Chạy trước tất cả modules</li>
        <li><strong>Mục đích:</strong> Cấu hình options mà các module khác có thể cần</li>
        <li><strong>Ví dụ:</strong> Setup Object Extensions, Configure conventions</li>
      </ul>

      <h5>2. ConfigureServices</h5>
      <ul>
        <li><strong>Thời điểm:</strong> Cấu hình chính của module</li>
        <li><strong>Mục đích:</strong> Đăng ký services, cấu hình options</li>
        <li><strong>Ví dụ:</strong> Register services, Setup AutoMapper profiles</li>
      </ul>

      <h5>3. PostConfigureServices</h5>
      <ul>
        <li><strong>Thời điểm:</strong> Chạy sau tất cả modules đã configure</li>
        <li><strong>Mục đích:</strong> Override configurations từ module khác</li>
        <li><strong>Ví dụ:</strong> Final configurations, Override default settings</li>
      </ul>

      <h5>4. OnApplicationInitialization</h5>
      <ul>
        <li><strong>Thời điểm:</strong> Khi ứng dụng khởi động</li>
        <li><strong>Mục đích:</strong> Cấu hình middleware pipeline (chỉ trong Host modules)</li>
        <li><strong>Ví dụ:</strong> Initialize background services, Setup middleware</li>
      </ul>

      <h5>5. OnApplicationShutdown</h5>
      <ul>
        <li><strong>Thời điểm:</strong> Khi ứng dụng tắt</li>
        <li><strong>Mục đích:</strong> Cleanup resources, dispose services</li>
        <li><strong>Ví dụ:</strong> Dispose connections, Cleanup temporary files</li>
      </ul>

      <h4>Best Practices</h4>
      <ul>
        <li><strong>PreConfigureServices:</strong> Chỉ cấu hình những gì cần thiết cho module khác</li>
        <li><strong>ConfigureServices:</strong> Đây là nơi chính để đăng ký services</li>
        <li><strong>PostConfigureServices:</strong> Sử dụng để override khi cần thiết</li>
        <li><strong>OnApplicationInitialization:</strong> Chỉ sử dụng trong Host modules</li>
        <li><strong>OnApplicationShutdown:</strong> Đảm bảo cleanup resources đúng cách</li>
      </ul>

      <h4>Module Dependencies</h4>
      <p>Module dependencies được khai báo qua <code>[DependsOn]</code> attribute, đảm bảo thứ tự khởi tạo đúng. ABP sẽ tự động xử lý dependency graph và topological sorting.</p>
    `
  },

  // Slide 5: Module System và Patterns
  {
    id: 'slide-5-module-system',
    title: 'Module System và Patterns',
    subtitle: '[DependsOn] Attribute và *DefinitionProvider Pattern',
    content: `
      <h3>4.2 Module [DependsOn] Attribute</h3>
      <p><code>[DependsOn]</code> là một attribute dùng để khai báo sự phụ thuộc giữa các module trong ABP.</p>

      <h4>Nó hoạt động như thế nào?</h4>
      
      <h5>1. Xây dựng đồ thị phụ thuộc (Dependency Graph)</h5>
      <p>Khi ứng dụng khởi động, ABP quét tất cả các module và dùng <code>[DependsOn]</code> để xây dựng một đồ thị phụ thuộc.</p>

      <h5>2. Đảm bảo thứ tự thực thi Lifecycle</h5>
      <p>Việc sắp xếp này đảm bảo rằng các phương thức trong vòng đời của module (<code>PreConfigureServices</code>, <code>ConfigureServices</code>, <code>OnApplicationInitialization</code>, ...) được gọi theo đúng thứ tự. Dịch vụ của một module cha sẽ luôn có sẵn cho module con.</p>

      <div class="code-block">
        <pre><code class="language-csharp">// Web module phụ thuộc vào Application và EntityFrameworkCore modules
[DependsOn(
    typeof(MyProjectApplicationModule),
    typeof(MyProjectEntityFrameworkCoreModule)
)]
public class MyProjectWebModule : AbpModule
{
    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        // Tại đây, bạn có thể yên tâm rằng các dịch vụ từ
        // MyProjectApplicationModule đã được đăng ký.
        var appService = context.Services.GetRequiredService<IMyAppService>();
    }
}</code></pre>
      </div>

      <h3>4.3 *DefinitionProvider Pattern</h3>
      <p>Đây là một pattern của ABP để cho phép các module định nghĩa và cung cấp các loại "định nghĩa" một cách tập trung và có thể mở rộng.</p>

      <h4>Mục đích:</h4>
      <ul>
        <li><strong>Modular Definition:</strong> Mỗi module có thể tự định nghĩa các thành phần của riêng mình (permissions, settings, features...) mà không ảnh hưởng đến module khác.</li>
        <li><strong>Khám phá tự động (Auto-Discovery):</strong> Framework tự động tìm tất cả các class provider này trong các assembly và thực thi chúng.</li>
        <li><strong>Tập trung hóa:</strong> Tất cả các định nghĩa của một loại được quản lý tại một nơi trong module đó.</li>
      </ul>

      <h4>Các DefinitionProvider phổ biến:</h4>
      <ul>
        <li><strong>PermissionDefinitionProvider:</strong> Định nghĩa các quyền (permissions) cho hệ thống phân quyền.</li>
        <li><strong>SettingDefinitionProvider:</strong> Định nghĩa các thiết lập (settings) của ứng dụng có thể cấu hình.</li>
        <li><strong>FeatureDefinitionProvider:</strong> Định nghĩa các tính năng (features) cho hệ thống quản lý tính năng (hữu ích cho multi-tenancy).</li>
        <li><strong>LocalizationResourceContributor:</strong> Mặc dù không có hậu tố Provider, nó tuân theo cùng một pattern để đóng góp các file localization.</li>
        <li><strong>NavigationDefinitionProvider:</strong> Định nghĩa các menu điều hướng cho UI.</li>
      </ul>

      <h4>Ví dụ - SettingDefinitionProvider:</h4>
      <div class="code-block">
        <pre><code class="language-csharp">// Trong .Domain layer
public class MyProjectSettingDefinitionProvider : SettingDefinitionProvider
{
    public override void Define(ISettingDefinitionContext context)
    {
        // Định nghĩa một setting mới
        context.Add(
            new SettingDefinition(
                "Smtp.Host", // Tên setting
                "127.0.0.1", // Giá trị mặc định
                L("DisplayName:Smtp.Host"), // Tên hiển thị (đã được localize)
                L("Description:Smtp.Host"), // Mô tả
                isVisibleToClients: false, // Client có được thấy setting này không?
                isEncrypted: false // Có mã hóa giá trị khi lưu trong DB không?
            )
        );
    }
}</code></pre>
      </div>

      <h3>Lợi ích của Module System</h3>
      <ul>
        <li><strong>Tính mô-đun:</strong> Mỗi module có thể phát triển độc lập</li>
        <li><strong>Quản lý phụ thuộc:</strong> Tự động xử lý thứ tự khởi tạo</li>
        <li><strong>Mở rộng dễ dàng:</strong> Thêm module mới không ảnh hưởng module hiện có</li>
        <li><strong>Pattern nhất quán:</strong> Các DefinitionProvider cung cấp cách tiếp cận thống nhất</li>
      </ul>
    `
  },

  // Slide 6: Auto API Controllers - Cơ bản
  {
    id: 'slide-6-auto-api-basic',
    title: 'Auto API Controllers - Cơ bản',
    subtitle: 'Tự động tạo API controllers từ Application Services',
    content: `
      <h3>8.1 Auto API Controllers</h3>
      <p>ABP Framework tự động tạo API controllers từ Application Services, giúp giảm thiểu boilerplate code và đảm bảo consistency. Khi bạn tạo một application service, ABP có thể tự động cấu hình nó như một API controller để expose HTTP (REST) API endpoints.</p>

      <h4>8.1.1 Basic Configuration</h4>
      <p>Cấu hình cơ bản rất đơn giản. Chỉ cần configure <code>AbpAspNetCoreMvcOptions</code> và sử dụng method <code>ConventionalControllers.Create</code>:</p>

      <div class="code-block">
        <pre><code class="language-csharp">[DependsOn(TodoAppApplicationModule)]
public class TodoAppWebModule : AbpModule
{
    public override void PreConfigureServices(ServiceConfigurationContext context)
    {
        PreConfigure<AbpAspNetCoreMvcOptions>(options =>
        {
            options
                .ConventionalControllers
                .Create(typeof(TodoAppApplicationModule).Assembly);
        });
    }
}</code></pre>
      </div>

      <h4>8.1.2 HTTP Method Conventions</h4>
      <p>ABP sử dụng naming convention để xác định HTTP method cho service method:</p>

      <table>
        <thead>
          <tr><th>Method Name Prefix</th><th>HTTP Method</th><th>Ví dụ</th></tr>
        </thead>
        <tbody>
          <tr><td>Get, GetList, GetAll</td><td>GET</td><td>GetAsync(), GetListAsync()</td></tr>
          <tr><td>Put, Update</td><td>PUT</td><td>UpdateAsync(), PutAsync()</td></tr>
          <tr><td>Delete, Remove</td><td>DELETE</td><td>DeleteAsync(), RemoveAsync()</td></tr>
          <tr><td>Create, Add, Insert, Post</td><td>POST</td><td>CreateAsync(), AddAsync()</td></tr>
          <tr><td>Patch</td><td>PATCH</td><td>PatchAsync()</td></tr>
          <tr><td>Khác</td><td>POST (default)</td><td>ProcessAsync()</td></tr>
        </tbody>
      </table>

      <h4>8.1.3 Route Conventions</h4>
      <p>Route được tính toán dựa trên các conventions:</p>
      <ul>
        <li><strong>Base Path:</strong> Luôn bắt đầu với <code>/api</code></li>
        <li><strong>Route Path:</strong> Mặc định là <code>/app</code>, có thể customize:</li>
      </ul>

      <div class="code-block">
        <pre><code class="language-csharp">Configure<AbpAspNetCoreMvcOptions>(options =>
{
    options.ConventionalControllers
        .Create(typeof(TodoAppApplicationModule).Assembly, opts =>
        {
            opts.RootPath = "todo-app";
        });
});</code></pre>
      </div>

      <ul>
        <li><strong>Controller Name:</strong> Normalized service name (loại bỏ 'AppService', 'ApplicationService', 'Service' postfixes và convert sang kebab-case)</li>
        <li><strong>Action Name:</strong> Normalized method name (loại bỏ 'Async' postfix và HTTP method prefix)</li>
      </ul>

      <h4>8.1.4 Route Examples</h4>
      <table>
        <thead>
          <tr><th>Service Method Name</th><th>HTTP Method</th><th>Route</th></tr>
        </thead>
        <tbody>
          <tr><td>GetAsync(Guid id)</td><td>GET</td><td>/api/app/todo-item/{id}</td></tr>
          <tr><td>GetListAsync()</td><td>GET</td><td>/api/app/todo-item</td></tr>
          <tr><td>CreateAsync(CreateTodoItemDto input)</td><td>POST</td><td>/api/app/todo-item</td></tr>
          <tr><td>UpdateAsync(Guid id, UpdateTodoItemDto input)</td><td>PUT</td><td>/api/app/todo-item/{id}</td></tr>
          <tr><td>DeleteAsync(Guid id)</td><td>DELETE</td><td>/api/app/todo-item/{id}</td></tr>
          <tr><td>GetCompletedAsync(Guid id)</td><td>GET</td><td>/api/app/todo-item/{id}/completed</td></tr>
          <tr><td>AddCommentAsync(Guid id, AddCommentDto input)</td><td>POST</td><td>/api/app/todo-item/{id}/comment</td></tr>
        </tbody>
      </table>

      <h4>8.1.5 Application Service với Auto API</h4>
      <div class="code-block">
        <pre><code class="language-csharp">// TodoApp.Application/Services/TodoAppService.cs
public class TodoAppService : ApplicationService, ITodoAppService
{
    private readonly IRepository<TodoItem, Guid> _todoItemRepository;

    public TodoAppService(IRepository<TodoItem, Guid> todoItemRepository)
    {
        _todoItemRepository = todoItemRepository;
    }

    // GET /api/app/todo-item
    public async Task<List<TodoItemDto>> GetListAsync()
    {
        var todoItems = await _todoItemRepository.GetListAsync();
        return ObjectMapper.Map<List<TodoItem>, List<TodoItemDto>>(todoItems);
    }

    // GET /api/app/todo-item/{id}
    public async Task<TodoItemDto> GetAsync(Guid id)
    {
        var todoItem = await _todoItemRepository.GetAsync(id);
        return ObjectMapper.Map<TodoItem, TodoItemDto>(todoItem);
    }

    // POST /api/app/todo-item
    public async Task<TodoItemDto> CreateAsync(CreateTodoItemDto input)
    {
        var todoItem = new TodoItem { Text = input.Text };
        await _todoItemRepository.InsertAsync(todoItem);
        return ObjectMapper.Map<TodoItem, TodoItemDto>(todoItem);
    }

    // PUT /api/app/todo-item/{id}
    public async Task<TodoItemDto> UpdateAsync(Guid id, UpdateTodoItemDto input)
    {
        var todoItem = await _todoItemRepository.GetAsync(id);
        todoItem.Text = input.Text;
        await _todoItemRepository.UpdateAsync(todoItem);
        return ObjectMapper.Map<TodoItem, TodoItemDto>(todoItem);
    }

    // DELETE /api/app/todo-item/{id}
    public async Task DeleteAsync(Guid id)
    {
        await _todoItemRepository.DeleteAsync(id);
    }
}</code></pre>
      </div>
    `
  },

  // Slide 7: Auto API Controllers - Nâng cao
  {
    id: 'slide-7-auto-api-advanced',
    title: 'Auto API Controllers - Nâng cao',
    subtitle: 'Service Selection, Custom Routes và Advanced Features',
    content: `
      <h4>8.1.6 Service Selection</h4>
      <p>ABP tự động chọn các class để tạo conventional HTTP API controllers:</p>

      <h5>IRemoteService Interface</h5>
      <p>Nếu một class implement <code>IRemoteService</code> interface thì nó sẽ tự động được chọn làm conventional API controller. Application services inherently implement interface này.</p>

      <h5>RemoteService Attribute</h5>
      <p>Có thể sử dụng <code>RemoteService</code> attribute để mark một class là remote service hoặc disable cho một class cụ thể:</p>

      <div class="code-block">
        <pre><code class="language-csharp">[RemoteService(IsEnabled = false)] // hoặc đơn giản [RemoteService(false)]
public class PersonAppService : ApplicationService
{
    // Service này sẽ không được expose như API controller
}</code></pre>
      </div>

      <h5>TypePredicate Option</h5>
      <p>Bạn có thể filter classes để trở thành API controller bằng cách cung cấp <code>TypePredicate</code> option:</p>

      <div class="code-block">
        <pre><code class="language-csharp">services.Configure<AbpAspNetCoreMvcOptions>(options =>
{
    options.ConventionalControllers
        .Create(typeof(TodoAppApplicationModule).Assembly, opts =>
        {
            opts.TypePredicate = type => 
            {
                // Chỉ expose các service có tên kết thúc bằng "AppService"
                return type.Name.EndsWith("AppService");
            };
        });
});</code></pre>
      </div>

      <h4>8.1.7 Custom API Routes</h4>
      <p>Bạn có thể override route mặc định bằng cách sử dụng standard ASP.NET Core attributes:</p>

      <div class="code-block">
        <pre><code class="language-csharp">public class TodoAppService : ApplicationService, ITodoAppService
{
    [HttpGet("api/todos/completed")]
    public async Task<List<TodoItemDto>> GetCompletedTodosAsync()
    {
        var todoItems = await _todoItemRepository.GetListAsync(x => x.IsCompleted);
        return ObjectMapper.Map<List<TodoItem>, List<TodoItemDto>>(todoItems);
    }

    [HttpPost("api/todos/bulk")]
    public async Task<List<TodoItemDto>> CreateBulkAsync(List<CreateTodoItemDto> inputs)
    {
        var todoItems = new List<TodoItem>();
        
        foreach (var input in inputs)
        {
            var todoItem = new TodoItem { Text = input.Text };
            await _todoItemRepository.InsertAsync(todoItem);
            todoItems.Add(todoItem);
        }
        
        return ObjectMapper.Map<List<TodoItem>, List<TodoItemDto>>(todoItems);
    }
}</code></pre>
      </div>

      <h4>8.1.8 API Explorer</h4>
      <p>API Explorer là service cho phép investigate API structure bởi clients. Swagger sử dụng nó để tạo documentation và test UI.</p>

      <p>API Explorer được tự động enable cho conventional HTTP API controllers. Bạn có thể control nó bằng <code>RemoteService</code> attribute:</p>

      <div class="code-block">
        <pre><code class="language-csharp">[RemoteService(IsMetadataEnabled = false)]
public class PersonAppService : ApplicationService
{
    // Service này sẽ không xuất hiện trong API explorer/Swagger
    // Nhưng vẫn có thể sử dụng nếu biết chính xác API path
}</code></pre>
      </div>

      <h4>8.1.9 Replace or Remove Controllers</h4>
      
      <h5>Replace Controllers</h5>
      <p>Bạn có thể replace built-in controllers bằng cách sử dụng <code>ReplaceControllersAttribute</code>:</p>

      <div class="code-block">
        <pre><code class="language-csharp">[ReplaceControllers(typeof(AbpApplicationConfigurationController))]
[Area("abp")]
[RemoteService(Name = "abp")]
public class ReplaceBuiltInController : AbpController
{
    [HttpGet("api/abp/application-configuration")]
    public virtual Task<MyApplicationConfigurationDto> GetAsync(MyApplicationConfigurationRequestOptions options)
    {
        return Task.FromResult(new MyApplicationConfigurationDto());
    }
}</code></pre>
      </div>

      <h5>Remove Controllers</h5>
      <p>Configure <code>ControllersToRemove</code> của <code>AbpAspNetCoreMvcOptions</code> để remove controllers:</p>

      <div class="code-block">
        <pre><code class="language-csharp">services.Configure<AbpAspNetCoreMvcOptions>(options =>
{
    options.ControllersToRemove.Add(typeof(AbpLanguagesController));
});</code></pre>
      </div>

      <h3>Lợi ích của Auto API Controllers</h3>
      <ul>
        <li><strong>Giảm boilerplate code:</strong> Không cần viết controller thủ công</li>
        <li><strong>Consistency:</strong> Đảm bảo API endpoints nhất quán</li>
        <li><strong>Convention over Configuration:</strong> Tuân theo naming conventions</li>
        <li><strong>Flexibility:</strong> Có thể customize khi cần thiết</li>
        <li><strong>Auto Documentation:</strong> Tự động tạo Swagger documentation</li>
      </ul>
    `
  }
];

// --- Infrastructure Slides ---
const infrastructureSlides = [
  // 1. Audit Logging - Nổi bật về security và compliance
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
  // 2. Background Jobs - Nổi bật về async processing
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
  // 3. BLOB Storing - Nổi bật về file management
  {
    id: 'infra-3',
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
  // 4. Data Filtering - Nổi bật về multi-tenancy và soft delete
  {
    id: 'infra-4',
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
  // 5. Distributed Locking - Nổi bật về scalability
  {
    id: 'infra-5',
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
  // 6. Event Bus - Nổi bật về loose coupling
  {
    id: 'infra-6',
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
  // 7. Features System - Nổi bật về SaaS/multi-tenant
  {
    id: 'infra-7',
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
  // 8. Object Mapping - Nổi bật về productivity
  {
    id: 'infra-8',
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
  // 9. Settings Hierarchy - Nổi bật về configuration management
  {
    id: 'infra-9',
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
  // 10. Virtual File System (VFS) - Nổi bật về modularity
  {
    id: 'infra-10',
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
            new SettingDefinition(
                "Smtp.Host", // Tên setting
                "127.0.0.1", // Giá trị mặc định
                L("DisplayName:Smtp.Host"), // Tên hiển thị (đã được localize)
                L("Description:Smtp.Host"), // Mô tả
                isVisibleToClients: false, // Client có được thấy setting này không?
                isEncrypted: false // Có mã hóa giá trị khi lưu trong DB không?
            )
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
    window.presentationData.slides = window.presentationData.slides.concat(coreConceptsSlides, infrastructureSlides, moduleSlides);
} 