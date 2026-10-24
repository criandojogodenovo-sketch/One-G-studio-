import { Hero } from '../components/Hero'
import { Projects } from '../components/Projects'
import { Studio } from '../components/Studio'
import { Contact } from '../components/Contact'
import { usePageMeta } from '../lib/seo'
import { useT } from '../i18n'

/** Página inicial — hero com índice de build, lista editorial de projetos, estúdio e contacto. */
export default function Home() {
  const t = useT()

  // Título/descrição por idioma (o efeito re-aplica ao trocar de língua).
  usePageMeta({ title: t.seo.homeTitle, description: t.seo.homeDescription, path: '/' })

  return (
    <>
      <Hero />
      <Projects />
      <Studio />
      <Contact />
    </>
  )
}
