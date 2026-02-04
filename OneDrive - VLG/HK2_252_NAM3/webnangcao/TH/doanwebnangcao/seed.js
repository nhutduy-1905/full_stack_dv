const { MongoClient } = require('mongodb');

// Function to convert YouTube URL to embed URL
function getYouTubeEmbedUrl(url) {
  if (!url) return url;
  
  // Extract video ID from different YouTube URL formats
  let videoId = null;
  
  // Format: https://youtu.be/XmpXSsyqPjI
  if (url.includes('youtu.be/')) {
    videoId = url.split('youtu.be/')[1].split('?')[0].split('&')[0];
  }
  // Format: https://www.youtube.com/watch?v=XmpXSsyqPjI
  else if (url.includes('youtube.com/watch')) {
    const params = new URL(url).searchParams;
    videoId = params.get('v');
  }
  // Format: https://www.youtube.com/embed/XmpXSsyqPjI
  else if (url.includes('youtube.com/embed/')) {
    videoId = url.split('youtube.com/embed/')[1].split('?')[0];
  }
  
  if (videoId) {
    return `https://www.youtube.com/embed/${videoId}`;
  }
  
  return url;
}

const movies = [
  {
    title: "Tiêu Yêu Quái Núi Lắng Lắng",
    description: "Giữa thế đạo mà 'kẻ manh làm vua', một nhóm tiêu yêu quái vô danh và tầm thương gồm Heo, Ếch, Chồn và Khỉ Đi quen bị bắt nạt và xua đuổi, đã tìm thấy một cơ hội để chứng tỏ bản thân và trở thành anh hùng. Phim hoạt hình 2D đặc sắc mới nhất từ Trung Quốc!",
    videoUrl: getYouTubeEmbedUrl("https://youtu.be/XmpXSsyqPjI"),
    thumbnailUrl: "https://image.tmdb.org/t/p/w500/5Xtwoju2GOlgXRkEtPO2BA5WNTw.jpg",
    genre: "Phiêu lưu, Giả tưởng, Hài, Hoạt hình",
    duration: 118,
    releaseDate: "2026-01-23",
    rating: 9.3,
  },
  {
    title: "Công Chúa Mononoke",
    description: "Bị trúng lời nguyền chết chóc, vị hoàng tử lên đường tìm cách hóa giải, để rồi rơi vào cuộc chiến giữa một thị trấn khai thác mỏ và các loài động vật trong rừng.",
    videoUrl: getYouTubeEmbedUrl("https://youtu.be/4OiMOHRDs14"),
    thumbnailUrl: "https://image.tmdb.org/t/p/w500/aULj23Vb5koGiWn4GGapdFIQFCn.jpg",
    genre: "Phiêu lưu, Giả tưởng, Hoạt hình",
    duration: 134,
    releaseDate: "09/01/2026",
    rating: 9.6,
  },
  {
    title: "Thiên Đường Máu",
    description: "Thiên Đường Máu là phim điện ảnh đầu tiên về nạn lừa đảo người Việt ra nước ngoài. Tin lời hứa việc nhẹ lương cao, không ít thanh niên bị đưa đến những đặc khu, nơi họ trải qua cảnh giam lỏng và bị ép buộc phải gọi điện để lừa ngược lại chính đồng bào mình.",
    videoUrl: getYouTubeEmbedUrl("https://youtu.be/GYkBA16qTLI"),
    thumbnailUrl: "https://cinema.momocdn.net/img/29952517870088969-tdmm.png?size=M",
    genre: "Tâm lý, Hành động",
    duration: 113,
    releaseDate: "02/02/2026",
    rating: 7.7,
  },
  {
    title: "Lạc Phàm Trần: Hậu Duệ Chức Nữ",
    description: "Tham luyến trần gian thì đã sao? Tình cảm chính là phép thuật của người phàm, ngay cả thần tiên cũng khó tránh khỏi kiếp nạn. Chức Nữ vì tự ý rời bỏ nhiệm vụ mà sa vào trần thế.",
    videoUrl: getYouTubeEmbedUrl("https://youtu.be/qGdqYTJAJfM"),
    thumbnailUrl: "https://cinema.momocdn.net/img/30047600552782627-lacphamtran.png?size=M",
    genre: "Truyền thuyết, Giả tưởng, Hoạt hình",
    duration: 118,
    releaseDate: "31/01/2026",
    rating: 9.4,
  },
  {
    title: "Thám Tử Lừng Danh Conan: Quả Bom Chọc Trời",
    description: "Phim Điện Ảnh Thám Tử Lừng Danh Conan: Quả Bom Chọc Trời là bộ phim điện ảnh đầu tiên của chuỗi phim điện ảnh Thám Tử Lừng Danh Conan.",
    videoUrl: getYouTubeEmbedUrl("https://youtu.be/N4CP6BMyn2s"),
    thumbnailUrl: "https://image.tmdb.org/t/p/w500/DFAhTAEhJe4xY9z09wybhjMGCd.jpg",
    genre: "Bí ẩn, Phiêu lưu, Hình sự, Hoạt hình",
    duration: 94,
    releaseDate: "23/01/2026",
    rating: 7.4,
  },
  {
    title: "Tom & Jerry: Chiếc La Bàn Kỳ Bí",
    description: "Một chiếc la bàn bí ẩn bất ngờ mở ra cánh cổng kỳ diệu - nơi đầy ắp thử thách, tiếng cười và những màn rượt đuổi kinh điển cộp mác Tom & Jerry.",
    videoUrl: getYouTubeEmbedUrl("https://www.youtube.com/watch?v=W4bVSaeIzwI"),
    thumbnailUrl: "https://image.tmdb.org/t/p/w500/evK49ZZnrq5ymCiUCICpz1hJVxS.jpg",
    genre: "Gia đình, Hài, Hoạt hình",
    duration: 104,
    releaseDate: "01/02/2026",
    rating: 7.8,
  },
  {
    title: "Công Chúa Băng Giá & Xứ Sở Trong Gương",
    description: "Kai và Gerda sống trong một thị trấn nhỏ yên bình, nhưng đột nhiên các Linh hồn Băng Giá xuất hiện với ý định đóng băng mọi người.",
    videoUrl: getYouTubeEmbedUrl("https://youtu.be/fztWz69UkDI"),
    thumbnailUrl: "https://image.tmdb.org/t/p/w500/dxp8gKb8GJWKPbzFLdeXqUfViP7.jpg",
    genre: "Gia đình, Phiêu lưu, Giả tưởng, Hoạt hình",
    duration: 76,
    releaseDate: "28/03/2026",
    rating: 7.4,
  },
  {
    title: "Công Chúa và Chàng Ếch",
    description: "Một cô hầu bàn, tuyệt vọng để thực hiện ước mơ của mình với tư cách là một chủ nhà hàng, được đặt trên hành trình biến một hoàng tử ếch trở lại thành một con người.",
    videoUrl: getYouTubeEmbedUrl("https://youtu.be/uQBy6jqbmlU"),
    thumbnailUrl: "https://image.tmdb.org/t/p/w500/DFAhTAEhJe4xY9z09wybhjMGCd.jpg",
    genre: "Gia đình, Lãng mạn, Hoạt hình",
    duration: 94,
    releaseDate: "28/02/2026",
    rating: 7.1,
  },
  {
    title: "Nhà Ba Tôi Một Phòng",
    description: "Lấy bối cảnh tại một khu chung cư cũ, nơi cả gia đình cùng sinh hoạt trong vỏn vẹn một căn phòng, Nhà Ba Tôi Một Phòng khắc họa mối quan hệ giữa người cha mang tư tưởng truyền thống và cô con gái Gen Z.",
    videoUrl: getYouTubeEmbedUrl("https://youtu.be/-w9WI3V0B24"),
    thumbnailUrl: "https://cinema.momocdn.net/img/145492487920972710-nhabatui.png?size=M",
    genre: "Chính kịch, Gia đình, Hài",
    duration: 123,
    releaseDate: "15/02/2026",
    rating: 8.4,
  },
  {
    title: "Ong Nhí Phiêu Lưu Ký: Giải Cứu Công Chúa Kiến",
    description: "When Maya, a headstrong little bee, and her best friend Willi, rescue an ant princess they find themselves in the middle of an epic bug battle.",
    videoUrl: getYouTubeEmbedUrl("https://youtu.be/sONguqpbDU8"),
    thumbnailUrl: "https://homepage.momocdn.net/cinema/momo-cdn-api-220615130940-637908953809172418.jpg",
    genre: "Gia đình, Phiêu lưu, Hoạt hình",
    duration: 88,
    releaseDate: "13/03/2026",
    rating: 6.5,
  },
  {
    title: "THANH GƯƠM DIỆT QUỶ: Phép Màu Tình Thân",
    description: "Phim lấy bối cảnh ở làng thợ rèn, kể về hồi kết của trận ác chiến giữa Tanjiro với Thượng Huyền Tứ Hantengu.",
    videoUrl: getYouTubeEmbedUrl("https://www.youtube.com/watch?v=SXcCdQdcBtw&t=6s"),
    thumbnailUrl: "https://cinema.momocdn.net/img/32118694513620679-1Fkhh9fTkuhMm0BYJ85cti223gP.jpg",
    genre: "Giả tưởng, Hành động, Hoạt hình",
    duration: 112,
    releaseDate: "23/02/2026",
    rating: 8.1,
  },
  {
    title: "Chú Thuật Hồi Chiến: Biến Cố Shibuya",
    description: "Sau bao ngày chờ đợi, Đại Chiến Shibuya cuối cùng cũng xuất hiện trên màn ảnh rộng, gom trọn những khoảnh khắc nghẹt thở nhất.",
    videoUrl: getYouTubeEmbedUrl("https://youtu.be/EWKm0lolQRM"),
    thumbnailUrl: "https://image.tmdb.org/t/p/w500/sBffPvE9Kau726nnU14cTOEj3Pq.jpg",
    genre: "Hành động, Hoạt hình",
    duration: 88,
    releaseDate: "24/02/2026",
    rating: 6.9,
  },
  {
    title: "Lupin Đệ Tam: Lâu Đài Cagliostro",
    description: "Anime dài màn ảnh rộng đầu tiên thực sự có ấn tượng của đạo diễn Hayao Miyazaki. Phim kể về chuyến phiêu lưu đến vương quốc Cagliostro.",
    videoUrl: getYouTubeEmbedUrl("https://www.youtube.com/watch?v=qWa6g5nBbVg"),
    thumbnailUrl: "https://image.tmdb.org/t/p/w500/49FVfVhrRzGongeNcwoL5Xj1NLl.jpg",
    genre: "Phiêu lưu, Hình sự, Hài, Hoạt hình",
    duration: 102,
    releaseDate: "19/02/2026",
    rating: 8.9,
  },
  {
    title: "Biệt Đội Yoyo: Giải Cứu Giáng Sinh",
    description: "Một chú yêu tinh bị đánh giá thấp, được dẫn dắt bởi niềm đam mê mãnh liệt dành cho mùa lễ hội.",
    videoUrl: getYouTubeEmbedUrl("https://youtu.be/AlQq_lAiceQ"),
    thumbnailUrl: "https://image.tmdb.org/t/p/w500/faVuMlKdqvpyt9QJ3PFEkR9f58E.jpg",
    genre: "Gia đình, Phiêu lưu, Hoạt hình",
    duration: 96,
    releaseDate: "24/12/2026",
    rating: 9.3,
  },
  {
    title: "Phi Vụ Động Trời 2 (Zootopia 2)",
    description: "Thám tử Judy Hopps và Nick Wilde dấn thân vào cuộc truy tìm bí ẩn về một loài bò sát bí ẩn đến Zootopia.",
    videoUrl: getYouTubeEmbedUrl("https://youtu.be/BqP9oYa9MdI"),
    thumbnailUrl: "https://cinema.momocdn.net/img/15304822439498794-zooooo2.png?size=M",
    genre: "Chính kịch, Gia đình, Phiêu lưu, Giả tưởng, Hoạt hình",
    duration: 107,
    releaseDate: "14/02/2026",
    rating: 9.1,
  },
  {
    title: "Anh Trai Tôi Là Khủng Long",
    description: "Tưởng rằng ác quỷ đã bị diệt trừ, nhưng hắn đã trở lại — mạnh mẽ hơn, tàn nhẫn hơn. Khi thực tại sụp đổ.",
    videoUrl: getYouTubeEmbedUrl("https://youtu.be/H830A3Mwd_g"),
    thumbnailUrl: "https://cinema.momocdn.net/img/28308899911608315-khunglongne.png?size=M",
    genre: "Bí ẩn, Phiêu lưu, Hình sự, Hoạt hình",
    duration: 95,
    releaseDate: "12/02/2026",
    rating: 9.5,
  },
  {
    title: "Chàng Mèo Mang Mũ",
    description: "Với sở trường quen thuộc của mình, Mèo Ta lại mang niềm vui đến cho trẻ em theo cách hài hước, độc đáo.",
    videoUrl: getYouTubeEmbedUrl("https://youtu.be/jz8pLlPhSeY"),
    thumbnailUrl: "https://image.tmdb.org/t/p/w500/cYn4hvqeIo97bfxnJdpI6CTsf1J.jpg",
    genre: "Gia đình, Hài, Hoạt hình",
    duration: 94,
    releaseDate: "27/02/2026",
    rating: 7.4,
  },
  {
    title: "Finnick 2: Quái Xù Tinh Nghịch",
    description: "Finnick bất cẩn đánh mất khả năng tàng hình sau khi đánh thức phép thuật của một cây trượng cổ xưa.",
    videoUrl: getYouTubeEmbedUrl("https://youtu.be/bLBQ1WFZvKc"),
    thumbnailUrl: "https://image.tmdb.org/t/p/w500/3TilFFD6Xz3ezSSCSgDIsMx6b5x.jpg",
    genre: "Hoạt hình",
    duration: 85,
    releaseDate: "30/01/2026",
    rating: 6.3,
  },
  {
    title: "Tí Sẹo Và Lâu Đài Quái Vẹo",
    description: "Stitch Head là câu chuyện về một sinh vật nhỏ bé được một Giáo sư điên tạo ra và đánh thức trong tòa lâu đài u ám.",
    videoUrl: getYouTubeEmbedUrl("https://youtu.be/TKGVCsj0Hrk"),
    thumbnailUrl: "https://cinema.momocdn.net/img/131410234495257835-tiseo.png?size=M",
    genre: "Gia đình, Phiêu lưu, Hài, Hoạt hình",
    duration: 91,
    releaseDate: "09/02/2026",
    rating: 7.7,
  },
  {
    title: "Gia Đình Khủng Long: Mắc Kẹt Kỷ Jura",
    description: "Cậu bé Phil Dino không có một cuộc sống bình thường khi có một người cha bị ám ảnh bởi hóa thạch khủng long.",
    videoUrl: getYouTubeEmbedUrl("https://youtu.be/5x0dO_clEW8"),
    thumbnailUrl: "https://image.tmdb.org/t/p/w500/7gt7TwBw4DGdxmC4wmccuFr22tj.jpg",
    genre: "Gia đình, Phiêu lưu, Hoạt hình",
    duration: 93,
    releaseDate: "26/02/2026",
    rating: 6.4,
  },
];

async function seed() {
  const client = new MongoClient('mongodb://127.0.0.1:27017/netflix', {
    connectTimeoutMS: 5000,
    socketTimeoutMS: 5000,
  });

  try {
    console.log('Connecting to MongoDB...');
    await client.connect();
    console.log('Connected!');
    
    const db = client.db('netflix');
    
    // Clear existing movies
    await db.collection('Movie').deleteMany({});
    console.log('Cleared existing movies ✓');
    
    // Convert all YouTube URLs to embed format
    const moviesWithConvertedUrls = movies.map(movie => ({
      ...movie,
      videoUrl: getYouTubeEmbedUrl(movie.videoUrl)
    }));
    
    // Insert new movies
    const result = await db.collection('Movie').insertMany(moviesWithConvertedUrls);
    console.log(`✓ Seeded ${result.insertedCount} movies`);
    
    // Show example
    if (result.insertedCount > 0) {
      console.log(`\nExample - First movie YouTube URL converted to:`);
      console.log(`${moviesWithConvertedUrls[0].videoUrl}`);
    }
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  } finally {
    await client.close();
  }
}

seed();
