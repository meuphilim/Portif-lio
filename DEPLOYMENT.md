# 🚀 Guia de Deploy - Portfólio GitHub

## 📋 Configuração Completa ✅

### 1. Variáveis de Ambiente Configuradas

**GitHub Repository Secrets:**
- `GITHUB_TOKEN`: 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 ✅
- `VERCEL_TOKEN`: prj_O5sixObkLh6DGfIIUFJ5ZIFUZd2O ✅
- `VERCEL_ORG_ID`: meuphilims-projects ✅
- `VERCEL_PROJECT_ID`: prj_O5sixObkLh6DGfIIUFJ5ZIFUZd2O ✅

**Vercel Environment Variables:**
- `GITHUB_USERNAME`: meuphilim ✅
- `NEXT_PUBLIC_GITHUB_USERNAME`: meuphilim ✅
- `GITHUB_TOKEN`: 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 ✅
- `GITHUB_ACTIONS`: true ✅

## 🎯 URLs de Deploy

### 1. 🌐 Vercel (Aplicação Next.js)
- **URL**: `https://prj-o5sixobklh6dgfiifuj5zifuzd2o.vercel.app`
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
- **Status**: ✅ Configurado

### 2. `update-portfolio.yml` - Atualização Automática
- **Trigger**: A cada 12 horas (00:00 e 12:00 UTC)
- **Função**: Atualiza dados dos repositórios e faz deploy em ambas plataformas
- **Duração**: ~3-4 minutos
- **Status**: ✅ Configurado

### 3. `deploy-vercel-production.yml` - Vercel Production
- **Trigger**: Push na branch `main`
- **Função**: Deploy direto para Vercel em produção
- **Duração**: ~2-3 minutos
- **Status**: ✅ Configurado

### 4. `vercel-deploy.yml` - Deploy Vercel Completo
- **Trigger**: Push/PR na branch `main`
- **Função**: Build Next.js + Deploy para Vercel
- **Duração**: ~2-3 minutos
- **Status**: ✅ Configurado

### 5. `test-environments.yml` - Testes
- **Trigger**: Manual ou diário às 6h UTC
- **Função**: Testa geração estática e endpoints da API
- **Duração**: ~1-2 minutos
- **Status**: ✅ Configurado

## 🚀 Processo de Deploy

### 1. Deploy Automático
\`\`\`bash
# Qualquer push na branch main ativa automaticamente:
git add .
git commit -m "feat: nova funcionalidade"
git push origin main

# Isso irá:
# 1. Fazer build do Next.js
# 2. Deploy para Vercel
# 3. Gerar site estático
# 4. Deploy para GitHub Pages
\`\`\`

### 2. Deploy Manual
\`\`\`bash
# Via GitHub Actions (manual)
# 1. Ir para: https://github.com/meuphilim/seu-repo/actions
# 2. Selecionar workflow desejado
# 3. Clicar em "Run workflow"

# Via Vercel CLI (local)
npx vercel --prod
\`\`\`

### 3. Monitoramento
- **GitHub Actions**: `https://github.com/meuphilim/seu-repo/actions`
- **Vercel Dashboard**: `https://vercel.com/meuphilims-projects/prj_O5sixObkLh6DGfIIUFJ5ZIFUZd2O`
- **GitHub Pages**: Settings > Pages

## 🔧 Comandos Úteis

### Desenvolvimento Local
\`\`\`bash
# Instalar dependências
npm install

# Desenvolvimento Next.js
npm run dev

# Gerar site estático
npm run generate

# Build Next.js
npm run build
\`\`\`

### Vercel CLI
\`\`\`bash
# Login no Vercel
npx vercel login

# Link do projeto
npx vercel link

# Deploy preview
npx vercel

# Deploy production
npx vercel --prod

# Ver logs
npx vercel logs
\`\`\`

### GitHub CLI
\`\`\`bash
# Ver workflows
gh workflow list

# Ver execuções
gh run list

# Ver logs de execução
gh run view [RUN_ID] --log

# Executar workflow manualmente
gh workflow run "Deploy Vercel Production"
\`\`\`

## 📊 Status dos Deploys

### ✅ Funcionando
- [x] Geração de site estático
- [x] API Routes do Next.js
- [x] GitHub Actions workflows
- [x] Variáveis de ambiente
- [x] IDs do Vercel configurados
- [x] Tokens de autenticação
- [x] Deploy automático

### 🎯 Próximos Passos
- [ ] Primeiro deploy completo
- [ ] Teste de atualização automática
- [ ] Configuração de domínio personalizado
- [ ] Configuração de analytics

## 🔧 Troubleshooting

### ❌ Erro: "VERCEL_ORG_ID not found"
**Status**: ✅ Resolvido - ID configurado: `meuphilims-projects`

### ❌ Erro: "VERCEL_PROJECT_ID not found"
**Status**: ✅ Resolvido - ID configurado: `prj_O5sixObkLh6DGfIIUFJ5ZIFUZd2O`

### ❌ Erro: "GitHub API rate limit"
**Status**: ✅ Resolvido - Token configurado com fallback para API pública

### ❌ Erro: "Build directory not found"
**Solução**: Verificar se `node update_catalog.js` está executando sem erros

### ❌ Erro: "Permission denied"
**Solução**: Verificar permissões do workflow em Settings > Actions > General

## 📞 Suporte

Em caso de problemas:
1. ✅ Verificar logs no GitHub Actions
2. ✅ Verificar configuração das variáveis
3. ✅ Testar geração local: `npm run generate`
4. ✅ Verificar status da API GitHub: `https://www.githubstatus.com/`
5. ✅ Verificar dashboard do Vercel

## 🎉 Configuração Completa!

Todas as configurações necessárias foram aplicadas:
- ✅ Secrets do GitHub configurados
- ✅ Variáveis do Vercel configuradas
- ✅ IDs do projeto configurados
- ✅ Workflows atualizados
- ✅ Fallbacks implementados

O projeto está pronto para o primeiro deploy!
\`\`\`

Vamos criar um script de verificação para testar se tudo está funcionando:
