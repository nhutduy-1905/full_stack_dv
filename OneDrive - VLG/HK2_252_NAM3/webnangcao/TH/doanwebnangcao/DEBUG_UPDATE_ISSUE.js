// 🔧 DEBUG FILE - Kiểm tra dữ liệu phim chưa update
// Chạy này trong browser console để xem khi nào data được fetch

// 1. Check useBillboard hook
console.log('=== CHECK USEBILLBOARD CONFIG ===');
console.log('File: web/hooks/useBillboard.ts');
console.log('Config phải là:');
console.log({
  revalidateIfStale: true,
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
  dedupingInterval: 60000,
});

// 2. Check useMovieList hook
console.log('\n=== CHECK USEMOVIELIST CONFIG ===');
console.log('File: web/hooks/useMovieList.ts');
console.log('Config phải là:');
console.log({
  revalidateIfStale: true,
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
  dedupingInterval: 60000,
});

// 3. Test API endpoint từ browser
console.log('\n=== TEST API ENDPOINT ===');
console.log('Chạy lệnh này trong browser console:');
console.log(`
  // Test fetch API
  fetch('/api/movies')
    .then(r => r.json())
    .then(data => {
      console.log('Movies count:', data.length);
      console.log('First movie:', data[0]);
    })
    .catch(e => console.error('Error:', e));

  // Test seed endpoint
  fetch('/api/admin/seed-movies', { method: 'POST' })
    .then(r => r.json())
    .then(data => console.log('Seed result:', data))
    .catch(e => console.error('Error:', e));
`);

// 4. Check SWR cache
console.log('\n=== CHECK SWR CACHE ===');
console.log('DevTools → Application → Local Storage → Tìm "swr"');
console.log('Hoặc chạy: localStorage');

// 5. Step-by-step cách khắc phục
console.log('\n=== CÁCH KHẮC PHỤC ===');
console.log('Step 1: Kiểm tra hooks có cấu hình đúng không');
console.log('Step 2: F12 → Network tab → POST /api/admin/seed-movies');
console.log('Step 3: Xem response trả về status 200 không');
console.log('Step 4: Reload trang → Xem phim mới có hiện không');
console.log('Step 5: Nếu vẫn không update, xóa localStorage.clear() rồi reload');
