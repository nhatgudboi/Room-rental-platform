# C1 — Ngữ Cảnh Hệ Thống (System Context)

> **Mục đích:** Thể hiện bức tranh toàn cảnh cấp cao nhất: Ai sử dụng Smart Room Rental Platform, trách nhiệm chính của hệ thống là gì và hệ thống tích hợp với các bên thứ ba nào.

---

## 1. Sơ Đồ Ngữ Cảnh C1 (Mermaid Context Diagram)

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

---

## 2. Ranh Giới Hệ Thống & Trách Nhiệm (System Boundary & Responsibilities)

### Trong phạm vi hệ thống (In-Scope Responsibilities):
* Quản lý vòng đời tài khoản và phân quyền 4 vai trò qua Spring Security & JWT Bearer.
* Xác minh 2 lớp: Quy trình KYC chủ trọ qua ảnh CCCD và hàng đợi kiểm duyệt tin đăng phòng.
* Tích hợp Trí tuệ Nhân tạo: Mô hình học máy LightGBM dự đoán giá thị trường, Recommender Engine cá nhân hóa theo lịch sử tương tác, và Chatbot tư vấn 24/7.
* Cơ chế Ký quỹ Escrow: Tạm giữ tiền cọc 48 giờ, tự động khóa phòng khi có người cọc, giải ngân cho chủ trọ khi nhận phòng hoặc hoàn tiền 100% khi phát hiện phòng ảo/sai mô tả.
* Đánh giá 2 bước (Verified Reviews): Chỉ người dùng có đơn cọc hoàn tất mới được phép đánh giá.

### Hệ thống bên ngoài tích hợp (External Integration Boundaries):
1. **VNPAY / MoMo Gateway:** Xử lý luồng tiền thực tế, cung cấp chữ ký điện tử an toàn (HMAC SHA512) để xác thực tính toàn vẹn của giao dịch.
2. **Cloudinary / AWS S3:** Giảm tải cho máy chủ ứng dụng bằng cách lưu trữ tệp đa phương tiện trên CDN phân tán toàn cầu.
3. **OpenStreetMap / Leaflet:** Cung cấp lớp bản đồ số trực quan, không phụ thuộc vào các dịch vụ có phí đắt đỏ như Google Maps.
