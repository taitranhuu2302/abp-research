# ABP Framework Documentation Presentation

Một presentation slide hiện đại và tương tác để trình bày tài liệu ABP Framework, được xây dựng với HTML, CSS, và JavaScript thuần.

## 🚀 Tính năng

### ✨ Giao diện hiện đại
- Thiết kế responsive và clean
- Animations mượt mà
- Theme màu sắc chuyên nghiệp
- Typography tối ưu cho presentation

### 🎯 Nội dung phong phú
- 18 slides bao quát toàn bộ ABP Framework
- Code examples với syntax highlighting
- Architecture diagrams
- Comparison tables
- Pros/Cons analysis

### 🎮 Tương tác
- Navigation bằng keyboard và mouse
- Touch gestures cho mobile
- Fullscreen mode
- Progress tracking
- Slide overview

### 💻 Technical Features
- Modular JavaScript architecture
- Code syntax highlighting với Prism.js
- Smooth animations và transitions
- Auto-save presentation state
- Performance optimized

## 📁 Cấu trúc dự án

```
presentation/
├── index.html                 # File HTML chính
├── styles/
│   ├── main.css              # CSS chính
│   ├── slides.css            # Styles cho slides
│   └── components.css        # UI components
├── js/
│   ├── main.js               # Main application
│   ├── data/
│   │   └── slides-data.js    # Slide content data
│   └── components/
│       ├── SlideRenderer.js  # Slide rendering logic
│       ├── Navigation.js     # Navigation controls
│       ├── ProgressBar.js    # Progress tracking
│       ├── CodeHighlighter.js # Code syntax highlighting
│       └── Animations.js     # Animation system
└── README.md                 # Documentation này
```

## 🎮 Cách sử dụng

### Khởi chạy
1. Mở file `index.html` trong trình duyệt web
2. Hoặc serve qua local server:
   ```bash
   # Sử dụng Python
   python -m http.server 8000
   
   # Sử dụng Node.js
   npx serve .
   
   # Sử dụng PHP
   php -S localhost:8000
   ```

### Điều khiển

#### Keyboard Shortcuts
- **← / Page Up**: Slide trước
- **→ / Page Down / Space**: Slide tiếp theo
- **Home**: Slide đầu tiên
- **End**: Slide cuối cùng
- **F / Ctrl+F**: Toggle fullscreen
- **Esc**: Thoát fullscreen

#### Mouse/Touch
- Click nút Previous/Next
- Click vào progress bar để jump to slide
- Click vào dots navigation
- Swipe left/right trên mobile

#### Navigation Bar
- **Previous/Next buttons**: Điều hướng slides
- **Slide counter**: Hiển thị vị trí hiện tại
- **Fullscreen button**: Chế độ toàn màn hình
- **Keyboard shortcuts button**: Hiển thị phím tắt

## 📊 Nội dung Slides

### 1. Title Slide
- Giới thiệu ABP Framework
- Version và features chính

### 2. Tổng quan
- ABP Framework là gì?
- Core concepts

### 3. Kiến trúc
- 4-layer architecture
- Visual diagram

### 4. Core Concepts
- Modular Architecture
- Domain Driven Design
- Cross-cutting Concerns

### 5. Project Structure
- Source projects
- Test projects

### 6. Module Configuration
- Code example
- Module lifecycle

### 7. Domain Layer
- Entities & Aggregate Roots
- Domain Services

### 8. Entity Example
- Code example với business logic

### 9. Application Layer
- Application Services
- Data Transfer Objects

### 10. Application Service Example
- Code example implementation

### 11. Framework Comparison
- ABP vs Clean Architecture
- ABP vs Minimal APIs

### 12. Pros & Cons
- Ưu điểm và nhược điểm

### 13. Use Cases
- Khi nào nên sử dụng
- Khi nào không nên

### 14. Best Practices
- Development practices
- Performance practices

### 15. Troubleshooting
- Debug tips
- Common issues

### 16. Customization
- Mức độ customization
- Examples

### 17. Customization Examples
- Code examples

### 18. Kết luận
- Recommendations
- Final thoughts

## 🛠️ Tùy chỉnh

### Thêm slide mới
1. Thêm data vào `js/data/slides-data.js`
2. Thêm render method vào `SlideRenderer.js` nếu cần
3. Thêm CSS styles nếu cần

### Thay đổi theme
1. Cập nhật CSS variables trong `styles/main.css`
2. Thay đổi colors, fonts, spacing

### Thêm animations
1. Thêm animation classes vào `styles/slides.css`
2. Cập nhật `Animations.js` component

## 🔧 Technical Details

### Architecture
- **Modular Design**: Mỗi component độc lập
- **Event-driven**: Components giao tiếp qua events
- **Responsive**: Mobile-first design
- **Performance**: Lazy loading và optimization

### Browser Support
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### Dependencies
- **Font Awesome**: Icons
- **Inter Font**: Typography
- **Prism.js**: Code highlighting

## 🚀 Deployment

### Static Hosting
- GitHub Pages
- Netlify
- Vercel
- AWS S3

### Local Development
```bash
# Clone repository
git clone <repository-url>
cd presentation

# Open in browser
open index.html

# Or serve locally
python -m http.server 8000
```

## 📝 Contributing

1. Fork repository
2. Create feature branch
3. Make changes
4. Test thoroughly
5. Submit pull request

## 📄 License

MIT License - xem file LICENSE để biết thêm chi tiết.

## 🤝 Support

Nếu có vấn đề hoặc câu hỏi:
1. Kiểm tra documentation này
2. Xem console logs để debug
3. Tạo issue trên GitHub

## 🎯 Roadmap

- [ ] Thêm presenter mode
- [ ] Export to PDF
- [ ] Custom themes
- [ ] More slide types
- [ ] Interactive demos
- [ ] Multi-language support

---

**ABP Framework Documentation Presentation** - Built with ❤️ for the .NET community 