import type { ITransactionRepository } from '../../domain/repositories';
import type {
  Transaction,
  TransactionType,
  TransactionStatus,
  WalletData,
} from '../../domain/entities';
import { LocalJsonDataSource } from '../datasources';
import type { TransactionDTO } from '../models';

export class TransactionRepositoryImpl implements ITransactionRepository {
  private dataSource: LocalJsonDataSource;

  constructor(dataSource: LocalJsonDataSource) {
    this.dataSource = dataSource;
  }

  async getAllTransactions(): Promise<Transaction[]> {
    const walletData = await this.dataSource.getWalletData();
    return walletData.transactions.map(this.mapDTOToEntity);
  }

  async getTransactionById(id: string): Promise<Transaction | null> {
    const walletData = await this.dataSource.getWalletData();
    const transactionDTO = walletData.transactions.find((t) => t.id === id);
    return transactionDTO ? this.mapDTOToEntity(transactionDTO) : null;
  }

  async getWalletData(): Promise<WalletData> {
    const walletDataDTO = await this.dataSource.getWalletData();
    const transactions = walletDataDTO.transactions.map(this.mapDTOToEntity);

    return {
      cardBalance: {
        maxLimit: walletDataDTO.cardBalance.maxLimit,
        currentBalance: walletDataDTO.cardBalance.currentBalance,
        availableFunds:
          walletDataDTO.cardBalance.maxLimit -
          walletDataDTO.cardBalance.currentBalance,
      },
      dailyPoints: 0, // Will be calculated by use case
      transactions,
      paymentStatus: walletDataDTO.paymentStatus,
    };
  }

  private mapDTOToEntity(dto: TransactionDTO): Transaction {
    return {
      id: dto.id,
      type: dto.type as TransactionType,
      amount: dto.amount,
      name: dto.name,
      description: dto.description,
      date: new Date(dto.date),
      status: dto.status as TransactionStatus,
      authorizedUser: dto.authorizedUser,
      icon: dto.icon,
      cashbackPercentage: dto.cashbackPercentage,
      location: dto.location,
    };
  }
}
