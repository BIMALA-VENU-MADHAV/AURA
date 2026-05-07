// src/components/SongCard.jsx

import { motion } from "framer-motion"

import {
  Play,
  Pause,
  Heart,
} from "lucide-react"

import { usePlayer } from "../context/PlayerContext"

function SongCard({
  song,
  songs,
  index,
}) {

  const {
    currentSong,
    isPlaying,
    playSong,
    togglePlay,
    toggleFavorite,
    isFavorite,
    setIsPlayerOpen,
  } = usePlayer()

  const active =
    currentSong?.id === song.id

  const playing =
    active && isPlaying

  return (
    <motion.div
      whileHover={{
        y: -6,
      }}
      transition={{
        duration: 0.2,
      }}
      onClick={() => {

        // Open Full Player ONLY
        if (active) {

          setIsPlayerOpen(true)

        }

      }}
      className="
        relative
        bg-white/[0.03]
        border border-white/[0.05]
        rounded-[28px]
        overflow-hidden
        group
        cursor-pointer
      "
    >

      {/* Image */}
      <div className="relative aspect-square overflow-hidden">

        <img
          src={song.image}
          alt={song.title}
          className="
            w-full h-full
            object-cover
          "
        />

        {/* Overlay */}
        <div
          className="
            absolute inset-0
            bg-black/40
            opacity-0
            group-hover:opacity-100
            transition
            flex items-center justify-center
          "
        >

          {/* Play Pause */}
          <button
            onClick={(e) => {

              e.stopPropagation()

              if (active) {

                togglePlay()

              } else {

                playSong(
                  song,
                  index,
                  songs
                )

              }

            }}
            className="
              w-16 h-16
              rounded-full
              bg-white text-black
              flex items-center justify-center
              scale-90
              group-hover:scale-100
              transition
              cursor-pointer
            "
          >

            {playing ? (

              <Pause size={28} />

            ) : (

              <Play
                size={28}
                className="ml-1"
              />

            )}

          </button>

        </div>

      </div>

      {/* Content */}
      <div className="p-5">

        <div className="flex items-start justify-between gap-3">

          <div
            onClick={() => {

              if (!active) {

                playSong(
                  song,
                  index,
                  songs
                )

              }

              setIsPlayerOpen(true)

            }}
            className="min-w-0"
          >

            <h2 className="text-lg font-semibold truncate">
              {song.title}
            </h2>

            <p className="text-zinc-500 text-sm truncate mt-1">
              {song.artist}
            </p>

          </div>

          {/* Favorite */}
          <button
            onClick={(e) => {

              e.stopPropagation()

              toggleFavorite(song)

            }}
            className="
              text-zinc-500
              hover:text-white
              transition
              shrink-0
              cursor-pointer
            "
          >

            <Heart
              size={20}
              fill={
                isFavorite(song)
                  ? "white"
                  : "transparent"
              }
            />

          </button>

        </div>

      </div>

    </motion.div>
  )
}

export default SongCard