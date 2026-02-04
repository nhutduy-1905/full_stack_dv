# Backend - Prisma + MongoDB

Database layer và schema definitions cho Netflix Clone.

## Cấu trúc

```
backend/
├── prisma/
│   ├── schema.prisma      # Database schema (User, Movie, Session, Account, etc)
│   ├── seed.ts           # Seed 46 movies vào MongoDB
│   └── migrations/       # Database migrations
├── .env                  # MongoDB connection (DATABASE_URL)
└── .env.local           # Local environment variables
```

## Setup

### 1. Install dependencies (từ `web` folder)
```bash
cd ../web
npm install
```

### 2. Configure MongoDB
Cập nhật `.env` hoặc `.env.local`:
```env
DATABASE_URL="mongodb://localhost:27017/netflix"
```

### 3. Migrate Prisma Schema
```bash
cd ../web
npx prisma migrate dev --name init
```

### 4. Seed Database (46 movies)
```bash
npx prisma db seed
```

### 5. View Database (Prisma Studio)
```bash
npx prisma studio
```

## Schema

### User
- `id`: ObjectId (PK)
- `email`: Unique identifier
- `name`: Display name
- `hashedPassword`: Bcrypt hash
- `favoriteIds`: Array of movie IDs
- `sessions`: NextAuth sessions
- `accounts`: OAuth accounts (GitHub, Google)

### Movie
- `id`: ObjectId (PK)
- `title`: Movie name
- `duration`: Runtime (seconds)
- `thumbnailUrl`: Poster image
- `description`: Plot summary
- `genre`: Movie genre
- `rating`: IMDB rating
- `videoUrl`: YouTube video

### Session / Account
Managed by NextAuth.js + Prisma Adapter

## API Endpoints (trong `/web`)

Web app tại `../web` sử dụng APIs này:

```
POST /api/register          # Register user
POST /api/favorite          # Add to favorites
DELETE /api/deletefavorite  # Remove from favorites
GET /api/favorites          # Get user's favorites
GET /api/movies             # Get all movies
GET /api/movies/[movieId]   # Get movie details
POST /api/auth/callback     # OAuth callback
```

## MongoDB Collections

Auto-created bởi Prisma:
- `users`
- `movies`
- `sessions`
- `accounts`
- `verificationtokens`

## Notes

- Prisma ORM handles MongoDB queries
- Adapter: `@next-auth/prisma-adapter`
- Database: MongoDB (local hoặc Atlas)
- Migrations tracked in `/prisma/migrations/`
