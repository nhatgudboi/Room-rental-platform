# Đặc Tả Wireframe & Giao Diện 18 Màn Hình (Screen Specifications)

> **Dự án:** Sàn Cho Thuê Phòng Trọ Thông Minh (Smart Room Rental Platform)  
> **Ánh xạ 1:1:** Khớp tuyệt đối với 18 màn hình trên [Information Architecture](../04-information-architecture.md) (`SCR-01` đến `SCR-18`) và [Hợp đồng OpenAPI](../api/openapi.yaml).  
> **Nguyên tắc biểu diễn:** Mỗi màn hình bao gồm:  
> 1. Thông số định tuyến & Phân quyền RBAC.  
> 2. Bản vẽ khung giao diện trực quan (**ASCII Visual Wireframe Mockup**).  
> 3. Cấu trúc khối thành phần (Component Breakdown).  
> 4. Đặc tả 4 trạng thái bắt buộc: *Default*, *Loading/Skeleton*, *EmptyState*, *ErrorState/Refusal*.

---

# PHẦN 1: PHÂN HỆ NGƯỜI THUÊ & CÔNG KHAI (TENANT & PUBLIC)

---

### SCR-01: Trang Chủ & Tìm Kiếm Thông Minh (Home & Hero Discovery)
* **Route:** `/` | **Vai trò truy cập:** Tất cả (Public, Tenant, Landlord, Admin)
* **Mục tiêu:** Tạo ấn tượng tin cậy với cam kết 100% phòng thật, thanh tìm kiếm chọn trường ĐH, và Feed phòng gợi ý bởi AI.

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ [Logo] SMART RENTAL     [Gần trường ĐH v] [Bảng giá AI] [Cơ chế cọc 48h]     [Đăng nhập]│
├────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                        │
│   TÌM PHÒNG TRỌ XÁC THỰC 100% · ĐỊNH GIÁ BỞI AI · CỌC KÝ QUỸ AN TOÀN                   │
│   Xóa bỏ hoàn toàn nỗi lo phòng ảo, chủ trọ ma và lừa đảo cọc                          │
│                                                                                        │
│   ┌────────────────────────────────────────────────────────────────────────────────┐   │
│   │ 🎓 Chọn trường Đại học      │ 📍 Bán kính   │ 💰 Tầm giá        │ [ 🔍 TÌM NGAY ]│   │
│   │ [ ĐH Bách Khoa Hà Nội   v ] │ [ < 2 km   v ]│ [ 2.5Tr - 4Tr  v ]│                │   │
│   └────────────────────────────────────────────────────────────────────────────────┘   │
│   🔥 Khu vực sinh viên tìm nhiều: [Cầu Giấy] [Đống Đa] [Hai Bà Trưng] [Thanh Xuân]     │
│                                                                                        │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 🤖 GỢI Ý CÁ NHÂN HÓA CHO BẠN (DỰA TRÊN LỊCH SỬ TÌM KIẾM CẦU GIẤY)           [Xem thêm >]│
│ ┌────────────────────────┐ ┌────────────────────────┐ ┌────────────────────────┐       │
│ │ [Ảnh: Studio 28m2]     │ │ [Ảnh: Chung cư mini]   │ │ [Ảnh: Phòng ban công]  │       │
│ │ 3.2Tr/th · Cầu Giấy    │ │ 3.8Tr/th · Dịch Vọng   │ │ 2.9Tr/th · Quan Hoa    │       │
│ │ ⚡ Giá chuẩn AI 100%    │ │ ⚡ Giá chuẩn AI 100%    │ │ ⚡ Giá chuẩn AI 100%    │       │
│ └────────────────────────┘ └────────────────────────┘ └────────────────────────┘       │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 🛡️ 3 LÝ DO TẠI SAO SINH VIÊN CHỌN SMART RENTAL                                        │
│  [ 1. Chủ trọ xác minh CCCD ]   [ 2. Định giá LightGBM ]   [ 3. Tạm giữ cọc 48h VNPAY ]│
├────────────────────────────────────────────────────────────────────────────────────────┤
│ Footer: Quy chế sàn · Hotline khiếu nại cọc 24/7 · Đối tác thanh toán VNPAY            │
└────────────────────────────────────────────────────────────────────────────────────────┘
```
* **Thành phần cốt lõi:**
  - Hero Search Box kết nối với bảng `university_landmarks` và `districts`.
  - Recommender Feed gọi API `GET /api/v1/rooms/recommendations`.
  - Nếu khách chưa đăng nhập (Cold-Start): Tự động hiển thị các phòng có sao cao nhất quanh trường ĐH trung tâm.

---

### SCR-02: Tìm Kiếm Đa Tiêu Chí & Bản Đồ Số Tương Tác (Search & Map View)
* **Route:** `/rooms` | **Vai trò truy cập:** Tất cả (Public)
* **Mục tiêu:** Màn hình tìm kiếm 2 cột chuẩn Airbnb — bên trái là danh sách thẻ phòng phân trang, bên phải là bản đồ số Leaflet ghim cụm giá tiền.

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ [Logo] [ 🔍 Tìm quanh ĐH Bách Khoa... ]     [Khoảng giá v] [Tiện ích v]    [Avatar/Login]│
├───────────────────────────────┬────────────────────────────────────────────────────────┤
│ BỘ LỌC ĐA TIÊU CHÍ            │ BẢN ĐỒ SỐ TƯƠNG TÁC (LEAFLET / OPENSTREETMAP)          │
│ • Khoảng giá:                 │ ┌────────────────────────────────────────────────────┐ │
│   [ 2,000,000đ — 4,000,000đ ] │ │                     Hai Bà Trưng                   │ │
│ • Loại phòng:                 │ │            [3.2Tr]         [3.5Tr]                 │ │
│   [x] Studio  [ ] Ở ghép      │ │               \               /                    │ │
│ • Bán kính trường học:        │ │            ┌──────────────────────┐                │ │
│   (o) < 1km  ( ) < 3km        │ │            │ 🎓 ĐH BÁCH KHOA HN   │                │ │
│ • Tiện nghi chọn lọc:         │ │            │ (Vòng tròn bán kính) │                │ │
│   [x] Điều hòa  [x] Nóng lạnh │ │            └──────────────────────┘                │ │
│   [x] Máy giặt  [x] Giờ tự do │ │        [2.8Tr]             (12 phòng)              │ │
│ ───────────────────────────── │ └────────────────────────────────────────────────────┘ │
│ KẾT QUẢ TÌM KIẾM (24 phòng)   │                                                        │
│ [ Sắp xếp: Giá tốt theo AI v ]│ Chi tiết ghim đang chọn:                               │
│ ┌───────────────────────────┐ │ ┌────────────────────────────────────────────────────┐ │
│ │ [Ảnh] Phòng Studio 28m2   │ │ │ [Ảnh 4:3] Phòng 12 ngõ 33 Lê Thanh Nghị · 3.2Tr    │ │
│ │ Cầu Giấy · Cách ĐHBK 800m │ │ │ 📐 28m2 · Có ban công · Đã duyệt KYC 🛡️           │ │
│ │ 3,200,000 đ · ⭐ 4.9 (18) │ │ │ [ Xem chi tiết phòng này ]   [ Đặt cọc giữ chỗ ]   │ │
│ └───────────────────────────┘ │ └────────────────────────────────────────────────────┘ │
│ ┌───────────────────────────┐ │                                                        │
│ │ [Ảnh] Phòng Khép Kín 22m2 │ │ 💬 [Trợ lý AI tư vấn 24/7] (Nút mở chatbot nổi)      │ │
│ └───────────────────────────┘ │                                                        │
└───────────────────────────────┴────────────────────────────────────────────────────────┘
```
* **Tương tác cốt lõi:**
  - Di chuột vào thẻ phòng bên trái $\rightarrow$ Ghim trên bản đồ bên phải nhảy hiệu ứng nổi bật (Active Pin).
  - Click vào ghim bản đồ $\rightarrow$ Mở Popup thẻ tóm tắt phòng.

---

### SCR-03: Chi Tiết Phòng Trọ & Thước Đo Định Giá AI (Room Detail & AI Gauge)
* **Route:** `/rooms/:id` | **Vai trò truy cập:** Tất cả (Public)
* **Mục tiêu:** Cung cấp thông tin minh bạch 100% về hình ảnh thực tế, chi phí điện nước, chủ trọ KYC, thước đo giá AI và nút Đặt cọc 48h.

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ Breadcrumb: Trang chủ > Hà Nội > Quận Cầu Giấy > Phòng trọ Studio khép kín ban công    │
├────────────────────────────────────────────────────────┬───────────────────────────────┤
│ ALBUM ẢNH PHÒNG TRỌ THỰC TẾ (TỐI THIỂU 3 ẢNH)          │ THÔNG TIN ĐẶT CỌC GIỮ PHÒNG   │
│ ┌─────────────────────────┬──────────────────────────┐ │                               │
│ │                         │ [ Ảnh phòng ngủ nhỏ ]    │ │ GIÁ THUÊ NIÊM YẾT:            │
│ │                         ├──────────────────────────┤ │ 3,200,000 đ / tháng          │
│ │   ẢNH CHÍNH PHÒNG TRỌ   │ [ Ảnh khu vực bếp ]      │ │ Tiền cọc giữ chỗ: 500,000 đ  │
│ │   (Độ nét cao thực tế)  ├──────────────────────────┤ │                               │
│ │                         │ [ Ảnh nhà vệ sinh sạch ] │ │ 🛡️ BẢO CHỨNG SÀN SMART RENTAL│
│ └─────────────────────────┴──────────────────────────┘ │ • Giữ cọc an toàn 48 giờ     │
│                                                        │ • Hoàn 100% nếu phòng sai ảnh │
│ ĐẶC TẢ CHI PHÍ ĐIỆN NƯỚC MINH BẠCH:                    │                               │
│ • Điện sinh hoạt: 3,500 đ / kWh (Công tơ riêng)        │ [ ⚡ ĐẶT CỌC GIỮ PHÒNG 48H ]  │
│ • Nước máy: 25,000 đ / m3                              │ (Thanh toán qua VNPAY an toàn)│
│ • Mạng Internet: 80,000 đ / phòng / tháng              │                               │
│                                                        │ [ 💬 Nhắn tin với Chủ trọ ]   │
│ ────────────────────────────────────────────────────── │ ───────────────────────────── │
│ 🤖 CÔNG CỤ ĐO ĐỊNH GIÁ AI LIGHTGBM                     │ CHỦ NHÀ TRỌ ĐÃ XÁC MINH:      │
│ Giá chủ niêm yết: 3.2M  |  Khoảng giá AI: [ 3.0M - 3.5M]│ [Avatar] Nguyễn Văn Chủ       │
│ [Thấp] ─────── [ 3.0M ──────●────── 3.5M ] ─────── [Cao]│ ⭐ 4.9 · Đã duyệt CCCD 🛡️     │
│ 💡 Đánh giá: MỨC GIÁ HỢP LÝ VỚI THỊ TRƯỜNG HIỆN TẠI    │ SĐT: 0903*** (Hiện sau cọc)   │
│                                                        │                               │
│ ĐÁNH GIÁ TỪ NGƯỜI ĐÃ THUÊ THỰC TẾ (⭐ 4.9 / 5.0)       │                               │
│ 🛡️ Khách thuê: Trần Thị H. (Đã thuê tháng 10/2026)     │                               │
│ "Phòng sạch sẽ, nước mạnh, chủ trọ thân thiện..."      │                               │
└────────────────────────────────────────────────────────┴───────────────────────────────┘
```

---

### SCR-04: Đặt Cọc Ký Quỹ Escrow Qua VNPAY (Escrow Checkout)
* **Route:** `/rooms/:id/booking` | **Vai trò truy cập:** `TENANT` (Yêu cầu đăng nhập)
* **Mục tiêu:** Thực hiện ký quỹ tạm giữ cọc 500,000đ trong 48h qua cổng VNPAY an toàn.

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ TIẾN TRÌNH KÝ QUỸ: (1) Chọn lịch hẹn  ──>  (2) Thanh toán VNPAY  ──>  (3) Giữ cọc 48h  │
├────────────────────────────────────────────────────────┬───────────────────────────────┤
│ 1. THÔNG TIN PHÒNG TRỌ KÝ QUỸ                          │ 2. TỔNG KẾT TIỀN CỌC KÝ QUỸ   │
│ Phòng Studio khép kín 28m2 - Ngõ 165 Cầu Giấy          │                               │
│ Chủ nhà: Nguyễn Văn Chủ · SĐT: 0903456789              │ Tiền cọc giữ chỗ sàn quy định:│
│                                                        │ 500,000 VNĐ                   │
│ CHỌN THỜI GIAN HẸN ĐẾN XEM PHÒNG:                      │ Phí giao dịch: 0 VNĐ (Miễn phí│
│ 📅 Ngày hẹn: [ 05/11/2026  v ]                          │                               │
│ ⏰ Khung giờ: [ 17:30 Chiều v ]                         │ TỔNG THANH TOÁN: 500,000 VNĐ  │
│                                                        │                               │
│ ĐIỀU KHOẢN BẢO VỆ TIỀN CỌC ESCROW 48H:                 │ CHỌN PHƯƠNG THỨC THANH TOÁN:  │
│ [x] Tôi hiểu rằng số tiền 500,000 VNĐ sẽ do Sàn tạm   │ (o) VNPAY-QR (Ngân hàng/Ví)   │
│     giữ an toàn trong 48 giờ.                          │ ( ) Thẻ ATM Nội địa           │
│ [x] Nếu phòng thực tế ẩm mốc, thiếu đồ hoặc chủ trọ   │ ( ) Thẻ Visa / MasterCard     │
│     bùng hẹn, tôi được hoàn cọc 100% trong 24 giờ.     │                               │
│                                                        │ [ 🔒 XÁC NHẬN & THANH TOÁN ]  │
│                                                        │ (Chuyển sang cổng VNPAY)      │
└────────────────────────────────────────────────────────┴───────────────────────────────┘
```

---

### SCR-05: Khiếu Nại & Hoàn Cọc Trong 24h (Dispute & Refund Filing)
* **Route:** `/bookings/:id/dispute` | **Vai trò truy cập:** `TENANT` (Sở hữu đơn cọc)
* **Mục tiêu:** Cho phép khách thuê nộp bằng chứng video/ảnh hiện trường đòi hoàn cọc 100% nếu phòng sai lệch mô tả.

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ ⚠️ YÊU CẦU PHÂN XỬ TRANH CHẤP & HOÀN CỌC 100% (ĐƠN CỌC #BK-202611-0089)                │
│ Thời hạn cho phép khiếu nại: Còn lại 18 giờ 20 phút                                   │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 1. LÝ DO KHIẾU NẠI CHÍNH:                                                              │
│   (o) Phòng thực tế ẩm mốc, xuống cấp nghiêm trọng khác xa ảnh tin đăng                │
│   ( ) Thiếu tiện nghi cơ bản đã cam kết (Điều hòa, nóng lạnh bị hỏng/không có)         │
│   ( ) Chủ nhà tự ý tăng giá điện nước so với giá niêm yết trên Sàn                     │
│   ( ) Chủ nhà bùng hẹn xem phòng không có lý do                                        │
│                                                                                        │
│ 2. MÔ TẢ CHI TIẾT SỰ VIỆC:                                                             │
│   ┌────────────────────────────────────────────────────────────────────────────────┐   │
│   │ Em đến xem phòng lúc 17h30 chiều nay, phòng bị ngấm dột góc tường rất nặng và │   │
│   │ điều hòa không hoạt động, khác hoàn toàn với ảnh trên tin đăng.                │   │
│   └────────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                        │
│ 3. TẢI LÊN BẰNG CHỨNG HÌNH ẢNH / VIDEO THỰC TẾ TẠI PHÒNG:                              │
│   ┌───────────────────────────┐ ┌───────────────────────────┐ ┌────────────────────┐   │
│   │ [Ảnh 1: Vết ẩm mốc tường] │ │ [Ảnh 2: Điều hòa hỏng]    │ │ [+ Thêm video/ảnh] │   │
│   └───────────────────────────┘ └───────────────────────────┘ └────────────────────┘   │
│                                                                                        │
│ [ 🛡️ GỬI KHIẾU NẠI CHO MODERATOR PHÂN XỬ HOÀN TIỀN 100% ]               [ Hủy bỏ ]     │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

### SCR-06: Đánh Giá 2 Bước Sau Lưu Trú (Post-Stay Verified Review)
* **Route:** `/bookings/:id/review` | **Vai trò truy cập:** `TENANT` (Đã hoàn tất thuê thực tế)
* **Mục tiêu:** Đánh giá 4 tiêu chí công tâm, chỉ kích hoạt khi đơn cọc ở trạng thái `COMPLETED`.

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ ĐÁNH GIÁ TRẢI NGHIỆM THỰC TẾ TẠI PHÒNG #120 (Chủ trọ: Nguyễn Văn Chủ)                  │
│ Huy hiệu: 🛡️ Khách thuê thực tế đã xác minh nhận phòng                                │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ CHẤM ĐIỂM 4 TIÊU CHÍ CỐT LÕI (Từ 1 đến 5 sao):                                         │
│ • 🛡️ Mức độ an ninh khu vực:        [ ⭐ ] [ ⭐ ] [ ⭐ ] [ ⭐ ] [ ⭐ ]  (5/5 Tuyệt vời)  │
│ • 🧹 Vệ sinh & Môi trường sống:      [ ⭐ ] [ ⭐ ] [ ⭐ ] [ ⭐ ] [ ☆ ]  (4/5 Sạch sẽ)    │
│ • 💡 Giá điện nước & Minh bạch:      [ ⭐ ] [ ⭐ ] [ ⭐ ] [ ⭐ ] [ ⭐ ]  (5/5 Đúng cam kết│
│ • 🤝 Thái độ & Hỗ trợ của Chủ trọ:   [ ⭐ ] [ ⭐ ] [ ⭐ ] [ ⭐ ] [ ⭐ ]  (5/5 Nhiệt tình) │
│                                                                                        │
│ CHIA SẺ CHI TIẾT CHO CỘNG ĐỒNG:                                                        │
│ ┌──────────────────────────────────────────────────────────────────────────────────┐   │
│ │ Phòng ở thoáng, cách trường Bách Khoa đi bộ 10 phút. Bác chủ dễ tính hỗ trợ sửa │   │
│ │ bóng đèn ngay trong ngày. Điện nước có công tơ riêng rõ ràng.                    │   │
│ └──────────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                        │
│ [ 📤 ĐĂNG ĐÁNH GIÁ CÔNG KHAI ]                                          [ Bỏ qua ]     │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

# PHẦN 2: PHÂN HỆ XÁC THỰC & HỒ SƠ (AUTH & PROFILE)

---

### SCR-07: Đăng Nhập & Đăng Ký Tài Khoản (Login & Register)
* **Route:** `/auth/login`, `/auth/register` | **Vai trò truy cập:** Public
* **Mục tiêu:** Cung cấp trải nghiệm đăng nhập nhanh, chọn vai trò Tenant hoặc Landlord, phân tách rõ ràng.

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                   [ Logo Smart Rental ]                                │
│                            CHÀO MỪNG BẠN ĐẾN VỚI SMART RENTAL                          │
│                                                                                        │
│         ┌──────────────────────────────────┬──────────────────────────────────┐        │
│         │        [ ĐĂNG NHẬP ]             │          [ ĐĂNG KÝ MỚI ]         │        │
│         └──────────────────────────────────┴──────────────────────────────────┘        │
│                                                                                        │
│         BẠN THAM GIA VỚI VAI TRÒ GÌ?                                                   │
│         ┌─────────────────────────────────┐  ┌──────────────────────────────────┐      │
│         │ (o) 🎓 TÔI LÀ NGƯỜI THUÊ PHÒNG  │  │ ( ) 🏠 TÔI LÀ CHỦ NHÀ CHO THUÊ   │      │
│         └─────────────────────────────────┘  └──────────────────────────────────┘      │
│                                                                                        │
│         Họ và tên:        [ Nguyễn Văn A                                   ]           │
│         Email đăng nhập:  [ tenant@smartrental.vn                          ]           │
│         Số điện thoại:    [ 0901234567                                     ]           │
│         Mật khẩu:         [ ••••••••••••                                 👁 ]           │
│         (Tối thiểu 8 ký tự, bao gồm chữ hoa, số và ký tự đặc biệt)                     │
│                                                                                        │
│         [ 🚀 TẠO TÀI KHOẢN & ĐĂNG NHẬP QUA JWT ]                                       │
│                                                                                        │
│         Đã có tài khoản? [ Đăng nhập ngay ]  ·  [ Quên mật khẩu? ]                     │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

### SCR-08: Hồ Sơ Cá Nhân & Quản Lý Đơn Cọc (User Profile & My Bookings)
* **Route:** `/profile` | **Vai trò truy cập:** Tất cả tài khoản đã đăng nhập
* **Mục tiêu:** Quản lý thông tin cá nhân, đổi mật khẩu và theo dõi lịch sử cọc phòng.

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ HỒ SƠ TÀI KHOẢN: Nguyễn Văn A  ·  Vai trò: TENANT  ·  Trạng thái: Hoạt động ✅         │
├─────────────────┬──────────────────────────────────────────────────────────────────────┤
│ MENU HỒ SƠ:     │ LỊCH SỬ ĐẶT CỌC GIỮ PHÒNG CỦA BẠN (3 đơn)                            │
│ • [x] Đơn cọc   │ ┌──────────────────────────────────────────────────────────────────┐ │
│ • [ ] Hồ sơ     │ │ MÃ ĐƠN: #BK-202611-0089  ·  Ngày cọc: 03/11/2026                 │ │
│ • [ ] Bảo mật   │ │ Phòng Studio 28m2 Cầu Giấy (Chủ: Nguyễn Văn Chủ)                 │ │
│ • [ ] Phòng lưu │ │ Tiền cọc: 500,000 VNĐ  ·  Trạng thái: [ ESCROW_HOLDING: Giữ 48h ]│ │
│                 │ │ [ Xem lịch hẹn: 05/11 ]   [ Khiếu nại cọc ]   [ Chat với chủ ]   │ │
│                 │ └──────────────────────────────────────────────────────────────────┘ │
│                 │ ┌──────────────────────────────────────────────────────────────────┐ │
│                 │ │ MÃ ĐƠN: #BK-202610-0042  ·  Ngày cọc: 12/10/2026                 │ │
│                 │ │ Phòng Đống Đa  ·  500,000 VNĐ  ·  Trạng thái: [ COMPLETED ]      │ │
│                 │ │ [ Viết đánh giá sau thuê ⭐ ]                                     │ │
│                 │ └──────────────────────────────────────────────────────────────────┘ │
└─────────────────┴──────────────────────────────────────────────────────────────────────┘
```

---

# PHẦN 3: PHÂN HỆ DÀNH CHO CHỦ TRỌ (LANDLORD PORTAL)

---

### SCR-09: Nộp Hồ Sơ Xác Minh KYC Chủ Trọ (Landlord KYC Submission)
* **Route:** `/landlord/kyc` | **Vai trò truy cập:** `LANDLORD` (Chưa duyệt KYC)
* **Mục tiêu:** Tải 2 mặt CCCD và giấy tờ sở hữu trọ để mở khóa tính năng đăng tin.

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ TIẾN TRÌNH XÁC MINH DANH TÍNH CHỦ TRỌ (BẮT BUỘC ĐỂ MỞ QUYỀN ĐĂNG TIN)                 │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ Trạng thái hiện tại: [ ⏳ PENDING_VERIFICATION: Đang chờ Moderator kiểm duyệt trong 4h ]│
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 1. SỐ CĂN CƯỚC CÔNG DÂN (12 SỐ): [ 001099012345                              ]         │
│                                                                                        │
│ 2. TẢI LÊN ẢNH CCCD 2 MẶT & GIẤY PHÉP KINH DOANH TRỌ:                                  │
│ ┌─────────────────────────────┐ ┌─────────────────────────────┐ ┌────────────────────┐ │
│ │ [ ẢNH MẶT TRƯỚC CCCD ]      │ │ [ ẢNH MẶT SAU CCCD ]        │ │ [ GIẤY TỜ SỞ HỮU ] │ │
│ │ Rõ nét, không lóa sáng      │ │ Rõ phôi chip, vân tay       │ │ Sổ đỏ / HĐ quản lý │ │
│ │ [ Đã tải lên: cccd_mat1.jpg]│ │ [ Đã tải lên: cccd_mat2.jpg]│ │ [ giay_phep.pdf ]  │ │
│ └─────────────────────────────┘ └─────────────────────────────┘ └────────────────────┘ │
│                                                                                        │
│ 🛡️ Cam kết: Thông tin CCCD chỉ sử dụng cho mục đích đối soát an ninh sàn và phòng ma. │
│ [ 📤 GỬI HỒ SƠ XÁC MINH KYC ]                                                          │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

### SCR-10: Quản Lý Danh Sách Phòng Trọ (Landlord Room Management)
* **Route:** `/landlord/rooms` | **Vai trò truy cập:** `LANDLORD` (Đã KYC)
* **Mục tiêu:** Quản lý toàn bộ phòng cho thuê, số lượt xem và chuyển đổi trạng thái nhanh.

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ PORTAL CHỦ TRỌ: Quản lý danh mục phòng cho thuê               [ + ĐĂNG TIN PHÒNG MỚI ] │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ THỐNG KÊ NHANH:                                                                        │
│ [ Tổng phòng: 8 ]   [ Còn trống: 3 ]   [ Đang giữ cọc: 2 ]   [ Đã cho thuê: 3 ]        │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ DANH SÁCH BÀI ĐĂNG PHÒNG TRỌ:                                                          │
│ ┌──────┬──────────────────────┬──────────┬──────────┬──────────────┬─────────────────┐ │
│ │ Ảnh  │ Tiêu đề & Địa chỉ    │ Giá thuê │ Lượt xem │ Trạng thái   │ Thao tác        │ │
│ ├──────┼──────────────────────┼──────────┼──────────┼──────────────┼─────────────────┤ │
│ │ [Ảnh]│ Studio Cầu Giấy 28m2 │ 3.2Tr/th │ 482 xem  │ [AVAILABLE]  │ [Sửa] [Đổi trạng│ │
│ │ [Ảnh]│ Khép kín Đống Đa     │ 2.8Tr/th │ 120 xem  │ [RESERVED] ⏳│ [Xem đơn cọc 48h│ │
│ │ [Ảnh]│ Chung cư mini 35m2   │ 4.5Tr/th │ 850 xem  │ [RENTED]     │ [Bảo trì] [Ẩn]  │ │
│ └──────┴──────────────────────┴──────────┴──────────┴──────────────┴─────────────────┘ │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

### SCR-11: Tạo Tin Phòng & Tham Khảo Giá AI LightGBM (Create Room & AI Valuation)
* **Route:** `/landlord/rooms/new` | **Vai trò truy cập:** `LANDLORD` (Đã duyệt KYC)
* **Mục tiêu:** Nhập thông số phòng, bấm nút gọi AI LightGBM dự đoán giá thị trường trước khi niêm yết.

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ TẠO TIN ĐĂNG CHO THUÊ PHÒNG TRỌ MỚI                                                    │
├────────────────────────────────────────────────────────┬───────────────────────────────┤
│ THÔNG TIN CƠ BẢN:                                      │ 🤖 ĐỊNH GIÁ THỜI GIAN THỰC AI:│
│ Tiêu đề tin: [ Studio Full Đồ Ban Công Thoáng Mát   ]  │                               │
│ Địa chỉ:     [ Số 12 ngõ 165 Cầu Giấy, Hà Nội       ]  │ [ ⚡ DỰ ĐOÁN GIÁ LIGHTGBM ]   │
│ Quận/Huyện:  [ Cầu Giấy                           v ]  │ (Gọi tính toán qua FastAPI)   │
│ Tọa độ GPS:  [ 21.036237, 105.790583 (Chọn bản đồ)  ]  │                               │
│                                                        │ KẾT QUẢ PHÂN TÍCH THỊ TRƯỜNG: │
│ THÔNG SỐ VÀ TIỆN NGHI:                                 │ • Giá gợi ý AI: 3,250,000 đ   │
│ Diện tích:   [ 28 ] m2    Số người ở tối đa: [ 2  ]    │ • Khoảng an toàn: 3.0M - 3.5M │
│ [x] Điều hòa  [x] Nóng lạnh  [x] Máy giặt  [x] Tủ lạnh │                               │
│ [x] Ban công  [x] Thang máy  [x] Giờ giấc tự do        │ ĐẶT GIÁ NIÊM YẾT CHÍNH THỨC:  │
│                                                        │ Giá thuê/tháng: [ 3,200,000 ]đ│
│ ĐƠN GIÁ ĐIỆN NƯỚC MINH BẠCH:                           │ Tiền cọc giữ chỗ:[ 500,000 ]đ │
│ Giá điện: [ 3,500 ] đ/kWh   Giá nước: [ 25,000 ] đ/m3  │                               │
│                                                        │ ĐÁNH GIÁ: HỢP LÝ THỊ TRƯỜNG ✅│
│ ALBUM HÌNH ẢNH THỰC TẾ (KÉO THẢ TỐI THIỂU 3 ẢNH):      │ (Không bị gắn cờ lệch giá)    │
│ [ Ảnh phòng ngủ.jpg ] [ Ảnh bếp.jpg ] [ Ảnh WC.jpg ]   │                               │
│                                                        │ [ 📤 GỬI TIN DUYỆT LÊN SÀN ]  │
└────────────────────────────────────────────────────────┴───────────────────────────────┘
```

---

### SCR-12: Quản Lý Đơn Khách Cọc Giữ Chỗ (Landlord Bookings Management)
* **Route:** `/landlord/bookings` | **Vai trò truy cập:** `LANDLORD`
* **Mục tiêu:** Quản lý tiền cọc khách đã chuyển, đếm ngược 48h và nút xác nhận khách nhận phòng để nhận tiền giải ngân.

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ DANH SÁCH ĐƠN CỌC GIỮ PHÒNG 48H ĐANG HIỆU LỰC                                          │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ ĐƠN CỌC #BK-202611-0089  ·  Phòng: Studio 28m2 Cầu Giấy                                │
│ Khách cọc: Trần Thị Sinh Viên (SĐT: 0904567890)                                        │
│ Số tiền Sàn đang lưu ký: 500,000 VNĐ (Đã thanh toán qua VNPAY)                        │
│ Lịch hẹn khách đến xem: 17:30 Chiều ngày 05/11/2026                                    │
│ ⏳ ĐẾM NGƯỢC THỜI HẠN GIỮ CHỖ: Còn lại 36 giờ 40 phút                                  │
│                                                                                        │
│ [ 🤝 XÁC NHẬN KHÁCH ĐÃ NHẬN PHÒNG ] (Sàn giải ngân tiền cọc vào tài khoản của bạn)     │
│ [ 💬 Mở chat hẹn khách ]   [ Báo cáo khách bùng hẹn ]                                  │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

# PHẦN 4: PHÂN HỆ KIỂM DUYỆT & QUẢN TRỊ (MODERATOR & ADMIN)

---

### SCR-13: Hàng Đợi Duyệt Hồ Sơ KYC Chủ Trọ (KYC Moderation Queue)
* **Route:** `/mod/kyc` | **Vai trò truy cập:** `MODERATOR`, `ADMIN`
* **Mục tiêu:** Đối soát ảnh 2 mặt CCCD và giấy phép sở hữu trọ trước khi cấp quyền đăng bài.

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ HÀNG ĐỢI DUYỆT KYC CHỦ NHÀ TRỌ (5 hồ sơ chờ duyệt)                 SLA Mục tiêu: < 4h │
├────────────────────────────────────────────────────────┬───────────────────────────────┤
│ DANH SÁCH CHỦ TRỌ NỘP HỒ SƠ:                           │ KHUNG ĐỐI SOÁT CHI TIẾT (MODAL│
│ • [Chờ] Nguyễn Văn Chủ  · Nộp: 10 phút trước  <-- Chọn │ Chủ trọ: Nguyễn Văn Chủ       │
│ • [Chờ] Lê Thị Mai      · Nộp: 45 phút trước           │ CCCD: 001099012345 · SĐT: 0903│
│ • [Chờ] Hoàng Văn Nam   · Nộp: 1.5 giờ trước           │                               │
│                                                        │ [Ảnh Mặt Trước CCCD Phóng To] │
│                                                        │ [Ảnh Mặt Sau CCCD Phóng To]   │
│                                                        │ [Ảnh Sổ Đỏ / HĐ Quản Lý Trọ]  │
│                                                        │                               │
│                                                        │ QUYẾT ĐỊNH DUYỆT:             │
│                                                        │ [ ✅ PHÊ DUYỆT CẤP QUYỀN ]    │
│                                                        │ [ ❌ TỪ CHỐI KÈM LÝ DO... ]   │
│                                                        │ Lý do từ chối: [Ảnh CCCD mờ ] │
└────────────────────────────────────────────────────────┴───────────────────────────────┘
```

---

### SCR-14: Hàng Đợi Duyệt Tin Phòng & Cờ Lệch Giá AI (Room Moderation Queue)
* **Route:** `/mod/rooms` | **Vai trò truy cập:** `MODERATOR`, `ADMIN`
* **Mục tiêu:** Chặn tin ảo, ảnh mạng và tự động bật cờ cảnh báo `FLAG_HIGH_PRICE` nếu giá lệch $>35\%$ so với AI.

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ HÀNG ĐỢI KIỂM DUYỆT BÀI ĐĂNG PHÒNG TRỌ (12 tin chờ duyệt)                              │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ TIN ĐĂNG #120: Phòng Studio 28m2 Cầu Giấy                                              │
│ Chủ trọ: Nguyễn Văn Chủ (Đã xác minh KYC 🛡️)  ·  Tọa độ GPS: 21.036237, 105.790583    │
│                                                                                        │
│ ĐỐI SOÁT ĐỊNH GIÁ AI LIGHTGBM:                                                         │
│ • Giá chủ đặt: 3,200,000 đ                                                             │
│ • Giá gợi ý AI: 3,250,000 đ [Khoảng: 3.0M - 3.5M]                                      │
│ • Độ chênh lệch: -1.5% (Mức giá chuẩn thị trường ✅)                                   │
│                                                                                        │
│ KIỂM TRA ALBUM ẢNH PHÒNG TRỌ (CHỐNG ẢNH MẠNG / TIN ẢO):                                │
│ [Ảnh 1: Phòng thực]  [Ảnh 2: Khu bếp thật]  [Ảnh 3: Nhà tắm]   [Ảnh 4: Ban công]       │
│                                                                                        │
│ [ 🚀 PHÊ DUYỆT XUẤT BẢN TIN LÊN SÀN ]   [ ❌ TỪ CHỐI BÀI ĐĂNG (Nhập lý do) ]           │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

### SCR-15: Phân Xử Khiếu Nại Tranh Chấp Cọc (Dispute Adjudication)
* **Route:** `/mod/disputes` | **Vai trò truy cập:** `MODERATOR`, `ADMIN`
* **Mục tiêu:** So sánh ảnh hiện trường khách gửi vs ảnh duyệt ban đầu để ra phán quyết Hoàn cọc 100% hoặc Giải ngân.

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ PHÂN XỬ TRANH CHẤP ĐƠN CỌC #BK-202611-0089 · Số tiền tranh chấp: 500,000 VNĐ           │
├──────────────────────────────────────────┬─────────────────────────────────────────────┤
│ ẢNH TIN ĐĂNG GỐC LÚC SÀN DUYỆT:          │ BẰNG CHỨNG THỰC TẾ KHÁCH TẢI LÊN LÚC ĐẾN XEM│
│ [Ảnh góc tường sạch sẽ sơn trắng]        │ [Ảnh góc tường thực tế ẩm mốc, bong tróc]   │
│                                          │ [Video điều hòa bật không lên nguồn]        │
│                                          │                                             │
│ LỜI KHAI CỦA KHÁCH THUÊ:                 │ LỜI KHAI CỦA CHỦ TRỌ:                       │
│ "Em đến xem thấy tường mốc nặng và điều  │ "Phòng vừa bị thấm sau cơn mưa hôm qua, tôi │
│ hòa hỏng, bác chủ không chịu sửa chữa."  │ sẽ sơn lại sau 3 ngày nữa."                 │
│                                          │                                             │
│ ──────────────────────────────────────── │ ─────────────────────────────────────────── │
│ PHÁN QUYẾT CỦA KIỂM DUYỆT VIÊN (MODERATOR):                                            │
│ [ 💸 CHẤP THUẬN KHIẾU NẠI - KÍCH HOẠT VNPAY HOÀN TIỀN CỌC 100% CHO KHÁCH THUÊ ]        │
│ [ ⚖️ BÁC KHIẾU NẠI - GIẢI NGÂN CHO CHỦ TRỌ (Khách bùng hẹn không lý do) ]               │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

### SCR-16: Quản Trị Người Dùng & Khóa Tài Khoản (User Admin & Suspension)
* **Route:** `/admin/users` | **Vai trò truy cập:** `ADMIN`
* **Mục tiêu:** Quản trị toàn bộ tài khoản, tìm kiếm theo email/SĐT, phân quyền Moderator và khóa tài khoản gian lận.

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ QUẢN TRỊ NGƯỜI DÙNG TOÀN SÀN                                  [ 🔍 Tìm email / SĐT ]  │
├──────┬──────────────────────┬─────────────┬───────────┬──────────────┬─────────────────┤
│ ID   │ Họ tên & Email       │ Số ĐT       │ Vai trò   │ Trạng thái   │ Thao tác        │
├──────┼──────────────────────┼─────────────┼───────────┼──────────────┼─────────────────┤
│ #001 │ admin@smartrental.vn │ 0901234567  │ ADMIN     │ Hoạt động ✅ │ [Xem chi tiết]  │
│ #002 │ moderator@smartrent..│ 0902345678  │ MODERATOR │ Hoạt động ✅ │ [Đổi vai trò]   │
│ #003 │ landlord@smartrent...│ 0903456789  │ LANDLORD  │ Hoạt động ✅ │ [Xem 8 phòng]   │
│ #089 │ scammer@gmail.com    │ 0988776655  │ LANDLORD  │ [BỊ KHÓA ❌] │ [ 🔒 MỞ KHÓA ]  │
│      │ (Lừa cọc ảo 2 lần)   │             │           │              │                 │
└──────┴──────────────────────┴─────────────┴───────────┴──────────────┴─────────────────┘
```

---

### SCR-17: Dashboard Báo Cáo Doanh Thu Sàn (Admin Financial Dashboard)
* **Route:** `/admin/dashboard` | **Vai trò truy cập:** `ADMIN`
* **Mục tiêu:** Giám sát tổng tiền cọc đang lưu ký, hoa hồng sàn, tỷ lệ phòng trống theo quận huyện và SLA kiểm duyệt.

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ DASHBOARD QUẢN TRỊ TỔNG THỂ SÀN SMART RENTAL                    [ Tháng 11/2026 v ]    │
├────────────────────┬────────────────────┬────────────────────┬─────────────────────────┤
│ TIỀN CỌC ĐANG LƯU KÝ│ DOANH THU HOA HỒNG │ TỶ LỆ PHÒNG TRỐNG  │ SLA DUYỆT TIN TRUNG BÌNH│
│ 420,500,000 VNĐ    │ 68,200,000 VNĐ     │ 14.2%              │ 1 giờ 45 phút           │
│ [ ▲ +12% tuần này ]│ [ ▲ +18.5% tháng ] │ [ Giảm 3% so tháng]│ [ Đạt KPI < 4h ✅ ]     │
├────────────────────┴────────────────────┴────────────────────┴─────────────────────────┤
│ BIỂU ĐỒ DOANH THU HOA HỒNG THEO TUẦN (CHART.JS)          TỶ LỆ PHÂN BỔ PHÒNG THEO QUẬN │
│ 80M ┤                                                    • Cầu Giấy:    38%            │
│ 60M ┤          ╭──╮                                      • Đống Đa:     26%            │
│ 40M ┤    ╭─────╯  ╰─────╮                                • Hai Bà Trưng:20%            │
│ 20M ┼────╯              ╰──────                          • Thanh Xuân:  16%            │
│     T1    T2    T3    T4 (Tháng 11)                                                    │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

# PHẦN 5: GIAO TIẾP DÙNG CHUNG (COMMUNICATION)

---

### SCR-18: Cửa Sổ Chat Trực Tiếp Khách - Chủ (Real-time In-App Messaging)
* **Route:** `/chat` | **Vai trò truy cập:** `TENANT`, `LANDLORD`
* **Mục tiêu:** Nhắn tin thời gian thực qua WebSocket STOMP kèm Header hiển thị tóm tắt phòng trọ đang trao đổi.

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ CỬA SỔ NHẮN TIN TRỰC TIẾP KHÁCH - CHỦ                                                  │
├───────────────────────────────┬────────────────────────────────────────────────────────┤
│ DANH SÁCH HỘI THOẠI           │ 🏠 [ẢNH] PHÒNG STUDIO CẦU GIẤY 28M2 · 3,200,000 đ/th   │
│                               │ Đang bàn về đơn cọc: #BK-202611-0089 [ĐANG GIỮ CỌC 48H]│
│ • Nguyễn Văn Chủ (Chủ trọ)    ├────────────────────────────────────────────────────────┤
│   "Hẹn em chiều 17h qua nhé"  │ [Chủ trọ 14:15]: Chào em, phòng này đang có nóng lạnh │
│   [Badge: 1 tin mới 🔴]       │                  và điều hòa mới lắp nhé.              │
│                               │                                                        │
│ • Trần Thị Mai (Khách thuê)   │ [Bạn 14:18]: Dạ chiều nay 17h30 em qua xem thực tế     │
│   "Cho em hỏi giờ giấc..."    │              được không ạ?                             │
│                               │                                                        │
│ • Lê Văn Hoàng                │ [Chủ trọ 14:20]: Được em nhé, đến ngõ 165 Cầu Giấy alo │
│   "Phòng còn trống không anh?"│                  bác ra đón.                           │
│                               ├────────────────────────────────────────────────────────┤
│                               │ [ 📎 Gửi ảnh hiện trường ]  [ 📍 Gửi vị trí bản đồ ]    │
│                               │ [ Nhập tin nhắn gửi đến Nguyễn Văn Chủ...        ] [ 🚀]│
└───────────────────────────────┴────────────────────────────────────────────────────────┘
```

