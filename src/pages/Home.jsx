// src/pages/Home.jsx

import songs from "../data/songs"

import SongCard from "../components/SongCard"

function Home() {

  return (
    <div className="flex-1 min-h-screen overflow-y-auto bg-black px-5 md:px-10 pt-10 md:pt-14 pb-32">

      {/* Top */}
      <div className="mb-12">

        <p className="text-zinc-500 text-sm uppercase tracking-[5px] mb-3">
          Welcome To
        </p>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
          Aura
        </h1>

      </div>

      {/* Songs */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-8">

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

export default Home;