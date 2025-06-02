const { execSync } = require("child_process")
const fs = require("fs")
const path = require("path")

console.log("🚀 Iniciando build do portfólio...")

try {
  // 1. Limpar diretórios anteriores
  console.log("🧹 Limpando arquivos anteriores...")
  if (fs.existsSync("out")) {
    execSync("rm -rf out", { stdio: "inherit" })
  }
  if (fs.existsSync(".next")) {
    execSync("rm -rf .next", { stdio: "inherit" })
  }

  // 2. Atualizar catálogo de repositórios
  console.log("📊 Atualizando catálogo de repositórios...")
  try {
    execSync("node update_catalog.js", { stdio: "inherit" })
  } catch (error) {
    console.warn("⚠️ Aviso: Não foi possível atualizar o catálogo, usando dados de fallback")
  }

  // 3. Executar build do Next.js
  console.log("🔨 Executando build do Next.js...")
  execSync("next build", { stdio: "inherit" })

  // 4. Verificar se o diretório out foi criado
  if (!fs.existsSync("out")) {
    throw new Error('Diretório "out" não foi criado pelo build')
  }

  // 5. Criar arquivo .nojekyll para GitHub Pages
  const nojekyllPath = path.join("out", ".nojekyll")
  fs.writeFileSync(nojekyllPath, "")
  console.log("📝 Arquivo .nojekyll criado")

  // 6. Verificar arquivos essenciais
  const essentialFiles = ["index.html"]
  for (const file of essentialFiles) {
    const filePath = path.join("out", file)
    if (!fs.existsSync(filePath)) {
      throw new Error(`Arquivo essencial não encontrado: ${file}`)
    }
  }

  // 7. Criar arquivo de verificação
  const buildInfo = {
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || "1.0.0",
    node_version: process.version,
    build_type: "static_export",
  }

  fs.writeFileSync(path.join("out", "build-info.json"), JSON.stringify(buildInfo, null, 2))

  console.log("✅ Build concluído com sucesso!")
  console.log('📁 Arquivos gerados no diretório "out"')

  // 8. Mostrar estatísticas do build
  const stats = execSync("du -sh out/", { encoding: "utf8" }).trim()
  console.log(`📊 Tamanho total: ${stats}`)
} catch (error) {
  console.error("❌ Erro durante o build:", error.message)
  process.exit(1)
}
