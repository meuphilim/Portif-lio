interface FooterProps {
  username: string;
}

export default function Footer({ username }: FooterProps) {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">{username}</h3>
            <p className="text-gray-400">
              Desenvolvedor Full Stack apaixonado por criar soluções inovadoras.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  Sobre
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-white transition-colors">
                  Projetos
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-white transition-colors">
                  Habilidades
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Contato
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Redes Sociais</h3>
            <div className="flex space-x-4">
              <a
                href={`https://github.com/${username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                GitHub
              </a>
              <a
                href={`https://linkedin.com/in/${username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} {username}. Feito com ❤️ e automação.
          </p>
          <p className="text-sm mt-2">Atualizado automaticamente via GitHub Actions</p>
        </div>
      </div>
    </footer>
  );
}
