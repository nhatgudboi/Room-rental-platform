import React, { useState } from 'react';
import { DataTable } from '../../components/common/DataTable';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Panel, PanelHeader, PanelBody } from '../../components/common/Panel';
import { Icon } from '../../components/common/Icons';

const MOCK_USERS = [
  {
    id: '#001',
    name: 'Nguyễn Quản Trị',
    email: 'admin@smartrental.vn',
    phone: '0901234567',
    role: 'ADMIN',
    status: 'ACTIVE',
    roomsCount: 0,
  },
  {
    id: '#002',
    name: 'Lê Kiểm Duyệt',
    email: 'moderator@smartrental.vn',
    phone: '0902345678',
    role: 'MODERATOR',
    status: 'ACTIVE',
    roomsCount: 0,
  },
  {
    id: '#003',
    name: 'Nguyễn Văn Chủ',
    email: 'landlord@smartrental.vn',
    phone: '0903456789',
    role: 'LANDLORD',
    status: 'ACTIVE',
    roomsCount: 8,
  },
  {
    id: '#004',
    name: 'Trần Thị Sinh Viên',
    email: 'tenant@smartrental.vn',
    phone: '0904567890',
    role: 'TENANT',
    status: 'ACTIVE',
    roomsCount: 0,
  },
  {
    id: '#089',
    name: 'Vũ Văn Lừa Cọc',
    email: 'scammer@fake.vn',
    phone: '0988776655',
    role: 'LANDLORD',
    status: 'SUSPENDED',
    roomsCount: 2,
    reason: 'Đăng ảnh phòng ảo và bùng hẹn cọc 2 lần',
  },
];

/**
 * SCR-16: Quản Trị Người Dùng & Khóa Tài Khoản (User Admin & Suspension).
 * Chuẩn Traveloka & FlowX Setup Console.
 */
export function UserManagementPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [users, setUsers] = useState(MOCK_USERS);

  const handleToggleSuspend = (userId) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const nextStatus = u.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';
          return { ...u, status: nextStatus };
        }
        return u;
      })
    );
  };

  const filteredUsers = users.filter((u) => {
    if (roleFilter !== 'ALL' && u.role !== roleFilter) return false;
    if (searchTerm && !u.name.toLowerCase().includes(searchTerm.toLowerCase()) && !u.email.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const columns = [
    {
      id: 'id',
      header: 'Mã User',
      width: '100px',
      render: (u) => <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-neutral-700)' }}>{u.id}</span>,
    },
    {
      id: 'name',
      header: 'Họ Tên & Email',
      render: (u) => (
        <div>
          <div style={{ fontWeight: 600, color: 'var(--color-neutral-900)', fontSize: '13.5px' }}>{u.name}</div>
          <div style={{ fontSize: '12px', color: 'var(--color-neutral-600)' }}>{u.email}</div>
        </div>
      ),
    },
    {
      id: 'role',
      header: 'Vai Trò',
      render: (u) => {
        if (u.role === 'ADMIN') return <Badge variant="info">Admin</Badge>;
        if (u.role === 'MODERATOR') return <Badge variant="warning">Kiểm duyệt</Badge>;
        if (u.role === 'LANDLORD') return <Badge variant="success">Chủ trọ ({u.roomsCount} phòng)</Badge>;
        return <Badge variant="neutral">Khách thuê</Badge>;
      },
    },
    {
      id: 'phone',
      header: 'Số Điện Thoại',
      render: (u) => <span style={{ fontVariantNumeric: 'tabular-nums' }}>{u.phone}</span>,
    },
    {
      id: 'status',
      header: 'Trạng Thái',
      render: (u) =>
        u.status === 'ACTIVE' ? (
          <Badge variant="success" icon="check">Hoạt động</Badge>
        ) : (
          <Badge variant="danger">Đã khóa tài khoản</Badge>
        ),
    },
    {
      id: 'actions',
      header: 'Thao Tác',
      numeric: true,
      render: (u) => (
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
          <Button
            variant={u.status === 'ACTIVE' ? 'danger' : 'secondary'}
            size="sm"
            onClick={() => handleToggleSuspend(u.id)}
          >
            {u.status === 'ACTIVE' ? 'Khóa vi phạm' : 'Mở khóa'}
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingBottom: '8px', borderBottom: '1px solid var(--color-border)' }}>
        <div>
          <div style={{ fontSize: '12px', letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--color-primary)', marginBottom: '4px', fontWeight: 600 }}>
            QUẢN TRỊ HỆ THỐNG • TÀI KHOẢN
          </div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 700, margin: 0, color: 'var(--color-neutral-900)', letterSpacing: '-0.02em' }}>
            Quản trị người dùng & Kiểm soát tài khoản
          </h1>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <input
            type="text"
            placeholder="Tìm theo tên hoặc email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              height: '38px',
              padding: '0 12px',
              borderRadius: '8px',
              border: '1px solid var(--color-border)',
              fontSize: '13px',
              width: '260px',
              backgroundColor: '#ffffff',
            }}
          />
        </div>
      </div>

      <Panel>
        <PanelHeader
          title="Danh sách tài khoản hệ thống"
          subtitle={`${filteredUsers.length} tài khoản hiển thị`}
          actions={
            <div style={{ display: 'inline-flex', padding: '3px', backgroundColor: 'var(--color-neutral-300)', borderRadius: '8px', border: '1px solid var(--color-border)', gap: '2px' }}>
              {['ALL', 'TENANT', 'LANDLORD', 'MODERATOR', 'ADMIN'].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRoleFilter(r)}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: 600,
                    border: 'none',
                    backgroundColor: roleFilter === r ? '#ffffff' : 'transparent',
                    color: roleFilter === r ? 'var(--color-neutral-900)' : 'var(--color-neutral-600)',
                    boxShadow: roleFilter === r ? 'var(--shadow-xs)' : 'none',
                    cursor: 'pointer',
                  }}
                >
                  {r === 'ALL' ? 'Tất cả' : r}
                </button>
              ))}
            </div>
          }
        />
        <PanelBody padding={false}>
          <DataTable columns={columns} data={filteredUsers} />
        </PanelBody>
      </Panel>
    </div>
  );
}
