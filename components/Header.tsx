"use client"

interface HeaderProps {
  username: string
}

export default function Header({ username }: HeaderProps) {
  return (
    <header className="bg-blue-600 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold">{username}</h1>
        <nav className="space-x-6 hidden md:flex">
          <a href="#about" className="hover:text-blue-200 transition">
            Sobre
          </a>
          <a href="#projects" className="hover:text-blue-200 transition">
            Projetos
          </a>
          <a href="#skills" className="hover:text-blue-200 transition">
            Habilidades
          </a>
          <a href="#contact" className="hover:text-blue-200 transition">
            Contato
          </a>
        </nav>
      </div>
    </header>
  )
}
