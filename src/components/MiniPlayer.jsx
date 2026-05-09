import { motion } from "framer-motion"
import { Play, Pause, Heart, SkipBack, SkipForward, Repeat, Repeat1, Shuffle } from "lucide-react"
import { usePlayer } from "../context/PlayerContext"

function fmt(s) {
  const t = Math.floor(s) || 0
  return `${Math.floor(t / 60)}:${String(t % 60).padStart(2, "0")}`
}

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

  const fav = currentSong && isFavorite(currentSong)
  const progress = duration ? (currentTime / duration) * 100 : 0
  const modeActive = playMode !== "shuffle"

  if (!currentSong) return null

  const PlayModeBtn = ({ size }) => (
    <button onClick={togglePlayMode} className={`transition-all duration-200 ${modeActive ? "text-white" : "text-zinc-500 hover:text-white"}`}>
      {playMode === "repeat-one" ? <Repeat1 size={size} /> : playMode === "repeat-all" ? <Repeat size={size} /> : <Shuffle size={size} />}
    </button>
  )

  const FavBtn = ({ size }) => (
    <button onClick={() => toggleFavorite(currentSong)} className={`transition-all duration-200 ${fav ? "text-white" : "text-zinc-500 hover:text-white"}`}>
      <Heart size={size} fill={fav ? "white" : "transparent"} stroke={fav ? "white" : "currentColor"} />
    </button>
  )

  return (
    <motion.div initial={{ y: 100 }} animate={{ y: 0 }} transition={{ type: "spring", stiffness: 300, damping: 30 }} className="fixed bottom-[72px] md:bottom-0 left-0 right-0 bg-black/85 backdrop-blur-2xl border-t border-white/10 z-40">

      <div className="relative w-full h-[3px] bg-white/10">
        <div className="absolute left-0 top-0 h-full bg-white rounded-full pointer-events-none" style={{ width: `${progress}%` }} />
        <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)] pointer-events-none" style={{ left: `calc(${progress}% - 6px)` }} />
        <input type="range" min={0} max={duration || 0} step={0.1} value={currentTime} onChange={(e) => seekSong(Number(e.target.value))} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
      </div>

      <div className="md:hidden px-3 py-3">

        <div className="flex justify-between text-[10px] text-zinc-400 mb-2 px-1 tabular-nums">
          <span>{fmt(currentTime)}</span>
          <span>{fmt(duration)}</span>
        </div>

        <div className="flex items-center gap-3">
          <img src={currentSong.image} alt={currentSong.title} onClick={() => setIsPlayerOpen(true)} className="w-12 h-12 rounded-xl object-cover shrink-0 cursor-pointer" />

          <div onClick={() => setIsPlayerOpen(true)} className="flex-1 min-w-0 overflow-hidden cursor-pointer">
            <h2 className="text-sm font-semibold truncate text-white">{currentSong.title}</h2>
            <p className="text-zinc-400 text-xs truncate mt-0.5">{currentSong.artist}</p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-5 mt-4">

          <FavBtn size={18} />

          <button onClick={prevSong} className="text-white/90 active:scale-90 transition">
            <SkipBack size={20} fill="white" />
          </button>

          <button onClick={togglePlay} className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center active:scale-95 transition shadow-lg">
            {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
          </button>

          <button onClick={nextSong} className="text-white/90 active:scale-90 transition">
            <SkipForward size={20} fill="white" />
          </button>

          <PlayModeBtn size={18} />

        </div>

      </div>

      <div className="hidden md:grid grid-cols-3 items-center h-22 px-8 py-3">

        <div onClick={() => setIsPlayerOpen(true)} className="flex items-center gap-4 min-w-0 cursor-pointer group">
          <img src={currentSong.image} alt={currentSong.title} className="w-12 h-12 rounded-xl object-cover shrink-0 group-hover:opacity-80 transition-opacity" />

          <div className="min-w-0">
            <h2 className="text-sm font-medium truncate">{currentSong.title}</h2>
            <p className="text-zinc-500 text-xs truncate mt-0.5">{currentSong.artist}</p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-5">

          <FavBtn size={20} />

          <button onClick={prevSong} className="text-white">
            <SkipBack size={22} fill="white" />
          </button>

          <button onClick={togglePlay} className="w-11 h-11 rounded-full bg-white text-black flex items-center justify-center">
            {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
          </button>

          <button onClick={nextSong} className="text-white">
            <SkipForward size={22} fill="white" />
          </button>

          <PlayModeBtn size={20} />

        </div>

        <div className="flex items-center justify-end gap-2">
          <span className="text-zinc-500 text-xs tabular-nums">{fmt(currentTime)}</span>
          <span className="text-zinc-600 text-xs">/</span>
          <span className="text-zinc-500 text-xs tabular-nums">{fmt(duration)}</span>
        </div>

      </div>

    </motion.div>
  )
}

export default MiniPlayer