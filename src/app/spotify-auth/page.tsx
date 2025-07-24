import Link from 'next/link'

export default function SpotifyAuthPage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-foreground">
          🎵 Configuração do Spotify
        </h1>

        <div className="space-y-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-green-600">
              Passo a Passo para Configurar o Spotify
            </h2>
            
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded">
                <h3 className="font-bold mb-2">1. Criar App no Spotify</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Acesse: <Link href="https://developer.spotify.com/dashboard" target="_blank" className="text-blue-500 underline">Spotify Developer Dashboard</Link></li>
                  <li>Faça login e clique em <strong>"Create an App"</strong></li>
                  <li>Nome: "Arthur Portfolio"</li>
                  <li>Descrição: "Portfolio integration"</li>
                  <li>Website: <code>http://localhost:3000</code></li>
                  <li>Redirect URI: <code>http://localhost:3000/api/auth/callback</code></li>
                  <li>Copie o <strong>Client ID</strong> e <strong>Client Secret</strong></li>
                </ul>
              </div>

              <div className="bg-muted p-4 rounded">
                <h3 className="font-bold mb-2">2. Adicione as Credenciais no .env.local</h3>
                <p className="text-sm mb-2">Cole no arquivo .env.local:</p>
                <pre className="bg-black text-green-400 p-2 rounded text-xs">
{`SPOTIFY_CLIENT_ID=seu_client_id_aqui
SPOTIFY_CLIENT_SECRET=seu_client_secret_aqui`}
                </pre>
              </div>

              <div className="bg-muted p-4 rounded">
                <h3 className="font-bold mb-2">3. Autorizar e Obter Refresh Token</h3>
                <p className="text-sm mb-4">
                  Após configurar o Client ID e Secret, clique no botão abaixo para autorizar sua conta Spotify:
                </p>
                
                <Link 
                  href="/api/auth/callback" 
                  className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-medium"
                >
                  🔐 Autorizar Spotify e Obter Token
                </Link>
                
                <p className="text-xs text-muted-foreground mt-2">
                  Isso vai redirecionar você para o Spotify para fazer login e depois mostrar o refresh token
                </p>
              </div>

              <div className="bg-yellow-100 dark:bg-yellow-900/20 border border-yellow-300 dark:border-yellow-700 p-4 rounded">
                <h3 className="font-bold mb-2 text-yellow-800 dark:text-yellow-200">⚠️ Importante</h3>
                <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                  <li>• Certifique-se de que o Redirect URI está EXATAMENTE como especificado</li>
                  <li>• Depois de obter o refresh token, adicione ele no .env.local</li>
                  <li>• Reinicie o servidor após configurar todas as variáveis</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">
              🧪 Testar Configuração
            </h2>
            
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Depois de configurar tudo, você pode testar se está funcionando:
              </p>
              
              <div className="flex gap-4">
                <Link 
                  href="/api/spotify" 
                  target="_blank"
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition text-sm"
                >
                  Testar API Spotify
                </Link>
                
                <Link 
                  href="/links" 
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm"
                >
                  Ver Página de Links
                </Link>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link 
              href="/config" 
              className="text-muted-foreground hover:text-foreground transition underline"
            >
              ← Voltar para Configurações
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
