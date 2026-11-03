import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppShell } from '../components/layout/AppShell';

// Public & Discovery Screens
import { HomePage } from '../pages/public/HomePage';
import { SearchMapPage } from '../pages/public/SearchMapPage';
import { RoomDetailPage } from '../pages/public/RoomDetailPage';

// Tenant Screens
import { EscrowCheckoutPage } from '../pages/tenant/EscrowCheckoutPage';
import { DisputeFilingPage } from '../pages/tenant/DisputeFilingPage';
import { VerifiedReviewPage } from '../pages/tenant/VerifiedReviewPage';
import { UserProfilePage } from '../pages/tenant/UserProfilePage';

// Auth Screens
import { AuthPage } from '../pages/auth/AuthPage';

// Landlord Screens
import { KycSubmissionPage } from '../pages/landlord/KycSubmissionPage';
import { RoomManagementPage } from '../pages/landlord/RoomManagementPage';
import { CreateRoomPage } from '../pages/landlord/CreateRoomPage';
import { BookingsManagementPage } from '../pages/landlord/BookingsManagementPage';

// Moderator Screens
import { KycModerationQueuePage } from '../pages/moderator/KycModerationQueuePage';
import { RoomModerationQueuePage } from '../pages/moderator/RoomModerationQueuePage';
import { DisputeAdjudicationPage } from '../pages/moderator/DisputeAdjudicationPage';

// Admin Screens
import { UserManagementPage } from '../pages/admin/UserManagementPage';
import { FinancialDashboardPage } from '../pages/admin/FinancialDashboardPage';

// Communication Screens
import { InAppChatPage } from '../pages/chat/InAppChatPage';

/**
 * AppRoutes — Complete 1:1 Routing Table for Smart Room Rental Platform.
 * Matches 18 screens from Information Architecture and OpenAPI specification.
 */
export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppShell />}>
        {/* SCR-01: Trang Chủ */}
        <Route index element={<HomePage />} />

        {/* SCR-02: Bản Đồ 2 Cột & Lọc */}
        <Route path="rooms" element={<SearchMapPage />} />

        {/* SCR-03: Chi Tiết Phòng */}
        <Route path="rooms/:id" element={<RoomDetailPage />} />

        {/* SCR-04: Đặt Cọc Escrow VNPAY */}
        <Route path="rooms/:id/booking" element={<EscrowCheckoutPage />} />

        {/* SCR-05: Khiếu Nại Hoàn Cọc */}
        <Route path="bookings/:id/dispute" element={<DisputeFilingPage />} />

        {/* SCR-06: Đánh Giá Sau Lưu Trú */}
        <Route path="bookings/:id/review" element={<VerifiedReviewPage />} />

        {/* SCR-07: Đăng Nhập & Đăng Ký */}
        <Route path="auth/login" element={<AuthPage />} />
        <Route path="auth/register" element={<AuthPage />} />

        {/* SCR-08: Hồ Sơ Cá Nhân & Đơn Cọc */}
        <Route path="profile" element={<UserProfilePage />} />

        {/* SCR-09: Nộp KYC Chủ Trọ */}
        <Route path="landlord/kyc" element={<KycSubmissionPage />} />

        {/* SCR-10: Quản Lý Danh Sách Phòng */}
        <Route path="landlord/rooms" element={<RoomManagementPage />} />

        {/* SCR-11: Tạo Tin Phòng & Giá AI */}
        <Route path="landlord/rooms/new" element={<CreateRoomPage />} />

        {/* SCR-12: Quản Lý Đơn Khách Cọc */}
        <Route path="landlord/bookings" element={<BookingsManagementPage />} />

        {/* SCR-13: Hàng Đợi Duyệt KYC */}
        <Route path="mod/kyc" element={<KycModerationQueuePage />} />

        {/* SCR-14: Hàng Đợi Duyệt Tin & Cờ AI */}
        <Route path="mod/rooms" element={<RoomModerationQueuePage />} />

        {/* SCR-15: Phân Xử Tranh Chấp Cọc */}
        <Route path="mod/disputes" element={<DisputeAdjudicationPage />} />

        {/* SCR-16: Quản Trị Người Dùng */}
        <Route path="admin/users" element={<UserManagementPage />} />

        {/* SCR-17: Dashboard Doanh Thu Sàn */}
        <Route path="admin/dashboard" element={<FinancialDashboardPage />} />

        {/* SCR-18: Chat Trực Tiếp Khách - Chủ */}
        <Route path="chat" element={<InAppChatPage />} />

        {/* Fallback */}
        <Route path="*" element={<HomePage />} />
      </Route>
    </Routes>
  );
}
