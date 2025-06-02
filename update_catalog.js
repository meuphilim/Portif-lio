import fs from "fs/promises"
import path from "path"
import { fileURLToPath } from "url"
import slugify from "slugify"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Atualizar a detecção de ambiente para incluir a nova variável
const isVercel = process.env.VERCEL === "1" || process.env.VERCEL === "true"
const isGitHubActions = process.env.GITHUB_ACTIONS === "true"
const isVercelWithGitHubActions = isVercel && isGitHubActions

// Verificar se estamos no ambiente Vercel ou GitHub Actions
const ROOT_DIR = isVercel ? "/tmp" : __dirname

// Caminhos para o site do portfólio gerado
const BUILD_DIR = isVercel ? "/tmp/build" : path.join(ROOT_DIR, "build")
const BUILD_INDEX_HTML_PATH = path.join(BUILD_DIR, "index.html")
const BUILD_PROJECTS_DIR = path.join(BUILD_DIR, "projetos")
const BUILD_ASSETS_CSS_DIR = path.join(BUILD_DIR, "assets", "css")
const BUILD_ASSETS_JS_DIR = path.join(BUILD_DIR, "assets", "js")
const BUILD_ASSETS_IMAGES_DIR = path.join(BUILD_DIR, "assets", "imagens")

// Caminhos para templates e assets
const PROJECT_MODEL_HTML_PATH = isVercel
  ? path.join(__dirname, "docs", "modelo-projeto.html")
  : path.join(ROOT_DIR, "docs", "modelo-projeto.html")
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

// Variáveis de ambiente com fallbacks
const GITHUB_USERNAME = process.env.GITHUB_USERNAME || process.env.NEXT_PUBLIC_GITHUB_USERNAME || "meuphilim"
const GITHUB_TOKEN = process.env.GITHUB_TOKEN

console.log(
  `🔧 Ambiente detectado: ${
    isVercelWithGitHubActions
      ? "Vercel + GitHub Actions"
      : isVercel
        ? "Vercel"
        : isGitHubActions
          ? "GitHub Actions"
          : "Local"
  }`,
)
console.log(`👤 Nome de usuário: ${GITHUB_USERNAME}`)
console.log(`🔑 Token configurado: ${GITHUB_TOKEN ? "Sim" : "Não"}`)

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
  --cor-primaria: #007bff;
  --cor-secundaria: #6c757d;
  --cor-fundo: #f8f9fa;
  --cor-fundo-card: #ffffff;
  --cor-texto: #343a40;
  --cor-borda: #e9ecef;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
  color: var(--cor-texto);
  background-color: var(--cor-fundo);
  margin: 0;
  padding: 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

header {
  background-color: var(--cor-primaria);
  color: white;
  padding: 1rem 0;
}

.grade-projetos {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.card-projeto {
  background: var(--cor-fundo-card);
  border: 1px solid var(--cor-borda);
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

.btn-primario {
  background-color: var(--cor-primaria);
  color: white;
}

.btn-secundario {
  background-color: var(--cor-secundaria);
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

// Atualizar a função fetchRepositories para lidar com erros de autenticação
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
    "User-Agent": `${GITHUB_USERNAME}-gerador-portfolio`,
    Accept: "application/vnd.github.v3+json",
  }

  let useToken = false
  if (GITHUB_TOKEN && GITHUB_TOKEN.trim() !== "") {
    headers.Authorization = `Bearer ${GITHUB_TOKEN}`
    useToken = true
    console.log("🔑 Usando autenticação com token")
  } else {
    console.log("⚠️ Sem token - usando API pública (limitada)")
  }

  let allRepos = []
  let page = 1

  try {
    while (true) {
      const url = `${API_BASE}/users/${GITHUB_USERNAME}/repos?per_page=${REPOS_PER_PAGE}&page=${page}&sort=updated`
      console.log(`📡 Fazendo requisição: ${url}`)

      const response = await fetch(url, { headers })

      // Se houver erro de autenticação e estamos usando token, tentar novamente sem token
      if ((response.status === 401 || response.status === 403) && useToken) {
        console.log("⚠️ Erro de autenticação. Tentando novamente sem token...")
        delete headers.Authorization
        useToken = false

        const retryResponse = await fetch(url, { headers })
        if (!retryResponse.ok) {
          throw new Error(`Erro da API do GitHub: ${retryResponse.status} ${retryResponse.statusText}`)
        }

        const repos = await retryResponse.json()
        if (repos.length === 0) break

        allRepos = allRepos.concat(repos)
        page++

        if (repos.length < REPOS_PER_PAGE) break
        continue
      }

      if (!response.ok) {
        const errorText = await response.text()
        console.error(`❌ Erro da API do GitHub: ${response.status} ${response.statusText}`)
        console.error(`Resposta: ${errorText}`)
        throw new Error(`Erro da API do GitHub: ${response.status} ${response.statusText}`)
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

    // Se temos um cache antigo, usar como fallback
    try {
      console.log("🔄 Tentando usar cache como fallback...")
      const cachedData = await fs.readFile(CACHE_FILE, "utf8")
      const cachedRepos = JSON.parse(cachedData)
      console.log(`📦 Usando ${cachedRepos.length} repositórios do cache como fallback`)
      return cachedRepos
    } catch (cacheError) {
      console.error("❌ Não foi possível usar cache como fallback:", cacheError.message)
      throw error
    }
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
<div class="sem-projetos">
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
        ? repo.topics.map((topic) => `<span class="badge badge-topico">${sanitizeHtml(topic)}</span>`).join(" ")
        : ""

    const demoLink = repo.homepage
      ? `<a href="${repo.homepage}" target="_blank" class="btn btn-secundario">🌐 Demo ao Vivo</a>`
      : ""

    cardsHtml += `
    <div class="card-projeto">
        <h3 class="titulo-projeto"><a href="./projetos/${docFileName}.html">${name}</a></h3>
        <p class="descricao-projeto">${description}</p>
        <div class="meta-projeto">
            <span class="linguagem">${languageDisplay}</span>
            <div class="topicos">${topicsBadges}</div>
        </div>
        <div class="acoes-projeto">
            <a href="${repo.html_url}" target="_blank" class="btn btn-primario">Ver Código</a>
            ${demoLink}
        </div>
        <small class="projeto-atualizado">Última atualização: ${updatedAt}</small>
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

  let statsHtml = '<div class="container-barra-linguagem">'

  // Gerar a barra de progresso visual
  statsHtml += '<div class="barra-linguagem">'
  sortedLanguages.forEach(([lang, count]) => {
    const percentage = (count / totalRepos) * 100
    const color = getLanguageColor(lang)
    statsHtml += `<div class="segmento-linguagem" style="width: ${percentage}%; background-color: #${color};" title="${lang}: ${percentage.toFixed(1)}%"></div>`
  })
  statsHtml += "</div>"

  // Gerar a lista de linguagens com porcentagens
  statsHtml += '<ul class="detalhes-linguagem">'
  sortedLanguages.forEach(([lang, count]) => {
    const percentage = (count / totalRepos) * 100
    statsHtml += `<li><span class="caixa-cor-linguagem" style="background-color: #${getLanguageColor(lang)};"></span>${sanitizeHtml(lang)} ${percentage.toFixed(1)}%</li>`
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
    <meta name="description" content="Portfólio de ${GITHUB_USERNAME} - Desenvolvedor apaixonado por criar soluções inovadoras">
    <meta property="og:title" content="Portfólio - ${GITHUB_USERNAME}">
    <meta property="og:description" content="Confira meus projetos e contribuições no GitHub">
    <meta property="og:image" content="https://github.com/${GITHUB_USERNAME}.png?size=400">
</head>
<body>
    <header>
        <div class="container">
            <h1><a href="index.html">Meu Portfólio</a></h1>
            <nav>
                <ul>
                    <li><a href="#sobre">Sobre Mim</a></li>
                    <li><a href="#projetos">Projetos</a></li>
                    <li><a href="#habilidades">Habilidades</a></li>
                    <li><a href="#contato">Contato</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <main class="container">
        <section id="sobre" class="secao-hero">
            <div class="intro-perfil">
                <img src="https://github.com/${GITHUB_USERNAME}.png?size=200" alt="Foto de Perfil de ${GITHUB_USERNAME}" class="foto-perfil">
                <h2>Olá, eu sou ${GITHUB_USERNAME}!</h2>
                <p>Sou um desenvolvedor apaixonado por criar soluções inovadoras. Este portfólio apresenta alguns dos meus projetos e habilidades.</p>
                <div class="links-sociais">
                    <a href="https://github.com/${GITHUB_USERNAME}" target="_blank">GitHub</a>
                </div>
            </div>
        </section>

        <section id="projetos" class="secao-projetos">
            <h2>🚀 Meus Projetos Recentes</h2>
            <p class="descricao-secao">Explore alguns dos meus trabalhos e contribuições de código aberto.</p>
            <div class="grade-projetos">
                ${generateProjectCardsHtml(repos)}
            </div>
            <div class="secao-estatisticas">
                <h3>📈 Estatísticas do Portfólio</h3>
                <div class="badges-estatisticas">
                    <img src="https://img.shields.io/badge/Total_de_Projetos-${repos.length}-blue?style=for-the-badge" alt="Total de Projetos">
                    <img src="https://img.shields.io/badge/Linguagens-${new Set(repos.map((repo) => repo.language).filter(Boolean)).size}-orange?style=for-the-badge" alt="Linguagens">
                </div>
                <div class="estatisticas-linguagem">
                    <h3>Linguagens Mais Utilizadas</h3>
                    ${generateLanguageStatsHtml(repos)}
                </div>
            </div>
        </section>

        <section id="habilidades" class="secao-habilidades">
            <h2>🛠️ Minhas Habilidades</h2>
            <div class="grade-habilidades">
                <span class="badge-habilidade">JavaScript</span>
                <span class="badge-habilidade">TypeScript</span>
                <span class="badge-habilidade">React</span>
                <span class="badge-habilidade">Node.js</span>
                <span class="badge-habilidade">HTML5</span>
                <span class="badge-habilidade">CSS3</span>
                <span class="badge-habilidade">Git</span>
                <span class="badge-habilidade">Docker</span>
            </div>
        </section>

        <section id="contato" class="secao-contato">
            <h2>📬 Contato</h2>
            <p>Sinta-se à vontade para entrar em contato comigo!</p>
            <ul>
                <li><strong>GitHub:</strong> <a href="https://github.com/${GITHUB_USERNAME}" target="_blank">github.com/${GITHUB_USERNAME}</a></li>
            </ul>
        </section>
    </main>

    <footer>
        <div class="container">
            <p>&copy; ${new Date().getFullYear()} ${GITHUB_USERNAME}. Feito com ❤️ e automação.</p>
            <p><small>Atualizado automaticamente via GitHub Actions • Última atualização: ${new Date().toLocaleString("pt-BR")}</small></p>
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
    <title>{{ NOME_PROJETO }} - Portfólio</title>
    <link rel="stylesheet" href="../assets/css/style.css">
</head>
<body>
    <header class="cabecalho-projeto">
        <div class="container">
            <h1><a href="../index.html">← Voltar ao Portfólio</a></h1>
            <h2>{{ NOME_PROJETO }}</h2>
        </div>
    </header>
    <main class="container detalhe-projeto">
        <section>
            <h3>📋 Visão Geral</h3>
            <p>{{ DESCRICAO_PROJETO }}</p>
        </section>
        <section>
            <h3>🛠️ Tecnologias Utilizadas</h3>
            <p><strong>Linguagem Principal:</strong> {{ LINGUAGEM_PROJETO }}</p>
            <p><strong>Tópicos/Habilidades:</strong> {{ TOPICOS_PROJETO }}</p>
        </section>
        <section>
            <h3>🔗 Links</h3>
            <ul>
                <li><a href="{{ URL_PROJETO }}" target="_blank">📂 Repositório GitHub</a></li>
                {{ PLACEHOLDER_LINK_DEMO_PROJETO }}
            </ul>
        </section>
        <section>
            <h3>📝 Detalhes Técnicos e Aprendizados</h3>
            <p><em>Esta seção deve ser expandida manualmente com mais informações.</em></p>
        </section>
    </main>
    <footer>
        <div class="container">
            <p>&copy; ${new Date().getFullYear()} {{ NOME_USUARIO_GITHUB }}.</p>
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
        .replace(/\{\{ NOME_PROJETO \}\}/g, sanitizeHtml(repo.name))
        .replace(
          /\{\{ DESCRICAO_PROJETO \}\}/g,
          repo.description ? sanitizeHtml(repo.description) : "Sem descrição disponível.",
        )
        .replace(/\{\{ LINGUAGEM_PROJETO \}\}/g, repo.language ? sanitizeHtml(repo.language) : "Não especificado")
        .replace(/\{\{ URL_PROJETO \}\}/g, repo.html_url)
        .replace(/\{\{ NOME_USUARIO_GITHUB \}\}/g, GITHUB_USERNAME)

      docContent = docContent.replace(
        /\{\{ TOPICOS_PROJETO \}\}/g,
        repo.topics && repo.topics.length > 0
          ? repo.topics.map((topic) => `<span class="badge badge-topico">${sanitizeHtml(topic)}</span>`).join(", ")
          : "Nenhum tópico definido",
      )

      docContent = docContent.replace(
        /\{\{ PLACEHOLDER_LINK_DEMO_PROJETO \}\}/g,
        repo.homepage ? `<li><a href="${repo.homepage}" target="_blank">🌐 Demo ao Vivo</a></li>` : "",
      )

      await fs.writeFile(docPath, docContent)
      console.log(`📄 Página de detalhes gerada para ${repo.name}`)
      return { status: "atualizado", repo: repo.name }
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
    console.log(`📍 Ambiente: ${isVercel ? "Vercel" : isGitHubActions ? "GitHub Actions" : "Local"}`)
    console.log(`📁 Diretório de trabalho: ${process.cwd()}`)
    console.log(`📂 Diretório de build: ${BUILD_DIR}`)

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

    // Verificar se os arquivos foram criados
    try {
      const indexExists = await fs
        .access(BUILD_INDEX_HTML_PATH)
        .then(() => true)
        .catch(() => false)
      console.log(`📄 index.html existe: ${indexExists}`)

      const buildContents = await fs.readdir(BUILD_DIR)
      console.log(`📂 Conteúdo do build:`, buildContents)
    } catch (error) {
      console.warn("⚠️ Erro ao verificar arquivos:", error.message)
    }

    console.log("🌐 Portfólio pronto para deploy!")
  } catch (error) {
    console.error("❌ Erro:", error.message)
    console.error("Stack trace:", error.stack)
    process.exit(1)
  }
}

main()
