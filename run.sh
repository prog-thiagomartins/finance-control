#!/bin/bash

echo "🚀 Iniciando Finance Control..."
echo ""

# Verificar se Docker está rodando
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker não está rodando. Por favor, inicie o Docker primeiro."
    exit 1
fi

# Criar arquivo .env se não existir
if [ ! -f .env ]; then
    echo "📝 Criando arquivo .env..."
    cp .env.example .env
fi

echo "🐳 Subindo os containers..."
docker-compose up -d

echo ""
echo "⏳ Aguardando serviços ficarem prontos..."
sleep 10

echo ""
echo "✅ Aplicação rodando!"
echo ""
echo "🌐 Frontend: http://localhost:3000"
echo "🔗 Backend: http://localhost:8000"
echo "📚 API Docs: http://localhost:8000/docs"
echo ""
echo "Para parar: docker-compose down"
echo "Para ver logs: docker-compose logs -f"