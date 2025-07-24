'use client'
import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Moon, SquareArrowUpRight, Sun, Menu } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { motion, AnimatePresence } from 'framer-motion'

const Header: React.FC = () => {
  const [isDark, setIsDark] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [showHeader, setShowHeader] = useState(true)
  const lastScrollY = useRef(0)

  // Detectar mobile
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Detectar rolagem para mostrar/ocultar o header
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        setShowHeader(false)
      } else {
        setShowHeader(true)
      }
      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Persistência do tema
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setIsDark(savedTheme === 'dark')
    }
  }, [])

  useEffect(() => {
    const theme = isDark ? 'dark' : 'light'
    localStorage.setItem('theme', theme)
    document.documentElement.classList.toggle('dark', isDark)
    document.documentElement.classList.toggle('light', !isDark)
  }, [isDark])

  const toggleTheme = () => {
    setIsDark((prev) => !prev)
  }

  return (
    <AnimatePresence>
      {showHeader && (
        <motion.header
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-background border-b border-border transition-colors duration-500"
        >
          {/* Transição suave no fundo ao trocar tema */}
          <motion.div
            key={isDark ? 'dark' : 'light'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="transition duration-500"
          >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 items-center py-3 sm:py-4">
                {/* Left: Theme toggle (desktop) */}
                <div className="flex justify-start items-center gap-2 mb-3 md:mb-0">
                  {!isMobile && (
                    <>
                      <Switch
                        id="theme-toggle"
                        onClick={toggleTheme}
                        checked={isDark}
                      />
                      <Label htmlFor="theme-toggle" className="font-secondary text-sm sm:text-base">
                        Activate {isDark ? <Sun className="w-4 h-4 sm:w-5 sm:h-5" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5" />}
                      </Label>
                    </>
                  )}
                </div>

                {/* Center: Logo */}
                <div className="text-center">
                  <a href="/">
                    <h1 className="text-2xl sm:text-3xl font-secondary font-bold m-0">VERDADEIRO</h1>
                    <p className="text-lg sm:text-xl font-bold m-0">ARTHUR VERDADEIRO</p>
                  </a>
                </div>

                {/* Right: Links ou Drawer */}
                <div className="flex justify-end items-center">
                  {isMobile ? (
                    <Drawer>
                      <DrawerTrigger>
                        <Menu className="w-6 h-6 sm:w-8 sm:h-8" />
                      </DrawerTrigger>
                      <DrawerContent className="p-4">
                        <motion.div
                          initial={{ y: 100, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: 100, opacity: 0 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        >
                          <DrawerHeader>
                            <DrawerTitle className="text-lg mb-4">Menu</DrawerTitle>
                            <div className="flex flex-col gap-4">
                              <Link
                                href="/links"
                                className="text-lg font-bold flex gap-1 items-center"
                              >
                                links <SquareArrowUpRight />
                              </Link>
                              <Link
                                href="https://drive.google.com/file/d/1ve2iUGdWDTfWAA0E5tFGQBsuHWQFy8AD/view?usp=sharing"
                                target="_blank"
                                className="text-lg font-bold flex gap-1 items-center"
                              >
                                resume <SquareArrowUpRight />
                              </Link>
                              <div className="flex items-center gap-2 pt-4">
                                <Switch
                                  id="theme-toggle-mobile"
                                  onClick={toggleTheme}
                                  checked={isDark}
                                />
                                <Label htmlFor="theme-toggle-mobile">
                                  Activate {isDark ? <Sun /> : <Moon />}
                                </Label>
                              </div>
                            </div>
                          </DrawerHeader>
                        </motion.div>
                      </DrawerContent>
                    </Drawer>
                  ) : (
                    <div className="flex gap-8 md:gap-16">
                      <Link
                        href="/links"
                        className="text-xl font-bold flex gap-1 items-center"
                      >
                        links <SquareArrowUpRight />
                      </Link>
                      <Link
                        href="https://drive.google.com/file/d/1ve2iUGdWDTfWAA0E5tFGQBsuHWQFy8AD/view?usp=sharing"
                        target="_blank"
                        className="text-xl font-bold flex gap-1 items-center"
                      >
                        resume <SquareArrowUpRight />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.header>
      )}
    </AnimatePresence>
  )
}

export default Header
