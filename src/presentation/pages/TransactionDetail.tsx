import { useParams, useNavigate } from 'react-router-dom';
import { useTransactionDetailViewModel } from '../viewmodels';
import './TransactionDetail.css';

export const TransactionDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { transaction, loading, error } = useTransactionDetailViewModel(id || '');

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error || !transaction) {
    return (
      <div className="error-container">
        <div className="error">{error || 'Transaction not found'}</div>
        <button onClick={() => navigate('/')} className="back-button">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="transaction-detail-container">
      <div className="detail-back">
        <button onClick={() => navigate('/')} className="back-btn">
          ‹
        </button>
      </div>

      <div className="detail-main">
        <div className="detail-amount">${Math.abs(transaction.amount).toFixed(2)}</div>
        <div className="detail-merchant">{transaction.name}</div>
        <div className="detail-datetime">
          {transaction.date.toLocaleString('en-US', {
            month: 'numeric',
            day: 'numeric',
            year: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          })}
        </div>
      </div>

      <div className="detail-info-card">
        <div className="info-item">
          <div className="info-label">Status: {transaction.status}</div>
          <div className="info-sublabel">RBC Bank Debit Card</div>
        </div>
        <div className="info-item-row">
          <div className="info-label">Total</div>
          <div className="info-value-large">${Math.abs(transaction.amount).toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
};
