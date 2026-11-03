import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { StatGrid, StatTile } from '../../components/common/StatTile';
import { Panel, PanelHeader, PanelBody } from '../../components/common/Panel';
import { DataTable } from '../../components/common/DataTable';
import { Icon } from '../../components/common/Icons';
import { MOCK_ROOMS } from '../../api/mockData';

/**
 * SCR-10: Quản Lý Danh Sách Phòng Trọ (Landlord Room Management)
 * Chuẩn Traveloka Host & FlowX Enterprise: Rõ ràng, thoáng đãng, số liệu tabular và 100% SVG icon.
 */
export function RoomManagementPage() {
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState('ALL');

  const filteredRooms =
    filterStatus === 'ALL'
      ? MOCK_ROOMS
      : MOCK_ROOMS.filter((r) => r.status === filterStatus);

  const columns = [
    {
      id: 'title',
      header: 'Phòng Cho Thuê',
      render: (row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <img
            src={row.images[0]}
            alt={row.title}
            style={{
              width: '60px',
              height: '48px',
              objectFit: 'cover',
              borderRadius: '8px',
              border: '1px solid var(--color-border)',
              flexShrink: 0,
            }}
          />
          <div>
            <div
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: 'var(--color-neutral-900)',
                letterSpacing: '-0.01em',
              }}
            >
              {row.title}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--color-neutral-600)', marginTop: '2px' }}>
              {row.address} • {row.areaSqm} m² • Tầng {row.floor || 2}
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'monthlyRent',
      header: 'Giá Niêm Yết',
      numeric: true,
      render: (row) => (
        <div>
          <div
            style={{
              fontWeight: 600,
              fontSize: '14px',
              color: 'var(--color-neutral-900)',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {row.monthlyRent.toLocaleString()} đ
          </div>
          <div style={{ fontSize: '11.5px', color: 'var(--color-neutral-600)' }}>/ tháng</div>
        </div>
      ),
    },
    {
      id: 'viewsCount',
      header: 'Lượt Xem',
      numeric: true,
      render: (row) => (
        <span
          style={{
            color: 'var(--color-neutral-700)',
            fontVariantNumeric: 'tabular-nums',
            fontSize: '13px',
          }}
        >
          {row.viewsCount} lượt
        </span>
      ),
    },
    {
      id: 'status',
      header: 'Trạng Thái',
      render: (row) => {
        if (row.status === 'AVAILABLE') return <Badge variant="success">Còn trống</Badge>;
        if (row.status === 'RESERVED') return <Badge variant="warning">Giữ cọc 48h</Badge>;
        return <Badge variant="neutral">Đã cho thuê</Badge>;
      },
    },
    {
      id: 'actions',
      header: 'Thao Tác',
      numeric: true,
      render: (row) => (
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', alignItems: 'center' }}>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate(`/rooms/${row.id}`)}
          >
            Chi tiết
          </Button>
          {row.status === 'RESERVED' && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate('/landlord/bookings')}
            >
              Xử lý cọc 48h
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Page Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          paddingBottom: '8px',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <div>
          <div
            style={{
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              color: 'var(--color-primary)',
              marginBottom: '4px',
            }}
          >
            QUẢN LÝ CHO THUÊ • HÀ NỘI
          </div>
          <h1
            style={{
              fontSize: '24px',
              fontWeight: 700,
              color: 'var(--color-neutral-900)',
              letterSpacing: '-0.02em',
              margin: 0,
            }}
          >
            Quản lý danh mục phòng cho thuê
          </h1>
          <div
            style={{
              fontSize: '13px',
              color: 'var(--color-neutral-600)',
              marginTop: '4px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span>Chủ nhà: <strong>Nguyễn Văn Chủ</strong></span>
            <span>•</span>
            <span>2 cơ sở (Cầu Giấy, Đống Đa)</span>
            <span>•</span>
            <Badge variant="success" icon="check">CCCD Đã Xác Minh</Badge>
          </div>
        </div>

        {/* Action Button: Đăng tin phòng mới */}
        <Button
          variant="primary"
          size="md"
          onClick={() => navigate('/landlord/rooms/new')}
          icon="plus"
        >
          Đăng tin phòng mới
        </Button>
      </div>

      {/* 4 StatTiles with SVG Icons */}
      <StatGrid columns={4}>
        <StatTile
          label="Tổng số phòng"
          value="8"
          note="2 cơ sở Cầu Giấy & Đống Đa"
          icon="building"
          onClick={() => setFilterStatus('ALL')}
        />
        <StatTile
          label="Phòng còn trống"
          value="3"
          note="Đang mở đón khách xem"
          icon="bed"
          onClick={() => setFilterStatus('AVAILABLE')}
        />
        <StatTile
          label="Đang giữ cọc 48h"
          value="2"
          delta="VNPAY Escrow"
          direction="up"
          note="Chờ ký hợp đồng"
          icon="credit-card"
          onClick={() => setFilterStatus('RESERVED')}
        />
        <StatTile
          label="Doanh thu tháng này"
          value="21,500,000 đ"
          delta="+8%"
          direction="up"
          note="so với tháng trước"
          icon="trending-up"
        />
      </StatGrid>

      {/* Room Table Panel */}
      <Panel>
        <PanelHeader
          title="Danh sách bài đăng cho thuê"
          subtitle={`${filteredRooms.length} bài đăng hiển thị`}
          actions={
            /* Segmented Filter Pill */
            <div
              style={{
                display: 'inline-flex',
                padding: '3px',
                backgroundColor: 'var(--color-neutral-300)',
                borderRadius: '8px',
                border: '1px solid var(--color-border)',
                gap: '2px',
              }}
            >
              <button
                type="button"
                onClick={() => setFilterStatus('ALL')}
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  padding: '5px 12px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: filterStatus === 'ALL' ? '#ffffff' : 'transparent',
                  color: filterStatus === 'ALL' ? 'var(--color-neutral-900)' : 'var(--color-neutral-600)',
                  boxShadow: filterStatus === 'ALL' ? 'var(--shadow-xs)' : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.12s ease',
                }}
              >
                Tất cả (4)
              </button>
              <button
                type="button"
                onClick={() => setFilterStatus('AVAILABLE')}
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  padding: '5px 12px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: filterStatus === 'AVAILABLE' ? '#ffffff' : 'transparent',
                  color: filterStatus === 'AVAILABLE' ? 'var(--color-neutral-900)' : 'var(--color-neutral-600)',
                  boxShadow: filterStatus === 'AVAILABLE' ? 'var(--shadow-xs)' : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.12s ease',
                }}
              >
                Còn trống (3)
              </button>
              <button
                type="button"
                onClick={() => setFilterStatus('RESERVED')}
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  padding: '5px 12px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: filterStatus === 'RESERVED' ? '#ffffff' : 'transparent',
                  color: filterStatus === 'RESERVED' ? 'var(--color-neutral-900)' : 'var(--color-neutral-600)',
                  boxShadow: filterStatus === 'RESERVED' ? 'var(--shadow-xs)' : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.12s ease',
                }}
              >
                Giữ cọc (1)
              </button>
            </div>
          }
        />
        <PanelBody padding={false}>
          <DataTable columns={columns} data={filteredRooms} />
        </PanelBody>
      </Panel>
    </div>
  );
}
