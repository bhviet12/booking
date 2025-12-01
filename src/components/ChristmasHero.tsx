import logo from '../assets/logo không hình@4x.png'

export default function ChristmasHero() {
  return (
    <div className="relative z-10 max-w-4xl mx-auto px-6 py-12 text-center">
      {/* Title */}
      <h1 className="text-6xl md:text-7xl font-bold text-white mb-8 drop-shadow-2xl tracking-wider">
        CHRISTMAS MOVIE MARATHON
      </h1>

      {/* Logo */}
      <div className="flex justify-center mb-12">
        <img
          src={logo}
          alt="Logo"
          className="w-64 h-auto drop-shadow-2xl hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Decorative elements */}
      <div className="mt-8 text-4xl animate-pulse">
        ❄️ 🎄 ❄️
      </div>
    </div>
  )
}
