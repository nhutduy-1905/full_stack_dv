# 🚀 CẤP CỨU: PHIM KHÔNG CẬP NHẬT - LỜI GIẢI QUYẾT NHANH

## 🔴 **VẤN ĐỀ**
- Seed phim xong nhưng trang vẫn hiển thị phim cũ
- Hoặc phim load lên nhưng chậm/không cập nhật

## ✅ **CÁCH SỬA (NHANH NHẤT)**

### **Cách 1: Restart Dev Server (70% fix)**
```bash
# Bước 1: Đóng cả 2 terminal (Ctrl+C)
# Terminal 1 (Backend)
Ctrl+C

# Terminal 2 (Frontend) 
Ctrl+C

# Bước 2: Xóa cache Next.js
cd web
rm -r .next  # hoặc del .next (Windows PowerShell)

# Bước 3: Khởi động lại
# Terminal 1
cd backend
yarn dev

# Terminal 2
cd web
yarn dev

# Bước 4: Truy cập http://localhost:3000
# Xóa cache browser: F12 → Application → Clear Storage
```

### **Cách 2: Clear Cache Browser + Reload (80% fix)**
```
1. Mở http://localhost:3000
2. F12 (DevTools)
3. Ctrl+Shift+R (Hard Refresh - Clear Cache)
4. Hoặc: Application → Clear Storage → "Clear site data"
5. Reload trang (F5)
```

### **Cách 3: Manual Test Seed (99% fix)**
```
1. Mở http://localhost:3000/admin/seed-data
2. Nhấn nút "🎬 Cập Nhật Dữ Liệu Phim"
3. Chờ thông báo: "✓ ... ✅ Dữ liệu đã được cập nhật!"
4. Quay về trang chủ (index.tsx)
5. Phim mới phải hiện ngay
```

### **Cách 4: Kiểm tra Network Tab (Debug)**
```
1. F12 → Network tab
2. Reload trang (F5)
3. Tìm request "/api/movies"
4. Check Status: 200 ✅
5. Response phải chứa phim mới
6. Nếu response là phim cũ → Backend chưa update, chạy seed lại
```

---

## 🔍 **NGUYÊN NHÂN CỤ THỂ**

| Triệu chứng | Nguyên nhân | Cách sửa |
|-----------|-----------|---------|
| **Phim không update ngay sau seed** | Dev server cache | Restart server + `rm .next` |
| **Sau 2 giờ vẫn là phim cũ** | SWR cache quá dài | ✅ Đã fix: 60 giây |
| **Seed nhấn rồi nhưng API 404** | Endpoint không tồn tại | Kiểm tra file `/api/admin/seed-movies.ts` |
| **mutate() error** | Import sai | ✅ Fix: `useSWRConfig()` |
| **Phim cũ sau 5 phút** | Browser localStorage | `localStorage.clear()` |

---

## 📋 **CHECKLIST - CHỨNG THỰC LỜI SỬA**

**Kiểm tra hooks:**
- [ ] `/web/hooks/useBillboard.ts` có `revalidateIfStale: true`?
- [ ] `/web/hooks/useMovieList.ts` có `revalidateOnFocus: true`?
- [ ] Cả 2 file có `dedupingInterval: 60000`?

**Kiểm tra seed-data.tsx:**
- [ ] Import: `import { useSWRConfig } from 'swr'`?
- [ ] `const { mutate } = useSWRConfig()`?
- [ ] Call `mutate('/api/movies')` + `mutate('/api/random')`?

**Kiểm tra khi chạy:**
- [ ] Dev server chạy trên port 3000? (Frontend)
- [ ] Dev server chạy trên port 4000? (Backend)
- [ ] Database MongoDB chạy?

---

## 🧪 **CÓN LẠI LỠI ĐÓ?**

### **Test Endpoint Trực Tiếp**
```
1. Mở browser console (F12 → Console)
2. Chạy lệnh này:

fetch('/api/movies')
  .then(r => r.json())
  .then(data => {
    console.log('Số phim:', data.length);
    console.log('Phim đầu tiên:', data[0]);
  })

3. Xem kết quả:
   - Nếu > 0 phim → API hoạt động ✅
   - Nếu error → API bị lỗi ❌
```

### **Xóa Cache Toàn Bộ**
```javascript
// Chạy trong browser console
localStorage.clear();
sessionStorage.clear();
console.log('Cache xóa xong');
location.reload();
```

### **Seed Manual qua API**
```javascript
// Chạy trong browser console
fetch('/api/admin/seed-movies', { method: 'POST' })
  .then(r => r.json())
  .then(data => {
    console.log('Seed result:', data);
    // Sau đó refresh trang
    setTimeout(() => location.reload(), 2000);
  })
```

---

## 🎯 **WORKFLOW CUỐI CÙNG**

```
1. cd web → rm -r .next
2. Restart 2 dev server (backend + frontend)
3. http://localhost:3000
4. F12 → Clear Storage + Hard Refresh
5. Vào /admin/seed-data → Click nút seed
6. Chờ thông báo "✅ Dữ liệu đã được cập nhật!"
7. Quay về index → Xem phim mới ✅
```

---

## 📝 **NOTES**

- **SWR Cache:** Giờ là 60 giây (có thể tăng/giảm `dedupingInterval`)
- **Revalidate:** Tự động trigger khi focus tab/reconnect/stale
- **mutate():** Force refresh ngay lập tức sau seed
- **Browser Cache:** Dùng Ctrl+Shift+R để bypass browser cache

✅ **Đã xong! Nếu vẫn không work, follow 4 cách trên tuần tự** 🚀
