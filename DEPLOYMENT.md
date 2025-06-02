# 🚀 Guia de Deploy - GitHub Pages

## 📋 Configuração Completa ✅

### 1. Variáveis de Ambiente Configuradas

**GitHub Repository Secrets:**
- `GITHUB_USERNAME`:  ✅
- `GITHUB_TOKEN`:  ✅

**Environment Variables (Automáticas):**
- `GITHUB_USERNAME`: Configurado via secrets ou repository owner
- `NEXT_PUBLIC_GITHUB_USERNAME`: Configurado automaticamente
- `GITHUB_TOKEN`: Token para acesso à API do GitHub

## 🎯 URL de Deploy

### 🌐 GitHub Pages (Site Estático)
- **URL**: `https://meuphilim.github.io/Portifolio`
- **Tipo**: Site estático Next.js exportado
- **Deploy**: Automático via GitHub Actions

## 🔄 Workflow Configurado

### `deploy.yml` - GitHub Pages Deploy
- **Trigger**: 
  - Push na branch `main`
  - Pull requests para `main`
  - Schedule: A cada 12 horas (00:00 e 12:00 UTC)
  - Manual via `workflow_dispatch`
- **Função**: Build Next.js + Deploy para GitHub Pages
- **Duração**: ~3-5 minutos
- **Status**: ✅ Configurado

## 🚀 Processo de Deploy

### 1. Deploy Automático
```bash
# Qualquer push na branch main ativa automaticamente:
git add .
git commit -m "feat: nova funcionalidade"
git push origin main

# Isso irá:
# 1. Fazer build do Next.js (export estático)
# 2. Deploy para GitHub Pages
# 3. Atualizar dados dos repositórios
```

### 2. Deploy Manual
```bash
# Via GitHub Actions (manual)
# 1. Ir para: https://github.com/meuphilim/Portifolio/actions
# 2. Selecionar workflow "Deploy to GitHub Pages"
# 3. Clicar em "Run workflow"

# Via linha de comando (local)
npm run build
# Arquivos gerados em ./out/
```

### 3. Monitoramento
- **GitHub Actions**: `https://github.com/meuphilim/Portifolio/actions`
- **GitHub Pages**: Settings > Pages
- **Site ao vivo**: `https://meuphilim.github.io/Portifolio`

## 🔧 Comandos Úteis

### Desenvolvimento Local
```bash
# Instalar dependências
npm install

# Desenvolvimento Next.js
npm run dev

# Gerar site estático
npm run build

# Gerar dados do portfólio
npm run gerar

# Limpar arquivos de build
npm run limpar
```

### GitHub CLI
```bash
# Ver workflows
gh workflow list

# Ver execuções
gh run list

# Ver logs de execução
gh run view [RUN_ID] --log

# Executar workflow manualmente
gh workflow run "Deploy to GitHub Pages"
```

## 📊 Status dos Deploys

### ✅ Funcionando
- [x] Geração de site estático
- [x] GitHub Actions workflow
- [x] Variáveis de ambiente
- [x] Deploy automático para GitHub Pages
- [x] Atualização automática de dados
- [x] Fallback para dados de exemplo

### 🎯 Próximos Passos
- [ ] Configuração de domínio personalizado
- [ ] Configuração de analytics
- [ ] Otimizações de performance
- [ ] Implementação de PWA

## 🔧 Troubleshooting

### ❌ Erro: "GitHub Pages build failed"
**Solução**: 
1. Verificar logs no GitHub Actions
2. Verificar se o arquivo `.nojekyll` existe
3. Verificar se o diretório `out` foi gerado corretamente

### ❌ Erro: "GitHub API rate limit"
**Solução**: 
1. Configurar `GITHUB_TOKEN` nos secrets
2. O sistema usa fallback automático para dados de exemplo

### ❌ Erro: "Build directory not found"
**Solução**: 
1. Verificar se `node update_catalog.js` está executando sem erros
2. Verificar se as dependências estão instaladas

### ❌ Erro: "Permission denied"
**Solução**: 
1. Verificar permissões do workflow em Settings > Actions > General
2. Verificar se GitHub Pages está habilitado

## 📞 Suporte

Em caso de problemas:
1. ✅ Verificar logs no GitHub Actions
2. ✅ Verificar configuração das variáveis
3. ✅ Testar build local: `npm run build`
4. ✅ Verificar status da API GitHub: `https://www.githubstatus.com/`
5. ✅ Verificar configurações do GitHub Pages

## 🎉 Configuração Completa!

Todas as configurações necessárias foram aplicadas:
- ✅ Secrets do GitHub configurados
- ✅ Workflow do GitHub Actions configurado
- ✅ Next.js configurado para export estático
- ✅ GitHub Pages habilitado
- ✅ Fallbacks implementados

O projeto está pronto para deploy no GitHub Pages!

## 🌐 Configuração do GitHub Pages

### Passos para Habilitar GitHub Pages:

1. **Ir para Settings do Repositório**
   - Acesse: `https://github.com/meuphilim/Portifolio/settings`

2. **Configurar Pages**
   - Vá para a seção "Pages" no menu lateral
   - Source: "GitHub Actions"
   - Branch: Não aplicável (usando GitHub Actions)

3. **Verificar Deploy**
   - Após o primeiro push, verificar em Actions
   - Site estará disponível em: `https://meuphilim.github.io/Portifolio`

### Domínio Personalizado (Opcional):

Para configurar um domínio personalizado:

1. **Adicionar CNAME**
   - Criar arquivo `CNAME` na raiz do repositório
   - Conteúdo: `seudominio.com`

2. **Configurar DNS**
   - Apontar CNAME para `meuphilim.github.io`

3. **Habilitar HTTPS**
   - GitHub Pages habilita automaticamente
```
