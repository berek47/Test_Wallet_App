import type { Transaction } from '../../domain/entities';
import { TransactionType } from '../../domain/entities';
import { TransactionIcon } from './TransactionIcon';
import './TransactionItem.css';

interface TransactionItemProps {
  transaction: Transaction;
  formattedDate: string;
  onClick: () => void;
}

export const TransactionItem: React.FC<TransactionItemProps> = ({
  transaction,
  formattedDate,
  onClick,
}) => {
  const isPayment = transaction.type === TransactionType.PAYMENT;
  const amountSign = isPayment ? '+' : '';

  const getFirstLine = () => {
    if (transaction.status === 'Pending') {
      return `Pending - ${transaction.description}`;
    }
    return transaction.description;
  };

  const getSecondLine = () => {
    const parts = [];
    if (transaction.authorizedUser) {
      parts.push(transaction.authorizedUser);
    }
    parts.push(formattedDate);
    return parts.join(' - ');
  };

  return (
    <div className="transaction-item" onClick={onClick}>
      <TransactionIcon iconName={transaction.icon} />
      <div className="transaction-details">
        <div className="transaction-name">{transaction.name}</div>
        <div className="transaction-meta-line1">{getFirstLine()}</div>
        <div className="transaction-meta-line2">{getSecondLine()}</div>
      </div>
      <div className="transaction-right">
        <div className="transaction-amount-container">
          <div className={`transaction-amount ${isPayment ? 'payment' : 'credit'}`}>
            {amountSign}${Math.abs(transaction.amount).toFixed(2)}
          </div>
          {transaction.cashbackPercentage && (
            <div className="transaction-cashback">{transaction.cashbackPercentage}%</div>
          )}
        </div>
      </div>
      <div className="transaction-arrow">›</div>
    </div>
  );
};
