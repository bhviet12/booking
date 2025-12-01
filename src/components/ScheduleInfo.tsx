import MovieList from './MovieList'

export default function ScheduleInfo() {
  return (
    <div className="w-full max-w-7xl mx-auto px-6">
      {/* Schedule header */}
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl max-w-2xl mx-auto mb-12">
        <div className="text-2xl md:text-3xl font-semibold text-red-700 mb-6 text-center">
          Lịch chiếu
        </div>
        <div className="text-xl md:text-2xl text-gray-800 leading-relaxed space-y-3 text-center">
          <p className="font-bold">Thứ hai: Ngày 8 – 15 – 22 – 29</p>
          <p className="text-3xl font-bold text-red-600 mt-4">
            7:30pm – hết phim
          </p>
        </div>
      </div>

      {/* Movies section */}
      <MovieList />
    </div>
  )
}
