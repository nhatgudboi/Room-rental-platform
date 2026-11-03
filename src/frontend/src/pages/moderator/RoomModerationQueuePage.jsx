import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Panel, PanelHeader, PanelBody } from '../../components/common/Panel';
import { Icon } from '../../components/common/Icons';
import { MOCK_ROOMS } from '../../api/mockData';

/**
 * SCR-14: Hàng Đợi Duyệt Tin Phòng & Cờ Lệch Giá AI (Room Moderation Queue).
 * Chuẩn Traveloka & FlowX Enterprise.
 */
export function RoomModerationQueuePage() {
  const navigate = useNavigate();
  const room = MOCK_ROOMS[0];

  const handleApprove = () => {
    alert(`Đã duyệt xuất bản phòng #${room.id} lên Sàn! Tin đăng hiện đã hiển thị công khai.`);
  };

  const handleReject = () => {
    const reason = prompt('Nhập lý do từ chối bài đăng:', 'Ảnh phòng tải lên không rõ ràng hoặc giá điện nước bất thường.');
    if (reason) {
      alert(`Đã từ chối bài đăng #${room.id} kèm lý do: ${reason}`);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingBottom: '8px', borderBottom: '1px solid var(--color-border)' }}>
        <div>
          <div style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--color-primary)', marginBottom: '4px' }}>
            KIỂM DUYỆT • BÀI ĐĂNG PHÒNG TRỌ
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--color-neutral-900)', letterSpacing: '-0.02em', margin: 0 }}>
            Hàng đợi kiểm duyệt bài đăng phòng trọ
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--color-neutral-600)', marginTop: '4px' }}>
            Cảnh báo tự động nếu giá niêm yết chênh lệch bất thường so với mặt bằng khu vực
          </p>
        </div>
        <Badge variant="info" icon="clock">12 tin chờ duyệt</Badge>
      </div>

      <Panel>
        <PanelHeader
          title={`Tin đăng #${room.id}: ${room.title}`}
          badge={<Badge variant="success" icon="check">CCCD Đã Duyệt</Badge>}
          subtitle={`Chủ trọ: ${room.landlord.name} • Tọa độ GPS: 21.036237, 105.790583`}
        />
        <PanelBody>
          {/* AI Valuation Discrepancy Box */}
          <div
            style={{
              backgroundColor: 'var(--color-primary-light)',
              border: '1px solid var(--color-primary-border)',
              borderRadius: '8px',
              padding: '16px 18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '20px',
            }}
          >
            <div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Icon name="sparkles" size={15} color="var(--color-primary)" />
                Đối soát giá so với dữ liệu khu vực (Độ tin cậy 96.2%)
              </div>
              <div style={{ fontSize: '12.5px', color: 'var(--color-neutral-700)', marginTop: '4px' }}>
                Giá chủ trọ niêm yết: <strong>{room.monthlyRent.toLocaleString()} đ</strong> • Giá mô hình dự đoán: <strong>{room.aiPredictedPrice.toLocaleString()} đ</strong> (Lệch: <strong>+1.6%</strong> - Mức an toàn)
              </div>
            </div>
            <Badge variant="success" icon="check">GIÁ PHÙ HỢP THỊ TRƯỜNG</Badge>
          </div>

          {/* Photo Gallery Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '20px' }}>
            {room.images.map((img, idx) => (
              <div key={idx} style={{ height: '180px', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--color-border)' }}>
                <img src={img} alt={`Room image ${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ))}
          </div>

          {/* Room Details Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', padding: '16px', backgroundColor: 'var(--color-neutral-200)', borderRadius: '8px', border: '1px solid var(--color-border)', marginBottom: '20px' }}>
            <div>
              <span style={{ fontSize: '12px', color: 'var(--color-neutral-600)', display: 'block' }}>Diện tích thực tế:</span>
              <strong style={{ fontSize: '14px', color: 'var(--color-neutral-900)' }}>{room.areaSqm} m²</strong>
            </div>
            <div>
              <span style={{ fontSize: '12px', color: 'var(--color-neutral-600)', display: 'block' }}>Khoảng cách đại học:</span>
              <strong style={{ fontSize: '14px', color: 'var(--color-neutral-900)' }}>{room.universityDistance}</strong>
            </div>
            <div>
              <span style={{ fontSize: '12px', color: 'var(--color-neutral-600)', display: 'block' }}>Đơn giá điện:</span>
              <strong style={{ fontSize: '14px', color: 'var(--color-neutral-900)' }}>{room.electricityCost} đ/kWh</strong>
            </div>
            <div>
              <span style={{ fontSize: '12px', color: 'var(--color-neutral-600)', display: 'block' }}>Đơn giá nước:</span>
              <strong style={{ fontSize: '14px', color: 'var(--color-neutral-900)' }}>{room.waterCost} đ/m³</strong>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <Button variant="danger" size="md" onClick={handleReject}>
              Từ chối bài đăng
            </Button>
            <Button variant="primary" size="md" onClick={handleApprove} icon="check">
              Phê duyệt xuất bản bài đăng lên Sàn
            </Button>
          </div>
        </PanelBody>
      </Panel>
    </div>
  );
}
