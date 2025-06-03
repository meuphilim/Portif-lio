'use client';

import { useState } from 'react';

interface HeaderProps {
  username: string;
  scrollToSection?: (section: string) => void;
}

export default function Header({ username, scrollToSection }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleScroll = (section: string) => {
    if (scrollToSection) {
      scrollToSection(section);
    } else {
      // Fallback para scroll padrão
      const element = document.querySelector(section);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
    // Fecha menu mobile após click
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed w-full bg-white/90 backdrop-blur-sm z-50 shadow-sm">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo/Nome */}
        <button 
          onClick={() => handleScroll('#home')} 
          className="flex items-center space-x-3 hover:scale-105 transition-transform duration-300"
        >
          <img 
            src="/portifolio/apple-touch-icon.png" 
            alt="Logo" 
            className="w-8 h-8 rounded-lg shadow-sm"
          />
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            {username.toUpperCase()}
          </span>
        </button>

        {/* Menu Desktop */}
        <nav className="hidden md:flex space-x-8">
          <button 
            onClick={() => handleScroll('#home')} 
            className="text-gray-700 hover:text-blue-500 font-medium transition-colors duration-300"
          >
            Início
          </button>
          <button 
            onClick={() => handleScroll('#skills')} 
            className="text-gray-700 hover:text-blue-500 font-medium transition-colors duration-300"
          >
            Habilidades
          </button>
          <button 
            onClick={() => handleScroll('#projects')} 
            className="text-gray-700 hover:text-blue-500 font-medium transition-colors duration-300"
          >
            Projetos
          </button>
          <button 
            onClick={() => handleScroll('#about')} 
            className="text-gray-700 hover:text-blue-500 font-medium transition-colors duration-300"
          >
            Sobre
          </button>
          <button 
            onClick={() => handleScroll('#contact')} 
            className="text-gray-700 hover:text-blue-500 font-medium transition-colors duration-300"
          >
            Contato
          </button>
        </nav>

        {/* Botão CTA Desktop */}
        <button 
          onClick={() => handleScroll('#contact')}
          className="hidden md:block px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all duration-300"
        >
          Vamos conversar
        </button>

        {/* Botão Menu Mobile */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-gray-700 hover:text-blue-500 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      {/* Menu Mobile */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-sm py-4 px-6 shadow-lg border-t">
          <div className="flex flex-col space-y-4">
            <button 
              onClick={() => handleScroll('#home')} 
              className="text-gray-700 hover:text-blue-500 font-medium text-left py-2 transition-colors duration-300"
            >
              Início
            </button>
            <button 
              onClick={() => handleScroll('#skills')} 
              className="text-gray-700 hover:text-blue-500 font-medium text-left py-2 transition-colors duration-300"
            >
              Habilidades
            </button>
            <button 
              onClick={() => handleScroll('#projects')} 
              className="text-gray-700 hover:text-blue-500 font-medium text-left py-2 transition-colors duration-300"
            >
              Projetos
            </button>
            <button 
              onClick={() => handleScroll('#about')} 
              className="text-gray-700 hover:text-blue-500 font-medium text-left py-2 transition-colors duration-300"
            >
              Sobre
            </button>
            <button 
              onClick={() => handleScroll('#contact')} 
              className="text-gray-700 hover:text-blue-500 font-medium text-left py-2 transition-colors duration-300"
            >
              Contato
            </button>
            <button 
              onClick={() => handleScroll('#contact')}
              className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-medium text-center hover:shadow-lg transition-all duration-300"
            >
              Vamos conversar
            </button>
          </div>
        </div>
      )}
    </header>
  );
}