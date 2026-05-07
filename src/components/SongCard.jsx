// src/components/SongCard.jsx

import { Play } from "lucide-react"

import { usePlayer } from "../context/PlayerContext"

function SongCard({
  song,
  songs,
  index,
}) {

  const { playSong } =
    usePlayer()

  return (
    <div
      onClick={() =>
        playSong(song, index, songs)
      }
      className="group cursor-pointer"
    >

      {/* Image */}
      <div className="relative overflow-hidden rounded-2xl">

        <img
          src={song.image}
          alt={song.title}
          className="
            w-full aspect-square object-cover
            transition duration-500
            group-hover:scale-105
          "
        />

        {/* Overlay */}
        <div
          className="
            absolute inset-0
            bg-black/10
            opacity-0 group-hover:opacity-100
            transition duration-300
          "
        />

        {/* Play Button */}
        <button
          className="
            absolute bottom-4 right-4
            w-11 h-11
            rounded-full
            bg-white text-black
            flex items-center justify-center
            opacity-0 group-hover:opacity-100
            translate-y-3 group-hover:translate-y-0
            transition duration-300
          "
        >

          <Play
            size={18}
            className="ml-0.5"
          />

        </button>

      </div>

      {/* Info */}
      <div className="mt-4 px-1">

        <h2 className="text-sm md:text-base font-medium truncate">
          {song.title}
        </h2>

        <p className="text-zinc-500 text-sm truncate mt-1">
          {song.artist}
        </p>

      </div>

    </div>
  )
}

export default SongCard;