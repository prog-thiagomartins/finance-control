-- Finance Control Database Schema
-- Fase 1: Transações básicas

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enum para tipos de transação
CREATE TYPE transaction_type AS ENUM ('receita', 'despesa');

-- Tabela principal de transações
CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    amount DECIMAL(15,2) NOT NULL CHECK (amount > 0),
    transaction_type transaction_type NOT NULL,
    transaction_date DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Índices para performance
CREATE INDEX idx_transactions_date ON transactions(transaction_date);
CREATE INDEX idx_transactions_type ON transactions(transaction_type);
CREATE INDEX idx_transactions_created_at ON transactions(created_at);

-- Trigger para updated_at automático
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_transactions_updated_at
    BEFORE UPDATE ON transactions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Comentários nas tabelas
COMMENT ON TABLE transactions IS 'Tabela principal para armazenar lançamentos financeiros';
COMMENT ON COLUMN transactions.description IS 'Descrição do lançamento financeiro';
COMMENT ON COLUMN transactions.amount IS 'Valor do lançamento (sempre positivo)';
COMMENT ON COLUMN transactions.transaction_type IS 'Tipo: receita ou despesa';
COMMENT ON COLUMN transactions.transaction_date IS 'Data do lançamento';
COMMENT ON COLUMN transactions.created_at IS 'Data de criação do registro';
COMMENT ON COLUMN transactions.updated_at IS 'Data da última atualização';