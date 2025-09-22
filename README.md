# FinanceControl - Sistema Pessoal de DRE

Sistema web para controle financeiro com foco em DRE (Demonstração do Resultado do Exercício).

## 📋 Pré-requisitos

- **Docker** e **Docker Compose** instalados
- **Git** para clonar o repositório

## Stack Tecnológica

- **Frontend:** React + TypeScript + Tailwind CSS
- **Backend:** FastAPI + Python + SQLAlchemy
- **Banco:** PostgreSQL
- **Containerização:** Docker + Docker Compose

## Estrutura do Projeto

```
finance-control/
├── frontend/           # React App (Port 3000)
├── backend/           # FastAPI (Port 8000)
├── database/          # Scripts SQL
├── docker-compose.yml # Orquestração Docker
├── run.sh             # Script de execução automática
└── README.md          # Documentação
```

## 🗓️ Roadmap - 4 Entregas Semanais

### ✅ **Semana 1 - Base Funcional (CONCLUÍDA)**

- ✅ Formulário de criar transações (receitas/despesas)
- ✅ Lista de transações por mês
- ✅ Editar transações
- ✅ Deletar transações
- ✅ Filtro por período mensal
- ✅ Interface responsiva completa

### 📂 **Semana 2 - Sistema de Categorização**

- 🔄 Gestão de categorias (criar, listar, deletar)
- 🔗 Associar transações → categorias
- 🔍 Filtros por categoria
- 📊 Visualização por categoria

### 🔄 **Semana 3 - Despesas Fixas**

- 📅 Configurar despesas recorrentes
- ⚡ Geração automática mensal
- 🔔 Indicadores visuais (fixas vs variáveis)

### 📊 **Semana 4 - Relatórios e Insights**

- 📈 Resumo mensal (receitas, despesas, saldo)
- 📊 Gráficos básicos
- 📤 Exportação de dados
- Etc

## 🚀 Como Executar

### Método Simples (Recomendado)

```bash
./run.sh
```

### Método Manual

```bash
# 1. Subir toda a aplicação
docker-compose up -d

# Ou com rebuild se necessário
docker-compose up -d --build
```

### Acessar a Aplicação

- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:8000
- **API Docs:** http://localhost:8000/docs

### Comandos Úteis

```bash
# Parar aplicação
docker-compose down

# Ver logs de todos os serviços
docker-compose logs -f

# Ver logs de um serviço específico
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f db

# Rebuild (após mudanças no código)
docker-compose up -d --build

# Limpar tudo e recomeçar
docker-compose down -v
docker-compose up -d --build
```

## 🔧 Troubleshooting

### Problemas Comuns

**Erro de porta já em uso:**

```bash
# Verificar se as portas 3000, 8000 ou 5432 estão sendo usadas
netstat -ano | findstr :3000
netstat -ano | findstr :8000
netstat -ano | findstr :5432
```

**Container não sobe:**

```bash
# Ver logs detalhados
docker-compose logs -f

# Rebuild completo
docker-compose down -v
docker-compose up -d --build
```

**Erro de conexão com banco:**

```bash
# Verificar se o container do banco está rodando
docker-compose ps

# Aguardar mais tempo para o banco inicializar
docker-compose logs -f db
```

## 🔧 Configuração

### Variáveis de Ambiente

O projeto usa as seguintes variáveis de ambiente principais:

```bash
# Database
DATABASE_URL=postgresql://postgres:postgres123@db:5432/finance_control
POSTGRES_PASSWORD=postgres123

# Application
DEBUG=true
ALLOWED_ORIGINS=http://localhost:3000

# Frontend
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

### Para Produção

```bash
# Altere estas configurações para produção:
DATABASE_URL=postgresql://postgres:SENHA_SEGURA@db:5432/finance_control
POSTGRES_PASSWORD=SENHA_SEGURA
DEBUG=false
ALLOWED_ORIGINS=https://seudominio.com
VITE_API_BASE_URL=https://api.seudominio.com/api/v1
```

### Segurança e Boas Práticas

- ✅ Arquitetura em camadas bem definidas
- ✅ Validações robustas no backend e frontend
- ✅ TypeScript para type safety
- ✅ Docker para isolamento de ambiente
- ✅ Configurações via variáveis de ambiente
- ✅ CORS configurável
- ✅ Código limpo e bem documentado

## 🎯 Funcionalidades Atuais (v1.0)

### ✅ **Sistema Completo de Transações**

- 🆕 **Criar** receitas e despesas
- ✏️ **Editar** transações existentes
- 🗑️ **Deletar** transações
- 📋 **Listar** todas as transações
- 🔍 **Filtrar** por mês/período
- 💱 **Tipos:** receita ou despesa
- 📅 **Campos:** descrição, valor, tipo, data

### 🖥️ **Interface**

- 📱 Design responsivo (mobile/desktop)
- 🎨 Tailwind CSS moderno
- ⚡ Modais para criação/edição
- 🔄 Loading states
- ✅ Validação de formulários

## 🛠️ Desenvolvimento

### Estrutura das Pastas

```
backend/
├── app/
│   ├── main.py              # Entrada da aplicação
│   ├── config.py            # Configurações
│   ├── database.py          # Conexão com BD
│   ├── models/              # Modelos SQLAlchemy
│   ├── schemas/             # Schemas Pydantic
│   ├── routes/              # Endpoints da API
│   └── services/            # Lógica de negócio

frontend/
├── src/
│   ├── App.tsx              # Componente principal
│   ├── components/          # Componentes React
│   ├── services/            # Integração com API
│   ├── types/               # Tipos TypeScript
│   └── utils/               # Funções utilitárias
```

### API Endpoints

- `GET /api/v1/transactions` - Listar transações
- `POST /api/v1/transactions` - Criar transação
- `GET /api/v1/transactions/{id}` - Buscar transação
- `PUT /api/v1/transactions/{id}` - Atualizar transação
- `DELETE /api/v1/transactions/{id}` - Deletar transação

### Hot Reload

- **Frontend:** Vite com hot reload automático
- **Backend:** Uvicorn com reload automático
- Mudanças no código são refletidas instantaneamente

---

_Projeto desenvolvido para fins acadêmicos_
