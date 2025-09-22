import axios from 'axios';
import { Transaction, TransactionCreate, TransactionUpdate, TransactionFilters } from '../types/transaction';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const transactionAPI = {
  // Listar transações
  getTransactions: async (filters?: TransactionFilters): Promise<Transaction[]> => {
    const params = new URLSearchParams();

    if (filters?.transaction_type) {
      params.append('transaction_type', filters.transaction_type);
    }
    if (filters?.start_date) {
      params.append('start_date', filters.start_date);
    }
    if (filters?.end_date) {
      params.append('end_date', filters.end_date);
    }

    const response = await api.get(`/transactions?${params.toString()}`);
    return response.data;
  },

  // Buscar transação por ID
  getTransaction: async (id: number): Promise<Transaction> => {
    const response = await api.get(`/transactions/${id}`);
    return response.data;
  },

  // Criar transação
  createTransaction: async (transaction: TransactionCreate): Promise<Transaction> => {
    const response = await api.post('/transactions', transaction);
    return response.data;
  },

  // Atualizar transação
  updateTransaction: async (id: number, transaction: TransactionUpdate): Promise<Transaction> => {
    const response = await api.put(`/transactions/${id}`, transaction);
    return response.data;
  },

  // Deletar transação
  deleteTransaction: async (id: number): Promise<void> => {
    await api.delete(`/transactions/${id}`);
  },
};

