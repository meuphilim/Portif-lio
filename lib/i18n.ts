// Configuração de internacionalização para pt-BR
export const locale = "pt-BR"

export const messages = {
  // Navegação
  nav: {
    about: "Sobre",
    projects: "Projetos",
    contact: "Contato",
    skills: "Habilidades",
  },

  // Seção Hero
  hero: {
    greeting: "Olá, eu sou",
    description:
      "Desenvolvedor Full Stack focado em performance, acessibilidade e soluções digitais que fazem a diferença.",
    viewProjects: "Ver Projetos",
    github: "GitHub",
  },

  // Seção de Status
  status: {
    title: "Status dos Repositórios",
    totalProjects: "Total de Projetos",
    languages: "Linguagens",
    totalStars: "Total de Estrelas",
    authenticatedApi: "Usando API autenticada do GitHub",
    fallbackData: "Usando dados de fallback",
    publicApi: "Conectado à API pública do GitHub",
  },

  // Seção de Projetos
  projects: {
    title: "Meus Projetos",
    subtitle: "Explore alguns dos meus trabalhos e contribuições open source",
    noDescription: "Nenhuma descrição disponível.",
    viewCode: "Ver Código",
    demo: "Demo",
    viewAll: "Ver Todos os Projetos",
    lastUpdate: "Última atualização",
  },

  // Seção de Contato
  contact: {
    title: "Entre em Contato",
    subtitle: "Estou sempre interessado em novas oportunidades e projetos interessantes.",
    email: "E-mail",
  },

  // Rodapé
  footer: {
    madeWith: "Feito com ❤️ e automação",
    lastUpdated: "Atualizado automaticamente via GitHub Actions • Última atualização",
  },

  // Estados de carregamento e erro
  loading: {
    portfolio: "Carregando portfólio...",
  },

  errors: {
    fetchRepos: "Não foi possível buscar os repositórios",
    apiError: "Erro da API",
  },

  // Formatação de datas
  dateFormat: {
    locale: "pt-BR",
    options: {
      year: "numeric" as const,
      month: "long" as const,
      day: "numeric" as const,
    },
  },
}

export type Messages = typeof messages
