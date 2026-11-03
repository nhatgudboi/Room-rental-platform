import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Icon } from '../common/Icons';

/**
 * AppShell — Modern Hospitality & Rental Web Application Layout
 * Designed after Traveloka & FlowX standard enterprise navigation:
 * - Level 1 Top Header (56px): Brand Logo + Role Persona Switcher + User Profile
 * - Level 2 Clean Nav Bar (44px): Concise, punchy role-based navigation tabs (NO horizontal scrollbar)
 * - Main Content: Wide, airy, utility-first layout
 */
export function AppShell() {
  const location = useLocation();
  const navigate = useNavigate();

  // Detect current role persona from URL path
  const getInitialPersona = () => {
    const p = location.pathname;
    if (p.startsWith('/admin')) return 'ADMIN';
    if (p.startsWith('/mod')) return 'MODERATOR';
    if (p.startsWith('/landlord')) return 'LANDLORD';
    return 'TENANT';
  };

  const [currentPersona, setCurrentPersona] = useState(getInitialPersona());

  useEffect(() => {
    setCurrentPersona(getInitialPersona());
  }, [location.pathname]);

  const personas = [
    { id: 'TENANT', label: 'Khách thuê' },
    { id: 'LANDLORD', label: 'Chủ trọ' },
    { id: 'MODERATOR', label: 'Kiểm duyệt' },
    { id: 'ADMIN', label: 'Admin' },
  ];

  // Concise, punchy navigation items (No long sentences that cause horizontal overflow)
  const getNavItemsForPersona = () => {
    switch (currentPersona) {
      case 'LANDLORD':
        return [
          { label: 'Phòng cho thuê', path: '/landlord/rooms', icon: 'building' },
          { label: 'Đăng tin mới', path: '/landlord/rooms/new', icon: 'plus' },
          { label: 'Đơn giữ cọc (48h)', path: '/landlord/bookings', icon: 'credit-card' },
          { label: 'Xác minh CCCD', path: '/landlord/kyc', icon: 'shield-check' },
          { label: 'Tin nhắn', path: '/chat', icon: 'message' },
        ];
      case 'MODERATOR':
        return [
          { label: 'Duyệt CCCD', path: '/mod/kyc', icon: 'shield-check' },
          { label: 'Duyệt tin phòng', path: '/mod/rooms', icon: 'file-text' },
          { label: 'Tranh chấp Escrow', path: '/mod/disputes', icon: 'scale' },
        ];
      case 'ADMIN':
        return [
          { label: 'Báo cáo tài chính & Escrow', path: '/admin/dashboard', icon: 'bar-chart' },
          { label: 'Quản trị người dùng', path: '/admin/users', icon: 'users' },
          { label: 'Giám sát tin', path: '/mod/rooms', icon: 'file-text' },
        ];
      case 'TENANT':
      default:
        return [
          { label: 'Tìm phòng trọ', path: '/', icon: 'search' },
          { label: 'Bản đồ số', path: '/rooms', icon: 'map' },
          { label: 'Đặt cọc Escrow', path: '/rooms/1/booking', icon: 'shield-check' },
          { label: 'Đơn cọc của tôi', path: '/profile', icon: 'credit-card' },
          { label: 'Tin nhắn', path: '/chat', icon: 'message' },
        ];
    }
  };

  const navItems = getNavItemsForPersona();

  const handlePersonaChange = (personaId) => {
    setCurrentPersona(personaId);
    if (personaId === 'LANDLORD') navigate('/landlord/rooms');
    else if (personaId === 'MODERATOR') navigate('/mod/kyc');
    else if (personaId === 'ADMIN') navigate('/admin/dashboard');
    else navigate('/');
  };

  const getRoleBadgeLabel = () => {
    if (currentPersona === 'TENANT') return 'Khách thuê';
    if (currentPersona === 'LANDLORD') return 'Chủ trọ đã xác thực';
    if (currentPersona === 'MODERATOR') return 'Kiểm duyệt viên';
    return 'Quản trị viên';
  };

  const isMapPage = location.pathname === '/rooms';

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: 'var(--color-bg)',
        color: 'var(--color-text)',
        fontFamily: 'var(--font-body)',
      }}
    >
      {/* ── 1. MAIN BRAND HEADER (56px) ── */}
      <header
        style={{
          height: '56px',
          flex: 'none',
          backgroundColor: '#ffffff',
          borderBottom: '1px solid var(--color-border)',
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            height: '100%',
            margin: '0 auto',
            padding: '0 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '20px',
          }}
        >
          {/* Brand Logo */}
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              textDecoration: 'none',
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '8px',
                backgroundColor: 'var(--color-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                boxShadow: '0 2px 5px rgba(1, 148, 243, 0.25)',
              }}
            >
              <Icon name="home" size={18} color="#ffffff" />
            </div>
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '17px',
                  fontWeight: 700,
                  color: 'var(--color-neutral-900)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1,
                }}
              >
                Smart<span style={{ color: 'var(--color-primary)' }}>Rental</span>
              </div>
              <div style={{ fontSize: '11px', color: 'var(--color-neutral-600)', fontWeight: 500 }}>
                Bảo chứng cọc Escrow 48h
              </div>
            </div>
          </Link>

          {/* Right: Role Switcher & User Profile */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexShrink: 0 }}>
            {/* Segmented Role Switcher */}
            <div
              style={{
                display: 'inline-flex',
                padding: '2.5px',
                backgroundColor: 'var(--color-neutral-300)',
                borderRadius: '8px',
                border: '1px solid var(--color-border)',
                gap: '2px',
              }}
            >
              {personas.map((p) => {
                const isActive = currentPersona === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => handlePersonaChange(p.id)}
                    style={{
                      padding: '4px 11px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: isActive ? 600 : 500,
                      color: isActive ? '#ffffff' : 'var(--color-neutral-700)',
                      backgroundColor: isActive ? 'var(--color-primary)' : 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.12s ease',
                      boxShadow: isActive ? 'var(--shadow-xs)' : 'none',
                    }}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>

            {/* Profile Pill */}
            <Link
              to="/profile"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                textDecoration: 'none',
                padding: '3px 10px 3px 4px',
                borderRadius: '20px',
                border: '1px solid var(--color-border)',
                backgroundColor: '#ffffff',
              }}
            >
              <div
                style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-primary-light)',
                  color: 'var(--color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '11px',
                }}
              >
                <Icon name="user" size={14} color="var(--color-primary)" />
              </div>
              <div style={{ textAlign: 'left', lineHeight: 1.15 }}>
                <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-neutral-900)' }}>
                  {currentPersona === 'LANDLORD' ? 'Nguyễn Văn Chủ' : currentPersona === 'TENANT' ? 'Nguyễn Văn Thuê' : 'Ban Điều Hành'}
                </div>
                <div style={{ fontSize: '10.5px', color: 'var(--color-neutral-600)' }}>
                  {getRoleBadgeLabel()}
                </div>
              </div>
            </Link>
          </div>
        </div>
      </header>

      {/* ── 2. DEDICATED NAVIGATION TAB BAR (44px) — Full Width, Clean, Zero Scrollbar ── */}
      <nav
        style={{
          height: '44px',
          flex: 'none',
          backgroundColor: '#ffffff',
          borderBottom: '1px solid var(--color-border)',
          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.03)',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            height: '100%',
            margin: '0 auto',
            padding: '0 20px',
            display: 'flex',
            alignItems: 'stretch',
            gap: '8px',
          }}
        >
          {navItems.map((item) => {
            const isSelected = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '7px',
                  padding: '0 14px',
                  fontSize: '13px',
                  fontWeight: isSelected ? 600 : 500,
                  color: isSelected ? 'var(--color-primary)' : 'var(--color-neutral-700)',
                  borderBottom: isSelected ? '2px solid var(--color-primary)' : '2px solid transparent',
                  textDecoration: 'none',
                  transition: 'all 0.12s ease',
                  whiteSpace: 'nowrap',
                }}
              >
                <Icon
                  name={item.icon}
                  size={14}
                  color={isSelected ? 'var(--color-primary)' : 'var(--color-neutral-600)'}
                />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* ── 3. MAIN CONTENT CONTAINER ── */}
      <main
        style={{
          flex: 1,
          width: '100%',
          maxWidth: isMapPage ? '100%' : '1280px',
          margin: '0 auto',
          padding: isMapPage ? '0' : '20px 20px 40px',
          boxSizing: 'border-box',
        }}
      >
        <Outlet context={{ currentPersona }} />
      </main>
    </div>
  );
}
