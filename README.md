# 🚀 Portfólio GitHub Automático

Este projeto gera automaticamente um portfólio web a partir dos seus repositórios GitHub, com deploy automático no GitHub Pages.

## ✨ Funcionalidades

- 📊 **Listagem automática** de todos os seus repositórios públicos
- 🎨 **Design responsivo** e moderno
- 📈 **Estatísticas de linguagens** com gráficos visuais
- 🔄 **Atualização automática** a cada 12 horas via GitHub Actions
- 🌐 **Deploy automático** no GitHub Pages
- 🏷️ **Badges e tópicos** dos repositórios
- 🔗 **Links para demos** quando disponíveis

## 🛠️ Configuração

### 1. Configurar Secrets (Opcional)

Vá em **Settings > Secrets and variables > Actions** e adicione:

- `PORTFOLIO_GITHUB_USERNAME`: Seu username do GitHub (opcional, usa o owner do repo por padrão)
- `PORTFOLIO_GITHUB_TOKEN`: Token de acesso pessoal do GitHub (opcional, para evitar rate limits)

### 2. Ativar GitHub Pages

1. Vá em **Settings > Pages**
2. Em **Source**, selecione **GitHub Actions**
3. Salve as configurações

### 3. Executar pela primeira vez

1. Vá na aba **Actions**
2. Selecione o workflow **"Deploy GitHub Pages"**
3. Clique em **"Run workflow"**

## 🔄 Funcionamento

### Workflows Automáticos

- **Deploy GitHub Pages**: Executa a cada push na branch main
- **Atualizar Portfólio**: Executa automaticamente a cada 12 horas

### Estrutura Gerada

\`\`\`
build/
├── index.html              # Página principal
├── projects/               # Páginas individuais dos projetos
│   ├── projeto-1.html
│   └── projeto-2.html
└── assets/
    ├── css/style.css       # Estilos
    └── js/script.js        # Scripts
\`\`\`

## 🎨 Personalização

### Modificar informações pessoais

Edite o arquivo `update_catalog.js` na função `generatePortfolioIndex()` para alterar:

- Descrição pessoal
- Links de contato
- Habilidades listadas
- Informações de contato

### Personalizar design

Modifique o arquivo `assets/css/style.css` para alterar:

- Cores do tema
- Fontes
- Layout
- Animações

## 📊 Estatísticas Incluídas

- Total de projetos públicos
- Linguagens mais utilizadas
- Gráfico visual de distribuição de linguagens
- Data da última atualização de cada projeto

## 🔧 Desenvolvimento Local

\`\`\`bash
# Instalar dependências
npm install

# Gerar o portfólio
npm run build

# Servir localmente (requer Python)
npm run dev
\`\`\`

## 📝 Logs e Debugging

Os workflows do GitHub Actions incluem logs detalhados para facilitar o debugging. Verifique a aba **Actions** para acompanhar a execução.

## 🤝 Contribuição

Sinta-se à vontade para abrir issues ou pull requests para melhorar este projeto!

## 📄 Licença

MIT License - veja o arquivo LICENSE para detalhes.
