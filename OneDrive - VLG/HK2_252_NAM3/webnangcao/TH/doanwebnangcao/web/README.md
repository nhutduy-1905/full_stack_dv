# Web - Netflix Clone Frontend + Next.js API Routes

Next.js 13 frontend + API routes cho Netflix Clone.

## Cấu trúc

```
web/
├── components/          # React components
│   ├── MovieCard.tsx    # Movie card (hover effects)
│   ├── MovieRow.tsx     # Carousel row (with arrows)
│   ├── MovieList.tsx    # Experimental carousel
│   ├── Navbar.tsx       # Top navigation bar
│   ├── Billboard.tsx    # Hero section
│   ├── ProtectedPage.tsx # Auth protection wrapper
│   ├── FavoriteButton.tsx
│   ├── PlayButton.tsx
│   ├── MobileMenu.tsx
│   ├── InfoModal.tsx
│   ├── AccountMenu.tsx
│   └── input.tsx
├── pages/               # Next.js pages + API routes
│   ├── index.tsx        # Home (main page)
│   ├── auth.tsx         # Login/Register page
│   ├── profiles.tsx     # Profile selection
│   ├── watch/
│   │   └── [movieId].tsx   # Video player page
│   └── api/
│       ├── auth/[...nextauth].ts    # NextAuth.js config
│       ├── favorite.ts     # Add favorite (POST)
│       ├── deletefavorite.ts # Remove favorite (DELETE)
│       ├── favorites.ts    # Get favorites (GET)
│       ├── movies/
│       │   ├── index.ts    # Get all movies
│       │   └── [movieId].ts # Get movie details
│       ├── register.ts     # User registration
│       ├── current.ts      # Current user info
│       └── seed.ts         # Seed database
├── hooks/               # React hooks
│   ├── useCurrentUser.ts
│   ├── useFavorites.ts
│   ├── useMovie.ts
│   ├── useBillboard.ts
│   └── useMovieList.ts
├── libs/                # Utilities & helpers
│   ├── prismadb.ts     # Prisma client
│   ├── fetcher.ts      # SWR fetcher
│   └── serverAuth.ts   # Server-side auth check
├── store/              # Redux state management
│   ├── index.ts        # Store config
│   ├── movies.ts       # Movies slice
│   └── profile.ts      # Profile slice
├── styles/             # Tailwind CSS
│   └── globals.css
├── public/             # Static assets
│   └── images/
├── package.json        # Dependencies
├── tsconfig.json       # TypeScript config
├── tailwind.config.js  # Tailwind config
├── next.config.js      # Next.js config
├── postcss.config.js   # PostCSS config
└── .eslintrc.json      # ESLint config
```

## Setup

### 1. Install Dependencies
```bash
cd web
npm install
```

### 2. Environment Setup
Tạo hoặc cập nhật `.env.local`:
```env
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=your_secret_key_here
NEXTAUTH_JWT_SECRET=your_jwt_secret_here

# Database (MongoDB)
DATABASE_URL=mongodb://localhost:27017/netflix

# OAuth Providers
GITHUB_ID=your_github_id
GITHUB_SECRET=your_github_secret
GOOGLE_CLIENT_ID=your_google_id
GOOGLE_CLIENT_SECRET=your_google_secret

# TMDB API (for posters)
NEXT_PUBLIC_TMDB_JWT_TOKEN=your_tmdb_token
```

### 3. Start Dev Server
```bash
npm run dev
```
Open [http://localhost:3001](http://localhost:3001)

### 4. Database Seed
```bash
npx prisma db seed
```

## Key Features

### ✅ Authentication
- Email/Password login
- GitHub OAuth
- Google OAuth
- NextAuth.js + JWT

### ✅ Movie Browsing
- Trending Now carousel
- Multiple genre rows
- Netflix-style hover effects (scale, shadow, z-index)
- Carousel arrows (show on hover)

### ✅ Video Watching
- YouTube embed player
- Progress tracking
- Continue watching feature

### ✅ Favorites System
- Add/remove favorites
- Persistent storage (MongoDB)
- Quick access from UI

### ✅ Styling
- Tailwind CSS
- Netflix-style design
- Responsive (mobile + desktop)
- Dark theme with gradients

## API Routes

All routes require auth (except `/api/auth/*` and `/api/register`):

```
POST   /api/register              - Register new user
POST   /api/auth/[...nextauth]   - NextAuth endpoints
GET    /api/current              - Current user info
GET    /api/movies               - List all movies
GET    /api/movies/[movieId]     - Get movie details
POST   /api/favorite             - Add to favorites
DELETE /api/deletefavorite       - Remove from favorites
GET    /api/favorites            - Get user's favorites
GET    /api/random               - Random movie
```

## Component Highlights

### MovieRow (Carousel)
- Absolutely positioned navigation arrows
- Hidden by default, show on hover
- Smooth scroll with `scrollBehavior: 'smooth'`
- Responsive card sizing
- Conditional rendering (only show if 4+ movies)

### MovieCard (Card)
- Aspect ratio 16:9
- Hover effects:
  - Scale: 1.1x
  - Shadow: 2xl
  - Z-index: 20 (float above row)
  - Gradient overlay: from-black (60% opacity)
- Netflix-style bottom gradient
- Smooth transitions (300ms)

### Billboard (Hero)
- Large featured image
- Title + description
- Play button overlay
- Gradient background

## Design Principles

- **Netflix-style UI**: Dark theme, white text, red accents
- **Smooth interactions**: Transitions on all hovers
- **Responsive design**: Mobile-first, scales to desktop
- **Performance**: SWR for data fetching, Prisma for queries
- **Accessibility**: Proper semantic HTML, ARIA labels

## Build & Deploy

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

## Tech Stack

- **Framework**: Next.js 13.3.1
- **UI**: React 18.2.0, Tailwind CSS
- **Database**: MongoDB + Prisma ORM
- **Auth**: NextAuth.js 4.22.1
- **State**: Redux Toolkit
- **HTTP**: Axios, SWR
- **Utils**: Bcrypt, Lodash
- **Icons**: React Icons (Heroicons)

## Troubleshooting

### 1. Port already in use
```bash
# Server tries 3000 → 3001 automatically
```

### 2. MongoDB connection error
- Check MongoDB is running: `mongod --version`
- Verify `DATABASE_URL` in `.env.local`

### 3. Tailwind classes not applying
```bash
# Clear cache and rebuild
rm -r .next
npm run dev
```

### 4. Auth not working
- Verify `NEXTAUTH_SECRET` and `NEXTAUTH_JWT_SECRET` set
- Check OAuth credentials in `.env.local`
- Ensure MongoDB has users collection

## Notes

- All API routes auto-generated by Next.js (`pages/api/`)
- Database layer handled by Prisma (see `/backend/`)
- Static assets in `/public/`
- Component styling uses Tailwind classes + inline styles (for guaranteed positioning)
