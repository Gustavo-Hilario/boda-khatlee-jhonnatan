import { useState } from 'react'
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
import { Footer } from './components/sections/Footer'
import { MusicPlayer } from './components/ui/MusicPlayer'

const SECTION_IDS = [
  'welcome',
  'quote',
  'family',
  'countdown',
  'venue',
  'itinerary',
  'gallery',
  'info',
  'closing',
]

function App() {
  const [coverOpen, setCoverOpen] = useState(false)

  return (
    <MusicProvider>
      {/* Cover section (overlay) */}
      <CoverSection onOpen={() => setCoverOpen(true)} />

      {/* Main content */}
      <SmoothScroller sectionIds={SECTION_IDS}>
        <main className="relative">
          <WelcomeSection />
          <QuoteSection />
          <FamilySection />
          <CountdownSection />
          <VenueSection />
          <ItinerarySection />
          <GallerySection />
          <InfoSection />
          <ClosingSection />
          <Footer />
        </main>
      </SmoothScroller>

      {/* Floating music player - only show after cover opens */}
      {coverOpen && <MusicPlayer />}
    </MusicProvider>
  )
}

export default App
