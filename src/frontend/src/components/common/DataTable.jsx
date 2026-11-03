import React from 'react';

/**
 * DataTable — Clean, readable data table inspired by Traveloka & FlowX.
 * Generous row height, tabular numerals, clean subtle divider lines.
 */
export function DataTable({ columns, data, keyField = 'id', onRowClick = null }) {
  return (
    <div style={{ width: '100%', overflowX: 'auto' }}>
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: '13.5px',
          textAlign: 'left',
        }}
      >
        <thead>
          <tr
            style={{
              backgroundColor: 'var(--color-neutral-200)',
              borderBottom: '1px solid var(--color-divider)',
              color: 'var(--color-neutral-600)',
              fontWeight: 600,
              fontSize: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
            }}
          >
            {columns.map((col) => (
              <th
                key={col.id || col.header}
                style={{
                  padding: '12px 18px',
                  textAlign: col.numeric ? 'right' : 'left',
                  width: col.width || 'auto',
                  whiteSpace: 'nowrap',
                }}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                style={{
                  padding: '32px 18px',
                  textAlign: 'center',
                  color: 'var(--color-neutral-600)',
                  fontStyle: 'italic',
                }}
              >
                Không có dữ liệu phù hợp.
              </td>
            </tr>
          ) : (
            data.map((row, idx) => (
              <tr
                key={row[keyField] || idx}
                onClick={() => onRowClick && onRowClick(row)}
                style={{
                  borderBottom: '1px solid var(--color-divider)',
                  cursor: onRowClick ? 'pointer' : 'default',
                  backgroundColor: '#ffffff',
                  transition: 'background-color 0.12s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                }}
              >
                {columns.map((col) => (
                  <td
                    key={col.id || col.header}
                    style={{
                      padding: '12px 18px',
                      color: 'var(--color-neutral-800)',
                      textAlign: col.numeric ? 'right' : 'left',
                      fontFamily: col.isCode ? 'var(--font-mono)' : 'var(--font-body)',
                      fontVariantNumeric: col.numeric ? 'tabular-nums' : 'normal',
                      fontWeight: col.bold ? 600 : 400,
                      verticalAlign: 'middle',
                    }}
                  >
                    {col.render ? col.render(row) : row[col.id]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
