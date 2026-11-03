# Tài Liệu Thiết Kế UI/UX & Giao Diện — Smart Room Rental Platform

> **Tiêu chuẩn thiết kế:** Tham chiếu kiến trúc UI/UX từ `FlowX` (`d:\FlowX\samples\crm-web`).  
> **Quy mô hệ thống:** Bao phủ toàn diện **18 màn hình** (`SCR-01` đến `SCR-18`) của 4 nhóm vai trò (`TENANT`, `LANDLORD`, `MODERATOR`, `ADMIN`).  
> **Trạng thái:** TARGET V1 BASELINE (Sẵn sàng đưa vào lập trình React 19).

---

## 1. Mục Lục Bộ Hồ Sơ UI/UX

| STT | Tài Liệu | Nội Dung Trọng Tâm | Liên Kết |
| :---: | :--- | :--- | :--- |
| **01** | **Hệ Thống Thiết Kế (Design System)** | Hợp đồng Design Tokens 2 lớp (Ground, Neutral ramp, Emerald Accent, Business Status, Typography, Spacing 4px/8px, Geometry, Shadows). | [`01-design-system.md`](./01-design-system.md) |
| **02** | **Thư Viện Component (Component Library)** | Đặc tả Primitives (Button, DataTable, StatTile, Modal/Drawer, States) và Component nghiệp vụ (RoomCard, Đồng hồ đo giá AI LightGBM, InteractiveMap, EscrowTimelineBar, VerifiedReviewCard). | [`02-component-library.md`](./02-component-library.md) |
| **03** | **Đặc Tả 18 Màn Hình (Screen Specifications)** | Bản vẽ Wireframe trực quan (ASCII Mockup), cấu trúc phân vùng, luồng tương tác và 4 trạng thái (*Default, Loading, Empty, Error*) cho toàn bộ 18 màn hình. | [`03-screen-specifications.md`](./03-screen-specifications.md) |

---

## 2. Ma Trận 18 Màn Hình × 4 Vai Trò Người Dùng

```mermaid
flowchart TD
    subgraph S_Public["1. Người Thuê & Công Khai (Tenant)"]
        SCR01["SCR-01: Trang Chủ & Tìm Kiếm"]
        SCR02["SCR-02: Danh Sách & Bản Đồ Số"]
        SCR03["SCR-03: Chi Tiết Phòng & Đo Giá AI"]
        SCR04["SCR-04: Đặt Cọc Ký Quỹ Escrow"]
        SCR05["SCR-05: Khiếu Nại & Hoàn Cọc 24h"]
        SCR06["SCR-06: Đánh Giá Sau Lưu Trú"]
    end

    subgraph S_Auth["2. Xác Thực & Hồ Sơ"]
        SCR07["SCR-07: Đăng Nhập & Đăng Ký JWT"]
        SCR08["SCR-08: Hồ Sơ Cá Nhân & Đổi Mật Khẩu"]
    end

    subgraph S_Landlord["3. Portal Chủ Trọ (Landlord)"]
        SCR09["SCR-09: Nộp KYC CCCD & Giấy Trọ"]
        SCR10["SCR-10: Quản Lý Danh Sách Phòng"]
        SCR11["SCR-11: Tạo Tin & Gợi Ý Giá AI"]
        SCR12["SCR-12: Quản Lý Đơn Cọc 48h"]
    end

    subgraph S_Admin["4. Portal Kiểm Duyệt & Quản Trị"]
        SCR13["SCR-13: Hàng Đợi Duyệt KYC"]
        SCR14["SCR-14: Hàng Đợi Duyệt Tin & Cờ AI"]
        SCR15["SCR-15: Phân Xử Khiếu Nại Cọc"]
        SCR16["SCR-16: Quản Trị Tài Khoản & Khóa"]
        SCR17["SCR-17: Dashboard Doanh Thu Sàn"]
    end

    subgraph S_Chat["5. Giao Tiếp Thời Gian Thực"]
        SCR18["SCR-18: Chat Trực Tiếp Khách - Chủ"]
    end
```

---

## 3. Ba Điểm Nhấn Thiết Kế Kế Thừa Từ FlowX

1. **Hợp đồng Token không chứa mã màu cứng (Zero literal colors):** Toàn bộ component sử dụng biến CSS `--color-*`, đảm bảo khả năng đổi chủ đề (Theming / Dark mode) chỉ cần can thiệp tại `tokens.css`.
2. **Khung vỏ ứng dụng (AppShell) kết hợp Persona Switcher:** Cho phép Mentor/Ban giám khảo hoặc Lập trình viên chuyển nhanh giữa 4 vai trò (`Tenant`, `Landlord`, `Moderator`, `Admin`) để kiểm thử ngay sự khác biệt phân quyền trên cùng một giao diện.
3. **Phản hồi từ chối quyền (403 Stance) rõ ràng:** Khi người dùng chưa đủ quyền truy cập (ví dụ: Chủ trọ chưa KYC cố đăng tin, Khách chưa nhận phòng cố viết review), giao diện không hiện trang trắng vô nghĩa mà hiển thị thông báo nghiệp vụ kèm nút hướng dẫn khắc phục cụ thể.

