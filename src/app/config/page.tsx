import Link from 'next/link'

export default function ConfigPage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-foreground">
          🔧 Configuração das APIs - Spotify & Twitch
        </h1>

        <div className="space-y-8">
          {/* Spotify Setup */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-green-600 flex items-center gap-2">
              🎵 Configuração do Spotify
            </h2>
            
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded">
                <h3 className="font-bold mb-2">Passo 1: Criar App no Spotify</h3>
                <ol className="list-decimal list-inside space-y-1 text-sm">
                  <li>Acesse: <Link href="https://developer.spotify.com/dashboard" target="_blank" className="text-blue-500 underline">https://developer.spotify.com/dashboard</Link></li>
                  <li>Faça login e clique em "Create an App"</li>
                  <li>Nome: "Arthur Portfolio Links"</li>
                  <li>Descrição: "Portfolio links page integration"</li>
                  <li>Website: "http://localhost:3000"</li>
                  <li>Redirect URI: "http://localhost:3000/api/auth/callback"</li>
                  <li>Copie o <strong>Client ID</strong> e <strong>Client Secret</strong></li>
                </ol>
              </div>

              <div className="bg-muted p-4 rounded">
                <h3 className="font-bold mb-2">Passo 2: Configurar .env.local</h3>
                <p className="text-sm mb-2">Cole o Client ID e Client Secret no arquivo .env.local:</p>
                <pre className="bg-black text-green-400 p-2 rounded text-xs overflow-x-auto">
{`SPOTIFY_CLIENT_ID=seu_client_id_aqui
SPOTIFY_CLIENT_SECRET=seu_client_secret_aqui`}
                </pre>
              </div>

              <div className="bg-muted p-4 rounded">
                <h3 className="font-bold mb-2">Passo 3: Obter Refresh Token</h3>
                <p className="text-sm mb-2">Após configurar as variáveis acima, siga o processo de autorização:</p>
                <div className="flex gap-2">
                  <Link 
                    href="/spotify-auth" 
                    className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                  >
                    🔐 Configurar Spotify
                  </Link>
                  <Link 
                    href="/api/auth/callback" 
                    className="inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                  >
                    ⚡ Autorização Rápida
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Twitch Setup */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-purple-600 flex items-center gap-2">
              🎮 Configuração da Twitch
            </h2>
            
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded">
                <h3 className="font-bold mb-2">Passo 1: Criar App na Twitch</h3>
                <ol className="list-decimal list-inside space-y-1 text-sm">
                  <li>Acesse: <Link href="https://dev.twitch.tv/console" target="_blank" className="text-blue-500 underline">https://dev.twitch.tv/console</Link></li>
                  <li>Faça login e clique em "Register Your Application"</li>
                  <li>Name: "Arthur Portfolio"</li>
                  <li>OAuth Redirect URLs: "http://localhost:3000"</li>
                  <li>Category: "Website Integration"</li>
                  <li>Copie o <strong>Client ID</strong> e <strong>Client Secret</strong></li>
                </ol>
              </div>

              <div className="bg-muted p-4 rounded">
                <h3 className="font-bold mb-2">Passo 2: Configurar .env.local</h3>
                <p className="text-sm mb-2">Adicione no arquivo .env.local:</p>
                <pre className="bg-black text-purple-400 p-2 rounded text-xs overflow-x-auto">
{`TWITCH_CLIENT_ID=seu_client_id_aqui
TWITCH_CLIENT_SECRET=seu_client_secret_aqui
TWITCH_USERNAME=seu_nome_de_usuario_twitch`}
                </pre>
              </div>
            </div>
          </div>

          {/* Teste */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-blue-600">
              🧪 Testar Configurações
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link 
                href="/api/spotify" 
                target="_blank"
                className="bg-green-600 text-white p-4 rounded text-center hover:bg-green-700 transition"
              >
                Testar API Spotify
              </Link>
              <Link 
                href="/api/twitch" 
                target="_blank"
                className="bg-purple-600 text-white p-4 rounded text-center hover:bg-purple-700 transition"
              >
                Testar API Twitch
              </Link>
            </div>
          </div>

          {/* Voltar */}
          <div className="text-center">
            <Link 
              href="/links" 
              className="inline-block bg-foreground text-background px-6 py-3 rounded hover:opacity-80 transition"
            >
              ← Voltar para Links
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
