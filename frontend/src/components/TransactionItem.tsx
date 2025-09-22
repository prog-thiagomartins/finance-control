import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { Transaction, TransactionType } from '../types/transaction';
import { formatCurrency, formatDate } from '../utils/formatters';

interface TransactionItemProps {
  transaction: Transaction;
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: number) => void;
}

export const TransactionItem: React.FC<TransactionItemProps> = ({
  transaction,
  onEdit,
  onDelete
}) => {
  const isReceita = transaction.transaction_type === TransactionType.RECEITA;

  return (
    <div className="bg-white p-4 rounded-lg shadow border-l-4 border-l-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-medium text-gray-900">
                  {transaction.description}
                </h3>
                {transaction.category_name && (
                  <span
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white"
                    style={{ backgroundColor: transaction.category_color || '#6B7280' }}
                  >
                    {transaction.category_name}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500">
                {formatDate(transaction.transaction_date)}
              </p>
            </div>

            <div className="text-right">
              <p className={`text-lg font-semibold ${
                isReceita ? 'text-green-600' : 'text-red-600'
              }`}>
                {isReceita ? '+' : '-'} {formatCurrency(transaction.amount)}
              </p>
              <p className={`text-sm font-medium ${
                isReceita ? 'text-green-500' : 'text-red-500'
              }`}>
                {isReceita ? 'Receita' : 'Despesa'}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 ml-4">
          <button
            onClick={() => onEdit(transaction)}
            className="p-2 text-gray-400 hover:text-indigo-600 transition-colors"
            title="Editar"
          >
            <Pencil size={16} />
          </button>
          <button
            onClick={() => onDelete(transaction.id)}
            className="p-2 text-gray-400 hover:text-red-600 transition-colors"
            title="Excluir"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};