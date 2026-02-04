import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import MovieForm from '../components/MovieForm';
import MovieTable from '../components/MovieTable';
import AdminSearchBar from '../components/AdminSearchBar';

const AdminMoviesPage = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMovie, setSelectedMovie] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Fetch all movies từ main web server
  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async (query = '') => {
    try {
      setIsLoading(true);
      const url = query 
        ? `http://localhost:4000/api/admin/movies?search=${encodeURIComponent(query)}`
        : 'http://localhost:4000/api/admin/movies';
      
      const res = await fetch(url);
      const data = await res.json();
      setMovies(data.movies || []);
    } catch (error) {
      console.error('Failed to fetch movies:', error);
      alert('Lỗi: Không thể tải danh sách phim');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    fetchMovies(searchQuery);
  };

  const handleAddMovie = async (formData: any) => {
    try {
      setIsLoading(true);
      const res = await fetch('http://localhost:4000/api/admin/movies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Không thể thêm phim');
      }

      alert('✓ Thêm phim thành công!');
      setShowForm(false);
      fetchMovies();
    } catch (error: any) {
      console.error('Failed to add movie:', error);
      alert(`Lỗi: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateMovie = async (formData: any) => {
    if (!selectedMovie) return;

    try {
      setIsLoading(true);
      const res = await fetch(`http://localhost:4000/api/admin/movies/${selectedMovie._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Không thể cập nhật phim');
      }

      alert('✓ Cập nhật phim thành công!');
      setSelectedMovie(null);
      setShowForm(false);
      fetchMovies();
    } catch (error: any) {
      console.error('Failed to update movie:', error);
      alert(`Lỗi: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteMovie = async (id: string) => {
    try {
      setIsLoading(true);
      const res = await fetch(`http://localhost:4000/api/admin/movies/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Không thể xóa phim');
      }

      alert('✓ Xóa phim thành công!');
      fetchMovies();
    } catch (error: any) {
      console.error('Failed to delete movie:', error);
      alert(`Lỗi: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditClick = (movie: any) => {
    setSelectedMovie(movie);
    setShowForm(true);
  };

  const handleFormSubmit = (formData: any) => {
    if (selectedMovie) {
      handleUpdateMovie(formData);
    } else {
      handleAddMovie(formData);
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedMovie(null);
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Quản Lý Phim</h1>
          <p className="text-gray-400">Thêm, sửa, xóa phim từ hệ thống</p>
        </div>

        {/* Add Button & Search */}
        <div className="flex gap-4 mb-8 flex-col sm:flex-row">
          <button
            onClick={() => {
              setSelectedMovie(null);
              setShowForm(true);
            }}
            className="
              bg-red-600
              hover:bg-red-700
              text-white
              font-semibold
              px-6
              py-2
              rounded-lg
              transition
            "
          >
            + Thêm Phim Mới
          </button>
          <div className="flex-1">
            <AdminSearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              onSearch={handleSearch}
              isLoading={isLoading}
            />
          </div>
        </div>

        {/* Form Section */}
        {showForm && (
          <div className="mb-8 p-6 bg-gray-800/50 rounded-lg border border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">
                {selectedMovie ? 'Chỉnh Sửa Phim' : 'Thêm Phim Mới'}
              </h2>
              <button
                onClick={handleCloseForm}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ✕
              </button>
            </div>
            <MovieForm
              onSubmit={handleFormSubmit}
              initialData={selectedMovie}
              isLoading={isLoading}
            />
          </div>
        )}

        {/* Movies Table */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">
            Danh Sách Phim ({movies.length})
          </h2>
          <MovieTable
            movies={movies}
            onEdit={handleEditClick}
            onDelete={handleDeleteMovie}
            isLoading={isLoading}
          />
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminMoviesPage;
