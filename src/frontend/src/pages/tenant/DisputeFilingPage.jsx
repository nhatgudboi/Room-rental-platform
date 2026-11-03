import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Panel, PanelHeader, PanelBody } from '../../components/common/Panel';
import { Icon } from '../../components/common/Icons';

/**
 * SCR-05: Khiếu Nại & Hoàn Cọc Trong 24h (Dispute & Refund Filing)
 */
export function DisputeFilingPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [reason, setReason] = useState('DAMAGED_ROOM');
  const [description, setDescription] = useState(
    'Em đến xem phòng lúc 17h30 chiều nay, góc tường bị ngấm nước mốc đen rất nặng và điều hòa bật không lên, khác hoàn toàn với ảnh trên tin đăng.'
  );

  const handleSubmitDispute = () => {
    alert('Khiếu nại đã được gửi tới Hàng đợi Phân xử của Moderator. SLA xử lý: < 24 giờ làm việc.');
    navigate('/profile');
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      {/* SLA Alert Strip */}
      <div
        style={{
          backgroundColor: 'var(--color-status-danger-bg)',
          border: '1px solid var(--color-status-danger)',
          borderRadius: 'var(--radius-md)',
          padding: '14px 18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Icon name="alert-triangle" size={22} color="var(--color-critical)" />
          <div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-critical)' }}>
              YÊU CẦU PHÂN XỬ TRANH CHẤP & HOÀN CỌC 100% (ĐƠN #{id || 'BK-202611-0089'})
            </div>
            <div style={{ fontSize: '12px', color: 'var(--color-neutral-700)' }}>
              Thời hạn gửi khiếu nại trước khi giải ngân: <strong>18 giờ 20 phút</strong>
            </div>
          </div>
        </div>
        <Badge variant="danger">ESCROW TẠM DỪNG</Badge>
      </div>

      <Panel>
        <PanelHeader title="1. Lý Do Khiếu Nại Chính" />
        <PanelBody>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12.5px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', border: '1px solid var(--color-divider)', borderRadius: 'var(--radius-sm)', cursor: 'pointer', backgroundColor: reason === 'DAMAGED_ROOM' ? 'var(--color-neutral-200)' : 'transparent' }}>
              <input type="radio" name="reason" value="DAMAGED_ROOM" checked={reason === 'DAMAGED_ROOM'} onChange={() => setReason('DAMAGED_ROOM')} />
              <span>Phòng thực tế bị ẩm mốc, xuống cấp nghiêm trọng khác xa ảnh tin đăng trên sàn</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', border: '1px solid var(--color-divider)', borderRadius: 'var(--radius-sm)', cursor: 'pointer', backgroundColor: reason === 'MISSING_AMENITIES' ? 'var(--color-neutral-200)' : 'transparent' }}>
              <input type="radio" name="reason" value="MISSING_AMENITIES" checked={reason === 'MISSING_AMENITIES'} onChange={() => setReason('MISSING_AMENITIES')} />
              <span>Thiếu tiện nghi cam kết (Không có điều hòa, bình nóng lạnh hỏng không thể sử dụng)</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', border: '1px solid var(--color-divider)', borderRadius: 'var(--radius-sm)', cursor: 'pointer', backgroundColor: reason === 'PRICE_FRAUD' ? 'var(--color-neutral-200)' : 'transparent' }}>
              <input type="radio" name="reason" value="PRICE_FRAUD" checked={reason === 'PRICE_FRAUD'} onChange={() => setReason('PRICE_FRAUD')} />
              <span>Chủ nhà tự ý tăng đơn giá điện nước so với giá niêm yết trên Sàn</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', border: '1px solid var(--color-divider)', borderRadius: 'var(--radius-sm)', cursor: 'pointer', backgroundColor: reason === 'NO_SHOW' ? 'var(--color-neutral-200)' : 'transparent' }}>
              <input type="radio" name="reason" value="NO_SHOW" checked={reason === 'NO_SHOW'} onChange={() => setReason('NO_SHOW')} />
              <span>Chủ nhà bùng hẹn xem phòng không có lý do chính đáng</span>
            </label>
          </div>
        </PanelBody>
      </Panel>

      <Panel>
        <PanelHeader title="2. Mô Tả Chi Tiết & Bằng Chứng Hiện Trường" />
        <PanelBody>
          <div style={{ marginBottom: '14px' }}>
            <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 700, color: 'var(--color-neutral-700)', marginBottom: '6px' }}>
              Mô tả chi tiết sự việc:
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-divider)', fontSize: '12.5px', fontFamily: 'var(--font-body)', outline: 'none' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 700, color: 'var(--color-neutral-700)', marginBottom: '6px' }}>
              Tải lên hình ảnh / video thực tế tại phòng trọ:
            </label>
            <div style={{ display: 'flex', gap: '12px' }}>
              <div
                style={{
                  width: '120px',
                  height: '90px',
                  border: '2px dashed var(--color-neutral-400)',
                  borderRadius: 'var(--radius-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '11px',
                  color: 'var(--color-neutral-600)',
                  cursor: 'pointer',
                  backgroundColor: 'var(--color-neutral-200)',
                }}
              >
                <span>Thêm ảnh minh chứng</span>
                <span>(Tối đa 5 ảnh)</span>
              </div>
              <div style={{ position: 'relative', width: '120px', height: '90px', borderRadius: 'var(--radius-sm)', overflow: 'hidden', border: '1px solid var(--color-divider)' }}>
                <img
                  src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=200"
                  alt="Evidence"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span style={{ position: 'absolute', bottom: '2px', left: '2px', backgroundColor: 'rgba(0,0,0,0.7)', color: '#ffffff', fontSize: '9px', padding: '1px 4px', borderRadius: '2px' }}>
                  anh_tuong_moc.jpg
                </span>
              </div>
            </div>
          </div>
        </PanelBody>
      </Panel>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
        <Button variant="secondary" size="md" onClick={() => navigate('/profile')}>
          Hủy bỏ
        </Button>
        <Button variant="danger" size="md" onClick={handleSubmitDispute}>
          Gửi khiếu nại yêu cầu hoàn cọc 100%
        </Button>
      </div>
    </div>
  );
}

