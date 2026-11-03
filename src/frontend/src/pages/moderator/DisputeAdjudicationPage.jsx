import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Panel, PanelHeader, PanelBody } from '../../components/common/Panel';
import { Icon } from '../../components/common/Icons';
import { MOCK_DISPUTES } from '../../api/mockData';

/**
 * SCR-15: Phân Xử Khiếu Nại Tranh Chấp Cọc (Dispute Adjudication).
 * Chuẩn Traveloka & FlowX Enterprise.
 */
export function DisputeAdjudicationPage() {
  const navigate = useNavigate();
  const dispute = MOCK_DISPUTES[0];

  const handleRefundTenant = () => {
    alert(`Đã CHẤP THUẬN khiếu nại! Kích hoạt API VNPAY hoàn trả 100% (500,000 VNĐ) tiền cọc về tài khoản của khách thuê.`);
  };

  const handlePayoutLandlord = () => {
    alert(`Đã BÁC khiếu nại! Tiền cọc được giải ngân cho chủ trọ do khách vi phạm cam kết.`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingBottom: '8px', borderBottom: '1px solid var(--color-border)' }}>
        <div>
          <div style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--color-critical)', marginBottom: '4px' }}>
            KIỂM DUYỆT • PHÂN XỬ TRANH CHẤP
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--color-neutral-900)', letterSpacing: '-0.02em', margin: 0 }}>
            Phân xử khiếu nại tranh chấp cọc Escrow
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--color-neutral-600)', marginTop: '4px' }}>
            Hồ sơ khiếu nại #{dispute.id} • Đơn cọc liên kết: <strong>#{dispute.bookingId}</strong>
          </p>
        </div>
        <Badge variant="danger">Đang Tranh Chấp</Badge>
      </div>

      <Panel>
        <PanelHeader
          title={`Vụ việc: ${dispute.roomTitle}`}
          badge={<Badge variant="warning">Tiền ký quỹ tranh chấp: 500,000 VNĐ</Badge>}
          subtitle={`Nộp lúc: ${dispute.filedAt}`}
        />
        <PanelBody>
          {/* Side by side evidence */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--color-neutral-700)', marginBottom: '8px' }}>
                Ảnh Tin Đăng Gốc Sàn Đã Duyệt Ban Đầu:
              </label>
              <div style={{ height: '220px', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--color-border)' }}>
                <img
                  src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600"
                  alt="Original Room"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <span style={{ fontSize: '12px', color: 'var(--color-neutral-600)', display: 'block', marginTop: '6px' }}>
                Tường phòng sạch sẽ, đồ đạc mới
              </span>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--color-critical)', marginBottom: '8px' }}>
                Ảnh Hiện Trường Thực Tế Khách Tải Lên Lúc Xem:
              </label>
              <div style={{ height: '220px', borderRadius: '8px', overflow: 'hidden', border: '2px solid var(--color-critical)' }}>
                <img
                  src={dispute.evidencePhotos[0]}
                  alt="Evidence Reality"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <span style={{ fontSize: '12px', color: 'var(--color-critical)', fontWeight: 600, display: 'block', marginTop: '6px' }}>
                Góc tường bị ngấm dột ẩm mốc nghiêm trọng, điều hòa hỏng
              </span>
            </div>
          </div>

          {/* Statements */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px', fontSize: '13px' }}>
            <div style={{ padding: '16px', backgroundColor: 'var(--color-neutral-200)', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
              <strong style={{ color: 'var(--color-neutral-900)', display: 'block', marginBottom: '4px' }}>
                Ý kiến khiếu nại của Khách thuê ({dispute.tenantName}):
              </strong>
              <p style={{ color: 'var(--color-neutral-700)', margin: 0, lineHeight: 1.45 }}>"{dispute.tenantClaim}"</p>
            </div>

            <div style={{ padding: '16px', backgroundColor: 'var(--color-neutral-200)', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
              <strong style={{ color: 'var(--color-neutral-900)', display: 'block', marginBottom: '4px' }}>
                Phản hồi từ Chủ trọ ({dispute.landlordName}):
              </strong>
              <p style={{ color: 'var(--color-neutral-700)', margin: 0, lineHeight: 1.45 }}>"{dispute.landlordDefense}"</p>
            </div>
          </div>

          {/* Adjudication Decision Bar */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', paddingTop: '16px', borderTop: '1px solid var(--color-border)' }}>
            <Button variant="secondary" size="md" onClick={handlePayoutLandlord}>
              Bác khiếu nại (Giải ngân cho Chủ trọ)
            </Button>
            <Button variant="primary" size="md" onClick={handleRefundTenant} icon="shield-check">
              Chấp thuận khiếu nại (Hoàn cọc 100% cho Khách)
            </Button>
          </div>
        </PanelBody>
      </Panel>
    </div>
  );
}
