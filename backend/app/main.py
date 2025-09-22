from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .config import settings
from .routes import transactions
from .database import engine, Base
from .models import transaction

# Criar tabelas
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.app_title,
    version=settings.app_version,
    description="API para controle financeiro pessoal com DRE"
)

# CORS para desenvolvimento
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

# Incluir rotas
app.include_router(transactions.router, prefix="/api/v1")

@app.get("/")
def root():
    return {"message": "Finance Control API", "version": settings.app_version}

@app.get("/health")
def health_check():
    return {"status": "healthy"}