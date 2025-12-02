import MovieList from './MovieList'

export default function ScheduleInfo() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-6">
      {/* Schedule header */}
      <div className="bg-white/95 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-8 shadow-2xl max-w-3xl mx-auto mb-8 md:mb-12">
        <div className="text-lg md:text-2xl lg:text-3xl font-semibold text-red-700 mb-4 md:mb-6 text-center">
          Lịch chiếu
        </div>
        <div className="text-xs md:text-base lg:text-lg text-gray-800 leading-relaxed space-y-2 md:space-y-3">
          <p className="font-bold text-center text-sm md:text-xl lg:text-2xl">Thứ hai hàng tuần • 7:30pm</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mt-4">
            <div className="bg-red-50 p-3 md:p-4 rounded-lg">
              <p className="font-bold text-red-700">8/12 - Die Hard</p>
              <p className="text-gray-600">Burger của Aerie</p>
            </div>
            <div className="bg-red-50 p-3 md:p-4 rounded-lg">
              <p className="font-bold text-red-700">15/12 - Nightmare Before Christmas</p>
              <p className="text-gray-600">Khoai nghiền & thịt hầm</p>
            </div>
            <div className="bg-red-50 p-3 md:p-4 rounded-lg">
              <p className="font-bold text-red-700">22/12 - Love Actually</p>
              <p className="text-gray-600">Mỳ ý bò bằm sốt kem</p>
            </div>
            <div className="bg-red-50 p-3 md:p-4 rounded-lg">
              <p className="font-bold text-red-700">29/12 - Last Holiday</p>
              <p className="text-gray-600">Cơm cà ri gà cay</p>
            </div>
          </div>
        </div>
      </div>

      {/* Movies section */}
      <MovieList />
    </div>
  )
}
