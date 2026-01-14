import type { CardBalance } from './CardBalance';
import type { Transaction } from './Transaction';

export interface WalletData {
  cardBalance: CardBalance;
  dailyPoints: number;
  transactions: Transaction[];
  paymentStatus: string;
}
