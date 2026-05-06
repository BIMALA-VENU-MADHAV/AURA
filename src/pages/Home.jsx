// src/pages/Home.jsx

import SongCard from "../components/SongCard"
import songs from "../data/songs"

function Home() {

  return (
    <div className="flex-1 p-10 pb-32 overflow-y-auto">

      <h1 className="text-4xl font-bold mb-10">
        Trending Music
      </h1>

      <div className="grid grid-cols-4 gap-6">

        {songs.map((song, index) => (
          <SongCard
            key={song.id}
            song={song}
            songs={songs}
            index={index}
          />
        ))}

      </div>

    </div>
  )
}

export default Home