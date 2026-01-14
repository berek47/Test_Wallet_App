export interface TransactionDTO {
  id: string;
  type: 'Payment' | 'Credit';
  amount: number;
  name: string;
  description: string;
  date: string; // ISO string format
  status: 'Completed' | 'Pending';
  authorizedUser?: string;
  icon: string;
  cashbackPercentage?: number;
  location?: string;
}

export interface WalletDataDTO {
  cardBalance: {
    maxLimit: number;
    currentBalance: number;
  };
  paymentStatus: string;
  transactions: TransactionDTO[];
}
