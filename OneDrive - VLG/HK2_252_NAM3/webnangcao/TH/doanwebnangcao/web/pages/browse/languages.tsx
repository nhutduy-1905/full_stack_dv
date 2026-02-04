import React from 'react'
import Navbar from '../../components/Navbar'
import Billboard from '../../components/Billboard'
import MovieList from '../../components/MovieList'
import useMovieList from '../../hooks/useMovieList'

export default function Languages() {
  const { data: movies } = useMovieList();

  return (
    <>
      <Navbar />
      <div className="pb-20">
        <Billboard />
        <div className="mt-4 px-4 md:px-12">
          <div className="mb-8">
            <h2 className="text-white text-2xl font-bold mb-4">Browse by Language</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['All', 'Vietnamese', 'English', 'Japanese', 'Chinese', 'Korean', 'Thai', 'French'].map((lang) => (
                <div
                  key={lang}
                  className="bg-zinc-900 hover:bg-zinc-800 p-4 rounded-lg cursor-pointer transition text-white text-center"
                >
                  {lang}
                </div>
              ))}
            </div>
          </div>
          {movies && <MovieList title="All Movies" data={movies} />}
        </div>
      </div>
    </>
  )
}
