import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Panel, PanelHeader, PanelBody } from '../../components/common/Panel';
import { Icon } from '../../components/common/Icons';

/**
 * SCR-11: Tạo Tin Phòng & Tham Khảo Giá AI LightGBM (Create Room & AI Valuation).
 * Chuẩn Traveloka Host & FlowX Enterprise.
 */
export function CreateRoomPage() {
  const navigate = useNavigate();

  const [title, setTitle] = useState('Studio Full Đồ Ban Công Thoáng Mát Ngõ 165 Cầu Giấy');
  const [district, setDistrict] = useState('Cầu Giấy');
  const [address, setAddress] = useState('Số 12 ngõ 165 Cầu Giấy, Hà Nội');
  const [areaSqm, setAreaSqm] = useState(28);
  const [maxOccupants, setMaxOccupants] = useState(2);
  const [electricity, setElectricity] = useState(3500);
  const [water, setWater] = useState(25000);
  const [listedPrice, setListedPrice] = useState(3200000);

  // AI State
  const [isAiCalculating, setIsAiCalculating] = useState(false);
  const [aiPrice, setAiPrice] = useState(3250000);

  const handlePredictPrice = () => {
    setIsAiCalculating(true);
    setTimeout(() => {
      setIsAiCalculating(false);
      setAiPrice(3250000);
    }, 600);
  };

  const handlePublishRoom = (e) => {
    e.preventDefault();
    alert('Tin đăng đã được gửi lên Hàng đợi Kiểm duyệt của Moderator! Mã bài đăng: #120.');
    navigate('/landlord/rooms');
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingBottom: '8px', borderBottom: '1px solid var(--color-border)' }}>
        <div>
          <div style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--color-primary)', marginBottom: '4px' }}>
            QUẢN LÝ CHO THUÊ • ĐĂNG BÀI
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--color-neutral-900)', letterSpacing: '-0.02em', margin: 0 }}>
            Tạo bài đăng cho thuê phòng mới
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--color-neutral-600)', marginTop: '4px' }}>
            Thông tin chi tiết phòng, giá điện nước minh bạch và tham khảo khoảng giá thị trường
          </p>
        </div>
        <Button variant="secondary" size="sm" onClick={() => navigate('/landlord/rooms')}>
          Quay lại danh mục
        </Button>
      </div>

      <form onSubmit={handlePublishRoom} style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '24px', alignItems: 'start' }}>
        {/* Left Form: Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Panel>
            <PanelHeader title="1. Thông Tin Cơ Bản & Địa Điểm" />
            <PanelBody>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--color-neutral-700)', marginBottom: '6px' }}>
                    Tiêu đề bài đăng:
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={{ width: '100%', height: '40px', padding: '0 12px', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '13.5px', fontWeight: 500, backgroundColor: 'var(--color-neutral-200)' }}
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--color-neutral-700)', marginBottom: '6px' }}>
                      Quận / Huyện:
                    </label>
                    <select
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      style={{ width: '100%', height: '40px', padding: '0 12px', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '13.5px', fontWeight: 500, backgroundColor: 'var(--color-neutral-200)' }}
                    >
                      <option>Cầu Giấy</option>
                      <option>Hai Bà Trưng</option>
                      <option>Đống Đa</option>
                      <option>Thanh Xuân</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--color-neutral-700)', marginBottom: '6px' }}>
                      Địa chỉ cụ thể:
                    </label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      style={{ width: '100%', height: '40px', padding: '0 12px', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '13.5px', backgroundColor: 'var(--color-neutral-200)' }}
                      required
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--color-neutral-700)', marginBottom: '6px' }}>
                      Diện tích (m²):
                    </label>
                    <input
                      type="number"
                      value={areaSqm}
                      onChange={(e) => setAreaSqm(Number(e.target.value))}
                      style={{ width: '100%', height: '40px', padding: '0 12px', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '13.5px', fontWeight: 600, backgroundColor: 'var(--color-neutral-200)' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--color-neutral-700)', marginBottom: '6px' }}>
                      Số người ở tối đa:
                    </label>
                    <input
                      type="number"
                      value={maxOccupants}
                      onChange={(e) => setMaxOccupants(Number(e.target.value))}
                      style={{ width: '100%', height: '40px', padding: '0 12px', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '13.5px', fontWeight: 600, backgroundColor: 'var(--color-neutral-200)' }}
                    />
                  </div>
                </div>
              </div>
            </PanelBody>
          </Panel>

          <Panel>
            <PanelHeader title="2. Đơn Giá Điện Nước & Tiện Nghi" />
            <PanelBody>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--color-neutral-700)', marginBottom: '6px' }}>
                    Giá điện (đ/kWh):
                  </label>
                  <input
                    type="number"
                    value={electricity}
                    onChange={(e) => setElectricity(Number(e.target.value))}
                    style={{ width: '100%', height: '40px', padding: '0 12px', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '13.5px', fontWeight: 600, backgroundColor: 'var(--color-neutral-200)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--color-neutral-700)', marginBottom: '6px' }}>
                    Giá nước (đ/m³):
                  </label>
                  <input
                    type="number"
                    value={water}
                    onChange={(e) => setWater(Number(e.target.value))}
                    style={{ width: '100%', height: '40px', padding: '0 12px', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '13.5px', fontWeight: 600, backgroundColor: 'var(--color-neutral-200)' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--color-neutral-700)', marginBottom: '8px' }}>
                  Tiện nghi có sẵn:
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', fontSize: '13px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}><input type="checkbox" defaultChecked /> Điều hòa</label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}><input type="checkbox" defaultChecked /> Nóng lạnh</label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}><input type="checkbox" defaultChecked /> Máy giặt</label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}><input type="checkbox" defaultChecked /> Tủ lạnh</label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}><input type="checkbox" defaultChecked /> Ban công</label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}><input type="checkbox" defaultChecked /> Thang máy</label>
                </div>
              </div>
            </PanelBody>
          </Panel>
        </div>

        {/* Right Form: AI Pricing Box */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'sticky', top: '80px' }}>
          <div
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid var(--color-border)',
              borderRadius: '12px',
              padding: '22px',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Icon name="sparkles" size={16} color="var(--color-primary)" />
                <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-neutral-900)' }}>
                  Gợi ý giá thị trường (AI)
                </span>
              </div>
              <Badge variant="info">Dữ liệu Hà Nội</Badge>
            </div>

            <Button
              variant="secondary"
              size="sm"
              style={{ width: '100%', marginBottom: '16px' }}
              onClick={handlePredictPrice}
              loading={isAiCalculating}
              icon="sparkles"
            >
              {isAiCalculating ? 'Đang phân tích...' : 'Xem khoảng giá gợi ý'}
            </Button>

            <div style={{ backgroundColor: 'var(--color-neutral-200)', borderRadius: '8px', padding: '14px', marginBottom: '18px', border: '1px solid var(--color-border)' }}>
              <div style={{ fontSize: '12px', color: 'var(--color-neutral-600)' }}>Giá khuyến nghị thị trường:</div>
              <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--color-primary)', fontVariantNumeric: 'tabular-nums', marginTop: '4px' }}>
                {aiPrice.toLocaleString()} đ
              </div>
              <div style={{ fontSize: '12px', color: 'var(--color-neutral-600)', marginTop: '2px' }}>
                Khoảng an toàn thị trường: 3.0M – 3.5M đ
              </div>
            </div>

            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--color-neutral-700)', marginBottom: '6px' }}>
                Giá niêm yết chính thức:
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="number"
                  value={listedPrice}
                  onChange={(e) => setListedPrice(Number(e.target.value))}
                  style={{ width: '100%', height: '40px', padding: '0 12px', border: '1px solid var(--color-primary)', borderRadius: '8px', fontSize: '15px', fontWeight: 600, fontVariantNumeric: 'tabular-nums', backgroundColor: '#ffffff' }}
                  required
                />
                <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-neutral-600)', whiteSpace: 'nowrap' }}>đ/tháng</span>
              </div>
              <span style={{ fontSize: '12px', color: 'var(--color-positive)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px', marginTop: '6px' }}>
                <Icon name="check" size={13} color="var(--color-positive)" /> Mức giá chuẩn (Đạt chỉ số duyệt nhanh SLA &lt; 4h)
              </span>
            </div>

            <Button type="submit" variant="primary" size="md" style={{ width: '100%' }}>
              Gửi bài đăng kiểm duyệt
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
