import React, { useState } from 'react';

interface MovieFormProps {
  onSubmit: (data: any) => void;
  initialData?: any;
  isLoading?: boolean;
}

const MovieForm: React.FC<MovieFormProps> = ({ onSubmit, initialData, isLoading = false }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    genre: initialData?.genre || '',
    duration: initialData?.duration || '',
    videoUrl: initialData?.videoUrl || '',
    thumbnailUrl: initialData?.thumbnailUrl || '',
  });

  const [errors, setErrors] = useState<any>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev: any) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = (): Record<string, string> => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = 'Tên phim không được trống';
    if (!formData.description.trim()) newErrors.description = 'Mô tả không được trống';
    if (!formData.genre.trim()) newErrors.genre = 'Thể loại không được trống';
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = validate();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-900 p-6 rounded-lg border border-gray-700">
      <h2 className="text-2xl font-bold text-white mb-6">
        {initialData ? 'Sửa Phim' : 'Thêm Phim Mới'}
      </h2>

      {/* Tên phim */}
      <div className="mb-4">
        <label className="block text-gray-300 mb-2 font-semibold">Tên Phim *</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Nhập tên phim..."
          className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-red-600 focus:outline-none"
        />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
      </div>

      {/* Mô tả */}
      <div className="mb-4">
        <label className="block text-gray-300 mb-2 font-semibold">Mô Tả *</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Nhập mô tả phim..."
          rows={4}
          className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-red-600 focus:outline-none"
        />
        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
      </div>

      {/* Thể loại */}
      <div className="mb-4">
        <label className="block text-gray-300 mb-2 font-semibold">Thể Loại *</label>
        <input
          type="text"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          placeholder="VD: Hành động, Tình cảm, Hoạt hình"
          className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-red-600 focus:outline-none"
        />
        {errors.genre && <p className="text-red-500 text-sm mt-1">{errors.genre}</p>}
      </div>

      {/* Thời lượng */}
      <div className="mb-4">
        <label className="block text-gray-300 mb-2 font-semibold">Thời Lượng (phút)</label>
        <input
          type="text"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          placeholder="VD: 120"
          className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-red-600 focus:outline-none"
        />
      </div>

      {/* Video URL */}
      <div className="mb-4">
        <label className="block text-gray-300 mb-2 font-semibold">Link Video</label>
        <input
          type="text"
          name="videoUrl"
          value={formData.videoUrl}
          onChange={handleChange}
          placeholder="https://..."
          className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-red-600 focus:outline-none"
        />
      </div>

      {/* Thumbnail URL */}
      <div className="mb-6">
        <label className="block text-gray-300 mb-2 font-semibold">Link Ảnh Poster</label>
        <input
          type="text"
          name="thumbnailUrl"
          value={formData.thumbnailUrl}
          onChange={handleChange}
          placeholder="https://..."
          className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-red-600 focus:outline-none"
        />
      </div>

      {/* Submit Button */}
      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isLoading}
          className="
            flex-1
            bg-red-600
            hover:bg-red-700
            disabled:bg-gray-600
            text-white
            font-semibold
            py-2
            rounded-lg
            transition
          "
        >
          {isLoading ? 'Đang xử lý...' : (initialData ? 'Cập Nhật' : 'Thêm Phim')}
        </button>
      </div>
    </form>
  );
};

export default MovieForm;
