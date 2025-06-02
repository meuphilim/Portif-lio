# 🚀 Portfólio GitHub Automatizado

Um site de portfólio moderno e responsivo que gera e atualiza automaticamente a partir dos seus repositórios GitHub usando pipelines de CI/CD. **Totalmente em português brasileiro (pt-BR)**.

## ✨ Funcionalidades

- 📊 **Listagem automática de repositórios** via API do GitHub
- 🎨 **Design responsivo** com UI/UX moderna
- 📈 **Estatísticas de linguagens** com gráficos visuais
- 🔄 **Atualizações automáticas** a cada 12 horas via GitHub Actions
- 🌐 **Deploy duplo** para GitHub Pages e Vercel
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

```
lib/
├── i18n.ts              # Configurações de internacionalização
└── messages/
    └── pt-BR.ts          # Mensagens em português brasileiro
```

## 🛠️ Stack Tecnológica

- **Framework**: Next.js 14 com App Router
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS
- **Deploy**: Vercel + GitHub Pages
- **CI/CD**: GitHub Actions
- **API**: GitHub REST API v3
- **Idioma**: Português Brasileiro (pt-BR)

## 🚀 Início Rápido

### 1. Clonar e Instalar

```bash
git clone https://github.com/seuusuario/portfolio-github.git
cd portfolio-github
npm ci
```

### 2. Configuração do Ambiente

```bash
cp .env.example .env.local
# Edite .env.local com seu nome de usuário e token do GitHub
```

### 3. Desenvolvimento Local

```bash
npm run dev
# Abra http://localhost:3000
```

### 4. Build e Deploy

```bash
npm run build  # Build para produção
npm run start  # Iniciar servidor de produção
```

## ⚙️ Configuração

### Variáveis de Ambiente

| Variável | Descrição | Obrigatório |
|----------|-----------|-------------|
| `GITHUB_USERNAME` | Seu nome de usuário do GitHub | ✅ |
| `NEXT_PUBLIC_GITHUB_USERNAME` | Nome de usuário público do GitHub | ✅ |
| `GITHUB_TOKEN` | Token de Acesso Pessoal do GitHub | ⚠️ Recomendado |
| `VERCEL_TOKEN` | Token de deploy do Vercel | 🔧 Para CI/CD |
| `VERCEL_ORG_ID` | ID da organização Vercel | 🔧 Para CI/CD |
| `VERCEL_PROJECT_ID` | ID do projeto Vercel | 🔧 Para CI/CD |

### Secrets do Repositório GitHub

Configure estes nas configurações do seu repositório em **Settings > Secrets and variables > Actions**:

- `GITHUB_TOKEN`: Token de acesso pessoal com escopo `public_repo`
- `VERCEL_TOKEN`: Token da API do Vercel
- `VERCEL_ORG_ID`: ID da sua organização Vercel
- `VERCEL_PROJECT_ID`: ID do seu projeto Vercel

## 🔄 Workflows Automatizados

### 1. Integração Contínua (`ci.yml`)
- **Gatilhos**: Push para main/develop, Pull requests
- **Ações**: Lint, verificação de tipos, validação de build, testes
- **Duração**: ~3-5 minutos
- **Idioma**: Português brasileiro

### 2. Deploy Vercel (`deploy-vercel.yml`)
- **Gatilhos**: Push para main (excluindo docs)
- **Ações**: Build e deploy para produção Vercel
- **Duração**: ~2-3 minutos
- **Idioma**: Português brasileiro

### 3. Atualizações Agendadas (`scheduled-update.yml`)
- **Gatilhos**: A cada 12 horas (00:00, 12:00 UTC)
- **Ações**: Atualizar dados do portfólio, deploy para GitHub Pages
- **Duração**: ~2-3 minutos
- **Idioma**: Português brasileiro

## 📊 Estrutura do Projeto

```
portfolio-github/
├── 📁 .github/workflows/     # Workflows do GitHub Actions (pt-BR)
├── 📁 app/                   # Next.js App Router
│   ├── 📁 api/              # Rotas da API (pt-BR)
│   ├── 📄 layout.tsx        # Layout raiz (pt-BR)
│   ├── 📄 page.tsx          # Página principal (pt-BR)
│   └── 📄 globals.css       # Estilos globais
├── 📁 lib/                   # Bibliotecas e utilitários
│   ├── 📄 i18n.ts           # Configuração de internacionalização
│   └── 📁 messages/         # Mensagens traduzidas
├── 📁 scripts/              # Scripts utilitários (pt-BR)
├── 📁 docs/                 # Documentação (pt-BR)
├── 📄 .env.example          # Template de variáveis de ambiente
├── 📄 .gitignore           # Regras do Git ignore
├── 📄 next.config.js       # Configuração do Next.js
├── 📄 package.json         # Dependências e scripts (pt-BR)
├── 📄 tailwind.config.js   # Configuração do Tailwind CSS
├── 📄 tsconfig.json        # Configuração do TypeScript
└── 📄 vercel.json          # Configuração de deploy Vercel
```

## 🔧 Desenvolvimento

### Scripts Disponíveis

```bash
npm run dev          # Iniciar servidor de desenvolvimento
npm run build        # Build para produção
npm run start        # Iniciar servidor de produção
npm run lint         # Executar ESLint
npm run lint:fix     # Corrigir problemas do ESLint
npm run type-check   # Executar verificação de tipos TypeScript
npm run format       # Formatar código com Prettier
npm run gerar        # Gerar portfólio estático
npm run limpar       # Limpar artefatos de build
npm test             # Executar testes
```

### Qualidade de Código

- **ESLint**: Linting de código com regras recomendadas do Next.js
- **Prettier**: Formatação de código com estilo consistente
- **TypeScript**: Segurança de tipos e melhor experiência de desenvolvimento
- **Husky**: Git hooks para validação pré-commit
- **Comentários**: Todos em português brasileiro

## 🚀 Deploy

### Deploy Automático

O projeto faz deploy automaticamente para ambas as plataformas:

1. **GitHub Pages**: Site estático em `https://seuusuario.github.io/portfolio-github`
2. **Vercel**: Site dinâmico em `https://portfolio-github-seuusuario.vercel.app`

### Deploy Manual

```bash
# Deploy para Vercel
npx vercel --prod

# Gerar site estático
npm run gerar
```

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
3. Revise os [logs de deploy do Vercel](https://vercel.com/dashboard)
4. Abra uma issue **em português** com informações detalhadas

## 🙏 Agradecimentos

- [Next.js](https://nextjs.org/) pelo framework incrível
- [Vercel](https://vercel.com/) pelo deploy sem complicações
- [GitHub](https://github.com/) pela API poderosa e Actions
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

- [Guia de Configuração](docs/CONFIGURACAO.md)
- [Guia de Deploy](docs/DEPLOYMENT.md)
- [Guia de Contribuição](docs/CONTRIBUICAO.md)
- [Solução de Problemas](docs/SOLUCAO-PROBLEMAS.md)
- [Referência da API](docs/API.md)

## 🌟 Showcase

Veja exemplos de portfólios criados com este template:

- [Exemplo 1](https://portfolio-exemplo1.vercel.app)
- [Exemplo 2](https://portfolio-exemplo2.vercel.app)
- [Exemplo 3](https://portfolio-exemplo3.vercel.app)

## 📊 Estatísticas

![GitHub stars](https://img.shields.io/github/stars/seuusuario/portfolio-github?style=social)
![GitHub forks](https://img.shields.io/github/forks/seuusuario/portfolio-github?style=social)
![GitHub issues](https://img.shields.io/github/issues/seuusuario/portfolio-github)
![GitHub license](https://img.shields.io/github/license/seuusuario/portfolio-github)
![Idioma](https://img.shields.io/badge/Idioma-Português%20BR-green)

---

<div align="center">
  <p>Feito com ❤️ por <a href="https://github.com/meuphilim">@meuphilim</a></p>
  <p>Se este projeto te ajudou, considere dar uma ⭐!</p>
  <p><strong>🇧🇷 Orgulhosamente desenvolvido em português brasileiro</strong></p>
</div>
