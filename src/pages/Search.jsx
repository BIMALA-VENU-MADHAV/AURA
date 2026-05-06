import { useState } from "react"

import SongCard from "../components/SongCard"

import songs from "../data/songs"

function Search() {

  const [query, setQuery] = useState("")

  const filteredSongs = songs.filter((song) =>
    song.title
      .toLowerCase()
      .includes(query.toLowerCase()) ||

    song.artist
      .toLowerCase()
      .includes(query.toLowerCase())
  )

  return (
    <div className="flex-1 p-10 pb-32 overflow-y-auto">

      {/* Header */}
      <h1 className="text-4xl font-bold mb-8">
        Search
      </h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search songs or artists..."
        value={query}
        onChange={(e) =>
          setQuery(e.target.value)
        }
        className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-4 text-white outline-none mb-10"
      />

      {/* Results */}
      <div className="grid grid-cols-4 gap-6">

        {filteredSongs.map(
          (song, index) => (
            <SongCard
              key={song.id}
              song={song}
              songs={filteredSongs}
              index={index}
            />
          )
        )}

      </div>

    </div>
  )
}

export default Search