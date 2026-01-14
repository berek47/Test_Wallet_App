import { LocalJsonDataSource } from '../data/datasources';
import { TransactionRepositoryImpl } from '../data/repositories';
import {
  GetWalletDataUseCase,
  GetTransactionByIdUseCase,
  CalculateDailyPointsUseCase,
  FormatDateUseCase,
} from '../domain/usecases';

class DIContainer {
  // Data Layer
  private localJsonDataSource: LocalJsonDataSource;
  private transactionRepository: TransactionRepositoryImpl;

  // Domain Layer (Use Cases)
  public getWalletDataUseCase: GetWalletDataUseCase;
  public getTransactionByIdUseCase: GetTransactionByIdUseCase;
  public calculateDailyPointsUseCase: CalculateDailyPointsUseCase;
  public formatDateUseCase: FormatDateUseCase;

  constructor() {
    // Initialize data sources
    this.localJsonDataSource = new LocalJsonDataSource();

    // Initialize repositories
    this.transactionRepository = new TransactionRepositoryImpl(
      this.localJsonDataSource
    );

    // Initialize use cases
    this.getWalletDataUseCase = new GetWalletDataUseCase(
      this.transactionRepository
    );
    this.getTransactionByIdUseCase = new GetTransactionByIdUseCase(
      this.transactionRepository
    );
    this.calculateDailyPointsUseCase = new CalculateDailyPointsUseCase();
    this.formatDateUseCase = new FormatDateUseCase();
  }
}

// Export singleton instance
export const container = new DIContainer();
