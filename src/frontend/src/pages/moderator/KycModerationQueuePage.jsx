import React, { useState } from 'react';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Icon } from '../../components/common/Icons';
import { MOCK_KYC_REQUESTS } from '../../api/mockData';

/**
 * SCR-13: Hàng Đợi Duyệt Hồ Sơ KYC Chủ Trọ (KYC Moderation Queue).
 * Chuẩn Traveloka & FlowX Queue Console.
 */
export function KycModerationQueuePage() {
  const [selectedKycId, setSelectedKycId] = useState(MOCK_KYC_REQUESTS[0].id);
  const activeKyc = MOCK_KYC_REQUESTS.find((k) => k.id === selectedKycId) || MOCK_KYC_REQUESTS[0];

  const handleApprove = () => {
    alert(`Đã PHÊ DUYỆT hồ sơ KYC của chủ trọ ${activeKyc.landlordName}! Tài khoản được cấp quyền đăng bài.`);
  };

  const handleReject = () => {
    const reason = prompt('Nhập lý do từ chối hồ sơ CCCD:', 'Ảnh chụp CCCD bị lóa sáng / không rõ phôi chip, vui lòng chụp lại.');
    if (reason) {
      alert(`Đã gửi thông báo từ chối tới chủ trọ kèm lý do: ${reason}`);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingBottom: '8px', borderBottom: '1px solid var(--color-border)' }}>
        <div>
          <div style={{ fontSize: '12px', letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--color-primary)', marginBottom: '4px', fontWeight: 600 }}>
            KIỂM DUYỆT • DANH TÍNH CHỦ TRỌ
          </div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 700, margin: 0, color: 'var(--color-neutral-900)', letterSpacing: '-0.02em' }}>
            Hàng đợi kiểm duyệt danh tính chủ nhà trọ (eKYC)
          </h1>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Badge variant="info" icon="clock">SLA duyệt cam kết: &lt; 4 giờ làm việc</Badge>
          <span style={{ fontSize: '13px', color: 'var(--color-neutral-600)' }}>
            Đang chờ: <strong>{MOCK_KYC_REQUESTS.length} hồ sơ</strong>
          </span>
        </div>
      </div>

      {/* Two-Column Queue Console */}
      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '20px', alignItems: 'start' }}>
        {/* Left: Queue List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-neutral-600)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Hồ sơ chờ đối soát ({MOCK_KYC_REQUESTS.length})
          </div>

          {MOCK_KYC_REQUESTS.map((kyc) => {
            const isSelected = kyc.id === selectedKycId;
            return (
              <div
                key={kyc.id}
                onClick={() => setSelectedKycId(kyc.id)}
                style={{
                  backgroundColor: isSelected ? 'var(--color-primary-light)' : '#ffffff',
                  border: isSelected ? '1.5px solid var(--color-primary)' : '1px solid var(--color-border)',
                  borderRadius: '10px',
                  padding: '14px 16px',
                  cursor: 'pointer',
                  transition: 'all 0.12s ease',
                  boxShadow: 'var(--shadow-xs)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <strong style={{ fontSize: '13.5px', color: 'var(--color-neutral-900)' }}>{kyc.landlordName}</strong>
                  <span style={{ fontSize: '11.5px', color: 'var(--color-neutral-500)' }}>{kyc.submittedAt}</span>
                </div>
                <div style={{ fontSize: '12.5px', color: 'var(--color-neutral-600)', fontVariantNumeric: 'tabular-nums' }}>
                  CCCD: {kyc.nationalId}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--color-neutral-500)', marginTop: '4px' }}>
                  SĐT: {kyc.phone}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Detailed Document Inspection Box */}
        <div
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid var(--color-border)',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '14px', borderBottom: '1px solid var(--color-border)', marginBottom: '18px' }}>
            <div>
              <span style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', color: 'var(--color-neutral-600)' }}>
                Chi tiết hồ sơ đối soát #{activeKyc.id}
              </span>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 700, margin: '2px 0 0 0', color: 'var(--color-neutral-900)' }}>
                {activeKyc.landlordName} • SĐT: {activeKyc.phone}
              </h3>
            </div>
            <Badge variant="warning" icon="clock">Trạng thái: Chờ phê duyệt</Badge>
          </div>

          <div style={{ marginBottom: '18px' }}>
            <span style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--color-neutral-600)', display: 'block', marginBottom: '6px' }}>
              Giấy tờ chứng minh sở hữu / quản lý nhà trọ:
            </span>
            <div style={{ padding: '10px 14px', backgroundColor: 'var(--color-neutral-200)', borderRadius: '8px', fontSize: '13px', fontWeight: 500, color: 'var(--color-neutral-900)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Icon name="file-text" size={16} color="var(--color-primary)" />
              <span>{activeKyc.propertyDocument}</span>
            </div>
          </div>

          {/* Side by side CCCD Front & Back images */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '22px' }}>
            <div>
              <span style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--color-neutral-700)', display: 'block', marginBottom: '6px' }}>
                Ảnh Mặt Trước CCCD Gắn Chip:
              </span>
              <div style={{ height: '220px', border: '1px solid var(--color-border)', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#f8fafc' }}>
                <img src={activeKyc.frontCccdUrl} alt="Mặt trước CCCD" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <span style={{ fontSize: '12px', color: 'var(--color-positive)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px', marginTop: '6px' }}>
                <Icon name="check" size={13} color="var(--color-positive)" /> Phôi chip rõ nét, số căn cước trùng khớp
              </span>
            </div>

            <div>
              <span style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--color-neutral-700)', display: 'block', marginBottom: '6px' }}>
                Ảnh Mặt Sau CCCD Gắn Chip:
              </span>
              <div style={{ height: '220px', border: '1px solid var(--color-border)', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#f8fafc' }}>
                <img src={activeKyc.backCccdUrl} alt="Mặt sau CCCD" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <span style={{ fontSize: '12px', color: 'var(--color-positive)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px', marginTop: '6px' }}>
                <Icon name="check" size={13} color="var(--color-positive)" /> Vân tay & đặc điểm nhận dạng đạt chuẩn
              </span>
            </div>
          </div>

          {/* Action Decision Buttons */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', paddingTop: '16px', borderTop: '1px solid var(--color-border)' }}>
            <Button
              variant="danger"
              size="md"
              onClick={handleReject}
            >
              Từ chối hồ sơ (Nhập lý do)
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={handleApprove}
              icon="check"
            >
              Phê duyệt cấp quyền đăng bài
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
