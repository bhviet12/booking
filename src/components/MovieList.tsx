import { useState } from 'react'
import MovieCard from './MovieCard'
import MovieDetail from './MovieDetail'
import nightmareBeforeChristmas from '../assets/the nightmare before christmas.jpg'
import lastHoliday from '../assets/last holiday.avif'
import dieHard from '../assets/die hard.jpg'
import loveActually from '../assets/love actually.jpg'

export interface TicketType {
  type: 'Sofa' | 'Ghế thường'
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
  releaseYear: number
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
    title: 'Die Hard',
    image: dieHard,
    description: 'Thông tin buổi chiếu\n\nMột sĩ quan cảnh sát New York cố gắng cứu vợ cũ và nhiều người khác bị bắt làm con tin bởi khủng bố trong một bữa tiệc Giáng sinh.\n\nThời gian: 7h30 tối ngày 08.12.2025\nĐồ ăn: Burger của Aerie\nHành rung rinh\nĐồ uống: Đặt trước theo menu có sẵn\n\n(Giá vé đã bao gồm một phần ăn và một loại đồ uống bất kỳ trong menu (không áp dụng cho bánh ngọt))',
    ticketTypes: [
      { type: 'Sofa', price: 250000, maxSeats: 3, availableSeats: 3, description: 'Ngồi được 2-3 người' },
      { type: 'Ghế thường', price: 200000, maxSeats: 7, availableSeats: 7, description: 'Ngồi 1 người' }
    ],
    showDate: '08.12.2025',
    releaseYear: 1988,
    bankInfo: {
      bankName: 'Vietcombank',
      accountNumber: '1234567890',
      accountName: 'CAFE TEN QUAN'
    },
    googleSheetUrl: import.meta.env.VITE_GOOGLE_SHEETS_DIE_HARD_URL || ''
  },
  {
    id: 2,
    title: 'The Nightmare Before Christmas',
    image: nightmareBeforeChristmas,
    description: 'Thông tin buổi chiếu\n\nJack Skellington, vua của Halloween Town, khám phá ra Christmas Town, nhưng nỗ lực mang Giáng sinh về nhà gây ra nhiều nhầm lẫn.\n\nThời gian: 7h30 tối ngày 15.12.2025\nĐồ ăn: Khoai nghiền và thịt hầm\nHành rung rinh\nĐồ uống: Đặt trước theo menu có sẵn\n\n(Giá vé đã bao gồm một phần ăn và một loại đồ uống bất kỳ trong menu (không áp dụng cho bánh ngọt))',
    ticketTypes: [
      { type: 'Sofa', price: 250000, maxSeats: 3, availableSeats: 3, description: 'Ngồi được 2-3 người' },
      { type: 'Ghế thường', price: 200000, maxSeats: 7, availableSeats: 7, description: 'Ngồi 1 người' }
    ],
    showDate: '15.12.2025',
    releaseYear: 1993,
    bankInfo: {
      bankName: 'Vietcombank',
      accountNumber: '1234567890',
      accountName: 'CAFE TEN QUAN'
    },
    googleSheetUrl: import.meta.env.VITE_GOOGLE_SHEETS_NIGHTMARE_URL || ''
  },
  {
    id: 3,
    title: 'Love Actually',
    image: loveActually,
    description: 'Thông tin buổi chiếu\n\nCâu chuyện tình yêu đan xen của nhiều cặp đôi trong mùa Giáng sinh tại London.\n\nThời gian: 7h30 tối ngày 22.12.2025\nĐồ ăn: Mỳ ý bò bằm sốt kem\nTrứng cút vui nhộn\nĐồ uống: Đặt trước theo menu có sẵn\n\n(Giá vé đã bao gồm một phần ăn và một loại đồ uống bất kỳ trong menu (không áp dụng cho bánh ngọt))',
    ticketTypes: [
      { type: 'Sofa', price: 250000, maxSeats: 3, availableSeats: 3, description: 'Ngồi được 2-3 người' },
      { type: 'Ghế thường', price: 200000, maxSeats: 7, availableSeats: 7, description: 'Ngồi 1 người' }
    ],
    showDate: '22.12.2025',
    releaseYear: 2003,
    bankInfo: {
      bankName: 'Vietcombank',
      accountNumber: '1234567890',
      accountName: 'CAFE TEN QUAN'
    },
    googleSheetUrl: import.meta.env.VITE_GOOGLE_SHEETS_LOVE_ACTUALLY_URL || ''
  },
  {
    id: 4,
    title: 'Last Holiday',
    image: lastHoliday,
    description: 'Thông tin buổi chiếu\n\nMột người phụ nữ nghĩ mình sắp chết nên bỏ việc, tiêu hết tiền để tận hưởng cuộc sống xa hoa ở châu Âu.\n\nThời gian: 7h30 tối ngày 29.12.2025\nĐồ ăn: Cơm cà ri gà cay\nTrứng cút vui nhộn\nĐồ uống: Đặt trước theo menu có sẵn\n\n(Giá vé đã bao gồm một phần ăn và một loại đồ uống bất kỳ trong menu (không áp dụng cho bánh ngọt))',
    ticketTypes: [
      { type: 'Sofa', price: 250000, maxSeats: 3, availableSeats: 3, description: 'Ngồi được 2-3 người' },
      { type: 'Ghế thường', price: 200000, maxSeats: 7, availableSeats: 7, description: 'Ngồi 1 người' }
    ],
    showDate: '29.12.2025',
    releaseYear: 2006,
    bankInfo: {
      bankName: 'Vietcombank',
      accountNumber: '1234567890',
      accountName: 'CAFE TEN QUAN'
    },
    googleSheetUrl: import.meta.env.VITE_GOOGLE_SHEETS_LAST_HOLIDAY_URL || ''
  }
]

export default function MovieList() {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)

  return (
    <>
      <div>
        <h2 className="font-hammersmith text-2xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-6 md:mb-8 drop-shadow-2xl">
          MOVIE
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {movies.map((movie) => (
            movie.image ? (
              <MovieCard
                key={movie.id}
                title={movie.title}
                image={movie.image}
                releaseYear={movie.releaseYear}
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
