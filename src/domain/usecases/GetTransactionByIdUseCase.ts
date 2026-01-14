import type { Transaction } from '../entities';
import type { ITransactionRepository } from '../repositories';

export class GetTransactionByIdUseCase {
  private transactionRepository: ITransactionRepository;

  constructor(transactionRepository: ITransactionRepository) {
    this.transactionRepository = transactionRepository;
  }

  async execute(id: string): Promise<Transaction | null> {
    return await this.transactionRepository.getTransactionById(id);
  }
}
