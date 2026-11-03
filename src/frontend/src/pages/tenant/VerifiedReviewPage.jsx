import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Panel, PanelHeader, PanelBody } from '../../components/common/Panel';

/**
 * SCR-06: Đánh Giá 2 Bước Sau Lưu Trú (Post-Stay Verified Review)
 */
export function VerifiedReviewPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [ratings, setRatings] = useState({
    security: 5,
    cleanliness: 4,
    pricingHonesty: 5,
    landlordSupport: 5,
  });

  const [comment, setComment] = useState(
    'Phòng ở thoáng, cách trường Bách Khoa đi bộ 10 phút. Bác chủ dễ tính hỗ trợ sửa bóng đèn ngay trong ngày. Điện nước có công tơ riêng rõ ràng.'
  );

  const handleSubmitReview = () => {
    alert('Cảm ơn bạn đã gửi đánh giá! Đánh giá của bạn đã được gắn huy hiệu Khách Thuê Thực Tế.');
    navigate('/profile');
  };

  return (
    <div style={{ maxWidth: '720px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      <Panel>
        <PanelHeader
          title="Đánh Giá Trải Nghiệm Sau Lưu Trú Thực Tế"
          badge={<Badge variant="success" icon="check">Khách Thuê Thực Tế Đã Nhận Phòng</Badge>}
        />
        <PanelBody>
          <div style={{ fontSize: '13px', color: 'var(--color-neutral-600)', marginBottom: '18px' }}>
            Đơn hoàn tất: <strong>#{id || 'BK-202610-0042'}</strong> · Chủ trọ: <strong>Nguyễn Văn Chủ</strong>
          </div>

          {/* 4 Core Criteria */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13.5px' }}>
              <span style={{ fontWeight: 500, color: 'var(--color-neutral-800)' }}>1. Mức độ an ninh & Trật tự khu vực:</span>
              <span style={{ color: 'var(--color-warning)', fontWeight: 600, fontSize: '15px' }}>
                ★★★★★ <span style={{ fontSize: '12px', color: 'var(--color-neutral-600)' }}>({ratings.security}/5)</span>
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13.5px' }}>
              <span style={{ fontWeight: 500, color: 'var(--color-neutral-800)' }}>2. Vệ sinh & Môi trường sống xung quanh:</span>
              <span style={{ color: 'var(--color-warning)', fontWeight: 600, fontSize: '15px' }}>
                ★★★★☆ <span style={{ fontSize: '12px', color: 'var(--color-neutral-600)' }}>({ratings.cleanliness}/5)</span>
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13.5px' }}>
              <span style={{ fontWeight: 500, color: 'var(--color-neutral-800)' }}>3. Giá điện nước & Tính minh bạch công tơ:</span>
              <span style={{ color: 'var(--color-warning)', fontWeight: 600, fontSize: '15px' }}>
                ★★★★★ <span style={{ fontSize: '12px', color: 'var(--color-neutral-600)' }}>({ratings.pricingHonesty}/5)</span>
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13.5px' }}>
              <span style={{ fontWeight: 500, color: 'var(--color-neutral-800)' }}>4. Thái độ & Hỗ trợ của Chủ trọ:</span>
              <span style={{ color: 'var(--color-warning)', fontWeight: 600, fontSize: '15px' }}>
                ★★★★★ <span style={{ fontSize: '12px', color: 'var(--color-neutral-600)' }}>({ratings.landlordSupport}/5)</span>
              </span>
            </div>
          </div>

          <div style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--color-neutral-700)', marginBottom: '6px' }}>
              Chia sẻ chi tiết cho cộng đồng sinh viên:
            </label>
            <textarea
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--color-border)', fontSize: '13px', fontFamily: 'var(--font-body)', outline: 'none', backgroundColor: 'var(--color-neutral-200)' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <Button variant="secondary" size="md" onClick={() => navigate('/profile')}>
              Để sau
            </Button>
            <Button variant="primary" size="md" onClick={handleSubmitReview}>
              Đăng đánh giá xác thực
            </Button>
          </div>
        </PanelBody>
      </Panel>
    </div>
  );
}

