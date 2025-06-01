import fs from "fs/promises"
import path from "path"

export default async function handler(req, res) {
  try {
    // Atualizar para usar a nova verificação:
    const isVercel = process.env.VERCEL === "1" || process.env.VERCEL === "true"

    const { slug } = req.query
    // E atualizar o projectPath:
    const projectPath = path.join(
      isVercel ? "/tmp/build/projects" : path.join(process.cwd(), "build/projects"),
      `${slug}.html`,
    )

    const content = await fs.readFile(projectPath, "utf8")
    res.setHeader("Content-Type", "text/html")
    res.status(200).send(content)
  } catch (error) {
    console.error("Erro ao servir página de projeto:", error)
    res.status(404).json({ error: "Projeto não encontrado" })
  }
}
