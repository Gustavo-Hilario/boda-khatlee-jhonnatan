import { useState, useEffect, useMemo, lazy, Suspense } from 'react'
import { MotionConfig } from 'framer-motion'
import { MusicProvider } from './context/MusicContext'
import { GuestProvider } from './context/GuestContext'

// Lazy load AdminPage to keep admin code out of public bundle
const AdminPage = lazy(() => import('./components/admin/AdminPage').then(m => ({ default: m.AdminPage })))
import { SmoothScroller } from './components/layout/SmoothScroller'
import { CoverSection } from './components/sections/CoverSection'
import { WelcomeSection } from './components/sections/WelcomeSection'
import { QuoteSection } from './components/sections/QuoteSection'
import { FamilySection } from './components/sections/FamilySection'
import { CountdownSection } from './components/sections/CountdownSection'
import { VenueSection } from './components/sections/VenueSection'
import { ItinerarySection } from './components/sections/ItinerarySection'
import { OurStorySection } from './components/sections/OurStorySection'
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
  'our-story',
  'gallery',
  'info',
  'closing',
]

function App() {
  const [coverOpen, setCoverOpen] = useState(false)

  // Check for admin mode via URL parameter
  const isAdminMode = useMemo(() => {
    const params = new URLSearchParams(window.location.search)
    return params.get('admin') === 'true'
  }, [])

  // Reset scroll position on page load/refresh
  useEffect(() => {
    // Disable browser's automatic scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
    // Ensure page starts at top
    window.scrollTo(0, 0)
  }, [])

  // Render admin page if in admin mode (lazy loaded)
  if (isAdminMode) {
    return (
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Cargando...</div>}>
        <AdminPage />
      </Suspense>
    )
  }

  return (
    <MotionConfig reducedMotion="user">
      <GuestProvider>
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
              <div className="relative bg-white overflow-hidden">
                <div className="absolute inset-0 bg-pattern-dots opacity-30" />
                <SectionDivider variant="flourish" color="olive" />
              </div>
              <CountdownSection />
              <VenueSection />
              <ItinerarySection />
              <OurStorySection />
              <GallerySection />
              <SectionDivider variant="simple" color="olive" className="bg-white" />
              <InfoSection />
              <ClosingSection />
            </main>
          </SmoothScroller>

          {/* Floating music player - only show after cover opens */}
          {coverOpen && <MusicPlayer />}
        </MusicProvider>
      </GuestProvider>
    </MotionConfig>
  )
}

export default App
