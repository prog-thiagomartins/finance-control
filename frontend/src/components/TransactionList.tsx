import React from 'react';
import { Transaction } from '../types/transaction';
import { TransactionItem } from './TransactionItem';
import { formatCurrency } from '../utils/formatters';

interface TransactionListProps {
  transactions: Transaction[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: number) => void;
  isLoading?: boolean;
}

export const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  onEdit,
  onDelete,
  isLoading = false
}) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow animate-pulse">
            <div className="flex items-center justify-between">
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/4"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-20"></div>
                <div className="h-3 bg-gray-200 rounded w-16"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-1">
          Nenhum lançamento encontrado
        </h3>
        <p className="text-gray-500">
          Adicione seu primeiro lançamento financeiro usando o formulário acima.
        </p>
      </div>
    );
  }

  const totalReceitas = transactions
    .filter(t => t.transaction_type === 'receita')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalDespesas = transactions
    .filter(t => t.transaction_type === 'despesa')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const saldo = totalReceitas - totalDespesas;

  return (
    <div className="space-y-6">
      {/* Resumo */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Resumo</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="text-center">
            <p className="text-sm font-medium text-gray-500">Total Receitas</p>
            <p className="text-2xl font-bold text-green-600">
              {formatCurrency(totalReceitas)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-500">Total Despesas</p>
            <p className="text-2xl font-bold text-red-600">
              {formatCurrency(totalDespesas)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-500">Saldo</p>
            <p className={`text-2xl font-bold ${saldo >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatCurrency(saldo)}
            </p>
          </div>
        </div>
      </div>

      {/* Lista de transações */}
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Lançamentos ({transactions.length})
        </h2>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              transaction={transaction}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
};