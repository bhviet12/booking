interface MovieCardProps {
  title: string
  image: string
  releaseYear: number
  description?: string
  onClick: () => void
}

export default function MovieCard({ title, image, releaseYear, onClick }: MovieCardProps) {
  return (
    <div
      onClick={onClick}
      className="aspect-[2/3] rounded-xl shadow-xl hover:scale-105 transition-transform duration-300 cursor-pointer overflow-hidden relative group"
    >
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover"
      />

      {/* Title overlay */}
      <div className="absolute inset-0 bg-black/60 flex items-center justify-center p-2 md:p-4">
        <h3 className="font-hammersmith text-white text-xs md:text-xl lg:text-2xl font-bold text-center drop-shadow-lg leading-tight uppercase">
          {title} ({releaseYear})
        </h3>
      </div>
    </div>
  )
}
