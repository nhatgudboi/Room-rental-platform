# Danh Mục Tính Năng Sản Phẩm (Feature Catalog)

> **Dự án:** Sàn Cho Thuê Phòng Trọ Thông Minh (Smart Rental Platform)  
> **Trạng thái thiết kế:** TARGET V1 BASELINE  
> **Cơ sở xác định:** Ánh xạ 1:1 với 10 phân hệ trên [Product Mind Map](images/mindmap.png), [17 Use Cases](03-use-cases.md) và [OpenAPI Contract](api/openapi.yaml).

---

## 1. Bảng Ma Trận Tính Năng & Ánh Xạ Ca Sử Dụng (Feature × Use Case Traceability)

| Mã ID | Tên Phân Hệ Tính Năng (Feature Name) | Ca Sử Dụng Ánh Xạ (Use Cases) | Mức Ưu Tiên | Thuộc V1 | Trạng Thái Thiết Kế |
| :---: | :--- | :---: | :---: | :---: | :--- |
| **F01** | Đăng Nhập & Phân Quyền (Authentication & RBAC) | [UC01](03-use-cases.md#uc01-đăng-ký--đăng-nhập-hệ-thống) | Nền tảng | Có | Thiết kế Target V1 (JWT Bearer + 4 Roles) |
| **F02** | Hồ Sơ Cá Nhân & Bảo Mật (Profile & Security) | [UC02](03-use-cases.md#uc02-quản-lý-hồ-sơ--đổi-mật-khẩu) | Bổ trợ | Có | Thiết kế Target V1 (Self-service profile) |
| **F03** | Xác Minh Danh Tính Chủ Trọ (Landlord KYC) | [UC03, UC04](03-use-cases.md#uc03-nộp-hồ-sơ-xác-minh-kyc-chủ-trọ) | **Cốt lõi (P0)** | Có | Thiết kế Target V1 (Duyệt ảnh CCCD & Giấy tờ trọ) |
| **F04** | Quản Lý Tin Đăng Phòng Trọ (Room Management) | [UC05](03-use-cases.md#uc05-tạo--cập-nhật-tin-đăng-phòng-trọ) | Bổ trợ | Có | Thiết kế Target V1 (CRUD phòng, tiện ích, ảnh) |
| **F05** | Kiểm Duyệt Tin Đăng Phòng (Room Moderation) | [UC07](03-use-cases.md#uc07-phê-duyệt-bài-đăng-phòng-trọ) | **Cốt lõi (P0)** | Có | Thiết kế Target V1 (Đối soát địa chỉ, cờ lệch giá AI) |
| **F06** | Lõi Học Máy AI Định Giá & Gợi Ý (AI Core) | [UC06, UC10, UC11](03-use-cases.md#uc06-dự-đoán-giá-phòng-thời-gian-thực-lightgbm) | **Cốt lõi (P0)** | Có | Thiết kế Target V1 (LightGBM + Recommender + Chatbot) |
| **F07** | Tìm Kiếm & Bản Đồ Số (Search & Discovery) | [UC08, UC09](03-use-cases.md#uc08-tìm-kiếm--lọc-phòng-đa-tiêu-chí) | **Cốt lõi (P0)** | Có | Thiết kế Target V1 (Lọc bán kính ĐH, bản đồ Leaflet) |
| **F08** | Đặt Cọc Ký Quỹ Escrow (Escrow Booking) | [UC12](03-use-cases.md#uc12-đặt-cọc-giữ-phòng-trực-tuyến-escrow-booking) | **Cốt lõi (P1)** | Có | Thiết kế Target V1 (Tạm giữ cọc 48h qua VNPAY) |
| **F09** | Xử Lý Khiếu Nại & Hoàn Cọc (Dispute Resolution) | [UC13](03-use-cases.md#uc13-xử-lý-khiếu-nại-tranh-chấp-cọc) | **Cốt lõi (P1)** | Có | Thiết kế Target V1 (Khiếu nại trong 24h & Hoàn tiền 100%) |
| **F10** | Đánh Giá Sau Thuê & Chat (Reviews & Chat) | [UC14, UC15, UC16, UC17](03-use-cases.md#uc14-nhắn-tin-trực-tiếp-in-app-chat) | Bổ trợ | Có | Thiết kế Target V1 (Review 2 bước, Chat STOMP & Admin) |

---

## 2. Chi Tiết Từng Phân Hệ Tính Năng (Detailed Features)

### F01 Đăng Nhập & Phân Quyền (Authentication & RBAC) — [Ánh xạ: UC01]
* **Mục tiêu V1:** Xác thực người dùng qua JWT Access Token (hạn 30 phút) và Refresh Token (7 ngày). Backend Spring Security bảo vệ toàn bộ API và phân quyền nghiêm ngặt 4 vai trò (`ADMIN`, `MODERATOR`, `LANDLORD`, `TENANT`).
* **Tính năng con:**
  - `F01.1` Đăng ký tài khoản (chọn vai trò Khách thuê hoặc Chủ trọ, validate email & mật khẩu mạnh).
  - `F01.2` Đăng nhập cấp cặp Token JWT (Access Token & Refresh Token).
  - `F01.3` Cấp mới Access Token qua Refresh Token (`POST /api/v1/auth/refresh`).
  - `F01.4` Đăng xuất an toàn (hủy token client & xóa phiên).
  - `F01.5` Route & Role Guards: Chặn truy cập trái phép ở cả Frontend (`RoleGuard.jsx`) và Backend (`SecurityConfig`).

### F02 Hồ Sơ Cá Nhân & Bảo Mật (Profile & Security) — [Ánh xạ: UC02]
* **Mục tiêu V1:** Quản lý thông tin tài khoản tự phục vụ của người dùng.
* **Tính năng con:**
  - `F02.1` Xem thông tin tài khoản (`GET /api/v1/users/me`).
  - `F02.2` Cập nhật họ tên, số điện thoại, avatar (`PUT /api/v1/users/profile`).
  - `F02.3` Đổi mật khẩu bảo mật (yêu cầu mật khẩu cũ đúng, validate mật khẩu mới tối thiểu 8 ký tự).
  - `F02.4` Xem lịch sử đơn cọc đã thực hiện và danh sách phòng đã lưu.

### F03 Xác Minh Danh Tính Chủ Trọ (Landlord KYC) — [Trọng Tâm P0] — [Ánh xạ: UC03, UC04]
* **Mục tiêu V1:** Lớp phòng vệ thứ nhất chống chủ trọ "ma" và phòng ảo.
* **Tính năng con:**
  - `F03.1` Chủ trọ nộp số CCCD, ảnh 2 mặt CCCD và ảnh giấy tờ chứng minh sở hữu/ủy quyền trọ.
  - `F03.2` Hàng đợi kiểm duyệt KYC dành cho Moderator (`GET /mod/kyc`).
  - `F03.3` Moderator phê duyệt KYC -> Tự động kích hoạt trạng thái `VERIFIED_LANDLORD`, mở khóa quyền đăng tin.
  - `F03.4` Moderator từ chối KYC kèm lý do bắt buộc (ảnh mờ, sai thông tin).

### F04 Quản Lý Tin Đăng Phòng Trọ (Room Management) — [Ánh xạ: UC05]
* **Mục tiêu V1:** Quản lý danh mục phòng cho thuê của Chủ trọ.
* **Tính năng con:**
  - `F04.1` Tạo tin phòng mới: địa chỉ chi tiết, diện tích, giá thuê, tiền cọc, giá điện nước, danh mục tiện nghi, album ảnh (tối thiểu 3 ảnh).
  - `F04.2` Quản lý danh sách phòng của tôi: hiển thị thống kê lượt xem, trạng thái còn trống / đã thuê.
  - `F04.3` Chỉnh sửa thông tin phòng và tiện ích.
  - `F04.4` Chuyển đổi trạng thái nhanh (`AVAILABLE`, `RENTED`, `MAINTENANCE`).
  - `F04.5` Xóa mềm tin đăng (`deleted_at TIMESTAMPTZ`).

### F05 Kiểm Duyệt Tin Đăng Phòng (Room Moderation) — [Trọng Tâm P0] — [Ánh xạ: UC07]
* **Mục tiêu V1:** Lớp phòng vệ thứ hai đảm bảo 100% phòng hiển thị trên sàn là phòng thật, giá hợp lý.
* **Tính năng con:**
  - `F05.1` Hàng đợi duyệt tin phòng dành cho Moderator với SLA xử lý $< 4$ giờ.
  - `F05.2` Tự động bật cờ cảnh báo `FLAG_HIGH_PRICE` nếu giá chủ trọ đặt cao hơn $> 35\%$ so với giá AI LightGBM khuyến nghị.
  - `F05.3` Kiểm tra đối soát ảnh thực tế chống ảnh mạng/ảnh biệt thự rác.
  - `F05.4` Phê duyệt xuất bản (`AVAILABLE`) hoặc từ chối tin kèm lý do cụ thể.

### F06 Lõi Học Máy AI Định Giá & Gợi Ý (AI Core) — [USP Đề Tài P0] — [Ánh xạ: UC06, UC10, UC11]
* **Mục tiêu V1:** Đột phá công nghệ giải quyết nạn loạn giá và tối ưu trải nghiệm tìm phòng.
* **Tính năng con:**
  - `F06.1` Mô hình **LightGBM Price Predictor**: Dự đoán giá thuê hợp lý dựa trên diện tích, quận huyện, khoảng cách trường ĐH, tổ hợp tiện nghi (đạt sai số $MAPE < 10\%$).
  - `F06.2` Cung cấp khoảng giá an toàn $[Y_{\min}, Y_{\max}]$ và tỷ lệ chênh lệch giá thị trường.
  - `F06.3` Hệ thống gợi ý phòng cá nhân hóa (Hybrid Recommender): Lọc theo nội dung + Lọc cộng tác theo lịch sử click/bookmark; cơ chế Fallback xử lý Cold-Start cho khách mới.
  - `F06.4` Trợ lý ảo AI Assistant: Giải đáp 24/7 về tiện ích xung quanh, chi phí điện nước, nội quy phòng.

### F07 Tìm Kiếm & Bản Đồ Số (Search & Discovery) — [Trọng Tâm P0] — [Ánh xạ: UC08, UC09]
* **Mục tiêu V1:** Trải nghiệm tìm kiếm trực quan chuẩn Airbnb-style cho sinh viên và người thuê.
* **Tính năng con:**
  - `F07.1` Tìm kiếm theo bán kính quanh các trường Đại học trọng điểm ($< 2km$, $< 3km$, $< 5km$).
  - `F07.2` Bộ lọc đa tiêu chí linh hoạt: Khoảng giá, diện tích, loại phòng, tiện nghi (điều hòa, máy giặt, ban công, giờ tự do).
  - `F07.3` Bản đồ số tương tác (Leaflet Map): Ghim cụm phòng (Marker Clustering), xem trước giá trên popup bản đồ.
  - `F07.4` Trang chi tiết phòng minh bạch: Album ảnh thực tế, bảng kê chi phí điện/nước/wifi, **Widget đo giá AI LightGBM**.

### F08 Đặt Cọc Ký Quỹ Escrow (Escrow Booking) — [Trọng Tâm P1] — [Ánh xạ: UC12]
* **Mục tiêu V1:** Chấm dứt triệt để nạn lừa đảo cọc giữ chỗ và bùng phòng.
* **Tính năng con:**
  - `F08.1` Khách tạo đơn cọc giữ chỗ 48 giờ (số tiền quy định 500,000 VNĐ) kèm lịch hẹn đến xem phòng.
  - `F08.2` Thanh toán qua cổng VNPAY / MoMo Sandbox; Webhook IPN tự động chuyển đơn sang `ESCROW_HOLDING` và khóa phòng sang `RESERVED`.
  - `F08.3` Đồng hồ đếm ngược 48h; tự động nhắc lịch hẹn xem phòng trước 2 giờ.
  - `F08.4` Xác nhận nhận phòng thành công: Hai bên ký hợp đồng -> Hệ thống giải ngân tiền cọc cho chủ trọ, phòng chuyển sang `RENTED`.

### F09 Xử Lý Khiếu Nại & Hoàn Cọc (Dispute Resolution) — [Trọng Tâm P1] — [Ánh xạ: UC13]
* **Mục tiêu V1:** Cơ chế bảo vệ dòng tiền của khách thuê khi phát hiện phòng sai mô tả.
* **Tính năng con:**
  - `F09.1` Khách gửi khiếu nại trong vòng 24h sau giờ hẹn xem nếu phòng ẩm mốc, thiếu điều hòa so với tin đăng kèm ảnh/video hiện trường.
  - `F09.2` Hàng đợi phân xử khiếu nại cho Moderator (`GET /mod/disputes`).
  - `F09.3` Phán quyết hoàn tiền: Moderator duyệt khiếu nại -> Kích hoạt VNPAY Refund API **hoàn trả 100% tiền cọc** cho khách thuê.
  - `F09.4` Phán quyết bồi hoàn: Nếu khách tự ý hủy hẹn vô lý -> Tiền cọc được bồi hoàn cho chủ trọ để bù đắp chi phí giữ phòng trống.

### F10 Đánh Giá Sau Thuê & Chat Trực Tiếp (Reviews & Chat) — [Ánh xạ: UC14, UC15, UC16, UC17]
* **Mục tiêu V1:** Xây dựng cộng đồng phòng trọ minh bạch và kết nối tức thì.
* **Tính năng con:**
  - `F10.1` Đánh giá 2 bước (Verified Reviews): Chỉ người dùng có `booking_status = COMPLETED` mới được chấm điểm 4 tiêu chí (An ninh, Vệ sinh, Điện nước, Thái độ chủ trọ).
  - `F10.2` Chủ trọ phản hồi công khai đối với nhận xét của khách.
  - `F10.3` Chat thời gian thực trực tiếp Khách - Chủ qua WebSocket STOMP, đính kèm ảnh hiện trạng và vị trí hẹn gặp.
  - `F10.4` Dashboard thống kê Admin: Báo cáo tổng tiền cọc qua sàn, doanh thu hoa hồng, tỷ lệ phòng trống theo quận.
