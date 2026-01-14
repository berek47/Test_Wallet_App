import { useNavigate } from 'react-router-dom';
import { useWalletViewModel } from '../viewmodels';
import { TransactionItem } from '../components';
import './TransactionsList.css';

export const TransactionsList: React.FC = () => {
  const navigate = useNavigate();
  const { walletData, dailyPoints, loading, error, formatDate } = useWalletViewModel();

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error || !walletData) {
    return <div className="error">{error || 'Failed to load data'}</div>;
  }

  const handleTransactionClick = (id: string) => {
    navigate(`/transaction/${id}`);
  };

  return (
    <div className="transactions-list-container">
      <div className="top-grid">
        <div className="card-balance-card">
          <div className="card-label">Card Balance</div>
          <div className="card-amount">${walletData.cardBalance.currentBalance.toFixed(2)}</div>
          <div className="card-available">${walletData.cardBalance.availableFunds.toFixed(2)} Available</div>
        </div>

        <div className="daily-points-card">
          <div className="points-label">Daily Points</div>
          <div className="points-value">{dailyPoints}</div>
        </div>

        <div className="payment-status-card">
          <div className="status-title">No Payment Due</div>
          <div className="status-message">{walletData.paymentStatus}</div>
          <div className="status-check">✓</div>
        </div>
      </div>

      <div className="transactions-section">
        <h2 className="section-title">Latest Transactions</h2>
        <div className="transactions-list">
          {walletData.transactions.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              transaction={transaction}
              formattedDate={formatDate(transaction.date)}
              onClick={() => handleTransactionClick(transaction.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
