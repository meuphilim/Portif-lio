const { execSync } = require("child_process")
const fs = require("fs")
const path = require("path")

console.log("🚀 Iniciando build para GitHub Pages...")

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
    const dirsToClean = ["out", ".next", "build"]
    dirsToClean.forEach((dir) => {
      if (fs.existsSync(dir)) {
        if (process.platform === "win32") {
          runCommandSafe(`rmdir /s /q ${dir}`)
        } else {
          runCommandSafe(`rm -rf ${dir}`)
        }
      }
    })

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

    // 7. Executar build do Next.js
    console.log("🔨 Executando build do Next.js para GitHub Pages...")

    // Definir variáveis de ambiente para produção
    process.env.NODE_ENV = "production"

    const buildCommands = ["npx next build", "npm run build", "./node_modules/.bin/next build"]

    let buildSuccess = false
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

    // 8. Verificar se o diretório out foi criado
    if (!fs.existsSync("out")) {
      throw new Error('Diretório "out" não foi criado pelo build')
    }

    // 9. Criar arquivo .nojekyll para GitHub Pages
    const nojekyllPath = path.join("out", ".nojekyll")
    fs.writeFileSync(nojekyllPath, "")
    console.log("📝 Arquivo .nojekyll criado")

    // 10. Criar arquivo CNAME se necessário (para domínio personalizado)
    const customDomain = process.env.CUSTOM_DOMAIN
    if (customDomain) {
      const cnamePath = path.join("out", "CNAME")
      fs.writeFileSync(cnamePath, customDomain)
      console.log(`📝 Arquivo CNAME criado para: ${customDomain}`)
    }

    // 11. Verificar arquivos essenciais
    const essentialFiles = ["index.html"]
    for (const file of essentialFiles) {
      const filePath = path.join("out", file)
      if (!fs.existsSync(filePath)) {
        throw new Error(`Arquivo essencial não encontrado: ${file}`)
      }
    }

    // 12. Criar arquivo de verificação
    const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"))
    const buildInfo = {
      timestamp: new Date().toISOString(),
      version: packageJson.version || "2.0.0",
      node_version: process.version,
      build_type: "github_pages_static",
      environment: "production",
      github_username: process.env.GITHUB_USERNAME || process.env.NEXT_PUBLIC_GITHUB_USERNAME || "meuphilim",
      platform: process.platform,
      arch: process.arch,
      repository: packageJson.homepage || "https://meuphilim.github.io/Portifolio",
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

    console.log("✅ Build para GitHub Pages concluído com sucesso!")
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
    console.log(`✅ .nojekyll existe: ${fs.existsSync(path.join("out", ".nojekyll"))}`)

    console.log("\n🎉 Pronto para deploy no GitHub Pages!")
    console.log("📋 Próximos passos:")
    console.log("1. Fazer commit das alterações")
    console.log("2. Push para a branch main")
    console.log("3. Verificar o deploy em GitHub Actions")
    console.log("4. Acessar o site em: https://meuphilim.github.io/Portifolio")
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
