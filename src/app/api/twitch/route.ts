import { NextResponse } from 'next/server'

const client_id = process.env.TWITCH_CLIENT_ID
const client_secret = process.env.TWITCH_CLIENT_SECRET
const twitch_user = process.env.TWITCH_USERNAME || 'ueivizi'

export async function GET() {
  try {
    // Verificar se as variáveis de ambiente estão definidas
    if (!client_id || !client_secret) {
      return NextResponse.json({ 
        isLive: false, 
        error: 'Twitch credentials not configured' 
      })
    }

    // Obter access token da aplicação (client credentials flow)
    const tokenResponse = await fetch('https://id.twitch.tv/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: client_id,
        client_secret: client_secret,
        grant_type: 'client_credentials',
      }),
    })

    if (!tokenResponse.ok) {
      throw new Error('Failed to get Twitch token')
    }

    const tokenData = await tokenResponse.json()
    const access_token = tokenData.access_token

    // Headers para as requisições
    const headers = {
      'Client-ID': client_id,
      'Authorization': `Bearer ${access_token}`,
    }

    // Buscar informações do usuário
    const userResponse = await fetch(`https://api.twitch.tv/helix/users?login=${twitch_user}`, {
      headers
    })

    if (!userResponse.ok) {
      throw new Error('Failed to fetch user data')
    }

    const userData = await userResponse.json()
    const user = userData.data[0]

    if (!user) {
      throw new Error('User not found')
    }

    // Verificar se está ao vivo
    const streamResponse = await fetch(`https://api.twitch.tv/helix/streams?user_login=${twitch_user}`, {
      headers
    })

    const streamData = await streamResponse.json()
    const isLive = streamData.data && streamData.data.length > 0

    // Buscar últimos vídeos
    const videosResponse = await fetch(`https://api.twitch.tv/helix/videos?user_id=${user.id}&first=3&type=archive`, {
      headers
    })

    const videosData = await videosResponse.json()

    // Buscar informações do canal
    const channelResponse = await fetch(`https://api.twitch.tv/helix/channels?broadcaster_id=${user.id}`, {
      headers
    })

    const channelData = await channelResponse.json()
    const channel = channelData.data[0]

    // Montar resposta
    const response: any = {
      // Informações básicas
      isLive,
      username: user.login,
      displayName: user.display_name,
      description: user.description,
      profileImageUrl: user.profile_image_url,
      viewCount: user.view_count,
      followerCount: user.view_count, // Twitch não fornece followers na API pública
      createdAt: user.created_at,
      
      // Informações do canal
      channelUrl: `https://twitch.tv/${twitch_user}`,
      gameCategory: channel?.game_name || 'Desenvolvimento',
      
      // Últimos vídeos
      recentVideos: videosData.data?.slice(0, 3).map((video: any) => ({
        title: video.title,
        url: video.url,
        thumbnail: video.thumbnail_url,
        duration: video.duration,
        createdAt: video.created_at,
        viewCount: video.view_count
      })) || [],
    }

    // Se está ao vivo, adicionar informações da stream
    if (isLive) {
      const stream = streamData.data[0]
      response.liveData = {
        title: stream.title,
        viewers: stream.viewer_count,
        category: stream.game_name,
        thumbnail: stream.thumbnail_url.replace('{width}', '320').replace('{height}', '180'),
        startedAt: stream.started_at,
        language: stream.language
      }
    }

    return NextResponse.json(response)

  } catch (error) {
    console.error('Twitch API Error:', error)
    return NextResponse.json({ 
      isLive: false,
      error: 'Failed to fetch Twitch data',
      message: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}
