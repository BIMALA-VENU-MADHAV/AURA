import {useState} from "react"
import {useNavigate,Link} from "react-router-dom"
import {motion} from "framer-motion"
import {ArrowLeft,Eye,EyeOff} from "lucide-react"
import supabase from "../lib/supabase"

function Login(){

  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [showPassword,setShowPassword]=useState(false)
  const [loading,setLoading]=useState(false)

  const navigate=useNavigate()

  const handleLogin=async(e)=>{

    e.preventDefault()

    setLoading(true)

    const {error}=
      await supabase.auth.signInWithPassword({
        email,
        password,
      })

    setLoading(false)

    if(error){

      alert(error.message)
      return

    }

    navigate("/")

  }

  return(
    <div className="w-full min-h-screen bg-black text-white relative overflow-hidden flex items-center justify-center px-6">

      {/* Back */}
      <button
      onClick={()=>
        navigate("/")
      }
      className="
      absolute top-6 left-6
      w-12 h-12 rounded-full
      bg-white/10 backdrop-blur-xl
      flex items-center justify-center
      cursor-pointer hover:bg-white/20
      transition z-20
      "
      >
        <ArrowLeft size={22}/>
      </button>

      {/* Glow */}
      <div className="absolute inset-0">

        <div className="absolute top-[-200px] left-[-100px] w-[500px] h-[500px] bg-fuchsia-500/20 blur-[120px] rounded-full"/>

        <div className="absolute bottom-[-200px] right-[-100px] w-[500px] h-[500px] bg-indigo-500/20 blur-[120px] rounded-full"/>

      </div>

      {/* Card */}
      <motion.form
      initial={{
        opacity:0,
        y:30,
      }}
      animate={{
        opacity:1,
        y:0,
      }}
      transition={{
        duration:0.4,
      }}
      onSubmit={handleLogin}
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
            Welcome Back
          </p>

          <h1 className="text-5xl font-bold tracking-tight">
            Aura
          </h1>

        </div>

        {/* Inputs */}
        <div className="space-y-5">

          {/* Email */}
          <input
          id="email"
          name="email"
          autoComplete="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>
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
          focus:border-white/20
          "
          />

          {/* Password */}
          <div className="relative">

            <input
            id="password"
            name="password"
            autoComplete="current-password"
            type={
              showPassword
              ? "text"
              : "password"
            }
            placeholder="Password"
            value={password}
            onChange={(e)=>
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
            focus:border-white/20
            "
            />

            <button
            type="button"
            onClick={()=>
              setShowPassword(
                !showPassword
              )
            }
            className="
            absolute
            right-5 top-1/2
            -translate-y-1/2
            text-zinc-500
            hover:text-white
            transition
            cursor-pointer
            "
            >

              {showPassword?(
                <EyeOff size={20}/>
              ):(
                <Eye size={20}/>
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
        cursor-pointer
        "
        >

          {loading
          ? "Logging in..."
          : "Login"}

        </button>

        {/* Footer */}
        <p className="text-zinc-500 text-center mt-8">

          Don’t have an account?{" "}

          <Link
          to="/signup"
          className="text-white"
          >
            Create one
          </Link>

        </p>

      </motion.form>

    </div>
  )

}

export default Login