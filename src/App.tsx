import { Suspense, lazy } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, MotionConfig } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { LanguageProvider, useT } from './i18n'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { ScrollProgress } from './components/ScrollProgress'
import { PageTransition } from './components/PageTransition'
import { useRouteEffects } from './utils/hooks'

// Rotas lazy — código de cada página só é descarregado quando necessário.
const Home = lazy(() => import('./pages/Home'))
const AppDetail = lazy(() => import('./pages/AppDetail'))
const NotFound = lazy(() => import('./pages/NotFound'))

function PageLoader() {
  const t = useT()
  return (
    <div className="grid min-h-[60vh] place-items-center" role="status" aria-label={t.a11y.loading}>
      <Loader2 className="h-6 w-6 animate-spin text-accent" aria-hidden="true" />
    </div>
  )
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <Home />
            </PageTransition>
          }
        />
        <Route
          path="/apps/:id"
          element={
            <PageTransition>
              <AppDetail />
            </PageTransition>
          }
        />
        <Route
          path="*"
          element={
            <PageTransition>
              <NotFound />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  )
}

/** Conteúdo do site — vive dentro do LanguageProvider (textos via useT). */
function AppShell() {
  const t = useT()
  return (
    <>
      {/* Acessibilidade: saltar para o conteúdo + anúncios de rota */}
      <a href="#main" className="skip-link">
        {t.a11y.skipToContent}
      </a>
      <div id="sr-announcer" role="status" aria-live="polite" className="sr-only" />
      <RouteEffects />
      <ScrollProgress />
      <Header />

      <div className="flex min-h-screen flex-col">
        {/* tabIndex -1: recebe o foco após navegação entre rotas (ver hooks) */}
        <main id="main" tabIndex={-1} className="flex-1 outline-none">
          <Suspense fallback={<PageLoader />}>
            <AnimatedRoutes />
          </Suspense>
        </main>
        <Footer />
      </div>
    </>
  )
}

export function App() {
  return (
    <LanguageProvider>
      <MotionConfig reducedMotion="user">
        <BrowserRouter>
          <AppShell />
        </BrowserRouter>
      </MotionConfig>
    </LanguageProvider>
  )
}

/** Executa os efeitos de navegação (scroll/foco/âncoras) dentro do Router. */
function RouteEffects() {
  useRouteEffects()
  return null
}
