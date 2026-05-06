// src/pages/Home.jsx

import songs from "../data/songs"

import playlists from "../data/playlists"

import {
  usePlayer,
} from "../context/PlayerContext"

import HeroBanner from "../components/home/HeroBanner"

import HorizontalSongs from "../components/home/HorizontalSongs"

import PlaylistCard from "../components/home/PlaylistCard"

import CategoryCard from "../components/home/CategoryCard"

import SectionTitle from "../components/home/SectionTitle"

function Home() {

  const { recentSongs } =
    usePlayer()

  return (
    <div className="flex-1 p-4 md:p-10 pb-32 overflow-y-auto mt-20 md:mt-0">

      {/* Hero */}
      <HeroBanner />

      {/* Recently Played */}
      <SectionTitle title="Recently Played" />

      <HorizontalSongs
        songs={
          recentSongs.length > 0
            ? recentSongs
            : songs
        }
      />

      {/* Top Charts */}
      <div className="mt-14">

        <SectionTitle title="Top Charts" />

        <HorizontalSongs songs={songs} />

      </div>

      {/* Categories */}
      <div className="mt-14">

        <SectionTitle title="Browse Categories" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          <CategoryCard
            title="Hip Hop"
            color="linear-gradient(135deg,#9333ea,#ec4899)"
          />

          <CategoryCard
            title="Chill"
            color="linear-gradient(135deg,#06b6d4,#3b82f6)"
          />

          <CategoryCard
            title="Rock"
            color="linear-gradient(135deg,#f97316,#ef4444)"
          />

          <CategoryCard
            title="Jazz"
            color="linear-gradient(135deg,#14b8a6,#22c55e)"
          />

        </div>

      </div>

      {/* Playlists */}
      <div className="mt-14">

        <SectionTitle title="Recommended Playlists" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {playlists.map((playlist) => (

            <PlaylistCard
              key={playlist.id}
              playlist={playlist}
            />

          ))}

        </div>

      </div>

    </div>
  )
}

export default Home