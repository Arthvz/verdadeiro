import NavigationToggle from '@/components/NavigationToggle'
import About from '@/components/About'
import Projects from '@/components/Projects'
import Footer from '@/components/Footer'
import Header from '@/components/header'
import TechMarqueeIcons from '@/components/TechMarquee'
import Contact from '@/components/Contact'

export default function Home() {
  return (
    <div className="relative">
      {/* Header fixo */}
      <Header />

      {/* Botões de navegação fixos à esquerda */}
      <NavigationToggle />

      {/* Conteúdo principal */}
      <main className="pt-20 sm:pt-24"> {/* padding-top para não sobrepor o header */}
        <About />
        <TechMarqueeIcons />
        <Projects />
        <Contact />
      </main>

      {/* Rodapé */}
      <Footer />
    </div>
  )
}