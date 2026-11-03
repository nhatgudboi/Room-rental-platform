import React from 'react';
import { Icon } from './Icons';

/**
 * Badge Primitive — Clean, understated status badge modeled after Traveloka / FlowX tags.
 * Variants: success (green), warning (amber), danger (red), info (blue), neutral (gray)
 */
export function Badge({ children, variant = 'neutral', icon = null, className = '', style = {} }) {
  const badgeMap = {
    success: {
      bg: 'var(--color-positive-bg)',
      color: 'var(--color-positive)',
      border: '1px solid var(--color-positive-border)',
      defaultIcon: 'check',
    },
    warning: {
      bg: 'var(--color-warning-bg)',
      color: 'var(--color-warning)',
      border: '1px solid var(--color-warning-border)',
      defaultIcon: 'clock',
    },
    danger: {
      bg: 'var(--color-critical-bg)',
      color: 'var(--color-critical)',
      border: '1px solid var(--color-critical-border)',
      defaultIcon: null,
    },
    info: {
      bg: 'var(--color-primary-light)',
      color: 'var(--color-primary)',
      border: '1px solid var(--color-primary-border)',
      defaultIcon: 'shield-check',
    },
    neutral: {
      bg: 'var(--color-neutral-300)',
      color: 'var(--color-neutral-700)',
      border: '1px solid var(--color-neutral-400)',
      defaultIcon: null,
    },
  };

  const currentTheme = badgeMap[variant] || badgeMap.neutral;

  const combinedStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px',
    padding: '3px 9px',
    borderRadius: 'var(--radius-pill)',
    fontSize: '12px',
    fontWeight: 500,
    lineHeight: 1.3,
    backgroundColor: currentTheme.bg,
    color: currentTheme.color,
    border: currentTheme.border,
    whiteSpace: 'nowrap',
    letterSpacing: '0.01em',
    ...style,
  };

  const renderIcon = () => {
    if (icon && typeof icon === 'string') {
      return <Icon name={icon} size={12} color="currentColor" />;
    }
    if (icon) return icon;
    return null;
  };

  return (
    <span style={combinedStyle} className={`app-badge ${className}`}>
      {renderIcon()}
      {children}
    </span>
  );
}
