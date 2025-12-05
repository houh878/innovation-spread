import { useState } from 'react';
import { useGame } from '../context/GameContext';
import { X, ShoppingBag } from 'lucide-react';
import InnovationPass from './store/InnovationPass';
import CosmeticsStore from './store/CosmeticsStore';
import BundlesStore from './store/BundlesStore';

function Store() {
  const { storeOpen, setStoreOpen, activeStoreTab, setActiveStoreTab } = useGame();

  if (!storeOpen) return null;

  const tabs = [
    { id: 'pass', label: 'Innovation Pass' },
    { id: 'cosmetics', label: 'Kosmetik' },
    { id: 'bundles', label: 'Bundles' }
  ];

  return (
    <div className="store-overlay" onClick={(e) => e.target.className === 'store-overlay' && setStoreOpen(false)}>
      <div className="store-modal" onClick={(e) => e.stopPropagation()}>
        <div className="store-header">
          <div className="store-header-left">
            <ShoppingBag size={24} />
            <h2 className="store-title">Store</h2>
          </div>
          <button className="store-close-btn" onClick={() => setStoreOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <div className="store-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`store-tab ${activeStoreTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveStoreTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="store-content">
          {activeStoreTab === 'pass' && <InnovationPass />}
          {activeStoreTab === 'cosmetics' && <CosmeticsStore />}
          {activeStoreTab === 'bundles' && <BundlesStore />}
        </div>
      </div>
    </div>
  );
}

export default Store;

