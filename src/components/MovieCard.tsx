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
      className="bg-white/95 backdrop-blur-sm rounded-xl p-5 shadow-xl hover:scale-105 transition-transform duration-300 cursor-pointer"
    >
      <div className="aspect-[2/3] bg-gray-200 rounded-lg overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  )
}
