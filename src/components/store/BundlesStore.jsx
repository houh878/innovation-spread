import { useGame } from '../../context/GameContext';
import { Gift, Sparkles, Zap } from 'lucide-react';

function BundlesStore() {
  const { battlePassPremium, purchasePremium } = useGame();

  const bundles = [
    {
      id: 'newcomer',
      name: 'Newcomer Pack',
      description: 'Perfekt für den Start deiner Innovation Journey',
      price: 4.99,
      originalPrice: 6.98,
      items: [
        '1 Battle Pass (aktuelle Season)',
        '1 exklusives Frame',
        'XP-Boost für 7 Tage'
      ],
      badge: 'Einmalig verfügbar',
      available: !battlePassPremium
    },
    {
      id: 'season_end',
      name: 'Season-End Bundle',
      description: 'Hole alle verpassten Season-Items nach',
      price: 2.99,
      originalPrice: 5.98,
      items: [
        'Alle restlichen Premium-Rewards',
        'Schneller Level-Up',
        'Exklusives Season-End Badge'
      ],
      badge: 'Nur in letzten 2 Wochen',
      available: true
    }
  ];

  const handlePurchase = (bundleId) => {
    if (bundleId === 'newcomer') {
      purchasePremium();
      alert('Newcomer Pack gekauft!');
    } else {
      alert('Season-End Bundle gekauft!');
    }
  };

  return (
    <div className="bundles-store">
      <h2 className="bundles-title">Exklusive Bundles</h2>
      <div className="bundles-grid">
        {bundles.map(bundle => (
          <div key={bundle.id} className={`bundle-card ${!bundle.available ? 'unavailable' : ''}`}>
            {bundle.badge && (
              <div className="bundle-badge">{bundle.badge}</div>
            )}
            <div className="bundle-header">
              <Gift size={32} className="bundle-icon" />
              <h3 className="bundle-name">{bundle.name}</h3>
            </div>
            <p className="bundle-description">{bundle.description}</p>
            <div className="bundle-items">
              {bundle.items.map((item, idx) => (
                <div key={idx} className="bundle-item">
                  <Sparkles size={16} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="bundle-price">
              <span className="bundle-price-original">€{bundle.originalPrice.toFixed(2)}</span>
              <span className="bundle-price-current">€{bundle.price.toFixed(2)}</span>
            </div>
            <button
              className={`bundle-buy-btn ${!bundle.available ? 'disabled' : ''}`}
              onClick={() => handlePurchase(bundle.id)}
              disabled={!bundle.available}
            >
              {bundle.available ? 'Jetzt kaufen' : 'Bereits gekauft'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BundlesStore;

