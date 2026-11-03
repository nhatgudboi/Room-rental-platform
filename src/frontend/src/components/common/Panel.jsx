import React from 'react';

/**
 * Panel & PanelHeader — Clean Card Container inspired by Traveloka and FlowX.
 * Soft borders, 12px radius, generous internal padding.
 */
export function Panel({ children, style = {}, className = '' }) {
  return (
    <div
      className={className}
      style={{
        backgroundColor: '#ffffff',
        border: '1px solid var(--color-border)',
        borderRadius: '12px',
        boxShadow: 'var(--shadow-sm)',
        overflow: 'hidden',
        marginBottom: '20px',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function PanelHeader({ title, subtitle = null, actions = null, badge = null, style = {} }) {
  return (
    <div
      style={{
        padding: '16px 20px',
        borderBottom: '1px solid var(--color-divider)',
        backgroundColor: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        minHeight: '52px',
        ...style,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: 600,
            color: 'var(--color-neutral-900)',
            margin: 0,
            letterSpacing: '-0.01em',
            fontFamily: 'var(--font-heading)',
          }}
        >
          {title}
        </h3>
        {badge}
        {subtitle && (
          <span style={{ fontSize: '13px', color: 'var(--color-neutral-600)', fontWeight: 400 }}>
            {subtitle}
          </span>
        )}
      </div>
      {actions && <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>{actions}</div>}
    </div>
  );
}

export function PanelBody({ children, style = {}, padding = true }) {
  return (
    <div
      style={{
        padding: padding ? '20px' : '0',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
