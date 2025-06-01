import fs from "fs/promises"
import path from "path"
import { fileURLToPath } from "url"
import slugify from "slugify"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// No início do arquivo, após as importações, adicione uma verificação mais robusta:

// Verificar se estamos no ambiente Vercel
const isVercel = process.env.VERCEL === "1" || process.env.VERCEL === "true"
const ROOT_DIR = isVercel ? "/tmp" : __dirname

// Caminhos para o site do portfólio gerado
const BUILD_DIR = isVercel ? "/tmp/build" : path.join(ROOT_DIR, "build")
const BUILD_INDEX_HTML_PATH = path.join(BUILD_DIR, "index.html")
const BUILD_PROJECTS_DIR = path.join(BUILD_DIR, "projects")
const BUILD_ASSETS_CSS_DIR = path.join(BUILD_DIR, "assets", "css")
const BUILD_ASSETS_JS_DIR = path.join(BUILD_DIR, "assets", "js")
const BUILD_ASSETS_IMAGES_DIR = path.join(BUILD_DIR, "assets", "images")

// Caminhos para templates e assets
const PROJECT_MODEL_HTML_PATH = isVercel
  ? path.join(__dirname, "docs", "project-model.html")
  : path.join(ROOT_DIR, "docs", "project-model.html")
const ASSETS_CSS_PATH = isVercel
  ? path.join(__dirname, "assets", "css", "style.css")
  : path.join(ROOT_DIR, "assets", "css", "style.css")
const ASSETS_JS_PATH = isVercel
  ? path.join(__dirname, "assets", "js", "script.js")
  : path.join(ROOT_DIR, "assets", "js", "script.js")

// Cache
const CACHE_DIR = isVercel ? "/tmp/.cache" : path.join(ROOT_DIR, ".cache")
const CACHE_FILE = path.join(CACHE_DIR, "repos.json")

// API
const API_BASE = "https://api.github.com"
const REPOS_PER_PAGE = 100

// Variáveis de ambiente
const GITHUB_USERNAME = process.env.GITHUB_USERNAME
const GITHUB_TOKEN = process.env.GITHUB_TOKEN

// Emojis para linguagens
const languageEmojis = {
  JavaScript: "🟨",
  TypeScript: "🔷",
  Python: "🐍",
  Java: "☕",
  "C++": "⚡",
  C: "🔧",
  "C#": "💜",
  PHP: "🐘",
  Ruby: "💎",
  Go: "🐹",
  Rust: "🦀",
  Swift: "🍎",
  Kotlin: "🎯",
  Dart: "🎯",
  HTML: "🌐",
  CSS: "🎨",
  Shell: "🐚",
  PowerShell: "💙",
  Dockerfile: "🐳",
  Vue: "💚",
  React: "⚛️",
  Angular: "🅰️",
  default: "📄",
}

// Cores para linguagens (hex sem #)
const languageColors = {
  JavaScript: "f1e05a",
  TypeScript: "2b7489",
  Python: "3572A5",
  Java: "b07219",
  "C++": "f34b7d",
  C: "555555",
  "C#": "239120",
  PHP: "4F5D95",
  Ruby: "701516",
  Go: "00ADD8",
  Rust: "dea584",
  Swift: "ffac45",
  Kotlin: "F18E33",
  Dart: "00B4AB",
  HTML: "e34c26",
  CSS: "1572B6",
  Shell: "89e051",
  PowerShell: "012456",
  Vue: "4FC08D",
  React: "61DAFB",
  Angular: "DD0031",
  default: "586069",
}

function getLanguageColor(language) {
  return languageColors[language] || languageColors.default
}

/**
 * Sanitiza strings para serem usadas em HTML
 */
function sanitizeHtml(text) {
  if (!text) return ""
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

async function createDirectories() {
  try {
    await Promise.all([
      fs.mkdir(CACHE_DIR, { recursive: true }),
      fs.mkdir(BUILD_DIR, { recursive: true }),
      fs.mkdir(BUILD_PROJECTS_DIR, { recursive: true }),
      fs.mkdir(BUILD_ASSETS_CSS_DIR, { recursive: true }),
      fs.mkdir(BUILD_ASSETS_JS_DIR, { recursive: true }),
      fs.mkdir(BUILD_ASSETS_IMAGES_DIR, { recursive: true }),
      fs.mkdir(path.join(ROOT_DIR, "docs"), { recursive: true }),
      fs.mkdir(path.join(ROOT_DIR, "assets", "css"), { recursive: true }),
      fs.mkdir(path.join(ROOT_DIR, "assets", "js"), { recursive: true }),
    ])
    console.log("📁 Diretórios criados com sucesso")
  } catch (error) {
    console.error("❌ Erro ao criar diretórios:", error.message)
    throw error
  }
}

async function copyStaticAssets() {
  console.log("📂 Copiando assets estáticos...")
  try {
    // Verificar se os arquivos existem antes de copiar
    try {
      await fs.access(ASSETS_CSS_PATH)
      await fs.copyFile(ASSETS_CSS_PATH, path.join(BUILD_ASSETS_CSS_DIR, "style.css"))
    } catch {
      console.warn("⚠️ Arquivo CSS não encontrado, criando um básico...")
      await createDefaultCSS()
    }

    try {
      await fs.access(ASSETS_JS_PATH)
      await fs.copyFile(ASSETS_JS_PATH, path.join(BUILD_ASSETS_JS_DIR, "script.js"))
    } catch {
      console.warn("⚠️ Arquivo JS não encontrado, criando um básico...")
      await createDefaultJS()
    }

    console.log("✅ Assets copiados com sucesso.")
  } catch (error) {
    console.warn("⚠️ Aviso: Erro ao copiar assets:", error.message)
  }
}

async function createDefaultCSS() {
  const defaultCSS = `/* CSS básico gerado automaticamente */
:root {
  --primary-color: #007bff;
  --secondary-color: #6c757d;
  --background-color: #f8f9fa;
  --card-background: #ffffff;
  --text-color: #343a40;
  --border-color: #e9ecef;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
  color: var(--text-color);
  background-color: var(--background-color);
  margin: 0;
  padding: 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

header {
  background-color: var(--primary-color);
  color: white;
  padding: 1rem 0;
}

.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.project-card {
  background: var(--card-background);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.btn {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  margin-right: 0.5rem;
}

.btn-primary {
  background-color: var(--primary-color);
  color: white;
}

.btn-secondary {
  background-color: var(--secondary-color);
  color: white;
}`

  await fs.writeFile(path.join(BUILD_ASSETS_CSS_DIR, "style.css"), defaultCSS)
}

async function createDefaultJS() {
  const defaultJS = `// JavaScript básico gerado automaticamente
document.addEventListener('DOMContentLoaded', () => {
  console.log('Portfólio carregado!');
  
  // Rolagem suave para links internos
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});`

  await fs.writeFile(path.join(BUILD_ASSETS_JS_DIR, "script.js"), defaultJS)
}

async function fetchRepositories() {
  console.log(`🔍 Buscando repositórios de @${GITHUB_USERNAME}...`)

  // Verificar cache
  try {
    const cacheStats = await fs.stat(CACHE_FILE)
    const cacheAge = Date.now() - cacheStats.mtime.getTime()
    const cacheMaxAge = 10 * 60 * 1000 // 10 minutos

    if (cacheAge < cacheMaxAge) {
      console.log("📦 Usando cache de repositórios...")
      const cachedData = await fs.readFile(CACHE_FILE, "utf8")
      return JSON.parse(cachedData)
    }
  } catch {
    // Cache não existe ou é inválido
  }

  const headers = {
    "User-Agent": `${GITHUB_USERNAME}-portfolio-generator`,
    Accept: "application/vnd.github.v3+json",
  }

  if (GITHUB_TOKEN) {
    headers.Authorization = `token ${GITHUB_TOKEN}`
  }

  let allRepos = []
  let page = 1

  try {
    while (true) {
      const url = `${API_BASE}/users/${GITHUB_USERNAME}/repos?per_page=${REPOS_PER_PAGE}&page=${page}&sort=updated`
      const response = await fetch(url, { headers })

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status} ${response.statusText}`)
      }

      const repos = await response.json()
      if (repos.length === 0) break

      allRepos = allRepos.concat(repos)
      page++

      if (repos.length < REPOS_PER_PAGE) break
    }

    // Salvar no cache
    await fs.writeFile(CACHE_FILE, JSON.stringify(allRepos, null, 2))
    console.log(`✅ ${allRepos.length} repositórios encontrados`)
    return allRepos
  } catch (error) {
    console.error("❌ Erro ao buscar repositórios:", error.message)
    throw error
  }
}

function filterRepositories(repos) {
  return repos.filter((repo) => {
    if (repo.fork) return false
    if (repo.archived) return false
    if (repo.private) return false
    if (!repo.name || repo.name.startsWith(".")) return false
    return true
  })
}

function generateProjectCardsHtml(repos) {
  if (repos.length === 0) {
    return `
<div class="no-projects">
  <h3>🔍 Nenhum projeto encontrado</h3>
  <p><em>Os projetos aparecerão aqui assim que forem detectados pelo script.</em></p>
</div>`
  }

  let cardsHtml = ""
  for (const repo of repos) {
    const name = sanitizeHtml(repo.name)
    const description = repo.description ? sanitizeHtml(repo.description) : "Sem descrição disponível."
    const lang = repo.language || "N/A"
    const languageDisplay = `${languageEmojis[lang] || languageEmojis.default} ${sanitizeHtml(lang)}`
    const updatedAt = new Date(repo.updated_at).toLocaleDateString("pt-BR")
    const docFileName = slugify(name, { lower: true, strict: true })

    const topicsBadges =
      repo.topics && repo.topics.length > 0
        ? repo.topics.map((topic) => `<span class="badge topic-badge">${sanitizeHtml(topic)}</span>`).join(" ")
        : ""

    const demoLink = repo.homepage
      ? `<a href="${repo.homepage}" target="_blank" class="btn btn-secondary">🌐 Demo ao Vivo</a>`
      : ""

    cardsHtml += `
    <div class="project-card">
        <h3 class="project-title"><a href="./projects/${docFileName}.html">${name}</a></h3>
        <p class="project-description">${description}</p>
        <div class="project-meta">
            <span class="language">${languageDisplay}</span>
            <div class="topics">${topicsBadges}</div>
        </div>
        <div class="project-actions">
            <a href="${repo.html_url}" target="_blank" class="btn btn-primary">Ver Código</a>
            ${demoLink}
        </div>
        <small class="project-updated">Última atualização: ${updatedAt}</small>
    </div>`
  }
  return cardsHtml
}

function generateLanguageStatsHtml(repos) {
  const languageCounts = {}
  const totalRepos = repos.length

  repos.forEach((repo) => {
    const lang = repo.language || "Outros"
    languageCounts[lang] = (languageCounts[lang] || 0) + 1
  })

  const sortedLanguages = Object.entries(languageCounts).sort(([, countA], [, countB]) => countB - countA)

  let statsHtml = '<div class="language-bar-container">'

  // Gerar a barra de progresso visual
  statsHtml += '<div class="language-bar">'
  sortedLanguages.forEach(([lang, count]) => {
    const percentage = (count / totalRepos) * 100
    const color = getLanguageColor(lang)
    statsHtml += `<div class="language-segment" style="width: ${percentage}%; background-color: #${color};" title="${lang}: ${percentage.toFixed(1)}%"></div>`
  })
  statsHtml += "</div>"

  // Gerar a lista de linguagens com porcentagens
  statsHtml += '<ul class="language-details">'
  sortedLanguages.forEach(([lang, count]) => {
    const percentage = (count / totalRepos) * 100
    statsHtml += `<li><span class="language-color-box" style="background-color: #${getLanguageColor(lang)};"></span>${sanitizeHtml(lang)} ${percentage.toFixed(1)}%</li>`
  })
  statsHtml += "</ul>"

  statsHtml += "</div>"

  return statsHtml
}

async function generatePortfolioIndex(repos) {
  console.log("📝 Gerando index.html do portfólio...")

  const indexTemplateHtml = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Meu Portfólio - ${GITHUB_USERNAME}</title>
    <link rel="stylesheet" href="./assets/css/style.css">
    <link rel="icon" href="https://github.githubassets.com/favicons/favicon.png">
</head>
<body>
    <header>
        <div class="container">
            <h1><a href="index.html">Meu Portfólio</a></h1>
            <nav>
                <ul>
                    <li><a href="#about">Sobre Mim</a></li>
                    <li><a href="#projects">Projetos</a></li>
                    <li><a href="#skills">Habilidades</a></li>
                    <li><a href="#contact">Contato</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <main class="container">
        <section id="about" class="hero-section">
            <div class="profile-intro">
                <img src="https://github.com/${GITHUB_USERNAME}.png?size=200" alt="Foto de Perfil de ${GITHUB_USERNAME}" class="profile-pic">
                <h2>Olá, eu sou ${GITHUB_USERNAME}!</h2>
                <p>Sou um desenvolvedor apaixonado por criar soluções inovadoras. Este portfólio apresenta alguns dos meus projetos e habilidades.</p>
                <div class="social-links">
                    <a href="https://github.com/${GITHUB_USERNAME}" target="_blank">GitHub</a>
                </div>
            </div>
        </section>

        <section id="projects" class="projects-section">
            <h2>🚀 Meus Projetos Recentes</h2>
            <p class="section-description">Explore alguns dos meus trabalhos e contribuições de código aberto.</p>
            <div class="project-grid">
                ${generateProjectCardsHtml(repos)}
            </div>
            <div class="stats-section">
                <h3>📈 Estatísticas do Portfólio</h3>
                <div class="stats-badges">
                    <img src="https://img.shields.io/badge/Total_de_Projetos-${repos.length}-blue?style=for-the-badge" alt="Total de Projetos">
                    <img src="https://img.shields.io/badge/Linguagens-${new Set(repos.map((repo) => repo.language).filter(Boolean)).size}-orange?style=for-the-badge" alt="Linguagens">
                </div>
                <div class="language-stats">
                    <h3>Linguagens Mais Utilizadas</h3>
                    ${generateLanguageStatsHtml(repos)}
                </div>
            </div>
        </section>

        <section id="skills" class="skills-section">
            <h2>🛠️ Minhas Habilidades</h2>
            <div class="skills-grid">
                <span class="skill-badge">JavaScript</span>
                <span class="skill-badge">TypeScript</span>
                <span class="skill-badge">React</span>
                <span class="skill-badge">Node.js</span>
                <span class="skill-badge">HTML5</span>
                <span class="skill-badge">CSS3</span>
                <span class="skill-badge">Git</span>
                <span class="skill-badge">Docker</span>
            </div>
        </section>

        <section id="contact" class="contact-section">
            <h2>📬 Contato</h2>
            <p>Sinta-se à vontade para entrar em contato comigo!</p>
            <ul>
                <li><strong>Email:</strong> seu.email@example.com</li>
                <li><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/seu-linkedin" target="_blank">Seu Perfil no LinkedIn</a></li>
                <li><strong>GitHub:</strong> <a href="https://github.com/${GITHUB_USERNAME}" target="_blank">github.com/${GITHUB_USERNAME}</a></li>
            </ul>
        </section>
    </main>

    <footer>
        <div class="container">
            <p>&copy; ${new Date().getFullYear()} ${GITHUB_USERNAME}. Feito com ❤️ e automação.</p>
        </div>
    </footer>
    <script src="./assets/js/script.js"></script>
</body>
</html>`

  await fs.writeFile(BUILD_INDEX_HTML_PATH, indexTemplateHtml)
  console.log("✅ index.html do portfólio gerado com sucesso.")
}

async function generateDocumentation(repos) {
  console.log("📋 Gerando documentação HTML para cada projeto...")

  let projectModelHtml = ""
  try {
    projectModelHtml = await fs.readFile(PROJECT_MODEL_HTML_PATH, "utf8")
  } catch (readError) {
    console.warn("⚠️ Arquivo de modelo HTML não encontrado, usando template padrão...")
    projectModelHtml = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ PROJECT_NAME }} - Portfólio</title>
    <link rel="stylesheet" href="../assets/css/style.css">
</head>
<body>
    <header class="project-header">
        <div class="container">
            <h1><a href="../index.html">← Voltar ao Portfólio</a></h1>
            <h2>{{ PROJECT_NAME }}</h2>
        </div>
    </header>
    <main class="container project-detail">
        <section>
            <h3>📋 Visão Geral</h3>
            <p>{{ PROJECT_DESCRIPTION }}</p>
        </section>
        <section>
            <h3>🛠️ Tecnologias Utilizadas</h3>
            <p><strong>Linguagem Principal:</strong> {{ PROJECT_LANGUAGE }}</p>
            <p><strong>Tópicos/Skills:</strong> {{ PROJECT_TOPICS }}</p>
        </section>
        <section>
            <h3>🔗 Links</h3>
            <ul>
                <li><a href="{{ PROJECT_URL }}" target="_blank">📂 Repositório GitHub</a></li>
                {{ PROJECT_DEMO_LINK_PLACEHOLDER }}
            </ul>
        </section>
        <section>
            <h3>📝 Detalhes Técnicos e Aprendizados</h3>
            <p><em>Esta seção deve ser expandida manualmente com mais informações.</em></p>
        </section>
    </main>
    <footer>
        <div class="container">
            <p>&copy; ${new Date().getFullYear()} {{ GITHUB_USERNAME }}.</p>
        </div>
    </footer>
</body>
</html>`
  }

  const results = await Promise.allSettled(
    repos.map(async (repo) => {
      const repoSlug = slugify(repo.name, { lower: true, strict: true })
      const docPath = path.join(BUILD_PROJECTS_DIR, `${repoSlug}.html`)

      let docContent = projectModelHtml
        .replace(/\{\{ PROJECT_NAME \}\}/g, sanitizeHtml(repo.name))
        .replace(
          /\{\{ PROJECT_DESCRIPTION \}\}/g,
          repo.description ? sanitizeHtml(repo.description) : "Sem descrição disponível.",
        )
        .replace(/\{\{ PROJECT_LANGUAGE \}\}/g, repo.language ? sanitizeHtml(repo.language) : "Não especificado")
        .replace(/\{\{ PROJECT_URL \}\}/g, repo.html_url)
        .replace(/\{\{ GITHUB_USERNAME \}\}/g, GITHUB_USERNAME)

      docContent = docContent.replace(
        /\{\{ PROJECT_TOPICS \}\}/g,
        repo.topics && repo.topics.length > 0
          ? repo.topics.map((topic) => `<span class="badge topic-badge">${sanitizeHtml(topic)}</span>`).join(", ")
          : "Nenhum tópico definido",
      )

      docContent = docContent.replace(
        /\{\{ PROJECT_DEMO_LINK_PLACEHOLDER \}\}/g,
        repo.homepage ? `<li><a href="${repo.homepage}" target="_blank">🌐 Demo ao Vivo</a></li>` : "",
      )

      await fs.writeFile(docPath, docContent)
      console.log(`📄 Página de detalhes gerada para ${repo.name}`)
      return { status: "updated", repo: repo.name }
    }),
  )

  const successful = results.filter((r) => r.status === "fulfilled").length
  const failed = results.filter((r) => r.status === "rejected").length

  console.log(`✅ ${successful} páginas de projeto geradas com sucesso`)
  if (failed > 0) {
    console.log(`❌ ${failed} páginas falharam`)
  }
}

async function main() {
  try {
    console.log(`🚀 Iniciando gerador de portfólio para @${GITHUB_USERNAME}...`)

    if (typeof fetch === "undefined") {
      console.error("❌ Este script requer Node.js 18+ com fetch nativo")
      process.exit(1)
    }

    await createDirectories()
    await copyStaticAssets()

    const repos = await fetchRepositories()
    console.log(`📚 Encontrados ${repos.length} repositórios.`)

    const filteredRepos = filterRepositories(repos)
    console.log(`🔍 Processando ${filteredRepos.length} repositórios.`)

    await Promise.all([generatePortfolioIndex(filteredRepos), generateDocumentation(filteredRepos)])

    console.log("✅ Portfólio gerado com sucesso!")
    console.log(`📁 Arquivos gerados em: ${BUILD_DIR}`)
    console.log("🌐 Para publicar no GitHub Pages, configure a pasta 'build' como fonte.")
  } catch (error) {
    console.error("❌ Erro:", error.message)
    console.error("Stack trace:", error.stack)
    process.exit(1)
  }
}

main()
