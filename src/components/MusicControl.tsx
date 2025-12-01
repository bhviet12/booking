import { useRef, useEffect, useState } from 'react'

interface MusicControlProps {
  autoPlay?: boolean
}

export default function MusicControl({ autoPlay = true }: MusicControlProps) {
  const [isPlaying, setIsPlaying] = useState(true)
  const [showPlayPrompt, setShowPlayPrompt] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const tryAutoPlay = async () => {
      if (autoPlay && audioRef.current) {
        try {
          await audioRef.current.play()
          setIsPlaying(true)
          setShowPlayPrompt(false)
        } catch (error) {
          console.log("Auto-play prevented by browser:", error)
          setIsPlaying(false)
          setShowPlayPrompt(true)
        }
      }
    }

    // Try to play after a short delay
    const timer = setTimeout(tryAutoPlay, 100)
    return () => clearTimeout(timer)
  }, [autoPlay])

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        audioRef.current.play().then(() => {
          setIsPlaying(true)
          setShowPlayPrompt(false)
        }).catch((error) => {
          console.log("Play failed:", error)
        })
      }
    }
  }

  return (
    <>
      <button
        onClick={toggleMusic}
        className={`absolute top-6 right-6 z-20 px-6 py-3 rounded-full font-semibold shadow-lg transition-all duration-300 hover:scale-105 ${
          isPlaying
            ? 'bg-white/90 hover:bg-white text-red-600'
            : 'bg-red-600 hover:bg-red-700 text-white animate-pulse'
        }`}
      >
        {isPlaying ? '⏸ Tạm dừng nhạc' : '▶ Phát nhạc'}
      </button>

      {showPlayPrompt && !isPlaying && (
        <div className="absolute top-24 right-6 z-20 bg-white/95 text-gray-800 px-4 py-2 rounded-lg shadow-lg text-sm animate-bounce">
          👆 Click để phát nhạc
        </div>
      )}

      <audio ref={audioRef} loop>
        <source src="/All I Want For Christmas Is You.mp3" type="audio/mpeg" />
      </audio>
    </>
  )
}
