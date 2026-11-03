import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../components/common/Icons';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { MOCK_ROOMS } from '../../api/mockData';

/**
 * SCR-01: Trang Chủ Tìm Kiếm Phòng Trọ Dành Cho Khách Thuê (Tenant Discovery).
 * Phong cách Traveloka: Sang trọng, ấm áp, tối ưu khoảng thở (spacing) và 100% icon SVG chuẩn mực.
 */
export function HomePage() {
  const navigate = useNavigate();

  // Filter States for Tenant
  const [selectedUniversity, setSelectedUniversity] = useState('Đại học Bách Khoa Hà Nội');
  const [selectedRadius, setSelectedRadius] = useState('< 2 km');
  const [selectedDistrict, setSelectedDistrict] = useState('Tất cả');
  const [selectedPrice, setSelectedPrice] = useState('Tất cả');

  // Filter Logic
  const filteredRooms = MOCK_ROOMS.filter((room) => {
    if (selectedDistrict !== 'Tất cả' && room.district !== selectedDistrict) return false;
    if (selectedPrice === 'Dưới 2.5Tr' && room.monthlyRent >= 2500000) return false;
    if (selectedPrice === '2.5Tr - 4Tr' && (room.monthlyRent < 2500000 || room.monthlyRent > 4000000)) return false;
    if (selectedPrice === 'Trên 4Tr' && room.monthlyRent <= 4000000) return false;
    return true;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* ── 1. TRAVELOKA-STYLE COMPACT SEARCH CONSOLE ── */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          border: '1px solid var(--color-border)',
          padding: '20px 24px',
          boxShadow: 'var(--shadow-xs)',
        }}
      >
        <div style={{ marginBottom: '16px' }}>
          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '20px',
              fontWeight: 700,
              color: 'var(--color-neutral-900)',
              letterSpacing: '-0.02em',
              margin: '0 0 4px 0',
            }}
          >
            Tìm phòng trọ sinh viên gần trường đại học
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--color-neutral-600)', margin: 0 }}>
            Phòng xác thực chính chủ CCCD • Định giá chuẩn thị trường • Bảo chứng tiền cọc Escrow 48h
          </p>
        </div>

        {/* Search Ribbon */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.8fr 1.2fr 1.2fr auto',
            gap: '14px',
            alignItems: 'flex-end',
          }}
        >
          {/* Field 1: University */}
          <div>
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '12px',
                fontWeight: 600,
                color: 'var(--color-neutral-700)',
                marginBottom: '6px',
              }}
            >
              <Icon name="map-pin" size={14} color="var(--color-primary)" />
              Trường Đại Học
            </label>
            <select
              value={selectedUniversity}
              onChange={(e) => setSelectedUniversity(e.target.value)}
              style={{
                width: '100%',
                height: '40px',
                fontSize: '13.5px',
                fontWeight: 500,
                border: '1px solid var(--color-border)',
                borderRadius: '8px',
                backgroundColor: 'var(--color-neutral-200)',
                padding: '0 12px',
                color: 'var(--color-neutral-900)',
              }}
            >
              <option>Đại học Bách Khoa Hà Nội</option>
              <option>Đại học Quốc Gia Hà Nội (Cầu Giấy)</option>
              <option>Đại học Kinh Tế Quốc Dân (NEU)</option>
              <option>Học viện Ngân Hàng (Chùa Bộc)</option>
              <option>Đại học Sư Phạm Hà Nội</option>
              <option>Đại học Hà Nội (Thanh Xuân)</option>
            </select>
          </div>

          {/* Field 2: Radius */}
          <div>
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '12px',
                fontWeight: 600,
                color: 'var(--color-neutral-700)',
                marginBottom: '6px',
              }}
            >
              <Icon name="clock" size={14} color="var(--color-primary)" />
              Bán Kính Quanh Trường
            </label>
            <select
              value={selectedRadius}
              onChange={(e) => setSelectedRadius(e.target.value)}
              style={{
                width: '100%',
                height: '40px',
                fontSize: '13.5px',
                fontWeight: 500,
                border: '1px solid var(--color-border)',
                borderRadius: '8px',
                backgroundColor: 'var(--color-neutral-200)',
                padding: '0 12px',
                color: 'var(--color-neutral-900)',
              }}
            >
              <option>Bán kính &lt; 1.5 km (Đi bộ 15p)</option>
              <option>Bán kính &lt; 2.5 km (Xe đạp 10p)</option>
              <option>Bán kính &lt; 5.0 km (Xe máy 15p)</option>
            </select>
          </div>

          {/* Field 3: Price Range */}
          <div>
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '12px',
                fontWeight: 600,
                color: 'var(--color-neutral-700)',
                marginBottom: '6px',
              }}
            >
              <Icon name="credit-card" size={14} color="var(--color-primary)" />
              Khoảng Giá Thuê
            </label>
            <select
              value={selectedPrice}
              onChange={(e) => setSelectedPrice(e.target.value)}
              style={{
                width: '100%',
                height: '40px',
                fontSize: '13.5px',
                fontWeight: 500,
                border: '1px solid var(--color-border)',
                borderRadius: '8px',
                backgroundColor: 'var(--color-neutral-200)',
                padding: '0 12px',
                color: 'var(--color-neutral-900)',
              }}
            >
              <option value="Tất cả">Tất cả khoảng giá</option>
              <option value="Dưới 2.5Tr">Dưới 2.5 triệu / tháng</option>
              <option value="2.5Tr - 4Tr">2.5Tr – 4.0 triệu / tháng</option>
              <option value="Trên 4Tr">Trên 4.0 triệu / tháng</option>
            </select>
          </div>

          {/* Action Button: Search */}
          <div>
            <Button
              variant="primary"
              size="md"
              onClick={() => navigate('/rooms')}
              icon="search"
              style={{ height: '40px', padding: '0 22px' }}
            >
              Tìm kiếm
            </Button>
          </div>
        </div>
      </div>

      {/* ── 2. QUICK DISTRICT FILTER CHIPS & MAP SHORTCUT ── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-neutral-700)', marginRight: '4px' }}>
            Khu vực:
          </span>
          {['Tất cả', 'Cầu Giấy', 'Hai Bà Trưng', 'Đống Đa', 'Thanh Xuân'].map((dist) => {
            const isSelected = selectedDistrict === dist;
            return (
              <button
                key={dist}
                type="button"
                onClick={() => setSelectedDistrict(dist)}
                style={{
                  height: '32px',
                  padding: '0 14px',
                  borderRadius: '16px',
                  border: isSelected ? '1px solid var(--color-primary)' : '1px solid var(--color-border)',
                  backgroundColor: isSelected ? 'var(--color-primary)' : '#ffffff',
                  color: isSelected ? '#ffffff' : 'var(--color-neutral-700)',
                  fontSize: '13px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.12s ease',
                  boxShadow: 'var(--shadow-xs)',
                }}
              >
                {dist}
              </button>
            );
          })}
        </div>

        <Button
          variant="secondary"
          size="sm"
          onClick={() => navigate('/rooms')}
          icon="map"
        >
          Xem trên bản đồ số
        </Button>
      </div>

      {/* ── 3. ROOM CARDS GRID ── */}
      <div>
        <div style={{ marginBottom: '16px', fontSize: '14px', color: 'var(--color-neutral-600)' }}>
          Đang hiển thị <strong>{filteredRooms.length} phòng trọ</strong> phù hợp gần khu vực {selectedUniversity}
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
            gap: '20px',
          }}
        >
          {filteredRooms.map((room) => (
            <div
              key={room.id}
              onClick={() => navigate(`/rooms/${room.id}`)}
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid var(--color-border)',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-sm)',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Photo with aspect-ratio 16:10 */}
              <div style={{ position: 'relative', width: '100%', height: '210px', backgroundColor: '#f1f5f9' }}>
                <img
                  src={room.images[0]}
                  alt={room.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />

                {/* Badges on Image */}
                <div style={{ position: 'absolute', top: '10px', left: '10px', display: 'flex', gap: '6px' }}>
                  <Badge variant="success" icon="check">
                    CCCD Đã Xác Minh
                  </Badge>
                  <Badge variant="info" icon="sparkles">
                    AI Chuẩn Giá
                  </Badge>
                </div>

                <div
                  style={{
                    position: 'absolute',
                    bottom: '10px',
                    right: '10px',
                    backgroundColor: 'rgba(15, 23, 42, 0.75)',
                    color: '#ffffff',
                    fontSize: '11.5px',
                    fontWeight: 600,
                    padding: '3px 8px',
                    borderRadius: '6px',
                    backdropFilter: 'blur(4px)',
                  }}
                >
                  ★ {room.avgRating} ({room.reviewCount} đánh giá)
                </div>
              </div>

              {/* Room Content */}
              <div style={{ padding: '16px 18px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div
                    style={{
                      fontSize: '12px',
                      color: 'var(--color-primary)',
                      fontWeight: 600,
                      marginBottom: '4px',
                    }}
                  >
                    {room.district} • {room.universityDistance}
                  </div>

                  <h3
                    style={{
                      fontSize: '15px',
                      fontWeight: 600,
                      color: 'var(--color-neutral-900)',
                      lineHeight: 1.35,
                      marginBottom: '6px',
                    }}
                  >
                    {room.title}
                  </h3>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      fontSize: '12.5px',
                      color: 'var(--color-neutral-600)',
                      marginBottom: '12px',
                    }}
                  >
                    <Icon name="map-pin" size={13} color="var(--color-neutral-500)" />
                    <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {room.address}
                    </span>
                  </div>

                  {/* Amenities Badges */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '14px' }}>
                    <span
                      style={{
                        fontSize: '11.5px',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        backgroundColor: 'var(--color-neutral-200)',
                        color: 'var(--color-neutral-700)',
                        border: '1px solid var(--color-border)',
                      }}
                    >
                      {room.areaSqm} m²
                    </span>
                    <span
                      style={{
                        fontSize: '11.5px',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        backgroundColor: 'var(--color-neutral-200)',
                        color: 'var(--color-neutral-700)',
                        border: '1px solid var(--color-border)',
                      }}
                    >
                      Điện {room.electricityCost}đ
                    </span>
                    <span
                      style={{
                        fontSize: '11.5px',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        backgroundColor: 'var(--color-neutral-200)',
                        color: 'var(--color-neutral-700)',
                        border: '1px solid var(--color-border)',
                      }}
                    >
                      Nước {room.waterCost / 1000}k
                    </span>
                    <span
                      style={{
                        fontSize: '11.5px',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        backgroundColor: 'var(--color-neutral-200)',
                        color: 'var(--color-neutral-700)',
                        border: '1px solid var(--color-border)',
                      }}
                    >
                      Khép kín
                    </span>
                  </div>
                </div>

                {/* Price and Actions */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '12px',
                    borderTop: '1px solid var(--color-border)',
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: '18px',
                        fontWeight: 700,
                        color: 'var(--color-primary)',
                        fontVariantNumeric: 'tabular-nums',
                      }}
                    >
                      {room.monthlyRent.toLocaleString()} đ
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--color-neutral-600)' }}>/ tháng</div>
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/rooms/${room.id}`);
                      }}
                    >
                      Chi tiết
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/rooms/${room.id}/booking`);
                      }}
                    >
                      Cọc 500k Escrow
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
