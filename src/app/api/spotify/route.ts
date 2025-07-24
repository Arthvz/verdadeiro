import { NextResponse } from 'next/server'

const client_id = process.env.SPOTIFY_CLIENT_ID
const client_secret = process.env.SPOTIFY_CLIENT_SECRET
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN

export async function GET() {
  try {
    // Verificar se as variáveis de ambiente estão definidas
    if (!client_id || !client_secret || !refresh_token) {
      return NextResponse.json({ 
        isPlaying: false, 
        error: 'Spotify credentials not configured' 
      })
    }

    const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64')

    // Obter novo access token usando refresh token
    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refresh_token,
      }),
    })

    if (!tokenResponse.ok) {
      throw new Error('Failed to refresh Spotify token')
    }

    const tokenData = await tokenResponse.json()
    const access_token = tokenData.access_token

    // Buscar música atual
    const playing = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })

    // Se não há música tocando ou erro
    if (playing.status === 204 || playing.status > 400) {
      return NextResponse.json({ 
        isPlaying: false,
        track: "Nenhuma música tocando",
        artist: "Spotify",
        album: "",
        imageUrl: ""
      })
    }

    const track = await playing.json()

    // Verificar se há dados válidos
    if (!track || !track.item) {
      return NextResponse.json({ 
        isPlaying: false,
        track: "Nenhuma música tocando",
        artist: "Spotify",
        album: "",
        imageUrl: ""
      })
    }

    return NextResponse.json({
      isPlaying: track.is_playing,
      track: track.item.name,
      artist: track.item.artists.map((a: any) => a.name).join(', '),
      album: track.item.album.name,
      imageUrl: track.item.album.images[0]?.url || "",
      external_url: track.item.external_urls.spotify
    })

  } catch (error) {
    console.error('Spotify API Error:', error)
    return NextResponse.json({ 
      isPlaying: false,
      track: "Erro ao conectar",
      artist: "Spotify",
      album: "",
      imageUrl: "",
      error: 'Failed to fetch Spotify data'
    })
  }
}
