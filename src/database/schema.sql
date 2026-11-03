-- =============================================================================
-- SMART ROOM RENTAL PLATFORM — POSTGRESQL 16 SCHEMA DDL
-- Project: Sàn Cho Thuê Phòng Trọ Thông Minh Tích Hợp Học Máy
-- Architecture: Spring Boot 3 + React 19 + Python FastAPI + PostgreSQL 16
-- =============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS postgis;

-- 1. ENUM TYPES
DROP TYPE IF EXISTS user_role CASCADE;
CREATE TYPE user_role AS ENUM ('ADMIN', 'MODERATOR', 'LANDLORD', 'TENANT');

DROP TYPE IF EXISTS kyc_status CASCADE;
CREATE TYPE kyc_status AS ENUM ('UNVERIFIED', 'PENDING_VERIFICATION', 'VERIFIED', 'REJECTED');

DROP TYPE IF EXISTS room_type CASCADE;
CREATE TYPE room_type AS ENUM ('STUDIO', 'SINGLE_ROOM', 'SHARED_ROOM', 'APARTMENT', 'HOMESTAY');

DROP TYPE IF EXISTS room_status CASCADE;
CREATE TYPE room_status AS ENUM ('PENDING_APPROVAL', 'AVAILABLE', 'RESERVED', 'RENTED', 'MAINTENANCE', 'REJECTED', 'FLAGGED_VIOLATION');

DROP TYPE IF EXISTS booking_status CASCADE;
CREATE TYPE booking_status AS ENUM ('PENDING_PAYMENT', 'ESCROW_HOLDING', 'COMPLETED', 'DISPUTED', 'REFUNDED', 'CANCELLED');

DROP TYPE IF EXISTS payment_status CASCADE;
CREATE TYPE payment_status AS ENUM ('PENDING', 'SUCCESS', 'FAILED', 'REFUNDED');

DROP TYPE IF EXISTS payment_method CASCADE;
CREATE TYPE payment_method AS ENUM ('VNPAY_QR', 'VNPAY_ATM', 'VNPAY_CARD', 'MOMO');

DROP TYPE IF EXISTS dispute_status CASCADE;
CREATE TYPE dispute_status AS ENUM ('OPEN', 'INVESTIGATING', 'REFUND_APPROVED', 'REFUND_REJECTED', 'RESOLVED');

-- 2. TABLES

-- Bảng Người dùng & Phân quyền
CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    avatar_url VARCHAR(500),
    role user_role NOT NULL DEFAULT 'TENANT',
    kyc_status kyc_status NOT NULL DEFAULT 'UNVERIFIED',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMPTZ
);

-- Bảng Hồ sơ KYC Chủ trọ
CREATE TABLE IF NOT EXISTS landlord_kyc (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    id_card_number VARCHAR(20) NOT NULL,
    id_card_front_url VARCHAR(500) NOT NULL,
    id_card_back_url VARCHAR(500) NOT NULL,
    ownership_doc_url VARCHAR(500) NOT NULL,
    rejection_reason TEXT,
    reviewed_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
    reviewed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Bảng Quận / Huyện
CREATE TABLE IF NOT EXISTS districts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL DEFAULT 'Hà Nội',
    latitude DECIMAL(9,6) NOT NULL,
    longitude DECIMAL(9,6) NOT NULL,
    CONSTRAINT uq_district_city UNIQUE (name, city)
);

-- Bảng Mốc Trường Đại học & Điểm đến trọng điểm
CREATE TABLE IF NOT EXISTS university_landmarks (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    district_id INT NOT NULL REFERENCES districts(id) ON DELETE CASCADE,
    latitude DECIMAL(9,6) NOT NULL,
    longitude DECIMAL(9,6) NOT NULL
);

-- Bảng Tin Đăng Phòng Trọ
CREATE TABLE IF NOT EXISTS rooms (
    id BIGSERIAL PRIMARY KEY,
    landlord_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    address VARCHAR(500) NOT NULL,
    district_id INT NOT NULL REFERENCES districts(id) ON DELETE RESTRICT,
    latitude DECIMAL(9,6) NOT NULL,
    longitude DECIMAL(9,6) NOT NULL,
    room_type room_type NOT NULL DEFAULT 'SINGLE_ROOM',
    area_sqm DECIMAL(5,2) NOT NULL CHECK (area_sqm > 0),
    max_occupants SMALLINT NOT NULL DEFAULT 2 CHECK (max_occupants > 0),
    monthly_rent DECIMAL(12,2) NOT NULL CHECK (monthly_rent >= 0),
    deposit_required DECIMAL(12,2) NOT NULL CHECK (deposit_required >= 0),
    electricity_cost_kwh DECIMAL(10,2) NOT NULL CHECK (electricity_cost_kwh >= 0),
    water_cost_m3 DECIMAL(10,2) NOT NULL CHECK (water_cost_m3 >= 0),
    internet_cost_month DECIMAL(10,2) NOT NULL DEFAULT 0 CHECK (internet_cost_month >= 0),
    ai_predicted_price DECIMAL(12,2),
    ai_price_min DECIMAL(12,2),
    ai_price_max DECIMAL(12,2),
    status room_status NOT NULL DEFAULT 'PENDING_APPROVAL',
    view_count INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMPTZ
);

-- Bảng Tiện Nghi Phòng Trọ
CREATE TABLE IF NOT EXISTS room_amenities (
    id BIGSERIAL PRIMARY KEY,
    room_id BIGINT NOT NULL UNIQUE REFERENCES rooms(id) ON DELETE CASCADE,
    has_air_conditioner BOOLEAN NOT NULL DEFAULT FALSE,
    has_water_heater BOOLEAN NOT NULL DEFAULT FALSE,
    has_washing_machine BOOLEAN NOT NULL DEFAULT FALSE,
    has_refrigerator BOOLEAN NOT NULL DEFAULT FALSE,
    has_balcony BOOLEAN NOT NULL DEFAULT FALSE,
    has_elevator BOOLEAN NOT NULL DEFAULT FALSE,
    has_mezzanine BOOLEAN NOT NULL DEFAULT FALSE,
    has_parking BOOLEAN NOT NULL DEFAULT TRUE,
    is_free_hours BOOLEAN NOT NULL DEFAULT TRUE,
    allows_pets BOOLEAN NOT NULL DEFAULT FALSE,
    is_furnished BOOLEAN NOT NULL DEFAULT FALSE
);

-- Bảng Album Hình Ảnh Phòng Trọ
CREATE TABLE IF NOT EXISTS room_images (
    id BIGSERIAL PRIMARY KEY,
    room_id BIGINT NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
    image_url VARCHAR(500) NOT NULL,
    is_primary BOOLEAN NOT NULL DEFAULT FALSE,
    display_order SMALLINT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Bảng Ký Quỹ & Đặt Cọc Giữ Phòng (Escrow Booking)
CREATE TABLE IF NOT EXISTS escrow_bookings (
    id BIGSERIAL PRIMARY KEY,
    booking_code VARCHAR(32) NOT NULL UNIQUE,
    room_id BIGINT NOT NULL REFERENCES rooms(id) ON DELETE RESTRICT,
    tenant_id BIGINT NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    landlord_id BIGINT NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    deposit_amount DECIMAL(12,2) NOT NULL CHECK (deposit_amount > 0),
    escrow_holding_deadline TIMESTAMPTZ NOT NULL,
    checkin_appointment_date TIMESTAMPTZ NOT NULL,
    status booking_status NOT NULL DEFAULT 'PENDING_PAYMENT',
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Bảng Giao Dịch Thanh Toán Cổng VNPAY/MoMo
CREATE TABLE IF NOT EXISTS payments (
    id BIGSERIAL PRIMARY KEY,
    booking_id BIGINT NOT NULL REFERENCES escrow_bookings(id) ON DELETE CASCADE,
    transaction_ref VARCHAR(100) NOT NULL UNIQUE,
    gateway VARCHAR(50) NOT NULL DEFAULT 'VNPAY',
    payment_method payment_method NOT NULL DEFAULT 'VNPAY_QR',
    amount DECIMAL(12,2) NOT NULL CHECK (amount > 0),
    status payment_status NOT NULL DEFAULT 'PENDING',
    gateway_response TEXT,
    paid_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Bảng Khiếu Nại & Tranh Chấp Cọc
CREATE TABLE IF NOT EXISTS disputes (
    id BIGSERIAL PRIMARY KEY,
    booking_id BIGINT NOT NULL UNIQUE REFERENCES escrow_bookings(id) ON DELETE CASCADE,
    complainant_id BIGINT NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    reason VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    evidence_urls TEXT[],
    status dispute_status NOT NULL DEFAULT 'OPEN',
    resolution_notes TEXT,
    resolved_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
    resolved_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Bảng Đánh Giá 2 Bước Sau Lưu Trú (Verified Reviews)
CREATE TABLE IF NOT EXISTS reviews (
    id BIGSERIAL PRIMARY KEY,
    booking_id BIGINT NOT NULL UNIQUE REFERENCES escrow_bookings(id) ON DELETE CASCADE,
    room_id BIGINT NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
    tenant_id BIGINT NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    overall_rating SMALLINT NOT NULL CHECK (overall_rating BETWEEN 1 AND 5),
    rating_security SMALLINT NOT NULL CHECK (rating_security BETWEEN 1 AND 5),
    rating_cleanliness SMALLINT NOT NULL CHECK (rating_cleanliness BETWEEN 1 AND 5),
    rating_utilities SMALLINT NOT NULL CHECK (rating_utilities BETWEEN 1 AND 5),
    rating_landlord SMALLINT NOT NULL CHECK (rating_landlord BETWEEN 1 AND 5),
    comment TEXT NOT NULL,
    photo_urls TEXT[],
    landlord_reply TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Bảng Tin Nhắn Trực Tiếp Khách - Chủ (In-app Chat)
CREATE TABLE IF NOT EXISTS messages (
    id BIGSERIAL PRIMARY KEY,
    sender_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    receiver_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    room_id BIGINT REFERENCES rooms(id) ON DELETE SET NULL,
    content TEXT NOT NULL,
    media_url VARCHAR(500),
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Bảng Nhật Ký Hoạt Động & Kiểm Toán (Audit Logs)
CREATE TABLE IF NOT EXISTS audit_logs (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(50) NOT NULL,
    entity_type VARCHAR(50) NOT NULL,
    entity_id BIGINT NOT NULL,
    old_values JSONB,
    new_values JSONB,
    ip_address VARCHAR(45),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 3. INDEXES CHIẾN LƯỢC TỐI ƯU HIỆU NĂNG

-- Tìm kiếm phòng theo địa lý & trạng thái
CREATE INDEX IF NOT EXISTS idx_rooms_district_status ON rooms(district_id, status) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_rooms_price ON rooms(monthly_rent) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_rooms_area ON rooms(area_sqm) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_rooms_coordinates ON rooms(latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_rooms_location_gist ON rooms USING gist (ST_SetSRID(ST_MakePoint(longitude, latitude), 4326));

-- Đơn cọc & Ký quỹ
CREATE INDEX IF NOT EXISTS idx_escrow_status_deadline ON escrow_bookings(status, escrow_holding_deadline);
CREATE INDEX IF NOT EXISTS idx_escrow_tenant ON escrow_bookings(tenant_id);
CREATE INDEX IF NOT EXISTS idx_escrow_landlord ON escrow_bookings(landlord_id);

-- Chat thời gian thực
CREATE INDEX IF NOT EXISTS idx_messages_conversation ON messages(sender_id, receiver_id, created_at);

-- Đánh giá phòng
CREATE INDEX IF NOT EXISTS idx_reviews_room_rating ON reviews(room_id, overall_rating);

-- 4. DỮ LIỆU MẪU KHỞI TẠO (SEED DATA)

INSERT INTO districts (id, name, city, latitude, longitude) VALUES
(1, 'Cầu Giấy', 'Hà Nội', 21.036237, 105.790583),
(2, 'Đống Đa', 'Hà Nội', 21.018072, 105.829949),
(3, 'Hai Bà Trưng', 'Hà Nội', 21.006935, 105.852485),
(4, 'Thanh Xuân', 'Hà Nội', 20.998028, 105.812613)
ON CONFLICT DO NOTHING;

INSERT INTO university_landmarks (name, district_id, latitude, longitude) VALUES
('Đại học Bách Khoa Hà Nội', 3, 21.004403, 105.843389),
('Đại học Kinh tế Quốc dân (NEU)', 3, 20.999814, 105.842792),
('Đại học Quốc gia Hà Nội (Cầu Giấy)', 1, 21.037812, 105.781615),
('Học viện Ngân hàng', 2, 21.009386, 105.829567)
ON CONFLICT DO NOTHING;

-- Seed tài khoản mặc định (Mật khẩu: Password@123 -> $2a$12$TlsdrKg8VyQjoXYi2hdzXu8p5ZsL8cL5x.5MlQFxiixUO7Fnn.1ri)
INSERT INTO users (id, email, password_hash, full_name, phone_number, role, kyc_status, is_active) VALUES
(1, 'admin@smartrental.vn', '$2a$12$TlsdrKg8VyQjoXYi2hdzXu8p5ZsL8cL5x.5MlQFxiixUO7Fnn.1ri', 'Quản Trị Viên Sàn', '0901234567', 'ADMIN', 'VERIFIED', TRUE),
(2, 'moderator@smartrental.vn', '$2a$12$TlsdrKg8VyQjoXYi2hdzXu8p5ZsL8cL5x.5MlQFxiixUO7Fnn.1ri', 'Kiểm Duyệt Viên 01', '0902345678', 'MODERATOR', 'VERIFIED', TRUE),
(3, 'landlord@smartrental.vn', '$2a$12$TlsdrKg8VyQjoXYi2hdzXu8p5ZsL8cL5x.5MlQFxiixUO7Fnn.1ri', 'Nguyễn Văn Chủ Trọ', '0903456789', 'LANDLORD', 'VERIFIED', TRUE),
(4, 'tenant@smartrental.vn', '$2a$12$TlsdrKg8VyQjoXYi2hdzXu8p5ZsL8cL5x.5MlQFxiixUO7Fnn.1ri', 'Trần Thị Sinh Viên', '0904567890', 'TENANT', 'UNVERIFIED', TRUE)
ON CONFLICT DO NOTHING;
