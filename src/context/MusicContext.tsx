import { createContext, useContext, useRef, useState, useCallback, type ReactNode } from 'react'

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

export function MusicProvider({ children, audioSrc = '/audio/background-music.mp3' }: MusicProviderProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolumeState] = useState(0.5)
  const [hasInteracted, setHasInteracted] = useState(false)

  const togglePlay = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(audioSrc)
      audioRef.current.loop = true
      audioRef.current.volume = volume
    }

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play().catch(() => {
        // Autoplay blocked - user needs to interact first
        console.log('Audio playback requires user interaction')
      })
    }
    setIsPlaying(!isPlaying)
    setHasInteracted(true)
  }, [isPlaying, volume, audioSrc])

  const setVolume = useCallback((v: number) => {
    setVolumeState(v)
    if (audioRef.current) {
      audioRef.current.volume = v
    }
  }, [])

  return (
    <MusicContext.Provider value={{ isPlaying, togglePlay, volume, setVolume, hasInteracted, setHasInteracted }}>
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
