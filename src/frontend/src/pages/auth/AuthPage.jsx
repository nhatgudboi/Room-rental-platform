import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { Icon } from '../../components/common/Icons';

/**
 * SCR-07: Đăng Nhập & Đăng Ký Phân Quyền (Auth Portal).
 * Chuẩn Traveloka & FlowX.
 */
export function AuthPage() {
  const navigate = useNavigate();
  const [authMode, setAuthMode] = useState('LOGIN'); // LOGIN | REGISTER
  const [selectedRole, setSelectedRole] = useState('TENANT'); // TENANT | LANDLORD
  const [email, setEmail] = useState('tenant@smartrental.vn');
  const [password, setPassword] = useState('Password@123');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedRole === 'LANDLORD') {
      navigate('/landlord/rooms');
    } else {
      navigate('/');
    }
  };

  return (
    <div style={{ maxWidth: '440px', margin: '40px auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div
        style={{
          backgroundColor: '#ffffff',
          border: '1px solid var(--color-border)',
          borderRadius: '16px',
          padding: '32px 28px',
          boxShadow: 'var(--shadow-md)',
        }}
      >
        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              backgroundColor: 'var(--color-primary-light)',
              color: 'var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 12px auto',
            }}
          >
            <Icon name="home" size={24} color="var(--color-primary)" />
          </div>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-neutral-900)', margin: 0 }}>
            Smart Rental
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--color-neutral-600)', marginTop: '4px' }}>
            Sàn Cho Thuê Phòng Trọ Xác Thực 100% & Ký Quỹ Escrow
          </p>
        </div>

        {/* Auth Mode Tabs */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            backgroundColor: 'var(--color-neutral-200)',
            borderRadius: '8px',
            padding: '3px',
            marginBottom: '20px',
            fontSize: '13px',
            fontWeight: 600,
          }}
        >
          <button
            type="button"
            onClick={() => setAuthMode('LOGIN')}
            style={{
              padding: '8px',
              border: 'none',
              borderRadius: '6px',
              backgroundColor: authMode === 'LOGIN' ? '#ffffff' : 'transparent',
              color: authMode === 'LOGIN' ? 'var(--color-neutral-900)' : 'var(--color-neutral-600)',
              cursor: 'pointer',
              boxShadow: authMode === 'LOGIN' ? 'var(--shadow-xs)' : 'none',
              transition: 'all 0.12s ease',
            }}
          >
            Đăng Nhập
          </button>
          <button
            type="button"
            onClick={() => setAuthMode('REGISTER')}
            style={{
              padding: '8px',
              border: 'none',
              borderRadius: '6px',
              backgroundColor: authMode === 'REGISTER' ? '#ffffff' : 'transparent',
              color: authMode === 'REGISTER' ? 'var(--color-neutral-900)' : 'var(--color-neutral-600)',
              cursor: 'pointer',
              boxShadow: authMode === 'REGISTER' ? 'var(--shadow-xs)' : 'none',
              transition: 'all 0.12s ease',
            }}
          >
            Đăng Ký Mới
          </button>
        </div>

        {/* Role Selector */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--color-neutral-700)', textTransform: 'uppercase', marginBottom: '8px' }}>
            Bạn tham gia với vai trò:
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '13px', fontWeight: 600 }}>
            <button
              type="button"
              onClick={() => setSelectedRole('TENANT')}
              style={{
                padding: '10px',
                border: selectedRole === 'TENANT' ? '1.5px solid var(--color-primary)' : '1px solid var(--color-border)',
                backgroundColor: selectedRole === 'TENANT' ? 'var(--color-primary-light)' : 'transparent',
                borderRadius: '8px',
                color: selectedRole === 'TENANT' ? 'var(--color-primary)' : 'var(--color-neutral-700)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
              }}
            >
              <Icon name="user" size={15} color={selectedRole === 'TENANT' ? 'var(--color-primary)' : 'var(--color-neutral-600)'} />
              <span>Khách Thuê Phòng</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedRole('LANDLORD')}
              style={{
                padding: '10px',
                border: selectedRole === 'LANDLORD' ? '1.5px solid var(--color-primary)' : '1px solid var(--color-border)',
                backgroundColor: selectedRole === 'LANDLORD' ? 'var(--color-primary-light)' : 'transparent',
                borderRadius: '8px',
                color: selectedRole === 'LANDLORD' ? 'var(--color-primary)' : 'var(--color-neutral-700)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
              }}
            >
              <Icon name="building" size={15} color={selectedRole === 'LANDLORD' ? 'var(--color-primary)' : 'var(--color-neutral-600)'} />
              <span>Chủ Nhà Cho Thuê</span>
            </button>
          </div>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--color-neutral-700)', marginBottom: '6px' }}>
              Email hoặc Số điện thoại:
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', height: '42px', padding: '0 12px', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '13.5px', backgroundColor: 'var(--color-neutral-200)' }}
              required
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--color-neutral-700)', marginBottom: '6px' }}>
              Mật khẩu:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', height: '42px', padding: '0 12px', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '13.5px', backgroundColor: 'var(--color-neutral-200)' }}
              required
            />
          </div>

          <Button type="submit" variant="primary" size="lg" style={{ width: '100%', marginTop: '6px' }}>
            {authMode === 'LOGIN' ? 'Đăng Nhập Ngay' : 'Tạo Tài Khoản Xác Thực'}
          </Button>
        </form>

        <div style={{ marginTop: '18px', textAlign: 'center', fontSize: '12px', color: 'var(--color-neutral-600)' }}>
          Tài khoản Demo có sẵn: <strong style={{ color: 'var(--color-neutral-900)' }}>Password@123</strong>
        </div>
      </div>
    </div>
  );
}
