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
    imageUrl: "",
    external_url: ""
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
          imageUrl: "",
          external_url: ""
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

  const workLinks = [
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

  const socialLinks = [
    { 
      title: 'Instagram', 
      url: 'https://instagram.com/arthurverdadeiro', 
      icon: () => (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
      description: 'Se quiser ver eu bonito 😎',
      color: 'from-pink-500 to-purple-600'
    }
  ]

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      <Header />
      
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="container mx-auto px-4 py-36 max-w-2xl">
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

        {/* Trabalho Section */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center">
              <span className="text-white font-bold text-sm">💼</span>
            </div>
            <h2 className="text-2xl font-bold text-foreground">Trabalho</h2>
          </div>
          
          <div className="space-y-4">
            {workLinks.map((link, i) => {
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
          </div>
        </motion.div>

        {/* Social Section */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">🌟</span>
            </div>
            <h2 className="text-2xl font-bold text-foreground">Social</h2>
          </div>

          <div className="space-y-4">
            {/* Spotify */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg">
                <div className="flex items-start gap-4">
                  {/* Imagem da música ou ícone do Spotify */}
                  <div className="flex-shrink-0">
                    {spotifyData.imageUrl ? (
                      <img 
                        src={spotifyData.imageUrl} 
                        alt="Album Cover" 
                        className="w-16 h-16 rounded-lg shadow-lg"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-black/20 rounded-lg flex items-center justify-center">
                        <FaSpotify className="text-2xl" />
                      </div>
                    )}
                  </div>
                  
                  {/* Informações da música */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <FaSpotify className="text-lg flex-shrink-0" />
                      <p className="text-sm opacity-90 truncate">
                        {spotifyData.isPlaying ? 'Ouvindo Spotify' : 'Spotify'}
                      </p>
                      {spotifyData.isPlaying && (
                        <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse flex-shrink-0"></div>
                      )}
                    </div>
                    
                    <h3 className="font-bold text-lg leading-tight mb-1 truncate">
                      {spotifyData.track}
                    </h3>
                    
                    <p className="text-sm opacity-90 mb-3 truncate">
                      por {spotifyData.artist}
                    </p>
                    
                    {spotifyData.album && (
                      <p className="text-xs opacity-75 mb-3 truncate">
                        em {spotifyData.album}
                      </p>
                    )}
                    
                    {/* Botão para ouvir no Spotify */}
                    {spotifyData.external_url && (
                      <a 
                        href={spotifyData.external_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-black/20 hover:bg-black/30 px-4 py-2 rounded-lg transition text-sm font-medium"
                      >
                        <Play className="w-4 h-4" />
                        Ouvir no Spotify
                      </a>
                    )}
                  </div>
                  
                  {/* Ícone de status */}
                  <div className="flex-shrink-0">
                    {spotifyData.isPlaying ? (
                      <div className="w-8 h-8 bg-black/20 rounded-full flex items-center justify-center">
                        <Pause className="w-4 h-4" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 bg-black/20 rounded-full flex items-center justify-center">
                        <Play className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Twitch */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
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
                  <a href="https://twitch.tv/ueivizi" target="_blank" rel="noopener noreferrer">
                    <div className="flex flex-col items-center gap-2">
                      <Video className="w-6 h-6" />
                      <p className="text-xs opacity-90">Ver canal</p>
                    </div>
                  </a>
                </div>
                
                {/* Últimos vídeos - mostrar apenas se não estiver ao vivo */}
                {!twitchData.isLive && twitchData.recentVideos && twitchData.recentVideos.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-white/20">
                    <p className="text-sm opacity-90 mb-2">Últimos vídeos:</p>
                    <div className="space-y-2">
                      {twitchData.recentVideos.slice(0, 2).map((video: any, index: number) => (
                        <a 
                          key={index}
                          href={video.url} 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-sm bg-white/10 rounded p-2 hover:bg-white/20 transition"
                        >
                          <div className="font-medium truncate">{video.title}</div>
                          <div className="text-xs opacity-75">{video.viewCount} views</div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Instagram */}
            {socialLinks.map((link, i) => {
              const Icon = link.icon
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.9 + i * 0.1 }}
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
                          <Icon />
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
          </div>
        </motion.div>
      </div>
    </main>
  )
}
