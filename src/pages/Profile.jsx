import {useEffect,useRef,useState} from "react"
import {useNavigate} from "react-router-dom"
import {Pencil,X} from "lucide-react"
import supabase from "../lib/supabase"

function Profile(){

  const [profile,setProfile]=
    useState(null)

  const [loading,setLoading]=
    useState(true)

  const [avatar,setAvatar]=
    useState(null)

  const [editName,setEditName]=
    useState(false)

  const [editAge,setEditAge]=
    useState(false)

  const [editGender,setEditGender]=
    useState(false)

  const navigate=useNavigate()

  const nameRef=useRef()
  const ageRef=useRef()
  const genderRef=useRef()

  useEffect(()=>{
    getProfile()
  },[])

  useEffect(()=>{

    const handleClickOutside=(e)=>{

      if(
        nameRef.current&&
        !nameRef.current.contains(
          e.target
        )
      ){

        setEditName(false)

      }

      if(
        ageRef.current&&
        !ageRef.current.contains(
          e.target
        )
      ){

        setEditAge(false)

      }

      if(
        genderRef.current&&
        !genderRef.current.contains(
          e.target
        )
      ){

        setEditGender(false)

      }

    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    )

    return()=>{

      document.removeEventListener(
        "mousedown",
        handleClickOutside
      )

    }

  },[])

  const getProfile=async()=>{

    const {
      data:{user},
    }=await supabase.auth.getUser()

    if(!user){

      navigate("/login")
      return

    }

    const {data}=
      await supabase
        .from("profiles")
        .select("*")
        .eq("id",user.id)
        .maybeSingle()

    setProfile(data)

    setLoading(false)

  }

  const saveProfile=async()=>{

    const {
      data:{user},
    }=await supabase.auth.getUser()

    let avatarUrl=
      profile?.avatar_url||""

    if(avatar){

      const fileExt=
        avatar.name
          .split(".")
          .pop()

      const fileName=
        `${Date.now()}.${fileExt}`

      await supabase.storage
        .from("avatars")
        .upload(fileName,avatar)

      const {data}=
        supabase.storage
          .from("avatars")
          .getPublicUrl(fileName)

      avatarUrl=
        data.publicUrl

    }

    await supabase
      .from("profiles")
      .update({
        name:profile?.name,
        age:profile?.age,
        gender:profile?.gender,
        avatar_url:avatarUrl,
      })
      .eq("id",user.id)

    setEditName(false)
    setEditAge(false)
    setEditGender(false)

  }

  const logout=async()=>{

    await supabase.auth.signOut()

    navigate("/login")

  }

  if(loading){

    return(
      <div className="w-full min-h-screen bg-black flex items-center justify-center text-white text-2xl">
        Loading...
      </div>
    )

  }

  return(
    <div className="w-full min-h-screen bg-black text-white relative overflow-y-auto pb-56 md:pb-32">

      {/* Glow */}
      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute top-[-200px] left-[-100px] w-[500px] h-[500px] bg-fuchsia-500/20 blur-[140px] rounded-full"/>

        <div className="absolute bottom-[-200px] right-[-100px] w-[500px] h-[500px] bg-indigo-500/20 blur-[140px] rounded-full"/>

      </div>

      {/* Content */}
      <div className="relative z-10 px-5 md:px-6 py-14 md:py-20 max-w-3xl mx-auto flex flex-col items-center">

        {/* Avatar */}
        <div className="w-full flex justify-center">

          <label
          htmlFor="avatar"
          className="
          relative
          w-40 h-40 md:w-52 md:h-52
          rounded-full
          overflow-hidden
          cursor-pointer
          group
          flex-shrink-0
          "
          >

            <div className="absolute inset-0 bg-white/20 blur-2xl scale-125 opacity-50"/>

            {profile?.avatar_url||avatar?(

              <img
              src={
                avatar
                ? URL.createObjectURL(
                  avatar
                )
                : profile?.avatar_url
              }
              alt="avatar"
              className="
              relative z-10
              w-full h-full
              object-cover
              rounded-full
              "
              />

            ):(

              <div
              className="
              relative z-10
              w-full h-full
              rounded-full
              bg-white/5
              flex items-center justify-center
              text-5xl md:text-6xl font-bold
              "
              >
                {profile?.name?.[0]}
              </div>

            )}

            {/* Hover */}
            <div
            className="
            absolute inset-0
            bg-black/40
            opacity-0
            group-hover:opacity-100
            transition
            flex items-center justify-center
            z-20
            text-base md:text-lg
            "
            >
              Change
            </div>

          </label>

        </div>

        <input
        id="avatar"
        type="file"
        accept="image/*"
        onChange={(e)=>
          setAvatar(
            e.target.files[0]
          )
        }
        className="hidden"
        />

        {/* Name */}
        <div
        ref={nameRef}
        className="
        mt-8
        flex items-center justify-center gap-3 md:gap-4
        group
        w-full
        flex-wrap
        "
        >

          {editName?(

            <>

              <input
              type="text"
              value={
                profile?.name||""
              }
              onChange={(e)=>
                setProfile({
                  ...(profile||{}),
                  name:
                  e.target.value,
                })
              }
              className="
              bg-transparent
              text-3xl md:text-5xl
              font-bold
              outline-none
              text-center
              w-[220px] md:w-[260px]
              "
              autoFocus
              />

              <button
              onClick={saveProfile}
              className="
              text-sm md:text-base
              bg-white
              text-black
              px-5 py-3
              rounded-full
              cursor-pointer
              "
              >
                Save
              </button>

              <button
              onClick={()=>
                setEditName(false)
              }
              className="cursor-pointer"
              >
                <X size={22}/>
              </button>

            </>

          ):(

            <>

              <h1 className="text-3xl md:text-5xl font-bold text-center break-words">
                {profile?.name}
              </h1>

              <button
              onClick={()=>
                setEditName(true)
              }
              className="
              opacity-0
              group-hover:opacity-100
              transition
              cursor-pointer
              "
              >
                <Pencil
                size={22}
                className="text-zinc-500"
                />
              </button>

            </>

          )}

        </div>

        {/* Email */}
        <p className="text-zinc-500 text-base md:text-xl mt-5 text-center break-all">
          {profile?.email}
        </p>

        {/* Age */}
        <div
        ref={ageRef}
        className="
        mt-8
        flex items-center justify-center gap-3 md:gap-4
        group
        w-full
        flex-wrap
        "
        >

          <p className="text-zinc-500 text-xl md:text-2xl">
            Age:
          </p>

          {editAge?(

            <>

              <input
              type="number"
              value={
                profile?.age||""
              }
              onChange={(e)=>
                setProfile({
                  ...(profile||{}),
                  age:
                  e.target.value,
                })
              }
              className="
              bg-transparent
              text-2xl md:text-3xl
              outline-none
              w-[80px]
              "
              autoFocus
              />

              <button
              onClick={saveProfile}
              className="
              text-sm md:text-base
              bg-white
              text-black
              px-5 py-3
              rounded-full
              cursor-pointer
              "
              >
                Save
              </button>

              <button
              onClick={()=>
                setEditAge(false)
              }
              className="cursor-pointer"
              >
                <X size={22}/>
              </button>

            </>

          ):(

            <>

              <p className="text-2xl md:text-3xl">
                {profile?.age}
              </p>

              <button
              onClick={()=>
                setEditAge(true)
              }
              className="
              opacity-0
              group-hover:opacity-100
              transition
              cursor-pointer
              "
              >
                <Pencil
                size={20}
                className="text-zinc-500"
                />
              </button>

            </>

          )}

        </div>

        {/* Gender */}
        <div
        ref={genderRef}
        className="
        mt-8
        flex items-center justify-center gap-3 md:gap-4
        group
        w-full
        flex-wrap
        "
        >

          <p className="text-zinc-500 text-xl md:text-2xl">
            Gender:
          </p>

          {editGender?(

            <>

              <div className="flex items-center gap-3 flex-wrap justify-center">

                {[
                  "Male",
                  "Female",
                  "Other",
                ].map((item)=>(

                  <button
                  key={item}
                  onClick={()=>
                    setProfile({
                      ...(profile||{}),
                      gender:item,
                    })
                  }
                  className={`
                  px-5 py-3
                  rounded-full
                  text-sm md:text-base
                  transition
                  cursor-pointer
                  ${
                    profile?.gender===
                    item
                    ? "bg-white text-black"
                    : "bg-white/10 text-white"
                  }
                  `}
                  >

                    {item}

                  </button>

                ))}

              </div>

              <button
              onClick={saveProfile}
              className="
              text-sm md:text-base
              bg-white
              text-black
              px-5 py-3
              rounded-full
              cursor-pointer
              "
              >
                Save
              </button>

              <button
              onClick={()=>
                setEditGender(false)
              }
              className="cursor-pointer"
              >
                <X size={22}/>
              </button>

            </>

          ):(

            <>

              <p className="text-2xl md:text-3xl">
                {profile?.gender}
              </p>

              <button
              onClick={()=>
                setEditGender(true)
              }
              className="
              opacity-0
              group-hover:opacity-100
              transition
              cursor-pointer
              "
              >
                <Pencil
                size={20}
                className="text-zinc-500"
                />
              </button>

            </>

          )}

        </div>

        {/* Logout */}
        <button
        onClick={logout}
        className="
        mt-10
        px-12 md:px-14
        py-4
        rounded-full
        bg-red-500/10
        border border-red-500/20
        text-red-400
        text-base md:text-lg
        hover:bg-red-500/20
        transition
        cursor-pointer
        "
        >
          Logout
        </button>

      </div>

    </div>
  )

}

export default Profile