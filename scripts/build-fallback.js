const fs = require("fs")
const path = require("path")

console.log("🔄 Executando build de fallback...")

try {
  // Criar diretório out se não existir
  if (!fs.existsSync("out")) {
    fs.mkdirSync("out", { recursive: true })
  }

  // Verificar se existe um build estático gerado pelo update_catalog.js
  if (fs.existsSync("build")) {
    console.log("📁 Copiando arquivos do diretório build...")

    // Copiar recursivamente
    function copyRecursive(src, dest) {
      const stats = fs.statSync(src)
      if (stats.isDirectory()) {
        if (!fs.existsSync(dest)) {
          fs.mkdirSync(dest, { recursive: true })
        }
        const files = fs.readdirSync(src)
        files.forEach((file) => {
          copyRecursive(path.join(src, file), path.join(dest, file))
        })
      } else {
        fs.copyFileSync(src, dest)
      }
    }

    copyRecursive("build", "out")
    console.log("✅ Arquivos copiados com sucesso")
  } else {
    // Criar um index.html básico
    const basicHtml = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portfólio - meuphilim</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
        .container { max-width: 800px; margin: 0 auto; background: white; padding: 40px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        h1 { color: #333; text-align: center; }
        .status { background: #e3f2fd; padding: 15px; border-radius: 4px; margin: 20px 0; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 Portfólio em Construção</h1>
        <div class="status">
            <p><strong>Status:</strong> Build de fallback executado com sucesso</p>
            <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
            <p><strong>Usuário:</strong> meuphilim</p>
        </div>
        <p>Este é um build de fallback. O portfólio completo será disponibilizado em breve.</p>
        <p><a href="https://github.com/meuphilim">Ver perfil no GitHub</a></p>
    </div>
</body>
</html>
    `.trim()

    fs.writeFileSync(path.join("out", "index.html"), basicHtml)
    console.log("✅ index.html básico criado")
  }

  // Criar .nojekyll
  fs.writeFileSync(path.join("out", ".nojekyll"), "")

  // Criar build-info.json
  const buildInfo = {
    timestamp: new Date().toISOString(),
    build_type: "fallback",
    node_version: process.version,
    github_username: process.env.GITHUB_USERNAME || "meuphilim",
  }
  fs.writeFileSync(path.join("out", "build-info.json"), JSON.stringify(buildInfo, null, 2))

  console.log("✅ Build de fallback concluído com sucesso!")
} catch (error) {
  console.error("❌ Erro no build de fallback:", error.message)
  process.exit(1)
}
