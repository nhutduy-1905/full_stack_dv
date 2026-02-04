const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
const PORT = process.env.BACKEND_PORT || 4000;
const MONGODB_URL = process.env.DATABASE_URL || 'mongodb://localhost:27017/netflix';

let db;
let client;

// Middleware
app.use(cors());
app.use(express.json());

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Connect to MongoDB
async function connectDB() {
  try {
    client = new MongoClient(MONGODB_URL);
    await client.connect();
    db = client.db('netflix');
    console.log('✓ Connected to MongoDB');
  } catch (error) {
    console.error('✗ MongoDB connection failed:', error);
    process.exit(1);
  }
}

/**
 * @swagger
 * /api/movies:
 *   get:
 *     summary: Get all movies
 *     tags: [Movies]
 *     description: Lấy danh sách tất cả các phim
 *     responses:
 *       200:
 *         description: List of all movies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movie'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
app.get('/api/movies', async (req, res) => {
  try {
    const movies = await db.collection('Movie').find({}).toArray();
    const formattedMovies = movies.map(movie => ({
      ...movie,
      id: movie._id.toString(),
      _id: undefined
    }));
    res.json(formattedMovies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/movies/{movieId}:
 *   get:
 *     summary: Get movie by ID
 *     tags: [Movies]
 *     description: Lấy chi tiết phim theo ID
 *     parameters:
 *       - in: path
 *         name: movieId
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId của phim
 *         example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: Movie details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       400:
 *         description: Invalid movie ID
 *       404:
 *         description: Movie not found
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
app.get('/api/movies/:movieId', async (req, res) => {
  try {
    const { movieId } = req.params;
    if (!ObjectId.isValid(movieId)) {
      return res.status(400).json({ error: 'Invalid movie ID' });
    }
    const movie = await db.collection('Movie').findOne({ _id: new ObjectId(movieId) });
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    res.json({
      ...movie,
      id: movie._id.toString(),
      _id: undefined
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     description: Lấy danh sách tất cả người dùng
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
app.get('/api/users', async (req, res) => {
  try {
    const users = await db.collection('User').find({}).toArray();
    const formattedUsers = users.map(user => ({
      ...user,
      id: user._id.toString(),
      _id: undefined
    }));
    res.json(formattedUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/users/{userId}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     description: Lấy chi tiết người dùng theo ID
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId của người dùng
 *         example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: User details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid user ID
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
app.get('/api/users/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    if (!ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }
    const user = await db.collection('User').findOne({ _id: new ObjectId(userId) });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({
      ...user,
      id: user._id.toString(),
      _id: undefined
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/admin/seed-movies:
 *   post:
 *     summary: Seed database with sample movies
 *     tags: [Admin]
 *     description: Xóa hết phim cũ và thêm 3 phim mẫu vào database
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Movies seeded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Movies seeded successfully"
 *                 count:
 *                   type: number
 *                   example: 3
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
app.post('/api/admin/seed-movies', async (req, res) => {
  try {
    const movies = [
      {
        title: "Tiêu Yêu Quái Núi Lắng Lắng",
        description: "Giữa thế đạo mà 'kẻ manh làm vua', một nhóm tiêu yêu quái vô danh và tầm thương gồm Heo, Ếch, Chồn và Khỉ Đi quen bị bắt nạt và xua đuổi, đã tìm thấy một cơ hội để chứng tỏ bản thân và trở thành anh hùng. Phim hoạt hình 2D đặc sắc mới nhất từ Trung Quốc!",
        videoUrl: "https://www.youtube.com/embed/XmpXSsyqPjI",
        thumbnailUrl: "https://image.tmdb.org/t/p/w500/5Xtwoju2GOlgXRkEtPO2BA5WNTw.jpg",
        genre: "Phiêu lưu, Giả tưởng, Hài, Hoạt hình",
        duration: 118,
        releaseDate: "2026-01-23",
        rating: 9.3,
      },
      {
        title: "Avatar",
        description: "A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.",
        videoUrl: "https://www.youtube.com/embed/5PSNL1qE6VQ",
        thumbnailUrl: "https://image.tmdb.org/t/p/w500/jRXYjXNq0Cs2coAfy02JJwzj9j2.jpg",
        genre: "Action, Sci-Fi",
        duration: 162,
        releaseDate: "2009-12-18",
        rating: 7.8,
      },
      {
        title: "The Dark Knight",
        description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest tests.",
        videoUrl: "https://www.youtube.com/embed/EXeTwQWrcwY",
        thumbnailUrl: "https://image.tmdb.org/t/p/w500/1hqwGsEchVzQeQjCDtezNeuy8V.jpg",
        genre: "Action, Crime, Drama",
        duration: 152,
        releaseDate: "2008-07-18",
        rating: 9.0,
      },
    ];

    await db.collection('Movie').insertMany(movies);
    res.json({ message: 'Movies seeded successfully', count: movies.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/admin/clear-movies:
 *   delete:
 *     summary: Clear all movies from database
 *     tags: [Admin]
 *     description: Xóa toàn bộ phim trong database
 *     responses:
 *       200:
 *         description: Movies cleared successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Movies cleared successfully"
 *                 deletedCount:
 *                   type: number
 *                   example: 5
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
app.delete('/api/admin/clear-movies', async (req, res) => {
  try {
    const result = await db.collection('Movie').deleteMany({});
    res.json({ message: 'Movies cleared successfully', deletedCount: result.deletedCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/admin/database-stats:
 *   get:
 *     summary: Get database statistics
 *     tags: [Admin]
 *     description: Lấy thống kê số lượng người dùng và phim trong database
 *     responses:
 *       200:
 *         description: Database statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 usersCount:
 *                   type: number
 *                   example: 5
 *                 moviesCount:
 *                   type: number
 *                   example: 20
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
app.get('/api/admin/database-stats', async (req, res) => {
  try {
    const usersCount = await db.collection('User').countDocuments();
    const moviesCount = await db.collection('Movie').countDocuments();
    res.json({ usersCount, moviesCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /:
 *   get:
 *     summary: API Health Check
 *     tags: [Health]
 *     description: Kiểm tra server có đang chạy không
 *     responses:
 *       200:
 *         description: Server is running
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Netflix Clone Backend API"
 *                 documentation:
 *                   type: string
 *                   example: "http://localhost:4000/api-docs"
 */
app.get('/', (req, res) => {
  res.json({ 
    message: 'Netflix Clone Backend API',
    documentation: 'http://localhost:4000/api-docs'
  });
});

// Start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`\n🚀 Server running on http://localhost:${PORT}`);
    console.log(`📚 Swagger UI available at http://localhost:${PORT}/api-docs\n`);
  });
});

// Graceful shutdown
process.on('SIGINT', async () => {
  if (client) await client.close();
  process.exit(0);
});
