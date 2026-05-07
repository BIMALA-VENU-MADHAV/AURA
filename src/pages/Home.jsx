import {useEffect,useState} from "react"
import {Link} from "react-router-dom"

import supabase from "../lib/supabase"

import songs from "../data/songs"

import SongCard from "../components/SongCard"

function Home(){

  const [profile,setProfile]=
    useState(null)

  const [loggedIn,setLoggedIn]=
    useState(false)

  useEffect(()=>{
    getProfile()
  },[])

  const getProfile=async()=>{

    const {
      data:{user},
    }=await supabase.auth.getUser()

    if(!user){

      setLoggedIn(false)
      return

    }

    setLoggedIn(true)

    const {data}=
      await supabase
        .from("profiles")
        .select("*")
        .eq("id",user.id)
        .single()

    setProfile(data)

  }

  return(
    <div className="flex-1 min-h-screen overflow-y-auto bg-black px-5 md:px-10 pt-10 md:pt-14 pb-56 md:pb-32">

      {/* Top */}
      <div className="flex items-start justify-between mb-12">

        <div>

          {loggedIn&&(

            <p className="text-zinc-500 text-sm uppercase tracking-[5px] mb-3">
              Welcome Back
            </p>

          )}

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            Aura
          </h1>

        </div>

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

      {/* Songs */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-8">

        {songs.map((song,index)=>(

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