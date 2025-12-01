interface MovieCardProps {
  title: string
  image: string
  description?: string
  onClick: () => void
}

export default function MovieCard({ title, image, description, onClick }: MovieCardProps) {
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
      <div className="absolute inset-0 bg-black/60 flex items-center justify-center p-4">
        <h3 className="text-white text-xl md:text-2xl font-bold text-center drop-shadow-lg">
          {title}
        </h3>
      </div>
    </div>
  )
}
