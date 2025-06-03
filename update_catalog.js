import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Para suporte ao __filename e __dirname em ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurações
const GITHUB_USERNAME =
  process.env.GITHUB_USERNAME || process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'meuphilim';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const BUILD_DIR = process.env.BUILD_DIR || 'build';
const CACHE_DIR = process.env.CACHE_DIR || '.cache';
const CACHE_DURATION = parseInt(process.env.CACHE_DURATION) || 3600000; // 1 hora em ms
const IS_GITHUB_ACTIONS = process.env.GITHUB_ACTIONS === 'true';
const IS_VERCEL = process.env.VERCEL === '1';

console.log(
  '🔧 Ambiente detectado:',
  IS_GITHUB_ACTIONS ? 'GitHub Actions' : IS_VERCEL ? 'Vercel' : 'Local',
);
console.log('👤 Nome de usuário:', GITHUB_USERNAME);
console.log('🔑 Token configurado:', GITHUB_TOKEN ? 'Sim' : 'Não');

// Função para verificar cache
function getCachedData(cacheKey) {
  try {
    const cacheFile = path.join(CACHE_DIR, `${cacheKey}.json`);
    if (!fs.existsSync(cacheFile)) return null;
    
    const cached = JSON.parse(fs.readFileSync(cacheFile, 'utf8'));
    const isExpired = Date.now() - cached.timestamp > CACHE_DURATION;
    
    if (isExpired) {
      fs.unlinkSync(cacheFile);
      return null;
    }
    
    console.log(`✅ Usando dados em cache para ${cacheKey}`);
    return cached.data;
  } catch (error) {
    console.warn(`⚠️ Erro ao ler cache ${cacheKey}:`, error.message);
    return null;
  }
}

// Função para salvar no cache
function setCachedData(cacheKey, data) {
  try {
    if (!fs.existsSync(CACHE_DIR)) {
      fs.mkdirSync(CACHE_DIR, { recursive: true });
    }
    
    const cacheFile = path.join(CACHE_DIR, `${cacheKey}.json`);
    const cacheData = {
      timestamp: Date.now(),
      data: data
    };
    
    fs.writeFileSync(cacheFile, JSON.stringify(cacheData, null, 2));
    console.log(`💾 Cache salvo para ${cacheKey}`);
  } catch (error) {
    console.warn(`⚠️ Erro ao salvar cache ${cacheKey}:`, error.message);
  }
}
async function fetchWithFallback(url, options = {}) {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.warn(`⚠️ Erro na requisição para ${url}:`, error.message);
    return null;
  }
}

// Função principal
async function generatePortfolio() {
  console.log(`🚀 Iniciando gerador de portfólio para @${GITHUB_USERNAME}...`);
  console.log(
    '📍 Ambiente:',
    IS_GITHUB_ACTIONS ? 'GitHub Actions' : IS_VERCEL ? 'Vercel' : 'Local',
  );
  console.log('📁 Diretório de trabalho:', process.cwd());
  console.log('📂 Diretório de build:', path.resolve(BUILD_DIR));

  try {
    // Criar diretórios necessários
    const dirs = [BUILD_DIR, path.join(BUILD_DIR, 'assets'), path.join(BUILD_DIR, 'projetos')];
    dirs.forEach((dir) => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });
    console.log('📁 Diretórios criados com sucesso');

    // Copiar assets estáticos
    console.log('📂 Copiando assets estáticos...');
    const assetsDir = 'assets';
    if (fs.existsSync(assetsDir)) {
      copyDirectory(assetsDir, path.join(BUILD_DIR, 'assets'));
    }
    console.log('✅ Assets copiados com sucesso.');

    // Buscar repositórios
    console.log(`🔍 Buscando repositórios de @${GITHUB_USERNAME}...`);
    const repos = await fetchRepositories();

    if (!repos || repos.length === 0) {
      console.warn('⚠️ Nenhum repositório encontrado, usando dados de exemplo');
      return generateFallbackPortfolio();
    }

    console.log(`📚 Encontrados ${repos.length} repositórios.`);

    // Filtrar repositórios
    const filteredRepos = repos.filter(
      (repo) =>
        !repo.fork && !repo.archived && !repo.private && repo.name && !repo.name.startsWith('.'),
    );

    console.log(`🔍 Processando ${filteredRepos.length} repositórios.`);

    // Gerar HTML
    await generateHTML(filteredRepos);

    console.log('✅ Portfólio gerado com sucesso!');
    console.log('📁 Arquivos gerados em:', path.resolve(BUILD_DIR));
    console.log('📄 index.html existe:', fs.existsSync(path.join(BUILD_DIR, 'index.html')));
    console.log('📂 Conteúdo do build:', fs.readdirSync(BUILD_DIR));
    console.log('🌐 Portfólio pronto para deploy!');
  } catch (error) {
    console.error('❌ Erro ao gerar portfólio:', error.message);
    console.log('🔄 Tentando gerar versão de fallback...');
    await generateFallbackPortfolio();
  }
}

// Função para buscar repositórios
async function fetchRepositories() {
  const cacheKey = `repos-${GITHUB_USERNAME}`;
  
  // Verificar cache primeiro
  const cachedRepos = getCachedData(cacheKey);
  if (cachedRepos) {
    console.log(`📦 ${cachedRepos.length} repositórios carregados do cache`);
    return cachedRepos;
  }
  
  console.log('🔄 Cache não encontrado, buscando da API...');
  
  const headers = {
    'User-Agent': `${GITHUB_USERNAME}-portfolio`,
    Accept: 'application/vnd.github.v3+json',
  };

  if (GITHUB_TOKEN) {
    headers['Authorization'] = `token ${GITHUB_TOKEN}`;
    console.log('🔑 Usando token de autenticação');
  } else {
    console.log('⚠️ Sem token - usando API pública (limitada)');
  }

  const allRepos = [];
  let page = 1;
  const perPage = 100;

  while (true) {
    const url = `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=${perPage}&page=${page}&sort=updated`;
    console.log(`📡 Fazendo requisição: ${url}`);

    const repos = await fetchWithFallback(url, { headers });

    if (!repos || repos.length === 0) {
      break;
    }

    allRepos.push(...repos);
    console.log(`✅ ${repos.length} repositórios encontrados`);

    if (repos.length < perPage) {
      break;
    }
    page++;
    
    // Pequeno delay entre requisições para evitar rate limit
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  // Salvar no cache
  if (allRepos.length > 0) {
    setCachedData(cacheKey, allRepos);
  }

  return allRepos;
}

// Função para copiar diretório
function copyDirectory(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const items = fs.readdirSync(src);
  items.forEach((item) => {
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);

    if (fs.statSync(srcPath).isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
}

// Função para gerar HTML
async function generateHTML(repos) {
  console.log('📝 Gerando index.html do portfólio...');

  // Template básico do HTML
  const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portfólio - ${GITHUB_USERNAME}</title>
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
    <header>
        <h1>Portfólio de ${GITHUB_USERNAME}</h1>
        <p>Desenvolvedor apaixonado por tecnologia</p>
    </header>
    
    <main>
        <section class="repositories">
            <h2>Meus Projetos (${repos.length})</h2>
            <div class="repo-grid">
                ${repos
                  .map(
                    (repo) => `
                    <div class="repo-card">
                        <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
                        <p>${repo.description || 'Sem descrição'}</p>
                        <div class="repo-meta">
                            <span class="language">${repo.language || 'N/A'}</span>
                            <span class="stars">⭐ ${repo.stargazers_count}</span>
                            <span class="forks">🍴 ${repo.forks_count}</span>
                        </div>
                        <div class="topics">
                            ${(repo.topics || []).map((topic) => `<span class="topic">${topic}</span>`).join('')}
                        </div>
                    </div>
                `,
                  )
                  .join('')}
            </div>
        </section>
    </main>
    
    <footer>
        <p>&copy; ${new Date().getFullYear()} ${GITHUB_USERNAME}. Gerado automaticamente.</p>
        <p>Última atualização: ${new Date().toLocaleString('pt-BR')}</p>
    </footer>
    
    <script src="assets/js/script.js"></script>
</body>
</html>`;

  fs.writeFileSync(path.join(BUILD_DIR, 'index.html'), html);
  console.log('✅ index.html do portfólio gerado com sucesso.');

  // Gerar páginas individuais dos projetos
  console.log('📋 Gerando documentação HTML para cada projeto...');

  let generatedPages = 0;
  repos.forEach((repo) => {
    try {
      const projectHtml = generateProjectPage(repo);
      const fileName = `${repo.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}.html`;
      fs.writeFileSync(path.join(BUILD_DIR, 'projetos', fileName), projectHtml);
      console.log(`📄 Página de detalhes gerada para ${repo.name}`);
      generatedPages++;
    } catch (error) {
      console.warn(`⚠️ Erro ao gerar página para ${repo.name}:`, error.message);
    }
  });

  console.log(`✅ ${generatedPages} páginas de projeto geradas com sucesso`);
}

// Função para gerar página individual do projeto
function generateProjectPage(repo) {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${repo.name} - ${GITHUB_USERNAME}</title>
    <link rel="stylesheet" href="../assets/css/style.css">
</head>
<body>
    <header>
        <h1>${repo.name}</h1>
        <p>${repo.description || 'Sem descrição disponível'}</p>
    </header>
    
    <main>
        <section class="project-details">
            <div class="project-info">
                <h2>Informações do Projeto</h2>
                <ul>
                    <li><strong>Linguagem:</strong> ${repo.language || 'N/A'}</li>
                    <li><strong>Stars:</strong> ${repo.stargazers_count}</li>
                    <li><strong>Forks:</strong> ${repo.forks_count}</li>
                    <li><strong>Criado em:</strong> ${new Date(repo.created_at).toLocaleDateString('pt-BR')}</li>
                    <li><strong>Última atualização:</strong> ${new Date(repo.updated_at).toLocaleDateString('pt-BR')}</li>
                </ul>
            </div>
            
            <div class="project-links">
                <a href="${repo.html_url}" target="_blank" class="btn">Ver no GitHub</a>
                ${repo.homepage ? `<a href="${repo.homepage}" target="_blank" class="btn">Ver Demo</a>` : ''}
            </div>
            
            ${
              repo.topics && repo.topics.length > 0
                ? `
            <div class="topics">
                <h3>Tópicos</h3>
                ${repo.topics.map((topic) => `<span class="topic">${topic}</span>`).join('')}
            </div>
            `
                : ''
            }
        </section>
    </main>
    
    <footer>
        <a href="../index.html">← Voltar ao Portfólio</a>
    </footer>
</body>
</html>`;
}

// Função para gerar portfólio de fallback
async function generateFallbackPortfolio() {
  console.log('🔄 Gerando portfólio de fallback...');

  const fallbackRepos = [
    {
      name: 'portfolio-generator',
      description: 'Gerador automático de portfólio GitHub',
      html_url: `https://github.com/${GITHUB_USERNAME}/portfolio-generator`,
      language: 'JavaScript',
      stargazers_count: 0,
      forks_count: 0,
      topics: ['portfolio', 'github', 'automation'],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ];

  await generateHTML(fallbackRepos);
  console.log('✅ Portfólio de fallback gerado com sucesso!');
}

// Executar se chamado diretamente
if (process.argv[1] === __filename) {
  generatePortfolio().catch((error) => {
    console.error('💥 Erro fatal:', error);
    process.exit(1);
  });
}

// Export para ES modules
export { generatePortfolio };