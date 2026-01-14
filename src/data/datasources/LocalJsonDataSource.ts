import type { WalletDataDTO } from '../models';
import walletData from './wallet-data.json';

export class LocalJsonDataSource {
  async getWalletData(): Promise<WalletDataDTO> {
    // Simulate async data fetching
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(walletData as WalletDataDTO);
      }, 100);
    });
  }
}
