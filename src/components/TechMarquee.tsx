'use client'

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
import { Marquee } from './magicui/marquee'

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

  return (
    <div className="max-w-screen-2xl mx-auto relative overflow-hidden py-6 sm:py-8">
      <Marquee pauseOnHover repeat={4} className="gap-6 sm:gap-8">
        {techItems.map((tech, idx) => {
          const Icon = tech.icon
          return (
            <a
              key={tech.name}
              href={tech.link}
              target="_blank"
              rel="noopener noreferrer"
              className={clsx(
                'flex-shrink-0 text-3xl sm:text-4xl md:text-5xl transition-transform hover:scale-110',
                isDark ? 'text-white' : 'text-gray-800'
              )}
              title={tech.name}
            >
              <Icon />
            </a>
          )
        })}
      </Marquee>
    </div>
  )
}

export default TechMarqueeIcons
