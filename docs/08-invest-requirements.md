# Yêu Cầu Người Dùng Chuẩn INVEST — Smart Rental Platform V1

> **Trạng thái thiết kế:** TARGET V1 BASELINE  
> **Kiến trúc liên quan:** Java Spring Boot 3 + React 19 + Python FastAPI (LightGBM) + PostgreSQL 16  
> **Tài liệu tham chiếu:** [`docs/03-use-cases.md`](./03-use-cases.md) | [`docs/01-scope.md`](./01-scope.md)

---

## 1. Tiêu Chuẩn Đánh Giá INVEST

Mỗi User Story trong danh mục yêu cầu bắt buộc phải thỏa mãn 6 tiêu chí của mô hình **INVEST**:

| Tiêu Chí | Ý Nghĩa Trong Dự Án Smart Rental |
| :--- | :--- |
| **Independent (Độc lập)** | Mỗi Story có thể được triển khai, kiểm thử và bàn giao độc lập mà không bị chặn chéo, chỉ phụ thuộc vào hạ tầng xác thực cơ sở. |
| **Negotiable (Thương lượng)** | Giao diện và chi tiết tối ưu hóa có thể linh hoạt điều chỉnh, nhưng mục tiêu nghiệp vụ và phân quyền phải được giữ vững. |
| **Valuable (Có giá trị)** | Mỗi Story đều mang lại giá trị rõ ràng cho một trong 4 nhóm tác nhân (Admin, Moderator, Landlord, Tenant). |
| **Estimable (Ước lượng được)** | Đầu vào, đầu ra, dữ liệu và các luồng ngoại lệ đều được đặc tả chi tiết để đội ngũ kỹ thuật có thể ước lượng độ phức tạp. |
| **Small (Nhỏ gọn)** | Kích thước mỗi Story vừa vặn để hoàn thành trong 1-2 ngày công (Sprint task), chia rõ tầng Backend, AI, Database và UI. |
| **Testable (Kiểm thử được)** | Mọi Story đều đi kèm bộ tiêu chí nghiệm thu (Acceptance Criteria) viết theo định dạng chuẩn **Given - When - Then** (Gherkin). |

---

## 2. Danh Mục 17 User Stories (Product Backlog V1)

| Mã | User Story (Chuẩn Agile) | Giá Trị Nghiệp Vụ (Value) | Phụ Thuộc (Deps) | Mã Tiêu Chí Nghiệm Thu |
| :---: | :--- | :--- | :---: | :---: |
| **US01** | Là một người dùng, tôi muốn đăng nhập qua JWT để truy cập an toàn vào khu vực làm việc theo đúng vai trò của mình. | Bảo mật truy cập | Tài khoản đã tạo | AC-US01 |
| **US02** | Là một người dùng đã đăng nhập, tôi muốn đổi mật khẩu và cập nhật hồ sơ để bảo vệ tài khoản cá nhân. | Tự phục vụ tài khoản | US01 | AC-US02 |
| **US03** | Là một Chủ trọ (Landlord), tôi muốn tải ảnh CCCD và giấy tờ sở hữu để nộp hồ sơ xác minh KYC. | Đạt chuẩn để đăng tin | US01 | AC-US03 |
| **US04** | Là một Kiểm duyệt viên (Moderator), tôi muốn xem và duyệt hồ sơ KYC của Chủ trọ để đảm bảo chỉ chủ thật mới được đăng tin. | Chống chủ trọ "ma" | US03 | AC-US04 |
| **US05** | Là một Chủ trọ đã duyệt KYC, tôi muốn đăng tin phòng mới kèm ảnh và tiện nghi để tiếp cận khách thuê. | Tạo nguồn cung phòng | US04 | AC-US05 |
| **US06** | Là một Chủ trọ hoặc Khách thuê, tôi muốn xem giá gợi ý từ AI LightGBM để biết mức giá thuê có hợp lý với thị trường hay không. | Chống hét giá / định giá hớ | Dữ liệu phòng | AC-US06 |
| **US07** | Là một Kiểm duyệt viên, tôi muốn đối soát tin đăng phòng và so sánh với giá AI để phê duyệt tin sạch lên sàn. | Chấm dứt tin ảo | US05, US06 | AC-US07 |
| **US08** | Là một Khách thuê (Tenant), tôi muốn tìm kiếm và lọc phòng theo trường ĐH, giá, diện tích để nhanh chóng tìm thấy phòng ưng ý. | Khám phá phòng tối ưu | US07 | AC-US08 |
| **US09** | Là một Khách thuê, tôi muốn xem vị trí phòng trên bản đồ số và bảng kê chi phí điện nước để có thông tin minh bạch trước khi đến xem. | Minh bạch thông tin | US08 | AC-US09 |
| **US10** | Là một Khách thuê, tôi muốn nhận danh sách phòng gợi ý cá nhân hóa từ AI dựa trên lịch sử xem để tiết kiệm thời gian tìm kiếm. | Cá nhân hóa trải nghiệm | US08, Tương tác | AC-US10 |
| **US11** | Là một Khách thuê, tôi muốn hỏi đáp với Trợ lý ảo AI Chatbot để được giải đáp 24/7 về tiện ích xung quanh phòng trọ. | Phản hồi tức thì 24/7 | Dữ liệu phòng | AC-US11 |
| **US12** | Là một Khách thuê, tôi muốn đặt cọc giữ chỗ 48h qua cổng VNPAY an toàn để không bị chủ trọ cho người khác thuê mất. | Bảo vệ tiền đặt cọc | US09, Cổng VNPAY | AC-US12 |
| **US13** | Là một Khách thuê hoặc Moderator, tôi muốn gửi và phân xử khiếu nại cọc để được hoàn tiền 100% nếu phòng thực tế sai lệch mô tả. | Chống lừa đảo cọc | US12 | AC-US13 |
| **US14** | Là một Khách thuê hoặc Chủ trọ, tôi muốn nhắn tin trực tiếp trong hệ thống để trao đổi chi tiết và gửi ảnh hẹn xem phòng. | Kết nối thời gian thực | US01 | AC-US14 |
| **US15** | Là một Khách thuê đã nhận phòng thành công, tôi muốn viết đánh giá 4 tiêu chí để chia sẻ trải nghiệm thực tế cho cộng đồng. | Tạo độ tin cậy xã hội | US12 (Đã thuê) | AC-US15 |
| **US16** | Là một Quản trị viên (Admin), tôi muốn quản lý danh sách người dùng và khóa tài khoản vi phạm để duy trì kỷ cương của sàn. | An toàn hệ thống | US01 | AC-US16 |
| **US17** | Là một Quản trị viên, tôi muốn xem Dashboard doanh thu cọc, phí sàn và tỷ lệ phòng trống để nắm bắt tình hình kinh doanh. | Ra quyết định quản trị | Dữ liệu giao dịch | AC-US17 |

---

## 3. Ma Trận Đánh Giá INVEST Cho Toàn Bộ 17 User Stories

*Quy ước:* `PASS` xác nhận User Story thỏa mãn đầy đủ tiêu chuẩn thiết kế kiến trúc và có thể đưa vào lập trình kiểm thử độc lập.

| Story | I | N | V | E | S | T | Kết Luận | Ghi Chú Kỹ Thuật (Architecture & Scope Constraints) |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| **US01** | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** | Sử dụng JWT Bearer (Access Token 30m, Refresh Token 7d), mã hóa BCrypt. |
| **US02** | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** | Kiểm tra mật khẩu cũ hợp lệ trước khi băm mật khẩu mới; cập nhật avatar qua Cloudinary. |
| **US03** | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** | Upload tối thiểu 2 ảnh CCCD (mặt trước/sau), lưu trạng thái `PENDING_VERIFICATION`. |
| **US04** | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** | Phân quyền nghiêm ngặt chỉ `MODERATOR` và `ADMIN` được gọi API duyệt/từ chối KYC. |
| **US05** | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** | Chặn API tạo phòng nếu Chủ trọ chưa có trạng thái `VERIFIED_LANDLORD`. |
| **US06** | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** | Gọi Microservice Python FastAPI qua REST API, thời gian phản hồi định giá $< 150ms$. |
| **US07** | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** | Gắn cờ cảnh báo nếu giá chênh $> 35\%$ so với LightGBM; chuyển trạng thái sang `APPROVED`. |
| **US08** | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** | Tối ưu hóa truy vấn địa lý qua PostGIS/GiST Index trên PostgreSQL 16. |
| **US09** | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** | Tích hợp Leaflet / Mapbox; hiển thị minh bạch bảng giá điện, nước, internet. |
| **US10** | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** | Recommender kết hợp Content-based + Collaborative Filtering; có cơ chế xử lý Cold-Start. |
| **US11** | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** | Chatbot truy vấn trực tiếp thông tin phòng và tiện ích từ cơ sở dữ liệu. |
| **US12** | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** | Tích hợp VNPAY Sandbox; cơ chế Ký quỹ Escrow giữ tiền 48h và khóa trạng thái `RESERVED`. |
| **US13** | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** | Cho phép khiếu nại trong vòng 24h sau giờ hẹn xem phòng; hoàn cọc qua VNPAY Refund API. |
| **US14** | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** | Sử dụng WebSocket STOMP qua Spring WebSocket, lưu trữ lịch sử tin nhắn trong PostgreSQL. |
| **US15** | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** | Ràng buộc cơ sở dữ liệu: Chỉ người có `booking_status = COMPLETED` mới được insert review. |
| **US16** | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** | Admin kích hoạt/vô hiệu hóa tài khoản; thu hồi token tức thì qua Redis/Flag trong DB. |
| **US17** | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** | Tổng hợp dữ liệu bằng SQL Aggregate View, hiển thị biểu đồ trực quan qua React Chart.js. |

---

## 4. Tiêu Chí Nghiệm Thu Chi Tiết (Full 17 Acceptance Criteria — Gherkin Format)

### AC-US01: Đăng Nhập & Cấp Quyền (Authentication)
```gherkin
Scenario: Đăng nhập thành công với thông tin chính xác
  Given Người dùng có tài khoản hợp lệ với email "tenant@smartrental.vn" và mật khẩu "P@ssword123"
  When Người dùng gửi yêu cầu đăng nhập POST /api/v1/auth/login
  Then Hệ thống phản hồi mã 200 OK
  And Trả về JWT Access Token và thông tin vai trò "TENANT"

Scenario: Đăng nhập thất bại do sai mật khẩu
  Given Người dùng nhập sai mật khẩu 5 lần liên tiếp
  When Người dùng gửi yêu cầu đăng nhập
  Then Hệ thống phản hồi mã 401 Unauthorized kèm thông báo lỗi
```

### AC-US02: Đổi Mật Khẩu & Cập Nhật Hồ Sơ (Profile & Password)
```gherkin
Scenario: Đổi mật khẩu thành công
  Given Người dùng đã đăng nhập gửi mật khẩu cũ đúng và mật khẩu mới thỏa mãn độ phức tạp (tối thiểu 8 ký tự, gồm chữ hoa, số, ký tự đặc biệt)
  When Gửi yêu cầu PUT /api/v1/users/password
  Then Hệ thống cập nhật mật khẩu đã băm (BCrypt) và trả về 200 OK
```

### AC-US03: Nộp Hồ Sơ Xác Minh KYC Chủ Trọ (Submit KYC)
```gherkin
Scenario: Nộp đủ ảnh mặt trước, mặt sau CCCD và giấy phép
  Given Chủ trọ có trạng thái tài khoản là "UNVERIFIED"
  When Chủ trọ tải lên 2 ảnh CCCD và 1 ảnh giấy xác nhận quyền sở hữu phòng (định dạng JPG/PNG < 5MB)
  Then Hệ thống tạo bản ghi KYC với trạng thái "PENDING_VERIFICATION"
  And Trả về thông báo "Hồ sơ của bạn đang được kiểm duyệt trong 24h"
```

### AC-US04: Phê Duyệt Hồ Sơ KYC Chủ Trọ (Approve/Reject KYC)
```gherkin
Scenario: Moderator phê duyệt hồ sơ KYC hợp lệ
  Given Moderator mở hàng đợi KYC và kiểm tra ảnh CCCD hợp lệ
  When Moderator nhấn "Phê duyệt"
  Then Hệ thống cập nhật vai trò Chủ trọ thành "VERIFIED_LANDLORD"
  And Gửi thông báo mở khóa tính năng đăng tin cho Chủ trọ
```

### AC-US05: Tạo & Đăng Tin Phòng Mới (Create Room Listing)
```gherkin
Scenario: Đăng tin phòng mới đầy đủ thông tin
  Given Chủ trọ có trạng thái "VERIFIED_LANDLORD"
  When Nhập tiêu đề, diện tích 25m2, giá 3.2M, địa chỉ Cầu Giấy và tải lên 4 ảnh phòng
  Then Hệ thống tạo phòng ở trạng thái "PENDING_APPROVAL" và đưa vào hàng đợi duyệt tin
```

### AC-US06: Dự Đoán Giá Phòng AI LightGBM (Real-time Price Prediction)
```gherkin
Scenario: Dự đoán khoảng giá khuyến nghị
  Given Chủ trọ nhập: Diện tích 25m2, Quận Cầu Giấy, có điều hòa, nóng lạnh, máy giặt
  When Bấm "Tham khảo giá gợi ý AI"
  Then Hệ thống gọi AI Service LightGBM và phản hồi < 200ms
  And Hiển thị mức giá dự đoán 3,250,000 VNĐ cùng khoảng gợi ý [3,000,000 - 3,500,000 VNĐ]
```

### AC-US07: Phê Duyệt Tin Phòng Trọ (Moderate Listing)
```gherkin
Scenario: Moderator duyệt bài đăng phòng hợp lệ
  Given Moderator kiểm tra ảnh thực tế, địa chỉ GPS và giá phòng không chênh lệch bất thường
  When Moderator nhấn "Duyệt tin"
  Then Phòng chuyển trạng thái sang "AVAILABLE" và hiển thị công khai trên trang tìm kiếm
```

### AC-US08: Tìm Kiếm & Lọc Phòng Đa Tiêu Chí (Search & Filters)
```gherkin
Scenario: Lọc phòng theo bán kính trường ĐH và ngân sách
  Given Khách thuê chọn vị trí "Đại học Bách Khoa", bán kính "< 3km", giá "2 - 4 triệu"
  When Nhấn nút "Tìm kiếm"
  Then Hệ thống trả về danh sách các phòng thỏa mãn điều kiện với thời gian truy vấn < 300ms
```

### AC-US09: Xem Chi Tiết Phòng & Bản Đồ Số (Room Detail & Map)
```gherkin
Scenario: Xem thông tin chi tiết và bảng kê chi phí
  Given Khách thuê nhấp vào một phòng trong danh sách
  When Trang chi tiết phòng tải hoàn tất
  Then Hiển thị album ảnh, vị trí bản đồ tương tác, bảng kê tiền điện/kWh, tiền nước/m3 và widget so sánh giá AI
```

### AC-US10: Gợi Ý Phòng Cá Nhân Hóa (AI Recommendation Feed)
```gherkin
Scenario: Hiển thị gợi ý dựa trên lịch sử tương tác
  Given Khách thuê đã từng xem 5 phòng ở khu vực Cầu Giấy tầm giá 3 - 3.5 triệu
  When Khách thuê quay lại trang chủ
  Then Khối "Gợi ý dành riêng cho bạn" tự động hiển thị các phòng tương đồng tại Cầu Giấy
```

### AC-US11: Trợ Lý Ảo Tư Vấn 24/7 (AI Chatbot)
```gherkin
Scenario: Hỏi đáp tiện ích phòng trọ
  Given Khách thuê mở cửa sổ chatbot tại phòng ID #120
  When Đặt câu hỏi "Phòng này có chỗ để xe máy không và giờ giấc thế nào?"
  Then Chatbot phân tích trường tiện nghi của phòng và trả lời "Phòng có nhà xe tầng 1 miễn phí và giờ giấc tự do không chung chủ"
```

### AC-US12: Đặt Cọc Giữ Chỗ Escrow Qua VNPAY (Escrow Deposit)
```gherkin
Scenario: Đặt cọc giữ phòng 48h thành công
  Given Phòng đang ở trạng thái "AVAILABLE"
  When Khách thuê thanh toán 500,000 VNĐ tiền cọc qua cổng VNPAY thành công
  Then Hệ thống chuyển trạng thái phòng sang "RESERVED"
  And Tiền cọc được khóa vào tài khoản Ký quỹ (ESCROW_HOLDING) của Sàn trong 48h
```

### AC-US13: Xử Lý Khiếu Nại Tranh Chấp Cọc (Dispute Resolution)
```gherkin
Scenario: Hoàn cọc 100% khi phòng thực tế sai lệch
  Given Khách đến nhận phòng thấy thiếu điều hòa như mô tả và gửi khiếu nại kèm ảnh trong 24h
  When Moderator kiểm tra xác thực khiếu nại đúng
  Then Hệ thống kích hoạt VNPAY Refund API hoàn trả 100% tiền cọc 500,000 VNĐ cho Khách
  And Trạng thái cọc chuyển sang "REFUNDED"
```

### AC-US14: Nhắn Tin Trực Tiếp Khách - Chủ (In-App Realtime Chat)
```gherkin
Scenario: Gửi và nhận tin nhắn thời gian thực
  Given Khách thuê và Chủ trọ đang mở hội thoại phòng ID #120
  When Khách thuê gửi tin nhắn "Anh ơi chiều nay 5h em qua xem phòng được không?"
  Then Chủ trọ nhận được tin nhắn tức thì qua kết nối WebSocket STOMP
  And Tin nhắn được lưu trữ vào bảng Messages trong PostgreSQL
```

### AC-US15: Đánh Giá 2 Bước Sau Lưu Trú (Verified Review)
```gherkin
Scenario: Đánh giá thành công sau khi hoàn tất thuê phòng
  Given Khách thuê có giao dịch cọc ở trạng thái "COMPLETED"
  When Khách chấm điểm 5 sao và nhận xét "Chủ trọ thân thiện, phòng sạch sẽ"
  Then Đánh giá được lưu vào hệ thống kèm huy hiệu "Người thuê thực tế đã xác minh"
```

### AC-US16: Quản Trị Người Dùng & Khóa Tài Khoản (User Admin & Ban)
```gherkin
Scenario: Admin khóa tài khoản vi phạm
  Given Admin phát hiện tài khoản chủ trọ có nhiều báo cáo lừa đảo
  When Admin nhấn nút "Khóa tài khoản"
  Then Hệ thống đổi trạng thái tài khoản thành "DISABLED"
  And Vô hiệu hóa phiên đăng nhập tức thì của người dùng này
```

### AC-US17: Dashboard Báo Cáo & Doanh Thu Sàn (Admin Analytics)
```gherkin
Scenario: Xem thống kê tổng doanh thu và tỷ lệ phòng
  Given Admin truy cập trang Dashboard quản trị
  When Chọn mốc thời gian "Tháng hiện tại"
  Then Hệ thống hiển thị tổng tiền cọc giao dịch, tổng hoa hồng sàn thu được và biểu đồ tỷ lệ tin duyệt / vi phạm
```
