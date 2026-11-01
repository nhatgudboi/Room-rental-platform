# C4 — Mức Mã Nguồn (Code Level Architecture)

> **Mục đích:** Đi sâu vào cấu trúc mã nguồn đối tượng (Class Design), mẫu thiết kế (Design Patterns) và máy trạng thái (State Machine) của **2 tính năng cốt lõi quan trọng nhất** của dự án:
> 1. Quy trình Ký quỹ Giữ phòng 48h & Phân xử tranh chấp (`Escrow Booking & Dispute Resolution`).
> 2. Quy trình Định giá phòng AI LightGBM & Kiểm duyệt tin (`Real-time AI Price Prediction & Listing Audit`).

---

## 1. Tính Năng Cốt Lõi 1: Quy Trình Đặt Cọc Ký Quỹ Escrow (Escrow Booking)

### 1.1 Sơ Đồ Lớp (Class Diagram)
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

### 1.2 Máy Trạng Thái Đơn Cọc Ký Quỹ (Escrow Booking State Machine)
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

---

## 2. Tính Năng Cốt Lõi 2: Định Giá Phòng AI LightGBM & Kiểm Duyệt Tin

### 2.1 Sơ Đồ Lớp (Class Diagram)
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

### 2.2 Luồng Logic Định Giá & Phê Duyệt Tin (Listing Creation Flow)
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
