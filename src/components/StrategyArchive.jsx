import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { ArrowLeft, Globe, Search, Mail, Trophy, Zap as ZapIcon, CircuitBoard } from 'lucide-react';
import { useState } from 'react';

function StrategyArchive() {
  const navigate = useNavigate();
  const { startupName, decisionPath, companyValue, marketCap } = useGame();
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [selectedCommunityStrategy, setSelectedCommunityStrategy] = useState(null);

  const communityStrategies = [
    {
      id: 1,
      starterGroup: 'Technologie Visionär',
      highlightDecision: "Pivoted to sustainable materials after 'Adidas Circular Economy Call.'",
      playerName: 'Max Mustermann GmbH',
      playerId: '34567',
      companyValue: 18.7,
      marketShare: 85,
      icon: CircuitBoard
    },
    {
      id: 2,
      starterGroup: 'Market Breaker',
      highlightDecision: 'Expanded to Early Adopters through aggressive marketing.',
      playerName: 'InnovateNow AG',
      playerId: '45678',
      companyValue: 15.2,
      marketShare: 72,
      icon: ZapIcon
    },
    {
      id: 3,
      starterGroup: 'Network-Architect',
      highlightDecision: 'Built strong corporate partnerships in first 5 rounds.',
      playerName: 'ConnectHub GmbH',
      playerId: '56789',
      companyValue: 20.1,
      marketShare: 90,
      icon: Trophy
    }
  ];

  const filters = [
    { id: 'starter', label: 'Filter after Starter Group', icon: CircuitBoard },
    { id: 'event', label: 'Filter after Event Reaction', icon: ZapIcon },
    { id: 'success', label: 'Filter After Success', icon: Trophy }
  ];

  const performanceData = [100, 150, 300, 100, 500];

  return (
    <div className="archive-container">
      <div className="archive-background">
        <div className="archive-grid-pattern" />
      </div>

      <h1 className="archive-title">Strategy Archive: Your Path & Others</h1>

      <div className="archive-content">
        {/* Your Strategy Section */}
        <div className="strategy-section your-strategy">
          <h2 className="section-title">Your Strategy</h2>
          <p className="section-subtitle">{startupName || 'Your Startup'}: Your Game so Far</p>

          <button className="summary-btn">
            <Globe size={16} />
            Last Round: Summary
          </button>

          <div className="decision-path-visual">
            <svg viewBox="0 0 200 100" className="path-svg">
              {/* Horizontal line */}
              <line x1="10" y1="50" x2="190" y2="50" stroke="#3b82f6" strokeWidth="2" />
              
              {/* Nodes */}
              {[1, 2, 3, 4, 5].map((i) => (
                <g key={i}>
                  <circle
                    cx={10 + (i - 1) * 45}
                    cy="50"
                    r="8"
                    fill="#3b82f6"
                    className="path-node"
                  />
                  {i === 3 && (
                    <>
                      <line x1="100" y1="50" x2="100" y2="20" stroke="#3b82f6" strokeWidth="2" />
                      <circle cx="100" cy="20" r="6" fill="#8b5cf6" />
                      <line x1="100" y1="50" x2="100" y2="80" stroke="#3b82f6" strokeWidth="2" />
                      <circle cx="100" cy="80" r="6" fill="#8b5cf6" />
                      <circle cx="100" cy="90" r="6" fill="#8b5cf6" />
                    </>
                  )}
                </g>
              ))}
            </svg>
          </div>

          <div className="performance-analysis">
            <h3 className="analysis-title">Performance-Analyse:</h3>
            <div className="performance-chart">
              <svg viewBox="0 0 500 200" className="chart-svg">
                <polyline
                  points={performanceData.map((val, i) => `${50 + i * 100},${180 - (val / 500) * 150}`).join(' ')}
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="3"
                />
                {performanceData.map((val, i) => (
                  <circle
                    key={i}
                    cx={50 + i * 100}
                    cy={180 - (val / 500) * 150}
                    r="4"
                    fill="#3b82f6"
                  />
                ))}
                <text x="10" y="20" fill="#e2e8f0" fontSize="12">500</text>
                <text x="10" y="100" fill="#e2e8f0" fontSize="12">250</text>
                <text x="10" y="180" fill="#e2e8f0" fontSize="12">0</text>
              </svg>
              <div className="chart-labels">
                <span>100</span>
                <span>150</span>
                <span>300</span>
                <span>100</span>
                <span>500</span>
              </div>
            </div>
            <div className="performance-metrics">
              <div className="metric-item">
                <span className="metric-label">Resilience</span>
              </div>
              <div className="metric-item">
                <span className="metric-label">Market Cap:</span>
                <span className="metric-value">{marketCap.toFixed(0)}%</span>
              </div>
              <div className="metric-item">
                <span className="metric-label">Innovation Points</span>
              </div>
            </div>
          </div>

          <button className="share-solution-btn">Share Solution</button>
        </div>

        {/* Community Strategy Section */}
        <div className="strategy-section community-strategy">
          <h2 className="section-title">Community Strategy</h2>
          <p className="section-subtitle">Exploration: From the Ecosystem</p>

          <div className="filter-buttons">
            {filters.map((filter) => {
              const Icon = filter.icon;
              return (
                <button
                  key={filter.id}
                  className={`filter-btn ${selectedFilter === filter.id ? 'active' : ''}`}
                  onClick={() => setSelectedFilter(filter.id)}
                >
                  <Icon size={16} />
                  {filter.label}
                </button>
              );
            })}
          </div>

          <div className="community-strategies-list">
            {communityStrategies.map((strategy) => {
              const Icon = strategy.icon;
              return (
                <div
                  key={strategy.id}
                  className={`community-strategy-card ${selectedCommunityStrategy === strategy.id ? 'selected' : ''}`}
                  onClick={() => setSelectedCommunityStrategy(strategy.id)}
                >
                  <div className="strategy-starter-group">
                    <Icon size={16} />
                    <span>{strategy.starterGroup}</span>
                  </div>
                  <div className="strategy-highlight">
                    <ZapIcon size={14} />
                    <span>{strategy.highlightDecision}</span>
                  </div>
                  <div className="strategy-player-info">
                    <Search size={14} />
                    <span>{strategy.playerName}, Player ID: {strategy.playerId}</span>
                  </div>
                  <div className="strategy-score">
                    <Search size={14} />
                    <span>Company Value: {strategy.companyValue}M €, Market Share: {strategy.marketShare}%</span>
                  </div>
                </div>
              );
            })}
          </div>

          {selectedCommunityStrategy && (
            <div className="strategy-actions">
              <button className="action-btn">
                <Search size={16} />
                See Path
              </button>
              <button className="action-btn">
                <Mail size={16} />
                Contact Player
              </button>
            </div>
          )}
        </div>
      </div>

      <button className="archive-back-btn" onClick={() => navigate('/game')}>
        <ArrowLeft size={18} />
        BACK
      </button>
    </div>
  );
}

export default StrategyArchive;

