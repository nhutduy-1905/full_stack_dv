import React from 'react'
import Navbar from '../components/Navbar'
import useFavorites from '../hooks/useFavorites'
import MovieList from '../components/MovieList'

export default function MyList() {
  const { data: favoriteMovies } = useFavorites();

  return (
    <>
      <Navbar />
      <div className="pb-20 pt-20">
        <div className="px-4 md:px-12">
          <h1 className="text-white text-4xl font-bold mb-8">My List</h1>
          {favoriteMovies && favoriteMovies.length > 0 ? (
            <MovieList title="Your Favorite Movies" data={favoriteMovies} />
          ) : (
            <div className="text-gray-400 text-xl">
              Không có phim nào trong danh sách của bạn. Nhấn vào trái tim để thêm phim yêu thích!
            </div>
          )}
        </div>
      </div>
    </>
  )
}
