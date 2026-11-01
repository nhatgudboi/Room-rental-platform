# Cấu Trúc Mã Nguồn & Thư Mục Dự Án (Code & Folder Structure)

> **Dự án:** Sàn Cho Thuê Phòng Trọ Thông Minh (Smart Rental Platform)  
> **Kiến trúc áp dụng:** Monorepo đa ngôn ngữ (Polyglot Monorepo)  
> - **Backend:** Java 21 / Spring Boot 3.3 (Clean Layered Architecture)  
> - **Frontend:** React 19 / Vite (Feature-driven Component Architecture)  
> - **AI Microservice:** Python 3.11 / FastAPI (Modular Machine Learning Pipeline)  
> - **Database:** PostgreSQL 16 (Relational Schema & DDL)

---

## 1. Nguyên Tắc Thiết Kế Cốt Lõi (Architecture Principles)

1. **Phân tách trách nhiệm (Separation of Concerns):**
   - Frontend không chứa logic nghiệp vụ cốt lõi hay tính toán tài chính; mọi quyền hạn truy cập (RBAC) và chuyển đổi trạng thái cọc đều được kiểm tra nghiêm ngặt tại Backend.
   - Controllers không chứa truy vấn SQL hay logic nghiệp vụ phức tạp; chỉ làm nhiệm vụ tiếp nhận HTTP request, validate DTOs và gọi xuống tầng Service.
   - Services tương tác với dữ liệu thông qua Spring Data JPA Repositories, không viết mã phụ thuộc trực tiếp vào Driver.
2. **Đồng bộ tuyệt đối với Hợp đồng OpenAPI 3.0.4:**
   - Tên tài nguyên (Endpoints), cấu trúc Request Body và Response DTO trong Java và Python đều phải ánh xạ 1:1 với [`docs/api/openapi.yaml`](./api/openapi.yaml).
3. **Mô-đun hóa độc lập cho Dịch vụ AI (Microservice Isolation):**
   - Lõi học máy Python FastAPI chạy độc lập trong container riêng, giao tiếp với Core Backend qua REST API nội bộ. Nếu AI Service gặp sự cố, hệ thống Core vẫn hoạt động bình thường với cơ chế Fallback an toàn.

---

## 2. Cây Thư Mục Tổng Thể Dự Án (Overall Monorepo Tree)

```text
d:\Room rental platform\
├── .env.example                       # Biến môi trường mẫu cho toàn dự án
├── .gitignore                         # Danh sách tệp loại trừ Git (Java, Node, Python, IDE)
├── compose.yaml                       # Docker Compose khởi chạy PostgreSQL 16
├── README.md                          # Tài liệu tổng quan dự án, lộ trình & sơ đồ C4
│
├── docs/                              # Toàn bộ tài liệu phân tích & thiết kế kỹ thuật
│   ├── 01-scope.md                    # Phân tích đề bài, nỗi đau thị trường & KPIs
│   ├── 03-use-cases.md                # Đặc tả 17 Use Cases & Sơ đồ Mermaid Use Case
│   ├── 04-information-architecture.md # Kiến trúc thông tin & Đặc tả 18 màn hình giao diện
│   ├── 05-data-model.md               # Mô hình dữ liệu quan hệ & Sơ đồ Mermaid ERD
│   ├── 07-folder-structure.md         # [Tài liệu hiện tại] Cấu trúc mã nguồn & thư mục
│   ├── 08-invest-requirements.md      # 17 User Stories chuẩn INVEST & Gherkin ACs
│   ├── images/
│   │   └── mindmap.png                # Ảnh sơ đồ tư duy sản phẩm xuất từ XMind
│   ├── api/
│   │   ├── openapi.yaml               # Hợp đồng REST API chuẩn OpenAPI 3.0.4 (42 endpoints)
│   │   └── README.md                  # Hướng dẫn tích hợp API & mã lỗi
│   └── architecture/
│       └── c4/                        # Bộ tài liệu mô hình C4 Model (C1 - C4)
│           ├── README.md              # Tổng quan C4 & quy ước bảng màu
│           ├── 01-system-context.md   # C1 - Ngữ cảnh hệ thống & bên thứ ba
│           ├── 02-container.md        # C2 - Phân rã Container & giao thức mạng
│           ├── 03-component.md        # C3 - Phân rã mô-đun Backend & AI Service
│           └── 04-code.md             # C4 - Thiết kế lớp & State Machine 2 tính năng lõi
│
└── src/                               # Toàn bộ mã nguồn thực thi của hệ thống
    ├── database/                      # Định nghĩa lược đồ Cơ sở Dữ liệu
    │   ├── schema.dbml                # Đặc tả DBML 2.0 (13 bảng, 8 enums)
    │   └── schema.sql                 # DDL PostgreSQL 16 thực thi kèm chỉ mục & dữ liệu seed
    │
    ├── backend/                       # Core Backend API (Java 21 / Spring Boot 3)
    ├── frontend/                      # Web Client SPA (React 19 / Vite / Tailwind)
    └── ai-service/                    # AI Microservice (Python 3.11 / FastAPI / LightGBM)
```

---

## 3. Cấu Trúc Chi Tiết Từng Mô-Đun Mã Nguồn (Source Packages)

### 3.1 Core Backend API — Java 21 / Spring Boot 3 (`src/backend/`)

Tổ chức theo mô hình **Clean Layered Architecture** chuẩn mực của Spring Boot:

```text
src/backend/
├── pom.xml                                      # Maven dependencies (Spring Boot 3.3, Security, JPA, Lombok, JWT)
└── src/
    ├── main/
    │   ├── java/vn/smartrental/platform/
    │   │   ├── SmartRentalApplication.java      # Lớp khởi chạy chính (Spring Boot Entry Point)
    │   │   │
    │   │   ├── config/                          # Cấu hình hạ tầng Spring Boot
    │   │   │   ├── SecurityConfig.java          # Cấu hình Spring Security 6 & RBAC URL filters
    │   │   │   ├── JwtConfig.java               # Cấu hình khóa bí mật và thời hạn JWT
    │   │   │   ├── WebSocketConfig.java         # Cấu hình WebSocket STOMP endpoint & message broker
    │   │   │   ├── VnpayConfig.java             # Cấu hình cổng thanh toán VNPAY Sandbox & HMAC
    │   │   │   ├── WebMvcConfig.java            # Cấu hình CORS & Static resource handlers
    │   │   │   └── RestClientConfig.java        # Cấu hình HTTP WebClient gọi sang AI Microservice
    │   │   │
    │   │   ├── security/                        # Thành phần xử lý bảo mật & Token
    │   │   │   ├── JwtTokenProvider.java        # Sinh và giải mã Access Token / Refresh Token
    │   │   │   ├── JwtAuthenticationFilter.java # Filter bắt giữ request, giải mã Bearer Token
    │   │   │   ├── UserDetailsServiceImpl.java  # Tải thông tin tài khoản người dùng từ PostgreSQL
    │   │   │   └── CustomAccessDeniedHandler.java # Trả về lỗi JSON 403 chuẩn hóa
    │   │   │
    │   │   ├── controller/                      # Lớp điều khiển REST API (Khớp 1:1 với OpenAPI)
    │   │   │   ├── AuthController.java          # Đăng ký, đăng nhập, refresh token, logout
    │   │   │   ├── UserController.java          # Lấy hồ sơ cá nhân, đổi mật khẩu, cập nhật profile
    │   │   │   ├── RoomController.java          # Tìm kiếm phòng, chi tiết phòng, danh sách công khai
    │   │   │   ├── LandlordRoomController.java  # Chủ trọ tạo phòng, sửa, đổi trạng thái, xóa mềm
    │   │   │   ├── KycController.java           # Chủ trọ nộp ảnh CCCD & kiểm tra trạng thái KYC
    │   │   │   ├── ModerationController.java    # Moderator duyệt KYC, duyệt tin phòng, gắn cờ AI
    │   │   │   ├── BookingController.java       # Tạo đơn cọc ký quỹ 48h, xác nhận nhận phòng
    │   │   │   ├── PaymentController.java       # Sinh URL VNPAY, tiếp nhận Webhook IPN
    │   │   │   ├── DisputeController.java       # Khách gửi khiếu nại hoàn cọc, Moderator phân xử
    │   │   │   ├── ReviewController.java        # Đánh giá 4 tiêu chí sau lưu trú, chủ trọ phản hồi
    │   │   │   ├── ChatController.java          # Lịch sử hội thoại chat và gửi tin nhắn REST fallback
    │   │   │   └── AdminController.java         # Thống kê doanh thu sàn, quản trị khóa tài khoản
    │   │   │
    │   │   ├── dto/                             # Data Transfer Objects (Request / Response records)
    │   │   │   ├── auth/                        # LoginRequest, RegisterRequest, AuthResponse
    │   │   │   ├── room/                        # CreateRoomRequest, RoomDetailResponse, RoomSummaryResponse
    │   │   │   ├── kyc/                         # SubmitKycRequest, KycResponse
    │   │   │   ├── booking/                     # CreateBookingRequest, BookingResponse
    │   │   │   ├── dispute/                     # FileDisputeRequest, DisputeResponse
    │   │   │   ├── review/                      # CreateReviewRequest, ReviewResponse
    │   │   │   ├── ai/                          # PricePredictionRequest, PricePredictionResponse
    │   │   │   └── common/                      # ErrorResponse, PageResponse
    │   │   │
    │   │   ├── model/entity/                    # Thực thể JPA ánh xạ 13 bảng PostgreSQL
    │   │   │   ├── User.java
    │   │   │   ├── LandlordKyc.java
    │   │   │   ├── District.java
    │   │   │   ├── UniversityLandmark.java
    │   │   │   ├── Room.java
    │   │   │   ├── RoomAmenity.java
    │   │   │   ├── RoomImage.java
    │   │   │   ├── EscrowBooking.java
    │   │   │   ├── Payment.java
    │   │   │   ├── Dispute.java
    │   │   │   ├── Review.java
    │   │   │   ├── Message.java
    │   │   │   └── AuditLog.java
    │   │   │
    │   │   ├── model/enums/                     # 8 ENUMs dùng chung
    │   │   │   ├── UserRole.java
    │   │   │   ├── KycStatus.java
    │   │   │   ├── RoomType.java
    │   │   │   ├── RoomStatus.java
    │   │   │   ├── BookingStatus.java
    │   │   │   ├── PaymentMethod.java
    │   │   │   ├── PaymentStatus.java
    │   │   │   └── DisputeStatus.java
    │   │   │
    │   │   ├── repository/                      # Spring Data JPA Repositories
    │   │   │   ├── UserRepository.java
    │   │   │   ├── LandlordKycRepository.java
    │   │   │   ├── RoomRepository.java          # Chứa JPQL tìm kiếm lọc theo bán kính PostGIS
    │   │   │   ├── EscrowBookingRepository.java
    │   │   │   ├── PaymentRepository.java
    │   │   │   ├── DisputeRepository.java
    │   │   │   ├── ReviewRepository.java
    │   │   │   ├── MessageRepository.java
    │   │   │   └── AuditLogRepository.java
    │   │   │
    │   │   ├── service/                         # Interfaces & Implementations logic nghiệp vụ
    │   │   │   ├── UserService.java
    │   │   │   ├── KycService.java
    │   │   │   ├── RoomService.java
    │   │   │   ├── EscrowBookingService.java    # Quản lý ký quỹ, đếm ngược 48h, atomic locking
    │   │   │   ├── VnpayPaymentService.java     # Xử lý checksum SHA512, sinh URL, gọi Refund API
    │   │   │   ├── DisputeService.java
    │   │   │   ├── ReviewService.java
    │   │   │   ├── ChatService.java
    │   │   │   ├── AnalyticsService.java
    │   │   │   └── AiIntegrationService.java    # Gọi sang Python FastAPI Microservice
    │   │   │
    │   │   └── exception/                       # Bắt lỗi toàn cục (Global Exception Handling)
    │   │       ├── GlobalExceptionHandler.java  # Bắt RuntimeException -> trả về ErrorResponse
    │   │       ├── ResourceNotFoundException.java
    │   │       ├── BadRequestException.java
    │   │       ├── ConflictException.java
    │   │       └── ForbiddenException.java
    │   │
    │   └── resources/
    │       ├── application.yml                  # Cấu hình Spring Boot (Database URL, JWT Secret, Port)
    │       └── application-dev.yml              # Cấu hình môi trường dev cục bộ
    │
    └── test/                                    # Unit Tests & Integration Tests
        └── java/vn/smartrental/platform/
            ├── service/EscrowBookingServiceTest.java
            └── controller/RoomControllerTest.java
```

---

### 3.2 Frontend Web App — React 19 / Vite (`src/frontend/`)

Tổ chức theo mô hình **Feature-driven & Atomic Components** tối ưu khả năng tái sử dụng:

```text
src/frontend/
├── package.json                         # Dependencies: React 19, react-router-dom, axios, leaflet, chart.js, lucide-react
├── vite.config.js                       # Cấu hình Vite & Alias đường dẫn (@/)
├── index.html                           # HTML gốc
└── src/
    ├── main.jsx                         # Điểm khởi chạy React DOM
    ├── App.jsx                          # Router Wrapper & Toast Notification Provider
    ├── index.css                        # Design System tokens, biến màu HSL, Tailwind/Vanilla styles
    │
    ├── api/                             # Lớp gọi REST API tập trung (Axios Client)
    │   ├── apiClient.js                 # Axios instance cấu hình baseURL, timeout, Bearer interceptor
    │   ├── authApi.js                   # Gọi /api/v1/auth/*
    │   ├── roomApi.js                   # Gọi /api/v1/rooms/*
    │   ├── kycApi.js                    # Gọi /api/v1/landlord/kyc/*
    │   ├── bookingApi.js                # Gọi /api/v1/bookings/*
    │   ├── paymentApi.js                # Gọi /api/v1/payments/*
    │   ├── disputeApi.js                # Gọi /api/v1/disputes/*
    │   ├── reviewApi.js                 # Gọi /api/v1/reviews/*
    │   ├── chatApi.js                   # Gọi /api/v1/chat/*
    │   └── adminApi.js                  # Gọi /api/v1/admin/*
    │
    ├── components/                      # Các thành phần giao diện dùng chung (Common UI)
    │   ├── layout/
    │   │   ├── Navbar.jsx               # Header chính, thanh tìm kiếm rút gọn, avatar menu
    │   │   ├── Footer.jsx               # Footer, điều khoản, liên hệ
    │   │   ├── Sidebar.jsx              # Thanh điều hướng bên hông cho Portal Chủ trọ/Admin
    │   │   └── PageContainer.jsx        # Khung chứa trang chuẩn responsive
    │   │
    │   ├── common/                      # Nút, input, modal, badge tái sử dụng
    │   │   ├── Button.jsx
    │   │   ├── Input.jsx
    │   │   ├── Modal.jsx
    │   │   ├── Badge.jsx                # Hiển thị badge: 'Đã duyệt KYC', 'Giá tốt AI', 'Đang giữ cọc'
    │   │   ├── Table.jsx
    │   │   ├── Spinner.jsx
    │   │   └── Toast.jsx
    │   │
    │   ├── rooms/                       # Component chuyên biệt cho phòng trọ
    │   │   ├── RoomCard.jsx             # Thẻ hiển thị phòng trong danh sách tìm kiếm
    │   │   ├── RoomGallery.jsx          # Album ảnh lướt xem chi tiết
    │   │   ├── AiPriceGauge.jsx         # Widget trực quan đo giá niêm yết vs AI LightGBM
    │   │   └── FilterSidebar.jsx        # Bộ lọc đa tiêu chí (khoảng giá, diện tích, tiện nghi)
    │   │
    │   ├── map/                         # Bản đồ số tương tác
    │   │   ├── InteractiveMap.jsx       # Tích hợp Leaflet, hiển thị cụm ghim phòng (MarkerCluster)
    │   │   └── RadiusOverlay.jsx        # Vẽ vòng tròn bán kính quanh trường đại học
    │   │
    │   └── chat/                        # Cửa sổ chat thời gian thực
    │       ├── ChatWindow.jsx           # Khung chat WebSocket
    │       └── MessageBubble.jsx
    │
    ├── context/                         # Quản lý trạng thái toàn cục (React Context)
    │   ├── AuthContext.jsx              # Lưu trữ User profile, token, hàm login/logout
    │   ├── SocketContext.jsx            # Quản lý kết nối WebSocket STOMP
    │   └── NotificationContext.jsx      # Thông báo popup thời gian thực
    │
    ├── hooks/                           # Custom React Hooks
    │   ├── useAuth.js                   # Tiện ích truy cập thông tin người dùng & quyền hạn
    │   ├── useRoomSearch.js             # Quản lý state bộ lọc tìm kiếm & gọi API debounce
    │   ├── useEscrow.js                 # Xử lý quy trình đặt cọc và đếm ngược 48h
    │   └── useChat.js                   # Gửi và nhận tin nhắn qua WebSocket
    │
    ├── pages/                           # 18 Màn hình giao diện (Khớp 1:1 với SCR-01 -> SCR-18)
    │   ├── public/
    │   │   ├── HomePage.jsx             # SCR-01: Trang chủ tìm kiếm & Feed gợi ý AI
    │   │   ├── SearchResultsPage.jsx    # SCR-02: Danh sách kết quả & Bản đồ số
    │   │   ├── RoomDetailPage.jsx       # SCR-03: Chi tiết phòng, đo giá AI, reviews
    │   │   ├── EscrowBookingPage.jsx    # SCR-04: Đặt cọc ký quỹ 48h & thanh toán VNPAY
    │   │   ├── DisputeFilingPage.jsx    # SCR-05: Khiếu nại phòng sai mô tả & đòi cọc
    │   │   └── PostStayReviewPage.jsx   # SCR-06: Viết đánh giá sau lưu trú
    │   │
    │   ├── auth/
    │   │   ├── LoginPage.jsx            # SCR-07: Đăng nhập
    │   │   ├── RegisterPage.jsx         # SCR-07: Đăng ký (chọn vai trò Tenant/Landlord)
    │   │   └── ProfilePage.jsx          # SCR-08: Quản lý hồ sơ, đổi mật khẩu, lịch sử cọc
    │   │
    │   ├── landlord/
    │   │   ├── LandlordKycPage.jsx      # SCR-09: Tải ảnh CCCD & giấy tờ phòng xác minh
    │   │   ├── LandlordRoomsPage.jsx    # SCR-10: Quản lý danh sách phòng & trạng thái
    │   │   ├── CreateRoomPage.jsx       # SCR-11: Tạo phòng mới, có công cụ AI định giá
    │   │   └── LandlordBookingsPage.jsx # SCR-12: Quản lý đơn khách cọc & đếm ngược 48h
    │   │
    │   ├── moderator/
    │   │   ├── KycModerationPage.jsx    # SCR-13: Hàng đợi duyệt CCCD chủ trọ
    │   │   ├── RoomModerationPage.jsx   # SCR-14: Hàng đợi duyệt tin phòng & cờ cảnh báo AI
    │   │   └── DisputeModerationPage.jsx# SCR-15: Phân xử khiếu nại cọc & kích hoạt hoàn tiền
    │   │
    │   ├── admin/
    │   │   ├── AdminUsersPage.jsx       # SCR-16: Quản trị danh sách người dùng & khóa tài khoản
    │   │   └── AdminDashboardPage.jsx   # SCR-17: Dashboard doanh thu sàn & tỷ lệ phòng trống
    │   │
    │   └── chat/
    │       └── ChatPage.jsx             # SCR-18: Cửa sổ nhắn tin trực tiếp Khách - Chủ
    │
    └── routes/                          # Điều hướng & Bảo vệ đường dẫn
        ├── AppRoutes.jsx                # Định nghĩa toàn bộ Route
        ├── ProtectedRoute.jsx           # Chặn chưa đăng nhập -> điều hướng về /auth/login
        └── RoleGuard.jsx                # Chặn không đủ vai trò (ví dụ: Tenant không vào được /mod/*)
```

---

### 3.3 AI Microservice — Python 3.11 / FastAPI (`src/ai-service/`)

Tổ chức theo mô hình **Modular Machine Learning Pipeline**:

```text
src/ai-service/
├── Dockerfile                           # Container hóa Python 3.11-slim
├── requirements.txt                     # FastAPI, uvicorn, lightgbm, scikit-learn, pandas, numpy, pydantic
├── README.md                            # Hướng dẫn train mô hình & chạy API cục bộ
│
├── artifacts/                           # Tệp nhị phân mô hình đã huấn luyện
│   ├── lightgbm_price_model.pkl         # Trọng số mô hình LightGBM Regressor đã train
│   ├── preprocessor_pipeline.pkl        # Pipeline tiền xử lý (One-hot, StandardScale)
│   └── feature_names.json               # Danh sách thứ tự các đặc trưng đầu vào
│
└── app/
    ├── main.py                          # Khởi tạo FastAPI App, CORS middleware, startup events
    │
    ├── core/
    │   ├── config.py                    # Đọc biến môi trường (Port, Model path, API Keys)
    │   └── logger.py                    # Cấu hình ghi log suy luận & độ trễ
    │
    ├── schemas/                         # Pydantic Schemas validate dữ liệu đầu vào/ra
    │   ├── price_schema.py              # PricePredictionRequest, PricePredictionResponse
    │   ├── recommendation_schema.py     # RecommendationRequest, RecommendationResponse
    │   └── chat_schema.py               # ChatQueryRequest, ChatQueryResponse
    │
    ├── api/v1/                          # Routers định nghĩa Endpoints
    │   ├── router.py                    # Gom nhóm toàn bộ routers v1
    │   ├── endpoints_prediction.py      # POST /predict-price
    │   ├── endpoints_recommendation.py  # GET /recommendations
    │   └── endpoints_chat.py            # POST /chat
    │
    ├── services/                        # Lõi nghiệp vụ học máy
    │   ├── lightgbm_service.py          # Tải model, nạp đặc trưng, dự đoán giá & tính khoảng tin cậy
    │   ├── recommender_service.py       # Tính toán Cosine Similarity & lọc cộng tác
    │   └── chatbot_service.py           # Phân tích câu hỏi, trích xuất thực thể, trả lời tiện ích
    │
    └── training/                        # Kịch bản huấn luyện lại mô hình (Offline Training)
        ├── train_lightgbm.py            # Kịch bản đọc dataset phòng trọ Hà Nội/HCM, train & lưu .pkl
        ├── evaluate.py                  # Đo lường sai số MAE, RMSE, MAPE (< 10%)
        └── sample_dataset.csv           # Tập dữ liệu huấn luyện mẫu (10,000 dòng sạch)
```
