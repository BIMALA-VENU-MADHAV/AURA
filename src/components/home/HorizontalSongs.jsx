import SongCard from "../SongCard"

function HorizontalSongs({
  songs,
}) {

  return (
    <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4">

      {songs.map((song, index) => (

        <div
          key={song.id}
          className="min-w-[260px]"
        >

          <SongCard
            song={song}
            songs={songs}
            index={index}
          />

        </div>

      ))}

    </div>
  )
}

export default HorizontalSongs