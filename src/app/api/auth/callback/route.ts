import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code')
  const error = searchParams.get('error')

  if (error) {
    return new Response(`
      <html>
        <head><title>Erro de Autorização</title></head>
        <body style="font-family: Arial; padding: 40px; text-align: center;">
          <h1 style="color: red;">❌ Erro de Autorização</h1>
          <p>Você negou a autorização do Spotify.</p>
          <a href="/spotify-auth" style="color: blue;">Tentar novamente</a>
        </body>
      </html>
    `, { headers: { 'Content-Type': 'text/html' } })
  }

  if (!code) {
    // Primeira etapa: redirecionar para autorização do Spotify
    const client_id = process.env.SPOTIFY_CLIENT_ID
    
    if (!client_id) {
      return new Response(`
        <html>
          <head><title>Configuração Faltando</title></head>
          <body style="font-family: Arial; padding: 40px; text-align: center;">
            <h1 style="color: red;">❌ SPOTIFY_CLIENT_ID não configurado</h1>
            <p>Adicione SPOTIFY_CLIENT_ID no arquivo .env.local</p>
            <a href="/config" style="color: blue;">Voltar para configurações</a>
          </body>
        </html>
      `, { headers: { 'Content-Type': 'text/html' } })
    }
    
    const redirect_uri = `${request.nextUrl.origin}/api/auth/callback`
    const scope = 'user-read-currently-playing user-read-playback-state'

    const authUrl = new URL('https://accounts.spotify.com/authorize')
    authUrl.searchParams.append('client_id', client_id)
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
    
    if (!client_id || !client_secret) {
      throw new Error('SPOTIFY_CLIENT_ID ou SPOTIFY_CLIENT_SECRET não configurados')
    }
    
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
      return new Response(`
        <html>
          <head>
            <title>✅ Spotify Autorizado com Sucesso!</title>
            <meta charset="UTF-8">
          </head>
          <body style="font-family: Arial; padding: 40px; max-width: 800px; margin: 0 auto;">
            <h1 style="color: green; text-align: center;">🎵 Spotify Autorizado com Sucesso!</h1>
            
            <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h2>📋 Seu Refresh Token:</h2>
              <textarea readonly style="width: 100%; height: 60px; font-family: monospace; padding: 10px; border: 1px solid #ccc; border-radius: 4px;">${data.refresh_token}</textarea>
              <button onclick="copyToken()" style="margin-top: 10px; padding: 10px 20px; background: green; color: white; border: none; border-radius: 4px; cursor: pointer;">📋 Copiar Token</button>
            </div>
            
            <div style="background: #e7f3ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3>🔧 Próximos Passos:</h3>
              <ol>
                <li>Copie o refresh token acima</li>
                <li>Abra o arquivo <code>.env.local</code> na raiz do projeto</li>
                <li>Cole o token na variável: <code>SPOTIFY_REFRESH_TOKEN=seu_token_aqui</code></li>
                <li>Reinicie o servidor: <code>npm run dev</code></li>
                <li>Acesse <a href="/links" style="color: blue;">/links</a> para ver funcionando!</li>
              </ol>
            </div>
            
            <div style="text-align: center; margin-top: 30px;">
              <a href="/links" style="background: blue; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block;">
                🔗 Ver Página de Links
              </a>
            </div>
            
            <script>
              function copyToken() {
                const textarea = document.querySelector('textarea');
                textarea.select();
                document.execCommand('copy');
                alert('Token copiado para a área de transferência!');
              }
            </script>
          </body>
        </html>
      `, { headers: { 'Content-Type': 'text/html' } })
    } else {
      throw new Error(`Spotify API Error: ${JSON.stringify(data)}`)
    }
  } catch (error) {
    return new Response(`
      <html>
        <head><title>Erro</title></head>
        <body style="font-family: Arial; padding: 40px; text-align: center;">
          <h1 style="color: red;">❌ Erro ao obter tokens</h1>
          <p>Erro: ${error instanceof Error ? error.message : 'Erro desconhecido'}</p>
          <a href="/spotify-auth" style="color: blue;">Tentar novamente</a>
        </body>
      </html>
    `, { headers: { 'Content-Type': 'text/html' } })
  }
}
