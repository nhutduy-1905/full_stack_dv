# 🔧 CẤP CỨU: DỮ LIỆU PHIM KHÔNG CẬP NHẬT - GIẢI PHÁP ĐẦY ĐỦ

## 📌 **NGUYÊN NHÂN CHÍNH**

Vấn đề xảy ra vì 3 lý do kết hợp:

### ❌ **Problem 1: SWR Cache Quá Mạnh**
```typescript
// ❌ BẠN CÓ CẤI ĐẶT NÀY (khóa cache vĩnh viễn)
const { data, error, isLoading} = useSwr('/api/movies', fetcher, {
  revalidateIfStale: false,          // ❌ KHÔNG update khi dữ liệu cũ
  revalidateOnFocus: false,          // ❌ KHÔNG update khi quay về tab
  revalidateOnReconnect: false,      // ❌ KHÔNG update khi reconnect
});
```

**Hậu quả:**
- Backend thay đổi database → Data mới được lưu ✅
- Frontend vẫn dùng cache cũ → Không thấy dữ liệu mới ❌

### ❌ **Problem 2: Seed Endpoint Không Thông Báo Frontend**
- seed-movies.ts chỉ insert/delete vào database
- Không có cách nào báo cho frontend "load lại dữ liệu"
- Frontend vẫn tin tưởng cache cũ

### ❌ **Problem 3: Không Có Refresh Sau Khi Seed**
- Người dùng nhấn nút seed
- Backend cập nhật database
- Frontend không biết → vẫn hiển thị dữ liệu cũ

---

## ✅ **GIẢI PHÁP ĐƯỢC ÁP DỤNG**

Đã sửa 3 files:

### **1️⃣ File: useBillboard.ts**
```typescript
// ✅ TRƯỚC
const { data, error, isLoading} = useSwr('/api/random', fetcher, {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
});

// ✅ SAU
const { data, error, isLoading} = useSwr('/api/random', fetcher, {
  revalidateIfStale: true,         // ✅ Tự động revalidate khi stale
  revalidateOnFocus: true,         // ✅ Revalidate khi quay về tab
  revalidateOnReconnect: true,     // ✅ Revalidate khi kết nối internet
  dedupingInterval: 60000,         // Cache 60 giây (default 2 giây)
});
```

**Lợi ích:**
- Khi user quay lại tab → Tự động fetch data mới
- Khi internet reconnect → Tự động sync data
- Cache chỉ 60 giây (có thể thay đổi)

---

### **2️⃣ File: useMovieList.ts**
```typescript
// ✅ TRƯỚC
const { data, error, isLoading} = useSwr('/api/movies', fetcher, {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
});

// ✅ SAU
const { data, error, isLoading} = useSwr('/api/movies', fetcher, {
  revalidateIfStale: true,         // ✅ Tự động revalidate khi stale
  revalidateOnFocus: true,         // ✅ Revalidate khi quay về tab
  revalidateOnReconnect: true,     // ✅ Revalidate khi kết nối internet
  dedupingInterval: 60000,         // Cache 60 giây
});
```

**Lợi ích:**
- Danh sách phim tự động cập nhật khi cần
- Không cần manual refresh

---

### **3️⃣ File: seed-data.tsx**
```typescript
// ✅ THÊM import
import { mutate } from 'swr';

// ✅ SAU KHI SEED THÀNH CÔNG
if (!response.ok) {
  setError(`Lỗi...`);
} else {
  setMessage(`✓ ${data.message}`);
  
  // 🔥 FORCE REFRESH DATA - Cách mạnh mẽ nhất
  await mutate('/api/movies');        // Refresh danh sách phim
  await mutate('/api/random');        // Refresh phim ngẫu nhiên (Billboard)
  
  setMessage(`✓ ... ✅ Dữ liệu đã được cập nhật!`);
}
```

**Lợi ích:**
- Sau khi seed → Ngay lập tức fetch data mới
- UI cập nhật trong < 1 giây
- Người dùng thấy phim mới liền

---

## 🎯 **CÁC TÌNH HUỐNG HOẠT ĐỘNG**

### **Tình huống 1: Seed phim rồi load lại trang**
```
1. Nhấn "Seed Movies" → Backend cập nhật DB ✅
2. mutate('/api/movies') → Frontend fetch dữ liệu mới ✅
3. UI cập nhật ngay lập tức ✅
```

### **Tình huống 2: Quay lại tab Netflix sau 1 giờ**
```
1. User đi chỗ khác rồi quay lại tab
2. SWR nhận ra cache cũ (revalidateOnFocus: true) ✅
3. Tự động fetch dữ liệu từ server ✅
4. UI cập nhật nếu có thay đổi ✅
```

### **Tình huống 3: Mất internet rồi kết nối lại**
```
1. User mất internet (offline)
2. Kết nối lại → SWR nhận ra (revalidateOnReconnect: true) ✅
3. Tự động fetch dữ liệu mới ✅
4. UI cập nhật ✅
```

### **Tình huống 4: Cache hết hạn tự động**
```
1. User đang xem phim
2. Sau 60 giây (dedupingInterval) → Cache hết hạn
3. Lần fetch tiếp theo → Tự động get dữ liệu mới ✅
4. Phim mới sẽ xuất hiện ✅
```

---

## 📊 **COMPARISON TABLE**

| Sự kiện | Trước Sửa | Sau Sửa |
|--------|---------|--------|
| **Seed phim** | Backend update ✅ / Frontend cache ❌ | Backend update ✅ / Frontend refresh ✅ |
| **Quay về tab** | Hiển thị cache cũ ❌ | Tự động fetch mới ✅ |
| **Mất/lại internet** | Không update ❌ | Tự động sync ✅ |
| **Sau 60 giây** | Vẫn cache cũ ❌ | Fetch mới lần sau ✅ |
| **Developer reload** | Mới thấy dữ liệu mới | Không cần reload, tự update |

---

## 🧪 **CÁCH KIỂM TRA (TEST)**

### **Test 1: Seed phim rồi xem cập nhật không**
```
1. Mở http://localhost:3000/admin/seed-data
2. Nhấn "Seed Movies"
3. Chờ 1-2 giây
4. Xem thông báo: "✓ ... ✅ Dữ liệu đã được cập nhật!" ✅
5. Quay về trang chủ (index.tsx)
6. Billboard + "Trending Now" section phải hiển thị phim mới ✅
```

### **Test 2: Check cache behavior**
```
1. F12 → Network tab
2. Reload trang (F5)
3. Tìm request đến /api/movies
4. Status code là 200 ✅ (fetch từ server)
5. Response chứa phim mới ✅
```

### **Test 3: Quay về tab sau 2 giây**
```
1. Đang ở trang chủ
2. Click vào tab khác 2-3 giây
3. Quay về tab chính
4. Mở DevTools → Network tab
5. Sẽ thấy request mới đến /api/movies ✅
6. Dữ liệu tự động cập nhật ✅
```

---

## 🔍 **KIỂM TRA TERMINAL (Backend Logs)**

Nếu muốn thấy seed được gọi, check logs:

```bash
# Terminal backend (port 4000)
[seed-movies] Request method: POST
[seed-movies] Connecting to MongoDB...
[seed-movies] Connected successfully!
[seed-movies] Cleared movies: 20
[seed-movies] Inserted movies: 20
[seed-movies] Sending response: { message: '...', count: 20, deletedCount: 20 }
```

---

## 🚀 **CÁCH KHỞI ĐỘNG LẠI & TEST**

### **Step 1: Đóng dev server cũ**
```bash
Ctrl+C ở cả 2 terminal (backend + frontend)
```

### **Step 2: Xoá cache (nếu cần)**
```bash
# Tùy chọn: Xoá .next folder để rebuild
cd web
rm -r .next  # hoặc del .next (Windows)
```

### **Step 3: Khởi động lại**
```bash
# Terminal 1 - Backend
cd backend
npm run dev  # Hoặc yarn dev

# Terminal 2 - Frontend
cd web
npm run dev  # Hoặc yarn dev
```

### **Step 4: Test**
1. Vào http://localhost:3000/admin/seed-data
2. Nhấn "Seed Movies"
3. Xem thông báo cập nhật
4. Quay về trang chủ
5. Phim mới phải hiển thị ngay ✅

---

## 💡 **CẤU HÌNH SWR - GIẢI THÍCH CHI TIẾT**

```typescript
const options = {
  // 1️⃣ revalidateIfStale: true
  // - Nghĩa: Nếu cache quá cũ, fetch lại
  // - Khi nào dùng: Luôn nên bật = true
  // - Lợi ích: Đảm bảo dữ liệu luôn fresh
  
  // 2️⃣ revalidateOnFocus: true
  // - Nghĩa: Khi user quay về cửa sổ, fetch lại
  // - Khi nào dùng: Cho dữ liệu hay thay đổi (phim, bình luận...)
  // - Lợi ích: Data luôn up-to-date khi user quay về
  
  // 3️⃣ revalidateOnReconnect: true
  // - Nghĩa: Khi internet reconnect, fetch lại
  // - Khi nào dùng: Luôn nên bật = true
  // - Lợi ích: Sync data khi user quay lại online
  
  // 4️⃣ dedupingInterval: 60000 (ms)
  // - Nghĩa: Cache 60 giây, sau đó xem lại
  // - Mặc định: 2000 (2 giây)
  // - Khi nào tăng: Nếu dữ liệu ổn định, không hay thay đổi
  // - Khi nào giảm: Nếu dữ liệu hay thay đổi
}
```

**Khuyến nghị cho Netflix Clone:**
```typescript
{
  revalidateIfStale: true,      // ✅ Bắt buộc
  revalidateOnFocus: true,      // ✅ Phim hay thay đổi
  revalidateOnReconnect: true,  // ✅ Bắt buộc
  dedupingInterval: 30000,      // 30 giây (phim thay đổi không thường xuyên)
}
```

---

## ⚙️ **NẾU CÒN KHÔNG CẬP NHẬT**

### **Kiểm tra 1: Backend có chạy không?**
```bash
curl http://localhost:4000/api-docs
# Nếu error → Backend không chạy
```

### **Kiểm tra 2: API endpoint có hoạt động không?**
```bash
curl -X POST http://localhost:3000/api/admin/seed-movies
# Nếu error → Kiểm tra logs backend/frontend
```

### **Kiểm tra 3: MongoDB có dữ liệu không?**
```bash
# Dùng MongoDB Compass hoặc terminal
db.Movie.find().count()
# Phải > 0 nếu seed thành công
```

### **Kiểm tra 4: Frontend cache còn không?**
```bash
# F12 → Application → Local Storage
# Xoá localStorage nếu cần
localStorage.clear()
# Reload trang
```

---

## 🎓 **TÓM TẮT**

| File | Thay Đổi | Mục Đích |
|------|---------|---------|
| useBillboard.ts | Enable revalidate | Billboard tự động update |
| useMovieList.ts | Enable revalidate | Danh sách phim tự động update |
| seed-data.tsx | Thêm mutate() | Buộc frontend fetch mới sau seed |

**Kết quả:** 
- ✅ Seed phim → Ngay lập tức thấy trên UI
- ✅ Quay lại tab → Tự động cập nhật nếu có thay đổi
- ✅ Mất internet → Khi quay lại online sẽ sync data

---

## 📞 **GỢI Ý THÊM**

1. **Nếu muốn refresh manual:**
   ```typescript
   import { mutate } from 'swr';
   
   const handleRefresh = () => {
     mutate('/api/movies');
     mutate('/api/random');
   }
   ```

2. **Nếu muốn xem SWR logs:**
   ```typescript
   const { data } = useSwr('/api/movies', fetcher, {
     onSuccess: (data) => console.log('Data fetched:', data),
     onError: (error) => console.log('Error:', error),
   });
   ```

3. **Nếu muốn reset cache toàn bộ:**
   ```typescript
   import { cache } from 'swr';
   cache.clear();
   ```

---

✅ **Đã xong! Giờ dữ liệu sẽ cập nhật tự động!** 🚀
