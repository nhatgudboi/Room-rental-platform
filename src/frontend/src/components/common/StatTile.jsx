import React from 'react';
import { Icon } from './Icons';

/**
 * StatTile — Clean Metric Card inspired by Traveloka Host & FlowX Enterprise.
 * Standalone cards, generous breathing room (padding 18px 20px), crisp typography.
 */
export function StatTile({
  label,
  value,
  delta = null,
  direction = 'flat',
  note = null,
  subtext = null,
  icon = null,
  onClick = null,
}) {
  const deltaColor =
    direction === 'up'
      ? 'var(--color-positive)'
      : direction === 'down'
      ? 'var(--color-critical)'
      : 'var(--color-neutral-600)';

  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: '#ffffff',
        border: '1px solid var(--color-border)',
        borderRadius: '12px',
        padding: '18px 20px',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.15s ease',
        minWidth: 0,
      }}
    >
      {/* Top Header: Label + Optional Clean Icon */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px',
        }}
      >
        <span
          style={{
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            color: 'var(--color-neutral-600)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {label}
        </span>
        {icon && (
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              backgroundColor: 'var(--color-primary-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-primary)',
            }}
          >
            {typeof icon === 'string' ? <Icon name={icon} size={16} /> : icon}
          </div>
        )}
      </div>

      {/* Main Metric Numeral */}
      <div
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '28px',
          fontWeight: 700,
          color: 'var(--color-neutral-900)',
          lineHeight: 1.15,
          letterSpacing: '-0.02em',
          marginTop: '10px',
          marginBottom: '6px',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {value}
      </div>

      {/* Foot / Subtext */}
      {(delta || note || subtext) && (
        <div
          style={{
            fontSize: '13px',
            color: 'var(--color-neutral-600)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            flexWrap: 'wrap',
          }}
        >
          {delta && (
            <span style={{ color: deltaColor, fontWeight: 600 }}>
              {delta}
            </span>
          )}
          {note && <span>{note}</span>}
          {subtext && !note && <span style={{ color: deltaColor }}>{subtext}</span>}
        </div>
      )}
    </div>
  );
}

export function StatGrid({ children, columns = 4, style = {} }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        gap: '16px',
        marginBottom: '20px',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
