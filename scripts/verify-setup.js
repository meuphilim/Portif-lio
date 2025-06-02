#!/usr/bin/env node

import fs from "fs/promises"

const REQUIRED_SECRETS = ["GITHUB_TOKEN", "VERCEL_TOKEN", "VERCEL_ORG_ID", "VERCEL_PROJECT_ID"]

const REQUIRED_ENV_VARS = ["GITHUB_USERNAME", "NEXT_PUBLIC_GITHUB_USERNAME"]

async function verifySetup() {
  console.log("🔍 Verificando configuração do projeto...\n")

  // Verificar arquivos essenciais
  const requiredFiles = [
    "package.json",
    "next.config.js",
    "vercel.json",
    ".vercel/project.json",
    ".github/workflows/pages.yml",
    ".github/workflows/update-portfolio.yml",
    ".github/workflows/deploy-vercel-production.yml",
  ]

  console.log("📁 Verificando arquivos essenciais:")
  for (const file of requiredFiles) {
    try {
      await fs.access(file)
      console.log(`  ✅ ${file}`)
    } catch {
      console.log(`  ❌ ${file} - AUSENTE`)
    }
  }

  // Verificar configuração do Vercel
  console.log("\n🔧 Verificando configuração do Vercel:")
  try {
    const vercelConfig = JSON.parse(await fs.readFile(".vercel/project.json", "utf8"))
    console.log(`  ✅ Org ID: ${vercelConfig.orgId}`)
    console.log(`  ✅ Project ID: ${vercelConfig.projectId}`)
  } catch {
    console.log("  ❌ Arquivo .vercel/project.json não encontrado")
  }

  // Verificar variáveis de ambiente locais
  console.log("\n🌍 Verificando variáveis de ambiente:")
  for (const envVar of REQUIRED_ENV_VARS) {
    const value = process.env[envVar]
    if (value) {
      console.log(`  ✅ ${envVar}: ${value}`)
    } else {
      console.log(`  ⚠️ ${envVar}: não configurado localmente`)
    }
  }

  // Testar API do GitHub
  console.log("\n🐙 Testando API do GitHub:")
  try {
    const username = process.env.GITHUB_USERNAME || process.env.NEXT_PUBLIC_GITHUB_USERNAME || "meuphilim"
    const token = process.env.GITHUB_TOKEN

    const headers = {
      "User-Agent": `${username}-portfolio-verify`,
      Accept: "application/vnd.github.v3+json",
    }

    if (token) {
      headers.Authorization = `Bearer ${token}`
    }

    const response = await fetch(`https://api.github.com/users/${username}`, { headers })

    if (response.ok) {
      const user = await response.json()
      console.log(`  ✅ Usuário encontrado: ${user.name || user.login}`)
      console.log(`  ✅ Repositórios públicos: ${user.public_repos}`)
      console.log(`  ✅ Autenticação: ${token ? "Token" : "Pública"}`)
    } else {
      console.log(`  ❌ Erro na API: ${response.status} ${response.statusText}`)
    }
  } catch (error) {
    console.log(`  ❌ Erro ao testar API: ${error.message}`)
  }

  console.log("\n🎯 Próximos passos:")
  console.log("1. Adicionar secrets no GitHub:")
  console.log("   - GITHUB_TOKEN: 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")
  console.log("   - VERCEL_TOKEN: prj_O5sixObkLh6DGfIIUFJ5ZIFUZd2O")
  console.log("   - VERCEL_ORG_ID: meuphilims-projects")
  console.log("   - VERCEL_PROJECT_ID: prj_O5sixObkLh6DGfIIUFJ5ZIFUZd2O")
  console.log("\n2. Ativar GitHub Pages em Settings > Pages")
  console.log("\n3. Fazer push para ativar workflows:")
  console.log("   git add . && git commit -m 'feat: configuração completa' && git push")

  console.log("\n✅ Verificação concluída!")
}

verifySetup().catch(console.error)
