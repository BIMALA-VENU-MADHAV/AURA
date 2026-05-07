// src/components/MiniPlayer.jsx

import {motion} from "framer-motion"

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

import {usePlayer} from "../context/PlayerContext"

function MiniPlayer(){

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
  }=usePlayer()

  const favorite=
    currentSong&&
    isFavorite(currentSong)

  const progress=
    duration
      ? (currentTime/duration)*100
      : 0

  if(!currentSong)return null

  return(
    <motion.div
    initial={{y:100}}
    animate={{y:0}}
    transition={{duration:0.3}}
    className="
    fixed bottom-20 md:bottom-0 left-0 right-0
    bg-black/85
    backdrop-blur-2xl
    border-t border-white/10
    z-40
    "
    >

      {/* Progress */}
      <div className="relative w-full h-[4px] bg-white/10 overflow-visible">

        <motion.div
        animate={{
          width:`${progress}%`,
        }}
        transition={{
          ease:"linear",
          duration:0.1,
        }}
        className="
        relative h-full
        bg-white
        rounded-full
        "
        >

          <div
          className="
          absolute right-0 top-1/2
          -translate-y-1/2
          w-3 h-3
          bg-white rounded-full
          shadow-[0_0_15px_rgba(255,255,255,0.9)]
          "
          />

        </motion.div>

        <input
        type="range"
        min="0"
        max={duration||0}
        value={currentTime}
        onChange={(e)=>
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

      {/* Mobile */}
      <div className="md:hidden px-4 py-3">

        {/* Song Info */}
        <div
        onClick={()=>
          setIsPlayerOpen(true)
        }
        className="
        flex items-center gap-3
        cursor-pointer
        "
        >

          <img
          src={currentSong.image}
          alt={currentSong.title}
          className="
          w-14 h-14
          rounded-2xl
          object-cover
          shrink-0
          "
          />

          <div className="flex-1 min-w-0">

            <h2 className="text-sm font-medium truncate">
              {currentSong.title}
            </h2>

            <p className="text-zinc-500 text-xs truncate">
              {currentSong.artist}
            </p>

          </div>

        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mt-4 px-2">

          {/* Favorite */}
          <button
          onClick={()=>
            toggleFavorite(currentSong)
          }
          className="text-zinc-400"
          >
            <Heart
            size={18}
            fill={
              favorite
              ? "white"
              : "transparent"
            }
            />
          </button>

          {/* Center */}
          <div className="flex items-center gap-6">

            {/* Prev */}
            <button
            onClick={prevSong}
            className="text-white"
            >
              <SkipBack size={20}/>
            </button>

            {/* Play */}
            <button
            onClick={togglePlay}
            className="
            w-12 h-12 rounded-full
            bg-white text-black
            flex items-center justify-center
            "
            >

              {isPlaying?(
                <Pause size={18}/>
              ):(
                <Play
                size={18}
                className="ml-0.5"
                />
              )}

            </button>

            {/* Next */}
            <button
            onClick={nextSong}
            className="text-white"
            >
              <SkipForward size={20}/>
            </button>

          </div>

          {/* Repeat / Shuffle */}
          <button
          onClick={togglePlayMode}
          className="text-white"
          >

            {playMode==="repeat-one"?(
              <Repeat1 size={18}/>
            ):playMode==="repeat-all"?(
              <Repeat size={18}/>
            ):(
              <Shuffle size={18}/>
            )}

          </button>

        </div>

      </div>

      {/* Desktop */}
      <div className="hidden md:grid grid-cols-3 items-center h-24 px-8">

        {/* Left */}
        <div
        onClick={()=>
          setIsPlayerOpen(true)
        }
        className="
        flex items-center gap-4
        min-w-0
        cursor-pointer
        "
        >

          <img
          src={currentSong.image}
          alt={currentSong.title}
          className="
          w-14 h-14
          rounded-2xl
          object-cover
          "
          />

          <div className="min-w-0">

            <h2 className="text-base font-medium truncate">
              {currentSong.title}
            </h2>

            <p className="text-zinc-500 text-sm truncate">
              {currentSong.artist}
            </p>

          </div>

        </div>

        {/* Center */}
        <div className="flex items-center justify-center gap-5">

          <button
          onClick={()=>
            toggleFavorite(currentSong)
          }
          className="text-zinc-400"
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

          <button
          onClick={prevSong}
          className="text-white"
          >
            <SkipBack size={22}/>
          </button>

          <button
          onClick={togglePlay}
          className="
          w-11 h-11 rounded-full
          bg-white text-black
          flex items-center justify-center
          "
          >

            {isPlaying?(
              <Pause size={18}/>
            ):(
              <Play
              size={18}
              className="ml-0.5"
              />
            )}

          </button>

          <button
          onClick={nextSong}
          className="text-white"
          >
            <SkipForward size={22}/>
          </button>

          <button
          onClick={togglePlayMode}
          className="text-white"
          >

            {playMode==="repeat-one"?(
              <Repeat1 size={20}/>
            ):playMode==="repeat-all"?(
              <Repeat size={20}/>
            ):(
              <Shuffle size={20}/>
            )}

          </button>

        </div>

      </div>

    </motion.div>
  )

}

export default MiniPlayer