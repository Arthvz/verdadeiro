'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const Projects = () => {
  const [isDark, setIsDark] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const projects = [
    {
      title: 'Kriptu',
      description: 'Plataforma inteligente para análise e aprendizado de criptomoedas.',
      link: 'https://kriptu.com.br',
    },
    {
      title: 'EmploYEAH',
      description: 'Plataforma de gestão de pontos para empresas e colaboradores, focado em engajamento e produtividade, cultura empresarial.',
      link: 'https://employeah.vercel.app/',
    },
    {
      title: 'Meu Portfólio',
      description: 'Este portfólio moderno com dark/light mode e animações suaves.',
      link: 'https://arthurverdadeiro.netlify.app/',
    },
  ]

  useEffect(() => {
    const updateTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'))
    }

    updateTheme()
    const observer = new MutationObserver(updateTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <section id="projects" className="min-h-screen px-4 sm:px-6 py-16 sm:py-20 relative mb-10">
      {!isMobile && (
        <div className="absolute top-0 left-0 w-full h-full flex items-start justify-between pt-6 px-8 lg:px-14 pointer-events-none">
          <img
            src={isDark ? '/images/asset-esq-b.png' : '/images/asset-esq.png'}
            alt="Asset esquerdo topo"
            width={80}
            height={80}
            className="rotate-180 scale-x-[-1] transition duration-500"
          />
          <img
            src={isDark ? '/images/asset-mid-b.png' : '/images/asset-mid.png'}
            alt="Asset meio topo"
            width={500}
            height={500}
            className="rotate-180 transition duration-500"
          />
          <img
            src={isDark ? '/images/asset-dir-b.png' : '/images/asset-dir.png'}
            alt="Asset direito topo"
            width={80}
            height={80}
            className="rotate-180 scale-x-[-1] transition duration-500"
          />
        </div>
      )}

      <motion.h2
        className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-10 pt-20 sm:pt-28 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        PROJETOS
      </motion.h2>

      <motion.div
        className="flex flex-col gap-8 sm:gap-12 max-w-5xl mx-auto w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {projects.map((project, index) => {
          const previewUrl = `https://api.microlink.io/?url=${project.link}&screenshot=true&meta=false&embed=screenshot.url`

          const [imgError, setImgError] = useState(false)

          return (
            <a
              key={index}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl overflow-hidden border hover:shadow-xl transition bg-background"
            >
              <div className="w-full h-48 sm:h-64 md:h-80 lg:h-96 overflow-hidden bg-muted relative">
                {!imgError ? (
                  <img
                    src={previewUrl}
                    alt={`Preview de ${project.title}`}
                    className="w-full h-full object-cover transition duration-300 hover:scale-105"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full bg-muted text-muted-foreground text-center p-4">
                    <div>
                      <span className="text-2xl sm:text-4xl mb-2 block">🌐</span>
                      <p className="text-base sm:text-lg font-semibold">{project.title}</p>
                      <p className="text-xs sm:text-sm opacity-70">Preview indisponível</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-foreground text-background p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-2">{project.title}</h3>
                <p className="text-sm sm:text-base opacity-80">{project.description}</p>
              </div>
            </a>
          )
        })}
      </motion.div>
    </section>
  )
}

export default Projects