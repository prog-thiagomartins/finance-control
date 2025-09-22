export enum TransactionType {
  RECEITA = 'receita',
  DESPESA = 'despesa'
}

export interface Transaction {
  id: number;
  description: string;
  amount: number;
  transaction_type: TransactionType;
  transaction_date: string;
  created_at: string;
  updated_at: string;
}

export interface TransactionCreate {
  description: string;
  amount: number;
  transaction_type: TransactionType;
  transaction_date: string;
}

export interface TransactionUpdate {
  description?: string;
  amount?: number;
  transaction_type?: TransactionType;
  transaction_date?: string;
}

export interface TransactionFilters {
  transaction_type?: TransactionType;
  start_date?: string;
  end_date?: string;
}