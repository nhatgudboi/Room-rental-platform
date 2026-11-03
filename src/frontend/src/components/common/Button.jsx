import React from 'react';
import { Icon } from './Icons';

/**
 * Button Primitive — Clean, mature button component inspired by Traveloka and FlowX.
 * Variants: primary (solid blue), secondary (clean white border), ghost (text), danger (soft red)
 * Sizes: sm (32px), md (38px), lg (44px)
 */
export function Button({
  children,
  variant = 'secondary',
  size = 'md',
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  className = '',
  icon = null,
  style = {},
  ...props
}) {
  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    borderRadius: '8px',
    fontWeight: 600,
    fontFamily: 'var(--font-body)',
    whiteSpace: 'nowrap',
    letterSpacing: '-0.01em',
    textDecoration: 'none',
    transition: 'all 0.15s ease',
    outline: 'none',
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    boxSizing: 'border-box',
    border: '1px solid transparent',
  };

  const sizeStyles = {
    sm: { padding: '0 12px', fontSize: '13px', height: '32px' },
    md: { padding: '0 16px', fontSize: '14px', height: '38px' },
    lg: { padding: '0 20px', fontSize: '15px', height: '44px' },
  };

  const variantStyles = {
    primary: {
      backgroundColor: 'var(--color-primary)',
      borderColor: 'var(--color-primary)',
      color: '#ffffff',
      boxShadow: 'var(--shadow-xs)',
    },
    secondary: {
      backgroundColor: '#ffffff',
      color: 'var(--color-text)',
      borderColor: 'var(--color-border)',
      boxShadow: 'var(--shadow-xs)',
    },
    danger: {
      backgroundColor: 'var(--color-critical-bg)',
      color: 'var(--color-critical)',
      borderColor: 'var(--color-critical-border)',
    },
    ghost: {
      backgroundColor: 'transparent',
      color: 'var(--color-primary)',
      borderColor: 'transparent',
    },
  };

  const combinedStyles = {
    ...baseStyles,
    ...sizeStyles[size],
    ...variantStyles[variant],
    ...style,
  };

  const renderIcon = () => {
    if (loading) {
      return (
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          style={{ animation: 'spin 0.8s linear infinite' }}
        >
          <circle cx="12" cy="12" r="10" strokeDasharray="32" strokeDashoffset="12" />
        </svg>
      );
    }
    if (!icon) return null;
    if (typeof icon === 'string') {
      return <Icon name={icon} size={size === 'sm' ? 14 : 16} />;
    }
    return icon;
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      style={combinedStyles}
      className={`app-btn ${className}`}
      {...props}
    >
      {renderIcon()}
      {children}
    </button>
  );
}
