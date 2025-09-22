import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { TransactionCreate, TransactionType, Transaction } from '../types/transaction';

interface TransactionFormProps {
  onSubmit: (data: TransactionCreate) => void;
  onCancel?: () => void;
  isLoading?: boolean;
  initialData?: Transaction | null;
}

export const TransactionForm: React.FC<TransactionFormProps> = ({
  onSubmit,
  onCancel,
  isLoading = false,
  initialData
}) => {
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<TransactionCreate>({
    defaultValues: {
      transaction_date: new Date().toISOString().split('T')[0],
      transaction_type: TransactionType.RECEITA
    }
  });

  // Preencher formulário quando estiver editando
  useEffect(() => {
    if (initialData) {
      setValue('description', initialData.description);
      setValue('amount', initialData.amount);
      setValue('transaction_type', initialData.transaction_type);
      setValue('transaction_date', initialData.transaction_date);
    } else {
      reset({
        transaction_date: new Date().toISOString().split('T')[0],
        transaction_type: TransactionType.RECEITA
      });
    }
  }, [initialData, setValue, reset]);

  const handleFormSubmit = (data: TransactionCreate) => {
    onSubmit(data);
    if (!initialData) {
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Descrição
          </label>
          <input
            type="text"
            {...register('description', {
              required: 'Descrição é obrigatória',
              minLength: { value: 3, message: 'Descrição deve ter pelo menos 3 caracteres' }
            })}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2 border"
            placeholder="Ex: Salário, Supermercado, Aluguel..."
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
            Valor (R$)
          </label>
          <input
            type="number"
            step="0.01"
            min="0.01"
            {...register('amount', {
              required: 'Valor é obrigatório',
              min: { value: 0.01, message: 'Valor deve ser maior que zero' }
            })}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2 border"
            placeholder="0,00"
          />
          {errors.amount && (
            <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="transaction_type" className="block text-sm font-medium text-gray-700">
            Tipo
          </label>
          <select
            {...register('transaction_type', { required: 'Tipo é obrigatório' })}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2 border"
          >
            <option value={TransactionType.RECEITA}>Receita</option>
            <option value={TransactionType.DESPESA}>Despesa</option>
          </select>
          {errors.transaction_type && (
            <p className="mt-1 text-sm text-red-600">{errors.transaction_type.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="transaction_date" className="block text-sm font-medium text-gray-700">
            Data
          </label>
          <input
            type="date"
            {...register('transaction_date', { required: 'Data é obrigatória' })}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2 border"
          />
          {errors.transaction_date && (
            <p className="mt-1 text-sm text-red-600">{errors.transaction_date.message}</p>
          )}
        </div>

      </div>

      <div className="flex justify-end space-x-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            Cancelar
          </button>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {isLoading ? 'Salvando...' : (initialData ? 'Atualizar Lançamento' : 'Adicionar Lançamento')}
        </button>
      </div>
    </form>
  );
};