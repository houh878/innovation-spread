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
import { useState, useEffect, useRef } from 'react';
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
  const [panelExpanded, setPanelExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mapScale, setMapScale] = useState(1);
  const [mapPosition, setMapPosition] = useState({ x: 0, y: 0 });
  const touchRef = useRef({ startDistance: 0, startScale: 1, startX: 0, startY: 0, isPanning: false });

  useEffect(() => {
    setMapLoaded(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Touch gesture handlers for mobile map
  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      // Pinch zoom
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY
      );
      touchRef.current.startDistance = distance;
      touchRef.current.startScale = mapScale;
    } else if (e.touches.length === 1) {
      // Pan
      touchRef.current.startX = e.touches[0].clientX - mapPosition.x;
      touchRef.current.startY = e.touches[0].clientY - mapPosition.y;
      touchRef.current.isPanning = true;
    }
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
    if (e.touches.length === 2) {
      // Pinch zoom
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY
      );
      const scale = Math.min(3, Math.max(0.5, (touchRef.current.startScale * distance) / touchRef.current.startDistance));
      setMapScale(scale);
    } else if (e.touches.length === 1 && touchRef.current.isPanning) {
      // Pan
      setMapPosition({
        x: e.touches[0].clientX - touchRef.current.startX,
        y: e.touches[0].clientY - touchRef.current.startY
      });
    }
  };

  const handleTouchEnd = () => {
    touchRef.current.isPanning = false;
  };

  const cityRegions = [
    {
      id: 'nuremberg',
      name: 'Nürnberg',
      polygon: '60,10 75,12 80,25 78,40 70,50 60,55 50,50 45,40 48,25 55,15',
      color: '#3B82F6',
      hotspots: [
        { id: 'nue_airport', name: 'Nuremberg Airport (NUE)', x: 58, y: 68, type: 'airport', active: false }
      ]
    },
    {
      id: 'erlangen',
      name: 'Erlangen',
      polygon: '70,20 85,22 88,35 85,45 75,48 68,42 65,30 68,22',
      color: '#8B5CF6',
      hotspots: [
        { id: 'erlangen_uni', name: 'FAU Erlangen', x: 75, y: 25, type: 'university', active: false }
      ]
    },
    {
      id: 'herzogenaurach',
      name: 'Herzogenaurach',
      polygon: '10,15 25,18 28,30 25,40 18,42 12,35 10,25 12,18',
      color: '#10B981',
      hotspots: [
        { id: 'adidas_hq', name: 'Adidas HQ', x: 15, y: 20, type: 'corporate', active: false }
      ]
    },
    {
      id: 'fuerth',
      name: 'Fürth',
      polygon: '20,50 35,52 40,65 35,75 25,78 18,70 15,60 18,52',
      color: '#F59E0B',
      hotspots: [
        { id: 'fuerth_center', name: 'Fürth Center', x: 25, y: 55, type: 'startup', active: false }
      ]
    }
  ];

  const roads = [
    {
      name: 'A73',
      path: 'M 15,30 L 25,35 L 35,40 L 50,45 L 65,50 L 75,52',
      type: 'highway'
    },
    {
      name: 'Main-Donau-Kanal',
      path: 'M 20,60 Q 40,65 60,70 T 80,75',
      type: 'waterway'
    }
  ];

  const hotspots = [
    { id: 'office', name: 'Dein Büro', x: 52, y: 58, type: 'office', active: true, size: 'medium' },
    { id: 'lab', name: 'Future Labs', x: 62, y: 35, type: 'lab', active: false, size: 'large' },
    { id: 'startup', name: 'Startup District', x: 35, y: 42, type: 'startup', active: false, size: 'large' },
    { id: 'uni', name: 'Innovation University', x: 74, y: 62, type: 'university', active: false, size: 'medium' },
    { id: 'event', name: 'Community Event', x: 20, y: 65, type: 'event', active: false, size: 'small' },
    { id: 'corporate', name: 'NextGen Corp', x: 55, y: 20, type: 'corporate', active: false, size: 'medium' },
    { id: 'institute', name: 'Research Institute', x: 82, y: 30, type: 'institute', active: false, size: 'medium' }
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
        <div 
          className={`tech-map ${mapLoaded ? 'loaded' : ''}`}
          onTouchStart={isMobile ? handleTouchStart : undefined}
          onTouchMove={isMobile ? handleTouchMove : undefined}
          onTouchEnd={isMobile ? handleTouchEnd : undefined}
          style={isMobile ? {
            transform: `translate(${mapPosition.x}px, ${mapPosition.y}px) scale(${mapScale})`,
            transformOrigin: 'center center'
          } : {}}
        >
          {/* Background Particles */}
          <div className="map-particles">
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                className="particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`
                }}
              />
            ))}
          </div>

          {/* SVG Map Layer */}
          <svg className="map-svg-layer" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Circuit Board Pattern */}
            <g className="circuit-pattern">
              {Array.from({ length: 20 }).map((_, i) => {
                const x1 = (i * 5) % 100;
                const y1 = (i * 7) % 100;
                const x2 = ((i * 5) + 15) % 100;
                const y2 = ((i * 7) + 10) % 100;
                return (
                  <g key={i}>
                    <line
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="url(#circuitGradient)"
                      strokeWidth="0.15"
                      className="circuit-line"
                    />
                    <circle cx={x1} cy={y1} r="0.5" fill="#60A5FA" opacity="0.6" className="circuit-node" />
                  </g>
                );
              })}
            </g>

            {/* Roads */}
            {roads.map((road, idx) => (
              <path
                key={idx}
                d={road.path}
                stroke={road.type === 'highway' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(59, 130, 246, 0.4)'}
                strokeWidth={road.type === 'highway' ? '0.3' : '0.2'}
                fill="none"
                strokeDasharray={road.type === 'highway' ? '2 1' : 'none'}
                className="road-path"
              />
            ))}

            {/* City Regions as Polygons */}
            {cityRegions.map(region => (
              <g key={region.id}>
                <polygon
                  points={region.polygon}
                  fill={`${region.color}26`}
                  stroke={region.color}
                  strokeWidth="0.2"
                  className="city-region"
                  filter="url(#glow)"
                />
                <text
                  x={region.polygon.split(',')[0]}
                  y={parseFloat(region.polygon.split(',')[1]) - 2}
                  fill={region.color}
                  fontSize="2.5"
                  fontWeight="600"
                  className="region-label"
                >
                  {region.name}
                </text>
              </g>
            ))}
          </svg>

          {/* Hotspots as Stacked Rectangles */}
          {hotspots.map(hotspot => (
            <div
              key={hotspot.id}
              className={`stacked-hotspot ${hotspot.active ? 'active' : ''} ${hotspot.size}`}
              style={{
                left: `${hotspot.x}%`,
                top: `${hotspot.y}%`
              }}
              onClick={() => {/* Handle hotspot click */}}
            >
              <div className="hotspot-rectangle rect-1" />
              <div className="hotspot-rectangle rect-2" />
              <div className="hotspot-rectangle rect-3" />
              <div className="hotspot-glow" />
              <div className="hotspot-label">{hotspot.name}</div>
            </div>
          ))}

          {/* Connection Lines */}
          <svg className="connections-layer" viewBox="0 0 100 100" preserveAspectRatio="none">
            {hotspots.filter(h => h.active).map((source, idx) => {
              const target = hotspots[idx + 1];
              if (!target || !target.active) return null;
              return (
                <g key={`${source.id}-${target.id}`}>
                  <line
                    x1={source.x}
                    y1={source.y}
                    x2={target.x}
                    y2={target.y}
                    stroke={source.active && target.active ? '#F59E0B' : '#3B82F6'}
                    strokeWidth="0.2"
                    opacity="0.6"
                    className="connection-line"
                  />
                  {/* Animated particles along line */}
                  <circle
                    cx={source.x}
                    cy={source.y}
                    r="0.3"
                    fill="#60A5FA"
                    className="connection-particle"
                    style={{
                      animation: `particle-flow ${2 + Math.random()}s linear infinite`,
                      animationDelay: `${Math.random()}s`
                    }}
                  />
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Right Panel - Specialization & Actions */}
      <div className={`current-round-panel ${panelExpanded ? 'expanded' : ''}`}>
        {isMobile && (
          <div className="panel-drag-handle" onClick={() => setPanelExpanded(!panelExpanded)}>
            <div className="drag-handle-bar" />
          </div>
        )}
        <h2 className="panel-title">Round {round}/{maxRounds}</h2>

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

      {/* Bottom Left Button - Modernized */}
      <button className="strategy-archive-btn" onClick={() => navigate('/archive')}>
        <Archive size={20} />
        <span>TO STRATEGY ARCHIVE</span>
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

