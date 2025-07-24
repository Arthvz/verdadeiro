import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code')
  const error = searchParams.get('error')

  if (error) {
    return NextResponse.json({ error: 'Authorization denied' }, { status: 400 })
  }

  if (!code) {
    // Primeira etapa: redirecionar para autorização do Spotify
    const client_id = process.env.SPOTIFY_CLIENT_ID
    const redirect_uri = `${request.nextUrl.origin}/api/auth/callback`
    const scope = 'user-read-currently-playing user-read-playback-state'

    const authUrl = new URL('https://accounts.spotify.com/authorize')
    authUrl.searchParams.append('client_id', client_id!)
    authUrl.searchParams.append('response_type', 'code')
    authUrl.searchParams.append('redirect_uri', redirect_uri)
    authUrl.searchParams.append('scope', scope)
    authUrl.searchParams.append('show_dialog', 'true')

    return NextResponse.redirect(authUrl.toString())
  }

  // Segunda etapa: trocar código por tokens
  try {
    const client_id = process.env.SPOTIFY_CLIENT_ID
    const client_secret = process.env.SPOTIFY_CLIENT_SECRET
    const redirect_uri = `${request.nextUrl.origin}/api/auth/callback`

    const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64')

    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirect_uri,
      }),
    })

    const data = await response.json()

    if (response.ok) {
      return NextResponse.json({
        success: true,
        message: 'Autorização bem-sucedida! Copie o refresh_token abaixo e adicione no seu .env.local',
        refresh_token: data.refresh_token,
        access_token: data.access_token,
        instructions: [
          '1. Copie o refresh_token acima',
          '2. Cole no arquivo .env.local na variável SPOTIFY_REFRESH_TOKEN',
          '3. Reinicie o servidor (npm run dev)',
          '4. Sua página de links agora mostrará sua música atual do Spotify!'
        ]
      })
    } else {
      return NextResponse.json({ error: 'Failed to get tokens', details: data }, { status: 400 })
    }
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
