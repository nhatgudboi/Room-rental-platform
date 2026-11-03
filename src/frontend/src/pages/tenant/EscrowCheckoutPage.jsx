import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Panel, PanelHeader, PanelBody } from '../../components/common/Panel';
import { Icon } from '../../components/common/Icons';
import { MOCK_ROOMS } from '../../api/mockData';

/**
 * SCR-04: Đặt Cọc Ký Quỹ Escrow Qua VNPAY (Escrow Checkout).
 * Phong cách Traveloka: Quy trình thanh toán tin cậy, bố cục rõ ràng, 100% SVG icon.
 */
export function EscrowCheckoutPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const room = MOCK_ROOMS.find((r) => r.id === Number(id)) || MOCK_ROOMS[0];

  const [appointmentDate, setAppointmentDate] = useState('2026-11-05');
  const [appointmentTime, setAppointmentTime] = useState('17:30 Chiều');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [agreeDispute, setAgreeDispute] = useState(true);

  const handleConfirmCheckout = () => {
    alert('Khởi tạo giao dịch ký quỹ Escrow 500,000 VNĐ qua cổng VNPAY thành công!');
    navigate('/profile');
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* 3-Step Flow Indicator */}
      <div
        style={{
          backgroundColor: '#ffffff',
          border: '1px solid var(--color-border)',
          borderRadius: '12px',
          padding: '16px 28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '13px',
          fontWeight: 600,
          boxShadow: 'var(--shadow-xs)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-primary)' }}>
          <span style={{ width: '26px', height: '26px', borderRadius: '50%', backgroundColor: 'var(--color-primary)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700 }}>1</span>
          <span>Chọn Lịch Hẹn Đến Xem</span>
        </div>
        <span style={{ color: 'var(--color-border)' }}>───────────</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-primary)' }}>
          <span style={{ width: '26px', height: '26px', borderRadius: '50%', backgroundColor: 'var(--color-primary)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700 }}>2</span>
          <span>Ký Quỹ VNPAY 500k</span>
        </div>
        <span style={{ color: 'var(--color-border)' }}>───────────</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-neutral-600)' }}>
          <span style={{ width: '26px', height: '26px', borderRadius: '50%', backgroundColor: 'var(--color-neutral-300)', color: 'var(--color-neutral-700)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700 }}>3</span>
          <span>Bảo Lãnh Escrow 48h</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '24px', alignItems: 'start' }}>
        {/* Left: Appointment & Escrow Terms */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Panel>
            <PanelHeader title="1. Thông Tin Hẹn Đến Xem Phòng Thực Tế" />
            <PanelBody>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--color-neutral-700)', marginBottom: '6px' }}>
                    Ngày hẹn đến xem:
                  </label>
                  <input
                    type="date"
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    style={{ width: '100%', height: '40px', padding: '0 12px', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '13.5px', fontWeight: 500, backgroundColor: 'var(--color-neutral-200)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--color-neutral-700)', marginBottom: '6px' }}>
                    Khung giờ hẹn:
                  </label>
                  <select
                    value={appointmentTime}
                    onChange={(e) => setAppointmentTime(e.target.value)}
                    style={{ width: '100%', height: '40px', padding: '0 12px', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '13.5px', fontWeight: 500, backgroundColor: 'var(--color-neutral-200)' }}
                  >
                    <option>09:00 Sáng</option>
                    <option>11:30 Trưa</option>
                    <option>17:30 Chiều</option>
                    <option>19:00 Tối</option>
                  </select>
                </div>
              </div>

              <div style={{ fontSize: '12.5px', color: 'var(--color-neutral-700)', backgroundColor: 'var(--color-primary-light)', padding: '12px 14px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Icon name="shield-check" size={16} color="var(--color-primary)" />
                <span>Sau khi đặt cọc thành công, Sàn sẽ cung cấp số điện thoại chính chủ và số phòng chi tiết.</span>
              </div>
            </PanelBody>
          </Panel>

          <Panel>
            <PanelHeader title="2. Điều Khoản Bảo Vệ Tiền Cọc Escrow 48h" />
            <PanelBody>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
                <label style={{ display: 'flex', gap: '10px', cursor: 'pointer', alignItems: 'flex-start' }}>
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    style={{ marginTop: '3px' }}
                  />
                  <span style={{ color: 'var(--color-neutral-700)', lineHeight: 1.45 }}>
                    Tôi hiểu rằng số tiền <strong>500,000 VNĐ</strong> sẽ được Sàn Smart Rental lưu ký an toàn tại cổng VNPAY trong 48 giờ kể từ lúc đặt cọc. Chủ trọ chưa thể rút tiền ngay.
                  </span>
                </label>
                <label style={{ display: 'flex', gap: '10px', cursor: 'pointer', alignItems: 'flex-start' }}>
                  <input
                    type="checkbox"
                    checked={agreeDispute}
                    onChange={(e) => setAgreeDispute(e.target.checked)}
                    style={{ marginTop: '3px' }}
                  />
                  <span style={{ color: 'var(--color-neutral-700)', lineHeight: 1.45 }}>
                    Nếu đến xem phòng mà thực tế bị ẩm mốc, xuống cấp nghiêm trọng hoặc chủ nhà bùng hẹn không lý do, tôi được quyền bấm <strong>Khiếu nại hoàn cọc 100%</strong> trong 24 giờ.
                  </span>
                </label>
              </div>
            </PanelBody>
          </Panel>
        </div>

        {/* Right: Checkout Summary */}
        <div style={{ backgroundColor: '#ffffff', border: '1px solid var(--color-border)', borderRadius: '12px', padding: '22px', boxShadow: 'var(--shadow-sm)' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-neutral-900)', marginBottom: '16px' }}>
            Tóm tắt đơn ký quỹ giữ chỗ
          </h3>

          <div style={{ display: 'flex', gap: '12px', paddingBottom: '14px', borderBottom: '1px solid var(--color-border)', marginBottom: '14px' }}>
            <img
              src={room.images[0]}
              alt={room.title}
              style={{ width: '76px', height: '62px', objectFit: 'cover', borderRadius: '8px', border: '1px solid var(--color-border)' }}
            />
            <div>
              <h5 style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--color-neutral-900)', margin: '0 0 4px 0' }}>
                {room.title}
              </h5>
              <div style={{ fontSize: '12px', color: 'var(--color-neutral-600)' }}>
                Chủ trọ: {room.landlord.name}
              </div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-primary)', marginTop: '2px' }}>
                Giá thuê: {room.monthlyRent.toLocaleString()} đ/tháng
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', paddingBottom: '14px', borderBottom: '1px solid var(--color-border)', marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-neutral-600)' }}>
              <span>Tiền cọc giữ chỗ sàn quy định:</span>
              <strong style={{ color: 'var(--color-neutral-900)', fontVariantNumeric: 'tabular-nums' }}>500,000 VNĐ</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-neutral-600)' }}>
              <span>Phí bảo lãnh Escrow:</span>
              <strong style={{ color: 'var(--color-positive)' }}>0 VNĐ (Miễn phí)</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px', fontWeight: 700, color: 'var(--color-neutral-900)', paddingTop: '6px' }}>
              <span>Tổng thanh toán:</span>
              <span style={{ color: 'var(--color-primary)', fontVariantNumeric: 'tabular-nums' }}>500,000 VNĐ</span>
            </div>
          </div>

          {/* VNPAY Selector */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--color-neutral-600)', textTransform: 'uppercase', marginBottom: '8px' }}>
              Cổng thanh toán ký quỹ:
            </label>
            <div
              style={{
                border: '1.5px solid var(--color-primary)',
                backgroundColor: 'var(--color-primary-light)',
                borderRadius: '8px',
                padding: '12px 14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <strong style={{ fontSize: '13px', color: 'var(--color-primary)' }}>VNPAY-QR</strong>
                <div style={{ fontSize: '11.5px', color: 'var(--color-neutral-600)', marginTop: '2px' }}>Quét mã QR từ 32+ ngân hàng & ví điện tử</div>
              </div>
              <Icon name="check" size={16} color="var(--color-primary)" />
            </div>
          </div>

          <Button
            variant="primary"
            size="lg"
            style={{ width: '100%' }}
            disabled={!agreeTerms || !agreeDispute}
            onClick={handleConfirmCheckout}
            icon="shield-check"
          >
            Xác nhận thanh toán VNPAY (500k)
          </Button>
        </div>
      </div>
    </div>
  );
}
