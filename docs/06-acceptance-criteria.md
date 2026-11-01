# Tiêu Chí Nghiệm Thu Chi Tiết (Acceptance Criteria — Smart Rental V1)

> **Dự án:** Sàn Cho Thuê Phòng Trọ Thông Minh (Smart Rental Platform)  
> **Trạng thái thiết kế:** TARGET V1 BASELINE  
> **Tài liệu nguồn ánh xạ:** [03-use-cases.md](03-use-cases.md) | [08-invest-requirements.md](08-invest-requirements.md) | [openapi.yaml](api/openapi.yaml)

Các tiêu chí này định nghĩa hành vi nghiệp vụ mục tiêu mà tầng Backend API (Spring Boot 3) và Frontend (React 19) bắt buộc phải tuân thủ và vượt qua các bài kiểm thử tự động (Unit / Integration Tests) trước khi bàn giao.

---

## AC-UC01 — Đăng Ký & Đăng Nhập (Login & Register)

* **Đăng ký:**
  - Nhập đầy đủ email, mật khẩu (tối thiểu 8 ký tự, gồm chữ hoa, số, ký tự đặc biệt), họ tên, SĐT, và vai trò (`TENANT` hoặc `LANDLORD`) -> Trả về `201 Created` kèm JWT Access Token và Refresh Token.
  - Email hoặc SĐT đã tồn tại -> Trả về `409 Conflict` kèm thông báo lỗi rõ ràng.
  - Mật khẩu yếu hoặc thiếu trường bắt buộc -> Trả về `400 Bad Request`.
* **Đăng nhập:**
  - Thông tin đăng nhập chính xác của tài khoản đang hoạt động (`is_active = true`) -> Trả về `200 OK`, Access Token (30 phút), Refresh Token (7 ngày) và thông tin User Profile an toàn (không chứa mật khẩu).
  - Sai mật khẩu hoặc email không tồn tại -> Trả về `401 Unauthorized`.
  - Tài khoản bị khóa (`is_active = false`) -> Trả về `403 Forbidden` kèm mã `ACCOUNT_DISABLED`.
* **Bảo vệ Endpoint:**
  - Mọi yêu cầu thiếu Bearer Token hoặc Token hết hạn gửi đến các endpoint bảo vệ -> Trả về `401 Unauthorized`.

---

## AC-UC02 — Quản Lý Hồ Sơ & Đổi Mật Khẩu (Profile & Password)

* Người dùng đã đăng nhập có thể xem và cập nhật thông tin cá nhân (`full_name`, `phone_number`, `avatar_url`) của chính mình -> Trả về `200 OK`.
* Người dùng không thể tự thay đổi vai trò (`role`) hoặc trạng thái hoạt động qua API profile.
* Đổi mật khẩu bắt buộc cung cấp mật khẩu cũ chính xác và mật khẩu mới thỏa mãn chính sách bảo mật -> Trả về `200 OK`. Nếu sai mật khẩu cũ -> Trả về `400 Bad Request`. Mật khẩu mới được băm bằng BCrypt và không bao giờ trả về trong phản hồi.

---

## AC-UC03 — Nộp Hồ Sơ Xác Minh KYC Chủ Trọ (Submit KYC)

* Chỉ tài khoản có vai trò `LANDLORD` với trạng thái `kyc_status = UNVERIFIED` mới được nộp hồ sơ KYC.
* Yêu cầu bắt buộc: Số CCCD (đúng 12 chữ số), ảnh mặt trước CCCD, ảnh mặt sau CCCD, và ảnh giấy tờ chứng minh quyền sở hữu/ủy quyền quản lý trọ.
* Nộp thành công -> Tạo bản ghi `landlord_kyc`, cập nhật trạng thái `kyc_status = PENDING_VERIFICATION`, trả về `201 Created` và đưa vào hàng đợi kiểm duyệt.

---

## AC-UC04 — Phê Duyệt Hồ Sơ KYC Chủ Trọ (Approve/Reject KYC)

* Chỉ `MODERATOR` và `ADMIN` mới có quyền gọi API duyệt/từ chối KYC. Các vai trò khác gọi -> Trả về `403 Forbidden`.
* **Phê duyệt:** Moderator nhấn Duyệt -> Bản ghi KYC cập nhật `reviewed_by`, `reviewed_at`; tài khoản chủ trọ chuyển sang `kyc_status = VERIFIED` -> Trả về `200 OK` và mở khóa quyền đăng tin.
* **Từ chối:** Moderator bắt buộc nhập lý do từ chối (tối thiểu 10 ký tự) -> Cập nhật `kyc_status = REJECTED`, lưu lý do phản hồi cho chủ trọ sửa đổi.

---

## AC-UC05 — Tạo & Quản Lý Tin Đăng Phòng Trọ (Room Management)

* Chỉ Chủ trọ đã được xác minh (`kyc_status = VERIFIED`) mới được phép tạo tin đăng mới. Chủ trọ chưa duyệt gọi API -> Trả về `403 Forbidden` kèm mã `KYC_REQUIRED`.
* Dữ liệu hợp lệ: Tiêu đề (10-255 ký tự), địa chỉ chi tiết, diện tích $> 0$, giá thuê $ge 0$, tiền cọc $ge 0$, giá điện nước $ge 0$, tối thiểu 3 ảnh thực tế -> Tạo bản ghi phòng với trạng thái `PENDING_APPROVAL` và trả về `201 Created`.
* Chủ trọ chỉ có quyền sửa, đổi trạng thái (`AVAILABLE`, `RENTED`, `MAINTENANCE`) hoặc xóa mềm các phòng do chính mình sở hữu. Cố tình sửa phòng người khác -> Trả về `403 Forbidden`.

---

## AC-UC06 — Dự Đoán Giá Phòng Thời Gian Thực (AI LightGBM)

* Nhận vector đặc trưng: Diện tích, Quận/Huyện, Loại phòng, Số người ở tối đa, Khoảng cách trường ĐH, và Danh mục tiện nghi (Điều hòa, Nóng lạnh, Máy giặt, Ban công, Thang máy, Giờ tự do).
* Gọi AI Microservice (FastAPI) tính toán và phản hồi trong thời gian $< 200ms$ -> Trả về `200 OK` kèm `predictedPrice`, `priceMin`, `priceMax`, và `confidenceScore`.
* Thiếu trường đặc trưng bắt buộc -> Trả về `400 Bad Request`. Nếu AI Service gặp sự cố tạm thời -> Backend tự động fallback sử dụng giá trung bình của quận huyện đó.

---

## AC-UC07 — Phê Duyệt Bài Đăng Phòng Trọ (Room Moderation)

* Chỉ `MODERATOR` và `ADMIN` có quyền truy cập hàng đợi duyệt tin (`GET /mod/rooms`).
* Hệ thống tự động đánh dấu cờ cảnh báo `FLAG_HIGH_PRICE` trên giao diện duyệt nếu giá niêm yết của chủ trọ cao hơn $> 35\%$ so với giá gợi ý của LightGBM.
* Moderator kiểm tra ảnh thực tế, tọa độ bản đồ và chọn:
  - **Phê duyệt:** Trạng thái phòng chuyển sang `AVAILABLE`, xuất hiện công khai trên sàn -> Trả về `200 OK`.
  - **Từ chối:** Bắt buộc nhập lý do (ảnh mạng, sai địa chỉ, giá bất hợp lý) -> Trạng thái phòng chuyển sang `REJECTED`.

---

## AC-UC08 — Tìm Kiếm & Lọc Phòng Đa Tiêu Chí (Search & Filters)

* Công khai cho mọi người dùng (kể cả chưa đăng nhập).
* Hỗ trợ tìm kiếm kết hợp: Theo bán kính trường ĐH (`universityId` + `radiusKm`), theo Quận (`districtId`), khoảng giá (`minPrice`, `maxPrice`), diện tích và tiện nghi Boolean.
* Truy vấn chỉ trả về các phòng có trạng thái `AVAILABLE` và chưa bị xóa mềm (`deleted_at IS NULL`).
* Thời gian phản hồi truy vấn tìm kiếm $< 300ms$ nhờ chỉ mục PostGIS/Composite Index. Kết quả phân trang mặc định 12 phòng/trang.

---

## AC-UC09 — Xem Chi Tiết Phòng & Bản Đồ Số (Room Detail & Map)

* Hiển thị đầy đủ: Album ảnh, tọa độ bản đồ số tương tác, bảng kê chi phí điện/kWh, nước/m3, wifi, thông tin chủ trọ kèm badge KYC.
* Hiển thị widget trực quan đo giá: So sánh giá chủ trọ đặt với khoảng giá khuyến nghị của AI LightGBM.
* Nếu phòng không tồn tại hoặc đã bị xóa mềm -> Trả về `404 Not Found`.

---

## AC-UC10 — Gợi Ý Phòng Cá Nhân Hóa (AI Recommendations)

* Người thuê đã đăng nhập truy cập endpoint `GET /api/v1/rooms/recommendations` -> Hệ thống phân tích lịch sử click xem phòng và bookmark trong 30 ngày gần nhất để gợi ý Top 10 phòng tương đồng nhất.
* Đối với tài khoản mới chưa có lịch sử tương tác (Cold-Start) -> Tự động fallback trả về danh sách các phòng có điểm đánh giá sao cao nhất quanh các trường đại học lớn.

---

## AC-UC11 — Trợ Lý Ảo Tư Vấn 24/7 (AI Chatbot)

* Người dùng gửi câu hỏi qua `POST /api/v1/ai/chat` kèm `roomId` tùy chọn -> Chatbot phân tích trường tiện ích và nội quy phòng để trả về câu trả lời chính xác trong $< 500ms$.

---

## AC-UC12 — Đặt Cọc Ký Quỹ Escrow Qua VNPAY (Escrow Booking)

* Chỉ tài khoản vai trò `TENANT` mới được phép tạo đơn cọc.
* Phòng bắt buộc phải đang ở trạng thái `AVAILABLE`. Nếu phòng đang ở trạng thái `RESERVED` hoặc `RENTED` -> Trả về `409 Conflict` kèm mã `ROOM_NOT_AVAILABLE`.
* Khách bấm đặt cọc -> Sinh đơn cọc ở trạng thái `PENDING_PAYMENT` và chuyển hướng sang cổng VNPAY Sandbox.
* Webhook IPN từ VNPAY xác thực chữ ký HMAC SHA512 thành công -> Đơn cọc chuyển sang `ESCROW_HOLDING`, phòng tự động chuyển sang `RESERVED`, thời hạn tạm giữ tiền cọc được thiết lập là 48 giờ.
* Sau khi khách đến nhận phòng thành công trong 48h, hai bên ký hợp đồng -> Gọi `POST /bookings/{id}/confirm-checkin` -> Giải ngân tiền cọc cho chủ trọ, đơn cọc chuyển sang `COMPLETED`, phòng chuyển sang `RENTED`.

---

## AC-UC13 — Xử Lý Khiếu Nại Tranh Chấp Cọc (Dispute & Refund)

* Người thuê chỉ có quyền gửi khiếu nại trong vòng 24 giờ sau giờ hẹn xem phòng nếu phòng thực tế sai lệch mô tả (ẩm mốc, thiếu điều hòa) kèm bằng chứng ảnh/video. Quá 24h -> Chặn khiếu nại và trả về `400 Bad Request`.
* Trạng thái đơn cọc chuyển sang `DISPUTED`.
* Moderator tiếp nhận hồ sơ, đối chiếu bằng chứng với ảnh tin đăng lúc duyệt:
  - Nếu khiếu nại đúng: Moderator bấm "Chấp thuận hoàn tiền" -> Kích hoạt VNPAY Refund API hoàn trả 100% tiền cọc cho khách, đơn cọc chuyển sang `REFUNDED`, phòng bị gắn cờ xử lý chủ trọ.
  - Nếu khiếu nại vô lý (khách tự ý bùng hẹn): Moderator bác khiếu nại -> Giải ngân tiền cọc cho chủ trọ để bù đắp chi phí giữ phòng trống.

---

## AC-UC14 — Nhắn Tin Thời Gian Thực (In-app Chat)

* Cho phép khách thuê và chủ trọ trao đổi trực tiếp qua kênh WebSocket STOMP bảo mật.
* Tin nhắn được lưu trữ bền vững vào bảng `messages` trong PostgreSQL; hỗ trợ phân trang lịch sử tin nhắn.
* Người dùng không thể xem trộm lịch sử hội thoại của người khác -> Vi phạm trả về `403 Forbidden`.

---

## AC-UC15 — Đánh Giá 2 Bước Sau Lưu Trú (Verified Reviews)

* Chỉ khách thuê có đơn cọc ở trạng thái `booking_status = COMPLETED` tại phòng đó mới được phép gửi đánh giá. Nếu chưa từng thuê phòng -> Trả về `403 Forbidden` kèm mã `STAY_VERIFICATION_REQUIRED`.
* Chấm điểm bắt buộc cả 4 tiêu chí (`rating_security`, `rating_cleanliness`, `rating_utilities`, `rating_landlord`) từ 1 đến 5 sao kèm bình luận.
* Mỗi đơn cọc chỉ được đánh giá duy nhất 1 lần (ràng buộc Unique `booking_id`). Cố tình đánh giá lần 2 -> Trả về `409 Conflict`.

---

## AC-UC16 — Quản Trị Người Dùng & Khóa Tài Khoản (User Admin)

* Chỉ `ADMIN` mới có quyền xem danh sách toàn bộ người dùng, tìm kiếm theo email/SĐT, phân vai trò Moderator hoặc khóa tài khoản.
* Khi tài khoản bị khóa (`is_active = false`) -> Thu hồi phiên đăng nhập tức thì; mọi request tiếp theo của người này đều bị từ chối với `403 Forbidden`.

---

## AC-UC17 — Dashboard Thống Kê & Báo Cáo Doanh Thu (Admin Analytics)

* Chỉ `ADMIN` mới có quyền truy cập endpoint `GET /api/v1/admin/dashboard/stats`.
* Tổng hợp chính xác: Tổng tiền cọc đang ký quỹ, tổng doanh thu hoa hồng sàn thu được, tỷ lệ tin đăng duyệt/từ chối, và tỷ lệ phòng trống theo từng quận huyện. Dữ liệu tính toán từ các bản ghi thực tế trong PostgreSQL.

---

## Definition of Ready for Implementation (Tiêu Chuẩn Sẵn Sàng Lập Trình)

Một tính năng chỉ được coi là sẵn sàng để lập trình viên bắt tay viết mã khi thỏa mãn 5 điều kiện:
1. Đã có User Story chuẩn INVEST và kịch bản nghiệm thu tương ứng trong tài liệu này.
2. Đã có đặc tả đầy đủ Endpoint, Request Body, Response Schema và mã lỗi trong [`docs/api/openapi.yaml`](api/openapi.yaml).
3. Đã có bảng dữ liệu, trường, kiểu dữ liệu và khóa ngoại trong [`src/database/schema.sql`](../src/database/schema.sql).
4. Đã phân định rõ quyền truy cập (RBAC) cho 4 vai trò.
5. Đã định nghĩa lớp Service, Repository và DTO tương ứng trong [`docs/07-folder-structure.md`](07-folder-structure.md).
