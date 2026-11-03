import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Panel, PanelHeader, PanelBody } from '../../components/common/Panel';
import { Icon } from '../../components/common/Icons';

/**
 * SCR-09: Nộp Hồ Sơ Xác Minh KYC Chủ Trọ (Landlord KYC Submission).
 * Chuẩn Traveloka Host: Nghiêm cẩn, an tâm, 100% SVG.
 */
export function KycSubmissionPage() {
  const navigate = useNavigate();
  const [nationalId, setNationalId] = useState('001099012345');
  const [fullName, setFullName] = useState('Nguyễn Văn Chủ');
  const [phone, setPhone] = useState('0903456789');

  const handleSubmitKyc = (e) => {
    e.preventDefault();
    alert('Hồ sơ xác minh CCCD đã được gửi đến hàng đợi Moderator. Thời gian phản hồi: < 4 giờ.');
    navigate('/landlord/rooms');
  };

  return (
    <div style={{ maxWidth: '860px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Pending Banner */}
      <div
        style={{
          backgroundColor: 'var(--color-warning-bg)',
          border: '1px solid var(--color-warning-border)',
          borderRadius: '12px',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: 'var(--shadow-xs)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              backgroundColor: '#fef3c7',
              color: 'var(--color-warning)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Icon name="shield-check" size={22} color="var(--color-warning)" />
          </div>
          <div>
            <div style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--color-warning)' }}>
              Tiến trình xác minh danh tính chủ trọ (Bắt buộc để mở quyền đăng tin)
            </div>
            <div style={{ fontSize: '12.5px', color: 'var(--color-neutral-700)', marginTop: '2px' }}>
              Trạng thái: <strong>Chờ kiểm duyệt</strong> — Moderator đối soát trong vòng 4 giờ làm việc.
            </div>
          </div>
        </div>
        <Badge variant="warning" icon="clock">Chờ duyệt</Badge>
      </div>

      <form onSubmit={handleSubmitKyc}>
        <Panel>
          <PanelHeader title="1. Thông Tin Căn Cước Công Dân (CCCD Gắn Chip)" />
          <PanelBody>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '18px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--color-neutral-700)', marginBottom: '6px' }}>
                  Họ và tên chủ hộ:
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  style={{ width: '100%', height: '40px', padding: '0 12px', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '13.5px', fontWeight: 500, backgroundColor: 'var(--color-neutral-200)' }}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--color-neutral-700)', marginBottom: '6px' }}>
                  Số CCCD (12 số):
                </label>
                <input
                  type="text"
                  value={nationalId}
                  onChange={(e) => setNationalId(e.target.value)}
                  style={{ width: '100%', height: '40px', padding: '0 12px', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '13.5px', fontWeight: 600, fontVariantNumeric: 'tabular-nums', backgroundColor: 'var(--color-neutral-200)' }}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--color-neutral-700)', marginBottom: '6px' }}>
                  Số điện thoại Zalo:
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={{ width: '100%', height: '40px', padding: '0 12px', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '13.5px', fontWeight: 500, backgroundColor: 'var(--color-neutral-200)' }}
                  required
                />
              </div>
            </div>

            <div style={{ fontSize: '12px', color: 'var(--color-neutral-700)', backgroundColor: 'var(--color-primary-light)', padding: '10px 14px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Icon name="shield-check" size={15} color="var(--color-primary)" />
              <span>Sàn cam kết mã hóa dữ liệu CCCD. Số điện thoại chỉ hiển thị cho khách sau khi đặt cọc thành công.</span>
            </div>
          </PanelBody>
        </Panel>

        <Panel>
          <PanelHeader title="2. Tải Lên Hình Ảnh CCCD & Giấy Tờ Nhà Trọ" />
          <PanelBody>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--color-neutral-700)', marginBottom: '6px' }}>
                  Mặt trước CCCD:
                </label>
                <div style={{ height: '140px', border: '1.5px dashed var(--color-border)', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8fafc', cursor: 'pointer' }}>
                  <Icon name="file-text" size={24} color="var(--color-neutral-500)" />
                  <span style={{ fontSize: '12.5px', color: 'var(--color-primary)', fontWeight: 500, marginTop: '6px' }}>Bấm tải ảnh mặt trước CCCD</span>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--color-neutral-700)', marginBottom: '6px' }}>
                  Mặt sau CCCD:
                </label>
                <div style={{ height: '140px', border: '1.5px dashed var(--color-border)', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8fafc', cursor: 'pointer' }}>
                  <Icon name="file-text" size={24} color="var(--color-neutral-500)" />
                  <span style={{ fontSize: '12.5px', color: 'var(--color-primary)', fontWeight: 500, marginTop: '6px' }}>Bấm tải ảnh mặt sau CCCD</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <Button variant="secondary" size="md" onClick={() => navigate('/landlord/rooms')}>
                Hủy bỏ
              </Button>
              <Button type="submit" variant="primary" size="md" icon="check">
                Gửi hồ sơ kiểm duyệt
              </Button>
            </div>
          </PanelBody>
        </Panel>
      </form>
    </div>
  );
}
