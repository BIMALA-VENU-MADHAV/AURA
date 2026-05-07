// src/components/MiniPlayer.jsx

import { motion } from "framer-motion"

import {
  Play,
  Pause,
  Heart,
  SkipBack,
  SkipForward,
  Repeat,
  Repeat1,
  Shuffle,
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
    currentTime,
    duration,
    nextSong,
    prevSong,
    seekSong,
    playMode,
    togglePlayMode,
  } = usePlayer()

  const favorite =
    currentSong &&
    isFavorite(currentSong)

  const progress =
    duration
      ? (currentTime / duration) * 100
      : 0

  // Hide if no song selected
  if (!currentSong) return null

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
      className="
        fixed bottom-20 md:bottom-0 left-0 right-0
        h-24
        bg-black/80
        backdrop-blur-2xl
        border-t border-white/5
        px-5 md:px-8
        flex flex-col justify-center
        z-40
      "
    >

      {/* Progress Bar */}
      <div
        className="
          absolute top-0 left-0
          w-full h-[5px]
          bg-white/10
          overflow-visible
        "
      >

        {/* Progress */}
        <motion.div
          animate={{
            width: `${progress}%`,
          }}
          transition={{
            ease: "easeOut",
            duration: 0.15,
          }}
          className="
            relative h-full
            bg-white rounded-full
          "
        >

          {/* Dot */}
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut",
            }}
            className="
              absolute right-0 top-1/2
              -translate-y-1/2
              w-4 h-4
              bg-white rounded-full
              shadow-[0_0_20px_rgba(255,255,255,0.95)]
            "
          />

        </motion.div>

        {/* Seek */}
        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={(e) =>
            seekSong(e.target.value)
          }
          className="
            absolute inset-0
            w-full h-full
            opacity-0
            cursor-pointer
          "
        />

      </div>

      {/* Content */}
      <div className="grid grid-cols-3 items-center">

        {/* Left */}
        <div
          onClick={() =>
            setIsPlayerOpen(true)
          }
          className="
            flex items-center gap-4
            min-w-0
            cursor-pointer
          "
        >

          {/* Album */}
          <img
            src={currentSong.image}
            alt={currentSong.title}
            className="
              w-14 h-14
              rounded-2xl
              object-cover
            "
          />

          {/* Info */}
          <div className="min-w-0">

            <h2 className="text-sm md:text-base font-medium truncate">
              {currentSong.title}
            </h2>

            <p className="text-zinc-500 text-xs md:text-sm truncate">
              {currentSong.artist}
            </p>

          </div>

        </div>

        {/* Center Controls */}
        <div className="flex items-center justify-center gap-5">

          {/* Favorite */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              toggleFavorite(currentSong)
            }}
            className="
              text-zinc-400
              hover:text-white
              transition
              cursor-pointer
            "
          >

            <Heart
              size={20}
              fill={
                favorite
                  ? "white"
                  : "transparent"
              }
            />

          </button>

          {/* Prev */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              prevSong()
            }}
            className="
              text-white
              cursor-pointer
            "
          >
            <SkipBack size={22} />
          </button>

          {/* Play */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              togglePlay()
            }}
            className="
              w-11 h-11 rounded-full
              bg-white text-black
              flex items-center justify-center
              cursor-pointer
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

          {/* Next */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              nextSong()
            }}
            className="
              text-white
              cursor-pointer
            "
          >
            <SkipForward size={22} />
          </button>

          {/* Repeat / Shuffle */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              togglePlayMode()
            }}
            className="
              text-white
              cursor-pointer
            "
          >

            {playMode === "repeat-one" ? (

              <Repeat1 size={20} />

            ) : playMode === "repeat-all" ? (

              <Repeat size={20} />

            ) : (

              <Shuffle size={20} />

            )}

          </button>

        </div>

      </div>

    </motion.div>
  )
}

export default MiniPlayer