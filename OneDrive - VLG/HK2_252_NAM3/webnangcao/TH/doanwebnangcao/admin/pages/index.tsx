import { useRouter } from 'next/router';

export default function AdminHome() {
  const router = useRouter();

  return (
    <div className="bg-black min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-white mb-4">Admin Panel</h1>
        <p className="text-gray-400 mb-8 text-lg">Quản lý nội dung hệ thống</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
          {/* Movies */}
          <button
            onClick={() => router.push('/movies')}
            className="
              bg-red-600
              hover:bg-red-700
              text-white
              font-bold
              py-6
              px-4
              rounded-lg
              transition
              transform
              hover:scale-105
            "
          >
            <div className="text-3xl mb-2">🎬</div>
            <div>Quản Lý Phim</div>
          </button>

          {/* Users */}
          <button
            onClick={() => router.push('/users')}
            className="
              bg-blue-600
              hover:bg-blue-700
              text-white
              font-bold
              py-6
              px-4
              rounded-lg
              transition
              transform
              hover:scale-105
            "
          >
            <div className="text-3xl mb-2">👥</div>
            <div>Quản Lý User</div>
          </button>

          {/* Dashboard */}
          <button
            onClick={() => router.push('/dashboard')}
            className="
              bg-purple-600
              hover:bg-purple-700
              text-white
              font-bold
              py-6
              px-4
              rounded-lg
              transition
              transform
              hover:scale-105
            "
          >
            <div className="text-3xl mb-2">📊</div>
            <div>Dashboard</div>
          </button>
        </div>

        {/* Back Button */}
        <button
          onClick={() => router.push('http://localhost:3000')}
          className="
            mt-8
            text-gray-400
            hover:text-white
            transition
          "
        >
          ← Quay lại trang chính
        </button>
      </div>
    </div>
  );
}
