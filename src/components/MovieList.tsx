import { useState } from 'react'
import MovieCard from './MovieCard'
import MovieDetail from './MovieDetail'
import nightmareBeforeChristmas from '../assets/the nightmare before christmas.jpg'
import lastHoliday from '../assets/last holiday.avif'
import dieHard from '../assets/die hard.jpg'

export interface TicketType {
  type: 'A' | 'B'
  price: number
  maxSeats: number
  availableSeats: number
  description: string
}

export interface Movie {
  id: number
  title: string
  image: string
  description: string
  ticketTypes: TicketType[]
  showDate: string
  bankInfo: {
    bankName: string
    accountNumber: string
    accountName: string
  }
  googleSheetUrl: string
}

const movies: Movie[] = [
  {
    id: 1,
    title: 'The Nightmare Before Christmas',
    image: nightmareBeforeChristmas,
    description: 'Jack Skellington, king of Halloween Town, discovers Christmas Town, but his attempts to bring Christmas to his home causes confusion.',
    ticketTypes: [
      { type: 'A', price: 150000, maxSeats: 5, availableSeats: 5, description: 'Ghế VIP - Hàng đầu' },
      { type: 'B', price: 100000, maxSeats: 6, availableSeats: 6, description: 'Ghế thường' }
    ],
    showDate: '08.12.2025',
    bankInfo: {
      bankName: 'Vietcombank',
      accountNumber: '1234567890',
      accountName: 'CAFE TEN QUAN'
    },
    googleSheetUrl: import.meta.env.VITE_GOOGLE_SHEETS_NIGHTMARE_URL || ''
  },
  {
    id: 2,
    title: 'LAST HOLIDAY (2006)',
    image: lastHoliday,
    description: 'Thông tin buổi chiếu\n\nMột người phụ nữ nghĩ mình sắp chết nên bỏ việc, tiêu hết tiền để tận hưởng cuộc sống xa hoa ở châu Âu.\n\nThời gian: 7h30 tối ngày 29.12.2025\nĐồ ăn: Cơm gà cà ri cay\nĐồ uống: Đặt trước theo menu có sẵn',
    ticketTypes: [
      { type: 'A', price: 150000, maxSeats: 5, availableSeats: 5, description: 'Ghế VIP - Hàng đầu' },
      { type: 'B', price: 100000, maxSeats: 6, availableSeats: 6, description: 'Ghế thường' }
    ],
    showDate: '29.12.2025',
    bankInfo: {
      bankName: 'Vietcombank',
      accountNumber: '1234567890',
      accountName: 'CAFE TEN QUAN'
    },
    googleSheetUrl: import.meta.env.VITE_GOOGLE_SHEETS_LAST_HOLIDAY_URL || ''
  },
  {
    id: 3,
    title: 'Die Hard',
    image: dieHard,
    description: 'A New York City police officer tries to save his estranged wife and several others taken hostage by terrorists during a Christmas party.',
    ticketTypes: [
      { type: 'A', price: 150000, maxSeats: 5, availableSeats: 5, description: 'Ghế VIP - Hàng đầu' },
      { type: 'B', price: 100000, maxSeats: 6, availableSeats: 6, description: 'Ghế thường' }
    ],
    showDate: '15.12.2025',
    bankInfo: {
      bankName: 'Vietcombank',
      accountNumber: '1234567890',
      accountName: 'CAFE TEN QUAN'
    },
    googleSheetUrl: import.meta.env.VITE_GOOGLE_SHEETS_DIE_HARD_URL || ''
  },
  {
    id: 4,
    title: 'Coming Soon',
    image: '',
    description: 'More exciting Christmas movies coming soon!',
    ticketTypes: [],
    showDate: '',
    bankInfo: {
      bankName: '',
      accountNumber: '',
      accountName: ''
    },
    googleSheetUrl: ''
  }
]

export default function MovieList() {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)

  return (
    <>
      <div>
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-6 md:mb-8 drop-shadow-2xl">
          MOVIE
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {movies.map((movie) => (
            movie.image ? (
              <MovieCard
                key={movie.id}
                title={movie.title}
                image={movie.image}
                description={movie.description}
                onClick={() => setSelectedMovie(movie)}
              />
            ) : (
              <div
                key={movie.id}
                className="aspect-[2/3] bg-gray-200 rounded-xl shadow-xl overflow-hidden flex items-center justify-center"
              >
                <span className="text-gray-400 text-sm md:text-2xl font-bold">Coming Soon</span>
              </div>
            )
          ))}
        </div>
      </div>

      {selectedMovie && (
        <MovieDetail
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </>
  )
}
