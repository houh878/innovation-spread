import { useNavigate, useParams } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { ArrowLeft, Zap, DollarSign } from 'lucide-react';
import { useState } from 'react';

function DevelopmentLab() {
  const navigate = useNavigate();
  const { category } = useParams();
  const {
    innovationPoints,
    companyValue,
    developmentNodes,
    unlockedNodes,
    unlockNode
  } = useGame();

  const categoryData = developmentNodes[category] || [];
  const categoryNames = {
    product: 'Product',
    strategy: 'Strategy',
    rnd: 'R&D',
    partnerships: 'Partnerships'
  };

  const handleUnlock = (nodeId) => {
    if (unlockNode(category, nodeId)) {
      // Success feedback could be added here
    }
  };

  const getNodeIcon = (iconName) => {
    const iconMap = {
      'gear-circuit': '⚙️',
      'cubes': '📦',
      'brain-gear': '🧠',
      'wifi-gear': '📡',
      'blocks': '🧱',
      'shield-globe': '🛡️',
      'gear-plus': '⚙️',
      'handshake': '🤝',
      'brain': '🧠',
      'gears': '⚙️',
      'network': '🌐',
      'accelerator': '🚀',
      'strategy': '📊',
      'analysis': '📈',
      'advantage': '⭐',
      'research': '🔬',
      'pipeline': '🔧',
      'breakthrough': '💡'
    };
    return iconMap[iconName] || '⚙️';
  };

  const renderPath = (path, pathIndex) => {
    return (
      <div key={pathIndex} className="development-path">
        {path.map((node, idx) => {
          const isUnlocked = unlockedNodes.has(node.id);
          const canAfford = innovationPoints >= node.cost;
          const isFirst = idx === 0;

          return (
            <div key={node.id} className="path-node-container">
              {idx > 0 && <div className="path-arrow">↓</div>}
              <div className={`development-node ${isUnlocked ? 'unlocked' : ''} ${!canAfford && !isUnlocked ? 'locked' : ''}`}>
                <div className="node-icon">{getNodeIcon(node.icon)}</div>
                <h3 className="node-name">{node.name}</h3>
                <p className="node-description">{node.description}</p>
                {!isUnlocked && (
                  <div className="node-cost">
                    <Zap size={14} />
                    <span>IP {node.cost}</span>
                  </div>
                )}
                {!isUnlocked && (
                  <button
                    className={`unlock-btn ${canAfford ? '' : 'disabled'}`}
                    onClick={() => handleUnlock(node.id)}
                    disabled={!canAfford}
                  >
                    {isFirst ? 'Start' : 'Unlock'}
                  </button>
                )}
                {isUnlocked && (
                  <div className="unlocked-badge">✓ Unlocked</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="lab-container">
      <div className="lab-header">
        <button className="back-to-game-btn" onClick={() => navigate('/game')}>
          <ArrowLeft size={18} />
          Back to Game
        </button>
        <h1 className="lab-title">Development Lab : {categoryNames[category]}</h1>
        <div className="lab-resources">
          <div className="resource-display">
            <Zap size={18} />
            <span>{innovationPoints}</span>
          </div>
          <div className="resource-display">
            <DollarSign size={18} />
            <span>{companyValue.toFixed(1)} Mio €</span>
          </div>
        </div>
      </div>

      <div className="lab-content">
        {Array.isArray(categoryData) ? (
          <div className="single-path-container">
            {renderPath(categoryData, 0)}
          </div>
        ) : categoryData.path1 && categoryData.path2 ? (
          <div className="dual-paths-container">
            <div className="path-column">
              <h2 className="path-title">PFAD 1: {category === 'product' ? 'INNOVATION & EFFICIENCY' : category === 'partnerships' ? 'LOCAL ALLIANCES & NETWORKING' : 'PATH 1'}</h2>
              {renderPath(categoryData.path1, 1)}
            </div>
            <div className="path-column">
              <h2 className="path-title">PFAD 2: {category === 'product' ? 'QUALITY & RESILIENCE' : category === 'partnerships' ? 'RESEARCH & DEVELOPMENT COLLABORATION' : 'PATH 2'}</h2>
              {renderPath(categoryData.path2, 2)}
            </div>
          </div>
        ) : (
          <div className="no-nodes">No development nodes available for this category.</div>
        )}
      </div>

      <div className="lab-footer">
        <button
          className={`footer-tab ${category === 'product' ? 'active' : ''}`}
          onClick={() => navigate('/lab/product')}
        >
          Product
        </button>
        <button
          className={`footer-tab ${category === 'strategy' ? 'active' : ''}`}
          onClick={() => navigate('/lab/strategy')}
        >
          Strategy
        </button>
        <button
          className={`footer-tab ${category === 'rnd' ? 'active' : ''}`}
          onClick={() => navigate('/lab/rnd')}
        >
          R&D
        </button>
        <button
          className={`footer-tab ${category === 'partnerships' ? 'active' : ''}`}
          onClick={() => navigate('/lab/partnerships')}
        >
          Partnerships
        </button>
        <button className="footer-tab reset-tab">
          Reset all Specialization
        </button>
      </div>
    </div>
  );
}

export default DevelopmentLab;

