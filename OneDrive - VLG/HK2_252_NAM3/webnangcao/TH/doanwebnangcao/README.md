"# webreactfilm" 
// Phase1: Tạo được dữ liệu phim + load đầy đủ lên trang web (2 tuần)

// Mockupdata: https://www.momo.vn/cinema 

// Backend MongoDB + Prisma

// 1. Đọc hiểu: Prisma => hiểu tương tác CRUD với mongodb

// 2. Admin: Form [Nhập tên phim: Phim Tây Du Ký] =>
//   const movies = await prisma.movies.create({
//     data: {
//       name: 'Phim Tây Du Ký',
//       fieldN: 'Value N'
//     },
//     include: {
//       posts: true,
//     },
//   })

// 3. Web: lấy danh sách phim
//   const allMovies = await prisma.movies.findMany({
//     include: {
//       posts: true,
//     },
//   }) => [phim1, phim2, phim3,..]

// Hướng dẫn prompt trang Admin để tạo dữ liệu cho trang Admin:

// Buộc phải tách rõ 3 folder: backend Prisma + mongodb, web (tất cả những code hiện tại), admin (table, form,...)

// * Bạn là top 0.1% chuyên gia trong ngành lập trình Frontend, đảm bảo hỏi lại tôi để rõ đảm bảo hoàn thành 95% công việc

// Đối với prompt Admin: đồng bộ UI với web hiện tại, chọn những thư viện phổ biến và dễ dùng



// Phase2 : Bình luận phim, user login token (1 tuần)
