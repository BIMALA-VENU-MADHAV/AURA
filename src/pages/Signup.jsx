import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Eye, EyeOff } from "lucide-react"
import supabase from "../lib/supabase"

function Signup() {
  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [avatar, setAvatar] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleSignup = async (e) => {
    e.preventDefault()

    if (!name || !age || !gender) {
      alert("Please fill all required fields")
      return
    }

    setLoading(true)

    const {
      data,
      error,
    } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      setLoading(false)
      alert(error.message)
      return
    }

    let avatarUrl = ""

    if (avatar) {
      const fileExt =
        avatar.name.split(".").pop()

      const fileName =
        `${Date.now()}.${fileExt}`

      const { error: uploadError } =
        await supabase.storage
          .from("avatars")
          .upload(fileName, avatar)

      if (!uploadError) {

        const { data } =
          supabase.storage
            .from("avatars")
            .getPublicUrl(fileName)

        avatarUrl =
          data.publicUrl
      }
    }

    await supabase
      .from("profiles")
      .insert({
        id: data.user.id,
        name,
        age,
        gender,
        avatar_url: avatarUrl,
        email,
      })

    setLoading(false)

    navigate("/")
  }

  return (
    <div className="w-full min-h-screen bg-black text-white relative overflow-hidden flex items-center justify-center px-6">

      {/* Background Glow */}
      <div className="absolute inset-0">

        <div className="absolute top-[-200px] left-[-100px] w-[500px] h-[500px] bg-fuchsia-500/20 blur-[120px] rounded-full" />

        <div className="absolute bottom-[-200px] right-[-100px] w-[500px] h-[500px] bg-indigo-500/20 blur-[120px] rounded-full" />

      </div>

      {/* Card */}
      <motion.form
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.4,
        }}
        onSubmit={handleSignup}
        className="
          relative z-10
          w-full max-w-md
          bg-white/5
          border border-white/10
          backdrop-blur-3xl
          rounded-[40px]
          p-8 md:p-10
        "
      >

        {/* Header */}
        <div className="mb-10">

          <p className="text-zinc-500 uppercase tracking-[5px] text-sm mb-3">
            Join Aura
          </p>

          <h1 className="text-5xl font-bold tracking-tight">
            Create Account
          </h1>

        </div>

        {/* Inputs */}
        <div className="space-y-5">

          {/* Avatar Upload */}
          <div className="flex flex-col items-center">

            <label
              htmlFor="avatar"
              className="
                relative
                w-28 h-28
                rounded-full
                overflow-hidden
                border border-white/10
                bg-white/5
                flex items-center justify-center
                cursor-pointer
                hover:bg-white/10
                transition
              "
            >

              {avatar ? (

                <img
                  src={URL.createObjectURL(avatar)}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />

              ) : (

                <div className="text-center">

                  <p className="text-3xl">
                    +
                  </p>

                  <p className="text-xs text-zinc-500 mt-1">
                    Add Photo
                  </p>

                </div>

              )}

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

            <p className="text-zinc-500 text-sm mt-4">
              Profile Picture (Optional)
            </p>

          </div>

          {/* Name */}
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="
              w-full
              bg-white/5
              border border-white/10
              rounded-2xl
              px-5 py-4
              outline-none
              placeholder:text-zinc-500
            "
          />

          {/* Age */}
          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) =>
              setAge(e.target.value)
            }
            className="
              w-full
              bg-white/5
              border border-white/10
              rounded-2xl
              px-5 py-4
              outline-none
              placeholder:text-zinc-500
            "
          />

          {/* Gender */}
          <div>

            <p className="text-zinc-500 text-sm mb-3">
              Gender
            </p>

            <div className="grid grid-cols-3 gap-3">

              {["Male", "Female", "Other"].map((item) => (

                <button
                  key={item}
                  type="button"
                  onClick={() =>
                    setGender(item)
                  }
                  className={`
                    py-4 rounded-2xl border transition
                    ${
                      gender === item
                        ? "bg-white text-black border-white"
                        : "bg-white/5 border-white/10 text-white hover:bg-white/10"
                    }
                  `}
                >

                  {item}

                </button>

              ))}

            </div>

          </div>

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="
              w-full
              bg-white/5
              border border-white/10
              rounded-2xl
              px-5 py-4
              outline-none
              placeholder:text-zinc-500
            "
          />

          {/* Password */}
          <div className="relative">

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="
                w-full
                bg-white/5
                border border-white/10
                rounded-2xl
                px-5 py-4 pr-14
                outline-none
                placeholder:text-zinc-500
              "
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="
                absolute right-5 top-1/2
                -translate-y-1/2
                text-zinc-500
                hover:text-white
                transition
              "
            >

              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}

            </button>

          </div>

        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="
            w-full
            mt-8
            bg-white
            text-black
            font-semibold
            py-4
            rounded-2xl
            hover:scale-[1.02]
            transition
            disabled:opacity-50
          "
        >

          {loading
            ? "Creating..."
            : "Create Account"}

        </button>

        {/* Footer */}
        <p className="text-zinc-500 text-center mt-8">

          Already have an account?{" "}

          <Link
            to="/login"
            className="text-white"
          >
            Login
          </Link>

        </p>

      </motion.form>

    </div>
  )
}

export default Signup