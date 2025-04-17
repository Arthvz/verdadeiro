'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const booleanPhrases = [
  'const verdadeiro = true;',
  'if (verdadeiro) { build(); }',
  'return <VerdadeiroDev />;',
  'while (true) { aprender(); }',
]

const About = () => {
  const [isDark, setIsDark] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [charIndex, setCharIndex] = useState(0)

  // Detectar tema atual
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

  // Detectar responsividade
  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkScreen()
    window.addEventListener('resize', checkScreen)
    return () => window.removeEventListener('resize', checkScreen)
  }, [])

  // Efeito typewriter
  useEffect(() => {
    const currentPhrase = booleanPhrases[index]
    if (charIndex < currentPhrase.length) {
      const timeout = setTimeout(() => {
        setText((prev) => prev + currentPhrase.charAt(charIndex))
        setCharIndex(charIndex + 1)
      }, 60)
      return () => clearTimeout(timeout)
    } else {
      const timeout = setTimeout(() => {
        setText('')
        setCharIndex(0)
        setIndex((prev) => (prev + 1) % booleanPhrases.length)
      }, 1500)
      return () => clearTimeout(timeout)
    }
  }, [charIndex, index])

  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center px-6 py-24 relative mb-10"
    >
      <motion.div
        className="max-w-3xl text-center z-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-xl md:text-2xl font-primary text-blue-400 mb-4 h-6">
          <span className="border-r-2 border-blue-400 animate-pulse pr-1">
            {text}
          </span>
        </h1>

        <h2 className="text-3xl md:text-4xl font-bold mb-6">Sobre eu</h2>

        <p className="text-base md:text-lg leading-relaxed mb-8">
          Olá! Me chamo <strong>Arthur Verdadeiro</strong> e sou estudante de{' '}
          <strong>Desenvolvimento de Software Multiplataforma</strong> na FATEC.  
          Tenho como missão criar experiências digitais autênticas, que unem tecnologia, criatividade e propósito. Sou apaixonado por IA, interfaces modernas e sempre busco evoluir como desenvolvedor fullstack.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#projects"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-xl transition"
          >
            Ver projetos
          </a>
          <a
            href="#contact"
            className="border border-blue-500 hover:bg-blue-500 hover:text-white text-blue-500 font-semibold px-6 py-2 rounded-xl transition"
          >
            Fale comigo
          </a>
        </div>
      </motion.div>

      {/* Imagens decorativas no fundo */}
      {!isMobile && (
        <div className="absolute left-0 w-full h-full flex items-end justify-between px-14 pb-6 pointer-events-none">
          <Image
            src={isDark ? '/images/asset-esq-b.png' : '/images/asset-esq.png'}
            alt="Asset esquerdo"
            width={80}
            height={80}
            className="transition duration-500"
          />
          <Image
            src={isDark ? '/images/asset-mid-b.png' : '/images/asset-mid.png'}
            alt="Asset meio"
            width={500}
            height={500}
            className="transition duration-500"
          />
          <Image
            src={isDark ? '/images/asset-dir-b.png' : '/images/asset-dir.png'}
            alt="Asset direito"
            width={80}
            height={80}
            className="transition duration-500"
          />
        </div>
      )}
    </section>
  )
}

export default About