#!/usr/bin/env node

import fs from 'fs/promises';

const ARQUIVOS_OBRIGATORIOS = [
  'package.json',
  'next.config.js',
  'vercel.json',
  '.gitignore',
  '.env.example',
  'tsconfig.json',
];

const DIRETORIOS_OBRIGATORIOS = ['app', '.github/workflows', 'scripts'];

const VARIAVEIS_ENV_OBRIGATORIAS = ['GITHUB_USERNAME', 'NEXT_PUBLIC_GITHUB_USERNAME'];

async function verificarArquivo(caminhoArquivo) {
  try {
    await fs.access(caminhoArquivo);
    return true;
  } catch {
    return false;
  }
}

async function verificarDiretorio(caminhoDiretorio) {
  try {
    const stats = await fs.stat(caminhoDiretorio);
    return stats.isDirectory();
  } catch {
    return false;
  }
}

async function verificarConfiguracao() {
  console.log('🔍 Verificando configuração do projeto...\n');

  // Verificar arquivos obrigatórios
  console.log('📁 Verificando arquivos obrigatórios:');
  for (const arquivo of ARQUIVOS_OBRIGATORIOS) {
    const existe = await verificarArquivo(arquivo);
    console.log(`  ${existe ? '✅' : '❌'} ${arquivo}`);
  }

  // Verificar diretórios obrigatórios
  console.log('\n📂 Verificando diretórios obrigatórios:');
  for (const diretorio of DIRETORIOS_OBRIGATORIOS) {
    const existe = await verificarDiretorio(diretorio);
    console.log(`  ${existe ? '✅' : '❌'} ${diretorio}`);
  }

  // Verificar variáveis de ambiente
  console.log('\n🌍 Verificando variáveis de ambiente:');
  for (const varEnv of VARIAVEIS_ENV_OBRIGATORIAS) {
    const valor = process.env[varEnv];
    if (valor) {
      console.log(`  ✅ ${varEnv}: ${valor}`);
    } else {
      console.log(`  ⚠️ ${varEnv}: não configurado`);
    }
  }

  // Testar API do GitHub
  console.log('\n🐙 Testando API do GitHub:');
  try {
    const nomeUsuario =
      process.env.GITHUB_USERNAME || process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'meuphilim';
    const token = process.env.GITHUB_TOKEN;

    const headers = {
      'User-Agent': `${nomeUsuario}-portfolio-verificar`,
      Accept: 'application/vnd.github.v3+json',
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`https://api.github.com/users/${nomeUsuario}`, { headers });

    if (response.ok) {
      const usuario = await response.json();
      console.log(`  ✅ Usuário encontrado: ${usuario.name || usuario.login}`);
      console.log(`  ✅ Repositórios públicos: ${usuario.public_repos}`);
      console.log(`  ✅ Autenticação: ${token ? 'Token' : 'Pública'}`);
    } else {
      console.log(`  ❌ Erro da API: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.log(`  ❌ Teste da API falhou: ${error.message}`);
  }

  // Verificar scripts do package.json
  console.log('\n📦 Verificando scripts do package.json:');
  try {
    const packageJson = JSON.parse(await fs.readFile('package.json', 'utf8'));
    const scriptsObrigatorios = ['dev', 'build', 'start', 'lint'];

    for (const script of scriptsObrigatorios) {
      if (packageJson.scripts && packageJson.scripts[script]) {
        console.log(`  ✅ ${script}: ${packageJson.scripts[script]}`);
      } else {
        console.log(`  ❌ ${script}: ausente`);
      }
    }
  } catch (error) {
    console.log(`  ❌ Erro ao ler package.json: ${error.message}`);
  }

  console.log('\n✅ Verificação da configuração concluída!');
  console.log('\n🎯 Próximos passos:');
  console.log('1. Configurar secrets do repositório GitHub');
  console.log('2. Habilitar GitHub Pages nas configurações do repositório');
  console.log('3. Configurar configurações do projeto Vercel');
  console.log('4. Fazer push das alterações para ativar workflows');
}

verificarConfiguracao().catch(console.error);
