# ABP Framework Presentation

Một ứng dụng web presentation hoàn chỉnh về ABP Framework, được xây dựng bằng Vanilla HTML/CSS/JavaScript với giao diện hiện đại và responsive.

## 🚀 Tính năng

- **21 slides** bao gồm:
  - 3 slides tổng quan (Tổng quan ABP, Khái niệm nền tảng, Cấu trúc Project)
  - 14 slides cho 14 Core Modules của ABP Framework
  - 4 slides chi tiết về Infrastructure Components
- **Giao diện hiện đại** với sidebar navigation
- **Responsive design** hoạt động tốt trên desktop và mobile
- **Code highlighting** với Prism.js
- **Keyboard navigation** (Arrow keys, Home, End)
- **Smooth transitions** giữa các slides
- **Clean architecture** với separation of concerns

## 📁 Cấu trúc Project

```
abp-presentation/
├── index.html          # File HTML chính
├── styles.css          # CSS styling
├── data.js            # Dữ liệu slides
├── app.js             # Logic JavaScript
└── README.md          # Hướng dẫn này
```

## 🛠️ Cài đặt và Chạy

### Yêu cầu
- Node.js (version 14 trở lên)
- npm hoặc yarn

### Cách 1: Sử dụng npx serve (Khuyến nghị)

1. **Clone hoặc download project**
   ```bash
   # Nếu bạn có git repository
   git clone <repository-url>
   cd abp-presentation
   
   # Hoặc nếu bạn đã có files, chỉ cần cd vào thư mục
   cd abp-presentation
   ```

2. **Chạy với npx serve**
   ```bash
   npx serve .
   ```

3. **Mở trình duyệt**
   - Mở http://localhost:3000 (hoặc port được hiển thị)
   - Presentation sẽ tự động load

### Cách 2: Sử dụng Live Server (VS Code)

1. **Cài đặt Live Server extension** trong VS Code
2. **Mở thư mục** `abp-presentation` trong VS Code
3. **Right-click** vào `index.html` và chọn "Open with Live Server"

### Cách 3: Mở trực tiếp file

1. **Double-click** vào file `index.html`
2. **Hoặc drag & drop** file `index.html` vào trình duyệt

## 🎮 Cách sử dụng

### Navigation
- **Sidebar**: Click vào các mục trong sidebar để chuyển slide
- **Buttons**: Sử dụng Previous/Next buttons ở dưới
- **Keyboard**:
  - `←` (Left Arrow): Slide trước
  - `→` (Right Arrow): Slide tiếp theo
  - `Home`: Về slide đầu tiên
  - `End`: Đến slide cuối cùng

### Sections
- **Overview**: Tổng quan về ABP Framework
- **Core Modules**: 14 modules chính của ABP
- **Infrastructure**: Các thành phần infrastructure

## 📚 Nội dung Presentation

### Overview (3 slides)
1. **Tổng quan về ABP Framework**
   - Định nghĩa và mục đích
   - Ưu điểm chính
   - Lợi ích kiến trúc

2. **Các khái niệm nền tảng**
   - Domain Driven Design (DDD)
   - Layered Architecture
   - Modular System

3. **Cấu trúc Project**
   - Phân tích từng Layer
   - Project Dependencies Flow
   - Best Practices

### Core Modules (14 slides)
4. **Account Module** - Core authentication
5. **Audit Logging Module** - User actions tracking
6. **Background Jobs Module** - Asynchronous processing
7. **CMS Kit Module** - Content management
8. **Docs Module** - Documentation management
9. **Feature Management Module** - Feature toggling
10. **File Management Module** - File operations
11. **Identity Module** - User/role management
12. **OpenIddict Module** - Modern authentication
13. **Permission Management Module** - Permissions
14. **Setting Management Module** - Runtime settings
15. **Tenant Management Module** - Multi-tenancy
16. **Virtual File Explorer Module** - File browsing

### Infrastructure Components (4 slides)
17. **Infrastructure Components Overview**
18. **Background Jobs & Workers Detail**
19. **BLOB Storing Detail**
20. **Event Bus Detail**
21. **Email & Settings Management**

## 🎨 Customization

### Thay đổi theme
Chỉnh sửa file `styles.css`:
```css
/* Thay đổi màu chủ đạo */
:root {
    --primary-color: #3b82f6;
    --secondary-color: #1d4ed8;
}
```

### Thêm slides mới
1. **Thêm data** vào `data.js`:
```javascript
{
    id: 'slide-22',
    title: 'Your New Slide',
    subtitle: 'Subtitle here',
    content: '<p>Your content here</p>'
}
```

2. **Cập nhật navigation** trong `app.js` nếu cần

### Thay đổi fonts
Thay đổi trong `styles.css`:
```css
body {
    font-family: 'Your-Font', sans-serif;
}
```

## 🔧 Troubleshooting

### Lỗi thường gặp

1. **Presentation không load**
   - Kiểm tra console trong Developer Tools
   - Đảm bảo tất cả files được load đúng

2. **Code không highlight**
   - Kiểm tra kết nối internet (Prism.js được load từ CDN)
   - Hoặc download Prism.js về local

3. **Navigation không hoạt động**
   - Kiểm tra JavaScript console
   - Đảm bảo `data.js` được load trước `app.js`

### Performance
- **Large files**: Nếu có nhiều slides, consider lazy loading
- **Images**: Optimize images nếu sử dụng
- **CDN**: Các thư viện external được load từ CDN để tăng tốc

## 📝 Development

### Cấu trúc Code
- **HTML**: Semantic markup với accessibility
- **CSS**: BEM methodology, responsive design
- **JavaScript**: ES6+ classes, modular structure

### Best Practices
- **Accessibility**: ARIA labels, keyboard navigation
- **Performance**: Lazy loading, efficient DOM manipulation
- **Maintainability**: Clean code, comments, separation of concerns

## 🤝 Contributing

1. Fork project
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

## 📄 License

Project này được phát hành dưới MIT License. Xem file `LICENSE` để biết thêm chi tiết.

## 🙏 Acknowledgments

- **ABP Framework** - Nội dung presentation
- **Prism.js** - Code highlighting
- **Inter Font** - Typography
- **Feather Icons** - Icons

---

**Lưu ý**: Presentation này được tạo ra để giáo dục và training về ABP Framework. Vui lòng tham khảo [tài liệu chính thức của ABP](https://docs.abp.io/) để có thông tin cập nhật nhất.
