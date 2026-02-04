# Admin Panel

Admin dashboard cho quản lý phim, user và nội dung hệ thống.

## Chạy ứng dụng

```bash
npm install
npm run dev
```

Admin sẽ chạy trên **http://localhost:3001**

## Cấu trúc

```
admin/
├── pages/
│   ├── _app.tsx        (Root component)
│   ├── index.tsx       (Dashboard trang chủ)
│   ├── movies.tsx      (Quản lý phim)
│   ├── users.tsx       (Quản lý user)
│   └── dashboard.tsx   (Thống kê)
├── components/
│   ├── AdminLayout.tsx       (Sidebar + Topbar)
│   ├── MovieForm.tsx         (Form thêm/sửa phim)
│   ├── MovieTable.tsx        (Bảng danh sách phim)
│   └── AdminSearchBar.tsx    (Thanh tìm kiếm)
└── styles/
    └── globals.css
```

## API Endpoints (Backend)

- `GET /api/admin/movies` - Lấy danh sách phim
- `POST /api/admin/movies` - Tạo phim mới
- `PUT /api/admin/movies/:id` - Cập nhật phim
- `DELETE /api/admin/movies/:id` - Xóa phim

Admin kết nối đến **backend** (port 4000) để fetch/update dữ liệu.
