import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_ROOMS } from '../../api/mockData';
import { RealMap } from '../../components/map/RealMap';

/**
 * SCR-02: Tìm Kiếm Đa Tiêu Chí & Bản Đồ Số Tương Tác (Split Console).
 * Thiết kế chuẩn Data-Dense Utility UI theo phong cách FlowX.
 */
export function SearchMapPage() {
  const navigate = useNavigate();
  const [activePinId, setActivePinId] = useState(1);
  const [selectedDistrict, setSelectedDistrict] = useState('Tất cả');
  const [priceSort, setPriceSort] = useState('AI_RECOMMENDED');

  const activeRoom = MOCK_ROOMS.find((r) => r.id === activePinId) || MOCK_ROOMS[0];

  return (
    <div style={{ padding: '16px 20px', maxWidth: '100%', height: 'calc(100vh - 110px)', display: 'flex', flexDirection: 'column', gap: '14px', boxSizing: 'border-box' }}>
      {/* ── 1. FILTER RIBBON ── */}
      <div
        style={{
          backgroundColor: '#ffffff',
          border: '1px solid var(--color-border)',
          borderRadius: '10px',
          padding: '10px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          fontSize: '13px',
          boxShadow: 'var(--shadow-xs)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-neutral-600)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Bộ Lọc:
          </span>
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            style={{ fontSize: '13px', fontWeight: 500, padding: '6px 12px', borderRadius: '6px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-neutral-200)', color: 'var(--color-neutral-900)' }}
          >
            <option>Tất cả quận</option>
            <option>Cầu Giấy</option>
            <option>Hai Bà Trưng</option>
            <option>Đống Đa</option>
            <option>Thanh Xuân</option>
          </select>
          <span style={{ fontSize: '12px', padding: '4px 10px', backgroundColor: 'var(--color-neutral-200)', borderRadius: '6px', color: 'var(--color-neutral-700)' }}>
            Khoảng giá: 2.0M – 4.0M
          </span>
          <span style={{ fontSize: '12px', padding: '4px 10px', backgroundColor: 'var(--color-neutral-200)', borderRadius: '6px', color: 'var(--color-neutral-700)' }}>
            Tiện ích: Điều hòa, Khép kín
          </span>
          <span style={{ fontSize: '12px', padding: '4px 10px', backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary)', borderRadius: '6px', fontWeight: 600 }}>
            Quanh ĐH Bách Khoa (&lt; 2km)
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-neutral-600)', textTransform: 'uppercase' }}>
            Sắp xếp:
          </span>
          <select
            value={priceSort}
            onChange={(e) => setPriceSort(e.target.value)}
            style={{ fontSize: '13px', fontWeight: 500, padding: '6px 12px', borderRadius: '6px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-neutral-200)', color: 'var(--color-neutral-900)' }}
          >
            <option value="AI_RECOMMENDED">Gợi ý tốt nhất (Chuẩn giá AI)</option>
            <option value="PRICE_ASC">Giá tăng dần</option>
            <option value="RATING_DESC">Đánh giá sao cao nhất</option>
          </select>
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-neutral-700)', marginLeft: '6px' }}>
            Tìm thấy: <strong style={{ color: 'var(--color-neutral-900)' }}>{MOCK_ROOMS.length} phòng</strong>
          </span>
        </div>
      </div>

      {/* ── 2. TWO-COLUMN SPLIT VIEW ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', flex: 1, minHeight: 0 }}>
        {/* Left: Scrollable Room Listings */}
        <div
          style={{
            overflowY: 'auto',
            paddingRight: '4px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          {MOCK_ROOMS.map((room) => {
            const isSelected = room.id === activePinId;
            return (
              <div
                key={room.id}
                onClick={() => setActivePinId(room.id)}
                style={{
                  backgroundColor: isSelected ? 'var(--color-primary-light)' : '#ffffff',
                  border: isSelected ? '1.5px solid var(--color-primary)' : '1px solid var(--color-border)',
                  borderRadius: '10px',
                  padding: '12px 14px',
                  display: 'flex',
                  gap: '14px',
                  cursor: 'pointer',
                  transition: 'all 0.12s ease',
                  boxShadow: 'var(--shadow-xs)',
                }}
              >
                <img
                  src={room.images[0]}
                  alt={room.title}
                  style={{ width: '130px', height: '96px', objectFit: 'cover', borderRadius: '8px', flexShrink: 0 }}
                />
                <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                      <span style={{ fontSize: '11.5px', color: 'var(--color-primary)', fontWeight: 600 }}>
                        {room.address}
                      </span>
                      <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-neutral-800)' }}>
                        ★ {room.avgRating} ({room.reviewCount})
                      </span>
                    </div>
                    <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-neutral-900)', margin: '0 0 4px 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {room.title}
                    </h4>
                    <div style={{ fontSize: '12px', color: 'var(--color-neutral-600)', display: 'flex', gap: '8px' }}>
                      <span>{room.areaSqm} m²</span>
                      <span>•</span>
                      <span>{room.universityDistance}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '8px', borderTop: '1px solid var(--color-border)' }}>
                    <div>
                      <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-primary)', fontVariantNumeric: 'tabular-nums' }}>
                        {(room.monthlyRent / 1000000).toFixed(1)}M
                      </span>
                      <span style={{ fontSize: '11px', color: 'var(--color-neutral-600)' }}> / tháng</span>
                    </div>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); navigate(`/rooms/${room.id}`); }}
                        style={{ height: '28px', padding: '0 12px', fontSize: '12px', background: '#ffffff', border: '1px solid var(--color-border)', borderRadius: '6px', cursor: 'pointer', fontWeight: 500 }}
                      >
                        Chi tiết
                      </button>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); navigate(`/rooms/${room.id}/booking`); }}
                        style={{ height: '28px', padding: '0 12px', fontSize: '12px', background: 'var(--color-primary)', color: '#ffffff', border: 0, borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}
                      >
                        Cọc Escrow
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Real Interactive Map (Leaflet & OpenStreetMap) */}
        <div
          style={{
            position: 'relative',
            borderRadius: '10px',
            border: '1px solid var(--color-border)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Top Info Floating Tag */}
          <div
            style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              zIndex: 1000,
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(4px)',
              padding: '6px 14px',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: 600,
              border: '1px solid var(--color-border)',
              color: 'var(--color-neutral-900)',
              boxShadow: 'var(--shadow-xs)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981' }}></span>
            <span>Bản đồ số tương tác · Quanh ĐH Bách Khoa</span>
          </div>

          {/* Real Leaflet Map */}
          <RealMap
            rooms={MOCK_ROOMS}
            activePinId={activePinId}
            onSelectPin={setActivePinId}
            center={[21.0056, 105.8433]}
            zoom={14}
          />

          {/* Active Card Bottom Floating Overlay */}
          <div
            style={{
              position: 'absolute',
              bottom: '14px',
              left: '14px',
              right: '14px',
              backgroundColor: '#ffffff',
              borderRadius: '10px',
              padding: '12px 16px',
              border: '1px solid var(--color-border)',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              zIndex: 1000,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
              <img
                src={activeRoom.images[0]}
                alt={activeRoom.title}
                style={{ width: '56px', height: '46px', objectFit: 'cover', borderRadius: '6px', flexShrink: 0 }}
              />
              <div style={{ minWidth: 0 }}>
                <div
                  style={{
                    fontSize: '13.5px',
                    fontWeight: 600,
                    color: 'var(--color-neutral-900)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {activeRoom.title}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--color-neutral-600)', marginTop: '2px' }}>
                  {activeRoom.address} • <strong style={{ color: 'var(--color-primary)' }}>{(activeRoom.monthlyRent / 1000000).toFixed(1)}Tr/tháng</strong> • Giá chuẩn AI
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px', flexShrink: 0, marginLeft: '12px' }}>
              <button
                type="button"
                onClick={() => navigate(`/rooms/${activeRoom.id}`)}
                style={{
                  height: '32px',
                  padding: '0 12px',
                  fontSize: '12px',
                  fontWeight: 500,
                  background: '#ffffff',
                  border: '1px solid var(--color-border)',
                  borderRadius: '6px',
                  cursor: 'pointer',
                }}
              >
                Chi tiết
              </button>
              <button
                type="button"
                onClick={() => navigate(`/rooms/${activeRoom.id}/booking`)}
                style={{
                  height: '32px',
                  padding: '0 14px',
                  fontSize: '12px',
                  fontWeight: 600,
                  background: 'var(--color-primary)',
                  color: '#ffffff',
                  border: 0,
                  borderRadius: '6px',
                  cursor: 'pointer',
                }}
              >
                Cọc Escrow 500k
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
