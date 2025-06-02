export default function imageLoader({ src, width, quality }) {
  // Para export estático, retornar a URL da imagem sem modificações
  if (src.startsWith("http") || src.startsWith("//")) {
    return src
  }

  // Para imagens locais, adicionar parâmetros de query se necessário
  const params = new URLSearchParams()
  if (width) params.set("width", width.toString())
  if (quality) params.set("quality", quality.toString())

  const queryString = params.toString()
  return queryString ? `${src}?${queryString}` : src
}
