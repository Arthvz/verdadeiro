'use client'

import React, { useState, useEffect } from 'react'
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

const NavigationToggle = () => {
    const [activeSection, setActiveSection] = useState<'about' | 'projects'>('about')
    const [isVisible, setIsVisible] = useState(false)
    const [hasMounted, setHasMounted] = useState(false)

    const handleChange = (section: 'about' | 'projects') => {
        setActiveSection(section)
        document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        setHasMounted(true)

        const handleResize = () => {
            setIsVisible(window.innerWidth > 1280)
        }

        handleResize() // define imediatamente com base no tamanho atual
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    if (!hasMounted || !isVisible) return null

    return (
        <div className="fixed top-1/2 left-36 -translate-y-1/2 z-50 space-y-4">
            <div className="flex items-center gap-2">
                <Checkbox
                    checked={activeSection === 'about'}
                    onCheckedChange={() => handleChange('about')}
                    className="w-5 h-5 accent-black dark:accent-white"
                />
                <Label
                    className="cursor-pointer text-sm font-bold"
                    onClick={() => handleChange('about')}
                >
                    ABOUT
                </Label>
            </div>
            <div className="flex items-center gap-2">
                <Checkbox
                    checked={activeSection === 'projects'}
                    onCheckedChange={() => handleChange('projects')}
                    className="w-5 h-5 accent-black dark:accent-white"
                />
                <Label
                    className="cursor-pointer text-sm font-bold"
                    onClick={() => handleChange('projects')}
                >
                    PROJECTS
                </Label>
            </div>
        </div>
    )
}

export default NavigationToggle