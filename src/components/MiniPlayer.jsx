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

  if (!currentSong) return null

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4 }}
      onClick={() =>
        setIsPlayerOpen(true)
      }
      className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[95%] max-w-5xl h-20 md:h-24 rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/10 px-4 md:px-6 flex items-center justify-between z-40 shadow-2xl cursor-pointer"
    >

      {/* Left */}
      <div className="flex items-center gap-4">

        <motion.img
          animate={{
            rotate: isPlaying
              ? 360
              : 0,
          }}
          transition={{
            repeat: Infinity,
            duration: 12,
            ease: "linear",
          }}
          src={currentSong.image}
          alt={currentSong.title}
          className="w-12 h-12 md:w-16 md:h-16 rounded-2xl object-cover"
        />

        <div>

          <h2 className="font-semibold text-sm md:text-lg">
            {currentSong.title}
          </h2>

          <p className="text-zinc-300 text-xs md:text-base">
            {currentSong.artist}
          </p>

        </div>

      </div>

      {/* Right */}
      <div className="flex items-center gap-3 md:gap-5">

        {/* Favorite */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            toggleFavorite(currentSong)
          }}
          className="text-white"
        >

          <Heart
            fill={
              isFavorite(currentSong)
                ? "white"
                : "transparent"
            }
          />

        </button>

        {/* Play */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            togglePlay()
          }}
          className="bg-white text-black w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center"
        >

          {isPlaying ? (
            <Pause />
          ) : (
            <Play className="ml-1" />
          )}

        </button>

      </div>

    </motion.div>
  )
}

export default MiniPlayer