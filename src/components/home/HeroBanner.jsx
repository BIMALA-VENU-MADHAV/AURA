import { motion } from "framer-motion"

function HeroBanner() {

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative h-[420px] rounded-[40px] overflow-hidden mb-12"
    >

      {/* Background */}
      <img
        src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1400"
        alt="banner"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end p-10">

        <p className="text-zinc-300 uppercase tracking-[6px] mb-3">
          Featured Album
        </p>

        <h1 className="text-6xl font-bold max-w-xl leading-tight">
          Feel The Music
        </h1>

        <p className="text-zinc-300 mt-4 text-lg max-w-lg">
          Discover trending songs, immersive playlists,
          and your favorite artists in Aura.
        </p>

        <button className="mt-8 w-fit px-8 py-4 bg-white text-black rounded-full font-semibold hover:scale-105 transition">
          Listen Now
        </button>

      </div>

    </motion.div>
  )
}

export default HeroBanner