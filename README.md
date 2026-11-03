# Smart Room Rental Platform

**Verified, AI-Powered Student Room Rental & Escrow Marketplace**

*Two-tier CCCD eKYC verification · Real-time LightGBM AI price valuation · 48-hour VNPAY escrow deposit guarantee*

[![Interactive two-column split map & room discovery](docs/images/SCR-02-search-split-map.png)](#23-visual-showcase--18-screen-uiux-prototype)

Smart Room Rental Platform connects tenants, landlords, moderators, and administrators in a verified, AI-powered room rental marketplace. It eliminates deceptive rental listings through two-tier KYC and listing verification, provides real-time LightGBM AI rental price valuation, delivers personalized room recommendations, protects tenants with a 48-hour escrow deposit guarantee via VNPAY, and ensures verified post-stay reviews.

## 1. Requirements — INVEST, Use Cases, and Acceptance Criteria

Requirements define what Smart Room Rental Platform must do, who uses it, the value delivered, and the observable conditions of success. User stories are reviewed with INVEST and mapped to use cases and acceptance criteria.

### 1.1 Product mind map

![Smart Room Rental Platform mind map](docs/images/mindmap.png)

### 1.2 INVEST requirements

The V1 backlog includes 17 user stories. These stories cover authentication, personal profile, landlord KYC verification, room listing and AI price prediction, listing moderation, multi-criteria room search and map exploration, AI personalized recommendations, 24/7 AI chatbot assistant, 48-hour escrow deposit booking and dispute resolution, real-time WebSocket messaging, post-stay verified reviews, and administrative user management and analytics dashboard.
Before a user story is ready for development, it is validated using the INVEST criteria.

| Criterion | Meaning in Smart Room Rental Platform |
| :--- | :--- |
| **Independent** | Each story provides a clear, self-contained business capability and depends on other stories only through established foundation layers (authentication and KYC). |
| **Negotiable** | The visual presentation and micro-interactions can adapt based on user testing as long as security invariants, business rules, and role permissions remain intact. |
| **Valuable** | Each story delivers measurable value to one of the 4 platform personas (Admin, Moderator, Landlord, Tenant), reducing listing fraud or streamlining bookings. |
| **Estimable** | Roles, inputs, outputs, preconditions, external integrations (VNPAY, LightGBM), and error scenarios are fully documented. |
| **Small** | Each story addresses one discrete capability and can be divided into frontend, backend, AI microservice, database, and test tasks. |
| **Testable** | Every story maps to observable acceptance criteria specified in Gherkin (Given-When-Then) format with precise validation and error status codes. |

```text
US01–US02   Authentication and personal profile
US03–US04   Landlord KYC verification and moderator approval
US05–US07   Room listing creation, LightGBM AI price valuation, and listing audit
US08–US09   Multi-criteria room search, filter sidebar, and interactive map exploration
US10–US11   AI personalized recommendation feed and 24/7 AI chatbot assistant
US12–US13   48-hour escrow deposit booking (VNPAY) and dispute resolution
US14        Real-time in-app WebSocket messaging
US15        Two-stage verified post-stay reviews
US16–US17   User management and administrative analytics dashboard
```

All 17 V1 stories have estimable target behavior and achieve a 100% PASS rate across all 6 INVEST dimensions. The complete story-level backlog and Gherkin scenarios are maintained in [INVEST Requirements](docs/08-invest-requirements.md) and [Acceptance Criteria](docs/06-acceptance-criteria.md).

### 1.3 Use cases

```mermaid
flowchart LR
    subgraph leftActors["Vận Hành & Quản Trị"]
        direction TB
        admin(["Admin<br/>(Quản trị viên)"])
        moderator(["Moderator<br/>(Kiểm duyệt viên)"])
    end

    subgraph system["Smart Rental Platform — Ranh Giới Hệ Thống"]
        direction TB
        
        subgraph authGroup["1. Xác thực & Hồ sơ"]
            direction LR
            uc01["UC01: Đăng nhập / Đăng ký"]
            uc02["UC02: Quản lý hồ sơ & Mật khẩu"]
        end

        subgraph trustGroup["2. Kiểm duyệt & Xác minh 2 lớp"]
            direction LR
            uc03["UC03: Nộp hồ sơ KYC"]
            uc04["UC04: Duyệt hồ sơ KYC"]
            uc07["UC07: Duyệt tin đăng phòng"]
            uc13["UC13: Phân xử khiếu nại cọc"]
        end

        subgraph aiGroup["3. Trí tuệ Nhân tạo & Học máy"]
            direction LR
            uc06["UC06: Dự đoán giá LightGBM"]
            uc10["UC10: Gợi ý phòng cá nhân hóa"]
            uc11["UC11: Chatbot tư vấn 24/7"]
        end

        subgraph discoveryGroup["4. Khám phá & Giao dịch"]
            direction LR
            uc05["UC05: Đăng & Quản lý tin phòng"]
            uc08["UC08: Tìm kiếm & Lọc đa tiêu chí"]
            uc09["UC09: Xem phòng & Bản đồ số"]
            uc12["UC12: Đặt cọc Escrow (VNPAY)"]
            uc14["UC14: Chat trực tiếp Khách - Chủ"]
            uc15["UC15: Đánh giá sau lưu trú"]
        end

        subgraph adminGroup["5. Quản trị & Báo cáo"]
            direction LR
            uc16["UC16: Quản trị tài khoản"]
            uc17["UC17: Dashboard & Doanh thu"]
        end
    end

    subgraph rightActors["Người Dùng Thị Trường"]
        direction TB
        landlord(["Landlord<br/>(Chủ nhà trọ)"])
        tenant(["Tenant<br/>(Khách thuê)"])
    end

    %% Luồng quyền Admin
    admin --> uc01
    admin --> uc02
    admin --> uc04
    admin --> uc07
    admin --> uc13
    admin --> uc16
    admin --> uc17

    %% Luồng quyền Moderator
    moderator --> uc01
    moderator --> uc02
    moderator --> uc04
    moderator --> uc07
    moderator --> uc13
    moderator --> uc15

    %% Luồng quyền Landlord (Chủ trọ)
    landlord --> uc01
    landlord --> uc02
    landlord --> uc03
    landlord --> uc05
    landlord --> uc06
    landlord --> uc12
    landlord --> uc14
    landlord --> uc15
    landlord --> uc17

    %% Luồng quyền Tenant (Người thuê)
    tenant --> uc01
    tenant --> uc02
    tenant --> uc06
    tenant --> uc08
    tenant --> uc09
    tenant --> uc10
    tenant --> uc11
    tenant --> uc12
    tenant --> uc13
    tenant --> uc14
    tenant --> uc15

    classDef adminStyle fill:#dc2626,stroke:#991b1b,stroke-width:2px,color:#fff;
    classDef modStyle fill:#d97706,stroke:#b45309,stroke-width:2px,color:#fff;
    classDef landlordStyle fill:#2563eb,stroke:#1d4ed8,stroke-width:2px,color:#fff;
    classDef tenantStyle fill:#059669,stroke:#047857,stroke-width:2px,color:#fff;

    class admin adminStyle;
    class moderator modStyle;
    class landlord landlordStyle;
    class tenant tenantStyle;
```

For detailed actors, role descriptions, and complete use case specifications (UC01–UC17), see [Actors, Roles, and Use Cases](docs/03-use-cases.md).

### 1.4 Roles and permissions

| Capability | Admin | Moderator | Landlord | Tenant |
| :--- | :---: | :---: | :---: | :---: |
| Browse verified rooms & interactive map | Yes | Yes | Yes | Yes |
| View room details & AI price benchmark | Yes | Yes | Yes | Yes |
| Submit landlord KYC verification (CCCD) | No | No | Yes | No |
| Review and approve landlord KYC dossiers | Yes | Yes | No | No |
| Create and manage room listings | No | No | Yes (KYC approved) | No |
| Audit and moderate room listings | Yes | Yes | No | No |
| AI real-time price valuation (LightGBM) | No | Reference | Yes | Reference |
| AI personalized feed & 24/7 chatbot | No | No | No | Yes |
| 48h escrow booking & deposit payment (VNPAY) | No | No | Receives deposit | Places deposit |
| File dispute & request deposit refund | No | Adjudicates | Party | Complainant |
| Real-time in-app chat (WebSocket STOMP) | No | No | Yes | Yes |
| Post-stay 2-stage verified reviews | Moderates | Moderates | Receives review | Submits review |
| User administration & account locking | Yes | No | No | No |
| Revenue analytics & platform dashboard | Yes | No | Own property only | No |

The backend enforces RBAC and resource ownership at the API gateway and service layer; hiding frontend controls serves UI/UX convenience only.

---

## 2. Information Architecture, Screen Hierarchy, and UI/UX

The information architecture organizes the platform workspace by business capability and role-based permissions. Screen navigation, modals, and responsive layout adhere to modern Airbnb-style design principles, with uniform handling of loading, empty, validation, saving, and error states across all viewports.

### 2.1 Information architecture

The visual sitemap diagram visualizes all 18 platform screens structured as card-based nodes (Relume-style), detailing the exact functional blocks, sections, and user operations within each screen:

```mermaid
flowchart TD
    AppRoot["<b>🏠 SMART RENTAL PLATFORM</b><br/>(Cổng Thông Tin & Nền Tảng Cho Thuê Phòng Trọ Thông Minh)"]

    %% ==========================================
    %% 1. PHÂN HỆ CÔNG KHAI & KHÁCH THUÊ
    %% ==========================================
    subgraph G_Public["1. Phân Hệ Người Thuê & Công Khai (Tenant & Public)"]
        direction TB

        SCR01["<b>SCR-01: Trang Chủ & Tìm Kiếm</b><br/><i>(Route: /)</i><hr/>• Navbar: Logo, Định vị, Search, Đăng nhập/Đăng ký<br/>• Hero Search: Chọn trường ĐH, Bán kính, Tầm giá<br/>• AI Feed: Gợi ý phòng cá nhân hóa theo lịch sử xem<br/>• District Quick Filter: Cầu Giấy, Đống Đa, Bách Khoa...<br/>• Verified Rooms Grid: Danh sách phòng đã kiểm duyệt<br/>• Trust Banner: Cam kết 100% phòng thật & Ký quỹ 48h<br/>• Footer: Hỗ trợ, Quy chế sàn, Hotline"]

        SCR02["<b>SCR-02: Tìm Kiếm & Bản Đồ Số</b><br/><i>(Route: /rooms)</i><hr/>• Navbar: Thanh tìm kiếm thu nhỏ & Bộ lọc nhanh<br/>• Filter Sidebar: Khoảng giá, Diện tích, Tiện nghi AC/Máy giặt<br/>• Interactive Map View: Ghim cụm phòng, bán kính trường ĐH<br/>• Room Card List: Ảnh, Giá, Badge 'Giá tốt theo AI', Khoảng cách<br/>• Sort Toolbar: Giá tăng/giảm, Mới nhất, Đánh giá cao<br/>• Floating AI Assistant: Nút mở Chatbot tư vấn 24/7"]

        SCR03["<b>SCR-03: Chi Tiết Phòng Trọ</b><br/><i>(Route: /rooms/:id)</i><hr/>• Breadcrumbs: Trang chủ > Quận > Tên phòng<br/>• Photo Gallery: Album ảnh thực tế độ phân giải cao<br/>• Header Card: Tiêu đề, Địa chỉ, Giá niêm yết, Trạng thái<br/>• AI Price Gauge: Thanh đo so sánh Giá niêm yết vs AI LightGBM<br/>• Specs Grid: Diện tích m2, Giá điện/kWh, Giá nước/m3, Wifi<br/>• Amenities Checklist: Điều hòa, Nóng lạnh, Giờ tự do...<br/>• Landlord Card: Tên, Avatar, Badge KYC, Nút Chat trực tiếp<br/>• Escrow Booking Bar: Nút 'Đặt cọc giữ chỗ 48h (500k)'<br/>• Verified Reviews Section: Chấm điểm 4 tiêu chí & Bình luận<br/>• Related Rooms: Gợi ý phòng tương tự cùng khu vực"]

        SCR04["<b>SCR-04: Đặt Cọc Ký Quỹ Escrow</b><br/><i>(Route: /rooms/:id/booking)</i><hr/>• Header: Quy trình ký quỹ giữ phòng an toàn 48h<br/>• Booking Summary: Tên phòng, Địa chỉ, Tiền cọc (500,000đ)<br/>• Schedule Picker: Chọn ngày giờ hẹn đến xem phòng<br/>• Escrow Policy Box: Điều khoản bảo vệ & Hoàn cọc 100%<br/>• Payment Methods: VNPAY QR, Thẻ ATM/Visa, Ví MoMo<br/>• Action Button: 'Xác nhận & Chuyển hướng thanh toán'"]

        SCR05["<b>SCR-05: Khiếu Nại & Hoàn Cọc</b><br/><i>(Route: /bookings/:id/dispute)</i><hr/>• Dispute Header: Thông tin đơn cọc & Thời hạn 24h<br/>• Reason Radio: Phòng ẩm mốc / Thiếu tiện nghi / Chủ bùng hẹn<br/>• Evidence Uploader: Tải ảnh/video hiện trường phòng thực tế<br/>• Description TextArea: Mô tả chi tiết sai lệch so với tin đăng<br/>• Submit Button: 'Gửi yêu cầu phân xử hoàn tiền 100%'"]

        SCR06["<b>SCR-06: Đánh Giá Sau Lưu Trú</b><br/><i>(Route: /bookings/:id/review)</i><hr/>• Verification Badge: 'Khách thuê đã xác minh lưu trú'<br/>• 4-Criteria Rating: An ninh, Vệ sinh, Điện nước, Chủ trọ<br/>• Comment Box: Viết chia sẻ trải nghiệm thực tế<br/>• Photo Uploader: Đính kèm ảnh thực tế căn phòng<br/>• Submit Action: 'Gửi đánh giá công khai'"]
    end

    %% ==========================================
    %% 2. PHÂN HỆ XÁC THỰC & HỒ SƠ
    %% ==========================================
    subgraph G_Auth["2. Phân Hệ Xác Thực & Tài Khoản (Auth & Profile)"]
        direction TB

        SCR07["<b>SCR-07: Đăng Nhập & Đăng Ký</b><br/><i>(Route: /auth/login, /auth/register)</i><hr/>• Role Switcher: Chọn vai trò Khách thuê | Chủ nhà trọ<br/>• Form Inputs: Email, Mật khẩu, Họ tên, Số điện thoại<br/>• Validation Messages: Báo lỗi định dạng thời gian thực<br/>• Action Buttons: Đăng nhập / Đăng ký qua JWT<br/>• Links: Quên mật khẩu, Điều khoản sử dụng"]

        SCR08["<b>SCR-08: Hồ Sơ Cá Nhân & Quản Lý</b><br/><i>(Route: /profile)</i><hr/>• Account Info Tab: Avatar, Họ tên, SĐT, Email, Vai trò<br/>• Security Tab: Form đổi mật khẩu bảo mật<br/>• My Bookings Tab: Lịch sử đặt cọc & Trạng thái ký quỹ<br/>• Saved Rooms Tab: Danh sách các phòng trọ đã lưu"]
    end

    %% ==========================================
    %% 3. PHÂN HỆ DÀNH CHO CHỦ TRỌ
    %% ==========================================
    subgraph G_Landlord["3. Phân Hệ Quản Lý Chủ Trọ (Landlord Portal)"]
        direction TB

        SCR09["<b>SCR-09: Xác Minh KYC Chủ Trọ</b><br/><i>(Route: /landlord/kyc)</i><hr/>• KYC Stepper: Khai báo > Tải CCCD > Giấy phép phòng<br/>• CCCD Uploader: Tải ảnh 2 mặt CCCD (JPG/PNG < 5MB)<br/>• Ownership Doc: Ảnh giấy chứng nhận quyền sở hữu trọ<br/>• Status Card: Hiển thị Đang duyệt / Đã duyệt / Bị từ chối"]

        SCR10["<b>SCR-10: Quản Lý Danh Sách Phòng</b><br/><i>(Route: /landlord/rooms)</i><hr/>• Stats Summary: Tổng phòng, Đang trống, Đang giữ cọc, Đã thuê<br/>• Filter & Search Bar: Lọc theo quận, trạng thái phòng<br/>• Room Table: Ảnh đại diện, Tiêu đề, Giá, Lượt xem, Trạng thái<br/>• Quick Actions: Sửa tin, Ẩn tin, Đổi trạng thái phòng<br/>• CTA Button: '+ Tạo bài đăng phòng mới'"]

        SCR11["<b>SCR-11: Tạo & Sửa Tin Đăng Phòng</b><br/><i>(Route: /landlord/rooms/new)</i><hr/>• Basic Info: Tiêu đề, Địa chỉ chi tiết, Tọa độ bản đồ GPS<br/>• Specs Form: Diện tích m2, Giá điện/kWh, Giá nước/m3, Số người<br/>• Amenities Grid: Chọn tiện nghi (Điều hòa, Nóng lạnh, Máy giặt...)<br/>• Gallery Uploader: Kéo thả tải lên tối thiểu 3 ảnh thực tế<br/>• AI Pricing Widget: Nhấn 'Dự đoán giá AI LightGBM' -> Xem gợi ý<br/>• Pricing Inputs: Giá niêm yết, Tiền cọc giữ chỗ quy định<br/>• Submit Action: 'Gửi duyệt tin phòng'"]

        SCR12["<b>SCR-12: Quản Lý Đơn Cọc Giữ Phòng</b><br/><i>(Route: /landlord/bookings)</i><hr/>• Bookings Table: Mã cọc, Tên khách, SĐT, Số tiền ký quỹ, Hạn hẹn<br/>• Countdown Timer: Đếm ngược 48h thời hạn khách đến xem<br/>• Action Buttons: 'Xác nhận khách đã nhận phòng' -> Giải ngân cọc<br/>• Chat Shortcut: Mở chat trực tiếp với khách thuê"]
    end

    %% ==========================================
    %% 4. PHÂN HỆ KIỂM DUYỆT & QUẢN TRỊ SÀN
    %% ==========================================
    subgraph G_Admin["4. Phân Hệ Ban Quản Trị & Kiểm Duyệt (Admin & Moderator)"]
        direction TB

        SCR13["<b>SCR-13: Hàng Đợi Duyệt KYC Chủ Trọ</b><br/><i>(Route: /mod/kyc)</i><hr/>• KYC Queue Table: Tên chủ trọ, Ngày nộp, Trạng thái chờ<br/>• Modal Đối Soát: Phóng to 2 mặt CCCD, kiểm tra tính hợp lệ<br/>• Decision Bar: Nút 'Phê duyệt' | Nút 'Từ chối' kèm lý do"]

        SCR14["<b>SCR-14: Hàng Đợi Duyệt Tin Phòng</b><br/><i>(Route: /mod/rooms)</i><hr/>• Listings Queue Table: Tiêu đề, Giá chủ đặt, Giá AI gợi ý<br/>• Discrepancy Flag: Cảnh báo tự động nếu giá lệch > 35%<br/>• Audit Modal: Kiểm tra ảnh thực tế chống ảnh mạng, kiểm tra GPS<br/>• Decision Bar: Nút 'Phê duyệt xuất bản' | Nút 'Từ chối tin'"]

        SCR15["<b>SCR-15: Phân Xử Khiếu Nại Cọc</b><br/><i>(Route: /mod/disputes)</i><hr/>• Dispute Cases: Mã cọc, Người khiếu nại, Bằng chứng ảnh/video<br/>• Evidence Viewer: So sánh ảnh thực tế khách chụp vs ảnh tin đăng<br/>• Settlement Actions: 'Hoàn tiền 100% cho Khách' | 'Giải ngân cho Chủ'"]

        SCR16["<b>SCR-16: Quản Trị Tài Khoản & Vi Phạm</b><br/><i>(Route: /admin/users)</i><hr/>• User List Table: Avatar, Tên, Email, SĐT, Role, Trạng thái<br/>• Action Menu: Cấp quyền Moderator, Khóa tài khoản gian lận"]

        SCR17["<b>SCR-17: Dashboard Thống Kê & Doanh Thu</b><br/><i>(Route: /admin/dashboard)</i><hr/>• Financial KPI Cards: Tổng tiền cọc ký quỹ, Doanh thu hoa hồng<br/>• Operational KPIs: Tỷ lệ phòng trống theo quận, Tin chờ duyệt<br/>• Charts: Biểu đồ doanh thu theo tháng, Tỷ lệ duyệt/từ chối"]
    end

    %% ==========================================
    %% 5. GIAO TIẾP DÙNG CHUNG
    %% ==========================================
    subgraph G_Chat["5. Phân Hệ Giao Tiếp Thời Gian Thực (Communication)"]
        direction TB

        SCR18["<b>SCR-18: Cửa Sổ Chat Trực Tiếp</b><br/><i>(Route: /chat)</i><hr/>• Conversation List: Danh sách hội thoại kèm badge tin chưa đọc<br/>• Room Snapshot Header: Tên phòng, Giá, Trạng thái cọc đang bàn<br/>• Message Stream: Luồng tin nhắn WebSocket thời gian thực<br/>• Media Sender: Đính kèm ảnh hiện trạng phòng & Định vị hẹn gặp"]
    end

    %% ==========================================
    %% CÁC ĐƯỜNG KẾT NỐI ĐIỀU HƯỚNG CHÍNH
    %% ==========================================
    AppRoot --> G_Public
    AppRoot --> G_Auth
    AppRoot --> G_Landlord
    AppRoot --> G_Admin
    AppRoot --> G_Chat

    SCR01 -->|Bấm tìm kiếm| SCR02
    SCR02 -->|Xem chi tiết| SCR03
    SCR03 -->|Bấm Đặt cọc 48h| SCR04
    SCR04 -->|Đến xem bị sai lệch| SCR05
    SCR04 -->|Nhận phòng thành công| SCR06
    SCR03 -->|Nhắn tin hỏi chủ trọ| SCR18

    SCR10 -->|Bấm Thêm phòng| SCR11
    SCR09 -->|Duyệt KYC xong mới vào| SCR10
    SCR10 -->|Xem đơn khách cọc| SCR12

    SCR13 -->|Duyệt KYC thành công| SCR09
    SCR14 -->|Duyệt tin thành công| SCR03
    SCR15 -->|Xử lý khiếu nại| SCR05
```

### 2.2 Screen hierarchy

The application architecture partitions navigation into public discovery and three dedicated authenticated portals:
- **Public & Tenant Shell:** Home & hero search (`SCR-01`), interactive map & filter view (`SCR-02`), room details with AI gauge (`SCR-03`), 48h escrow booking checkout (`SCR-04`), booking history & dispute manager (`SCR-05`), profile & saved rooms (`SCR-06`), and post-stay review submission (`SCR-07`).
- **Landlord Management Portal:** Landlord dashboard (`SCR-08`), listing creation with real-time AI valuation widget (`SCR-09`), room inventory manager (`SCR-10`), KYC submission (`SCR-11`), and booking manager (`SCR-12`).
- **Moderator Auditing Desk:** Moderator dashboard (`SCR-13`), listing inspection queue (`SCR-14`), KYC verification queue (`SCR-15`), and dispute adjudication center (`SCR-16`).
- **Administrator Command Center:** User & role administration (`SCR-17`) and platform revenue & occupancy analytics dashboard (`SCR-18`).
- **Common & Fallback Shell:** Login / registration modal (`SCR-00`), real-time chat drawer (`DRAWER-01`), floating AI chatbot assistant (`WIDGET-01`), 403 Forbidden, and 404 Not Found screens.

Detailed screen inventories, UI component breakdown, accessibility rules, and state specifications are maintained in [Information Architecture](docs/04-information-architecture.md).

### 2.3 Giao diện thực tế & Thư viện 18 màn hình (UI/UX Visual Showcase)

> [!NOTE]
> **Về thanh chuyển đổi vai trò (Role Switcher) trên thanh điều hướng giao diện:**
> 
> The top navigation bar includes an interactive role switcher pill: **`[Tenant | Landlord | Moderator | Admin]`**.
> * **Purpose in the Current UI/UX Prototype Phase:** The entire frontend is currently operating with a comprehensive **Mock Data suite**. This segmented control is intentionally provided so that evaluators, reviewers, and stakeholders can **seamlessly switch between all four operational perspectives** within a single session, inspecting all 18 screens without the friction of repeatedly logging in and out across four distinct test accounts.
> * **In the Production Deployment (Full-Flow Implementation):** This switcher will be **entirely removed**. The platform will strictly enforce standard authentication and authorization boundaries:
>   * Each role will authenticate through isolated credentials and JWT session tokens.
>   * Permissions are strictly enforced via multi-layer RBAC (Role-Based Access Control) at both the API Gateway and database levels: Tenants only access room discovery and deposit checkout; Landlords must pass chip-based CCCD identity verification before unlocking the property management portal; Moderators and Administrators access dedicated command consoles protected by cryptographic audit trails.

---

#### 1. Tenant Discovery & Booking Subsystem

**SCR-01: Home Discovery & Student Rental Search Console**
> Built with Traveloka hospitality aesthetics: A compact search ribbon allowing students to filter by university campus, commute radius, and monthly budget; quick district filter chips; and room cards showcasing verified landlord badges, LightGBM AI fair-price indicators, and instant CTAs.

![SCR-01: Home Discovery & Search Console](docs/images/SCR-01-home-discovery.png)

---

**SCR-02: Interactive Two-Column Split Map (OpenStreetMap & Leaflet)**
> High-fidelity OpenStreetMap integration with actual Hanoi street coordinates. Features interactive price pills (`3.2Tr`, `3.8Tr`, `2.6Tr`), campus landmarks (e.g., Hanoi University of Science and Technology), and bidirectional synchronization: clicking a pin highlights the corresponding listing card, and vice versa.

![SCR-02: Interactive Split Map Console](docs/images/SCR-02-search-split-map.png)

---

**SCR-03: Room Detail View & Market Price Valuation Benchmark**
> High-resolution photo gallery; itemized transparent living expense breakdown (sub-metered electricity, water, fiber internet); LightGBM AI market valuation gauge comparing listing price against localized neighborhood averages; and a sticky 48h escrow booking guarantee box.

![SCR-03: Room Detail & AI Price Gauge](docs/images/SCR-03-room-detail-ai.png)

---

**SCR-04: 48-Hour Escrow Deposit Checkout via VNPAY**
> A structured 3-step checkout flow: Schedule physical inspection appointment, review 500,000 VND escrow custody terms held securely via VNPAY, and agree to the 24-hour full refund guarantee policy in the event of listing fraud or physical discrepancies.

![SCR-04: Escrow Deposit Checkout](docs/images/SCR-04-escrow-checkout.png)

---

**SCR-05: 24-Hour Dispute Filing & On-Site Evidence Upload**
> Enables tenants to halt automatic escrow fund disbursement and file for a 100% deposit refund by selecting grievance categories (severe mold, broken AC, unauthorized rate hikes) and attaching photographic inspection proof.

![SCR-05: 24-Hour Dispute Filing](docs/images/SCR-05-dispute-filing.png)

---

**SCR-06: Two-Stage Verified Post-Stay Community Review**
> Restricted exclusively to verified tenants with finalized rental contracts. Collects objective ratings across 4 core dimensions: Security, Cleanliness, Utility Meter Transparency, and Landlord Support.

![SCR-06: Verified Community Review](docs/images/SCR-06-verified-review.png)

---

#### 2. Landlord Property Management Subsystem

**SCR-10: Rental Inventory Dashboard & Performance Metrics**
> Features 4 FlowX-style StatTiles tracking total room count, vacant inventory, active 48h escrow reservations, and monthly gross revenue; complemented by an inventory management table with segmented status pills.

![SCR-10: Rental Inventory Management](docs/images/SCR-10-landlord-room-management.png)

---

**SCR-11: Room Listing Creation & Market Price Advisor**
> Structured property submission form capturing address, room area, individual utility tariffs, and bundled amenities; integrated with a market price reference tool to optimize occupancy rates.

![SCR-11: Listing Creation & Pricing Advisor](docs/images/SCR-11-create-room-ai-valuation.png)

---

**SCR-12: 48-Hour Escrow Booking & Check-in Management**
> Real-time countdown timer tracking the 48-hour inspection window for prospective tenants, verified tenant contact details, and a confirmation action to trigger automated escrow fund release upon move-in.

![SCR-12: Landlord Escrow Booking Manager](docs/images/SCR-12-landlord-escrow-bookings.png)

---

**SCR-09: Landlord Identity Verification (Chip-Based CCCD eKYC)**
> Formal identity verification pipeline requiring landlords to submit 12-digit national ID numbers, front/back photos of chip-based citizen identity cards, and property ownership deeds prior to publishing privileges.

![SCR-09: Landlord KYC Verification](docs/images/SCR-09-landlord-kyc.png)

---

#### 3. Moderator Auditing & Dispute Adjudication Subsystem

**SCR-13: Landlord eKYC Dossier Moderation Queue**
> A dual-column audit console displaying pending landlord submissions alongside a high-resolution document viewer to inspect card chips, holographic seals, and match ownership records under a 4-hour SLA.

![SCR-13: Landlord KYC Moderation Queue](docs/images/SCR-13-kyc-moderation-queue.png)

---

**SCR-14: Listing Inspection Queue & AI Price Discrepancy Auditing**
> Automated discrepancy detection flagging listings priced abnormally against neighborhood medians, combined with anti-fraud photo inspection to prevent scraped or stock imagery.

![SCR-14: Listing Moderation Queue](docs/images/SCR-14-room-moderation-ai-flag.png)

---

**SCR-15: Escrow Dispute Adjudication & Evidence Comparison**
> Side-by-side evidence inspection console comparing original approved listing photos against real-world tenant incident evidence, equipped with one-click full tenant refund or landlord payout actions.

![SCR-15: Dispute Adjudication Console](docs/images/SCR-15-dispute-adjudication.png)

---

#### 4. Platform Administration & Common Subsystems

**SCR-17: Escrow Custody Dashboard & Platform Financial Analytics**
> Executive financial dashboard displaying total funds held in VNPAY escrow custody, commission revenue, on-time disbursement compliance rates, and weekly cashflow circulation trends.

![SCR-17: Executive Financial Dashboard](docs/images/SCR-17-admin-financial-dashboard.png)

---

**SCR-16: User Administration & Fraud Suspension Console**
> Unified user registry across all 4 platform roles (Admin, Moderator, Landlord, Tenant) with instant fraudulent account suspension controls and violation audit logging.

![SCR-16: User Administration Console](docs/images/SCR-16-admin-user-management.png)

---

**SCR-18: Real-Time In-App Messaging (Tenant-Landlord Chat)**
> Low-latency direct communication channel facilitating appointment coordination, utility queries, and move-in support between verified parties.

![SCR-18: Real-Time Messaging Stream](docs/images/SCR-18-in-app-chat.png)

---

**SCR-07: Role-Based Authentication & Registration Portal**
> Unified login and onboarding interface featuring role selection tabs for Tenants and Landlords, backed by secure JWT credential validation.

![SCR-07: Authentication & Onboarding Portal](docs/images/SCR-07-auth-portal.png)

---

**SCR-08: Tenant Account Profile & Escrow Booking History**
> Tenant personal command center managing profile credentials, active 48-hour escrow booking countdowns, and saved room bookmarks.

![SCR-08: Tenant Profile & Booking Manager](docs/images/SCR-08-tenant-profile-bookings.png)

---

### Comprehensive 18-Screen Prototype Matrix

| ID | Screen Code | Screen Name & Primary Purpose | Role Boundary | Route Path | Direct Screenshot |
| :---: | :--- | :--- | :--- | :--- | :---: |
| **01** | `SCR-01` | Home Discovery & Rental Search Console | Tenant (Public) | `/` | [View Screen](docs/images/SCR-01-home-discovery.png) |
| **02** | `SCR-02` | Interactive Split Map & Multi-Criteria Filter | Tenant (Public) | `/rooms` | [View Screen](docs/images/SCR-02-search-split-map.png) |
| **03** | `SCR-03` | Room Detail & Market Valuation Benchmark | Tenant (Public) | `/rooms/:id` | [View Screen](docs/images/SCR-03-room-detail-ai.png) |
| **04** | `SCR-04` | 48-Hour Escrow Deposit Checkout (VNPAY) | Tenant | `/rooms/:id/booking` | [View Screen](docs/images/SCR-04-escrow-checkout.png) |
| **05** | `SCR-05` | 24-Hour Dispute Filing & Evidence Upload | Tenant | `/bookings/:id/dispute` | [View Screen](docs/images/SCR-05-dispute-filing.png) |
| **06** | `SCR-06` | Two-Stage Verified Post-Stay Review | Tenant | `/bookings/:id/review` | [View Screen](docs/images/SCR-06-verified-review.png) |
| **07** | `SCR-07` | Role-Based Authentication & Registration | Common (Auth) | `/auth/login` | [View Screen](docs/images/SCR-07-auth-portal.png) |
| **08** | `SCR-08` | Tenant Profile & Escrow Booking History | Tenant | `/profile` | [View Screen](docs/images/SCR-08-tenant-profile-bookings.png) |
| **09** | `SCR-09` | Landlord Identity Verification (CCCD eKYC) | Landlord | `/landlord/kyc` | [View Screen](docs/images/SCR-09-landlord-kyc.png) |
| **10** | `SCR-10` | Rental Inventory Dashboard & Performance | Landlord | `/landlord/rooms` | [View Screen](docs/images/SCR-10-landlord-room-management.png) |
| **11** | `SCR-11` | Listing Creation & Market Price Advisor | Landlord | `/landlord/rooms/new` | [View Screen](docs/images/SCR-11-create-room-ai-valuation.png) |
| **12** | `SCR-12` | 48-Hour Escrow Booking & Check-in Manager | Landlord | `/landlord/bookings` | [View Screen](docs/images/SCR-12-landlord-escrow-bookings.png) |
| **13** | `SCR-13` | Landlord eKYC Dossier Moderation Queue | Moderator | `/mod/kyc` | [View Screen](docs/images/SCR-13-kyc-moderation-queue.png) |
| **14** | `SCR-14` | Listing Auditing & Price Discrepancy Queue | Moderator | `/mod/rooms` | [View Screen](docs/images/SCR-14-room-moderation-ai-flag.png) |
| **15** | `SCR-15` | Dispute Adjudication & Evidence Comparison | Moderator | `/mod/disputes` | [View Screen](docs/images/SCR-15-dispute-adjudication.png) |
| **16** | `SCR-16` | User Administration & Fraud Suspension | Administrator | `/admin/users` | [View Screen](docs/images/SCR-16-admin-user-management.png) |
| **17** | `SCR-17` | Escrow Custody Dashboard & Financial Analytics | Administrator | `/admin/dashboard` | [View Screen](docs/images/SCR-17-admin-financial-dashboard.png) |
| **18** | `SCR-18` | Real-Time In-App Messaging (WebSocket) | Common (Chat) | `/chat` | [View Screen](docs/images/SCR-18-in-app-chat.png) |

---

### 2.4 Core User Journeys

The platform UX revolves around three critical operational journeys:
1. **Tenant Journey:** Discover rooms via map & filters → Evaluate AI price gauge → Place 48h escrow deposit via VNPAY → Check-in or file dispute.
2. **Landlord Journey:** Register account → Complete KYC identity verification → Post room with real-time LightGBM AI pricing advice → Receive booking requests.
3. **Dispute & Refund Journey:** Tenant reports discrepancies within 48h → Moderator reviews photo evidence → System triggers automated VNPAY refund.

---

## 3. C4 Architecture

This README presents C1–C3. C4 Level 4 and detailed UML class and sequence diagrams are maintained in the architecture documentation directory.

### C1 — System Context

```mermaid
flowchart TB
    admin(["👤 Quản Trị Viên<br/><i>[Admin]</i><br/>Quản trị người dùng, cấu hình sàn,<br/>xem dashboard tài chính"])
    moderator(["👤 Kiểm Duyệt Viên<br/><i>[Moderator]</i><br/>Duyệt CCCD chủ trọ, duyệt tin phòng,<br/>phân xử khiếu nại cọc"])
    landlord(["👤 Chủ Nhà Trọ<br/><i>[Landlord]</i><br/>Xác minh KYC, đăng tin có AI định giá,<br/>quản lý phòng & nhận cọc"])
    tenant(["👤 Người Thuê Phòng<br/><i>[Tenant]</i><br/>Tìm phòng đa tiêu chí, nhận gợi ý AI,<br/>đặt cọc giữ chỗ 48h, viết review"])

    subgraph platformBoundary["Ranh Giới Hệ Thống Sản Phẩm (Software System Boundary)"]
        smartRental["🏠 SMART ROOM RENTAL PLATFORM<br/><i>[Hệ Thống Cho Thuê Phòng Trọ Thông Minh]</i><br/>Cung cấp nền tảng tìm kiếm phòng trọ sạch 100%,<br/>định giá phòng AI LightGBM, kiểm duyệt 2 lớp<br/>và ký quỹ giữ cọc an toàn qua cổng thanh toán."]
    end

    subgraph externalSystems["Hệ Thống Bên Thứ Ba (External Systems)"]
        vnpayGateway["💳 Cổng Thanh Toán VNPAY / MoMo<br/><i>[External Payment Gateway]</i><br/>Xử lý giao dịch nạp tiền ký quỹ,<br/>webhook IPN và kích hoạt hoàn cọc"]
        cloudStorage["☁️ Dịch Vụ Lưu Trữ Ảnh Cloudinary / S3<br/><i>[External Cloud Storage]</i><br/>Lưu trữ bảo mật ảnh CCCD KYC<br/>và album ảnh thực tế phòng trọ"]
        osmService["🗺️ Dịch Vụ Bản Đồ OpenStreetMap / Nominatim<br/><i>[External Geocoding & Map Tiles]</i><br/>Cung cấp dữ liệu tọa độ địa lý,<br/>bản đồ số và tính toán khoảng cách"]
    end

    %% Tương tác người dùng
    admin -- "Xem thống kê, quản lý tài khoản & phân quyền" --> smartRental
    moderator -- "Đối soát CCCD, duyệt tin & phân xử tranh chấp" --> smartRental
    landlord -- "Nộp KYC, đăng tin phòng & xác nhận nhận cọc" --> smartRental
    tenant -- "Tìm phòng, chat, đặt cọc giữ chỗ & viết review" --> smartRental

    %% Tích hợp bên ngoài
    smartRental -- "Tạo giao dịch cọc & kích hoạt hoàn tiền (REST/IPN)" --> vnpayGateway
    smartRental -- "Tải lên & phân phối ảnh phòng/CCCD (HTTPS API)" --> cloudStorage
    smartRental -- "Truy vấn tọa độ GPS & hiển thị bản đồ số" --> osmService

    classDef personStyle fill:#047857,stroke:#065f46,stroke-width:2px,color:#fff;
    classDef systemStyle fill:#1d4ed8,stroke:#1e40af,stroke-width:3px,color:#fff;
    classDef extStyle fill:#475569,stroke:#334155,stroke-width:2px,color:#fff;

    class admin,moderator,landlord,tenant personStyle;
    class smartRental systemStyle;
    class vnpayGateway,cloudStorage,osmService extStyle;
```

### C2 — Container

```mermaid
flowchart TB
    tenantUser(["👤 Người Thuê (Tenant)"])
    landlordUser(["👤 Chủ Trọ (Landlord)"])
    modUser(["👤 Kiểm Duyệt Viên / Admin"])

    subgraph platform["Smart Room Rental Platform [Hệ Thống Phần Mềm]"]
        direction TB

        subgraph frontend["Lớp Trình Duyệt / Giao Diện (Presentation Layer)"]
            spa["<b>Single-Page Application (SPA)</b><br/><i>[Container: React 19 + Vite]</i><br/>Giao diện người dùng responsive Airbnb-style,<br/>Leaflet Map, biểu đồ Chart.js, quản lý state"]
        end

        subgraph backendLayer["Lớp Ứng Dụng & Nghiệp Vụ (Application Services Layer)"]
            apiGateway["<b>Core Backend API</b><br/><i>[Container: Java 21 / Spring Boot 3]</i><br/>Xác thực JWT, RBAC 4 Roles, quản lý phòng,<br/>xử lý ký quỹ Escrow, WebSocket Chat,<br/>kiểm duyệt KYC, điều phối giao dịch"]
            
            aiService["<b>AI & Machine Learning Microservice</b><br/><i>[Container: Python 3.11 / FastAPI]</i><br/>Chạy mô hình LightGBM dự đoán giá,<br/>thuật toán gợi ý phòng cá nhân hóa,<br/>NLP Assistant Chatbot"]
        end

        subgraph dataLayer["Lớp Lưu Trữ Dữ Liệu (Data Layer)"]
            database[("<b>Primary Database</b><br/><i>[Container: PostgreSQL 16]</i><br/>Lưu trữ 13 bảng quan hệ: Users, Rooms,<br/>Escrow Bookings, Payments, Reviews,<br/>Messages, AuditLogs, PostGIS")]
        end
    end

    subgraph externalServices["Dịch Vụ Bên Ngoài (External Cloud & Services)"]
        vnpayExt["<b>Cổng Thanh Toán VNPAY</b><br/><i>[External System]</i><br/>Xử lý thanh toán cọc & hoàn tiền"]
        cloudExt["<b>Cloudinary Storage</b><br/><i>[External CDN/S3]</i><br/>Lưu trữ ảnh phòng & ảnh CCCD"]
    end

    %% Tương tác người dùng với SPA
    tenantUser & landlordUser & modUser -- "Truy cập ứng dụng qua trình duyệt<br/>[HTTPS]" --> spa

    %% SPA giao tiếp với Backend
    spa -- "Gọi API nghiệp vụ & xác thực<br/>[HTTPS / JSON REST API]" --> apiGateway
    spa -- "Chat thời gian thực Khách - Chủ<br/>[WSS / STOMP Protocol]" --> apiGateway

    %% Backend giao tiếp nội bộ
    apiGateway -- "Yêu cầu định giá phòng & gợi ý AI<br/>[HTTP / JSON REST API, latency < 200ms]" --> aiService
    apiGateway -- "Đọc/ghi dữ liệu quan hệ & vị trí<br/>[TCP / PostgreSQL Wire Protocol]" --> database

    %% Tích hợp bên ngoài
    apiGateway -- "Tạo URL cọc & gọi Refund API<br/>[HTTPS / REST API]" --> vnpayExt
    vnpayExt -- "Bắn Webhook IPN khi thanh toán thành công<br/>[HTTPS Webhook]" --> apiGateway
    apiGateway -- "Tải ảnh CCCD & ảnh phòng<br/>[HTTPS REST API]" --> cloudExt
    spa -- "Tải ảnh chất lượng cao từ CDN<br/>[HTTPS CDN]" --> cloudExt

    classDef userStyle fill:#047857,stroke:#065f46,color:#fff;
    classDef spaStyle fill:#0284c7,stroke:#0369a1,color:#fff;
    classDef apiStyle fill:#2563eb,stroke:#1d4ed8,color:#fff;
    classDef aiStyle fill:#7c3aed,stroke:#6d28d9,color:#fff;
    classDef dbStyle fill:#0f766e,stroke:#115e59,color:#fff;
    classDef extStyle fill:#475569,stroke:#334155,color:#fff;

    class tenantUser,landlordUser,modUser userStyle;
    class spa spaStyle;
    class apiGateway apiStyle;
    class aiService aiStyle;
    class database dbStyle;
    class vnpayExt,cloudExt extStyle;
```

### C3 — Component

```mermaid
flowchart TB
    subgraph backendContainer["Core Backend API [Container: Spring Boot 3]"]
        direction TB

        subgraph securityComp["1. Phân Hệ Bảo Mật & Xác Thực"]
            jwtFilter["<b>JwtAuthenticationFilter</b><br/>Bắt giữ request, giải mã JWT,<br/>thiết lập SecurityContext"]
            authService["<b>AuthenticationService</b><br/>Đăng nhập, đăng ký, cấp Access<br/>& Refresh Token qua BCrypt"]
        end

        subgraph businessComp["2. Phân Hệ Dịch Vụ Nghiệp Vụ (Services)"]
            roomService["<b>RoomManagementService</b><br/>Tạo/sửa tin phòng, kiểm tra trạng thái,<br/>xóa mềm, tích hợp dữ liệu AI"]
            kycService["<b>LandlordKycService</b><br/>Tiếp nhận ảnh CCCD, quản lý hàng đợi<br/>duyệt KYC của Moderator"]
            escrowService["<b>EscrowBookingService</b><br/>Quản lý luồng cọc 48h, khóa phòng,<br/>giải ngân cho chủ hoặc bồi hoàn"]
            disputeService["<b>DisputeResolutionService</b><br/>Tiếp nhận khiếu nại phòng sai mô tả,<br/>kích hoạt VNPAY Refund API"]
            chatService["<b>RealtimeChatService</b><br/>Điều phối tin nhắn WebSocket STOMP,<br/>lưu trữ lịch sử hội thoại"]
            reviewService["<b>VerifiedReviewService</b><br/>Kiểm tra điều kiện đã thuê thực tế,<br/>tính toán điểm sao trung bình"]
            analyticsService["<b>AnalyticsService</b><br/>Tổng hợp doanh thu cọc, tỷ lệ phòng trống,<br/>báo cáo vi phạm cho Admin"]
        end

        subgraph integrationComp["3. Phân Hệ Tích Hợp (Clients & Adapters)"]
            aiClient["<b>AiServiceWebClient</b><br/>Gọi REST API sang Python FastAPI<br/>để lấy giá LightGBM & gợi ý"]
            vnpayClient["<b>VnpayPaymentClient</b><br/>Tạo URL ký quỹ & gọi Refund API<br/>xác thực chữ ký HMAC SHA512"]
            storageClient["<b>CloudinaryStorageAdapter</b><br/>Tải ảnh CCCD & album phòng lên Cloud"]
        end

        subgraph dataComp["4. Phân Hệ Truy Cập Dữ Liệu (Repositories)"]
            userRepo["UserRepository"]
            roomRepo["RoomRepository"]
            escrowRepo["EscrowBookingRepository"]
            paymentRepo["PaymentRepository"]
            disputeRepo["DisputeRepository"]
            reviewRepo["ReviewRepository"]
            auditRepo["AuditLogRepository"]
        end
    end

    %% Luồng liên kết nội bộ
    jwtFilter --> authService
    authService --> userRepo

    roomService --> roomRepo
    roomService --> aiClient
    roomService --> storageClient

    kycService --> userRepo
    kycService --> storageClient

    escrowService --> escrowRepo
    escrowService --> roomRepo
    escrowService --> vnpayClient
    escrowService --> paymentRepo

    disputeService --> disputeRepo
    disputeService --> escrowService
    disputeService --> vnpayClient

    chatService --> userRepo
    reviewService --> reviewRepo
    analyticsService --> escrowRepo & roomRepo & auditRepo

    classDef secStyle fill:#dc2626,color:#fff;
    classDef srvStyle fill:#2563eb,color:#fff;
    classDef clientStyle fill:#7c3aed,color:#fff;
    classDef repoStyle fill:#0f766e,color:#fff;

    class jwtFilter,authService secStyle;
    class roomService,kycService,escrowService,disputeService,chatService,reviewService,analyticsService srvStyle;
    class aiClient,vnpayClient,storageClient clientStyle;
    class userRepo,roomRepo,escrowRepo,paymentRepo,disputeRepo,reviewRepo,auditRepo repoStyle;
```

Complete documentation: [C4 Architecture Handbook](docs/architecture/c4/README.md).

---

## 4. Database Diagrams and OpenAPI 3.0 Contract

Step 4 defines the persistence contract and the RESTful HTTP contract connecting the React frontend and AI microservice to the Spring Boot core.

### 4.1 Database diagrams

The target PostgreSQL 16 schema connects users, landlord KYC records, room listings, amenities, images, escrow bookings, payments, disputes, reviews, messages, and audit logs.

```mermaid
erDiagram
    USERS ||--o| LANDLORD_KYC : "xác minh danh tính (1:1)"
    USERS ||--o{ ROOMS : "sở hữu / đăng tin (1:N)"
    DISTRICTS ||--o{ ROOMS : "thuộc địa giới (1:N)"
    DISTRICTS ||--o{ UNIVERSITY_LANDMARKS : "chứa trường ĐH (1:N)"
    ROOMS ||--|| ROOM_AMENITIES : "tiện nghi chi tiết (1:1)"
    ROOMS ||--o{ ROOM_IMAGES : "album ảnh thực tế (1:N)"
    ROOMS ||--o{ ESCROW_BOOKINGS : "được đặt cọc giữ chỗ (1:N)"
    USERS ||--o{ ESCROW_BOOKINGS : "khách cọc / chủ nhận (1:N)"
    ESCROW_BOOKINGS ||--o{ PAYMENTS : "thanh toán cọc VNPAY (1:N)"
    ESCROW_BOOKINGS ||--o| DISPUTES : "khiếu nại hoàn cọc (1:1)"
    ESCROW_BOOKINGS ||--o| REVIEWS : "đánh giá sau khi thuê (1:1)"
    USERS ||--o{ MESSAGES : "gửi / nhận tin nhắn (1:N)"
    USERS ||--o{ AUDIT_LOGS : "thực hiện hành động (1:N)"

    USERS {
        bigint id PK
        varchar email UK
        varchar password_hash
        varchar full_name
        varchar phone_number
        user_role role
        kyc_status kyc_status
        boolean is_active
        timestamptz created_at
        timestamptz deleted_at
    }

    LANDLORD_KYC {
        bigint id PK
        bigint user_id FK,UK
        varchar id_card_number
        varchar id_card_front_url
        varchar id_card_back_url
        varchar ownership_doc_url
        text rejection_reason
        bigint reviewed_by FK
        timestamptz reviewed_at
    }

    DISTRICTS {
        int id PK
        varchar name
        varchar city
        decimal latitude
        decimal longitude
    }

    UNIVERSITY_LANDMARKS {
        int id PK
        varchar name
        int district_id FK
        decimal latitude
        decimal longitude
    }

    ROOMS {
        bigint id PK
        bigint landlord_id FK
        varchar title
        varchar address
        int district_id FK
        decimal latitude
        decimal longitude
        room_type room_type
        decimal area_sqm
        decimal monthly_rent
        decimal deposit_required
        decimal ai_predicted_price
        room_status status
        int view_count
        timestamptz deleted_at
    }

    ROOM_AMENITIES {
        bigint id PK
        bigint room_id FK,UK
        boolean has_air_conditioner
        boolean has_water_heater
        boolean has_washing_machine
        boolean has_refrigerator
        boolean has_balcony
        boolean has_elevator
        boolean has_mezzanine
        boolean has_parking
        boolean is_free_hours
        boolean allows_pets
        boolean is_furnished
    }

    ROOM_IMAGES {
        bigint id PK
        bigint room_id FK
        varchar image_url
        boolean is_primary
        smallint display_order
    }

    ESCROW_BOOKINGS {
        bigint id PK
        varchar booking_code UK
        bigint room_id FK
        bigint tenant_id FK
        bigint landlord_id FK
        decimal deposit_amount
        timestamptz escrow_holding_deadline
        timestamptz checkin_appointment_date
        booking_status status
    }

    PAYMENTS {
        bigint id PK
        bigint booking_id FK
        varchar transaction_ref UK
        varchar gateway
        payment_method payment_method
        decimal amount
        payment_status status
        timestamptz paid_at
    }

    DISPUTES {
        bigint id PK
        bigint booking_id FK,UK
        bigint complainant_id FK
        varchar reason
        text description
        text[] evidence_urls
        dispute_status status
        bigint resolved_by FK
    }

    REVIEWS {
        bigint id PK
        bigint booking_id FK,UK
        bigint room_id FK
        bigint tenant_id FK
        smallint overall_rating
        smallint rating_security
        smallint rating_cleanliness
        smallint rating_utilities
        smallint rating_landlord
        text comment
    }

    MESSAGES {
        bigint id PK
        bigint sender_id FK
        bigint receiver_id FK
        bigint room_id FK
        text content
        boolean is_read
        timestamptz created_at
    }

    AUDIT_LOGS {
        bigint id PK
        bigint user_id FK
        varchar action
        varchar entity_type
        bigint entity_id
        jsonb old_values
        jsonb new_values
        timestamptz created_at
    }
```

See the [data model documentation](docs/05-data-model.md), [DBML 2.0 schema](src/database/schema.dbml), and [PostgreSQL schema](src/database/schema.sql).

### 4.2 OpenAPI 3.0 API documentation

The HTTP contract is defined with OpenAPI 3.0.4 and organized into Authentication, Landlord KYC, Rooms, AI Valuation & Recommendations, Escrow Bookings, Payments, Disputes, Realtime Chat, Verified Reviews, Admin Users, and Analytics.

```text
22 paths
42 operations
Bearer JWT security
Role metadata and RBAC enforcement (ADMIN, MODERATOR, LANDLORD, TENANT)
JSON and multipart request contracts (CCCD images, room album)
Reusable request/response schemas (45 schemas)
RFC 7807-compatible application/problem+json errors
Request, success, and error examples
```

Every operation has a stable `operationId`, documented parameters, request and response schemas, success/error status codes, and target authorization rules. The contract serves as the design source of truth.

- [OpenAPI 3.0.4 specification](docs/api/openapi.yaml)
- [API documentation and sample calls](docs/api/README.md)

---

## 5. Frontend and Backend Folder Structures

### 5.1 Current repository layout

```text
Room-rental-platform/
├── src/
│   ├── frontend/                     # React 19 + Vite frontend prototype
│   │   ├── src/
│   │   │   ├── api/                  # Axios HTTP client & OpenAPI adapters
│   │   │   ├── components/           # Shared UI components (Navbar, MapView, Cards, Modals)
│   │   │   ├── context/              # AuthContext, NotificationContext
│   │   │   ├── hooks/                # Custom React hooks (useAuth, useRooms, useEscrow, useChat)
│   │   │   ├── pages/                # Screen views (Home, Rooms, Detail, Booking, Portals)
│   │   │   ├── routes/               # React Router v6 route configuration
│   │   │   └── styles/               # CSS design tokens, responsive utilities
│   │   ├── public/                   # Static assets, icons, sample images
│   │   └── package.json              # Frontend scripts and dependencies
│   ├── backend/                      # Java 21 / Spring Boot 3 core backend
│   │   ├── src/main/java/com/smartrental/
│   │   │   ├── config/               # Security, CORS, WebSocket, Swagger, WebClient configs
│   │   │   ├── controller/           # REST API Controllers (Auth, Room, Escrow, KYC, etc.)
│   │   │   ├── dto/                  # Request/Response DTOs and projections
│   │   │   ├── model/                # JPA Entities (User, Room, EscrowBooking, Payment, etc.)
│   │   │   ├── repository/           # Spring Data JPA Repositories
│   │   │   ├── security/             # JwtFilter, UserDetailsService, RBAC voters
│   │   │   ├── service/              # Business service interfaces and implementations
│   │   │   └── exception/            # GlobalExceptionHandler and custom business exceptions
│   │   ├── src/main/resources/       # application.yml and db migration scripts
│   │   └── pom.xml                   # Maven dependencies and build configuration
│   ├── ai-service/                   # Python 3.11 / FastAPI AI & Machine Learning microservice
│   │   ├── app/
│   │   │   ├── api/                  # FastAPI routers (/predict-price, /recommendations, /chatbot)
│   │   │   ├── core/                 # App config, logging, and startup event handlers
│   │   │   ├── schemas/              # Pydantic validation schemas
│   │   │   └── services/             # LightGBM inference, recommender engine, NLP assistant
│   │   ├── training/                 # Model training scripts, feature engineering, notebooks
│   │   ├── artifacts/                # Serialized trained models (.pkl, .joblib)
│   │   └── requirements.txt          # Python dependencies (fastapi, lightgbm, scikit-learn, etc.)
│   └── database/
│       ├── schema.dbml               # DBML 2.0 database relationship model
│       └── schema.sql                # PostgreSQL 16 DDL, indexes, constraints, and seed data
├── docs/
│   ├── api/                          # OpenAPI 3.0.4 contract and API guide
│   ├── architecture/c4/              # C4 System Context, Container, Component, and Code models
│   ├── images/                       # Product mind map
│   └── 01-scope.md … 08-invest-requirements.md
├── compose.yaml                      # Docker Compose for PostgreSQL 16
└── README.md
```

### 5.2 Target React feature structure

```text
src/frontend/src/
├── app/                 # Routes, providers, and application shell
├── components/          # Shared layout, forms, map view, feedback, and data cards
├── features/
│   ├── auth/            # Login, register, profile, and KYC submission
│   ├── rooms/           # Search, multi-criteria filters, map pins, and room cards
│   ├── landlord/        # Room listing form, real-time AI valuation widget, inventory
│   ├── moderation/      # KYC review queue, listing inspection queue, dispute desk
│   ├── escrow/          # 48h deposit checkout, countdown timer, check-in confirmation
│   ├── disputes/        # Dispute ticket creation, evidence upload, arbitration
│   ├── chat/            # Real-time WebSocket messaging drawer, conversation list
│   ├── reviews/         # 4-criteria verified review form, review display list
│   └── admin/           # User management table, platform revenue analytics dashboard
├── services/            # Axios API client, WebSocket STOMP client, media uploader
├── hooks/               # Custom hooks (useAuth, useRooms, useEscrow, useChat)
├── styles/              # Design tokens, variables, and responsive layout styles
└── test/                # Test utilities, mock handlers, and component tests
```

Target dependency flow:
```text
Page/Component → Feature Hook → Feature Service → apiClient → Spring Boot REST API
```

### 5.3 Target Spring Boot backend structure

```text
src/backend/src/main/java/com/smartrental/
├── config/              # SecurityConfig, CorsConfig, WebSocketConfig, WebClientConfig
├── controller/          # REST Controllers mapping HTTP requests to Service calls
├── dto/                 # Request/Response payloads mapped 1:1 with OpenAPI schemas
├── model/               # JPA Entities mapped to PostgreSQL tables
├── repository/          # Spring Data JPA interfaces
├── security/            # JwtAuthenticationFilter, UserPrincipal, SecurityUtils
├── service/             # Domain logic, transaction management, and AI client orchestration
└── exception/           # GlobalExceptionHandler (RFC 7807 problem details)
```

Dependency rules:
```text
Controller → Service
Service → Repository & External Clients (WebClient / VNPAY)
Repository → JPA Entity / Database
Entities / DTOs → No dependency on Controller or Service
```

The complete module architecture and package breakdown are maintained in [Target Folder Structure](docs/07-folder-structure.md).

---

## 6. Detailed Class and Sequence Design

Detailed design derives from the C4 components in Step 3, the database and OpenAPI contracts in Step 4, and the target folder ownership in Step 5.

### 6.1 C4 Level 4 — Code collaboration

#### L4.1 Room & Valuation Management

```mermaid
flowchart TB
    subgraph roomModule["Room & Moderation Management [Component]"]
        direction TB
        handler["RoomManagementController<br/><i>[Spring Boot Controller]</i><br/>Receives requests, validates DTOs,<br/>and maps HTTP responses"]
        service["RoomManagementService<br/><i>[Java Service Class]</i><br/>Coordinates room creation, updates,<br/>AI price evaluation, and soft delete"]
        validator["ListingAuditValidator<br/><i>[Java Class]</i><br/>Verifies amenities, coordinates,<br/>and flags excessive price deviations"]
        aiClient["AiPredictionClient<br/><i>[WebClient Adapter]</i><br/>Invokes Python FastAPI microservice<br/>for LightGBM price predictions"]
        entity["Room<br/><i>[JPA Domain Entity]</i><br/>Encapsulates listing state,<br/>amenities, and business rules"]
        repository["RoomRepository<br/><i>[Spring Data JPA]</i><br/>save, findById, findByDistrict,<br/>searchWithFilters"]
    end

    apiGateway["Core Backend API<br/><i>[Container]</i>"]
    aiMicroservice["AI Service (FastAPI)<br/><i>[Container: LightGBM]</i>"]
    database[("PostgreSQL 16<br/><i>[Container: Database]</i>")]

    apiGateway --> handler
    handler --> service
    service --> validator
    service --> aiClient
    service --> entity
    service --> repository
    aiClient -- "REST / HTTP (latency < 200ms)" --> aiMicroservice
    repository -- "JDBC / SQL Protocol" --> database

    style handler fill:#1168bd,color:#fff
    style service fill:#0b4f9e,color:#fff
    style validator fill:#1168bd,color:#fff
    style aiClient fill:#7c3aed,color:#fff
    style entity fill:#1168bd,color:#fff
    style repository fill:#1168bd,color:#fff
    style aiMicroservice fill:#7c3aed,color:#fff
    style database fill:#0f766e,color:#fff
```

#### L4.2 Escrow Booking & Payment

```mermaid
flowchart TB
    subgraph escrowModule["Escrow Booking & Payment [Component]"]
        direction TB
        handler["EscrowBookingController<br/><i>[Spring Boot Controller]</i><br/>Receives deposit requests,<br/>IPN callbacks, and check-in confirms"]
        service["EscrowBookingService<br/><i>[Java Service Class]</i><br/>Coordinates 48h holding timer,<br/>state transitions, and release/refund"]
        stateMachine["EscrowStateMachine<br/><i>[Java Domain Policy]</i><br/>Enforces valid status transitions<br/>and lock-out constraints"]
        paymentClient["VnpayPaymentClient<br/><i>[Integration Adapter]</i><br/>Generates signed payment URLs<br/>and calls VNPAY Refund API"]
        disputeService["DisputeResolutionService<br/><i>[Java Service Class]</i><br/>Manages dispute tickets,<br/>evidence review, and moderator arbitration"]
        repository["EscrowBookingRepository<br/><i>[Spring Data JPA]</i><br/>findByBookingCode, save, findByTenantId"]
    end

    apiGateway["Core Backend API<br/><i>[Container]</i>"]
    vnpayExt["VNPAY Payment Gateway<br/><i>[External Gateway]</i>"]
    database[("PostgreSQL 16<br/><i>[Container: Database]</i>")]

    apiGateway --> handler
    handler --> service
    service --> stateMachine
    service --> paymentClient
    service --> repository
    service --> disputeService
    paymentClient -- "HTTPS / SHA512 HMAC" --> vnpayExt
    repository -- "JDBC / SQL Protocol" --> database

    style handler fill:#1168bd,color:#fff
    style service fill:#0b4f9e,color:#fff
    style stateMachine fill:#1168bd,color:#fff
    style paymentClient fill:#7c3aed,color:#fff
    style disputeService fill:#1168bd,color:#fff
    style repository fill:#1168bd,color:#fff
    style vnpayExt fill:#475569,color:#fff
    style database fill:#0f766e,color:#fff
```

### 6.2 Core class diagrams

#### 1. Authentication & Security

```mermaid
classDiagram
    direction TB

    class AuthController {
        +login(LoginRequest req) ResponseEntity~AuthResponse~
        +register(RegisterRequest req) ResponseEntity~UserResponse~
        +refreshToken(TokenRefreshRequest req) ResponseEntity~TokenResponse~
        +getCurrentUser(Authentication auth) ResponseEntity~UserResponse~
    }

    class LoginRequest {
        +String email
        +String password
    }

    class AuthResponse {
        +String accessToken
        +String refreshToken
        +String tokenType
        +long expiresIn
        +UserResponse user
    }

    class UserResponse {
        +Long id
        +String email
        +String fullName
        +String phoneNumber
        +UserRole role
        +KycStatus kycStatus
        +boolean isActive
        +Instant createdAt
    }

    class IAuthenticationService {
        <<interface>>
        +authenticate(LoginRequest req) AuthResponse
        +register(RegisterRequest req) UserResponse
        +refreshToken(String token) TokenResponse
    }

    class AuthenticationService {
        -UserRepository userRepo
        -PasswordEncoder passwordEncoder
        -JwtTokenProvider tokenProvider
        +authenticate(LoginRequest req) AuthResponse
        +register(RegisterRequest req) UserResponse
        +refreshToken(String token) TokenResponse
    }

    class JwtTokenProvider {
        +generateAccessToken(User user) String
        +generateRefreshToken(User user) String
        +validateToken(String token) boolean
        +getEmailFromToken(String token) String
        +getRoleFromToken(String token) UserRole
    }

    class JwtAuthenticationFilter {
        -JwtTokenProvider tokenProvider
        -UserDetailsService userDetailsService
        +doFilterInternal(HttpServletRequest, HttpServletResponse, FilterChain) void
    }

    class User {
        +Long id
        +String email
        +String passwordHash
        +String fullName
        +String phoneNumber
        +UserRole role
        +KycStatus kycStatus
        +boolean isActive
        +Instant createdAt
        +Instant deletedAt
    }

    class IUserRepository {
        <<interface>>
        +findByEmail(String email) Optional~User~
        +existsByEmail(String email) boolean
        +save(User user) User
    }

    AuthController --> LoginRequest
    AuthController --> AuthResponse
    AuthController --> IAuthenticationService
    AuthenticationService ..|> IAuthenticationService
    AuthenticationService --> IUserRepository
    AuthenticationService --> JwtTokenProvider
    AuthenticationService --> User
    JwtAuthenticationFilter --> JwtTokenProvider
```

#### 2. Room & Valuation Management

```mermaid
classDiagram
    class RoomManagementController {
        -RoomService roomService
        -AiPredictionClient aiClient
        +createRoom(CreateRoomRequest req) ResponseEntity~RoomDto~
        +previewAiPrice(PricePredictionRequest req) ResponseEntity~PricePredictionDto~
    }

    class RoomService {
        -RoomRepository roomRepo
        -RoomAmenitiesRepository amenitiesRepo
        -AiPredictionClient aiClient
        +createRoomWithAiAudit(RoomDto dto, Long landlordId) Room
        +evaluatePriceDiscrepancy(BigDecimal userPrice, BigDecimal aiPrice) DiscrepancyFlag
    }

    class AiPredictionClient {
        -WebClient webClient
        -String aiServiceBaseUrl
        +predictRoomPrice(FeatureVectorDto features) PricePredictionDto
        +getPersonalizedRecommendations(Long tenantId) List~RoomDto~
    }

    class LightGbmPricePredictor {
        <<Python Class in FastAPI>>
        -LGBMRegressor model
        -Pipeline preprocessor
        +load_model(String model_path)
        +predict(Dict features) Dict
        +calculate_confidence_interval(float prediction) Tuple
    }

    class ListingAuditValidator {
        +validateDiscrepancy(BigDecimal inputRent, BigDecimal aiBenchmark) boolean
        +FLAG_NORMAL
        +FLAG_HIGH_PRICE (Vượt quá 35% giá thị trường)
    }

    RoomManagementController --> RoomService
    RoomService --> AiPredictionClient
    RoomService --> ListingAuditValidator
    AiPredictionClient ..> LightGbmPricePredictor: HTTP REST Request
```

#### 3. Escrow Booking & Dispute Resolution

```mermaid
classDiagram
    class EscrowBookingController {
        -EscrowBookingService bookingService
        -VnpayPaymentService paymentService
        +createBooking(CreateBookingRequest request) ResponseEntity~BookingDto~
        +getBooking(Long id) ResponseEntity~BookingDto~
        +confirmCheckin(Long id) ResponseEntity~BookingDto~
    }

    class EscrowBookingService {
        -EscrowBookingRepository bookingRepo
        -RoomRepository roomRepo
        -PaymentRepository paymentRepo
        -VnpayPaymentService vnpayService
        +initiateEscrowDeposit(Long tenantId, Long roomId, BigDecimal amount) EscrowBooking
        +processVnpayIpn(Map~String, String~ vnpayParams) boolean
        +releaseDepositToLandlord(Long bookingId, Long userId) EscrowBooking
        +refundDepositToTenant(Long bookingId, String reason) EscrowBooking
    }

    class EscrowStateMachine {
        <<enumeration>>
        PENDING_PAYMENT
        ESCROW_HOLDING
        COMPLETED
        DISPUTED
        REFUNDED
        CANCELLED
        +canTransition(BookingStatus from, BookingStatus to) boolean
    }

    class DisputeResolutionService {
        -DisputeRepository disputeRepo
        -EscrowBookingService bookingService
        +openDispute(Long bookingId, Long complainantId, String reason, List~String~ proofUrls) Dispute
        +adjudicateDispute(Long disputeId, Long moderatorId, DisputeStatus decision, String notes) Dispute
    }

    class EscrowBooking {
        -Long id
        -String bookingCode
        -Long roomId
        -Long tenantId
        -Long landlordId
        -BigDecimal depositAmount
        -Instant escrowHoldingDeadline
        -BookingStatus status
        +isExpired() boolean
        +transitionTo(BookingStatus newStatus)
    }

    EscrowBookingController --> EscrowBookingService
    EscrowBookingService --> EscrowStateMachine
    EscrowBookingService --> EscrowBooking
    DisputeResolutionService --> EscrowBookingService
```

Source: [C4 Level 4 — Code](docs/architecture/c4/04-code.md).

### 6.3 Sequence diagrams

Runtime sequences cover authentication, room listing with real-time AI price valuation, 48-hour escrow deposit holding, dispute adjudication, and WebSocket messaging.

#### Escrow Booking State Machine

```mermaid
stateDiagram-v2
    [*] --> PENDING_PAYMENT: Khách bấm "Đặt cọc giữ chỗ 48h"
    PENDING_PAYMENT --> ESCROW_HOLDING: VNPAY Webhook IPN báo nạp tiền thành công (Phòng -> RESERVED)
    PENDING_PAYMENT --> CANCELLED: Quá 15 phút không thanh toán
    
    ESCROW_HOLDING --> COMPLETED: Khách đến nhận phòng & ký hợp đồng (Giải ngân cho Chủ trọ -> Phòng RENTED)
    ESCROW_HOLDING --> DISPUTED: Khách gửi khiếu nại trong 24h (Phòng sai ảnh/ẩm mốc)
    ESCROW_HOLDING --> CANCELLED: Khách tự ý hủy hẹn (Bồi hoàn cọc cho Chủ trọ)

    DISPUTED --> REFUNDED: Moderator duyệt khiếu nại (Hoàn cọc 100% cho Khách qua VNPAY)
    DISPUTED --> COMPLETED: Moderator bác khiếu nại (Giải ngân cho Chủ trọ)

    COMPLETED --> [*]
    REFUNDED --> [*]
    CANCELLED --> [*]
```

#### Real-time AI Room Valuation Flow

```mermaid
sequenceDiagram
    autonumber
    actor Landlord as Chủ Trọ (Landlord)
    participant UI as React 19 Frontend
    participant Backend as Spring Boot (RoomService)
    participant AI as Python FastAPI (LightGBM)
    participant DB as PostgreSQL 16

    Landlord->>UI: Nhập thông tin: 25m2, Cầu Giấy, Điều hòa, Nóng lạnh
    Landlord->>UI: Nhấn nút "Tham khảo giá gợi ý AI"
    UI->>Backend: POST /api/v1/ai/predict-price
    Backend->>AI: Gửi vector đặc trưng phòng
    Note over AI: LightGBM suy luận giá dựa trên dữ liệu thị trường
    AI-->>Backend: Trả về: { predicted: 3.2M, min: 3.0M, max: 3.4M }
    Backend-->>UI: Hiển thị thanh đo giá gợi ý
    Landlord->>UI: Đặt giá niêm yết 3.3M và bấm "Gửi duyệt tin"
    UI->>Backend: POST /api/v1/landlord/rooms
    Backend->>Backend: So sánh: 3.3M so với 3.2M (Chênh 3.1% <= 35% -> Hợp lệ)
    Backend->>DB: Lưu phòng ở trạng thái PENDING_APPROVAL
    Backend-->>UI: Báo thành công, phòng chuyển sang hàng đợi duyệt tin
```

Source: [C4 Level 4 — Code](docs/architecture/c4/04-code.md) and [Information Architecture](docs/04-information-architecture.md).

---

## Documentation

- Requirements: [Scope & Problem Statement](docs/01-scope.md), [Feature Catalog](docs/02-features.md), [INVEST Backlog](docs/08-invest-requirements.md), [Acceptance Criteria](docs/06-acceptance-criteria.md).
- Actors & Use Cases: [Actors, Roles, and Use Cases](docs/03-use-cases.md).
- UI/UX & Information Architecture: [Information Architecture & Visual Sitemap](docs/04-information-architecture.md).
- Architecture: [C4 Architecture Handbook](docs/architecture/c4/README.md) ([System Context](docs/architecture/c4/01-system-context.md), [Container](docs/architecture/c4/02-container.md), [Component](docs/architecture/c4/03-component.md), [Code](docs/architecture/c4/04-code.md)).
- Database: [Data Model Documentation](docs/05-data-model.md), [DBML 2.0 Schema](src/database/schema.dbml), [PostgreSQL 16 Schema](src/database/schema.sql).
- API Contract: [OpenAPI 3.0.4 Specification](docs/api/openapi.yaml) and [API Integration Guide](docs/api/README.md).
- Folder Structure: [Polyglot Monorepo Structure](docs/07-folder-structure.md).

---

## Project Progress

- [x] Define scope, market pain points, and user roles (`docs/01-scope.md`)
- [x] Create the top-down product mind map (`docs/images/mindmap.png`)
- [x] Write the feature catalog and role-feature matrix (`docs/02-features.md`)
- [x] Write user stories following INVEST with 100% PASS rate (`docs/08-invest-requirements.md`)
- [x] Write acceptance criteria in Gherkin format for all 17 use cases (`docs/06-acceptance-criteria.md`)
- [x] Design use case diagrams and detailed specifications (`docs/03-use-cases.md`)
- [x] Design information architecture, 18-screen card-based visual sitemap, and core user journeys (`docs/04-information-architecture.md`)
- [x] Design C4 System Context diagram (`docs/architecture/c4/01-system-context.md`)
- [x] Design C4 Container diagram (`docs/architecture/c4/02-container.md`)
- [x] Design C4 Component diagram (`docs/architecture/c4/03-component.md`)
- [x] Design C4 Level 4 code collaboration, class diagrams, and state machines (`docs/architecture/c4/04-code.md`)
- [x] Design PostgreSQL 16 relational schema, DBML 2.0 model, constraints, and indexes (`docs/05-data-model.md`, `src/database/`)
- [x] Write the OpenAPI 3.0.4 specification covering 22 paths and 42 operations (`docs/api/openapi.yaml`, `docs/api/README.md`)
- [x] Design and scaffold the Polyglot Monorepo structure (React 19, Spring Boot 3, FastAPI, PostgreSQL) (`docs/07-folder-structure.md`, `src/`)
- [ ] Implement LightGBM machine learning price prediction model and training pipeline (`src/ai-service/`)
- [ ] Implement Core Backend Spring Boot 3 REST APIs, Security, and WebSocket STOMP (`src/backend/`)
- [ ] Implement React 19 frontend UI components, interactive map, and escrow checkout (`src/frontend/`)
- [ ] Connect VNPAY payment gateway sandbox for escrow deposit testing
- [ ] End-to-end integration testing and Docker Compose deployment
