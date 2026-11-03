import React from 'react';
import { Badge } from '../common/Badge';
import { Icon } from '../common/Icons';

/**
 * AiPriceGauge — USP component comparing landlord price vs AI LightGBM recommendation.
 * Shows fair price range, pointer on scale, and discrepancy status.
 */
export function AiPriceGauge({
  listedPrice,
  predictedPrice,
  priceMin,
  priceMax,
  confidenceScore = 0.95,
}) {
  const formatMoney = (val) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);

  // Calculate percentage discrepancy
  const diffPercent = predictedPrice
    ? Math.round(((listedPrice - predictedPrice) / predictedPrice) * 100)
    : 0;

  let statusVariant = 'success';
  let statusText = 'Mức giá hợp lý với thị trường';

  if (diffPercent > 35) {
    statusVariant = 'flag';
    statusText = `Cảnh báo: Giá cao hơn ${diffPercent}% so với AI`;
  } else if (diffPercent > 10) {
    statusVariant = 'warning';
    statusText = `Giá cao hơn thị trường khoảng ${diffPercent}%`;
  } else if (diffPercent < -15) {
    statusVariant = 'info';
    statusText = `Giá rất tốt (thấp hơn ${Math.abs(diffPercent)}% so với gợi ý)`;
  }

  // Calculate pointer position (clamped 0 to 100%)
  const minRange = priceMin * 0.8;
  const maxRange = priceMax * 1.2;
  const pointerPos = Math.min(
    100,
    Math.max(0, ((listedPrice - minRange) / (maxRange - minRange)) * 100)
  );

  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        border: '1px solid var(--color-border)',
        borderRadius: '10px',
        padding: '16px',
        boxShadow: 'var(--shadow-xs)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Icon name="sparkles" size={18} color="var(--color-primary)" />
          <span style={{ fontWeight: 600, color: 'var(--color-neutral-900)', fontSize: '14px' }}>
            Định Giá AI LightGBM
          </span>
        </div>
        <Badge variant={statusVariant}>{statusText}</Badge>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)', marginBottom: 'var(--space-3)' }}>
        <div>
          <div style={{ fontSize: '12px', color: 'var(--color-neutral-600)' }}>Giá chủ niêm yết</div>
          <div style={{ fontSize: '18px', fontWeight: 700, fontVariantNumeric: 'tabular-nums', color: 'var(--color-neutral-900)' }}>
            {formatMoney(listedPrice)}
          </div>
        </div>
        <div>
          <div style={{ fontSize: '12px', color: 'var(--color-neutral-600)' }}>Khoảng gợi ý AI</div>
          <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-accent-700)', fontVariantNumeric: 'tabular-nums' }}>
            {formatMoney(priceMin)} – {formatMoney(priceMax)}
          </div>
        </div>
      </div>

      {/* Visual Gauge Track */}
      <div style={{ position: 'relative', marginTop: 'var(--space-4)', marginBottom: 'var(--space-2)' }}>
        <div
          style={{
            height: '8px',
            borderRadius: 'var(--radius-pill)',
            background: 'linear-gradient(to right, #38bdf8 0%, #10b981 30%, #10b981 70%, #f97316 85%, #ef4444 100%)',
          }}
        />
        {/* Pointer indicator */}
        <div
          style={{
            position: 'absolute',
            top: '-6px',
            left: `${pointerPos}%`,
            transform: 'translateX(-50%)',
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            backgroundColor: '#ffffff',
            border: '3px solid var(--color-accent-800)',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          }}
          title={`Giá niêm yết: ${formatMoney(listedPrice)}`}
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--color-neutral-500)' }}>
        <span>Rẻ hơn</span>
        <span>Khoảng an toàn</span>
        <span>Đắt hơn</span>
      </div>
    </div>
  );
}

