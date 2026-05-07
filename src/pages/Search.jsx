import {useState} from "react"
import {Link} from "react-router-dom"

import SongCard from "../components/SongCard"

import songs from "../data/songs"

function Search(){

  const [query,setQuery]=useState("")

  const filteredSongs=songs.filter((song)=>
    song.title
      .toLowerCase()
      .includes(query.toLowerCase())||

    song.artist
      .toLowerCase()
      .includes(query.toLowerCase())
  )

  return(
    <div className="flex-1 min-h-screen overflow-y-auto bg-black px-5 md:px-10 pt-10 md:pt-14 pb-56 md:pb-32">

      {/* Top */}
      <div className="flex items-start justify-between mb-10">

        <div>

          <p className="text-zinc-500 text-sm uppercase tracking-[5px] mb-3">
            Discover
          </p>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            Search
          </h1>

        </div>

        <Link
        to="/profile"
        className="
        w-12 h-12 rounded-full
        overflow-hidden
        bg-white/10
        flex items-center justify-center
        text-lg font-semibold
        shrink-0
        cursor-pointer
        "
        >
          P
        </Link>

      </div>

      {/* Search */}
      <input
      id="search"
      name="search"
      type="text"
      placeholder="Search songs or artists..."
      value={query}
      onChange={(e)=>
        setQuery(e.target.value)
      }
      className="
      w-full
      bg-white/5
      border border-white/10
      rounded-2xl
      px-5 py-4
      text-white
      outline-none
      mb-10
      placeholder:text-zinc-500
      focus:border-white/20
      "
      />

      {/* Results */}
      {filteredSongs.length===0?(

        <div className="h-[40vh] flex items-center justify-center text-zinc-500 text-lg">
          No songs found.
        </div>

      ):(

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-8">

          {filteredSongs.map((song,index)=>(

            <SongCard
            key={song.id}
            song={song}
            songs={filteredSongs}
            index={index}
            />

          ))}

        </div>

      )}

    </div>
  )

}

export default Search