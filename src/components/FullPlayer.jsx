// src/components/FullPlayer.jsx

import { motion } from "framer-motion"

import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  ChevronDown,
  Heart,
} from "lucide-react"

import { usePlayer } from "../context/PlayerContext"

function FullPlayer() {

  const {
    currentSong,
    isPlaying,
    togglePlay,
    currentTime,
    duration,
    seekSong,
    nextSong,
    prevSong,
    isPlayerOpen,
    setIsPlayerOpen,
    toggleFavorite,
    isFavorite,
  } = usePlayer()

  if (!isPlayerOpen || !currentSong)
    return null

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 100,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.4,
      }}
      className="fixed inset-0 z-50 overflow-hidden bg-gradient-to-br from-purple-900 via-black to-pink-900"
    >

      {/* Blurred Background */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-110 blur-3xl opacity-30"
        style={{
          backgroundImage: `url(${currentSong.image})`,
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-3xl" />

      {/* Glow */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(circle at top left, #a855f7, transparent 30%),
            radial-gradient(circle at bottom right, #ec4899, transparent 30%)
          `,
        }}
      />

      {/* Content */}
      <div className="relative h-full flex flex-col px-8 py-6">

        {/* Top Bar */}
        <div className="flex items-center justify-between">

          <button
            onClick={() =>
              setIsPlayerOpen(false)
            }
            className="text-white"
          >
            <ChevronDown size={34} />
          </button>

          <p className="text-zinc-300 text-sm tracking-widest uppercase">
            Now Playing
          </p>

          <button
            onClick={() =>
              toggleFavorite(currentSong)
            }
          >

            <Heart
              className="text-white"
              fill={
                isFavorite(currentSong)
                  ? "white"
                  : "transparent"
              }
            />

          </button>

        </div>

        {/* Main */}
        <div className="flex-1 flex flex-col items-center justify-center">

          {/* Album */}
          <motion.img
            animate={{
              rotate: isPlaying
                ? 360
                : 0,
            }}
            transition={{
              repeat: Infinity,
              duration: 18,
              ease: "linear",
            }}
            src={currentSong.image}
            alt={currentSong.title}
            className="w-80 h-80 rounded-[40px] object-cover shadow-2xl"
          />

          {/* Info */}
          <div className="mt-10 text-center">

            <h1 className="text-4xl font-bold">
              {currentSong.title}
            </h1>

            <p className="text-zinc-300 text-xl mt-3">
              {currentSong.artist}
            </p>

          </div>

          {/* Progress */}
          <div className="w-full max-w-xl mt-10">

            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={(e) =>
                seekSong(e.target.value)
              }
              className="w-full accent-white"
            />

            <div className="flex justify-between text-sm text-zinc-400 mt-2">

              <span>
                {Math.floor(currentTime / 60)}:
                {String(
                  Math.floor(
                    currentTime % 60
                  )
                ).padStart(2, "0")}
              </span>

              <span>
                {Math.floor(duration / 60)}:
                {String(
                  Math.floor(
                    duration % 60
                  )
                ).padStart(2, "0")}
              </span>

            </div>

          </div>

          {/* Controls */}
          <div className="flex items-center gap-10 mt-12">

            <button
              onClick={prevSong}
              className="text-white"
            >
              <SkipBack size={38} />
            </button>

            <button
              onClick={togglePlay}
              className="bg-white text-black w-20 h-20 rounded-full flex items-center justify-center shadow-2xl"
            >

              {isPlaying ? (
                <Pause size={34} />
              ) : (
                <Play
                  size={34}
                  className="ml-1"
                />
              )}

            </button>

            <button
              onClick={nextSong}
              className="text-white"
            >
              <SkipForward size={38} />
            </button>

          </div>

        </div>

      </div>

    </motion.div>
  )
}

export default FullPlayer