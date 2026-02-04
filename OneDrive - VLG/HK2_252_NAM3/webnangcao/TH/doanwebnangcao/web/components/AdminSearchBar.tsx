import React from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  isLoading?: boolean;
}

const AdminSearchBar: React.FC<SearchBarProps> = ({ value, onChange, onSearch, isLoading = false }) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="flex gap-3">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Tìm kiếm tên phim..."
        className="
          flex-1
          bg-gray-800
          text-white
          px-4
          py-2
          rounded-lg
          border
          border-gray-700
          focus:border-red-600
          focus:outline-none
          transition
        "
      />
      <button
        onClick={onSearch}
        disabled={isLoading}
        className="
          bg-red-600
          hover:bg-red-700
          disabled:bg-gray-600
          text-white
          font-semibold
          px-6
          py-2
          rounded-lg
          transition
        "
      >
        {isLoading ? 'Đang tìm...' : 'Tìm'}
      </button>
    </div>
  );
};

export default AdminSearchBar;
