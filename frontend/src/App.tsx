import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { TransactionForm } from './components/TransactionForm';
import { TransactionList } from './components/TransactionList';
import { transactionAPI } from './services/api';
import { Transaction, TransactionCreate } from './types/transaction';
import { Plus, X } from 'lucide-react';

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  });

  // Carregar dados na inicialização
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const transactionsData = await transactionAPI.getTransactions();
      setTransactions(transactionsData);
    } catch (error) {
      alert('Erro ao carregar dados. Verifique se o servidor está rodando.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateTransaction = async (transactionData: TransactionCreate) => {
    try {
      setIsSubmitting(true);
      const newTransaction = await transactionAPI.createTransaction(transactionData);

      // Inserir na posição correta baseado na data
      setTransactions(prev => {
        const updated = [...prev, newTransaction];
        return updated.sort((a, b) => {
          const dateA = new Date(a.transaction_date);
          const dateB = new Date(b.transaction_date);
          if (dateA.getTime() === dateB.getTime()) {
            return b.id - a.id; // Se mesma data, mais recente por ID
          }
          return dateB.getTime() - dateA.getTime(); // Mais recente primeiro
        });
      });

      // Fechar modal após criar
      setIsModalOpen(false);
    } catch (error) {
      alert('Erro ao criar transação. Verifique os dados e tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditTransaction = async (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleUpdateTransaction = async (transactionData: TransactionCreate) => {
    if (!editingTransaction) return;

    try {
      setIsSubmitting(true);
      const updatedTransaction = await transactionAPI.updateTransaction(editingTransaction.id, transactionData);

      // Atualizar e reordenar
      setTransactions(prev => {
        const updated = prev.map(t =>
          t.id === editingTransaction.id ? updatedTransaction : t
        );
        return updated.sort((a, b) => {
          const dateA = new Date(a.transaction_date);
          const dateB = new Date(b.transaction_date);
          if (dateA.getTime() === dateB.getTime()) {
            return b.id - a.id; // Se mesma data, mais recente por ID
          }
          return dateB.getTime() - dateA.getTime(); // Mais recente primeiro
        });
      });

      setIsModalOpen(false);
      setEditingTransaction(null);
    } catch (error) {
      alert('Erro ao atualizar transação. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTransaction(null);
  };

  const handleDeleteTransaction = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir este lançamento?')) {
      return;
    }

    try {
      await transactionAPI.deleteTransaction(id);
      setTransactions(prev => prev.filter(t => t.id !== id));
    } catch (error) {
      alert('Erro ao deletar transação. Tente novamente.');
    }
  };


  // Filtrar transações
  const filteredTransactions = transactions.filter(transaction => {
    const transactionDate = new Date(transaction.transaction_date);
    const transactionMonth = `${transactionDate.getFullYear()}-${String(transactionDate.getMonth() + 1).padStart(2, '0')}`;

    return transactionMonth === selectedMonth;
  });

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header com botões */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">
            Meus Lançamentos
          </h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center space-x-2 transition-colors"
          >
            <Plus size={20} />
            <span>Novo Lançamento</span>
          </button>
        </div>

        {/* Filtros */}
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">Período:</label>
              <input
                type="month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div className="text-sm text-gray-500 ml-auto">
              {filteredTransactions.length} lançamento{filteredTransactions.length !== 1 ? 's' : ''} encontrado{filteredTransactions.length !== 1 ? 's' : ''}
            </div>
          </div>
        </div>

        {/* Lista sempre visível */}
        <TransactionList
          transactions={filteredTransactions}
          onEdit={handleEditTransaction}
          onDelete={handleDeleteTransaction}
          isLoading={isLoading}
        />

        {/* Modal para novo lançamento */}
        {isModalOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-in fade-in duration-200"
            onClick={() => setIsModalOpen(false)}
          >
            <div
              className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto transform transition-all animate-in slide-in-from-bottom-4 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header do Modal */}
              <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingTransaction ? 'Editar Lançamento' : 'Novo Lançamento'}
                </h2>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-2 transition-all"
                  title="Fechar"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Formulário */}
              <TransactionForm
                onSubmit={editingTransaction ? handleUpdateTransaction : handleCreateTransaction}
                onCancel={handleCloseModal}
                isLoading={isSubmitting}
                initialData={editingTransaction}
              />
            </div>
          </div>
        )}

      </div>
    </Layout>
  );
}

export default App;