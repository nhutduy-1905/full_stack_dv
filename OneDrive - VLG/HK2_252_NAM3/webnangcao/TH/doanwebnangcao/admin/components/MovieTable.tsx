import React from 'react';

interface MovieTableProps {
  movies: any[];
  onEdit: (movie: any) => void;
  onDelete: (id: string) => void;
  isLoading?: boolean;
}

const MovieTable: React.FC<MovieTableProps> = ({ movies, onEdit, onDelete, isLoading = false }) => {
  return (
    <div className="bg-gray-900 rounded-lg border border-gray-700 overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-800 border-b border-gray-700 sticky top-0">
          <tr>
            <th className="px-4 py-3 text-left text-gray-300 font-semibold">STT</th>
            <th className="px-4 py-3 text-left text-gray-300 font-semibold">Tên Phim</th>
            <th className="px-4 py-3 text-left text-gray-300 font-semibold">Thể Loại</th>
            <th className="px-4 py-3 text-left text-gray-300 font-semibold">Mô Tả</th>
            <th className="px-4 py-3 text-center text-gray-300 font-semibold">Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {movies && movies.length > 0 ? (
            movies.map((movie, index) => (
              <tr key={movie._id} className="border-b border-gray-700 hover:bg-gray-800/50 transition">
                <td className="px-4 py-3 text-gray-400">{index + 1}</td>
                <td className="px-4 py-3 text-white font-medium truncate max-w-xs">{movie.title}</td>
                <td className="px-4 py-3 text-gray-400 text-xs">{movie.genre}</td>
                <td className="px-4 py-3 text-gray-400 truncate max-w-xs">{movie.description}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => onEdit(movie)}
                      className="
                        px-3 py-1.5
                        bg-blue-600
                        hover:bg-blue-700
                        text-white
                        text-xs
                        font-semibold
                        rounded
                        transition
                      "
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Bạn chắc chắn xóa "${movie.title}"?`)) {
                          onDelete(movie._id);
                        }
                      }}
                      disabled={isLoading}
                      className="
                        px-3 py-1.5
                        bg-red-600
                        hover:bg-red-700
                        disabled:bg-gray-600
                        text-white
                        text-xs
                        font-semibold
                        rounded
                        transition
                      "
                    >
                      Xóa
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="px-4 py-8 text-center text-gray-400">
                Không có phim nào
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MovieTable;
