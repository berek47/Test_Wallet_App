export const TransactionType = {
  PAYMENT: 'Payment',
  CREDIT: 'Credit',
} as const;

export type TransactionType = typeof TransactionType[keyof typeof TransactionType];

export const TransactionStatus = {
  COMPLETED: 'Completed',
  PENDING: 'Pending',
} as const;

export type TransactionStatus = typeof TransactionStatus[keyof typeof TransactionStatus];

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  name: string;
  description: string;
  date: Date;
  status: TransactionStatus;
  authorizedUser?: string;
  icon: string;
  cashbackPercentage?: number;
  location?: string;
}
