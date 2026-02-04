import React, { useState, useMemo } from 'react';
import { BsSearch } from 'react-icons/bs';
import useMovieList from '../hooks/useMovieList';
import { movieActions } from '../store/movies';
import { useAppDispatch } from '../store/index';
import { useGetMovie } from '../hooks/useMovieList';

interface SearchBarProps {
  onSelectMovie?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSelectMovie }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const { data: allMovies } = useMovieList();
  const dispatch = useAppDispatch();
  const getMovie = useGetMovie();

  // Lọc phim theo search query
  const searchResults = useMemo(() => {
    if (!searchQuery.trim() || !allMovies) return [];
    
    const query = searchQuery.toLowerCase();
    return allMovies.filter((movie) =>
      movie.title.toLowerCase().includes(query) ||
      movie.description.toLowerCase().includes(query)
    ).slice(0, 8); // Limit 8 results
  }, [searchQuery, allMovies]);

  const handleMovieClick = (movieId: string) => {
    const movie = getMovie(movieId);
    dispatch(movieActions.showModal(movie));
    setSearchQuery('');
    setShowResults(false);
    onSelectMovie?.();
  };

  return (
    <div className="relative w-80">
      {/* Search Input */}
      <div className="
        flex
        items-center
        gap-3
        bg-gray-700
        bg-opacity-70
        border
        border-gray-500
        rounded-full
        px-4
        py-1.5
        focus-within:bg-opacity-90
        focus-within:border-white
        transition
      ">
        <BsSearch className="text-white text-base flex-shrink-0" />
        <input
          type="text"
          placeholder="Tìm kiếm phim, diễn viên"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setShowResults(true);
          }}
          onFocus={() => searchQuery && setShowResults(true)}
          onBlur={() => setTimeout(() => setShowResults(false), 200)}
          className="
            flex-1
            bg-transparent
            text-white
            outline-none
            placeholder-gray-400
            text-xs
            truncate
          "
        />
      </div>

      {/* Search Results Dropdown */}
      {showResults && searchQuery.trim() && (
        <div className="
          absolute
          top-full
          left-0
          right-0
          mt-2
          bg-zinc-900
          border
          border-gray-700
          rounded-lg
          shadow-lg
          z-50
          max-h-96
          overflow-y-auto
        ">
          {searchResults.length > 0 ? (
            <div className="p-3">
              <p className="text-gray-400 text-xs mb-3 px-2">
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
                      className="w-10 h-14 object-cover rounded"
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
        </div>
      )}
    </div>
  );
};

export default SearchBar;
