import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { 
  Zap, 
  TrendingUp, 
  DollarSign, 
  Shield,
  Archive,
  FlaskConical,
  Target,
  Microscope,
  Users,
  ShoppingBag
} from 'lucide-react';
import { useState, useEffect } from 'react';
import RewardedAds from './RewardedAds';
import Store from './Store';

function GameScreen() {
  const navigate = useNavigate();
  const {
    startupName,
    round,
    maxRounds,
    innovationPoints,
    marketCap,
    companyValue,
    resilience,
    maxResilience,
    currentEvent,
    nextRound,
    saveIPPoint,
    setStoreOpen
  } = useGame();

  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    setMapLoaded(true);
  }, []);

  const cities = [
    { name: 'Herzogenaurach', x: 15, y: 20, buildings: 2 },
    { name: 'Erlangen', x: 75, y: 25, buildings: 2 },
    { name: 'Fürth', x: 25, y: 55, buildings: 1 },
    { name: 'Nuremberg', x: 60, y: 70, buildings: 3 }
  ];

  const handleLabNavigation = (category) => {
    navigate(`/lab/${category}`);
  };

  return (
    <div className="game-screen">
      {/* Top Status Bar */}
      <div className="status-bar">
        <div className="status-item">
          <span className="status-label">Round:</span>
          <span className="status-value">{round}/{maxRounds}</span>
        </div>
        <div className="status-item">
          <Zap size={16} />
          <span className="status-value">{innovationPoints}</span>
        </div>
        <div className="status-item">
          <TrendingUp size={16} />
          <span className="status-value">{marketCap.toFixed(0)}%</span>
        </div>
        <div className="status-item">
          <DollarSign size={16} />
          <span className="status-value">{companyValue.toFixed(1)}M €</span>
        </div>
        <div className="status-item resilience-bar">
          {Array.from({ length: maxResilience }).map((_, i) => (
            <div
              key={i}
              className={`resilience-square ${i < resilience ? 'filled' : ''}`}
            />
          ))}
        </div>
        <button className="store-nav-btn" onClick={() => setStoreOpen(true)}>
          <ShoppingBag size={18} />
          Store
        </button>
      </div>

      {/* Main Map Area */}
      <div className="game-map-container">
        <div className={`game-map ${mapLoaded ? 'loaded' : ''}`}>
          <svg className="map-circuit-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
                <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.6" />
              </linearGradient>
            </defs>
            {/* Circuit board lines */}
            {Array.from({ length: 15 }).map((_, i) => (
              <line
                key={i}
                x1={`${Math.random() * 100}`}
                y1={`${Math.random() * 100}`}
                x2={`${Math.random() * 100}`}
                y2={`${Math.random() * 100}`}
                stroke="url(#circuitGradient)"
                strokeWidth="0.2"
                className="circuit-line"
              />
            ))}
          </svg>

          {/* Cities */}
          {cities.map((city, idx) => (
            <div
              key={city.name}
              className={`city-marker city-${idx}`}
              style={{
                left: `${city.x}%`,
                top: `${city.y}%`
              }}
            >
              <div className="city-buildings">
                {Array.from({ length: city.buildings }).map((_, i) => (
                  <div key={i} className={`building building-${i + 1}`} />
                ))}
              </div>
              <div className="city-label-map">{city.name}</div>
            </div>
          ))}

          {/* Map Labels */}
          <div className="map-labels">
            <div className="map-label" style={{ top: '45%', left: '30%' }}>SÜDWEST-TANGENTE</div>
            <div className="map-label" style={{ top: '60%', left: '50%' }}>Main-Donau-Kanal</div>
            <div className="map-label-small" style={{ top: '35%', left: '12%' }}>Niederndorf</div>
            <div className="map-label-airport" style={{ top: '68%', left: '58%' }}>
              Nuremberg Airport (NUE)
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Current Round */}
      <div className="current-round-panel">
        <h2 className="panel-title">Current Round:</h2>

        <div className="event-card">
          <div className="event-header">
            <div className="event-icon">⚠️</div>
            <h3 className="event-title">{currentEvent.title}</h3>
          </div>
          <p className="event-description">{currentEvent.description}</p>
        </div>

        <div className="specialization-section">
          <h3 className="section-title">Specialization-Areas:</h3>
          <div className="specialization-buttons">
            <button
              className="specialization-btn"
              onClick={() => handleLabNavigation('product')}
            >
              Product
              <span className="btn-arrow">→</span>
            </button>
            <button
              className="specialization-btn"
              onClick={() => handleLabNavigation('strategy')}
            >
              Strategy
              <span className="btn-arrow">→</span>
            </button>
            <button
              className="specialization-btn"
              onClick={() => handleLabNavigation('rnd')}
            >
              R&D
              <span className="btn-arrow">→</span>
            </button>
            <button
              className="specialization-btn"
              onClick={() => handleLabNavigation('partnerships')}
            >
              Partnerships
              <span className="btn-arrow">→</span>
            </button>
          </div>
        </div>

        <div className="action-buttons-panel">
          <button className="save-ip-btn" onClick={saveIPPoint}>
            Save IP-Point
          </button>
          <button className="next-round-btn" onClick={nextRound}>
            Next Round
          </button>
        </div>
      </div>

      {/* Bottom Left Button */}
      <button className="archive-btn" onClick={() => navigate('/archive')}>
        <Archive size={18} />
        TO STRATEGY ARCHIVE
      </button>

      {/* Rewarded Ads Button */}
      <div className="rewarded-ads-container">
        <RewardedAds />
      </div>

      {/* Store Modal */}
      <Store />
    </div>
  );
}

export default GameScreen;

