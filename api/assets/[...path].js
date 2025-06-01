import fs from "fs/promises"
import path from "path"

export default async function handler(req, res) {
  const isVercel = process.env.VERCEL === "1" || process.env.VERCEL === "true"
  try {
    const { path: assetPath } = req.query
    const fullPath = path.join(isVercel ? "/tmp/build/assets" : path.join(process.cwd(), "build/assets"), ...assetPath)

    // Determinar o tipo de conteúdo com base na extensão
    const ext = path.extname(fullPath).toLowerCase()
    let contentType = "text/plain"

    switch (ext) {
      case ".css":
        contentType = "text/css"
        break
      case ".js":
        contentType = "application/javascript"
        break
      case ".png":
        contentType = "image/png"
        break
      case ".jpg":
      case ".jpeg":
        contentType = "image/jpeg"
        break
      case ".svg":
        contentType = "image/svg+xml"
        break
    }

    const content = await fs.readFile(fullPath)
    res.setHeader("Content-Type", contentType)
    res.status(200).send(content)
  } catch (error) {
    console.error("Erro ao servir asset:", error)
    res.status(404).json({ error: "Asset não encontrado" })
  }
}
