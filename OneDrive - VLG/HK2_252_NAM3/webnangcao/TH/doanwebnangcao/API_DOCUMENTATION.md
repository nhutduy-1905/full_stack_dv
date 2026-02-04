# Netflix Clone - API Documentation

## 🚀 Swagger UI

Truy cập tài liệu API interactively tại: **http://localhost:4000/api-docs**

---

## 📋 API Endpoints

### 🎬 **Movies Endpoints**

#### GET /api/movies
- **Mô tả:** Lấy danh sách tất cả phim
- **Method:** GET
- **Authentication:** Không cần
- **Response:**
  ```json
  [
    {
      "id": "507f1f77bcf86cd799439011",
      "title": "Avatar",
      "description": "...",
      "videoUrl": "https://...",
      "thumbnailUrl": "https://...",
      "genre": "Action, Sci-Fi",
      "duration": 162,
      "releaseDate": "2009-12-18",
      "rating": 7.8
    }
  ]
  ```

#### GET /api/movies/{movieId}
- **Mô tả:** Lấy chi tiết một phim theo ID
- **Method:** GET
- **Parameters:**
  - `movieId` (path, required): MongoDB ObjectId của phim
  - Example: `507f1f77bcf86cd799439011`
- **Response:** Một object phim
- **Error Codes:**
  - 400: Invalid movie ID
  - 404: Movie not found

---

### 👥 **Users Endpoints**

#### GET /api/users
- **Mô tả:** Lấy danh sách tất cả người dùng
- **Method:** GET
- **Authentication:** Không cần
- **Response:** Array of users

#### GET /api/users/{userId}
- **Mô tả:** Lấy chi tiết một người dùng theo ID
- **Method:** GET
- **Parameters:**
  - `userId` (path, required): MongoDB ObjectId của người dùng
- **Error Codes:**
  - 400: Invalid user ID
  - 404: User not found

---

### ⚙️ **Admin Endpoints**

#### POST /api/admin/seed-movies
- **Mô tả:** Xóa hết phim cũ và thêm 3 phim mẫu
- **Method:** POST
- **Authentication:** Không yêu cầu (nên có auth sau)
- **Request Body:** Không cần
- **Response:**
  ```json
  {
    "message": "Movies seeded successfully",
    "count": 3
  }
  ```

#### DELETE /api/admin/clear-movies
- **Mô tả:** Xóa toàn bộ phim trong database
- **Method:** DELETE
- **Authentication:** Không yêu cầu (nên có auth sau)
- **Response:**
  ```json
  {
    "message": "Movies cleared successfully",
    "deletedCount": 5
  }
  ```

#### GET /api/admin/database-stats
- **Mô tả:** Lấy thống kê số lượng người dùng và phim
- **Method:** GET
- **Response:**
  ```json
  {
    "usersCount": 5,
    "moviesCount": 20
  }
  ```

---

### 🏥 **Health Check**

#### GET /
- **Mô tả:** Kiểm tra server có đang chạy không
- **Method:** GET
- **Response:**
  ```json
  {
    "message": "Netflix Clone Backend API",
    "documentation": "http://localhost:4000/api-docs"
  }
  ```

---

## 🧪 Testing các API

### Cách 1: Sử dụng Swagger UI
1. Mở http://localhost:4000/api-docs
2. Nhấn "Try it out" trên endpoint muốn test
3. Điền parameters (nếu có)
4. Nhấn "Execute"

### Cách 2: Sử dụng cURL

```bash
# Get all movies
curl -X GET http://localhost:4000/api/movies

# Get movie by ID
curl -X GET http://localhost:4000/api/movies/507f1f77bcf86cd799439011

# Seed movies
curl -X POST http://localhost:4000/api/admin/seed-movies

# Clear all movies
curl -X DELETE http://localhost:4000/api/admin/clear-movies

# Get database stats
curl -X GET http://localhost:4000/api/admin/database-stats
```

### Cách 3: Sử dụng Postman
1. Tạo collection mới
2. Add requests với URLs và methods như trên
3. Send requests

---

## 📊 Data Schemas

### Movie Schema
```typescript
{
  id: string;              // MongoDB ObjectId
  title: string;           // Tên phim
  description: string;     // Mô tả chi tiết
  videoUrl: string;        // URL YouTube embed
  thumbnailUrl: string;    // URL poster phim
  genre: string;          // Thể loại (ví dụ: "Action, Sci-Fi")
  duration: number;       // Độ dài phim (phút)
  releaseDate: string;    // Ngày phát hành (YYYY-MM-DD)
  rating: number;         // Điểm đánh giá (0-10)
}
```

### User Schema
```typescript
{
  id: string;                    // MongoDB ObjectId
  email: string;                 // Email
  name: string;                  // Tên người dùng
  image: string;                 // Avatar URL
  favoriteIds: string[];        // Array của movie IDs yêu thích
  createdAt: string;            // Ngày tạo (ISO 8601)
}
```

---

## ✅ Testing Checklist

- [x] GET /api/movies - Lấy tất cả phim
- [x] GET /api/movies/{movieId} - Lấy phim theo ID
- [x] GET /api/users - Lấy tất cả người dùng
- [x] GET /api/users/{userId} - Lấy người dùng theo ID
- [x] POST /api/admin/seed-movies - Thêm phim mẫu
- [x] DELETE /api/admin/clear-movies - Xóa tất cả phim
- [x] GET /api/admin/database-stats - Lấy thống kê database
- [x] GET / - Health check

---

## 🔐 Security Notes (TODO)

- [ ] Thêm authentication cho admin endpoints
- [ ] Thêm rate limiting
- [ ] Thêm input validation
- [ ] Thêm CORS restrictions
- [ ] Thêm error logging

---

## 📝 Notes

- Swagger docs tại: http://localhost:4000/api-docs
- Backend server port: 4000
- Next.js server port: 3000
- Database: MongoDB
