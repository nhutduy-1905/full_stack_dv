import React from 'react';
import Link from 'next/link';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="bg-black min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 border-r border-gray-700 p-6 sticky top-0 h-screen overflow-y-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white">Admin</h2>
          <p className="text-gray-400 text-sm">Panel Quản Lý</p>
        </div>

        <nav className="space-y-2">
          {/* Dashboard */}
          <Link href="/" className="
            flex items-center gap-3
            px-4 py-2
            text-gray-300
            hover:bg-gray-800
            rounded-lg
            transition
            block
          ">
            <span>📊</span>
            <span>Dashboard</span>
          </Link>

          {/* Movies */}
          <Link href="/movies" className="
            flex items-center gap-3
            px-4 py-2
            text-gray-300
            hover:bg-gray-800
            rounded-lg
            transition
            block
          ">
            <span>🎬</span>
            <span>Quản Lý Phim</span>
          </Link>

          {/* Users */}
          <Link href="/users" className="
            flex items-center gap-3
            px-4 py-2
            text-gray-300
            hover:bg-gray-800
            rounded-lg
            transition
            block
          ">
            <span>👥</span>
            <span>Quản Lý User</span>
          </Link>
        </nav>

        {/* Divider */}
        <div className="my-6 border-t border-gray-700" />

        {/* Back to Web */}
        <a
          href="http://localhost:3000"
          target="_blank"
          rel="noopener noreferrer"
          className="
            flex items-center gap-3
            px-4 py-2
            text-gray-400
            hover:text-white
            hover:bg-gray-800
            rounded-lg
            transition
            text-sm
          "
        >
          <span>←</span>
          <span>Trang Chính</span>
        </a>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Top Bar */}
        <div className="bg-gray-900 border-b border-gray-700 px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
            <button className="
              text-gray-300
              hover:text-white
              px-4
              py-2
              hover:bg-gray-800
              rounded-lg
              transition
            ">
              ⚙️ Cài Đặt
            </button>
          </div>
        </div>

        {/* Page Content */}
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
