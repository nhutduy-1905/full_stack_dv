import React from 'react'
import Navbar from '../../components/Navbar'
import Billboard from '../../components/Billboard'
import MovieList from '../../components/MovieList'
import useMovieList from '../../hooks/useMovieList'

export default function NewPopular() {
  const { data: movies } = useMovieList();

  return (
    <>
      <Navbar />
      <div className="pb-20">
        <Billboard />
        <div className="mt-4">
          {movies && <MovieList title="New & Popular" data={movies} />}
        </div>
      </div>
    </>
  )
}
