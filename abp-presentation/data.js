// ABP Framework Presentation Data
const presentationData = {
    slides: [
        // Slide 1: Tổng quan ABP Framework
        {
            id: 'slide-1',
            title: 'Tổng quan về ABP Framework',
            subtitle: 'Web application framework mã nguồn mở cho ASP.NET Core',
            content: `
                <p>ABP Framework là một <strong>web application framework mã nguồn mở</strong> cho <strong>ASP.NET Core</strong>, được thiết kế để tăng tốc độ phát triển các ứng dụng doanh nghiệp. Nó cung cấp một <strong>kiến trúc hoàn chỉnh dựa trên Domain Driven Design (DDD)</strong> với nhiều tính năng tích hợp sẵn.</p>
                
                <h3>Ưu điểm chính:</h3>
                <ul>
                    <li><strong>Phát triển nhanh</strong>: Đạt được thông qua các công cụ scaffolding, các module có sẵn, tự động tạo API và các component UI tích hợp.</li>
                    <li><strong>Tính năng sẵn sàng cho doanh nghiệp</strong>: Bao gồm hỗ trợ sẵn cho multi-tenancy, microservices, bảo mật nâng cao (OAuth 2.0, OpenIdConnect, JWT), tối ưu hóa hiệu suất (caching, async/await) và khả năng mở rộng.</li>
                    <li><strong>Lợi ích kiến trúc</strong>: Tuân thủ Clean Architecture và SOLID principles, đảm bảo tách biệt các mối quan tâm, khả năng test cao và dễ bảo trì thông qua cấu trúc modular.</li>
                </ul>
            `
        },

        // Slide 2: Các khái niệm nền tảng của ABP Framework
        {
            id: 'slide-2',
            title: 'Các khái niệm nền tảng của ABP Framework',
            subtitle: 'Kiến trúc, mô hình, nguyên tắc chủ đạo',
            content: `
                <ul>
                    <li><b>Kiến trúc phân lớp (Layered Architecture):</b> Tổ chức code theo các layer (Domain, Application, Infrastructure, Presentation), tách biệt rõ ràng, dễ mở rộng/bảo trì.</li>
                    <li><b>Domain-Driven Design (DDD):</b> Tập trung vào nghiệp vụ cốt lõi, mô hình hóa domain, giảm phụ thuộc vào data access.</li>
                    <li><b>Modular (Tính mô-đun):</b> Ứng dụng chia thành các module độc lập, dễ tái sử dụng, mở rộng, mỗi module có thể có đủ các layer.</li>
                    <li><b>Repository Pattern & Unit Of Work:</b> Tách biệt logic kinh doanh với truy cập dữ liệu, quản lý giao dịch nhất quán.</li>
                    <li><b>Microservice & Multitenancy:</b> Hỗ trợ xây dựng microservice và hệ thống đa tenant (nhiều tổ chức dùng chung nền tảng, dữ liệu tách biệt).</li>
                    <li><b>Tích hợp bảo mật (Authentication & Authorization):</b> Sẵn sàng xác thực, phân quyền, tương thích IdentityServer, OAuth, ...</li>
                    <li><b>Đa ngôn ngữ (Localization):</b> Hỗ trợ xây dựng ứng dụng đa ngôn ngữ ngay từ framework.</li>
                    <li><b>Hạ tầng & công cụ sinh mã:</b> Audit Logging, cấu hình tập trung, code generation, ... giúp tăng tốc phát triển.</li>
                </ul>
                <p><b>Hệ sinh thái module mở rộng:</b> ABP cung cấp nhiều module mã nguồn mở sẵn (User, Quyền, Cấu hình, ...), cài đặt nhanh, tiết kiệm thời gian cho dự án doanh nghiệp.</p>
                <div class="code-block"><pre><code class="language-text">- Layered + DDD + Modular
- Dependency Injection
- Repository & Unit Of Work
- Microservice, Multitenancy
- Clean Architecture
- Security, Localization
- Code Generation, Audit Logging, ...</code></pre></div>
                <p><b>Kết luận:</b> ABP Framework giúp xây dựng phần mềm .NET hiện đại, chuẩn hóa, mở rộng, bảo trì và kiểm thử dễ dàng.</p>
            `
        },

        // Slide 3: Cấu trúc Project ABP Framework
        {
            id: 'slide-3',
            title: 'Cấu trúc Project ABP Framework',
            subtitle: 'Layered Architecture & Module hóa',
            content: `
                <h3>1. Thư mục gốc</h3>
                <ul>
                    <li><b>src</b>: Chứa mã nguồn ứng dụng (source code)</li>
                    <li><b>test</b>: Chứa các project kiểm thử (unit test, integration test)</li>
                </ul>
                <div class="code-block"><pre><code class="language-text">src/
  ├── MyApp.Domain.Shared/
  ├── MyApp.Domain/
  ├── MyApp.Application.Contracts/
  ├── MyApp.Application/
  ├── MyApp.EntityFrameworkCore/
  ├── MyApp.HttpApi/
  ├── MyApp.Web/
  └── MyApp.DbMigrator/
test/
  └── ...</code></pre></div>
                <h3>2. Các project chính trong <code>src</code></h3>
                <table>
                    <thead><tr><th>Tên Project</th><th>Vai trò chính</th></tr></thead>
                    <tbody>
                        <tr><td><code>*.Domain.Shared</code></td><td>Constant, enum, kiểu chia sẻ, không phụ thuộc project nào</td></tr>
                        <tr><td><code>*.Domain</code></td><td>Entity, aggregate root, repository interface, domain service</td></tr>
                        <tr><td><code>*.Application.Contracts</code></td><td>Interface application service, DTO, hợp đồng dữ liệu</td></tr>
                        <tr><td><code>*.Application</code></td><td>Implement application service, xử lý business logic</td></tr>
                        <tr><td><code>*.EntityFrameworkCore</code></td><td>Triển khai ORM (EF Core), implement repository</td></tr>
                        <tr><td><code>*.HttpApi</code></td><td>Expose service qua HTTP API (controller)</td></tr>
                        <tr><td><code>*.Web</code></td><td>Giao diện web (MVC, Razor, Blazor)</td></tr>
                        <tr><td><code>*.DbMigrator</code></td><td>Console migrate & seed database</td></tr>
                    </tbody>
                </table>
                <p><b>Kết luận:</b> Cấu trúc ABP giúp tách biệt domain, business logic, data access, API, UI, hỗ trợ phát triển, mở rộng, kiểm thử hiệu quả.</p>
            `
        }
    ]
};

// Export for use in app.js
window.presentationData = presentationData; 