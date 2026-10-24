// App — raiz da aplicação.
// Versão de fundação: o layout completo (header, rotas, footer) chega nos
// próximos commits; esta versão existe para validar o build inicial.
export function App() {
  return (
    <div className="flex min-h-screen flex-col bg-canvas text-ink">
      <main className="grid flex-1 place-items-center p-8">
        <h1 className="font-display text-3xl font-bold tracking-tight">ONE G STUDIO</h1>
      </main>
    </div>
  )
}
