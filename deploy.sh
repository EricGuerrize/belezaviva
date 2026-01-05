#!/bin/bash

# Script para fazer push do repositório para o GitHub
# Execute: ./deploy.sh

echo "🚀 Preparando para fazer push do repositório..."

# Verifica se o remote já existe
if git remote get-url origin > /dev/null 2>&1; then
    echo "✅ Remote 'origin' já configurado"
    git remote -v
else
    echo "⚠️  Remote 'origin' não encontrado"
    echo ""
    echo "Para adicionar o remote, execute:"
    echo "  git remote add origin https://github.com/SEU_USUARIO/beleza-viva.git"
    echo ""
    echo "Ou se preferir SSH:"
    echo "  git remote add origin git@github.com:SEU_USUARIO/beleza-viva.git"
    echo ""
    exit 1
fi

echo ""
echo "📤 Fazendo push para o GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo "✅ Push realizado com sucesso!"
else
    echo "❌ Erro ao fazer push. Verifique suas credenciais e permissões."
fi

