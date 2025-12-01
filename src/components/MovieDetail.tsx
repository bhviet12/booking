import { useState } from 'react'
import type { Movie } from './MovieList'
import RegistrationDialog from './RegistrationDialog'

interface MovieDetailProps {
  movie: Movie
  onClose: () => void
}

export default function MovieDetail({ movie, onClose }: MovieDetailProps) {
  const [showRegistration, setShowRegistration] = useState(false)

  return (
    <>
      {/* Modal wrapper with backdrop */}
      <div
        className="fixed inset-0 bg-black/70 z-40 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-3xl font-bold z-10"
          >
            ×
          </button>

          {/* Content */}
          <div className="grid md:grid-cols-[2fr_1fr] gap-8 p-8">
            {/* Right side - Image */}
            <div className="order-2 md:order-1">
              <img
                src={movie.image}
                alt={movie.title}
                className="w-full h-auto rounded-lg shadow-lg object-cover"
              />
            </div>

            {/* Left side - Description */}
            <div className="order-1 md:order-2 flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  {movie.title}
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6 whitespace-pre-line">
                  {movie.description}
                </p>
              </div>

              {/* Register button */}
              <button
                onClick={() => setShowRegistration(true)}
                className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition-colors duration-200 shadow-lg"
              >
                Đăng ký xem phim
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Registration Dialog */}
      {showRegistration && (
        <RegistrationDialog
          movie={movie}
          onClose={() => setShowRegistration(false)}
        />
      )}
    </>
  )
}
