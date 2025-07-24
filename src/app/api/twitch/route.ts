import { NextResponse } from 'next/server'

const client_id = process.env.TWITCH_CLIENT_ID
const client_secret = process.env.TWITCH_CLIENT_SECRET
const twitch_user = process.env.TWITCH_USERNAME || 'arthvz' // Seu nome de usuário na Twitch

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

    // Verificar se está ao vivo
    const streamResponse = await fetch(`https://api.twitch.tv/helix/streams?user_login=${twitch_user}`, {
      headers: {
        'Client-ID': client_id,
        'Authorization': `Bearer ${access_token}`,
      },
    })

    if (!streamResponse.ok) {
      throw new Error('Failed to fetch Twitch stream data')
    }

    const streamData = await streamResponse.json()

    // Se há dados de stream, significa que está ao vivo
    if (streamData.data && streamData.data.length > 0) {
      const stream = streamData.data[0]
      return NextResponse.json({
        isLive: true,
        title: stream.title,
        viewers: stream.viewer_count,
        category: stream.game_name,
        thumbnail: stream.thumbnail_url.replace('{width}', '320').replace('{height}', '180'),
        started_at: stream.started_at,
        channel_url: `https://twitch.tv/${twitch_user}`
      })
    }

    // Não está ao vivo
    return NextResponse.json({ 
      isLive: false,
      title: "Próxima live em breve",
      viewers: 0,
      category: "Desenvolvimento ao vivo",
      channel_url: `https://twitch.tv/${twitch_user}`
    })

  } catch (error) {
    console.error('Twitch API Error:', error)
    return NextResponse.json({ 
      isLive: false,
      title: "Erro ao conectar",
      viewers: 0,
      category: "Twitch",
      error: 'Failed to fetch Twitch data'
    })
  }
}
