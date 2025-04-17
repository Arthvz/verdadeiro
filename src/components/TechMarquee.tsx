'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import clsx from 'clsx'
import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiNodedotjs,
  SiPython,
  SiFramer,
  SiVercel,
  SiFigma,
  SiGithub,
  SiGit,
  SiDotnet,
  SiMysql,
  SiMongodb,
} from 'react-icons/si'

const techItems = [
  { name: 'React', icon: SiReact, link: 'https://reactjs.org' },
  { name: 'Next.js', icon: SiNextdotjs, link: 'https://nextjs.org' },
  { name: 'TailwindCSS', icon: SiTailwindcss, link: 'https://tailwindcss.com' },
  { name: 'TypeScript', icon: SiTypescript, link: 'https://www.typescriptlang.org' },
  { name: 'Node.js', icon: SiNodedotjs, link: 'https://nodejs.org' },
  { name: 'Python', icon: SiPython, link: 'https://python.org' },
  { name: 'Framer Motion', icon: SiFramer, link: 'https://www.framer.com/motion/' },
  { name: 'Vercel', icon: SiVercel, link: 'https://vercel.com' },
  { name: 'Figma', icon: SiFigma, link: 'https://figma.com' },
  { name: 'GitHub', icon: SiGithub, link: 'https://github.com' },
  { name: 'Git', icon: SiGit, link: 'https://git-scm.com' },
  { name: 'C#/.NET', icon: SiDotnet, link: 'https://docs.microsoft.com/dotnet' },
  { name: 'SQL (MySQL)', icon: SiMysql, link: 'https://www.mysql.com' },
  { name: 'NoSQL (MongoDB)', icon: SiMongodb, link: 'https://www.mongodb.com' },
]

const TechMarqueeIcons = () => {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const updateTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'))
    }
    updateTheme()
    const obs = new MutationObserver(updateTheme)
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => obs.disconnect()
  }, [])

  // Duplicate array to allow seamless scroll
  const marqueeItems = [...techItems, ...techItems]

  return (
    <div className="max-w-screen-2xl mx-auto relative overflow-hidden py-8">
      <motion.div
        className="flex items-center gap-8 whitespace-nowrap"
        style={{ willChange: 'transform' }}
        animate={{ x: ['0%', '-50%'] }}
        transition={{ repeat: Infinity, ease: 'linear', duration: 20 }}
      >
        {marqueeItems.map((tech, idx) => {
          const Icon = tech.icon
          return (
            <a
              key={idx}
              href={tech.link}
              target="_blank"
              rel="noopener noreferrer"
              className={clsx(
                'flex-shrink-0 text-4xl md:text-5xl transition-transform hover:scale-110',
                isDark ? 'text-white' : 'text-gray-800'
              )}
              title={tech.name}
            >
              <Icon />
            </a>
          )
        })}
      </motion.div>
    </div>
  )
}

export default TechMarqueeIcons
