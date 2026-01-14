import { useState, useEffect } from 'react';
import type { Transaction } from '../../domain/entities';
import { container } from '../../di';

export const useTransactionDetailViewModel = (transactionId: string) => {
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTransaction();
  }, [transactionId]);

  const loadTransaction = async () => {
    try {
      setLoading(true);
      const data = await container.getTransactionByIdUseCase.execute(transactionId);
      setTransaction(data);
      setError(null);
    } catch (err) {
      setError('Failed to load transaction');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: Date): string => {
    return container.formatDateUseCase.execute(date);
  };

  return {
    transaction,
    loading,
    error,
    formatDate,
  };
};
