# C2 — Mức Container (Containers Diagram)

> **Mục đích:** Phóng to vào bên trong hệ thống Smart Room Rental Platform để thể hiện các đơn vị thực thi (Run-time Containers), công nghệ sử dụng, phân vùng lưu trữ dữ liệu và các giao thức giao tiếp mạng.

---

## 1. Sơ Đồ Container C2 (Mermaid Container Diagram)

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

---

## 2. Đặc Tả Chi Tiết Các Container (Container Specifications)

| Tên Container | Vai Trò & Trách Nhiệm | Công Nghệ Cốt Lõi | Cổng & Giao Thức (Protocols) |
| :--- | :--- | :--- | :--- |
| **Web Frontend (SPA)** | Cung cấp toàn bộ trải nghiệm người dùng cho 4 đối tượng: Trang chủ, bản đồ số, portal chủ trọ, dashboard admin. | React 19, Vite, Tailwind CSS, Leaflet Map, Chart.js | Port 3000 (Local) / 443 (HTTPS) |
| **Core Backend API** | Máy chủ ứng dụng trung tâm: Xử lý nghiệp vụ, xác thực JWT, phân quyền, ký quỹ Escrow, WebSocket Chat, kiểm toán. | Java 21, Spring Boot 3.3, Spring Security 6, Spring Data JPA | Port 8080 / HTTPS, WSS |
| **AI Microservice** | Dịch vụ AI độc lập: Chạy mô hình học máy LightGBM định giá phòng, thuật toán gợi ý phòng, chatbot giải đáp tiện ích. | Python 3.11, FastAPI, LightGBM, Scikit-learn, Uvicorn | Port 8000 / HTTP nội bộ |
| **Primary Database** | Lưu trữ dữ liệu quan hệ toàn vẹn, hỗ trợ chỉ mục địa lý PostGIS và lưu trữ cấu trúc linh hoạt qua JSONB. | PostgreSQL 16 (Container Docker `rental-postgres`) | Port 54333 (Local) / 5432 (Docker) |

---

## 3. Giao Thức Giao Tiếp & Ranh Giới Bảo Mật (Network Protocols & Security)

1. **Client - Backend (HTTPS & WSS):**
   - Mọi truy vấn HTTP đều bắt buộc kèm tiêu đề `Authorization: Bearer <TOKEN>` (ngoại trừ các endpoint công khai như tìm kiếm, xem phòng).
   - Chat thời gian thực sử dụng kênh WebSocket STOMP bảo mật qua WSS.
2. **Backend - AI Microservice (Inter-service HTTP):**
   - Giao tiếp đồng bộ qua REST API JSON trong mạng nội bộ Docker.
   - Thời gian chờ (Timeout) tối đa 1.5 giây; nếu AI Service không phản hồi kịp, Backend tự động sử dụng giá trị trung bình quận huyện làm fallback an toàn.
3. **Backend - Cổng Thanh Toán VNPAY (Secure Gateway):**
   - Mọi URL chuyển hướng và Webhook IPN đều được mã hóa và xác thực chữ ký số bằng thuật toán **HMAC SHA512** với Secret Key được bảo vệ nghiêm ngặt trong biến môi trường (`.env`).
