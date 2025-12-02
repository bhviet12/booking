import logo from '../assets/logo không hình@4x.png'

export default function ChristmasHero() {
  return (
    <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 py-8 md:py-12 text-center">
      {/* Title */}
      <h1 className="text-2xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 md:mb-8 drop-shadow-2xl tracking-wide md:tracking-wider leading-tight">
        CHRISTMAS MOVIE MARATHON
      </h1>

      {/* Logo */}
      <div className="flex justify-center mb-8 md:mb-12">
        <img
          src={logo}
          alt="Logo"
          className="w-40 md:w-56 lg:w-64 h-auto drop-shadow-2xl hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Decorative elements */}
      <div className="mt-6 md:mt-8 text-2xl md:text-4xl animate-pulse">
        ❄️ 🎄 ❄️
      </div>
    </div>
  )
}
