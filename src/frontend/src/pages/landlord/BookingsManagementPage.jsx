import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Icon } from '../../components/common/Icons';
import { MOCK_BOOKINGS } from '../../api/mockData';

/**
 * SCR-12: Quản Lý Đơn Cọc Giữ Chỗ 48h (Landlord Booking Management).
 * Chuẩn Traveloka Host: Rõ ràng, minh bạch, 100% SVG icon.
 */
export function BookingsManagementPage() {
  const navigate = useNavigate();

  const handleConfirmCheckin = (bookingId) => {
    alert(`Đã xác nhận khách cọc #${bookingId} nhận phòng thực tế! Tiền cọc 500k giải ngân vào tài khoản ngân hàng của bạn.`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingBottom: '8px', borderBottom: '1px solid var(--color-border)' }}>
        <div>
          <div style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--color-primary)', marginBottom: '4px' }}>
            QUẢN LÝ CHO THUÊ • ĐƠN CỌC
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--color-neutral-900)', letterSpacing: '-0.02em', margin: 0 }}>
            Quản lý đơn cọc giữ chỗ 48h (Escrow)
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--color-neutral-600)', marginTop: '4px' }}>
            Theo dõi thời hạn đếm ngược 48h và đối soát lịch hẹn khách thuê đến xem phòng
          </p>
        </div>
        <Button variant="secondary" size="sm" onClick={() => navigate('/landlord/rooms')}>
          Quay lại danh mục
        </Button>
      </div>

      {/* Bookings List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {MOCK_BOOKINGS.map((booking) => (
          <div
            key={booking.id}
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid var(--color-border)',
              borderRadius: '12px',
              padding: '22px 24px',
              boxShadow: 'var(--shadow-sm)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            {/* Top Line */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-border)', paddingBottom: '12px' }}>
              <div>
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-neutral-600)' }}>
                  ĐƠN CỌC GIỮ CHỖ #{booking.id}
                </span>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-neutral-900)', margin: '4px 0 0 0' }}>
                  {booking.roomTitle}
                </h3>
              </div>
              <div style={{ textAlign: 'right' }}>
                <Badge variant="warning" icon="clock">
                  Đếm ngược giữ chỗ: Còn {booking.hoursRemaining}h
                </Badge>
                <div style={{ fontSize: '12px', color: 'var(--color-neutral-600)', marginTop: '4px' }}>
                  Hạn chót giải ngân tự động: 05/11 23:59
                </div>
              </div>
            </div>

            {/* 3 Detail Columns */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', backgroundColor: 'var(--color-neutral-200)', padding: '16px', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
              <div>
                <span style={{ fontSize: '12px', color: 'var(--color-neutral-600)', display: 'block', marginBottom: '2px' }}>Khách thuê cọc:</span>
                <strong style={{ fontSize: '14px', color: 'var(--color-neutral-900)' }}>{booking.tenantName}</strong>
                <div style={{ fontSize: '12.5px', color: 'var(--color-primary)', fontWeight: 500, marginTop: '2px' }}>SĐT: {booking.tenantPhone}</div>
              </div>

              <div>
                <span style={{ fontSize: '12px', color: 'var(--color-neutral-600)', display: 'block', marginBottom: '2px' }}>Lịch hẹn đến xem:</span>
                <strong style={{ fontSize: '14px', color: 'var(--color-neutral-900)' }}>{booking.appointmentTime}</strong>
                <div style={{ fontSize: '12.5px', color: 'var(--color-neutral-700)', marginTop: '2px' }}>Ngày {booking.appointmentDate}</div>
              </div>

              <div>
                <span style={{ fontSize: '12px', color: 'var(--color-neutral-600)', display: 'block', marginBottom: '2px' }}>Tiền Sàn đang lưu ký Escrow:</span>
                <strong style={{ fontSize: '16px', color: 'var(--color-positive)', fontVariantNumeric: 'tabular-nums' }}>
                  {booking.depositAmount.toLocaleString()} VNĐ
                </strong>
                <div style={{ fontSize: '11.5px', color: 'var(--color-neutral-600)', marginTop: '2px' }}>Cổng thanh toán: VNPAY</div>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', paddingTop: '4px' }}>
              <Button variant="secondary" size="md" onClick={() => navigate('/chat')} icon="message">
                Nhắn tin với khách
              </Button>
              <Button variant="primary" size="md" onClick={() => handleConfirmCheckin(booking.id)} icon="check">
                Xác nhận nhận phòng & giải ngân cọc 500k
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
