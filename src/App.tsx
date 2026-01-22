import { useState } from 'react'
import { MotionConfig } from 'framer-motion'
import { MusicProvider } from './context/MusicContext'
import { SmoothScroller } from './components/layout/SmoothScroller'
import { CoverSection } from './components/sections/CoverSection'
import { WelcomeSection } from './components/sections/WelcomeSection'
import { QuoteSection } from './components/sections/QuoteSection'
import { FamilySection } from './components/sections/FamilySection'
import { CountdownSection } from './components/sections/CountdownSection'
import { VenueSection } from './components/sections/VenueSection'
import { ItinerarySection } from './components/sections/ItinerarySection'
import { GallerySection } from './components/sections/GallerySection'
import { InfoSection } from './components/sections/InfoSection'
import { ClosingSection } from './components/sections/ClosingSection'

import { MusicPlayer } from './components/ui/MusicPlayer'
import { SectionDivider } from './components/ui/SectionDivider'
import { AnimatedBackground } from './components/ui/AnimatedBackground'

const SECTION_IDS = [
  'welcome',
  'quote',
  'family',
  'countdown',
  'venue',
  'itinerary',
  'gallery',
  'galeria',
  'info',
  'closing',
]

function App() {
  const [coverOpen, setCoverOpen] = useState(false)

  return (
    <MotionConfig reducedMotion="user">
      <MusicProvider>
        {/* Animated background layer */}
        <AnimatedBackground particleCount={12} />

        {/* Cover section (overlay) */}
        <CoverSection onOpen={() => setCoverOpen(true)} />

        {/* Main content */}
        <SmoothScroller sectionIds={SECTION_IDS}>
          <main className="relative">
            <WelcomeSection />
            <QuoteSection />
            <FamilySection />
            <SectionDivider variant="flourish" color="olive" className="bg-white" />
            <CountdownSection />
            <VenueSection />
            <ItinerarySection />
            <GallerySection />
            <SectionDivider variant="simple" color="olive" className="bg-white" />
            <InfoSection />
            <ClosingSection />
          </main>
        </SmoothScroller>

        {/* Floating music player - only show after cover opens */}
        {coverOpen && <MusicPlayer />}
      </MusicProvider>
    </MotionConfig>
  )
}

export default App
