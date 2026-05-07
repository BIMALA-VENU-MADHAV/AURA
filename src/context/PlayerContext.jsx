import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"

import supabase from "../lib/supabase"

const PlayerContext = createContext()

export const PlayerProvider = ({ children }) => {

  const audioRef = useRef(new Audio())

  const [currentSong, setCurrentSong] =
    useState(null)

  const [isPlaying, setIsPlaying] =
    useState(false)

  const [currentTime, setCurrentTime] =
    useState(0)

  const [duration, setDuration] =
    useState(0)

  const [songs, setSongs] =
    useState([])

  const [currentIndex, setCurrentIndex] =
    useState(0)

  const [isPlayerOpen, setIsPlayerOpen] =
    useState(false)

  const [playMode, setPlayMode] =
    useState("repeat-all")

  const [favorites, setFavorites] =
    useState([])

  const [recentSongs, setRecentSongs] =
    useState([])

  // Load Recent Songs
  useEffect(() => {

    const saved =
      JSON.parse(
        localStorage.getItem("recentSongs")
      ) || []

    setRecentSongs(saved)

  }, [])

  // Save Recent Songs
  useEffect(() => {

    localStorage.setItem(
      "recentSongs",
      JSON.stringify(recentSongs)
    )

  }, [recentSongs])

  // Fetch Favorites
  const fetchFavorites = async () => {

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      setFavorites([])
      return
    }

    const { data, error } =
      await supabase
        .from("favorites")
        .select("*")
        .eq("user_id", user.id)

    if (error) {
      console.log(error)
      return
    }

    setFavorites(data || [])
  }

  // Auto Fetch Favorites
  useEffect(() => {

    fetchFavorites()

    const {
      data: listener,
    } = supabase.auth.onAuthStateChange(
      () => {
        fetchFavorites()
      }
    )

    return () => {
      listener.subscription.unsubscribe()
    }

  }, [])

  // Track Audio Progress
  useEffect(() => {

    const audio = audioRef.current

    const updateTime = () => {

      setCurrentTime(audio.currentTime)

      setDuration(audio.duration || 0)

    }

    audio.addEventListener(
      "timeupdate",
      updateTime
    )

    return () => {

      audio.removeEventListener(
        "timeupdate",
        updateTime
      )

    }

  }, [])

  // Auto Next Song
  useEffect(() => {

    const audio = audioRef.current

    const handleEnded = () => {
      nextSong()
    }

    audio.addEventListener(
      "ended",
      handleEnded
    )

    return () => {

      audio.removeEventListener(
        "ended",
        handleEnded
      )

    }

  }, [songs, currentIndex, playMode])

  // Play Song
  const playSong = (
    song,
    index = 0,
    songList = []
  ) => {

    if (songList.length > 0) {
      setSongs(songList)
    }

    setCurrentIndex(index)

    if (
      currentSong?.audio !== song.audio
    ) {

      audioRef.current.src =
        song.audio

    }

    audioRef.current.play()

    setCurrentSong(song)

    setIsPlaying(true)

    setIsPlayerOpen(true)

    // Recent Songs
    setRecentSongs((prev) => {

      const filtered =
        prev.filter(
          (item) =>
            item.id !== song.id
        )

      return [
        song,
        ...filtered,
      ].slice(0, 10)

    })

  }

  // Pause Song
  const pauseSong = () => {

    audioRef.current.pause()

    setIsPlaying(false)

  }

  // Toggle Play
  const togglePlay = () => {

    if (!currentSong) return

    if (isPlaying) {

      pauseSong()

    } else {

      audioRef.current.play()

      setIsPlaying(true)

    }

  }

  // Seek Song
  const seekSong = (time) => {

    audioRef.current.currentTime =
      time

  }

  // Next Song
  const nextSong = () => {

    if (songs.length === 0) return

    // Repeat One
    if (playMode === "repeat-one") {

      playSong(
        songs[currentIndex],
        currentIndex,
        songs
      )

      return
    }

    // Shuffle
    if (playMode === "shuffle") {

      const randomIndex =
        Math.floor(
          Math.random() *
          songs.length
        )

      playSong(
        songs[randomIndex],
        randomIndex,
        songs
      )

      return
    }

    // Repeat All
    const nextIndex =
      currentIndex === songs.length - 1
        ? 0
        : currentIndex + 1

    playSong(
      songs[nextIndex],
      nextIndex,
      songs
    )

  }

  // Previous Song
  const prevSong = () => {

    if (songs.length === 0) return

    const prevIndex =
      currentIndex === 0
        ? songs.length - 1
        : currentIndex - 1

    playSong(
      songs[prevIndex],
      prevIndex,
      songs
    )

  }

  // Toggle Play Mode
  const togglePlayMode = () => {

    if (playMode === "repeat-all") {

      setPlayMode("repeat-one")

    }

    else if (
      playMode === "repeat-one"
    ) {

      setPlayMode("shuffle")

    }

    else {

      setPlayMode("repeat-all")

    }

  }

  // Toggle Favorite
  const toggleFavorite = async (
    song
  ) => {

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      alert("Please login")
      return
    }

    const exists = favorites.find(
      (item) =>
        String(item.song_id) ===
        String(song.id)
    )

    // Remove
    if (exists) {

      const { error } =
        await supabase
          .from("favorites")
          .delete()
          .eq("id", exists.id)

      if (error) {
        console.log(error)
        return
      }

      setFavorites((prev) =>
        prev.filter(
          (item) =>
            String(item.song_id) !==
            String(song.id)
        )
      )

    }

    // Add
    else {

      const { data, error } =
        await supabase
          .from("favorites")
          .insert({
            user_id: user.id,
            song_id: String(song.id),
            title: song.title,
            artist: song.artist,
            image: song.image,
            audio: song.audio,
          })
          .select()

      if (error) {
        console.log(error)
        return
      }

      if (
        data &&
        data.length > 0
      ) {

        setFavorites((prev) => [
          ...prev,
          data[0],
        ])

      }

    }

  }

  // Check Favorite
  const isFavorite = (song) => {

    return favorites.some(
      (item) =>
        String(item.song_id) ===
        String(song.id)
    )

  }

  return (
    <PlayerContext.Provider
      value={{
        currentSong,
        isPlaying,
        currentTime,
        duration,
        playSong,
        pauseSong,
        togglePlay,
        seekSong,
        nextSong,
        prevSong,
        isPlayerOpen,
        setIsPlayerOpen,
        playMode,
        togglePlayMode,
        favorites,
        toggleFavorite,
        isFavorite,
        recentSongs,
      }}
    >
      {children}
    </PlayerContext.Provider>
  )

}

export const usePlayer = () =>
  useContext(PlayerContext)