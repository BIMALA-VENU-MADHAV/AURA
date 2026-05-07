// src/components/MiniPlayer.jsx

import { motion } from "framer-motion"

import {
  Play,
  Pause,
  Heart,
} from "lucide-react"

import { usePlayer } from "../context/PlayerContext"

function MiniPlayer() {

  const {
    currentSong,
    isPlaying,
    togglePlay,
    setIsPlayerOpen,
    toggleFavorite,
    isFavorite,
  } = usePlayer()

  // Hide if no song selected
  if (!currentSong) return null

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={() =>
        setIsPlayerOpen(true)
      }
      className="
        fixed bottom-20 md:bottom-0 left-0 right-0
        h-20
        bg-black/80
        backdrop-blur-xl
        border-t border-white/5
        px-5 md:px-8
        flex items-center justify-between
        z-40
        cursor-pointer
      "
    >

      {/* Left */}
      <div className="flex items-center gap-4 min-w-0">

        {/* Album */}
        <img
          src={currentSong.image}
          alt={currentSong.title}
          className="w-12 h-12 rounded-xl object-cover"
        />

        {/* Song Info */}
        <div className="min-w-0">

          <h2 className="text-sm md:text-base font-medium truncate">
            {currentSong.title}
          </h2>

          <p className="text-zinc-500 text-xs md:text-sm truncate">
            {currentSong.artist}
          </p>

        </div>

      </div>

      {/* Right */}
      <div className="flex items-center gap-5">

        {/* Favorite */}
        <button
          onClick={(e) => {
            e.stopPropagation()

            toggleFavorite(currentSong)
          }}
          className="text-zinc-400 hover:text-white transition"
        >

          <Heart
            size={20}
            fill={
              isFavorite(currentSong)
                ? "white"
                : "transparent"
            }
          />

        </button>

        {/* Play Pause */}
        <button
          onClick={(e) => {
            e.stopPropagation()

            togglePlay()
          }}
          className="
            w-10 h-10 rounded-full
            bg-white text-black
            flex items-center justify-center
          "
        >

          {isPlaying ? (
            <Pause size={18} />
          ) : (
            <Play
              size={18}
              className="ml-0.5"
            />
          )}

        </button>

      </div>

    </motion.div>
  )
}

export default MiniPlayer;