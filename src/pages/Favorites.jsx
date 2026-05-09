import {useEffect,useState} from "react"
import {Link} from "react-router-dom"

import SongCard from "../components/SongCard"

import {usePlayer} from "../context/PlayerContext"

import supabase from "../lib/supabase"

function Favorites(){

  const {
    favorites,
    currentSong,
    isPlaying,
  }=usePlayer()

  const [profile,setProfile]=
    useState(null)

  useEffect(()=>{
    getProfile()
  },[])

  
  const getProfile=async()=>{

    const {
      data:{user},
    }=await supabase.auth.getUser()

    if(!user)return

    const {data}=
      await supabase
        .from("profiles")
        .select("*")
        .eq("id",user.id)
        .single()

    setProfile(data)

  }

  const formattedSongs=
    favorites.map((song)=>({
      id:song.song_id,
      title:song.title,
      artist:song.artist,
      image:song.image,
      audio:song.audio,
    }))

  return(
    <div className="flex-1 min-h-screen overflow-y-auto bg-black px-5 md:px-10 pt-10 md:pt-14 pb-56 md:pb-32">

      {/* Header */}
      <div className="flex items-start justify-between mb-12">

        <div>

          <p className="text-zinc-500 text-sm uppercase tracking-[5px] mb-3">
            Your Collection
          </p>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            Favorites
          </h1>

        </div>

        {/* Profile */}
        {profile&&(

          <Link
          to="/profile"
          className="cursor-pointer"
          >

            {profile.avatar_url?(

              <img
              src={profile.avatar_url}
              alt="profile"
              className="
              w-14 h-14
              rounded-full
              object-cover
              border border-white/10
              "
              />

            ):(

              <div
              className="
              w-14 h-14
              rounded-full
              bg-white/10
              flex items-center justify-center
              text-lg font-semibold
              "
              >
                {profile?.name?.[0]}
              </div>

            )}

          </Link>

        )}

      </div>

      {/* Empty */}
      {formattedSongs.length===0?(

        <div className="h-[50vh] flex items-center justify-center text-zinc-500 text-xl">
          No favorite songs yet.
        </div>

      ):(

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-8">

          {formattedSongs.map((song,index)=>(

            <SongCard
            key={`${song.id}-${index}`}
            song={song}
            songs={formattedSongs}
            index={index}
            isActive={
              currentSong?.id===
              song.id&&
              isPlaying
            }
            />

          ))}

        </div>

      )}

    </div>
  )

}

export default Favorites