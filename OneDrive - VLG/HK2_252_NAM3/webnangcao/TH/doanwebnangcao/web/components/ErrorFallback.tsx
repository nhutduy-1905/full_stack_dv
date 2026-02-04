import React from 'react';

interface ErrorFallbackProps {
  title?: string;
  message?: string;
  image?: string;
  onRetry?: () => void;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  title = 'CÓ BIẾN RỒI',
  message = 'Hãy thử refresh lại',
  image = '/images/default-blue.png',
  onRetry,
}) => {
  return (
    <div className="
      min-h-screen
      bg-black
      flex
      items-center
      justify-center
      px-4
    ">
      <div className="
        flex
        flex-col
        md:flex-row
        items-center
        gap-8
        md:gap-12
      ">
        {/* Image */}
        <div className="flex-shrink-0">
          <img
            src={image}
            alt="Error"
            className="
              w-32
              h-32
              md:w-40
              md:h-40
              rounded-2xl
              object-cover
            "
          />
        </div>

        {/* Content */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="
            text-white
            text-3xl
            md:text-5xl
            font-bold
            mb-4
          ">
            {title}
          </h1>
          <p className="
            text-gray-400
            text-lg
            md:text-xl
            mb-8
          ">
            {message}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button
              onClick={onRetry || (() => window.location.reload())}
              className="
                px-6
                py-2
                bg-white
                text-black
                font-semibold
                rounded-lg
                hover:bg-gray-300
                transition
              "
            >
              Refresh
            </button>
            <button
              onClick={() => window.location.href = '/'}
              className="
                px-6
                py-2
                bg-transparent
                border
                border-white
                text-white
                font-semibold
                rounded-lg
                hover:bg-white
                hover:text-black
                transition
              "
            >
              Về Trang Chủ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorFallback;
