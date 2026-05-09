// src/components/FullPlayer.jsx

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useRef } from "react"

import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  ChevronDown,
  Heart,
  Repeat,
  Repeat1,
  Shuffle,
  Mic2,
  Disc3,
} from "lucide-react"

import { usePlayer } from "../context/PlayerContext"

import lyricsMap from "../data/lyrics"

function fmt(s) {

  const secs = Math.floor(s) || 0

  return `${Math.floor(secs / 60)}:${String(
    secs % 60
  ).padStart(2, "0")}`

}

function getActiveIndex(
  lyrics,
  currentTime
) {

  return lyrics.findIndex(
    (line, i) =>
      currentTime >= line.time &&
      (
        !lyrics[i + 1] ||
        currentTime <
          lyrics[i + 1].time
      )
  )

}

function FullPlayer() {

  const {
    currentSong,
    isPlaying,
    togglePlay,
    currentTime,
    duration,
    seekSong,
    nextSong,
    prevSong,
    isPlayerOpen,
    setIsPlayerOpen,
    toggleFavorite,
    isFavorite,
    playMode,
    togglePlayMode,
  } = usePlayer()

  const [showLyrics, setShowLyrics] =
    useState(false)

  const lyricsRef = useRef(null)

  const favorite =
    currentSong &&
    isFavorite(currentSong)

  const progress =
    duration
      ? (currentTime / duration) * 100
      : 0

  const lyrics =
    lyricsMap[
      currentSong?.title
    ] || []

  const activeIdx =
    getActiveIndex(
      lyrics,
      currentTime
    )

  useEffect(() => {

    setShowLyrics(false)

  }, [currentSong])

  useEffect(() => {

    if (
      !showLyrics ||
      activeIdx < 0 ||
      !lyricsRef.current
    )
      return

    const el =
      lyricsRef.current.querySelector(
        `[data-idx="${activeIdx}"]`
      )

    el?.scrollIntoView({
      block: "center",
      behavior: "smooth",
    })

  }, [
    activeIdx,
    showLyrics,
  ])

  if (
    !isPlayerOpen ||
    !currentSong
  )
    return null

  return (
    <AnimatePresence>

      <motion.div
        key="fullplayer"
        initial={{
          y: "100%",
        }}
        animate={{
          y: 0,
        }}
        exit={{
          y: "100%",
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 35,
        }}
        className="
        fixed inset-0 z-50
        flex flex-col
        overflow-hidden
        bg-black
        "
        style={{
          fontFamily:
            "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
        }}
      >

        {/* Background */}
        <div
          className="
          absolute inset-0
          bg-cover bg-center
          scale-110
          "
          style={{
            backgroundImage:
              `url(${currentSong.image})`,
            filter:
              "blur(60px) brightness(0.35) saturate(1.6)",
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/55" />

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full px-6 pb-10 pt-safe">

          {/* Top */}
          <div className="flex items-center justify-between pt-4 pb-2">

            {/* Close */}
            <button
              onClick={() =>
                setIsPlayerOpen(false)
              }
              className="
              w-9 h-9
              flex items-center justify-center
              rounded-full
              bg-white/10
              active:bg-white/20
              transition-colors
              "
            >

              <ChevronDown
                size={22}
                className="text-white"
              />

            </button>

            {/* Title */}
            <div className="text-center">

              <p className="
              text-white/40
              text-[11px]
              font-semibold
              uppercase
              tracking-widest
              ">
                Now Playing
              </p>

              <p className="
              text-white/80
              text-[13px]
              font-bold
              tracking-[0.25em]
              uppercase
              mt-0.5
              ">
                Aura
              </p>

            </div>

            {/* Lyrics Toggle */}
            <button
              onClick={() =>
                setShowLyrics(
                  (v) => !v
                )
              }
              className="
              w-9 h-9
              flex items-center justify-center
              rounded-full
              bg-white/10
              active:bg-white/20
              transition-colors
              "
            >

              {showLyrics ? (

                <Disc3
                  size={18}
                  className="text-white"
                />

              ) : (

                <Mic2
                  size={18}
                  className="text-white"
                />

              )}

            </button>

          </div>

          {/* Center */}
          <div className="
          flex-1
          flex flex-col
          items-center justify-center
          min-h-0
          mt-2
          ">

            <AnimatePresence mode="wait">

              {/* Album */}
              {!showLyrics && (

                <motion.div
                  key="art"
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                  }}
                  transition={{
                    duration: 0.28,
                  }}
                  className="
                  w-full
                  flex justify-center
                  "
                >

                  <div className="relative">

                    {/* Glow */}
                    <div
                      className="
                      absolute -inset-3
                      rounded-[36px]
                      opacity-60
                      blur-2xl
                      "
                      style={{
                        backgroundImage:
                          `url(${currentSong.image})`,
                        backgroundSize:
                          "cover",
                        backgroundPosition:
                          "center",
                      }}
                    />

                    {/* Album Image */}
                    <motion.img
                      src={
                        currentSong.image
                      }
                      alt={
                        currentSong.title
                      }
                      animate={{
                        scale:
                          isPlaying
                            ? 1
                            : 0.92,
                      }}
                      transition={{
                        duration: 0.5,
                      }}
                      className="
                      relative z-10
                      w-72 h-72
                      sm:w-80 sm:h-80
                      rounded-[32px]
                      object-cover
                      shadow-2xl
                      "
                    />

                  </div>

                </motion.div>

              )}

              {/* Lyrics */}
              {showLyrics && (

                <motion.div
                  key="lyrics"
                  initial={{
                    opacity: 0,
                    y: 16,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: 16,
                  }}
                  transition={{
                    duration: 0.28,
                  }}
                  className="
                  w-full
                  flex justify-center
                  "
                >

                  {lyrics.length === 0 ? (

                    <p className="
                    text-white/30
                    text-xl
                    font-semibold
                    text-center
                    ">
                      No lyrics available
                    </p>

                  ) : (

                    <div
                      ref={lyricsRef}
                      className="
                      w-full max-w-sm
                      h-72 sm:h-80
                      overflow-y-auto
                      px-4
                      no-scrollbar
                      "
                      style={{
                        maskImage:
                          "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
                      }}
                    >

                      <div className="
                      py-24
                      space-y-5
                      text-center
                      ">

                        {lyrics.map(
                          (
                            line,
                            i
                          ) => {

                            const dist =
                              Math.abs(
                                i -
                                  activeIdx
                              )

                            const active =
                              i ===
                              activeIdx

                            return (

                              <motion.p
                                key={i}
                                data-idx={
                                  i
                                }
                                animate={{
                                  opacity:
                                    dist ===
                                    0
                                      ? 1
                                      : dist ===
                                        1
                                      ? 0.38
                                      : 0.14,

                                  scale:
                                    active
                                      ? 1.04
                                      : 1,
                                }}
                                transition={{
                                  duration: 0.3,
                                }}
                                className={`
                                text-2xl sm:text-3xl
                                font-bold
                                leading-snug
                                tracking-tight
                                break-words
                                transition-colors
                                ${
                                  active
                                    ? "text-white"
                                    : "text-white/60"
                                }
                                `}
                              >

                                {line.text}

                              </motion.p>

                            )

                          }
                        )}

                      </div>

                    </div>

                  )}

                </motion.div>

              )}

            </AnimatePresence>

          </div>

          {/* Song Info */}
          <div className="
          flex items-center
          justify-between
          mt-6
          px-1
          ">

            <div className="
            flex-1 min-w-0
            pr-4
            ">

              <h1 className="
              text-white
              text-xl
              font-bold
              tracking-tight
              truncate
              ">
                {currentSong.title}
              </h1>

              <p className="
              text-white/50
              text-[15px]
              font-medium
              mt-0.5
              truncate
              ">
                {currentSong.artist}
              </p>

            </div>

            {/* Favorite */}
            <button
              onClick={() =>
                toggleFavorite(
                  currentSong
                )
              }
              className="
              flex-shrink-0
              w-9 h-9
              flex items-center justify-center
              "
            >

              <Heart
                size={24}
                className={`
                transition-all
                ${
                  favorite
                    ? "text-white fill-white scale-110"
                    : "text-white/40"
                }
                `}
              />

            </button>

          </div>

          {/* Progress */}
          <div className="mt-5 px-1">

            <div className="
            relative
            h-1
            bg-white/15
            rounded-full
            ">

              {/* Fill */}
              <div
                className="
                absolute left-0 top-0
                h-full
                bg-white
                rounded-full
                pointer-events-none
                "
                style={{
                  width:
                    `${progress}%`,
                }}
              />

              {/* Dot */}
              <div
                className="
                absolute top-1/2
                -translate-y-1/2
                w-3 h-3
                bg-white
                rounded-full
                shadow
                pointer-events-none
                "
                style={{
                  left:
                    `calc(${progress}% - 6px)`,
                }}
              />

              {/* Seek */}
              <input
                type="range"
                min={0}
                max={
                  duration || 0
                }
                step={0.1}
                value={currentTime}
                onChange={(e) =>
                  seekSong(
                    Number(
                      e.target.value
                    )
                  )
                }
                className="
                absolute inset-0
                w-full h-full
                opacity-0
                cursor-pointer
                "
              />

            </div>

            {/* Time */}
            <div className="
            flex justify-between
            mt-2
            ">

              <span className="
              text-white/40
              text-xs
              tabular-nums
              ">
                {fmt(currentTime)}
              </span>

              <span className="
              text-white/40
              text-xs
              tabular-nums
              ">
                {fmt(duration)}
              </span>

            </div>

          </div>

          {/* Controls */}
          <div className="
          flex items-center
          justify-between
          mt-6
          px-2
          ">

            {/* Repeat */}
            <button
              onClick={
                togglePlayMode
              }
              className="
              w-10 h-10
              flex items-center justify-center
              "
            >

              {playMode ===
              "repeat-one" ? (

                <Repeat1
                  size={22}
                  className="text-white"
                />

              ) : playMode ===
                "repeat-all" ? (

                <Repeat
                  size={22}
                  className="text-white"
                />

              ) : (

                <Shuffle
                  size={22}
                  className="text-white/50"
                />

              )}

            </button>

            {/* Prev */}
            <button
              onClick={prevSong}
              className="
              w-12 h-12
              flex items-center justify-center
              active:scale-90
              transition-transform
              "
            >

              <SkipBack
                size={32}
                className="
                text-white
                fill-white
                "
              />

            </button>

            {/* Play */}
            <motion.button
              onClick={togglePlay}
              whileTap={{
                scale: 0.92,
              }}
              className="
              w-16 h-16
              rounded-full
              bg-white
              flex items-center justify-center
              shadow-lg
              "
            >

              {isPlaying ? (

                <Pause
                  size={28}
                  className="
                  text-black
                  fill-black
                  "
                />

              ) : (

                <Play
                  size={28}
                  className="
                  text-black
                  fill-black
                  ml-1
                  "
                />

              )}

            </motion.button>

            {/* Next */}
            <button
              onClick={nextSong}
              className="
              w-12 h-12
              flex items-center justify-center
              active:scale-90
              transition-transform
              "
            >

              <SkipForward
                size={32}
                className="
                text-white
                fill-white
                "
              />

            </button>

            {/* Empty */}
            <button
              className="
              w-10 h-10
              opacity-0
              pointer-events-none
              "
            />

          </div>

        </div>

      </motion.div>

    </AnimatePresence>
  )

}

export default FullPlayer