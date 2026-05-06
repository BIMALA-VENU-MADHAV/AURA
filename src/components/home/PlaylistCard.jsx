// src/components/home/PlaylistCard.jsx

function PlaylistCard({
  playlist,
}) {

  return (
    <div className="relative h-72 rounded-[30px] overflow-hidden group cursor-pointer">

      <img
        src={playlist.image}
        alt={playlist.title}
        className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />

      {/* Content */}
      <div className="absolute bottom-6 left-6">

        <p className="text-zinc-300">
          {playlist.songs.length} Songs
        </p>

        <h2 className="text-3xl font-bold">
          {playlist.title}
        </h2>

      </div>

    </div>
  )
}

export default PlaylistCard