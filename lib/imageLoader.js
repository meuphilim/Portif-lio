export default function imageLoader({ src, width, quality }) {
  // Para GitHub Pages, considerar o basePath
  const basePath = process.env.NODE_ENV === 'production' ? '/Portifolio' : '';

  // Para export estático, retornar a URL da imagem sem modificações
  if (src.startsWith('http') || src.startsWith('//')) {
    return src;
  }

  // Para imagens locais, adicionar basePath se necessário
  let finalSrc = src;
  if (process.env.NODE_ENV === 'production' && !src.startsWith(basePath)) {
    finalSrc = `${basePath}${src.startsWith('/') ? '' : '/'}${src}`;
  }

  // Adicionar parâmetros de query se necessário
  const params = new URLSearchParams();
  if (width) params.set('width', width.toString());
  if (quality) params.set('quality', quality.toString());

  const queryString = params.toString();
  return queryString ? `${finalSrc}?${queryString}` : finalSrc;
}
