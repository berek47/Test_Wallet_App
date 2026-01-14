import type { WalletData } from '../entities';
import type { ITransactionRepository } from '../repositories';

export class GetWalletDataUseCase {
  private transactionRepository: ITransactionRepository;

  constructor(transactionRepository: ITransactionRepository) {
    this.transactionRepository = transactionRepository;
  }

  async execute(): Promise<WalletData> {
    return await this.transactionRepository.getWalletData();
  }
}
