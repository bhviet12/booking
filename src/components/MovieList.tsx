import { useState } from 'react'
import MovieCard from './MovieCard'
import MovieDetail from './MovieDetail'
import nightmareBeforeChristmas from '../assets/the nightmare before christmas.jpg'
import lastHoliday from '../assets/last holiday.avif'
import dieHard from '../assets/die hard.jpg'

export interface Movie {
  id: number
  title: string
  image: string
  description: string
}

const movies: Movie[] = [
  {
    id: 1,
    title: 'The Nightmare Before Christmas',
    image: nightmareBeforeChristmas,
    description: 'Jack Skellington, king of Halloween Town, discovers Christmas Town, but his attempts to bring Christmas to his home causes confusion.'
  },
  {
    id: 2,
    title: 'Last Holiday',
    image: lastHoliday,
    description: 'Upon learning of a terminal illness, a shy woman decides to sell all her possessions and live it up at a posh European hotel.'
  },
  {
    id: 3,
    title: 'Die Hard',
    image: dieHard,
    description: 'A New York City police officer tries to save his estranged wife and several others taken hostage by terrorists during a Christmas party.'
  },
  {
    id: 4,
    title: 'Coming Soon',
    image: '',
    description: 'More exciting Christmas movies coming soon!'
  }
]

export default function MovieList() {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)

  return (
    <>
      <div>
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-8 drop-shadow-2xl">
          MOVIE
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
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
                className="bg-white/95 backdrop-blur-sm rounded-xl p-5 shadow-xl"
              >
                <div className="aspect-[2/3] bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center">
                  <span className="text-gray-400 text-2xl font-bold">Coming Soon</span>
                </div>
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
