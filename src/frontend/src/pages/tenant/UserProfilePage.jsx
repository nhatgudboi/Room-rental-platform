import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Panel, PanelHeader, PanelBody } from '../../components/common/Panel';
import { Icon } from '../../components/common/Icons';
import { MOCK_BOOKINGS } from '../../api/mockData';

/**
 * SCR-08: Hồ Sơ Cá Nhân & Quản Lý Đơn Cọc (User Profile & My Bookings).
 * Chuẩn Traveloka: Tinh tế, không icon cảm xúc, 100% SVG.
 */
export function UserProfilePage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('BOOKINGS'); // BOOKINGS | PROFILE | SAVED

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '260px 1fr', gap: '24px', alignItems: 'start' }}>
      {/* Sidebar Profile Info */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid var(--color-border)',
            borderRadius: '12px',
            padding: '24px 20px',
            textAlign: 'center',
            boxShadow: 'var(--shadow-xs)',
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-primary-light)',
              color: 'var(--color-primary)',
              fontSize: '20px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 12px auto',
              border: '2px solid var(--color-primary-border)',
            }}
          >
            SV
          </div>
          <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-neutral-900)', margin: '0 0 4px 0' }}>
            Trần Thị Sinh Viên
          </h3>
          <div style={{ fontSize: '12px', color: 'var(--color-neutral-600)', marginBottom: '12px' }}>
            tenant@smartrental.vn • 0904567890
          </div>
          <Badge variant="success" icon="shield-check">Tài Khoản Đã Xác Thực</Badge>
        </div>

        {/* Tab Links */}
        <div
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid var(--color-border)',
            borderRadius: '12px',
            overflow: 'hidden',
            fontSize: '13.5px',
            boxShadow: 'var(--shadow-xs)',
          }}
        >
          <button
            onClick={() => setActiveTab('BOOKINGS')}
            style={{
              width: '100%',
              textAlign: 'left',
              padding: '12px 18px',
              border: 'none',
              backgroundColor: activeTab === 'BOOKINGS' ? 'var(--color-primary-light)' : 'transparent',
              color: activeTab === 'BOOKINGS' ? 'var(--color-primary)' : 'var(--color-neutral-700)',
              fontWeight: activeTab === 'BOOKINGS' ? 600 : 500,
              borderLeft: activeTab === 'BOOKINGS' ? '3px solid var(--color-primary)' : '3px solid transparent',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <Icon name="credit-card" size={15} color={activeTab === 'BOOKINGS' ? 'var(--color-primary)' : 'var(--color-neutral-600)'} />
            <span>Đơn Cọc Escrow ({MOCK_BOOKINGS.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('SAVED')}
            style={{
              width: '100%',
              textAlign: 'left',
              padding: '12px 18px',
              border: 'none',
              backgroundColor: activeTab === 'SAVED' ? 'var(--color-primary-light)' : 'transparent',
              color: activeTab === 'SAVED' ? 'var(--color-primary)' : 'var(--color-neutral-700)',
              fontWeight: activeTab === 'SAVED' ? 600 : 500,
              borderLeft: activeTab === 'SAVED' ? '3px solid var(--color-primary)' : '3px solid transparent',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <Icon name="bed" size={15} color={activeTab === 'SAVED' ? 'var(--color-primary)' : 'var(--color-neutral-600)'} />
            <span>Phòng Trọ Đã Lưu (4)</span>
          </button>
          <button
            onClick={() => setActiveTab('PROFILE')}
            style={{
              width: '100%',
              textAlign: 'left',
              padding: '12px 18px',
              border: 'none',
              backgroundColor: activeTab === 'PROFILE' ? 'var(--color-primary-light)' : 'transparent',
              color: activeTab === 'PROFILE' ? 'var(--color-primary)' : 'var(--color-neutral-700)',
              fontWeight: activeTab === 'PROFILE' ? 600 : 500,
              borderLeft: activeTab === 'PROFILE' ? '3px solid var(--color-primary)' : '3px solid transparent',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <Icon name="user" size={15} color={activeTab === 'PROFILE' ? 'var(--color-primary)' : 'var(--color-neutral-600)'} />
            <span>Cài Đặt Cá Nhân</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div>
        {activeTab === 'BOOKINGS' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-neutral-900)', margin: 0 }}>
                  Đơn cọc lưu ký Escrow 48h của tôi
                </h2>
                <p style={{ fontSize: '13px', color: 'var(--color-neutral-600)', marginTop: '2px' }}>
                  Tiền cọc 500,000 VNĐ đang được Sàn bảo lãnh. Bạn có 48h đến xem thực tế.
                </p>
              </div>
            </div>

            {MOCK_BOOKINGS.map((booking) => (
              <div
                key={booking.id}
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid var(--color-border)',
                  borderRadius: '12px',
                  padding: '20px 22px',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-border)', paddingBottom: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--color-neutral-700)' }}>
                      Mã đơn: #{booking.id}
                    </span>
                    <span style={{ fontSize: '12px', color: 'var(--color-neutral-600)' }}>
                      (Cọc lúc: {booking.createdAt})
                    </span>
                  </div>
                  <div>
                    {booking.status === 'ESCROW_HOLDING' && (
                      <Badge variant="warning" icon="clock">Đang giữ cọc: Còn {booking.hoursRemaining}h</Badge>
                    )}
                    {booking.status === 'COMPLETED' && (
                      <Badge variant="success" icon="check">Đã hoàn tất thuê phòng</Badge>
                    )}
                    {booking.status === 'REFUNDED' && (
                      <Badge variant="danger">Đã hoàn cọc 100%</Badge>
                    )}
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-neutral-900)', margin: '0 0 6px 0' }}>
                      {booking.roomTitle}
                    </h4>
                    <div style={{ fontSize: '12.5px', color: 'var(--color-neutral-600)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Icon name="map-pin" size={13} color="var(--color-neutral-500)" />
                      <span>{booking.address} • Chủ nhà: <strong>{booking.landlordName}</strong> ({booking.landlordPhone})</span>
                    </div>
                    <div style={{ fontSize: '12.5px', color: 'var(--color-neutral-700)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Icon name="calendar" size={13} color="var(--color-neutral-500)" />
                      <span>Lịch hẹn đến xem: <strong>{booking.appointmentTime} ngày {booking.appointmentDate}</strong></span>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '12px', color: 'var(--color-neutral-600)' }}>Tiền Sàn lưu ký:</span>
                    <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-primary)', fontVariantNumeric: 'tabular-nums' }}>
                      {booking.depositAmount.toLocaleString()} VNĐ
                    </div>
                    <span style={{ fontSize: '11.5px', color: 'var(--color-positive)' }}>Qua {booking.paymentMethod}</span>
                  </div>
                </div>

                {booking.status === 'ESCROW_HOLDING' && (
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', paddingTop: '8px', borderTop: '1px solid var(--color-border)' }}>
                    <Button variant="secondary" size="sm" onClick={() => navigate('/chat')} icon="message">
                      Nhắn tin chủ trọ
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => alert('Đã gửi yêu cầu khiếu nại hoàn cọc! Moderator sẽ đối soát ảnh trong 2h.')}>
                      Khiếu nại hoàn cọc 100%
                    </Button>
                    <Button variant="primary" size="sm" onClick={() => alert('Chúc mừng bạn đã nhận phòng thành công!')}>
                      Xác nhận đã nhận phòng
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
