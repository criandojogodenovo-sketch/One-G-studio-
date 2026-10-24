import { Hero } from '../components/Hero'
import { AppsGrid } from '../components/AppsGrid'
import { About } from '../components/About'
import { Contact } from '../components/Contact'
import { usePageMeta } from '../lib/seo'
import { site } from '../data/site'

/** Página inicial — hero, catálogo, sobre o estúdio e contacto. */
export default function Home() {
  usePageMeta({ title: site.seo.defaultTitle, description: site.description, path: '/' })

  return (
    <>
      <Hero />
      <AppsGrid />
      <About />
      <Contact />
    </>
  )
}
