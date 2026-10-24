import { Hero } from '../components/Hero'
import { Projects } from '../components/Projects'
import { About } from '../components/About'
import { Contact } from '../components/Contact'
import { usePageMeta } from '../lib/seo'
import { site } from '../data/site'

/** Página inicial — hero com índice de build, lista editorial de projetos, estúdio e contacto. */
export default function Home() {
  usePageMeta({ title: site.seo.defaultTitle, description: site.description, path: '/' })

  return (
    <>
      <Hero />
      <Projects />
      <About />
      <Contact />
    </>
  )
}
