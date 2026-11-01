# Kiến Trúc Thông Tin Toàn Diện (Information Architecture & Visual Sitemap)

> **Dự án:** Sàn Cho Thuê Phòng Trọ Thông Minh (Smart Rental Platform)  
> **Trạng thái thiết kế:** TARGET V1 BASELINE  
> **Mục tiêu:** Định nghĩa chi tiết toàn bộ các màn hình giao diện (Screens), cấu trúc từng phân vùng (Sections/Blocks), chức năng thành phần và luồng điều hướng của 4 nhóm vai trò người dùng (Admin, Moderator, Landlord, Tenant).

---

## 1. Sơ Đồ Cây Kiến Trúc Thông Tin Tổng Thể (Visual Sitemap Diagram)

Sơ đồ trực quan hóa toàn bộ 18 màn hình của hệ thống. Mỗi màn hình được thiết kế theo chuẩn **Card-based Sitemap** (tương tự Relume Sitemap), liệt kê rõ ràng các **Sections, Khối thành phần và Chức năng chi tiết** bên trong màn hình:

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

---

## 2. Danh Mục & Đặc Tả Chi Tiết 18 Màn Hình (Screen Inventory)

| Mã Màn | Tên Màn Hình | Đường Dẫn (Route) | Phân Quyền (Roles) | Nhóm Mục Tiêu & Chức Năng Cốt Lõi |
| :---: | :--- | :--- | :--- | :--- |
| **SCR-01** | Trang Chủ & Tìm Kiếm | `/` | Tất cả (Public) | Thanh tìm kiếm theo trường ĐH, Feed gợi ý AI theo lịch sử xem, cụm quận huyện nổi bật. |
| **SCR-02** | Danh Sách Phòng & Bản Đồ | `/rooms` | Tất cả (Public) | Bộ lọc đa tiêu chí (giá, diện tích, tiện nghi), bản đồ số tương tác ghim cụm phòng, sắp xếp kết quả. |
| **SCR-03** | Chi Tiết Phòng Trọ | `/rooms/:id` | Tất cả (Public) | Album ảnh thực tế, bảng kê chi phí điện nước, **Widget đo giá AI LightGBM**, thông tin chủ trọ KYC, nút cọc. |
| **SCR-04** | Đặt Cọc Ký Quỹ Escrow | `/rooms/:id/booking` | TENANT | Hẹn lịch xem phòng 48h, chọn cổng VNPAY/MoMo, điều khoản ký quỹ bảo vệ tiền cọc 100%. |
| **SCR-05** | Khiếu Nại & Hoàn Cọc | `/bookings/:id/dispute` | TENANT | Gửi khiếu nại trong 24h kèm ảnh/video phòng ẩm mốc/thiếu đồ để Moderator hoàn tiền 100%. |
| **SCR-06** | Đánh Giá Sau Lưu Trú | `/bookings/:id/review` | TENANT (Đã thuê) | Đánh giá 4 tiêu chí (An ninh, Vệ sinh, Điện nước, Chủ trọ), huy hiệu xác minh thuê thật. |
| **SCR-07** | Đăng Nhập & Đăng Ký | `/auth/login`, `/auth/register` | Public | Đăng nhập/đăng ký qua JWT Bearer, chọn vai trò Tenant hoặc Landlord, mã hóa BCrypt. |
| **SCR-08** | Hồ Sơ Cá Nhân | `/profile` | Tất cả (Đã login) | Cập nhật thông tin cá nhân, đổi mật khẩu, xem danh sách đơn cọc và phòng đã lưu. |
| **SCR-09** | Xác Minh KYC Chủ Trọ | `/landlord/kyc` | LANDLORD | Tải ảnh 2 mặt CCCD + Giấy chứng nhận quyền sở hữu trọ để mở quyền đăng tin. |
| **SCR-10** | Quản Lý Danh Sách Phòng | `/landlord/rooms` | LANDLORD | Thống kê phòng trống/đang cọc/đang thuê, quản lý danh sách phòng, đổi trạng thái nhanh. |
| **SCR-11** | Tạo & Sửa Tin Đăng Phòng | `/landlord/rooms/new` | LANDLORD (Đã KYC) | Nhập thông số phòng, tải ảnh thực tế, **công cụ AI LightGBM gợi ý giá thị trường & cảnh báo lệch giá**. |
| **SCR-12** | Quản Lý Đơn Cọc Giữ Phòng | `/landlord/bookings` | LANDLORD | Xem danh sách khách cọc, đếm ngược 48h, nút xác nhận khách nhận phòng để giải ngân cọc. |
| **SCR-13** | Hàng Đợi Duyệt KYC Chủ Trọ | `/mod/kyc` | MODERATOR, ADMIN | Đối soát ảnh 2 mặt CCCD của chủ nhà, phê duyệt cấp quyền đăng tin hoặc từ chối kèm lý do. |
| **SCR-14** | Hàng Đợi Duyệt Tin Phòng | `/mod/rooms` | MODERATOR, ADMIN | Kiểm tra ảnh thực tế chống ảnh mạng, kiểm tra tọa độ GPS, cờ cảnh báo giá chênh lệch AI > 35%. |
| **SCR-15** | Phân Xử Khiếu Nại Cọc | `/mod/disputes` | MODERATOR, ADMIN | Đối chiếu ảnh hiện trường khách tải lên vs ảnh tin đăng lúc duyệt, quyết định hoàn tiền hoặc giải ngân. |
| **SCR-16** | Quản Trị Tài Khoản & Vi Phạm | `/admin/users` | ADMIN | Tìm kiếm người dùng, phân quyền Moderator, khóa tài khoản vi phạm lừa đảo cọc. |
| **SCR-17** | Dashboard Thống Kê Sàn | `/admin/dashboard` | ADMIN | Tổng doanh thu hoa hồng sàn, tổng tiền cọc đang lưu ký, biểu đồ tỷ lệ duyệt/từ chối tin. |
| **SCR-18** | Cửa Sổ Chat Trực Tiếp | `/chat` | TENANT, LANDLORD | Nhắn tin thời gian thực qua WebSocket STOMP, đính kèm ảnh hiện trạng và định vị hẹn gặp. |

---

## 3. Luồng Điều Hướng Trọng Tâm Của 3 Kịch Bản Nghiệp Vụ Cốt Lõi

### Luồng 1: Người Thuê Tìm Phòng & Đặt Cọc Ký Quỹ An Toàn (Tenant Journey)
```mermaid
sequenceDiagram
    autonumber
    actor Tenant as Khách Thuê (Tenant)
    participant SCR01 as SCR-01 Trang Chủ
    participant SCR02 as SCR-02 Bản Đồ Số
    participant SCR03 as SCR-03 Chi Tiết Phòng
    participant SCR04 as SCR-04 Đặt Cọc Escrow
    participant VNPAY as Cổng Thanh Toán VNPAY
    participant Backend as Core Backend & DB

    Tenant->>SCR01: Tìm phòng quanh ĐH Bách Khoa, giá 2-4tr
    SCR01->>SCR02: Chuyển hướng sang trang kết quả bản đồ số
    Tenant->>SCR02: Xem ghim phòng, chọn phòng có badge "Giá tốt theo AI"
    SCR02->>SCR03: Mở trang chi tiết phòng
    Note over SCR03: Khách xem ảnh thực tế, bảng kê điện nước & Widget đo giá AI
    Tenant->>SCR03: Nhấn nút "Đặt cọc giữ chỗ 48h (500k)"
    SCR03->>SCR04: Mở form xác nhận lịch hẹn và điều khoản ký quỹ
    Tenant->>SCR04: Nhấn "Thanh toán cọc qua VNPAY"
    SCR04->>VNPAY: Chuyển hướng quét mã VNPAY-QR
    Tenant->>VNPAY: Xác nhận chuyển tiền cọc 500k
    VNPAY->>Backend: Webhook IPN báo cọc thành công
    Backend->>Backend: Khóa phòng sang trạng thái RESERVED & Giữ tiền Ký quỹ
    Backend-->>SCR04: Hiển thị thông báo "Đặt cọc giữ chỗ 48h thành công!"
```

### Luồng 2: Chủ Trọ Đăng Ký, Xác Minh KYC & Đăng Tin Có AI Định Giá (Landlord Journey)
```mermaid
sequenceDiagram
    autonumber
    actor Landlord as Chủ Trọ (Landlord)
    participant SCR07 as SCR-07 Đăng Ký
    participant SCR09 as SCR-09 Nộp KYC
    participant ModQueue as SCR-13 Hàng Đợi KYC (Mod)
    participant SCR11 as SCR-11 Đăng Tin Phòng
    participant AI as Python FastAPI (LightGBM)

    Landlord->>SCR07: Đăng ký tài khoản vai trò Landlord
    Landlord->>SCR09: Tải ảnh 2 mặt CCCD & Giấy tờ sở hữu trọ
    SCR09->>ModQueue: Đưa hồ sơ vào hàng đợi kiểm duyệt
    Note over ModQueue: Moderator đối soát CCCD hợp lệ và bấm "Phê duyệt"
    ModQueue-->>Landlord: Tài khoản được nâng cấp VERIFIED_LANDLORD
    Landlord->>SCR11: Tạo tin phòng mới: 25m2, Cầu Giấy, có Điều hòa + Nóng lạnh
    Landlord->>SCR11: Bấm nút "Tham khảo giá gợi ý AI"
    SCR11->>AI: Gửi vector đặc trưng phòng
    AI-->>SCR11: Trả về giá gợi ý 3.2M [Khoảng 3.0M - 3.4M]
    Landlord->>SCR11: Đặt giá niêm yết 3.2M và bấm "Gửi duyệt tin"
```

### Luồng 3: Xử Lý Khiếu Nại & Hoàn Cọc Tự Động (Dispute & Refund Journey)
```mermaid
sequenceDiagram
    autonumber
    actor Tenant as Khách Thuê (Tenant)
    participant SCR05 as SCR-05 Khiếu Nại Cọc
    participant SCR15 as SCR-15 Phân Xử (Moderator)
    participant Backend as Backend & VNPAY Refund API
    actor Landlord as Chủ Trọ (Landlord)

    Tenant->>SCR05: Đến xem thấy phòng ẩm mốc, thiếu điều hòa -> Gửi khiếu nại kèm video
    SCR05->>SCR15: Chuyển hồ sơ vào hàng đợi phân xử của Moderator
    Note over SCR15: Moderator mở xem video hiện trường đối chiếu với ảnh tin đăng
    Moderator->>SCR15: Bấm phán quyết "Chấp thuận khiếu nại - Hoàn cọc 100%"
    SCR15->>Backend: Kích hoạt lệnh hoàn tiền tự động
    Backend->>Backend: Chuyển trạng thái đơn cọc sang REFUNDED
    Backend-->>Tenant: Hoàn trả 500,000đ về tài khoản ngân hàng của Khách
    Backend-->>Landlord: Gửi cảnh báo vi phạm chất lượng phòng trọ
```
