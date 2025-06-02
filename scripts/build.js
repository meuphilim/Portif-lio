const { execSync, spawn } = require("child_process")
const fs = require("fs")
const path = require("path")

console.log("🚀 Iniciando build do portfólio...")

function runCommand(command, options = {}) {
  try {
    console.log(`🔧 Executando: ${command}`)
    return execSync(command, {
      stdio: "inherit",
      encoding: "utf8",
      ...options,
    })
  } catch (error) {
    console.error(`❌ Erro ao executar: ${command}`)
    throw error
  }
}

async function main() {
  try {
    // 1. Verificar se estamos no diretório correto
    console.log(`📁 Diretório atual: ${process.cwd()}`)

    // 2. Verificar se package.json existe
    if (!fs.existsSync("package.json")) {
      throw new Error("package.json não encontrado!")
    }

    // 3. Limpar diretórios anteriores
    console.log("🧹 Limpando arquivos anteriores...")
    if (fs.existsSync("out")) {
      runCommand("rm -rf out")
    }
    if (fs.existsSync(".next")) {
      runCommand("rm -rf .next")
    }

    // 4. Verificar se node_modules existe
    if (!fs.existsSync("node_modules")) {
      console.log("📦 Instalando dependências...")
      runCommand("npm ci")
    }

    // 5. Atualizar catálogo de repositórios
    console.log("📊 Atualizando catálogo de repositórios...")
    try {
      runCommand("node update_catalog.js")
    } catch (error) {
      console.warn("⚠️ Aviso: Não foi possível atualizar o catálogo, usando dados de fallback")
    }

    // 6. Verificar se Next.js está instalado
    try {
      runCommand("npx next --version")
    } catch (error) {
      console.log("📦 Next.js não encontrado, instalando...")
      runCommand("npm install next@latest")
    }

    // 7. Executar build do Next.js
    console.log("🔨 Executando build do Next.js...")
    runCommand("npx next build")

    // 8. Verificar se o diretório out foi criado
    if (!fs.existsSync("out")) {
      throw new Error('Diretório "out" não foi criado pelo build')
    }

    // 9. Criar arquivo .nojekyll para GitHub Pages
    const nojekyllPath = path.join("out", ".nojekyll")
    fs.writeFileSync(nojekyllPath, "")
    console.log("📝 Arquivo .nojekyll criado")

    // 10. Verificar arquivos essenciais
    const essentialFiles = ["index.html"]
    for (const file of essentialFiles) {
      const filePath = path.join("out", file)
      if (!fs.existsSync(filePath)) {
        throw new Error(`Arquivo essencial não encontrado: ${file}`)
      }
    }

    // 11. Criar arquivo de verificação
    const buildInfo = {
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || "2.0.0",
      node_version: process.version,
      build_type: "static_export",
      environment: process.env.NODE_ENV || "production",
      github_username: process.env.GITHUB_USERNAME || "meuphilim",
    }

    fs.writeFileSync(path.join("out", "build-info.json"), JSON.stringify(buildInfo, null, 2))

    // 12. Listar conteúdo do diretório out
    console.log("📂 Conteúdo gerado:")
    const outContents = fs.readdirSync("out")
    outContents.forEach((item) => {
      const itemPath = path.join("out", item)
      const stats = fs.statSync(itemPath)
      const type = stats.isDirectory() ? "📁" : "📄"
      console.log(`  ${type} ${item}`)
    })

    console.log("✅ Build concluído com sucesso!")
    console.log('📁 Arquivos gerados no diretório "out"')

    // 13. Mostrar estatísticas do build (se disponível)
    try {
      const stats = runCommand("du -sh out/", { encoding: "utf8" }).trim()
      console.log(`📊 Tamanho total: ${stats}`)
    } catch (error) {
      console.log("📊 Não foi possível calcular o tamanho (comando du não disponível)")
    }
  } catch (error) {
    console.error("❌ Erro durante o build:", error.message)
    process.exit(1)
  }
}

// Executar o script principal
main()
