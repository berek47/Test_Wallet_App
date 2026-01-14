import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBuildingColumns,
  faAppleWhole,
  faBasketShopping,
} from '@fortawesome/free-solid-svg-icons';
import './TransactionIcon.css';

interface TransactionIconProps {
  iconName: string;
}

interface BrandStyle {
  background: string;
  content: 'icon' | 'text' | 'symbol';
  text?: string;
  iconComponent?: React.ReactNode;
}

const getBrandStyle = (iconName: string): BrandStyle => {
  const styles: Record<string, BrandStyle> = {
    'fa-building-columns': {
      background: 'linear-gradient(135deg, #F093B0 0%, #C77DDE 35%, #FFA566 70%, #FFD95A 100%)',
      content: 'icon',
      iconComponent: <FontAwesomeIcon icon={faAppleWhole} />,
    },
    'fa-apple-whole': {
      background: '#3a3a3c',
      content: 'icon',
      iconComponent: <FontAwesomeIcon icon={faAppleWhole} />,
    },
    'fa-couch': {
      background: '#0058A3',
      content: 'text',
      text: 'IKEA',
    },
    'fa-cart-shopping': {
      background: '#CC0000',
      content: 'symbol',
      text: '◉',
    },
    'fa-box': {
      background: '#FF9900',
      content: 'text',
      text: 'a',
    },
    'fa-mug-hot': {
      background: '#00704A',
      content: 'symbol',
      text: '☕',
    },
    'fa-sim-card': {
      background: '#E90E5C',
      content: 'text',
      text: 'A',
    },
    'fa-basket-shopping': {
      background: '#008542',
      content: 'icon',
      iconComponent: <FontAwesomeIcon icon={faBasketShopping} />,
    },
    'fa-car': {
      background: '#000000',
      content: 'text',
      text: 'uber',
    },
    'fa-tv': {
      background: '#E50914',
      content: 'text',
      text: 'N',
    },
  };

  return styles[iconName] || { background: '#555', content: 'text', text: '?' };
};

export const TransactionIcon: React.FC<TransactionIconProps> = ({ iconName }) => {
  const brandStyle = getBrandStyle(iconName);
  const isIkea = iconName === 'fa-couch';

  return (
    <div
      className="transaction-icon"
      style={{ background: brandStyle.background }}
    >
      {brandStyle.content === 'icon' && brandStyle.iconComponent}
      {brandStyle.content === 'text' && (
        <span className={`icon-text ${isIkea ? 'icon-text-ikea' : ''}`}>
          {brandStyle.text}
        </span>
      )}
      {brandStyle.content === 'symbol' && (
        <span className="icon-symbol">{brandStyle.text}</span>
      )}
    </div>
  );
};
