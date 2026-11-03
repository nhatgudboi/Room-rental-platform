import React, { useState } from 'react';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Icon } from '../../components/common/Icons';

/**
 * SCR-18: Cửa Sổ Chat Trực Tiếp Khách - Chủ (Real-time In-App Messaging).
 * Chuẩn Traveloka & Modern Messenger.
 */
export function InAppChatPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'landlord',
      senderName: 'Nguyễn Văn Chủ',
      text: 'Chào em, phòng này điều hòa và bình nóng lạnh mới bảo dưỡng nhé. Chiều em có qua xem thực tế được không?',
      time: '14:15',
    },
    {
      id: 2,
      sender: 'tenant',
      senderName: 'Bạn',
      text: 'Dạ chiều nay tầm 17h30 em ghé xem phòng thực tế bác nhé!',
      time: '14:18',
    },
    {
      id: 3,
      sender: 'landlord',
      senderName: 'Nguyễn Văn Chủ',
      text: 'Được em nhé, đến đầu ngõ 165 Cầu Giấy alo số 0903456789 bác ra mở cửa dẫn lên phòng 201.',
      time: '14:20',
    },
  ]);

  const [inputText, setInputText] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: 'tenant',
        senderName: 'Bạn',
        text: inputText.trim(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    setInputText('');
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', height: 'calc(100vh - 160px)', minHeight: '620px', display: 'grid', gridTemplateColumns: '320px 1fr', backgroundColor: '#ffffff', border: '1px solid var(--color-border)', borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
      {/* Left Contacts List */}
      <div style={{ borderRight: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '16px 18px', borderBottom: '1px solid var(--color-border)', fontSize: '13px', fontWeight: 600, color: 'var(--color-neutral-800)' }}>
          Hội thoại tin nhắn
        </div>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <div
            style={{
              padding: '14px 18px',
              backgroundColor: 'var(--color-primary-light)',
              borderBottom: '1px solid var(--color-border)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              cursor: 'pointer',
            }}
          >
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-primary)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '14px',
                flexShrink: 0,
              }}
            >
              CT
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ fontSize: '13.5px', color: 'var(--color-neutral-900)' }}>Nguyễn Văn Chủ</strong>
                <span style={{ fontSize: '11px', color: 'var(--color-neutral-600)' }}>14:20</span>
              </div>
              <div style={{ fontSize: '12px', color: 'var(--color-neutral-600)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: '2px' }}>
                Đến đầu ngõ 165 Cầu Giấy alo số...
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Chat Area */}
      <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff' }}>
        {/* Header */}
        <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: 'var(--color-neutral-900)' }}>
              Nguyễn Văn Chủ (Chủ phòng Studio Cầu Giấy)
            </h4>
            <div style={{ fontSize: '12px', color: 'var(--color-positive)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
              <Icon name="check" size={12} color="var(--color-positive)" /> CCCD Đã Xác Minh • Đang hoạt động
            </div>
          </div>
          <Badge variant="success" icon="credit-card">Có đơn cọc Escrow #8821</Badge>
        </div>

        {/* Message Stream */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px', backgroundColor: 'var(--color-neutral-200)' }}>
          {messages.map((msg) => {
            const isMe = msg.sender === 'tenant';
            return (
              <div
                key={msg.id}
                style={{
                  alignSelf: isMe ? 'flex-end' : 'flex-start',
                  maxWidth: '70%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: isMe ? 'flex-end' : 'flex-start',
                }}
              >
                <div
                  style={{
                    backgroundColor: isMe ? 'var(--color-primary)' : '#ffffff',
                    color: isMe ? '#ffffff' : 'var(--color-neutral-900)',
                    padding: '12px 16px',
                    borderRadius: isMe ? '14px 14px 2px 14px' : '14px 14px 14px 2px',
                    fontSize: '13.5px',
                    lineHeight: 1.45,
                    boxShadow: 'var(--shadow-xs)',
                    border: isMe ? 'none' : '1px solid var(--color-border)',
                  }}
                >
                  {msg.text}
                </div>
                <span style={{ fontSize: '11px', color: 'var(--color-neutral-600)', marginTop: '4px' }}>
                  {msg.time}
                </span>
              </div>
            );
          })}
        </div>

        {/* Chat Input */}
        <form onSubmit={handleSendMessage} style={{ padding: '14px 18px', borderTop: '1px solid var(--color-border)', display: 'flex', gap: '10px' }}>
          <input
            type="text"
            placeholder="Nhập tin nhắn hẹn lịch xem phòng hoặc hỏi thêm thông tin..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            style={{
              flex: 1,
              height: '42px',
              padding: '0 14px',
              borderRadius: '8px',
              border: '1px solid var(--color-border)',
              fontSize: '13.5px',
              backgroundColor: 'var(--color-neutral-200)',
            }}
          />
          <Button type="submit" variant="primary" size="md">
            Gửi tin nhắn
          </Button>
        </form>
      </div>
    </div>
  );
}
