# Netflix Clone - Backend API with Swagger

## Setup

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Run Backend Server
```bash
npm start          # Production mode
# or
npm run dev       # Development mode (with nodemon)
```

Server sẽ chạy trên: **http://localhost:4000**

## Swagger API Documentation

Truy cập Swagger UI tại: **http://localhost:4000/api-docs**

Tại đây bạn có thể:
- ✅ Xem tất cả API endpoints
- ✅ Test từng API trực tiếp
- ✅ Xem request/response format
- ✅ Xem mô tả từng parameter

## API Endpoints

### Movies
- `GET /api/movies` - Lấy danh sách tất cả phim
- `GET /api/movies/{movieId}` - Lấy chi tiết một phim

### Users  
- `GET /api/users` - Lấy danh sách tất cả users
- `GET /api/users/{userId}` - Lấy chi tiết một user

### Admin
- `POST /api/admin/seed-movies` - Thêm sample movies vào database
- `DELETE /api/admin/clear-movies` - Xóa tất cả phim
- `GET /api/admin/database-stats` - Xem thống kê database

## Hướng Dẫn Test

1. Mở browser: **http://localhost:4000/api-docs**

2. Click vào endpoint muốn test

3. Click "Try it out" button

4. Nhập tham số (nếu có) và click "Execute"

5. Xem response ở phía dưới

### Ví dụ:
```
1. POST /api/admin/seed-movies -> Click "Execute" -> Movies được thêm vào DB
2. GET /api/movies -> Click "Execute" -> Xem danh sách 3 phim vừa thêm
3. GET /api/admin/database-stats -> Xem statistics
```

## Database

MongoDB collections:
- **User** - Lưu thông tin user từ OAuth
- **Movie** - Lưu thông tin phim

## Troubleshooting

Nếu backend không kết nối được MongoDB:
```bash
# Kiểm tra MongoDB có chạy:
mongod

# Hoặc kiểm tra MongoDB Atlas connection string trong .env.local
DATABASE_URL=mongodb://localhost:27017/netflix
```

## Environment Variables

Tạo file `.env.local` trong folder `backend`:
```
DATABASE_URL=mongodb://localhost:27017/netflix
BACKEND_PORT=4000
```
