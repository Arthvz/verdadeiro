'use client'

import { HandMetal } from 'lucide-react'
import { Terminal, TypingAnimation } from './magicui/terminal'
import { motion } from 'framer-motion'

const terminalLines = [
  {
    icon: '>',
    text: 'npx install arthurverdadeiro@latest',
    className: 'text-grey-400 font-mono',
    delay: 0,
  },
  {
    icon: 'ℹ',
    text: 'Buscando pacote arthur@verdadeiro...',
    className: 'text-green-400 font-mono',
    delay: 1200,
  },
  {
    icon: 'ℹ',
    text: 'Conectando à FATEC...',
    className: 'text-blue-400 font-mono',
    delay: 2400,
  },
  {
    icon: 'ℹ',
    text: 'Conectando aos projetos...',
    className: 'text-blue-400 font-mono',
    delay: 3000,
  },
  {
    icon: '>',
    text: 'Instalando dependências: IA...',
    className: 'text-yellow-400 font-mono',
    delay: 3600,
  },
  {
    icon: '>',
    text: 'Instalando dependências: UI moderna...',
    className: 'text-yellow-400 font-mono',
    delay: 4200,
  },
  {
    icon: '>',
    text: 'Instalando dependências: Tecnologia...',
    className: 'text-yellow-400 font-mono',
    delay: 4800,
  },
  {
    icon: '>',
    text: 'Instalando dependências: Entrega de valor...',
    className: 'text-yellow-400 font-mono',
    delay: 5200,
  },
  {
    icon: '✔',
    text: 'Arthur Verdadeiro instalado com sucesso!',
    className: 'text-green-500 font-mono',
    delay: 5800,
  },
  {
    icon: 'ℹ',
    text: 'Pronto para criar experiências autênticas.',
    className: 'text-grey-400 font-mono',
    delay: 6600,
  },
]

const About = () => {
  return (
    <section
      id="about"
      className="min-h-screen px-4 sm:px-6 py-16 sm:py-24 relative"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 flex items-center justify-center gap-2 flex-wrap">
            Sobre eu <HandMetal className="w-8 h-8 sm:w-10 sm:h-10" />
          </h2>
          <p className="text-base sm:text-lg max-w-2xl mx-auto px-4">
            Desenvolvedor apaixonado por criar soluções inovadoras e experiências digitais autênticas
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Column - Terminal + Additional Content */}
          <div className="space-y-6 sm:space-y-8">
            {/* Terminal Section */}
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="w-full max-w-lg">
                <Terminal className="dark bg-[#191919] border-gray-700">
                  {terminalLines.map((line, idx) => (
                    <TypingAnimation
                      key={idx}
                      duration={40}
                      delay={line.delay}
                      className={line.className}
                    >
                      {`${typeof line.icon === 'string' ? line.icon : ''} ${line.text}`}
                    </TypingAnimation>
                  ))}
                </Terminal>
              </div>
            </motion.div>

            {/* Additional Content Below Terminal */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              {/* Education */}
              <div className="bg-[#191919] border border-gray-700 rounded-lg p-4 sm:p-6 transition-colors duration-300">
                <h3 className="text-base sm:text-lg font-semibold mb-4 text-white flex items-center gap-2">
                  🎓 Formação
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <div className="font-medium text-white text-sm sm:text-base">Desenvolvimento de Software Multiplataforma</div>
                      <div className="text-xs sm:text-sm text-gray-400">Fatec Osasco - Prefº Hirant Sanazar • 2024 - ATUALMENTE</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <div className="font-medium text-white text-sm sm:text-base">Analise e Desenvolvimento de Sistemas</div>
                      <div className="text-xs sm:text-sm text-gray-400">Etec Taboão da Serra • 2022 - 2023</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <div className="font-medium text-white text-sm sm:text-base">Cursos complementares</div>
                      <div className="text-xs sm:text-sm text-gray-400">Rocketseat, Alura</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <div className="font-medium text-white text-sm sm:text-base">Inglês - Avançado</div>
                      <div className="text-xs sm:text-sm text-gray-400">CNA - 2009 a 2011 / Autodidata - ∞ </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-[#191919] border border-gray-700 rounded-lg p-4 sm:p-6 transition-colors duration-300">
                <h3 className="text-base sm:text-lg font-semibold mb-4 text-white flex items-center gap-2">
                  🔗 Links rápidos
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <a
                    href="https://github.com/arthvz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 bg-gray-800/70 rounded-md hover:bg-gray-700 transition-colors text-sm text-gray-300"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    GitHub
                  </a>
                  <a
                    href="https://linkedin.com/in/arthur-verdadeiro"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 bg-gray-800/70 rounded-md hover:bg-gray-700 transition-colors text-sm text-gray-300"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    LinkedIn
                  </a>
                  <a
                    href="#contact"
                    className="flex items-center gap-2 p-3 bg-gray-800/70 rounded-md hover:bg-gray-700 transition-colors text-sm text-gray-300"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Contato
                  </a>
                  <a
                    href="#projects"
                    className="flex items-center gap-2 p-3 bg-gray-800/70 rounded-md hover:bg-gray-700 transition-colors text-sm text-gray-300"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    Projetos
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Content Section */}
          <motion.div
            className="space-y-6 sm:space-y-8"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Bio */}
            <div className="bg-[#191919] border border-gray-700 rounded-lg p-4 sm:p-6 transition-colors duration-300">
              <h3 className="text-lg sm:text-xl font-semibold mb-4 text-white">🌍 Quem sou eu?</h3>
              <div className="space-y-3 text-gray-300 text-sm sm:text-base">
                <p>
                  Sou Arthur Verdadeiro, estudante de Desenvolvimento de Software Multiplataforma na FATEC,
                  apaixonado por tecnologia e inovação.
                </p>
                <p>
                  Especializo-me em desenvolvimento web moderno, criando interfaces intuitivas e
                  experiências digitais que fazem a diferença na vida das pessoas.
                </p>
                <p>
                  Sempre em busca de novos desafios e oportunidades para crescer profissionalmente
                  e contribuir com projetos impactantes.
                </p>
              </div>
            </div>            {/* Skills */}
            <div className="bg-[#191919] border border-gray-700 rounded-lg p-4 sm:p-6 transition-colors duration-300">
              <h3 className="text-lg sm:text-xl font-semibold mb-4 text-white">🚀 Tecnologias</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { name: 'React/Next.js', level: 'Intermediário' },
                  { name: 'TypeScript', level: 'Intermediário' },
                  { name: 'Node.js', level: 'Intermediário' },
                  { name: 'Python', level: 'Básico' },
                  { name: 'Tailwind CSS', level: 'Avançado' },
                  { name: 'Git/GitHub', level: 'Intermediário' },
                ].map((skill, idx) => (
                  <div key={idx} className="bg-gray-800/70 rounded-md p-3">
                    <div className="font-medium text-white text-sm">{skill.name}</div>
                    <div className="text-xs text-gray-400">{skill.level}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { number: '4+', label: 'Anos de estudo' },
                { number: '5+', label: 'Projetos' },
                { number: '∞', label: 'Energéticos consumidos' },
              ].map((stat, idx) => (
                <div key={idx} className="bg-[#191919] border border-gray-700 rounded-lg p-4 text-center transition-colors duration-300">
                  <div className="text-xl sm:text-2xl font-bold text-blue-400">{stat.number}</div>
                  <div className="text-xs sm:text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Current Focus */}
            <div className="bg-[#191919] border border-gray-700 rounded-lg p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold mb-3 text-white">🎯 Foco atual</h3>
              <div className="space-y-2 text-xs sm:text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Aprendendo sobre Game Development/Design :)
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  Desenvolvendo projetos com foco em UX/UI moderno
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                  Explorando tecnologias de desenvolvimento mobile, IA e Machine Learning
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-12 sm:mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-lg p-6 sm:p-8 text-center shadow-xl">
            <h3 className="text-lg sm:text-xl font-semibold mb-3 text-white">
              💡 Vamos criar algo de valor juntos?
            </h3>
            <p className="text-white/80 mb-6 text-sm sm:text-base">
              Estou sempre aberto a novos projetos, colaborações e oportunidades de aprendizado.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 text-sm sm:text-base"
              >
                Entre em contato
              </a>
              <a
                href="#projects"
                className="bg-white/5 backdrop-blur-sm border border-white/20 text-white hover:bg-white/15 font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 text-sm sm:text-base"
              >
                Ver meus projetos
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
