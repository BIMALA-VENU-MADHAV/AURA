import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Pencil, X } from "lucide-react"
import supabase from "../lib/supabase"

function Profile() {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [avatar, setAvatar] = useState(null)

  const [editName, setEditName] = useState(false)
  const [editAge, setEditAge] = useState(false)
  const [editGender, setEditGender] = useState(false)

  const navigate = useNavigate()

  const nameRef = useRef()
  const ageRef = useRef()
  const genderRef = useRef()

  useEffect(() => {
    getProfile()
  }, [])

  useEffect(() => {
    const handleClickOutside = (e) => {

      if (
        nameRef.current &&
        !nameRef.current.contains(e.target)
      ) {
        setEditName(false)
      }

      if (
        ageRef.current &&
        !ageRef.current.contains(e.target)
      ) {
        setEditAge(false)
      }

      if (
        genderRef.current &&
        !genderRef.current.contains(e.target)
      ) {
        setEditGender(false)
      }

    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    )

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      )
    }
  }, [])

  const getProfile = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      navigate("/login")
      return
    }

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle()

    setProfile(data)
    setLoading(false)
  }

  const saveProfile = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    let avatarUrl =
      profile?.avatar_url || ""

    if (avatar) {
      const fileExt =
        avatar.name.split(".").pop()

      const fileName =
        `${Date.now()}.${fileExt}`

      await supabase.storage
        .from("avatars")
        .upload(fileName, avatar)

      const { data } =
        supabase.storage
          .from("avatars")
          .getPublicUrl(fileName)

      avatarUrl =
        data.publicUrl
    }

    await supabase
      .from("profiles")
      .update({
        name: profile?.name,
        age: profile?.age,
        gender: profile?.gender,
        avatar_url: avatarUrl,
      })
      .eq("id", user.id)

    setEditName(false)
    setEditAge(false)
    setEditGender(false)

    alert("Saved")
  }

  const logout = async () => {
    await supabase.auth.signOut()
    navigate("/login")
  }

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-black flex items-center justify-center text-white text-2xl">
        Loading...
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen bg-black text-white relative overflow-y-auto">

      {/* Glow */}
      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute top-[-200px] left-[-100px] w-[500px] h-[500px] bg-fuchsia-500/20 blur-[140px] rounded-full" />

        <div className="absolute bottom-[-200px] right-[-100px] w-[500px] h-[500px] bg-indigo-500/20 blur-[140px] rounded-full" />

      </div>

      <div className="relative z-10 px-6 py-20 max-w-3xl mx-auto flex flex-col items-center">

        {/* Avatar */}
        <label
          htmlFor="avatar"
          className="
            relative
            w-52 h-52
            rounded-full
            overflow-hidden
            cursor-pointer
            group
          "
        >

          <div className="absolute inset-0 bg-white/20 blur-2xl scale-125 opacity-50" />

          {profile?.avatar_url || avatar ? (

            <img
              src={
                avatar
                  ? URL.createObjectURL(avatar)
                  : profile?.avatar_url
              }
              alt="avatar"
              className="
                relative z-10
                w-full h-full object-cover
                rounded-full
              "
            />

          ) : (

            <div
              className="
                relative z-10
                w-full h-full rounded-full
                bg-white/5
                flex items-center justify-center
                text-6xl font-bold
              "
            >
              {profile?.name?.[0]}
            </div>

          )}

          <div
            className="
              absolute inset-0
              bg-black/40
              opacity-0
              group-hover:opacity-100
              transition
              flex items-center justify-center
              z-20
              text-lg
            "
          >
            Change
          </div>

        </label>

        <input
          id="avatar"
          type="file"
          accept="image/*"
          onChange={(e) =>
            setAvatar(
              e.target.files[0]
            )
          }
          className="hidden"
        />

        {/* Name */}
        <div
          ref={nameRef}
          className="mt-10 flex items-center gap-4 group"
        >

          {editName ? (

            <>
              <input
                type="text"
                value={profile?.name || ""}
                onChange={(e) =>
                  setProfile({
                    ...(profile || {}),
                    name: e.target.value,
                  })
                }
                className="
                  bg-transparent
                  text-5xl
                  font-bold
                  outline-none
                  text-center
                "
                autoFocus
              />

              <button
                onClick={saveProfile}
                className="
                  text-base
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
                onClick={() =>
                  setEditName(false)
                }
                className="cursor-pointer"
              >
                <X size={24} />
              </button>
            </>

          ) : (

            <>
              <h1 className="text-5xl font-bold">
                {profile?.name}
              </h1>

              <button
                onClick={() =>
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
                  size={24}
                  className="text-zinc-500"
                />
              </button>
            </>

          )}

        </div>

        {/* Email */}
        <p className="text-zinc-500 text-xl mt-5">
          {profile?.email}
        </p>

        {/* Age */}
        <div
          ref={ageRef}
          className="mt-14 flex items-center gap-4 group"
        >

          <p className="text-zinc-500 text-2xl">
            Age:
          </p>

          {editAge ? (

            <>
              <input
                type="number"
                value={profile?.age || ""}
                onChange={(e) =>
                  setProfile({
                    ...(profile || {}),
                    age: e.target.value,
                  })
                }
                className="
                  bg-transparent
                  text-3xl
                  outline-none
                "
                autoFocus
              />

              <button
                onClick={saveProfile}
                className="
                  text-base
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
                onClick={() =>
                  setEditAge(false)
                }
                className="cursor-pointer"
              >
                <X size={24} />
              </button>
            </>

          ) : (

            <>
              <p className="text-3xl">
                {profile?.age}
              </p>

              <button
                onClick={() =>
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
                  size={22}
                  className="text-zinc-500"
                />
              </button>
            </>

          )}

        </div>

        {/* Gender */}
        <div
          ref={genderRef}
          className="mt-12 flex items-center gap-4 group"
        >

          <p className="text-zinc-500 text-2xl">
            Gender:
          </p>

          {editGender ? (

            <>
              <div className="flex gap-3">

                {["Male", "Female", "Other"].map((item) => (

                  <button
                    key={item}
                    onClick={() =>
                      setProfile({
                        ...(profile || {}),
                        gender: item,
                      })
                    }
                    className={`
                      px-5 py-3 rounded-full text-base transition cursor-pointer
                      ${
                        profile?.gender === item
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
                  text-base
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
                onClick={() =>
                  setEditGender(false)
                }
                className="cursor-pointer"
              >
                <X size={24} />
              </button>
            </>

          ) : (

            <>
              <p className="text-3xl">
                {profile?.gender}
              </p>

              <button
                onClick={() =>
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
                  size={22}
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
            mt-20
            px-10 py-4
            rounded-full
            bg-red-500/10
            border border-red-500/20
            text-red-400
            text-lg
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