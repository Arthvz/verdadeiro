'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Header from '@/components/header'
import Link from 'next/link'
import { 
  Github, 
  Linkedin, 
  FileText, 
  ExternalLink, 
  Music, 
  Video,
  Globe,
  Play,
  Pause
} from 'lucide-react'
import { FaSpotify, FaTwitch } from 'react-icons/fa'

export default function Linktree() {
  const [isDark, setIsDark] = useState(false)
  const [spotifyData, setSpotifyData] = useState({
    isPlaying: false,
    track: "Carregando...",
    artist: "Spotify",
    album: "",
    imageUrl: ""
  })
  const [twitchData, setTwitchData] = useState<any>({
    isLive: false,
    displayName: "Carregando...",
    profileImageUrl: "",
    recentVideos: [],
    channelUrl: "",
    viewCount: 0,
    liveData: null
  })

  // Detectar tema
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

  // Buscar dados do Spotify
  useEffect(() => {
    const fetchSpotifyData = async () => {
      try {
        const response = await fetch('/api/spotify')
        const data = await response.json()
        setSpotifyData(data)
      } catch (error) {
        console.error('Erro ao buscar dados do Spotify:', error)
        setSpotifyData({
          isPlaying: false,
          track: "Erro ao conectar",
          artist: "Spotify",
          album: "",
          imageUrl: ""
        })
      }
    }

    fetchSpotifyData()
    // Atualizar a cada 30 segundos
    const interval = setInterval(fetchSpotifyData, 30000)
    return () => clearInterval(interval)
  }, [])

  // Buscar dados da Twitch
  useEffect(() => {
    const fetchTwitchData = async () => {
      try {
        const response = await fetch('/api/twitch')
        const data = await response.json()
        setTwitchData(data)
      } catch (error) {
        console.error('Erro ao buscar dados da Twitch:', error)
        setTwitchData({
          isLive: false,
          displayName: "Erro ao conectar",
          profileImageUrl: "",
          recentVideos: [],
          channelUrl: "",
          viewCount: 0,
          liveData: null
        })
      }
    }

    fetchTwitchData()
    // Atualizar a cada 60 segundos
    const interval = setInterval(fetchTwitchData, 60000)
    return () => clearInterval(interval)
  }, [])

  const links = [
    { 
      title: 'Portfólio', 
      url: '/', 
      icon: Globe,
      description: 'Conheça meus projetos',
      color: 'from-blue-500 to-purple-600'
    },
    { 
      title: 'GitHub', 
      url: 'https://github.com/Arthvz', 
      icon: Github,
      description: 'Meus repositórios',
      color: 'from-gray-600 to-gray-800'
    },
    { 
      title: 'LinkedIn', 
      url: 'https://linkedin.com/in/arthur-verdadeiro', 
      icon: Linkedin,
      description: 'Vamos nos conectar',
      color: 'from-blue-600 to-blue-800'
    },
    { 
      title: 'Currículo', 
      url: 'https://drive.google.com/file/d/1ve2iUGdWDTfWAA0E5tFGQBsuHWQFy8AD/view?usp=sharing', 
      icon: FileText,
      description: 'Download PDF',
      color: 'from-green-500 to-green-700'
    },
  ]

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      <Header />
      
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="container mx-auto px-4 py-24 max-w-2xl">
        {/* Header Section */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative inline-block mb-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-1">
              <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                <span className="text-2xl font-bold bg-gradient-to-br from-blue-500 to-purple-600 bg-clip-text text-transparent">
                  AV
                </span>
              </div>
            </div>
            <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-background"></div>
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-foreground">
            Arthur Verdadeiro
          </h1>
          <p className="text-muted-foreground">
            Desenvolvedor • Estudante • Criador de experiências digitais
          </p>
        </motion.div>

        {/* Spotify Section */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center gap-4">
              <FaSpotify className="text-3xl" />
              <div className="flex-1">
                <p className="text-sm opacity-90 mb-1">
                  {spotifyData.isPlaying ? 'Tocando agora' : 'Última música'}
                </p>
                <h3 className="font-bold text-lg">{spotifyData.track}</h3>
                <p className="text-sm opacity-90">{spotifyData.artist}</p>
              </div>
              <div className="flex items-center gap-2">
                {spotifyData.isPlaying ? (
                  <Pause className="w-6 h-6" />
                ) : (
                  <Play className="w-6 h-6" />
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Twitch Section */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className={`bg-gradient-to-r ${twitchData.isLive ? 'from-purple-500 to-purple-600' : 'from-gray-600 to-gray-700'} rounded-2xl p-6 text-white shadow-lg`}>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <FaTwitch className="text-3xl" />
                {twitchData.profileImageUrl && (
                  <img 
                    src={twitchData.profileImageUrl} 
                    alt="Profile" 
                    className="w-12 h-12 rounded-full border-2 border-white/20"
                  />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm opacity-90">
                    {twitchData.isLive ? 'AO VIVO' : 'OFFLINE'}
                  </p>
                  {twitchData.isLive && (
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  )}
                </div>
                <h3 className="font-bold text-lg">
                  {twitchData.isLive && twitchData.liveData ? 
                    twitchData.liveData.title : 
                    twitchData.displayName || 'Próxima live em breve'
                  }
                </h3>
                <p className="text-sm opacity-90">
                  {twitchData.isLive && twitchData.liveData ? 
                    `${twitchData.liveData.viewers} viewers • ${twitchData.liveData.category}` : 
                    `${twitchData.viewCount} views totais`
                  }
                </p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Video className="w-6 h-6" />
                {twitchData.channelUrl && (
                  <Link 
                    href={twitchData.channelUrl} 
                    target="_blank"
                    className="text-xs bg-white/20 px-2 py-1 rounded hover:bg-white/30 transition"
                  >
                    Ver Canal
                  </Link>
                )}
              </div>
            </div>
            
            {/* Últimos vídeos - mostrar apenas se não estiver ao vivo */}
            {!twitchData.isLive && twitchData.recentVideos && twitchData.recentVideos.length > 0 && (
              <div className="mt-4 pt-4 border-t border-white/20">
                <p className="text-sm opacity-90 mb-2">Últimos vídeos:</p>
                <div className="space-y-2">
                  {twitchData.recentVideos.slice(0, 2).map((video: any, index: number) => (
                    <Link 
                      key={index}
                      href={video.url} 
                      target="_blank"
                      className="block text-sm bg-white/10 rounded p-2 hover:bg-white/20 transition"
                    >
                      <div className="font-medium truncate">{video.title}</div>
                      <div className="text-xs opacity-75">{video.viewCount} views</div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Links Section */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {links.map((link, i) => {
            const Icon = link.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
              >
                <Link
                  href={link.url}
                  target="_blank"
                  className="group block w-full"
                >
                  <div className="relative overflow-hidden rounded-2xl bg-card border border-border hover:border-border/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
                    <div className={`absolute inset-0 bg-gradient-to-r ${link.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                    
                    <div className="relative p-6 flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${link.color} flex items-center justify-center text-white shadow-lg`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-foreground group-hover:text-foreground/90 transition-colors">
                          {link.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {link.description}
                        </p>
                      </div>
                      
                      <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Footer */}
        <motion.div
          className="text-center mt-12 pt-8 border-t border-border"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="mb-4">
            <Link 
              href="/config" 
              className="text-xs text-muted-foreground hover:text-foreground transition-colors underline"
            >
              ⚙️ Configurar APIs (Spotify & Twitch)
            </Link>
          </div>
          <p className="text-sm text-muted-foreground">
            Feito com ❤️ por Arthur Verdadeiro
          </p>
        </motion.div>
      </div>
    </main>
  )
}
