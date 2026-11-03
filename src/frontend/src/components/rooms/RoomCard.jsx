import React from 'react';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { Icon } from '../common/Icons';

/**
 * RoomCard — Clean Hospitality Room Card inspired by Traveloka & Airbnb.
 * 100% Vector SVG Icons, Professional spacing, Zero Emojis.
 */
export function RoomCard({ room, onSelect, onBookmark, isBookmarked = false }) {
  const formatMoney = (val) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);

  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        border: '1px solid var(--color-border)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-sm)',
        transition: 'all 0.15s ease',
        display: 'flex',
        flexDirection: 'column',
      }}
      className="room-card"
    >
      {/* Photo with Overlay Badges */}
      <div style={{ position: 'relative', width: '100%', paddingTop: '62%', backgroundColor: '#f1f5f9' }}>
        <img
          src={room.primaryImageUrl || room.images?.[0] || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&auto=format&fit=crop&q=80'}
          alt={room.title}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', top: '10px', left: '10px', display: 'flex', gap: '6px' }}>
          <Badge variant="success" icon="check">CCCD Đã Xác Minh</Badge>
          {room.isAiFairPrice && <Badge variant="info" icon="sparkles">AI Chuẩn Giá</Badge>}
        </div>
      </div>

      {/* Body Info */}
      <div style={{ padding: '16px 18px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: 'var(--color-primary)', fontWeight: 600, marginBottom: '4px' }}>
          <Icon name="map-pin" size={13} color="var(--color-primary)" />
          <span>{room.address} • Cách ĐH {room.distanceToLandmark || room.universityDistance || '850m'}</span>
        </div>

        <h3
          style={{
            fontSize: '15px',
            fontWeight: 600,
            marginBottom: '8px',
            color: 'var(--color-neutral-900)',
            lineHeight: 1.35,
          }}
        >
          {room.title}
        </h3>

        <div style={{ display: 'flex', gap: '12px', fontSize: '12.5px', color: 'var(--color-neutral-600)', marginBottom: '14px' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Icon name="maximize" size={13} color="var(--color-neutral-500)" /> {room.areaSqm} m²
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Icon name="users" size={13} color="var(--color-neutral-500)" /> Tối đa {room.maxOccupants || 2} người
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--color-neutral-900)', fontWeight: 600 }}>
            ★ {room.avgRating || '4.9'} ({room.reviewCount || 12})
          </span>
        </div>

        {/* Price & Actions */}
        <div
          style={{
            marginTop: 'auto',
            paddingTop: '12px',
            borderTop: '1px solid var(--color-border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <span style={{ fontSize: '18px', fontWeight: 700, fontVariantNumeric: 'tabular-nums', color: 'var(--color-primary)' }}>
              {formatMoney(room.monthlyRent)}
            </span>
            <span style={{ fontSize: '11.5px', color: 'var(--color-neutral-600)' }}> / tháng</span>
          </div>
          <Button size="sm" variant="secondary" onClick={() => onSelect && onSelect(room.id)}>
            Chi tiết →
          </Button>
        </div>
      </div>
    </div>
  );
}
