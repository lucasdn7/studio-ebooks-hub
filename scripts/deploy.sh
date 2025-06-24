#!/bin/bash

# Script de Deploy Otimizado - Studio eBooks Hub
# Este script automatiza o processo de deploy para produção

set -e  # Exit on any error

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para logging
log() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

success() {
    echo -e "${GREEN}✅ $1${NC}"
}

warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

error() {
    echo -e "${RED}❌ $1${NC}"
}

# Configurações
PROJECT_NAME="studio-ebooks-hub"
BUILD_DIR="dist"
BACKUP_DIR="backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")

# Verificar se estamos no diretório correto
if [ ! -f "package.json" ]; then
    error "Execute este script no diretório raiz do projeto"
    exit 1
fi

log "🚀 Iniciando deploy do $PROJECT_NAME"

# 1. Verificar dependências
log "📦 Verificando dependências..."
if [ ! -d "node_modules" ]; then
    log "Instalando dependências..."
    npm ci --production=false
    success "Dependências instaladas"
else
    log "Verificando atualizações de dependências..."
    npm ci --production=false
    success "Dependências atualizadas"
fi

# 2. Verificar vulnerabilidades
log "🔒 Verificando vulnerabilidades de segurança..."
if npm audit --audit-level=moderate; then
    success "Nenhuma vulnerabilidade crítica encontrada"
else
    warning "Vulnerabilidades encontradas. Execute 'npm audit fix' para corrigir"
    read -p "Deseja continuar mesmo com vulnerabilidades? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        error "Deploy cancelado devido a vulnerabilidades"
        exit 1
    fi
fi

# 3. Executar testes
log "🧪 Executando testes..."
if npm test -- --run --reporter=verbose; then
    success "Todos os testes passaram"
else
    error "Testes falharam. Deploy cancelado"
    exit 1
fi

# 4. Verificar cobertura de código
log "📊 Verificando cobertura de código..."
if npm run test:coverage; then
    success "Cobertura de código verificada"
else
    warning "Cobertura de código baixa detectada"
fi

# 5. Linting
log "🔍 Executando linting..."
if npm run lint; then
    success "Linting passou"
else
    error "Linting falhou. Corrija os erros antes do deploy"
    exit 1
fi

# 6. Criar backup do build anterior
if [ -d "$BUILD_DIR" ]; then
    log "💾 Criando backup do build anterior..."
    mkdir -p "$BACKUP_DIR"
    tar -czf "$BACKUP_DIR/build_backup_$TIMESTAMP.tar.gz" "$BUILD_DIR"
    success "Backup criado: $BACKUP_DIR/build_backup_$TIMESTAMP.tar.gz"
fi

# 7. Limpar build anterior
log "🧹 Limpando build anterior..."
rm -rf "$BUILD_DIR"
success "Build anterior removido"

# 8. Build para produção
log "🏗️  Criando build de produção..."
if npm run build; then
    success "Build de produção criado com sucesso"
else
    error "Falha no build de produção"
    exit 1
fi

# 9. Verificar tamanho do build
log "📏 Verificando tamanho do build..."
BUILD_SIZE=$(du -sh "$BUILD_DIR" | cut -f1)
log "Tamanho do build: $BUILD_SIZE"

# 10. Verificar arquivos críticos
log "🔍 Verificando arquivos críticos..."
CRITICAL_FILES=("index.html" "assets/index.js" "assets/index.css")
for file in "${CRITICAL_FILES[@]}"; do
    if [ -f "$BUILD_DIR/$file" ]; then
        success "✅ $file encontrado"
    else
        error "❌ $file não encontrado"
        exit 1
    fi
done

# 11. Otimizações pós-build
log "⚡ Aplicando otimizações pós-build..."

# Comprimir arquivos estáticos
if command -v gzip &> /dev/null; then
    log "Comprimindo arquivos estáticos..."
    find "$BUILD_DIR" -type f \( -name "*.js" -o -name "*.css" -o -name "*.html" \) -exec gzip -k {} \;
    success "Compressão aplicada"
fi

# 12. Verificar integridade
log "🔐 Verificando integridade dos arquivos..."
if [ -f "$BUILD_DIR/index.html" ]; then
    HTML_CHECKSUM=$(md5sum "$BUILD_DIR/index.html" | cut -d' ' -f1)
    log "Checksum do index.html: $HTML_CHECKSUM"
    success "Verificação de integridade concluída"
fi

# 13. Preparar para deploy
log "📤 Preparando para deploy..."

# Criar arquivo de metadados do deploy
cat > "$BUILD_DIR/deploy-info.json" << EOF
{
  "project": "$PROJECT_NAME",
  "version": "$(node -p "require('./package.json').version")",
  "timestamp": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
  "buildSize": "$BUILD_SIZE",
  "nodeVersion": "$(node --version)",
  "npmVersion": "$(npm --version)",
  "gitCommit": "$(git rev-parse HEAD 2>/dev/null || echo 'unknown')",
  "gitBranch": "$(git branch --show-current 2>/dev/null || echo 'unknown')"
}
EOF

success "Metadados do deploy criados"

# 14. Deploy (exemplo para diferentes plataformas)
log "🚀 Iniciando deploy..."

# Detectar plataforma de deploy
if [ -n "$VERCEL_TOKEN" ]; then
    log "Detectado Vercel - fazendo deploy..."
    npx vercel --prod --token "$VERCEL_TOKEN"
elif [ -n "$NETLIFY_TOKEN" ]; then
    log "Detectado Netlify - fazendo deploy..."
    npx netlify deploy --prod --dir "$BUILD_DIR" --auth "$NETLIFY_TOKEN"
elif [ -n "$FIREBASE_TOKEN" ]; then
    log "Detectado Firebase - fazendo deploy..."
    npx firebase deploy --token "$FIREBASE_TOKEN"
else
    log "Nenhuma plataforma detectada. Build pronto em: $BUILD_DIR"
    log "Para fazer deploy, configure as variáveis de ambiente apropriadas:"
    log "  - VERCEL_TOKEN para Vercel"
    log "  - NETLIFY_TOKEN para Netlify"
    log "  - FIREBASE_TOKEN para Firebase"
fi

# 15. Limpeza
log "🧹 Limpando arquivos temporários..."
rm -rf node_modules/.cache
success "Limpeza concluída"

# 16. Relatório final
log "📋 Relatório do Deploy:"
echo "=================================="
echo "✅ Build criado com sucesso"
echo "📏 Tamanho: $BUILD_SIZE"
echo "🕒 Timestamp: $(date)"
echo "📁 Localização: $BUILD_DIR"
echo "💾 Backup: $BACKUP_DIR/build_backup_$TIMESTAMP.tar.gz"
echo "=================================="

success "🎉 Deploy concluído com sucesso!"

# 17. Notificações (opcional)
if [ -n "$SLACK_WEBHOOK_URL" ]; then
    log "📢 Enviando notificação para Slack..."
    curl -X POST -H 'Content-type: application/json' \
        --data "{\"text\":\"🚀 Deploy do $PROJECT_NAME concluído com sucesso! Tamanho: $BUILD_SIZE\"}" \
        "$SLACK_WEBHOOK_URL"
fi

if [ -n "$DISCORD_WEBHOOK_URL" ]; then
    log "📢 Enviando notificação para Discord..."
    curl -X POST -H 'Content-type: application/json' \
        --data "{\"content\":\"🚀 Deploy do $PROJECT_NAME concluído com sucesso! Tamanho: $BUILD_SIZE\"}" \
        "$DISCORD_WEBHOOK_URL"
fi

log "✨ Deploy finalizado!" 