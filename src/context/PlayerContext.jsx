// src/context/PlayerContext.jsx

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"

const PlayerContext = createContext()

export const PlayerProvider = ({ children }) => {

  const audioRef = useRef(new Audio())

  const [currentSong, setCurrentSong] = useState(null)

  const [isPlaying, setIsPlaying] =
    useState(false)

  const [currentTime, setCurrentTime] =
    useState(0)

  const [duration, setDuration] =
    useState(0)

  const [songs, setSongs] = useState([])

  const [currentIndex, setCurrentIndex] =
    useState(0)

  const [isPlayerOpen, setIsPlayerOpen] =
    useState(false)

  // Favorites
  const [favorites, setFavorites] =
    useState([])

  // Recently Played
  const [recentSongs, setRecentSongs] =
    useState([])

  // Load Favorites
  useEffect(() => {

    const saved =
      JSON.parse(
        localStorage.getItem("favorites")
      ) || []

    setFavorites(saved)

  }, [])

  // Save Favorites
  useEffect(() => {

    localStorage.setItem(
      "favorites",
      JSON.stringify(favorites)
    )

  }, [favorites])

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

  // Track Progress
  useEffect(() => {

    const audio = audioRef.current

    const updateTime = () => {

      setCurrentTime(audio.currentTime)

      setDuration(audio.duration)

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

    if (currentSong?.audio !== song.audio) {
      audioRef.current.src = song.audio
    }

    audioRef.current.play()

    setCurrentSong(song)

    setIsPlaying(true)

    setIsPlayerOpen(true)

    // Add to Recently Played
    setRecentSongs((prev) => {

      const filtered =
        prev.filter(
          (item) => item.id !== song.id
        )

      return [
        song,
        ...filtered,
      ].slice(0, 10)

    })
  }

  // Pause
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

  // Seek
  const seekSong = (time) => {

    audioRef.current.currentTime = time

  }

  // Next
  const nextSong = () => {

    if (songs.length === 0) return

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

  // Prev
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

  // Favorites
  const toggleFavorite = (song) => {

    const exists = favorites.find(
      (item) => item.id === song.id
    )

    if (exists) {

      setFavorites(
        favorites.filter(
          (item) => item.id !== song.id
        )
      )

    } else {

      setFavorites([
        ...favorites,
        song,
      ])

    }
  }

  const isFavorite = (song) => {

    return favorites.some(
      (item) => item.id === song.id
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