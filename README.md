# 🚀 Gerador de Portfólio Automático

Este projeto gera automaticamente um portfólio web estático profissional a partir dos seus repositórios GitHub, otimizado para deploy no Vercel.

## ✨ Características

- 🎨 Design responsivo e moderno
- 📱 Compatível com dispositivos móveis
- 🔄 Atualização automática dos projetos
- 📊 Estatísticas visuais de linguagens
- 🌐 Deploy automático no Vercel
- ⚡ Geração rápida e eficiente
- 🔒 Variáveis de ambiente seguras

## 🛠️ Como Usar

### 1. Deploy no Vercel (Recomendado)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/seu-usuario/portfolio-generator)

1. Clique no botão "Deploy with Vercel" acima
2. Conecte sua conta GitHub
3. Configure as variáveis de ambiente:
   - `GITHUB_USERNAME`: Seu nome de usuário do GitHub
   - `GITHUB_TOKEN`: Token de acesso pessoal do GitHub (opcional, mas recomendado)
   - `VERCEL`: Será configurado automaticamente como `1`

### 2. Configuração Local

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/portfolio-generator.git
cd portfolio-generator

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite o arquivo .env com suas informações
```

### 3. Executar Localmente

```bash
# Gerar o portfólio
npm run build

# Ou para desenvolvimento local com servidor
npm run dev
```

## 🌐 Acesso ao Portfólio

Após o deploy no Vercel, seu portfólio estará disponível em:

- **Página Principal**: `https://seu-projeto.vercel.app/`
- **Projetos Individuais**: `https://seu-projeto.vercel.app/projects/nome-do-projeto`
- **Assets**: `https://seu-projeto.vercel.app/assets/css/style.css`

## 📁 Estrutura do Projeto

```
portfolio-generator/
├── api/                    # API Routes do Vercel
│   ├── generate.js        # Endpoint principal
│   ├── assets/[...path].js # Servir CSS/JS
│   └── projects/[slug].js  # Páginas de projetos
├── assets/                # Assets estáticos
│   ├── css/style.css      # Estilos principais
│   └── js/script.js       # JavaScript
├── docs/                  # Templates
│   └── project-model.html # Template para projetos
├── update_catalog.js      # Script principal
├── vercel.json           # Configuração do Vercel
└── package.json
```

## 🎨 Personalização

### Modificar o Visual

1. **CSS**: Edite `assets/css/style.css` para personalizar cores, fontes e layout
2. **Templates**: Modifique `docs/project-model.html` para alterar o layout das páginas de projeto
3. **JavaScript**: Adicione interatividade em `assets/js/script.js`

### Variáveis CSS Disponíveis

```css
:root {
  --primary-color: #007bff;      /* Cor principal */
  --secondary-color: #6c757d;    /* Cor secundária */
  --accent-color: #28a745;       /* Cor de destaque */
  --background-color: #f8f9fa;   /* Fundo da página */
  --card-background: #ffffff;    /* Fundo dos cards */
  --text-color: #343a40;         /* Cor do texto */
  --border-color: #e9ecef;       /* Cor das bordas */
}
```

## 🔧 Configuração Avançada

### Token do GitHub

Para evitar rate limits da API do GitHub, configure um token de acesso pessoal:

1. Vá para [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
2. Gere um novo token com permissões de leitura de repositórios públicos
3. Adicione o token como variável de ambiente `GITHUB_TOKEN`

### Filtros de Repositórios

O sistema automaticamente filtra:
- ❌ Repositórios privados
- ❌ Forks
- ❌ Repositórios arquivados
- ❌ Repositórios que começam com "."

## 📊 Funcionalidades

- **Geração Automática**: Busca todos os seus repositórios públicos
- **Cache Inteligente**: Cache de 10 minutos para otimizar chamadas à API
- **Estatísticas Visuais**: Gráfico de barras com linguagens mais utilizadas
- **Design Responsivo**: Funciona perfeitamente em desktop e mobile
- **SEO Otimizado**: Meta tags e estrutura HTML semântica
- **Performance**: Carregamento rápido e otimizado

## 🚀 Deploy e Atualizações

O portfólio é regenerado automaticamente a cada deploy no Vercel. Para forçar uma atualização:

1. Faça um commit no repositório
2. O Vercel fará o redeploy automaticamente
3. Ou use o botão "Redeploy" no dashboard do Vercel

## 📋 Requisitos

- Node.js 18+
- Conta no GitHub
- Conta no Vercel (gratuita)
- Token GitHub (opcional, mas recomendado)

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

MIT License - veja o arquivo LICENSE para detalhes.

## 🆘 Suporte

Se você encontrar problemas:

1. Verifique se as variáveis de ambiente estão configuradas corretamente
2. Confirme que seu token GitHub tem as permissões necessárias
3. Verifique os logs no dashboard do Vercel
4. Abra uma issue no repositório do projeto

---

**Feito com ❤️ e automação**
