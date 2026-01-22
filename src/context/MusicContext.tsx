import { createContext, useContext, useRef, useState, useCallback, useEffect, useMemo, type ReactNode } from 'react'
import { getAssetPath } from '../utils/assets'

interface MusicContextType {
  isPlaying: boolean
  togglePlay: () => void
  volume: number
  setVolume: (v: number) => void
  hasInteracted: boolean
  setHasInteracted: (v: boolean) => void
}

const MusicContext = createContext<MusicContextType | null>(null)

interface MusicProviderProps {
  children: ReactNode
  audioSrc?: string
}

export function MusicProvider({ children, audioSrc = getAssetPath('audio/background-music.mp3') }: MusicProviderProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const listenersAttachedRef = useRef(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolumeState] = useState(0.5)
  const [hasInteracted, setHasInteracted] = useState(false)

  // Use ref to track volume without causing callback recreation
  const volumeRef = useRef(volume)

  const ensureAudio = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(audioSrc)
      audioRef.current.loop = true
      audioRef.current.volume = volumeRef.current
    }
    if (!listenersAttachedRef.current && audioRef.current) {
      listenersAttachedRef.current = true
      audioRef.current.addEventListener('play', () => setIsPlaying(true))
      audioRef.current.addEventListener('pause', () => setIsPlaying(false))
      audioRef.current.addEventListener('ended', () => setIsPlaying(false))
    }
    return audioRef.current
  }, [audioSrc])

  const togglePlay = useCallback(() => {
    const audio = ensureAudio()
    if (!audio) return

    if (!audio.paused) {
      audio.pause()
      setHasInteracted(true)
      return
    }

    audio.play().then(() => {
      setHasInteracted(true)
    }).catch(() => {
      // Autoplay blocked - user needs to interact first
      setHasInteracted(true)
    })
  }, [ensureAudio])

  const setVolume = useCallback((v: number) => {
    setVolumeState(v)
    if (audioRef.current) {
      audioRef.current.volume = v
    }
  }, [])

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
      }
    }
  }, [])

  // Sync volume changes to audio element and ref
  useEffect(() => {
    volumeRef.current = volume
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  const contextValue = useMemo(() => ({
    isPlaying,
    togglePlay,
    volume,
    setVolume,
    hasInteracted,
    setHasInteracted,
  }), [isPlaying, togglePlay, volume, setVolume, hasInteracted, setHasInteracted])

  return (
    <MusicContext.Provider value={contextValue}>
      {children}
    </MusicContext.Provider>
  )
}

export function useMusic() {
  const context = useContext(MusicContext)
  if (!context) {
    throw new Error('useMusic must be used within a MusicProvider')
  }
  return context
}
