import { usePlayer } from "../context/PlayerContext"

function SongCard({
  song,
  songs,
  index,
}) {

  const { playSong } = usePlayer()

  return (
    <div
      onClick={() =>
        playSong(song, index, songs)
      }
      className="bg-zinc-900 p-4 rounded-3xl hover:bg-zinc-800 transition cursor-pointer group"
    >

      <div className="relative overflow-hidden rounded-2xl">

        <img
          src={song.image}
          alt={song.title}
          className="w-full h-60 object-cover group-hover:scale-105 transition duration-300"
        />

        <button className="absolute bottom-4 right-4 bg-white text-black w-12 h-12 rounded-full opacity-0 group-hover:opacity-100 transition">
          ▶
        </button>

      </div>

      <div className="mt-4">

        <h2 className="text-lg font-semibold">
          {song.title}
        </h2>

        <p className="text-zinc-400">
          {song.artist}
        </p>

      </div>

    </div>
  )
}

export default SongCard;