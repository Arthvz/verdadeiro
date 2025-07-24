import Link from 'next/link'

export default function TestPage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-foreground">
          🧪 Testar APIs - Spotify & Twitch
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Teste Spotify */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-green-600 flex items-center gap-2">
              🎵 Teste Spotify API
            </h2>
            
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Teste se sua integração com o Spotify está funcionando corretamente.
              </p>
              
              <div className="bg-muted p-4 rounded">
                <h3 className="font-bold mb-2">Verificações:</h3>
                <ul className="text-sm space-y-1">
                  <li>✓ Client ID configurado</li>
                  <li>✓ Client Secret configurado</li>
                  <li>✓ Refresh Token obtido</li>
                  <li>✓ API funcionando</li>
                </ul>
              </div>
              
              <div className="flex flex-col gap-2">
                <Link 
                  href="/api/spotify" 
                  target="_blank"
                  className="bg-green-600 text-white p-3 rounded text-center hover:bg-green-700 transition"
                >
                  🔗 Testar API Spotify
                </Link>
                
                <Link 
                  href="/spotify-auth" 
                  className="bg-green-500 text-white p-3 rounded text-center hover:bg-green-600 transition"
                >
                  ⚙️ Configurar Spotify
                </Link>
              </div>
            </div>
          </div>

          {/* Teste Twitch */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-purple-600 flex items-center gap-2">
              🎮 Teste Twitch API
            </h2>
            
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Teste se sua integração com a Twitch está funcionando corretamente.
              </p>
              
              <div className="bg-muted p-4 rounded">
                <h3 className="font-bold mb-2">Verificações:</h3>
                <ul className="text-sm space-y-1">
                  <li>✓ Client ID configurado</li>
                  <li>✓ Client Secret configurado</li>
                  <li>✓ Username configurado</li>
                  <li>✓ API funcionando</li>
                </ul>
              </div>
              
              <div className="flex flex-col gap-2">
                <Link 
                  href="/api/twitch" 
                  target="_blank"
                  className="bg-purple-600 text-white p-3 rounded text-center hover:bg-purple-700 transition"
                >
                  🔗 Testar API Twitch
                </Link>
                
                <Link 
                  href="https://dev.twitch.tv/console" 
                  target="_blank"
                  className="bg-purple-500 text-white p-3 rounded text-center hover:bg-purple-600 transition"
                >
                  ⚙️ Twitch Developer Console
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Resultados dos Testes */}
        <div className="mt-8 bg-card border border-border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">
            📊 Como Interpretar os Resultados
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-green-600 mb-2">✅ Spotify - Sucesso</h3>
              <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded text-sm">
                <p><strong>Se funcionando:</strong></p>
                <ul className="list-disc list-inside space-y-1">
                  <li>isPlaying: true/false</li>
                  <li>track: "Nome da música"</li>
                  <li>artist: "Nome do artista"</li>
                  <li>imageUrl: URL da capa</li>
                </ul>
              </div>
            </div>
            
            <div>
              <h3 className="font-bold text-purple-600 mb-2">✅ Twitch - Sucesso</h3>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded text-sm">
                <p><strong>Se funcionando:</strong></p>
                <ul className="list-disc list-inside space-y-1">
                  <li>isLive: true/false</li>
                  <li>displayName: "Seu nome"</li>
                  <li>profileImageUrl: URL da foto</li>
                  <li>recentVideos: Array de vídeos</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 p-4 rounded">
            <h3 className="font-bold text-red-600 mb-2">❌ Possíveis Erros</h3>
            <ul className="text-sm space-y-1">
              <li><strong>Spotify:</strong> "credentials not configured" = Variáveis faltando no .env.local</li>
              <li><strong>Spotify:</strong> "Failed to refresh token" = Refresh token inválido</li>
              <li><strong>Twitch:</strong> "User not found" = Username incorreto</li>
              <li><strong>Twitch:</strong> "Failed to get token" = Client ID/Secret incorretos</li>
            </ul>
          </div>
        </div>

        {/* Links de Navegação */}
        <div className="mt-8 text-center space-x-4">
          <Link 
            href="/config" 
            className="inline-block bg-foreground text-background px-6 py-3 rounded hover:opacity-80 transition"
          >
            ← Voltar para Configurações
          </Link>
          
          <Link 
            href="/links" 
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
          >
            Ver Página de Links →
          </Link>
        </div>
      </div>
    </div>
  )
}
