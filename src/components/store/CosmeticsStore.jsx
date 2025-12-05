import { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { Check, Lock } from 'lucide-react';

function CosmeticsStore() {
  const { inventory, equipped, equipItem } = useGame();
  const [activeCategory, setActiveCategory] = useState('frames');

  const categories = [
    { id: 'frames', label: 'Profilrahmen' },
    { id: 'banners', label: 'Namensbanner' },
    { id: 'themes', label: 'Karten-Themes' },
    { id: 'hubdeco', label: 'Hub-Dekoration' },
    { id: 'titles', label: 'Titel' }
  ];

  const frames = [
    {
      id: 'early_adopter',
      name: 'Early Adopter',
      rarity: 'legendary',
      unlockMethod: 'Registrierung in den ersten 30 Tagen',
      owned: inventory.frames.includes('early_adopter')
    },
    {
      id: 'beta_pioneer',
      name: 'Beta Pioneer',
      rarity: 'epic',
      unlockMethod: 'Battle Pass Level 15',
      owned: inventory.frames.includes('beta_pioneer')
    },
    {
      id: 'fau_founder',
      name: 'FAU Founder',
      rarity: 'legendary',
      unlockMethod: 'Battle Pass Level 35',
      owned: inventory.frames.includes('fau_founder')
    },
    {
      id: 'basic_gold',
      name: 'Golden Border',
      rarity: 'common',
      unlockMethod: 'Gratis im Free Track Level 5',
      owned: inventory.frames.includes('basic_gold')
    }
  ];

  const banners = [
    {
      id: 'innovation_wave',
      name: 'Innovation Wave',
      rarity: 'epic',
      unlockMethod: 'Battle Pass Level 7',
      owned: inventory.banners.includes('innovation_wave')
    },
    {
      id: 'network_pulse',
      name: 'Network Pulse',
      rarity: 'rare',
      unlockMethod: 'Erreiche 100 Connections',
      owned: inventory.banners.includes('network_pulse')
    }
  ];

  const themes = [
    {
      id: 'default',
      name: 'Standard',
      description: 'Das klassische Innovation Spread Design',
      rarity: 'common',
      owned: true,
      active: equipped.theme === 'default'
    },
    {
      id: 'night_mode',
      name: 'Night Mode',
      description: 'Dunkles Theme mit leuchtenden Neon-Hotspots',
      rarity: 'epic',
      unlockMethod: 'Battle Pass Level 10',
      owned: inventory.themes.includes('night_mode'),
      active: equipped.theme === 'night_mode'
    },
    {
      id: 'neon',
      name: 'Neon',
      description: 'Cyberpunk-inspiriert mit leuchtenden Farben',
      rarity: 'legendary',
      unlockMethod: 'Battle Pass Level 1 Premium',
      owned: inventory.themes.includes('neon'),
      active: equipped.theme === 'neon'
    },
    {
      id: 'minimal',
      name: 'Minimal',
      description: 'Klares, reduziertes Design',
      rarity: 'rare',
      unlockMethod: 'Free Track Level 10',
      owned: inventory.themes.includes('minimal'),
      active: equipped.theme === 'minimal'
    },
    {
      id: 'retro',
      name: 'Retro',
      description: 'Nostalgisches 80er/90er Design',
      rarity: 'epic',
      unlockMethod: 'Battle Pass Level 25 Premium',
      owned: inventory.themes.includes('retro'),
      active: equipped.theme === 'retro'
    }
  ];

  const hubDecorations = [
    {
      id: 'holo_display',
      name: 'Holographic Display',
      category: 'tech',
      unlockMethod: 'Battle Pass Level 12 Premium',
      owned: inventory.hubDecorations.includes('holo_display')
    },
    {
      id: 'plant_corner',
      name: 'Green Corner',
      category: 'nature',
      unlockMethod: 'Erreiche Synergy 100',
      owned: inventory.hubDecorations.includes('plant_corner')
    }
  ];

  const titles = [
    {
      id: 'networker',
      name: 'Networker',
      rarity: 'common',
      unlockMethod: 'Free Track Level 2',
      owned: inventory.titles.includes('networker')
    },
    {
      id: 'season1_pioneer',
      name: 'Season 1 Pioneer',
      rarity: 'legendary',
      unlockMethod: 'Battle Pass Level 5 Premium',
      owned: inventory.titles.includes('season1_pioneer')
    },
    {
      id: 'top_connector',
      name: 'Top Connector',
      rarity: 'epic',
      unlockMethod: 'Battle Pass Level 20 Premium',
      owned: inventory.titles.includes('top_connector')
    },
    {
      id: 'network_architect',
      name: 'Network Architect',
      rarity: 'legendary',
      unlockMethod: 'Battle Pass Level 40 Premium',
      owned: inventory.titles.includes('network_architect')
    }
  ];

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'common': return '#6B7280';
      case 'rare': return '#3B82F6';
      case 'epic': return '#8B5CF6';
      case 'legendary': return '#F59E0B';
      default: return '#6B7280';
    }
  };

  const renderItems = (items, type) => {
    return (
      <div className="cosmetics-grid">
        {items.map(item => {
          const isEquipped = equipped[type] === item.id || (type === 'themes' && item.active);
          const rarityColor = getRarityColor(item.rarity);

          return (
            <div
              key={item.id}
              className={`cosmetic-card ${item.owned ? 'owned' : 'locked'} ${isEquipped ? 'equipped' : ''}`}
            >
              <div className="cosmetic-preview" style={{ borderColor: rarityColor }}>
                {type === 'themes' ? (
                  <div className="theme-preview" style={{ background: `linear-gradient(135deg, ${rarityColor}20, ${rarityColor}40)` }}>
                    <div className="theme-preview-text">{item.name}</div>
                  </div>
                ) : (
                  <div className="item-preview" style={{ backgroundColor: `${rarityColor}30` }}>
                    {item.name.charAt(0)}
                  </div>
                )}
                {!item.owned && <Lock size={24} className="locked-icon" />}
                {isEquipped && (
                  <div className="equipped-badge">
                    <Check size={16} />
                    Ausgerüstet
                  </div>
                )}
              </div>
              <div className="cosmetic-info">
                <h3 className="cosmetic-name">{item.name}</h3>
                {item.description && <p className="cosmetic-description">{item.description}</p>}
                <div className="cosmetic-rarity" style={{ color: rarityColor }}>
                  {item.rarity?.toUpperCase()}
                </div>
                {item.owned ? (
                  <button
                    className={`equip-btn ${isEquipped ? 'active' : ''}`}
                    onClick={() => equipItem(type, item.id)}
                  >
                    {isEquipped ? 'Ausgerüstet' : 'Ausrüsten'}
                  </button>
                ) : (
                  <div className="unlock-method">{item.unlockMethod}</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="cosmetics-store">
      <div className="cosmetics-categories">
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`cosmetic-category-btn ${activeCategory === cat.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="cosmetics-content">
        {activeCategory === 'frames' && renderItems(frames, 'frames')}
        {activeCategory === 'banners' && renderItems(banners, 'banners')}
        {activeCategory === 'themes' && renderItems(themes, 'themes')}
        {activeCategory === 'hubdeco' && renderItems(hubDecorations, 'hubDeco')}
        {activeCategory === 'titles' && renderItems(titles, 'titles')}
      </div>
    </div>
  );
}

export default CosmeticsStore;

