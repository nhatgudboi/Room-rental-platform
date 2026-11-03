import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Panel, PanelHeader, PanelBody } from '../../components/common/Panel';
import { Icon } from '../../components/common/Icons';
import { AiPriceGauge } from '../../components/rooms/AiPriceGauge';
import { MOCK_ROOMS } from '../../api/mockData';

/**
 * SCR-03: Chi Tiết Phòng Trọ & Thước Đo Định Giá AI (Room Detail View).
 * Chuẩn Traveloka: Sang trọng, bố cục rõ ràng, 100% SVG icon.
 */
export function RoomDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const room = MOCK_ROOMS.find((r) => r.id === Number(id)) || MOCK_ROOMS[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Breadcrumb */}
      <div style={{ fontSize: '13px', color: 'var(--color-neutral-600)', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Link to="/" style={{ color: 'var(--color-neutral-600)' }}>Trang chủ</Link>
        <span>›</span>
        <Link to="/rooms" style={{ color: 'var(--color-neutral-600)' }}>Hà Nội</Link>
        <span>›</span>
        <Link to="/rooms" style={{ color: 'var(--color-neutral-600)' }}>{room.district}</Link>
        <span>›</span>
        <span style={{ color: 'var(--color-neutral-900)', fontWeight: 600 }}>{room.title}</span>
      </div>

      {/* Main Grid: 8 cols left info, 4 cols right booking card */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.9fr 1.1fr', gap: '24px', alignItems: 'start' }}>
        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Gallery */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr',
              gap: '10px',
              height: '340px',
              borderRadius: '12px',
              overflow: 'hidden',
              border: '1px solid var(--color-border)',
            }}
          >
            <img
              src={room.images[0]}
              alt={room.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: '10px', height: '100%' }}>
              <img
                src={room.images[1] || room.images[0]}
                alt="Room detail 2"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <img
                src={room.images[2] || room.images[0]}
                alt="Room detail 3"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>

          {/* Title & Metadata Card */}
          <div
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid var(--color-border)',
              borderRadius: '12px',
              padding: '22px 24px',
              boxShadow: 'var(--shadow-xs)',
            }}
          >
            <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
              <Badge variant="success" icon="shield-check">CCCD Đã Xác Minh</Badge>
              <Badge variant="info" icon="sparkles">AI Chuẩn Giá Thị Trường</Badge>
            </div>
            <h1 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--color-neutral-900)', marginBottom: '8px' }}>
              {room.title}
            </h1>
            <div style={{ fontSize: '13px', color: 'var(--color-neutral-600)', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '18px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Icon name="map-pin" size={14} color="var(--color-neutral-500)" />
                {room.address} ({room.universityDistance})
              </span>
              <span>•</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Icon name="maximize" size={14} color="var(--color-neutral-500)" />
                {room.areaSqm} m²
              </span>
              <span>•</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Icon name="users" size={14} color="var(--color-neutral-500)" />
                Tối đa {room.maxOccupants} người
              </span>
            </div>

            {/* Transparent Utility Costs */}
            <div
              style={{
                backgroundColor: 'var(--color-neutral-200)',
                borderRadius: '8px',
                padding: '16px',
                border: '1px solid var(--color-border)',
              }}
            >
              <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-neutral-700)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '12px' }}>
                Bảng Kê Chi Phí Sinh Hoạt Minh Bạch
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', fontSize: '13px' }}>
                <div>
                  <span style={{ color: 'var(--color-neutral-600)', display: 'block', fontSize: '12px' }}>Điện sinh hoạt:</span>
                  <strong style={{ fontSize: '13.5px', color: 'var(--color-neutral-900)' }}>{room.electricityCost.toLocaleString()} đ/kWh</strong>
                  <span style={{ fontSize: '11px', color: 'var(--color-positive)', display: 'block' }}>Công tơ riêng</span>
                </div>
                <div>
                  <span style={{ color: 'var(--color-neutral-600)', display: 'block', fontSize: '12px' }}>Nước máy:</span>
                  <strong style={{ fontSize: '13.5px', color: 'var(--color-neutral-900)' }}>{room.waterCost.toLocaleString()} đ/m³</strong>
                  <span style={{ fontSize: '11px', color: 'var(--color-positive)', display: 'block' }}>Đồng hồ riêng</span>
                </div>
                <div>
                  <span style={{ color: 'var(--color-neutral-600)', display: 'block', fontSize: '12px' }}>Internet wifi:</span>
                  <strong style={{ fontSize: '13.5px', color: 'var(--color-neutral-900)' }}>100,000 đ/phòng</strong>
                  <span style={{ fontSize: '11px', color: 'var(--color-neutral-600)', display: 'block' }}>Cáp quang 150Mbps</span>
                </div>
                <div>
                  <span style={{ color: 'var(--color-neutral-600)', display: 'block', fontSize: '12px' }}>Dịch vụ chung:</span>
                  <strong style={{ fontSize: '13.5px', color: 'var(--color-neutral-900)' }}>50,000 đ/người</strong>
                  <span style={{ fontSize: '11px', color: 'var(--color-neutral-600)', display: 'block' }}>Vệ sinh hành lang</span>
                </div>
              </div>
            </div>
          </div>

          {/* AI Valuation Gauge Panel */}
          <Panel>
            <PanelHeader
              title="Khoảng giá thị trường tham khảo (AI Valuation)"
              subtitle="Phân tích dựa trên vị trí địa lý, diện tích và tiện nghi tương đương tại Hà Nội"
            />
            <PanelBody>
              <AiPriceGauge
                listedPrice={room.monthlyRent}
                predictedPrice={room.aiPredictedPrice}
                priceMin={room.aiPriceMin}
                priceMax={room.aiPriceMax}
              />
            </PanelBody>
          </Panel>

          {/* Verified Community Reviews */}
          <Panel>
            <PanelHeader
              title={`Đánh Giá Từ Người Thuê Thực Tế (★ ${room.avgRating} / 5.0)`}
              subtitle={`${room.reviewCount} lượt đánh giá xác thực qua hợp đồng`}
            />
            <PanelBody>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13.5px', fontWeight: 600 }}>
                      <span>Trần Thị H.</span>
                      <Badge variant="success" icon="check">Đã thuê tháng 10/2026</Badge>
                    </div>
                    <span style={{ fontSize: '13px', color: 'var(--color-warning)', fontWeight: 600 }}>★ 5.0 / 5.0</span>
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--color-neutral-700)', lineHeight: 1.5, margin: 0 }}>
                    Phòng sạch sẽ, nước máy rất mạnh, bác chủ trọ dễ tính cho bạn bè đến chơi tự do. Giá điện nước thanh toán đúng theo chỉ số công tơ trên Sàn, không bị phát sinh phụ phí.
                  </p>
                </div>
              </div>
            </PanelBody>
          </Panel>
        </div>

        {/* Right Column: Sticky Booking & Landlord Box */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'sticky', top: '80px' }}>
          <div
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid var(--color-border)',
              borderRadius: '12px',
              padding: '22px 24px',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <div style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '14px', marginBottom: '18px' }}>
              <span style={{ fontSize: '12px', color: 'var(--color-neutral-600)', textTransform: 'uppercase', fontWeight: 600 }}>
                Giá thuê niêm yết:
              </span>
              <div style={{ fontSize: '26px', fontWeight: 700, color: 'var(--color-primary)', fontVariantNumeric: 'tabular-nums', marginTop: '4px' }}>
                {room.monthlyRent.toLocaleString()} đ <span style={{ fontSize: '14px', fontWeight: 400, color: 'var(--color-neutral-600)' }}>/ tháng</span>
              </div>
            </div>

            {/* Escrow 48h Guarantee Box */}
            <div
              style={{
                backgroundColor: 'var(--color-primary-light)',
                border: '1px solid var(--color-primary-border)',
                borderRadius: '8px',
                padding: '14px 16px',
                marginBottom: '18px',
              }}
            >
              <div style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                <Icon name="shield-check" size={16} color="var(--color-primary)" />
                Bảo chứng ký quỹ Escrow 48h
              </div>
              <p style={{ fontSize: '12px', color: 'var(--color-neutral-700)', lineHeight: 1.45, margin: 0 }}>
                Tiền cọc giữ chỗ <strong>500,000 VNĐ</strong> sẽ được Sàn giữ an toàn 48h qua VNPAY. Nếu phòng thực tế khác ảnh hoặc chủ trọ bùng hẹn, <strong>hoàn tiền 100%</strong> trong 24 giờ.
              </p>
            </div>

            <Button
              variant="primary"
              size="lg"
              style={{ width: '100%', marginBottom: '10px' }}
              onClick={() => navigate(`/rooms/${room.id}/booking`)}
              icon="shield-check"
            >
              Đặt cọc giữ phòng 48h (Escrow)
            </Button>

            <Button
              variant="secondary"
              size="md"
              style={{ width: '100%', marginBottom: '18px' }}
              onClick={() => navigate('/chat')}
              icon="message"
            >
              Nhắn tin với chủ trọ
            </Button>

            {/* Landlord Verified Profile Strip */}
            <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-primary-light)',
                  color: 'var(--color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '14px',
                }}
              >
                <Icon name="user" size={18} color="var(--color-primary)" />
              </div>
              <div>
                <div style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--color-neutral-900)' }}>
                  {room.landlordName || 'Nguyễn Văn Chủ'}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--color-positive)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Icon name="check" size={12} color="var(--color-positive)" /> CCCD Đã Xác Minh Chính Chủ
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
