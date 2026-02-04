import React, { useState, useMemo } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import useMovieList from '../hooks/useMovieList';
import { movieActions } from '../store/movies';
import { useAppDispatch, useAppSelector } from '../store/index';
import { useGetMovie } from '../hooks/useMovieList';
import { useRouter } from 'next/router';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: allMovies } = useMovieList();
  const dispatch = useAppDispatch();
  const getMovie = useGetMovie();
  const router = useRouter();
  const movies = useAppSelector(state => state.movies.movies);

  // Lọc phim theo search query
  const searchResults = useMemo(() => {
    if (!searchQuery.trim() || !allMovies) return [];
    
    const query = searchQuery.toLowerCase();
    return allMovies.filter((movie) =>
      movie.title.toLowerCase().includes(query) ||
      movie.description.toLowerCase().includes(query)
    ).slice(0, 6); // Limit 6 results
  }, [searchQuery, allMovies]);

  const handleMovieClick = (movieId: string) => {
    const movie = getMovie(movieId);
    dispatch(movieActions.showModal(movie));
    setSearchQuery('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="
      absolute
      top-full
      right-0
      mt-2
      w-96
      bg-zinc-900
      border
      border-gray-700
      rounded-lg
      shadow-lg
      z-50
      max-h-[500px]
      overflow-hidden
    ">
      {/* Search Input */}
      <div className="p-4 border-b border-gray-700">
        <input
          type="text"
          placeholder="Tìm kiếm phim..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="
            w-full
            bg-gray-800
            text-white
            px-3
            py-2
            rounded-lg
            focus:outline-none
            focus:ring-2
            focus:ring-red-600
            placeholder-gray-400
            text-sm
          "
          autoFocus
        />
      </div>

      {/* Search Results */}
      <div className="overflow-y-auto max-h-[420px]">
        {searchQuery.trim() ? (
          <>
            {searchResults.length > 0 ? (
              <div className="p-4">
                <p className="text-gray-400 text-xs mb-3">
                  Tìm thấy {searchResults.length} kết quả
                </p>
                <div className="space-y-2">
                  {searchResults.map((movie) => (
                    <div
                      key={movie.id}
                      onClick={() => handleMovieClick(movie.id)}
                      className="
                        flex
                        items-center
                        gap-3
                        p-2
                        rounded-lg
                        hover:bg-gray-800
                        cursor-pointer
                        transition
                      "
                    >
                      <img
                        src={movie.thumbnailUrl}
                        alt={movie.title}
                        className="w-12 h-16 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-semibold truncate">
                          {movie.title}
                        </p>
                        <p className="text-gray-400 text-xs truncate">
                          {movie.genre}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-4 text-center">
                <p className="text-gray-400 text-sm">
                  Không tìm thấy phim "{searchQuery}"
                </p>
              </div>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
};

export default SearchModal;
