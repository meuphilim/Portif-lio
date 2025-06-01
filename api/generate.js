import { exec } from "child_process"
import { promisify } from "util"
import fs from "fs/promises"
import path from "path"

const execAsync = promisify(exec)

export default async function handler(req, res) {
  const isVercel = process.env.VERCEL === "1" || process.env.VERCEL === "true"

  try {
    // Verificar se as variáveis de ambiente estão configuradas
    if (!process.env.GITHUB_USERNAME) {
      return res.status(500).json({
        error: "GITHUB_USERNAME não configurado",
        details: "Configure a variável de ambiente GITHUB_USERNAME",
      })
    }

    // Executar o script de geração
    console.log("Iniciando geração do portfólio...")
    console.log("Diretório atual:", process.cwd())
    console.log("Arquivos disponíveis:", await fs.readdir(process.cwd()))

    await execAsync("node update_catalog.js", { cwd: process.cwd() })
    console.log("Portfólio gerado com sucesso!")

    // Verificar se o arquivo index.html foi gerado
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
