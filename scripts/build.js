const { execSync } = require("child_process")
const fs = require("fs")
const path = require("path")

console.log("🚀 Iniciando build do portfólio...")

function runCommand(command, options = {}) {
  try {
    console.log(`🔧 Executando: ${command}`)
    const result = execSync(command, {
      stdio: "inherit",
      encoding: "utf8",
      ...options,
    })
    return result
  } catch (error) {
    console.error(`❌ Erro ao executar: ${command}`)
    console.error(`Código de saída: ${error.status}`)
    console.error(`Sinal: ${error.signal}`)
    throw error
  }
}

function runCommandSafe(command, options = {}) {
  try {
    return runCommand(command, options)
  } catch (error) {
    console.warn(`⚠️ Comando falhou: ${command}`)
    return null
  }
}

async function main() {
  try {
    // 1. Verificar ambiente
    console.log(`📁 Diretório atual: ${process.cwd()}`)
    console.log(`🔧 Node.js versão: ${process.version}`)
    console.log(`🔧 NPM versão: ${runCommandSafe("npm --version", { stdio: "pipe" }) || "desconhecida"}`)

    // 2. Verificar se package.json existe
    if (!fs.existsSync("package.json")) {
      throw new Error("package.json não encontrado!")
    }

    // 3. Limpar diretórios anteriores
    console.log("🧹 Limpando arquivos anteriores...")
    if (fs.existsSync("out")) {
      if (process.platform === "win32") {
        runCommand("rmdir /s /q out")
      } else {
        runCommand("rm -rf out")
      }
    }
    if (fs.existsSync(".next")) {
      if (process.platform === "win32") {
        runCommand("rmdir /s /q .next")
      } else {
        runCommand("rm -rf .next")
      }
    }

    // 4. Verificar e instalar dependências se necessário
    if (!fs.existsSync("node_modules")) {
      console.log("📦 Instalando dependências...")
      runCommand("npm ci")
    } else {
      console.log("📦 node_modules já existe")
    }

    // 5. Verificar se Next.js está disponível
    console.log("🔍 Verificando Next.js...")
    const nextVersion = runCommandSafe("npx next --version", { stdio: "pipe" })
    if (nextVersion) {
      console.log(`✅ Next.js encontrado: ${nextVersion.trim()}`)
    } else {
      console.log("📦 Next.js não encontrado, tentando instalar...")
      runCommand("npm install next@latest react@latest react-dom@latest")
    }

    // 6. Atualizar catálogo de repositórios
    console.log("📊 Atualizando catálogo de repositórios...")
    const catalogResult = runCommandSafe("node update_catalog.js")
    if (!catalogResult) {
      console.warn("⚠️ Aviso: Não foi possível atualizar o catálogo, usando dados de fallback")
    }

    // 7. Verificar se temos um package.json válido para Next.js
    const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"))
    if (!packageJson.dependencies || !packageJson.dependencies.next) {
      console.log("📦 Adicionando Next.js às dependências...")
      runCommand("npm install next@latest react@latest react-dom@latest")
    }

    // 8. Executar build do Next.js com diferentes estratégias
    console.log("🔨 Executando build do Next.js...")

    let buildSuccess = false
    const buildCommands = ["npx next build", "npm run build", "./node_modules/.bin/next build"]

    for (const cmd of buildCommands) {
      try {
        console.log(`🔄 Tentando: ${cmd}`)
        runCommand(cmd)
        buildSuccess = true
        break
      } catch (error) {
        console.warn(`⚠️ Comando falhou: ${cmd}`)
        continue
      }
    }

    if (!buildSuccess) {
      throw new Error("Todos os comandos de build falharam")
    }

    // 9. Verificar se o diretório out foi criado
    if (!fs.existsSync("out")) {
      throw new Error('Diretório "out" não foi criado pelo build')
    }

    // 10. Criar arquivo .nojekyll para GitHub Pages
    const nojekyllPath = path.join("out", ".nojekyll")
    fs.writeFileSync(nojekyllPath, "")
    console.log("📝 Arquivo .nojekyll criado")

    // 11. Verificar arquivos essenciais
    const essentialFiles = ["index.html"]
    for (const file of essentialFiles) {
      const filePath = path.join("out", file)
      if (!fs.existsSync(filePath)) {
        throw new Error(`Arquivo essencial não encontrado: ${file}`)
      }
    }

    // 12. Criar arquivo de verificação
    const buildInfo = {
      timestamp: new Date().toISOString(),
      version: packageJson.version || "2.0.0",
      node_version: process.version,
      build_type: "static_export",
      environment: process.env.NODE_ENV || "production",
      github_username: process.env.GITHUB_USERNAME || process.env.NEXT_PUBLIC_GITHUB_USERNAME || "meuphilim",
      platform: process.platform,
      arch: process.arch,
    }

    fs.writeFileSync(path.join("out", "build-info.json"), JSON.stringify(buildInfo, null, 2))

    // 13. Listar conteúdo do diretório out
    console.log("📂 Conteúdo gerado:")
    const outContents = fs.readdirSync("out")
    outContents.forEach((item) => {
      const itemPath = path.join("out", item)
      const stats = fs.statSync(itemPath)
      const type = stats.isDirectory() ? "📁" : "📄"
      const size = stats.isFile() ? ` (${Math.round(stats.size / 1024)}KB)` : ""
      console.log(`  ${type} ${item}${size}`)
    })

    console.log("✅ Build concluído com sucesso!")
    console.log('📁 Arquivos gerados no diretório "out"')

    // 14. Mostrar estatísticas do build
    try {
      const totalSize = outContents.reduce((acc, item) => {
        const itemPath = path.join("out", item)
        const stats = fs.statSync(itemPath)
        return acc + (stats.isFile() ? stats.size : 0)
      }, 0)
      console.log(`📊 Tamanho total: ${Math.round(totalSize / 1024)}KB`)
    } catch (error) {
      console.log("📊 Não foi possível calcular o tamanho total")
    }

    // 15. Verificação final
    console.log("🔍 Verificação final...")
    console.log(`✅ Diretório out existe: ${fs.existsSync("out")}`)
    console.log(`✅ index.html existe: ${fs.existsSync(path.join("out", "index.html"))}`)
    console.log(`✅ build-info.json existe: ${fs.existsSync(path.join("out", "build-info.json"))}`)
  } catch (error) {
    console.error("❌ Erro durante o build:", error.message)
    console.error("Stack trace:", error.stack)

    // Informações de debug
    console.log("\n🔍 Informações de debug:")
    console.log(`- Diretório atual: ${process.cwd()}`)
    console.log(`- Node.js versão: ${process.version}`)
    console.log(`- Plataforma: ${process.platform}`)
    console.log(`- Arquitetura: ${process.arch}`)

    if (fs.existsSync("package.json")) {
      const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"))
      console.log(`- Projeto: ${pkg.name || "sem nome"}`)
      console.log(`- Versão: ${pkg.version || "sem versão"}`)
    }

    process.exit(1)
  }
}

// Executar o script principal
main()
