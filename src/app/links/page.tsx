import Link from 'next/link'

export default function Linktree() {
  const links = [
    { title: 'Portfólio', url: '/' },
    { title: 'GitHub', url: 'https://github.com/Arthvz' },
    { title: 'LinkedIn', url: 'https://linkedin.com/in/arthur-verdadeiro' },
    { title: 'Currículo', url: 'https://drive.google.com/file/d/1ve2iUGdWDTfWAA0E5tFGQBsuHWQFy8AD/view?usp=sharing' },
  ]

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 px-6 py-20">
      <h1 className="text-3xl font-bold mb-6">Arthur Verdadeiro</h1>
      <div className="flex flex-col gap-4 w-full max-w-sm">
        {links.map((link, i) => (
          <Link
            key={i}
            href={link.url}
            target="_blank"
            className="w-full text-center border rounded-lg py-3 text-lg font-medium hover:bg-muted transition"
          >
            {link.title}
          </Link>
        ))}
      </div>
    </main>
  )
}
