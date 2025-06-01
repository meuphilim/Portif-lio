# 🚀 Guia de Deploy - Portfólio GitHub

## 📋 Pré-requisitos

### 1. Variáveis de Ambiente Configuradas ✅

**GitHub Repository Secrets:**
- `GITHUB_TOKEN`: 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 ✅
- `VERCEL_TOKEN`: prj_O5sixObkLh6DGfIIUFJ5ZIFUZd2O ✅
- `VERCEL_ORG_ID`: (obter do Vercel dashboard)
- `VERCEL_PROJECT_ID`: (obter do Vercel dashboard)

**Vercel Environment Variables:**
- `GITHUB_USERNAME`: meuphilim ✅
- `NEXT_PUBLIC_GITHUB_USERNAME`: meuphilim ✅
- `GITHUB_TOKEN`: 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 ✅
- `GITHUB_ACTIONS`: true ✅

## 🎯 Plataformas de Deploy

### 1. 🌐 Vercel (Aplicação Next.js)
- **URL**: `https://seu-projeto.vercel.app`
- **Tipo**: Aplicação dinâmica com API routes
- **Deploy**: Automático via GitHub Actions + Vercel CLI

### 2. 📄 GitHub Pages (Site Estático)
- **URL**: `https://meuphilim.github.io/seu-repo`
- **Tipo**: Site estático HTML/CSS/JS
- **Deploy**: Automático via GitHub Actions

## 🔄 Workflows Configurados

### 1. `pages.yml` - GitHub Pages
- **Trigger**: Push na branch `main`
- **Função**: Gera site estático e faz deploy no GitHub Pages
- **Duração**: ~2-3 minutos

### 2. `update-portfolio.yml` - Atualização Automática
- **Trigger**: A cada 12 horas (00:00 e 12:00 UTC)
- **Função**: Atualiza dados dos repositórios e faz deploy em ambas plataformas
- **Duração**: ~3-4 minutos

### 3. `deploy-vercel-production.yml` - Vercel Production
- **Trigger**: Push na branch `main`
- **Função**: Deploy direto para Vercel em produção
- **Duração**: ~2-3 minutos

### 4. `test-environments.yml` - Testes
- **Trigger**: Manual ou diário às 6h UTC
- **Função**: Testa geração estática e endpoints da API
- **Duração**: ~1-2 minutos

## 🛠️ Como Obter IDs do Vercel

### 1. VERCEL_ORG_ID
\`\`\`bash
# No terminal, após instalar Vercel CLI
npx vercel login
npx vercel ls
# O ORG_ID aparece na URL ou use:
npx vercel teams ls
\`\`\`

### 2. VERCEL_PROJECT_ID
\`\`\`bash
# No diretório do projeto
npx vercel link
# O PROJECT_ID será exibido ou verifique .vercel/project.json
\`\`\`

### 3. Via Dashboard Vercel
1. Acesse [vercel.com/dashboard](https://vercel.com/dashboard)
2. Selecione seu projeto
3. Vá em **Settings > General**
4. **Project ID** está na seção "Project ID"
5. **Team ID** está na URL: `vercel.com/[TEAM_ID]/[PROJECT_NAME]`

## 🚀 Processo de Deploy

### 1. Primeiro Deploy
\`\`\`bash
# 1. Adicionar secrets no GitHub
# 2. Ativar GitHub Pages (Settings > Pages > Source: GitHub Actions)
# 3. Fazer push
git add .
git commit -m "feat: configuração completa de deploy"
git push origin main
\`\`\`

### 2. Monitoramento
- **GitHub Actions**: `https://github.com/meuphilim/seu-repo/actions`
- **Vercel Dashboard**: `https://vercel.com/dashboard`
- **GitHub Pages**: Settings > Pages

### 3. Logs e Debug
\`\`\`bash
# Ver logs do workflow
gh run list
gh run view [RUN_ID] --log

# Testar localmente
npm run generate  # Gera site estático
npm run build     # Build Next.js
npm run dev       # Desenvolvimento local
\`\`\`

## 🔧 Troubleshooting

### ❌ Erro: "VERCEL_ORG_ID not found"
**Solução**: Adicionar `VERCEL_ORG_ID` nos secrets do GitHub

### ❌ Erro: "GitHub API rate limit"
**Solução**: Verificar se `GITHUB_TOKEN` está configurado corretamente

### ❌ Erro: "Build directory not found"
**Solução**: Verificar se `node update_catalog.js` está executando sem erros

### ❌ Erro: "Permission denied"
**Solução**: Verificar permissões do workflow em Settings > Actions > General

## 📊 Status dos Deploys

### ✅ Funcionando
- [x] Geração de site estático
- [x] API Routes do Next.js
- [x] GitHub Actions workflows
- [x] Variáveis de ambiente

### 🔄 Pendente
- [ ] Obter VERCEL_ORG_ID
- [ ] Obter VERCEL_PROJECT_ID
- [ ] Primeiro deploy completo
- [ ] Teste de atualização automática

## 📞 Suporte

Em caso de problemas:
1. Verificar logs no GitHub Actions
2. Verificar configuração das variáveis
3. Testar geração local: `npm run generate`
4. Verificar status da API GitHub: `https://www.githubstatus.com/`
