/**
 * SMART ROOM RENTAL PLATFORM — AUTOMATED SCREENSHOT SUITE
 * Uses puppeteer-core + Microsoft Edge Headless (retina 2x resolution).
 * Captures full-page screenshots of all 18 screens into docs/screenshots/ and images/.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Project root is two levels up from src/frontend
const PROJECT_ROOT = path.resolve(__dirname, '../../');
const BASE_URL = process.env.RENTAL_WEB_BASE ?? 'http://localhost:3000';

// Single unified target output directory
const IMAGES_DIR = path.resolve(PROJECT_ROOT, 'docs/images');

const EDGE_BIN = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const SCREENS = [
  { route: '/', name: 'SCR-01-home-discovery', title: 'SCR-01: Trang chủ & Tìm kiếm phòng' },
  { route: '/rooms', name: 'SCR-02-search-split-map', title: 'SCR-02: Bản đồ số thật OpenStreetMap & Lọc phòng' },
  { route: '/rooms/1', name: 'SCR-03-room-detail-ai', title: 'SCR-03: Chi tiết phòng & Thước đo giá thị trường' },
  { route: '/rooms/1/booking', name: 'SCR-04-escrow-checkout', title: 'SCR-04: Đặt cọc ký quỹ Escrow VNPAY' },
  { route: '/bookings/BK-202611-0089/dispute', name: 'SCR-05-dispute-filing', title: 'SCR-05: Khiếu nại cọc 24h & Upload bằng chứng' },
  { route: '/bookings/BK-202610-0042/review', name: 'SCR-06-verified-review', title: 'SCR-06: Đánh giá sau lưu trú (Verified Review)' },
  { route: '/auth/login', name: 'SCR-07-auth-portal', title: 'SCR-07: Đăng nhập & Đăng ký phân quyền' },
  { route: '/profile', name: 'SCR-08-tenant-profile-bookings', title: 'SCR-08: Hồ sơ cá nhân & Đơn cọc của tôi' },
  { route: '/landlord/kyc', name: 'SCR-09-landlord-kyc', title: 'SCR-09: Nộp hồ sơ xác minh CCCD chủ trọ' },
  { route: '/landlord/rooms', name: 'SCR-10-landlord-room-management', title: 'SCR-10: Quản lý danh mục phòng cho thuê' },
  { route: '/landlord/rooms/new', name: 'SCR-11-create-room-ai-valuation', title: 'SCR-11: Tạo tin mới & Tham khảo giá thị trường' },
  { route: '/landlord/bookings', name: 'SCR-12-landlord-escrow-bookings', title: 'SCR-12: Quản lý đơn khách cọc 48h (Chủ trọ)' },
  { route: '/mod/kyc', name: 'SCR-13-kyc-moderation-queue', title: 'SCR-13: Hàng đợi duyệt hồ sơ CCCD chủ trọ' },
  { route: '/mod/rooms', name: 'SCR-14-room-moderation-ai-flag', title: 'SCR-14: Hàng đợi duyệt tin & Đối soát giá' },
  { route: '/mod/disputes', name: 'SCR-15-dispute-adjudication', title: 'SCR-15: Phân xử khiếu nại cọc Escrow' },
  { route: '/admin/users', name: 'SCR-16-admin-user-management', title: 'SCR-16: Quản trị tài khoản & Khóa người dùng' },
  { route: '/admin/dashboard', name: 'SCR-17-admin-financial-dashboard', title: 'SCR-17: Dashboard lưu ký Escrow & Doanh thu sàn' },
  { route: '/chat', name: 'SCR-18-in-app-chat', title: 'SCR-18: Cửa sổ Chat trực tiếp Khách - Chủ' },
];

async function captureAllScreens() {
  console.log('='.repeat(70));
  console.log('📸 SMART ROOM RENTAL — CHỤP FULL ẢNH 18 MÀN HÌNH');
  console.log('='.repeat(70));
  console.log(`🌐 Base URL: ${BASE_URL}`);
  console.log(`📁 Thư mục lưu ảnh: ${IMAGES_DIR}\n`);

  fs.mkdirSync(IMAGES_DIR, { recursive: true });

  const browser = await puppeteer.launch({
    executablePath: EDGE_BIN,
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--hide-scrollbars',
      '--window-size=1440,900',
    ],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });

  for (const [index, item] of SCREENS.entries()) {
    const url = `${BASE_URL}${item.route}`;
    const filename = `${item.name}.png`;
    const dest = path.join(IMAGES_DIR, filename);

    process.stdout.write(`[${index + 1}/${SCREENS.length}] Chụp ${item.name}... `);

    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 15000 });
      // Short delay for fonts and Leaflet map tiles
      await new Promise((r) => setTimeout(r, 600));

      await page.screenshot({ path: dest, fullPage: true });

      console.log('✓ Hoàn tất');
    } catch (err) {
      console.log(`⚠️ Lỗi: ${err.message}`);
    }
  }

  await browser.close();

  // Create Manifest
  const manifest = {
    generatedAt: new Date().toISOString(),
    totalScreens: SCREENS.length,
    outputFolder: 'docs/images',
    screens: SCREENS.map((s) => ({
      ...s,
      file: `${s.name}.png`,
    })),
  };

  fs.writeFileSync(path.join(IMAGES_DIR, 'manifest.json'), JSON.stringify(manifest, null, 2));

  console.log('\n🎉 ĐÃ CHỤP XONG TOÀN BỘ 18 MÀN HÌNH!');
  console.log(`👉 Ảnh đã được lưu đồng bộ vào: ${IMAGES_DIR}`);
}

captureAllScreens().catch((err) => {
  console.error('Lỗi khi chụp ảnh:', err);
});
