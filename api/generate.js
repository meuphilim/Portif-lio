import { exec } from "child_process"
import { promisify } from "util"
import fs from "fs/promises"
import path from "path"

const execAsync = promisify(exec)

export default async function handler(req, res) {
  // Atualizar para usar a nova verificação:

  // No início da função handler, adicione:
  const isVercel = process.env.VERCEL === "1" || process.env.VERCEL === "true"

  try {
    // Executar o script de geração
    console.log("Iniciando geração do portfólio...")
    await execAsync("node ../update_catalog.js")
    console.log("Portfólio gerado com sucesso!")

    // Verificar se o arquivo index.html foi gerado
    // E atualizar a verificação do buildDir:
    const buildDir = isVercel ? "/tmp/build" : path.join(process.cwd(), "build")
    const indexPath = path.join(buildDir, "index.html")

    try {
      const indexContent = await fs.readFile(indexPath, "utf8")

      // Retornar o HTML gerado
      res.setHeader("Content-Type", "text/html")
      res.status(200).send(indexContent)
    } catch (error) {
      console.error("Erro ao ler o arquivo index.html:", error)
      res.status(500).json({ error: "Falha ao ler o arquivo gerado", details: error.message })
    }
  } catch (error) {
    console.error("Erro ao gerar o portfólio:", error)
    res.status(500).json({ error: "Falha ao gerar o portfólio", details: error.message })
  }
}
