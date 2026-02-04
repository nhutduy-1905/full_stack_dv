# 📚 Netflix Clone - Tài Liệu Chi Tiết Toàn Bộ Dự Án

## 📁 Cấu Trúc Dự Án

```
doanwebnangcao/
├── backend/                    # Backend Express server
│   ├── server.js              # Main server file (routes)
│   ├── swagger.js             # Swagger documentation config
│   ├── package.json           # Dependencies
│   ├── .env                   # Environment variables
│   └── routes/                # API routes (nếu có)
│
├── web/                       # Frontend Next.js
│   ├── pages/
│   │   ├── _app.tsx           # App wrapper (styling, providers)
│   │   ├── index.tsx          # Home page (phim trending)
│   │   ├── profiles.tsx       # Chọn profile người dùng
│   │   ├── auth.tsx           # Login/Register page
│   │   ├── watch/
│   │   │   └── [movieId].tsx  # Watch movie page
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   └── [...nextauth].ts   # NextAuth config
│   │   │   ├── admin/
│   │   │   │   └── seed-movies.ts     # Seed dữ liệu phim
│   │   │   ├── current.ts            # Lấy user hiện tại
│   │   │   ├── register.ts           # Đăng ký
│   │   │   ├── favorite.ts           # Thêm yêu thích
│   │   │   ├── deletefavorite.ts     # Xóa yêu thích
│   │   │   ├── favorites.ts          # Lấy danh sách yêu thích
│   │   │   ├── movies/
│   │   │   │   ├── index.ts          # Lấy tất cả phim
│   │   │   │   └── [movieId].ts      # Lấy phim theo ID
│   │   │   └── random.ts            # Lấy phim random
│   │   └── admin/
│   │       └── seed-data.tsx         # Admin page seed data
│   ├── components/            # React components
│   │   ├── AccountMenu.tsx            # User menu
│   │   ├── Billboard.tsx              # Featured movie banner
│   │   ├── FavoriteButton.tsx         # Like button
│   │   ├── InfoModal.tsx              # Movie info modal
│   │   ├── input.tsx                  # Form input
│   │   ├── MobileMenu.tsx             # Mobile navigation
│   │   ├── MovieCard.tsx              # Movie thumbnail card
│   │   ├── MovieList.tsx              # List of movies
│   │   ├── Navbar.tsx                 # Navigation bar
│   │   ├── NavbarItem.tsx             # Navbar menu item
│   │   └── PlayButton.tsx             # Play button
│   ├── hooks/                 # Custom React hooks
│   │   ├── useBillboard.ts           # Lấy featured movie
│   │   ├── useCurrentUser.ts         # Lấy user hiện tại
│   │   ├── useFavorites.ts           # Lấy danh sách yêu thích
│   │   ├── useMovie.ts               # Lấy phim theo ID
│   │   └── useMovieList.ts           # Lấy danh sách phim
│   ├── libs/                  # Utility functions
│   │   ├── fetcher.ts                # SWR fetcher
│   │   ├── prismadb.ts               # Prisma client
│   │   └── serverAuth.ts             # Auth helper
│   ├── store/                 # Redux Zustand store
│   │   ├── index.ts                  # Store setup
│   │   ├── movies.ts                 # Movie state
│   │   └── profile.ts                # Profile state
│   ├── styles/
│   │   └── globals.css               # Global styling
│   ├── public/                # Static assets
│   │   └── images/
│   ├── prisma/
│   │   └── schema.prisma             # Database schema
│   ├── tsconfig.json          # TypeScript config
│   ├── next.config.js         # Next.js config
│   ├── tailwind.config.js     # Tailwind CSS config
│   ├── postcss.config.js      # PostCSS config
│   ├── package.json           # Dependencies
│   └── README.md
│
├── init-rs.js                 # Khởi tạo database script
├── seed.js                    # Seed initial data script
├── docker-compose.yml         # Docker config (MongoDB)
├── API_DOCUMENTATION.md       # API docs
└── README.md                  # Project README
```

---

## 🏗️ Kiến Trúc Ứng Dụng

### Tầng Backend (Express)
```
Frontend Request
       ↓
  Express Server (4000)
       ↓
 API Handlers/Routes
       ↓
  MongoDB Operations
       ↓
  MongoDB Database
```

### Tầng Frontend (Next.js)
```
User Browser
    ↓
Next.js Pages (3000)
    ↓
React Components
    ↓
Hooks (SWR data fetching)
    ↓
API Routes (/api/...)
    ↓
Backend Server (4000)
```

---

## 💾 Database Schema (MongoDB via Prisma)

### User Collection
```typescript
User {
  id: string;              // Unique ID
  email: string;           // Email duy nhất
  emailVerified?: Date;    // Email verified date
  image?: string;          // Avatar URL
  name?: string;           // User name
  hashedPassword?: string; // Encrypted password
  createdAt: Date;         // Created timestamp
  updatedAt: Date;         // Updated timestamp
  favoriteIds: string[];   // IDs của phim yêu thích
  sessions: Session[];     // Active sessions
  accounts: Account[];     // Connected accounts (Google, etc)
}
```

### Movie Collection
```typescript
Movie {
  id: string;              // Unique ID
  title: string;           // Tên phim
  description: string;     // Mô tả dài
  videoUrl: string;        // YouTube embed URL
  thumbnailUrl: string;    // Poster image URL
  genre: string;          // Thể loại phim
  duration: number;       // Độ dài (phút)
  releaseDate: string;    // Ngày phát hành
  rating: number;         // Đánh giá (0-10)
}
```

---

## 🔐 Authentication Flow

### Đăng Ký (Register)
```
1. User → POST /api/register
2. Tạo user mới với email & password
3. Hash password với bcrypt
4. Lưu vào MongoDB
5. Redirect → /profiles
```

### Đăng Nhập (Login)
```
1. User → POST /auth/callback/credentials
2. NextAuth xác minh email & password
3. Tạo JWT session
4. Lưu session token vào cookie
5. Redirect → /
```

### Xác Thực (Auth Check)
```
1. Frontend → GET /api/current
2. Kiểm tra session cookie
3. Lấy user từ database
4. Trả về user data
```

---

## 📡 API Endpoints Chi Tiết

### Authentication APIs (NextAuth)
```
POST /api/auth/signin
- Đăng nhập với email & password
- Return: JWT token, user info

POST /api/auth/register  
- Đăng ký account mới
- Params: email, password, name

GET /api/auth/session
- Lấy session hiện tại
- Return: Current user data

POST /api/auth/signout
- Đăng xuất, xóa session
```

### Movie APIs
```
GET /api/movies
- Lấy tất cả phim
- Return: Array of movies

GET /api/movies/[movieId]
- Lấy chi tiết một phim
- Params: movieId (MongoDB ID)
- Return: Movie object

GET /api/random
- Lấy phim ngẫu nhiên
- Return: Random movie object
```

### Favorite APIs
```
GET /api/favorites
- Lấy danh sách phim yêu thích
- Return: Array of movie IDs

POST /api/favorite
- Thêm phim vào yêu thích
- Body: { movieId: string }
- Update: User.favoriteIds

DELETE /api/deletefavorite
- Xóa phim khỏi yêu thích
- Body: { movieId: string }
- Update: User.favoriteIds
```

### Admin APIs
```
GET /api/current
- Lấy thông tin user hiện tại
- Auth required

POST /api/admin/seed-movies
- Thêm 20 phim mẫu vào database
- (Next.js endpoint)

DELETE /api/admin/clear-movies
- Xóa tất cả phim
- (Backend endpoint)
```

---

## 🎨 Frontend Components

### Navbar.tsx
- Navigation bar cố định ở đầu trang
- Hiển thị logo Netflix
- Menu items: Home, Browse, My List
- User dropdown menu

### Billboard.tsx
- Large featured movie banner
- Hiển thị:
  - Poster background
  - Movie title & description
  - Play button
  - Info button

### MovieCard.tsx
- Thumbnail của một phim
- Hover effect:
  - Phóng to
  - Hiển thị title
  - Nút play & info

### MovieList.tsx
- Danh sách ngang các phim
- Scrollable container
- Gọi component MovieCard nhiều lần

### FavoriteButton.tsx
- Nút heart (like/unlike)
- Call API:
  - POST /api/favorite (add)
  - DELETE /api/deletefavorite (remove)

### InfoModal.tsx
- Modal popup hiển thị thông tin phim
- Close button, play button
- Dữ liệu từ hook useMovie

---

## 🪝 Custom Hooks

### useBillboard.ts
```typescript
// Lấy phim featured (billboard)
const { data: billboard, isLoading } = useBillboard();
// Return: { title, description, videoUrl, ... }
```

### useCurrentUser.ts
```typescript
// Lấy thông tin user đang login
const { data: user, isLoading } = useCurrentUser();
// Return: { id, name, email, favoriteIds, ... }
```

### useFavorites.ts
```typescript
// Lấy danh sách ID phim yêu thích
const { data: favorites, isLoading } = useFavorites();
// Return: array of movie objects
```

### useMovie.ts
```typescript
// Lấy chi tiết một phim
const { data: movie, isLoading } = useMovie(movieId);
// Return: { title, description, videoUrl, ... }
```

### useMovieList.ts
```typescript
// Lấy danh sách tất cả phim
const { data: movies, isLoading } = useMovieList();
// Return: array of movies
```

---

## 📄 Pages Giải Thích

### pages/_app.tsx
```
Wrapper cho tất cả pages
- Import Tailwind CSS
- Setup SessionProvider (NextAuth)
- Setup SWR (data fetching)
- Layout components (Navbar, etc)
```

### pages/index.tsx
```
Trang chủ ứng dụng
- Hiển thị Billboard (featured movie)
- Hiển thị MovieList groups:
  - Trending Now
  - Top 10 Today
  - Popular
- Require authentication
```

### pages/auth.tsx
```
Login/Register page
- Form input email, password, name
- Toggle between login & register
- POST requests tới /api/auth/...
- Redirect tới /profiles sau khi login
```

### pages/profiles.tsx
```
Chọn profile page (like Netflix profiles)
- Hiển thị danh sách profiles
- Click để chọn profile
- Redirect tới /
```

### pages/watch/[movieId].tsx
```
Watch movie page
- Dynamic route parameter: movieId
- Embed YouTube player
- Hiển thị movie info
- Related movies suggestion
- Back button
```

### pages/admin/seed-data.tsx
```
Admin page để seed dữ liệu
- Button "Cập Nhật Dữ Liệu Phim"
- POST /api/admin/seed-movies
- Hiển thị response & status
```

---

## 🔌 API Routes (Next.js)

### pages/api/auth/[...nextauth].ts
```
NextAuth configuration
- Providers: Credentials, Google, GitHub
- Callbacks: jwt, session
- Database: Prisma adapter
- Session strategy: JWT
```

### pages/api/current.ts
```
GET request
- Get session from NextAuth
- Fetch user from database
- Return: user object with favoriteIds
```

### pages/api/register.ts
```
POST request
- Get email, password, name từ body
- Hash password với bcrypt
- Create new user
- Return: success message
```

### pages/api/movies/index.ts
```
GET request
- Fetch tất cả movies từ database
- Return: array of movies
```

### pages/api/movies/[movieId].ts
```
GET request
- Get movieId từ query
- Find movie by ID
- Return: movie object
```

### pages/api/random.ts
```
GET request
- Get user favorites
- Get all movies
- Return: random movie not in favorites
```

### pages/api/favorite.ts
```
POST request
- Get movieId từ body
- Update user.favoriteIds (add)
- Return: updated user
```

### pages/api/deletefavorite.ts
```
DELETE request
- Get movieId từ body
- Update user.favoriteIds (remove)
- Return: updated user
```

### pages/api/admin/seed-movies.ts
```
POST request
- Connect to MongoDB
- Delete all existing movies
- Insert 20 sample movies
- Return: count & message
```

---

## 🚀 Backend Server (server.js)

### Routes

#### GET /
```
Health check
Return: { message, documentation }
```

#### GET /api/movies
```
Get all movies
Return: array of movies
```

#### GET /api/movies/:movieId
```
Get movie by ID
Params: movieId (MongoDB ObjectId)
Return: movie object or 404
```

#### GET /api/users
```
Get all users
Return: array of users
```

#### POST /api/admin/seed-movies
```
Seed 3 sample movies
Return: { message, count }
```

#### DELETE /api/admin/clear-movies
```
Delete all movies
Return: { message, deletedCount }
```

#### GET /api/admin/database-stats
```
Get stats
Return: { usersCount, moviesCount }
```

---

## 🛠️ Technologies Stack

### Frontend
- **Framework:** Next.js (React)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Data Fetching:** SWR
- **Authentication:** NextAuth.js
- **Database ORM:** Prisma
- **UI Components:** Custom React components

### Backend
- **Framework:** Express.js
- **Language:** JavaScript
- **Documentation:** Swagger/OpenAPI
- **Database:** MongoDB
- **Database Client:** MongoDB Node Driver
- **CORS:** Enabled

### Database
- **Type:** MongoDB
- **Schema:** Defined in Prisma
- **Collections:** User, Movie, Account, Session, VerificationToken

### DevTools
- **Version Control:** Git
- **Package Manager:** npm / yarn
- **Runtime:** Node.js
- **Container:** Docker (optional, via docker-compose)

---

## 🔄 Data Flow Diagrams

### User Login Flow
```
┌─────────────────┐
│ User visits /   │
└────────┬────────┘
         │
         ↓
┌─────────────────────────┐
│ NextAuth check session  │
└────────┬────────────────┘
         │
    ┌────┴────┐
    │          │
    ↓          ↓
 EXISTS    NOT EXISTS
    │          │
    ↓          ↓
 HOME      AUTH PAGE
          (login form)
           │
           ↓
    POST /api/register
           │
           ↓
    MongoDB save user
           │
           ↓
    NextAuth create session
           │
           ↓
        HOME
```

### Watch Movie Flow
```
┌────────────────────────┐
│ User clicks movie card │
└────────┬───────────────┘
         │
         ↓
┌────────────────────────────┐
│ Navigate /watch/[movieId]  │
└────────┬───────────────────┘
         │
         ↓
┌────────────────────────────┐
│ useMovie(movieId) hook     │
│ GET /api/movies/[movieId]  │
└────────┬───────────────────┘
         │
         ↓
┌────────────────────────────┐
│ Prisma find movie in DB    │
└────────┬───────────────────┘
         │
         ↓
┌────────────────────────────┐
│ Return movie object        │
│ with videoUrl (YouTube)    │
└────────┬───────────────────┘
         │
         ↓
┌────────────────────────────┐
│ Render YouTube embed       │
│ Show movie info & controls │
└────────────────────────────┘
```

### Add Favorite Flow
```
┌──────────────────────────┐
│ User clicks heart icon   │
└────────┬─────────────────┘
         │
         ↓
┌──────────────────────────────────┐
│ FavoriteButton component         │
│ Send POST /api/favorite          │
│ Body: { movieId: "..." }         │
└────────┬───────────────────────────┘
         │
         ↓
┌──────────────────────────────────────┐
│ Next.js API route /api/favorite      │
│ Get current user (from session)      │
└────────┬───────────────────────────────┘
         │
         ↓
┌──────────────────────────────────────┐
│ Prisma update user                   │
│ Push movieId to favoriteIds array    │
└────────┬───────────────────────────────┘
         │
         ↓
┌──────────────────────────────────────┐
│ Save to MongoDB User collection      │
└────────┬───────────────────────────────┘
         │
         ↓
┌──────────────────────────────────────┐
│ Return updated user object           │
│ useFavorites hook revalidates        │
└──────────────────────────────────────┘
```

---

## 🎯 Key Files Explanation

### prisma/schema.prisma
- Định nghĩa database models (User, Movie, Account, Session)
- Define relationships giữa models
- Used by Prisma migrations

### next.config.js
- Next.js configuration
- Image optimization settings
- Environment variables

### tailwind.config.js
- Tailwind CSS color scheme
- Custom breakpoints
- Plugin configuration

### .env files
**Backend (.env)**
- DATABASE_URL: MongoDB connection string
- BACKEND_PORT: Server port (4000)
- JWT_SECRET: For token signing

**Frontend (.env.local)**
- NEXTAUTH_URL: URL của app
- NEXTAUTH_SECRET: For NextAuth
- DATABASE_URL: MongoDB connection
- GITHUB_ID, GITHUB_SECRET: OAuth
- GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET: OAuth

### libs/serverAuth.ts
- Helper function để lấy session từ server-side
- Used trong API routes
- Returns user object hoặc throws error

### libs/fetcher.ts
- SWR fetcher function
- Lấy data từ API endpoints
- Auto error handling

---

## 🚀 Cách Chạy Dự Án

### 1. Setup Database
```bash
# Option A: Docker
docker-compose up -d

# Option B: Local MongoDB
# Make sure MongoDB running on localhost:27017
```

### 2. Backend Setup
```bash
cd backend
cp .env.example .env
npm install
npm run dev
# Server runs on http://localhost:4000
# Swagger docs: http://localhost:4000/api-docs
```

### 3. Frontend Setup
```bash
cd ../web
cp .env.example .env.local
npm install
npm run dev
# App runs on http://localhost:3000
```

### 4. Seed Data
```bash
# Visit http://localhost:3000/admin/seed-data
# Click button "Cập Nhật Dữ Liệu Phim"
# OR use API:
curl -X POST http://localhost:3000/api/admin/seed-movies
```

---

## ✅ Checklist Hiểu Rõ Code

- [ ] Hiểu cấu trúc thư mục frontend & backend
- [ ] Biết MongoDB collections: User, Movie
- [ ] Hiểu NextAuth authentication flow
- [ ] Biết các API endpoints & công dụng
- [ ] Hiểu React hooks (useBillboard, useMovie, etc)
- [ ] Biết cách components communicate (props, hooks, state)
- [ ] Hiểu SWR data fetching
- [ ] Biết workflow: User → Frontend → Backend → DB

---

## 🐛 Troubleshooting

### Port already in use
```bash
# Kill process on port
lsof -i :3000
kill -9 <PID>
# hoặc change port trong code
```

### MongoDB connection failed
```bash
# Check MongoDB running
mongosh
# Check DATABASE_URL in .env
# Make sure firewall allows connection
```

### NextAuth session not working
```bash
# Check NEXTAUTH_SECRET in .env
# Check NEXTAUTH_URL is correct
# Clear cookies & try again
```

### Images not loading
```bash
# Check image URLs in database
# Add domain to next.config.js
# Check image CDN accessibility
```

---

## 📝 Notes

- Dự án sử dụng JWT tokens (NextAuth)
- Passwords được hash với bcrypt
- All API requests require authentication (except register)
- Frontend & Backend tách riêng (separate ports)
- Database: MongoDB atlas hoặc local

---

## 🔗 Links

- Frontend: http://localhost:3000
- Backend: http://localhost:4000
- Swagger API Docs: http://localhost:4000/api-docs
- Admin Seed Page: http://localhost:3000/admin/seed-data
- MongoDB: localhost:27017
