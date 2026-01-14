import type { Transaction, WalletData } from '../entities';

export interface ITransactionRepository {
  getAllTransactions(): Promise<Transaction[]>;
  getTransactionById(id: string): Promise<Transaction | null>;
  getWalletData(): Promise<WalletData>;
}
