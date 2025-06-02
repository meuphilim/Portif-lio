# 🚀 Portfólio GitHub Automatizado

Um site de portfólio moderno e responsivo que gera e atualiza automaticamente a partir dos seus repositórios GitHub usando GitHub Actions e deploy no GitHub Pages. **Totalmente em português brasileiro (pt-BR)**.

## ✨ Funcionalidades

- 📊 **Listagem automática de repositórios** via API do GitHub
- 🎨 **Design responsivo** com UI/UX moderna
- 📈 **Estatísticas de linguagens** com gráficos visuais
- 🔄 **Atualizações automáticas** a cada 12 horas via GitHub Actions
- 🌐 **Deploy automático** para GitHub Pages
- 🏷️ **Exibição de badges e tópicos** dos repositórios
- 🔗 **Links para demos ao vivo** quando disponíveis
- 🛡️ **Tratamento de erros** com dados de fallback
- ⚡ **Otimizado para performance** com geração estática
- 🇧🇷 **Interface 100% em português brasileiro**

## 🌍 Internacionalização

Este projeto foi desenvolvido exclusivamente em **português brasileiro (pt-BR)**:

- ✅ **Interface do usuário** completamente traduzida
- ✅ **Comentários no código** em português
- ✅ **Documentação** em português brasileiro
- ✅ **Mensagens de sistema** em pt-BR
- ✅ **Workflows do GitHub Actions** traduzidos
- ✅ **Scripts e utilitários** em português
- ✅ **Configurações de locale** para pt-BR

### Estrutura de Tradução

\`\`\`
lib/
├── i18n.ts              # Configurações de internacionalização
└── messages/
    └── pt-BR.ts          # Mensagens em português brasileiro
\`\`\`

## 🛠️ Stack Tecnológica

- **Framework**: Next.js 14 com App Router
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS
- **Deploy**: GitHub Pages
- **CI/CD**: GitHub Actions
- **API**: GitHub REST API v3
- **Idioma**: Português Brasileiro (pt-BR)

## 🚀 Início Rápido

### 1. Clonar e Instalar

\`\`\`bash
git clone https://github.com/meuphilim/Portifolio.git
cd Portifolio
npm ci
\`\`\`

### 2. Configuração do Ambiente

\`\`\`bash
cp .env.example .env.local
# Edite .env.local com seu nome de usuário e token do GitHub
\`\`\`

### 3. Desenvolvimento Local

\`\`\`bash
npm run dev
# Abra http://localhost:3000
\`\`\`

### 4. Build e Deploy

\`\`\`bash
npm run build  # Build para produção (GitHub Pages)
\`\`\`

## ⚙️ Configuração

### Variáveis de Ambiente

| Variável | Descrição | Obrigatório |
|----------|-----------|-------------|
| `GITHUB_USERNAME` | Seu nome de usuário do GitHub | ✅ |
| `NEXT_PUBLIC_GITHUB_USERNAME` | Nome de usuário público do GitHub | ✅ |
| `GITHUB_TOKEN` | Token de Acesso Pessoal do GitHub | ⚠️ Recomendado |

### Secrets do Repositório GitHub

Configure estes nas configurações do seu repositório em **Settings > Secrets and variables > Actions**:

- `GITHUB_USERNAME`: Seu nome de usuário do GitHub
- `GITHUB_TOKEN`: Token de acesso pessoal com escopo `public_repo`

## 🔄 Workflow Automatizado

### Deploy GitHub Pages (`deploy.yml`)
- **Gatilhos**: 
  - Push para main
  - Pull requests para main
  - A cada 12 horas (agendado)
  - Manual via workflow_dispatch
- **Ações**: Build Next.js + Deploy para GitHub Pages
- **Duração**: ~3-5 minutos
- **Idioma**: Português brasileiro

## 📊 Estrutura do Projeto

\`\`\`
portfolio-github/
├── 📁 .github/workflows/     # Workflows do GitHub Actions (pt-BR)
├── 📁 app/                   # Next.js App Router
│   ├── 📁 api/              # Rotas da API (removidas para GitHub Pages)
│   ├── 📄 layout.tsx        # Layout raiz (pt-BR)
│   ├── 📄 page.tsx          # Página principal (pt-BR)
│   └── 📄 globals.css       # Estilos globais
├── 📁 lib/                   # Bibliotecas e utilitários
│   ├── 📄 i18n.ts           # Configuração de internacionalização
│   └── 📄 imageLoader.js    # Loader de imagens para export estático
├── 📁 scripts/              # Scripts utilitários (pt-BR)
├── 📁 docs/                 # Documentação (pt-BR)
├── 📄 .env.example          # Template de variáveis de ambiente
├── 📄 .gitignore           # Regras do Git ignore
├── 📄 next.config.js       # Configuração do Next.js (GitHub Pages)
├── 📄 package.json         # Dependências e scripts (pt-BR)
├── 📄 tailwind.config.js   # Configuração do Tailwind CSS
├── 📄 tsconfig.json        # Configuração do TypeScript
└── 📄 DEPLOYMENT.md        # Guia de deploy para GitHub Pages
\`\`\`

## 🔧 Desenvolvimento

### Scripts Disponíveis

\`\`\`bash
npm run dev          # Iniciar servidor de desenvolvimento
npm run build        # Build para produção (GitHub Pages)
npm run start        # Iniciar servidor de produção
npm run lint         # Executar ESLint
npm run lint:fix     # Corrigir problemas do ESLint
npm run type-check   # Executar verificação de tipos TypeScript
npm run format       # Formatar código com Prettier
npm run gerar        # Gerar portfólio estático
npm run limpar       # Limpar artefatos de build
npm test             # Executar testes
\`\`\`

### Qualidade de Código

- **ESLint**: Linting de código com regras recomendadas do Next.js
- **Prettier**: Formatação de código com estilo consistente
- **TypeScript**: Segurança de tipos e melhor experiência de desenvolvimento
- **Husky**: Git hooks para validação pré-commit
- **Comentários**: Todos em português brasileiro

## 🚀 Deploy

### Deploy Automático

O projeto faz deploy automaticamente para GitHub Pages:

1. **GitHub Pages**: Site estático em `https://meuphilim.github.io/Portifolio`

### Deploy Manual

\`\`\`bash
# Gerar site estático
npm run build

# Os arquivos serão gerados em ./out/
\`\`\`

## 🛡️ Tratamento de Erros

A aplicação inclui tratamento abrangente de erros:

- **Fallbacks da API**: Usa dados em cache quando a API do GitHub não está disponível
- **Limitação de Taxa**: Tratamento gracioso dos limites de taxa da API do GitHub
- **Resiliência de Build**: Continua o build mesmo com falhas da API
- **Feedback do Usuário**: Mensagens de erro claras e indicadores de status
- **Mensagens**: Todas em português brasileiro

## 📈 Performance

- **Geração Estática**: Páginas pré-construídas para performance otimizada
- **Otimização de Imagens**: Avatars e assets do GitHub otimizados
- **Cache**: Cache estratégico de respostas da API
- **Análise de Bundle**: Bundles JavaScript otimizados
- **Core Web Vitals**: Otimizado para métricas de performance do Google
- **Locale**: Configurado para pt-BR

## 🤝 Contribuindo

**Importante**: Todas as contribuições devem ser feitas em português brasileiro.

1. Faça um fork do repositório
2. Crie uma branch de feature (`git checkout -b feature/funcionalidade-incrivel`)
3. Commit suas mudanças (`git commit -m 'Adicionar funcionalidade incrível'`)
4. Push para a branch (`git push origin feature/funcionalidade-incrivel`)
5. Abra um Pull Request

### Diretrizes de Contribuição

- ✅ **Código**: Comentários em português brasileiro
- ✅ **Commits**: Mensagens em português
- ✅ **Pull Requests**: Descrições em português
- ✅ **Issues**: Relatórios em português
- ✅ **Documentação**: Sempre em português brasileiro

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🆘 Suporte

Se você encontrar algum problema:

1. Verifique os [logs do GitHub Actions](../../actions)
2. Verifique suas variáveis de ambiente
3. Revise a [documentação de deploy](DEPLOYMENT.md)
4. Abra uma issue **em português** com informações detalhadas

## 🙏 Agradecimentos

- [Next.js](https://nextjs.org/) pelo framework incrível
- [GitHub](https://github.com/) pela API poderosa e Actions
- [GitHub Pages](https://pages.github.com/) pelo hosting gratuito
- [Tailwind CSS](https://tailwindcss.com/) pela estilização utility-first

## 🎯 Roadmap

### Próximas Funcionalidades
- [ ] **Tema Escuro**: Implementar alternância entre temas claro e escuro
- [ ] **Analytics**: Integração com Google Analytics ou Plausible
- [ ] **Blog**: Seção de blog integrada com markdown
- [ ] **Comentários**: Sistema de comentários para projetos
- [ ] **PWA**: Transformar em Progressive Web App
- [ ] **Busca**: Funcionalidade de busca nos projetos
- [ ] **Filtros**: Filtros por linguagem, tópicos e data

### Melhorias Técnicas
- [ ] **Testes**: Implementar testes unitários e de integração
- [ ] **Storybook**: Documentação de componentes
- [ ] **Performance**: Otimizações adicionais de performance
- [ ] **Acessibilidade**: Melhorias de acessibilidade (WCAG 2.1)
- [ ] **SEO**: Otimizações avançadas de SEO
- [ ] **Monitoramento**: Integração com Sentry ou similar

## 📚 Documentação Adicional

- [Guia de Deploy](DEPLOYMENT.md)
- [Guia de Configuração](docs/CONFIGURACAO.md)
- [Guia de Contribuição](docs/CONTRIBUICAO.md)
- [Solução de Problemas](docs/SOLUCAO-PROBLEMAS.md)

## 🌟 Showcase

Veja exemplos de portfólios criados com este template:

- [Portfólio Principal](https://meuphilim.github.io/Portifolio)

## 📊 Estatísticas

![GitHub stars](https://img.shields.io/github/stars/meuphilim/Portifolio?style=social)
![GitHub forks](https://img.shields.io/github/forks/meuphilim/Portifolio?style=social)
![GitHub issues](https://img.shields.io/github/issues/meuphilim/Portifolio)
![GitHub license](https://img.shields.io/github/license/meuphilim/Portifolio)
![Idioma](https://img.shields.io/badge/Idioma-Português%20BR-green)
![Deploy](https://img.shields.io/github/deployments/meuphilim/Portifolio/github-pages?label=GitHub%20Pages)

---

<div align="center">
  <p>Feito com ❤️ por <a href="https://github.com/meuphilim">@meuphilim</a></p>
  <p>Se este projeto te ajudou, considere dar uma ⭐!</p>
  <p><strong>🇧🇷 Orgulhosamente desenvolvido em português brasileiro</strong></p>
  <p><strong>🌐 Deploy automático via GitHub Pages</strong></p>
</div>
