// src/pages/Favorites.jsx

import SongCard from "../components/SongCard"

import { usePlayer } from "../context/PlayerContext"

function Favorites() {

  const { favorites } = usePlayer()

  return (
    <div className="flex-1 p-10 pb-32 overflow-y-auto">

      <h1 className="text-4xl font-bold mb-10">
        Favorite Songs
      </h1>

      {favorites.length === 0 ? (

        <div className="h-[60vh] flex items-center justify-center text-zinc-500 text-xl">
          No favorite songs yet.
        </div>

      ) : (

        <div className="grid grid-cols-4 gap-6">

          {favorites.map((song, index) => (
            <SongCard
              key={song.id}
              song={song}
              songs={favorites}
              index={index}
            />
          ))}

        </div>

      )}

    </div>
  )
}

export default Favorites