import { motion } from "framer-motion"
import { Play, Pause, Heart } from "lucide-react"
import { usePlayer } from "../context/PlayerContext"

function SongCard({ song, songs, index }) {

  const {
    currentSong,
    isPlaying,
    playSong,
    togglePlay,
    toggleFavorite,
    isFavorite,
    setIsPlayerOpen,
  } = usePlayer()

  const active=String(currentSong?.id)===String(song.id)
  const playing = active && isPlaying
  const fav = isFavorite(song)

  function handleCardClick() {
    if (active) {
      setIsPlayerOpen(true)
    } else {
      playSong(song, index, songs)
      setIsPlayerOpen(true)
    }
  }

  function handlePlayPause(e) {
    e.stopPropagation()
    if (active) {
      togglePlay()
    } else {
      playSong(song, index, songs)
    }
  }

  function handleFavorite(e) {
    e.stopPropagation()
    toggleFavorite(song)
  }

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2 }}
      onClick={handleCardClick}
      className={`relative rounded-[24px] overflow-visible group cursor-pointer transition-all duration-300 border ${active ? "bg-white/[0.07] border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.05)]" : "bg-white/[0.03] border-white/[0.05] hover:border-white/20"}`}
    >

      {active && playing && (
        <svg
          className="absolute -inset-[2px] w-[calc(100%+4px)] h-[calc(100%+4px)] pointer-events-none z-30"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <motion.rect
            x="1.5"
            y="1.5"
            width="97"
            height="97"
            rx="4"
            ry="4"
            fill="none"
            stroke="white"
            strokeWidth="1.8"
            strokeLinecap="round"
            pathLength="100"
            strokeDasharray="12 88"
            filter="drop-shadow(0 0 8px white)"
            animate={{
              strokeDashoffset: [0, -100]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </svg>
      )}

      <div className="relative rounded-[24px] overflow-hidden z-10">

        <div className="relative aspect-square overflow-hidden">

          <img
            src={song.image}
            alt={song.title}
            className={`w-full h-full object-cover transition-all duration-500 ${playing ? "scale-105 brightness-75" : "scale-100 group-hover:scale-105"}`}
          />

          <div className={`absolute inset-0 bg-black/35 flex items-center justify-center transition-opacity duration-300 ${active ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>

            <button
              onClick={handlePlayPause}
              className="w-15 h-15 rounded-full bg-white text-black flex items-center justify-center scale-90 group-hover:scale-100 transition-all duration-200 shadow-2xl active:scale-95"
            >
              {playing ? <Pause size={28} /> : <Play size={28} className="ml-1" />}
            </button>

          </div>

        </div>

        <div className="p-4 sm:p-5">

          <div className="flex items-start justify-between gap-3">

            <div className="min-w-0 flex-1">

              <h2 className={`text-base sm:text-lg font-semibold truncate transition-colors ${active ? "text-white" : "text-white/90"}`}>
                {song.title}
              </h2>

              <p className="text-zinc-500 text-xs sm:text-sm truncate mt-1">
                {song.artist}
              </p>

            </div>

            <button
              onClick={handleFavorite}
              className={`transition-all duration-200 shrink-0 cursor-pointer active:scale-90 ${fav ? "text-white" : "text-zinc-500 hover:text-white"}`}
            >
              <Heart
                size={20}
                fill={fav ? "white" : "transparent"}
                stroke={fav ? "white" : "currentColor"}
              />
            </button>

          </div>

        </div>

      </div>

    </motion.div>
  )
}

export default SongCard