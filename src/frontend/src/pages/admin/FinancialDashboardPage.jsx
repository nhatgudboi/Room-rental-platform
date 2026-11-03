import React from 'react';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Panel, PanelHeader, PanelBody } from '../../components/common/Panel';
import { StatGrid, StatTile } from '../../components/common/StatTile';
import { Icon } from '../../components/common/Icons';
import { MOCK_ADMIN_METRICS } from '../../api/mockData';

/**
 * SCR-17: Dashboard Quản Trị Sàn & Ký Quỹ Escrow (Admin Analytics).
 * Chuẩn Traveloka & FlowX Executive Board.
 */
export function FinancialDashboardPage() {
  const m = MOCK_ADMIN_METRICS;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingBottom: '8px', borderBottom: '1px solid var(--color-border)' }}>
        <div>
          <div style={{ fontSize: '12px', letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--color-primary)', marginBottom: '4px', fontWeight: 600 }}>
            ADMIN FINANCIAL CONSOLE • VNPAY ESCROW
          </div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 700, margin: 0, color: 'var(--color-neutral-900)', letterSpacing: '-0.02em' }}>
            Báo cáo lưu ký ký quỹ & Tài chính sàn
          </h1>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <select
            style={{
              height: '38px',
              padding: '0 12px',
              fontSize: '13px',
              fontWeight: 500,
              backgroundColor: '#ffffff',
              border: '1px solid var(--color-border)',
              borderRadius: '8px',
              color: 'var(--color-neutral-900)',
            }}
          >
            <option>Tháng 11/2026 (Kỳ hiện tại)</option>
            <option>Tháng 10/2026</option>
            <option>Quý 3/2026</option>
          </select>
          <Button variant="primary" size="md" icon="file-text">
            Xuất báo cáo PDF
          </Button>
        </div>
      </div>

      {/* 4 Stat Tiles */}
      <StatGrid columns={4}>
        <StatTile
          label="Tiền cọc lưu ký VNPAY"
          value="420.5M"
          delta="+12%"
          direction="up"
          note={`(${m.escrowHoldingCount} đơn giữ chỗ 48h)`}
          icon="credit-card"
        />
        <StatTile
          label="Doanh thu phí dịch vụ sàn"
          value="48.2M"
          delta="+18%"
          direction="up"
          note="Phí hoa hồng & tin ưu tiên"
          icon="trending-up"
        />
        <StatTile
          label="Tỷ lệ giải ngân đúng hạn"
          value="98.5%"
          delta="Đạt chuẩn SLA"
          direction="up"
          note="Đối soát CCCD & bàn giao"
          icon="shield-check"
        />
        <StatTile
          label="Tỷ lệ khiếu nại cọc"
          value="1.2%"
          delta="-0.4%"
          direction="up"
          note="3 vụ đang xử lý"
          icon="scale"
        />
      </StatGrid>

      {/* Financial Visualizations */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr', gap: '20px' }}>
        <Panel>
          <PanelHeader
            title="Dòng tiền Escrow luân chuyển theo tuần (Tháng 11/2026)"
            subtitle="Đơn vị: Triệu VNĐ"
          />
          <PanelBody>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '24px', height: '220px', padding: '10px 10px 0 10px' }}>
              {[
                { label: 'Tuần 1', value: '85M', height: '55%' },
                { label: 'Tuần 2', value: '110M', height: '72%' },
                { label: 'Tuần 3', value: '95M', height: '62%' },
                { label: 'Tuần 4 (Dự kiến)', value: '130M', height: '88%' },
              ].map((bar) => (
                <div key={bar.label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end', gap: '8px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-primary)', fontVariantNumeric: 'tabular-nums' }}>{bar.value}</span>
                  <div style={{ width: '100%', height: bar.height, backgroundColor: 'var(--color-primary)', borderRadius: '6px 6px 0 0', opacity: 0.85 }} />
                  <span style={{ fontSize: '12px', color: 'var(--color-neutral-600)', whiteSpace: 'nowrap' }}>{bar.label}</span>
                </div>
              ))}
            </div>
          </PanelBody>
        </Panel>

        <Panel>
          <PanelHeader
            title="Tỷ trọng danh mục cọc"
            subtitle="Theo cổng thanh toán & trạng thái"
          />
          <PanelBody>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                  <span>VNPAY-QR Escrow</span>
                  <strong style={{ color: 'var(--color-primary)' }}>82% (345M)</strong>
                </div>
                <div style={{ height: '8px', backgroundColor: 'var(--color-neutral-300)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '82%', height: '100%', backgroundColor: 'var(--color-primary)', borderRadius: '4px' }} />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                  <span>Thẻ ATM nội địa / Internet Banking</span>
                  <strong style={{ color: 'var(--color-neutral-800)' }}>14% (58M)</strong>
                </div>
                <div style={{ height: '8px', backgroundColor: 'var(--color-neutral-300)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '14%', height: '100%', backgroundColor: '#0284c7', borderRadius: '4px' }} />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                  <span>Visa / Mastercard Quốc tế</span>
                  <strong style={{ color: 'var(--color-neutral-800)' }}>4% (17.5M)</strong>
                </div>
                <div style={{ height: '8px', backgroundColor: 'var(--color-neutral-300)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '4%', height: '100%', backgroundColor: '#38bdf8', borderRadius: '4px' }} />
                </div>
              </div>
            </div>
          </PanelBody>
        </Panel>
      </div>
    </div>
  );
}
