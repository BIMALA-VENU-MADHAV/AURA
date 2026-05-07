// src/pages/Favorites.jsx

import SongCard from "../components/SongCard"

import { usePlayer } from "../context/PlayerContext"

function Favorites() {

  const { favorites } = usePlayer()

  // Convert DB favorites to normal songs
  const formattedSongs =
    favorites.map((song) => ({
      id: song.song_id,
      title: song.title,
      artist: song.artist,
      image: song.image,
      audio: song.audio,
    }))

  return (
    <div className="flex-1 min-h-screen overflow-y-auto bg-black px-5 md:px-10 pt-10 md:pt-14 pb-32">

      {/* Header */}
      <div className="mb-12">

        <p className="text-zinc-500 text-sm uppercase tracking-[5px] mb-3">
          Your Collection
        </p>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
          Favorites
        </h1>

      </div>

      {/* Empty */}
      {formattedSongs.length === 0 ? (

        <div className="h-[50vh] flex items-center justify-center text-zinc-500 text-xl">
          No favorite songs yet.
        </div>

      ) : (

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-8">

          {formattedSongs.map((song, index) => (

            <SongCard
              key={song.id}
              song={song}
              songs={formattedSongs}
              index={index}
            />

          ))}

        </div>

      )}

    </div>
  )
}

export default Favorites