# Hướng Dẫn & Đặc Tả Hợp Đồng REST API — Smart Rental Platform

> **Tiêu chuẩn thiết kế:** OpenAPI 3.0.4  
> **Tệp hợp đồng gốc:** [`docs/api/openapi.yaml`](./openapi.yaml)  
> **Trạng thái:** TARGET V1 BASELINE  
> **Kiến trúc áp dụng:** Java Spring Boot 3 + Python FastAPI + PostgreSQL 16

---

## 1. Tổng Quan Hợp Đồng API (Overview)

Hợp đồng API chuẩn OpenAPI 3.0.4 tại [`openapi.yaml`](./openapi.yaml) là **Nguồn Chân Lý Duy Nhất (Single Source of Truth)** cho toàn bộ giao tiếp giữa Frontend (React 19), Backend Nghiệp Vụ (Java Spring Boot 3) và Microservice AI (Python FastAPI).

Tất cả các tài liệu thiết kế (Use Cases, User Stories, Database Schema, UI Screens) đều ánh xạ trực tiếp và đồng bộ 100% với hợp đồng này.

---

## 2. Máy Chủ & Địa Chỉ Cơ Sở (Base URLs)

| Môi Trường (Environment) | URL Cơ Sở (Base URL) | Mục Đích Sử Dụng |
| :--- | :--- | :--- |
| **Production / Gateway** | `/api/v1` | Đường dẫn tương đối qua Reverse Proxy (Nginx/Gateway). |
| **Core Backend (Local)** | `http://localhost:8080/api/v1` | Máy chủ phát triển Spring Boot 3 cục bộ. |
| **AI Microservice (Local)** | `http://localhost:8000/api/v1` | Máy chủ phát triển Python FastAPI (LightGBM Engine). |

---

## 3. Xác Thực & Phân Quyền (Authentication & RBAC)

Hệ thống sử dụng cơ chế **JWT Bearer Token** kết hợp **Spring Security 6**:

```http
Authorization: Bearer <JWT_ACCESS_TOKEN>
```

* **Thời hạn Token:**
  - `Access Token`: 30 phút (chứa thông tin `userId`, `email`, và mảng `roles`).
  - `Refresh Token`: 7 ngày (dùng để cấp mới Access Token tại endpoint `POST /api/v1/auth/refresh`).
* **Bảo vệ Endpoint:**
  - Các endpoint công khai (Public): Tìm kiếm phòng, xem chi tiết phòng, dự đoán giá AI, đăng ký, đăng nhập.
  - Các endpoint bảo vệ: Bắt buộc kèm Bearer Token và được kiểm tra quyền theo 4 vai trò (`ADMIN`, `MODERATOR`, `LANDLORD`, `TENANT`).

---

## 4. Ma Trận Ánh Xạ Endpoint Với 17 Ca Sử Dụng (Use Cases Mapping)

| Mã UC | Nhóm Nghiệp Vụ | Phương Thức & Đường Dẫn (Endpoint) | Quyền Truy Cập (Roles) |
| :---: | :--- | :--- | :---: |
| **UC01** | Đăng ký & Đăng nhập | `POST /api/v1/auth/register`<br/>`POST /api/v1/auth/login` | Public |
| **UC02** | Quản lý Hồ sơ | `GET /api/v1/users/me`<br/>`PUT /api/v1/users/password` | Authenticated |
| **UC03** | Nộp KYC Chủ trọ | `POST /api/v1/landlord/kyc` | LANDLORD |
| **UC04** | Duyệt KYC Chủ trọ | `PUT /api/v1/mod/kyc/{id}/approve`<br/>`PUT /api/v1/mod/kyc/{id}/reject` | MODERATOR, ADMIN |
| **UC05** | Đăng tin phòng trọ | `POST /api/v1/landlord/rooms` | LANDLORD (Đã KYC) |
| **UC06** | Định giá phòng AI | `POST /api/v1/ai/predict-price` | Public / Landlord |
| **UC07** | Duyệt tin đăng phòng | `PUT /api/v1/mod/rooms/{id}/approve`<br/>`PUT /api/v1/mod/rooms/{id}/reject` | MODERATOR, ADMIN |
| **UC08** | Tìm kiếm đa tiêu chí | `GET /api/v1/rooms/search` | Public |
| **UC09** | Chi tiết phòng & Bản đồ | `GET /api/v1/rooms/{id}` | Public |
| **UC10** | Gợi ý phòng cá nhân hóa | `GET /api/v1/rooms/recommendations` | TENANT |
| **UC11** | Trợ lý ảo AI Chatbot | `POST /api/v1/ai/chat` | Public / Tenant |
| **UC12** | Đặt cọc ký quỹ Escrow | `POST /api/v1/bookings`<br/>`POST /api/v1/payments/vnpay/create-url` | TENANT |
| **UC13** | Khiếu nại tranh chấp cọc | `POST /api/v1/disputes`<br/>`PUT /api/v1/mod/disputes/{id}/resolve` | TENANT, MODERATOR |
| **UC14** | Nhắn tin thời gian thực | `GET /api/v1/chat/conversations`<br/>`POST /api/v1/chat/messages` (WebSocket) | TENANT, LANDLORD |
| **UC15** | Đánh giá sau lưu trú | `POST /api/v1/reviews` | TENANT (Đã thuê) |
| **UC16** | Quản trị người dùng | `GET /api/v1/admin/users`<br/>`PUT /api/v1/admin/users/{id}/status` | ADMIN |
| **UC17** | Dashboard thống kê | `GET /api/v1/admin/dashboard/stats` | ADMIN |

---

## 5. Chuẩn Hóa Mã Trạng Thái HTTP & Phản Hồi Lỗi (Error Handling)

Hệ thống chuẩn hóa toàn bộ phản hồi lỗi theo schema `ErrorResponse`:

```json
{
  "code": "INVALID_PRICE_RANGE",
  "message": "Giá phòng niêm yết không được vượt quá 35% so với mức giá định giá của AI LightGBM",
  "details": [
    "Giá nhập: 5,500,000 VNĐ",
    "Giá AI tối đa: 3,500,000 VNĐ"
  ],
  "timestamp": "2026-11-01T06:15:00Z"
}
```

| Mã HTTP | Ý Nghĩa Trong Hệ Thống |
| :---: | :--- |
| **200 OK** | Yêu cầu xử lý thành công, trả về dữ liệu tương ứng. |
| **201 Created** | Tạo mới bản ghi thành công (Phòng mới, Đơn cọc mới, Đánh giá mới). |
| **204 No Content** | Xử lý thành công nhưng không cần trả về nội dung (Đăng xuất, Xóa phòng). |
| **400 Bad Request** | Lỗi định dạng dữ liệu, thiếu trường bắt buộc hoặc sai tham số. |
| **401 Unauthorized** | Chưa đăng nhập hoặc JWT Token hết hạn/không hợp lệ. |
| **403 Forbidden** | Người dùng không đủ quyền (ví dụ: Chủ trọ chưa KYC cố tình gọi API đăng tin). |
| **404 Not Found** | Không tìm thấy tài nguyên yêu cầu (ID phòng, ID đơn cọc không tồn tại). |
| **409 Conflict** | Xung đột nghiệp vụ (Phòng đã có người cọc giữ chỗ, Email đã đăng ký). |
| **500 Internal Error** | Lỗi máy chủ chưa được xử lý ngoại lệ. |

---

## 6. Hướng Dẫn Kiểm Thử Hợp Đồng API

1. **Xem tài liệu tương tác qua Swagger UI:**
   - Cài đặt extension Swagger Viewer trên VS Code hoặc import file [`openapi.yaml`](./openapi.yaml) vào [editor.swagger.io](https://editor.swagger.io).
2. **Import vào Postman / Bruno:**
   - Mở Postman -> Chọn **Import** -> Kéo thả file `openapi.yaml`. Postman sẽ tự động sinh toàn bộ Collection kèm đầy đủ Mock Request & Response.
