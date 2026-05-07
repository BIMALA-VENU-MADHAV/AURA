import { motion } from "framer-motion"

import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  ChevronDown,
  Heart,
  Repeat,
  Repeat1,
  Shuffle,
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
      className="
        fixed inset-0 z-50 overflow-hidden
        bg-gradient-to-br
        from-purple-900
        via-black
        to-pink-900
      "
    >

      {/* Blurred Background */}
      <div
        className="
          absolute inset-0
          bg-cover bg-center
          scale-110 blur-3xl
          opacity-30
        "
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

        {/* Top */}
        <div className="flex items-center justify-between">

          <button
            onClick={() =>
              setIsPlayerOpen(false)
            }
            className="text-white cursor-pointer"
          >
            <ChevronDown size={34} />
          </button>

          <p className="text-zinc-300 text-sm tracking-widest uppercase">
            Now Playing
          </p>

          <div className="w-[34px]" />

        </div>

        {/* Main */}
        <div className="flex-1 flex flex-col items-center justify-center">

          {/* Album */}
          <motion.img
            initial={{
              scale: 0.9,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            transition={{
              duration: 0.4,
            }}
            src={currentSong.image}
            alt={currentSong.title}
            className="
              w-80 h-80
              rounded-[40px]
              object-cover
              shadow-2xl
            "
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

            <div
              className="
                relative w-full h-[7px]
                bg-white/10
                rounded-full
                overflow-visible
              "
            >

              {/* Progress Fill */}
              <motion.div
                animate={{
                  width: `${progress}%`,
                }}
                transition={{
                  ease: "easeOut",
                  duration: 0.15,
                }}
                className="
                  absolute left-0 top-0
                  h-full
                  bg-white
                  rounded-full
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
                    w-5 h-5
                    bg-white
                    rounded-full
                    shadow-[0_0_25px_rgba(255,255,255,0.95)]
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

            {/* Time */}
            <div className="flex justify-between text-sm text-zinc-400 mt-4">

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

            {/* Favorite */}
            <button
              onClick={() =>
                toggleFavorite(currentSong)
              }
              className="
                text-white
                cursor-pointer
              "
            >

              <Heart
                size={30}
                fill={
                  favorite
                    ? "white"
                    : "transparent"
                }
              />

            </button>

            {/* Prev */}
            <button
              onClick={prevSong}
              className="
                text-white
                cursor-pointer
              "
            >
              <SkipBack size={38} />
            </button>

            {/* Play */}
            <button
              onClick={togglePlay}
              className="
                bg-white text-black
                w-20 h-20 rounded-full
                flex items-center justify-center
                shadow-2xl
                cursor-pointer
              "
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

            {/* Next */}
            <button
              onClick={nextSong}
              className="
                text-white
                cursor-pointer
              "
            >
              <SkipForward size={38} />
            </button>

            {/* Repeat / Shuffle */}
            <button
              onClick={togglePlayMode}
              className="
                text-white
                cursor-pointer
              "
            >

              {playMode === "repeat-one" ? (

                <Repeat1 size={28} />

              ) : playMode === "repeat-all" ? (

                <Repeat size={28} />

              ) : (

                <Shuffle size={28} />

              )}

            </button>

          </div>

        </div>

      </div>

    </motion.div>
  )
}

export default FullPlayer