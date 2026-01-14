import { useState, useEffect } from 'react';
import type { WalletData } from '../../domain/entities';
import { container } from '../../di';

export const useWalletViewModel = () => {
  const [walletData, setWalletData] = useState<WalletData | null>(null);
  const [dailyPoints, setDailyPoints] = useState<string>('0');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadWalletData();
  }, []);

  const loadWalletData = async () => {
    try {
      setLoading(true);
      const data = await container.getWalletDataUseCase.execute();

      // Calculate daily points
      const points = container.calculateDailyPointsUseCase.execute();
      const formattedPoints = container.calculateDailyPointsUseCase.formatPoints(points);

      setWalletData({ ...data, dailyPoints: points });
      setDailyPoints(formattedPoints);
      setError(null);
    } catch (err) {
      setError('Failed to load wallet data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: Date): string => {
    return container.formatDateUseCase.execute(date);
  };

  return {
    walletData,
    dailyPoints,
    loading,
    error,
    formatDate,
  };
};
