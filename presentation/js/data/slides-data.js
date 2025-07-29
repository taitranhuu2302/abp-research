// ABP Framework Presentation Data
const slidesData = {
    title: "ABP Framework Documentation",
    author: "Presentation by AI Assistant",
    version: "1.0.0",
    slides: [
        {
            id: 1,
            type: "title",
            title: "ABP Framework",
            subtitle: "Modern Application Framework for .NET",
            content: {
                description: "Một open-source framework để xây dựng ứng dụng web hiện đại dựa trên ASP.NET Core",
                version: "ABP Framework 9.2.0 với .NET 9.0",
                features: [
                    "Domain Driven Design (DDD)",
                    "Modular Architecture",
                    "Cross-cutting Concerns",
                    "Convention over Configuration"
                ]
            }
        },
        {
            id: 2,
            type: "content",
            title: "Tổng quan về ABP Framework",
            content: {
                sections: [
                    {
                        title: "ABP Framework là gì?",
                        description: "ABP (ASP.NET Boilerplate) Framework là một application framework mã nguồn mở được xây dựng trên nền tảng .NET",
                        points: [
                            "Layered Architecture theo Domain Driven Design",
                            "Modular System có thể tái sử dụng và mở rộng",
                            "Cross-cutting Concerns: Authentication, Authorization, Caching, Logging",
                            "Convention over Configuration"
                        ]
                    }
                ]
            }
        },
        {
            id: 3,
            type: "architecture",
            title: "Kiến trúc ABP Framework",
            content: {
                layers: [
                    {
                        name: "Presentation Layer",
                        description: "Controllers, UI, APIs",
                        icon: "fas fa-desktop"
                    },
                    {
                        name: "Application Layer",
                        description: "Use Cases, DTOs, Services",
                        icon: "fas fa-cogs"
                    },
                    {
                        name: "Domain Layer",
                        description: "Business Logic, Entities",
                        icon: "fas fa-brain"
                    },
                    {
                        name: "Infrastructure Layer",
                        description: "Database, External APIs",
                        icon: "fas fa-database"
                    }
                ]
            }
        },
        {
            id: 4,
            type: "features",
            title: "Core Concepts",
            content: {
                features: [
                    {
                        title: "Modular Architecture",
                        description: "Mỗi module là một assembly độc lập với dependencies được quản lý qua DependsOn attribute",
                        icon: "fas fa-puzzle-piece"
                    },
                    {
                        title: "Domain Driven Design",
                        description: "Tách biệt business logic khỏi technical infrastructure với ngôn ngữ chung",
                        icon: "fas fa-sitemap"
                    },
                    {
                        title: "Cross-cutting Concerns",
                        description: "Authorization, Audit Logging, Multi-tenancy, Caching, Localization, Exception Handling",
                        icon: "fas fa-layer-group"
                    }
                ]
            }
        },
        {
            id: 5,
            type: "two-column",
            title: "Project Structure",
            content: {
                left: {
                    title: "Source Projects",
                    items: [
                        "TodoApp.Domain.Shared - Shared Kernel",
                        "TodoApp.Domain - Domain Layer",
                        "TodoApp.Application.Contracts - Application Contracts",
                        "TodoApp.Application - Application Layer",
                        "TodoApp.EntityFrameworkCore - Infrastructure Layer",
                        "TodoApp.HttpApi - Web API Layer",
                        "TodoApp.HttpApi.Host - Host Application",
                        "TodoApp.DbMigrator - Database Migration Tool"
                    ]
                },
                right: {
                    title: "Test Projects",
                    items: [
                        "TodoApp.Domain.Tests",
                        "TodoApp.Application.Tests",
                        "TodoApp.EntityFrameworkCore.Tests",
                        "TodoApp.HttpApi.Client.ConsoleTestApp",
                        "TodoApp.TestBase"
                    ]
                }
            }
        },
        {
            id: 6,
            type: "code",
            title: "Module Configuration",
            content: {
                language: "csharp",
                code: `[DependsOn(
    typeof(TodoAppDomainSharedModule),
    typeof(AbpDddDomainModule),
    typeof(AbpAuditLoggingDomainModule)
)]
public class TodoAppDomainModule : AbpModule
{
    public override void PreConfigureServices(ServiceConfigurationContext context)
    {
        // Pre-configuration
    }
    
    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        // Service configuration
        Configure<AbpMultiTenancyOptions>(options =>
        {
            options.IsEnabled = MultiTenancyConsts.IsEnabled;
        });
    }
    
    public override void OnApplicationInitialization(ApplicationInitializationContext context)
    {
        // Application initialization
    }
}`
            }
        },
        {
            id: 7,
            type: "content",
            title: "Domain Layer - The Heart",
            content: {
                sections: [
                    {
                        title: "Entities & Aggregate Roots",
                        description: "Chứa business logic thuần túy, không phụ thuộc external concerns",
                        points: [
                            "Business entities với business methods",
                            "Value Objects cho complex business concepts",
                            "Domain Events cho loose coupling",
                            "Specifications cho query logic"
                        ]
                    },
                    {
                        title: "Domain Services",
                        description: "Complex business operations không thuộc về entity cụ thể",
                        points: [
                            "Business logic phức tạp",
                            "Validation rules",
                            "Business workflows"
                        ]
                    }
                ]
            }
        },
        {
            id: 8,
            type: "code",
            title: "Entity Example",
            content: {
                language: "csharp",
                code: `public class TodoItem : AuditedAggregateRoot<Guid>
{
    public string Text { get; set; } = string.Empty;
    public int Priority { get; set; } = 1;
    public bool IsCompleted { get; set; }
    public DateTime? DueDate { get; set; }
    
    // Business methods
    public void Complete()
    {
        if (IsCompleted)
            throw new BusinessException("TodoApp:TodoItemAlreadyCompleted");
            
        IsCompleted = true;
        AddLocalEvent(new TodoItemCompletedEvent { TodoItem = this });
    }
    
    public void SetPriority(int priority)
    {
        if (priority < 1 || priority > 5)
            throw new ArgumentOutOfRangeException(nameof(priority));
            
        Priority = priority;
    }
}`
            }
        },
        {
            id: 9,
            type: "content",
            title: "Application Layer",
            content: {
                sections: [
                    {
                        title: "Application Services",
                        description: "Implement use cases, orchestrate Domain layer",
                        points: [
                            "Validate input (DTOs)",
                            "Call Domain services/entities",
                            "Handle transactions (Unit of Work)",
                            "Map entities ↔ DTOs",
                            "Handle cross-cutting concerns"
                        ]
                    },
                    {
                        title: "Data Transfer Objects",
                        description: "Input/Output DTOs cho API communication",
                        points: [
                            "Input DTOs: CreateUpdateBookDto",
                            "Output DTOs: BookDto",
                            "Validation attributes",
                            "AutoMapper integration"
                        ]
                    }
                ]
            }
        },
        {
            id: 10,
            type: "code",
            title: "Application Service Example",
            content: {
                language: "csharp",
                code: `public class TodoAppService : TodoAppAppService, ITodoAppService
{
    private readonly IRepository<TodoItem, Guid> _todoItemRepository;
    private readonly TodoItemManager _todoItemManager;

    public TodoAppService(
        IRepository<TodoItem, Guid> todoItemRepository,
        TodoItemManager todoItemManager)
    {
        _todoItemRepository = todoItemRepository;
        _todoItemManager = todoItemManager;
    }

    public async Task<TodoItemDto> CreateAsync(CreateTodoItemDto input)
    {
        var todoItem = await _todoItemManager.CreateAsync(
            input.Text, 
            CurrentUser.GetId()
        );

        await _todoItemRepository.InsertAsync(todoItem);

        return ObjectMapper.Map<TodoItem, TodoItemDto>(todoItem);
    }
}`
            }
        },
        {
            id: 11,
            type: "comparison",
            title: "ABP vs Other Frameworks",
            content: {
                headers: ["Aspect", "ABP Framework", "Clean Architecture", "Minimal APIs"],
                rows: [
                    ["Learning Curve", "Steep (nhiều conventions)", "Moderate (familiar patterns)", "Low"],
                    ["Productivity", "High (built-in features)", "Medium (manual implementation)", "High (simple scenarios)"],
                    ["Flexibility", "Medium (ABP conventions)", "High (custom implementation)", "High"],
                    ["Enterprise Features", "Built-in (auth, multi-tenancy)", "Manual implementation needed", "Minimal"],
                    ["Project Size", "Medium to Large", "Medium to Large", "Small to Medium"]
                ]
            }
        },
        {
            id: 12,
            type: "pros-cons",
            title: "Ưu điểm và Nhược điểm",
            content: {
                pros: [
                    "Rapid Development với scaffolding tools",
                    "Enterprise-ready features out-of-the-box",
                    "Multi-tenancy support",
                    "Built-in security và performance features",
                    "Active community và commercial support",
                    "Clean layered architecture",
                    "Highly testable với dependency injection"
                ],
                cons: [
                    "Learning curve cao cho beginners",
                    "Phức tạp cho simple projects",
                    "Framework overhead có thể impact performance",
                    "Vendor lock-in với ABP conventions",
                    "Memory usage cao với built-in features",
                    "Startup time chậm với large applications"
                ]
            }
        },
        {
            id: 13,
            type: "list",
            title: "Khi nào nên sử dụng ABP Framework",
            content: {
                suitable: [
                    {
                        title: "Enterprise Applications",
                        description: "Large-scale business applications với complex business logic"
                    },
                    {
                        title: "SaaS Platforms",
                        description: "Multi-tenant applications cần tenant isolation"
                    },
                    {
                        title: "Microservices",
                        description: "Distributed system architectures"
                    },
                    {
                        title: "Long-term Projects",
                        description: "Projects với timeline > 6 months"
                    },
                    {
                        title: "Team Development",
                        description: "Teams với experience DDD và .NET"
                    }
                ],
                notSuitable: [
                    {
                        title: "Simple CRUD Apps",
                        description: "Basic data entry applications"
                    },
                    {
                        title: "Prototypes",
                        description: "Quick proof-of-concepts"
                    },
                    {
                        title: "Learning .NET",
                        description: "First .NET projects cho beginners"
                    },
                    {
                        title: "Small Teams",
                        description: "Teams < 3 developers"
                    },
                    {
                        title: "Short Deadlines",
                        description: "Projects với tight deadlines < 3 months"
                    }
                ]
            }
        },
        {
            id: 14,
            type: "content",
            title: "Best Practices",
            content: {
                sections: [
                    {
                        title: "Development Practices",
                        points: [
                            "Tuân thủ ABP naming conventions",
                            "Không vi phạm layer dependencies",
                            "Sử dụng Repository Pattern đúng cách",
                            "Proper Unit of Work management",
                            "Sử dụng Domain Events cho loose coupling",
                            "Consistent async/await patterns"
                        ]
                    },
                    {
                        title: "Performance Best Practices",
                        points: [
                            "Avoid N+1 problems, use proper includes",
                            "Cache frequently accessed data",
                            "Use background jobs cho heavy operations",
                            "Proper database indexing strategies",
                            "Dispose resources properly"
                        ]
                    }
                ]
            }
        },
        {
            id: 15,
            type: "code",
            title: "Troubleshooting Tips",
            content: {
                language: "csharp",
                code: `// Enable ABP Debug Logging
builder.Host.UseSerilog((context, services, loggerConfiguration) =>
{
    loggerConfiguration
        .MinimumLevel.Debug()
        .MinimumLevel.Override("Volo.Abp", LogEventLevel.Debug)
        .MinimumLevel.Override("Microsoft.EntityFrameworkCore", LogEventLevel.Information)
        .Enrich.FromLogContext()
        .WriteTo.Async(c => c.File("Logs/logs.txt"))
        .WriteTo.Async(c => c.Console());
});

// Custom Debug Middleware
app.Use(async (httpContext, next) =>
{
    var logger = httpContext.RequestServices.GetService<ILogger<MyModule>>();
    var stopwatch = Stopwatch.StartNew();
    
    logger.LogInformation("📥 Request: {Method} {Path}", 
        httpContext.Request.Method, 
        httpContext.Request.Path);

    await next();

    stopwatch.Stop();
    logger.LogInformation("📤 Response: {StatusCode} in {ElapsedMs}ms", 
        httpContext.Response.StatusCode,
        stopwatch.ElapsedMilliseconds);
});`
            }
        },
        {
            id: 16,
            type: "content",
            title: "Mức độ Customization",
            content: {
                sections: [
                    {
                        title: "High Customization Areas",
                        points: [
                            "Business logic trong Domain và Application layers",
                            "UI và User Experience",
                            "Database schema và relationships",
                            "Authentication và Authorization",
                            "Custom workflows và processes"
                        ]
                    },
                    {
                        title: "Medium Customization Areas",
                        points: [
                            "Module configuration",
                            "Validation rules",
                            "Localization và internationalization",
                            "Caching strategies",
                            "Background job implementations"
                        ]
                    },
                    {
                        title: "Limited Customization Areas",
                        points: [
                            "Core framework conventions",
                            "Module internals",
                            "ABP naming conventions",
                            "Framework lifecycle methods"
                        ]
                    }
                ]
            }
        },
        {
            id: 17,
            type: "code",
            title: "Customization Examples",
            content: {
                language: "csharp",
                code: `// Thay thế Services
public override void ConfigureServices(ServiceConfigurationContext context)
{
    context.Services.Replace(ServiceDescriptor.Transient<IEmailSender, MyCustomEmailSender>());
}

// Kế thừa và Ghi đè
public class MyAccountAppService : AccountAppService
{
    public override async Task<IdentityUserDto> RegisterAsync(RegisterDto input)
    {
        // Custom validation
        if (input.EmailAddress.EndsWith("@spam.com"))
        {
            throw new UserFriendlyException("Spam emails are not allowed!");
        }
        
        var result = await base.RegisterAsync(input);
        
        // Custom logic sau khi register
        await SendWelcomeEmailAsync(result.Email);
        
        return result;
    }
}

// Object Extensions
public override void PreConfigureServices(ServiceConfigurationContext context)
{
    ObjectExtensionManager.Instance.Modules()
        .ConfigureIdentity(identity =>
        {
            identity.ConfigureUser(user =>
            {
                user.AddOrUpdateProperty<string>("SocialSecurityNumber", property =>
                {
                    property.Attributes.Add(new RequiredAttribute());
                    property.Attributes.Add(new StringLengthAttribute(32));
                });
            });
        });
}`
            }
        },
        {
            id: 18,
            type: "title",
            title: "Kết luận",
            subtitle: "ABP Framework - Powerful Tool cho Enterprise Development",
            content: {
                description: "ABP Framework cung cấp một architecture mạnh mẽ và scalable cho việc phát triển ứng dụng enterprise",
                recommendations: [
                    "Invest time trong training và team preparation",
                    "Start với simple features để team familiar với ABP",
                    "Establish clear development guidelines",
                    "Plan for performance monitoring từ early phases",
                    "Focus vào understanding DDD principles",
                    "Practice với official samples và tutorials"
                ],
                finalNote: "Với right approach và mindset, ABP có thể significantly accelerate development while maintaining high code quality và architectural standards."
            }
        }
    ]
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = slidesData;
} 