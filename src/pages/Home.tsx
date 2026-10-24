import { Hero } from '../components/Hero'
import { AppsGrid } from '../components/AppsGrid'
import { usePageMeta } from '../lib/seo'
import { site } from '../data/site'

// Página inicial — hero + catálogo. Sobre e contacto chegam no commit seguinte.
export default function Home() {
  usePageMeta({ title: site.seo.defaultTitle, description: site.description, path: '/' })

  return (
    <>
      <Hero />
      <AppsGrid />
      <section id="about" className="scroll-mt-24 border-t border-white/[0.07] bg-panel/40 py-24">
        <div className="container-site">
          <h2 className="font-display text-3xl font-bold tracking-tight">About the studio</h2>
          <p className="mt-3 text-mist">Counters and mission arrive in the next commit.</p>
        </div>
      </section>
      <section id="contact" className="container-site scroll-mt-24 py-24">
        <h2 className="font-display text-3xl font-bold tracking-tight">Get in touch</h2>
        <p className="mt-3 text-mist">Channels arrive in the next commit.</p>
      </section>
    </>
  )
}
