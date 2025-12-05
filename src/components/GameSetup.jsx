import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useGame } from '../context/GameContext';
import { 
  CircuitBoard, 
  TrendingUp, 
  Handshake, 
  Coins,
  ArrowLeft
} from 'lucide-react';

function GameSetup() {
  const navigate = useNavigate();
  const { startupName, setStartupName, startupClass, setStartupClass, startupClasses } = useGame();
  const [selectedClass, setSelectedClass] = useState(null);

  const classIcons = {
    'technology-visionary': CircuitBoard,
    'market-breaker': TrendingUp,
    'network-architect': Handshake,
    'cost-leader': Coins
  };

  const handleStartGame = () => {
    if (!startupName.trim()) {
      alert('Bitte gib einen Startup-Namen ein!');
      return;
    }
    if (!selectedClass) {
      alert('Bitte wähle eine Startup-Class!');
      return;
    }
    setStartupClass(selectedClass);
    navigate('/game');
  };

  return (
    <div className="setup-container">
      <div className="setup-background">
        <div className="setup-grid-pattern" />
      </div>

      <div className="setup-card">
        <h1 className="setup-title">Found your Empire</h1>

        <div className="setup-section">
          <label className="setup-label">What should your Start-Up be called?</label>
          <input
            type="text"
            className="setup-input"
            value={startupName}
            onChange={(e) => setStartupName(e.target.value)}
            placeholder="Enter startup name..."
          />
        </div>

        <div className="setup-section">
          <label className="setup-label">Choose your Startup-Class</label>
          <div className="startup-classes-grid">
            {Object.entries(startupClasses).map(([key, cls]) => {
              const Icon = classIcons[key];
              return (
                <button
                  key={key}
                  className={`startup-class-card ${selectedClass === key ? 'selected' : ''}`}
                  onClick={() => setSelectedClass(key)}
                >
                  <Icon size={32} className="startup-class-icon" />
                  <h3 className="startup-class-name">{cls.name}</h3>
                  <p className="startup-class-desc">{cls.description}</p>
                </button>
              );
            })}
          </div>
        </div>

        <button className="start-game-btn" onClick={handleStartGame}>
          Start Game
        </button>
      </div>

      <div className="setup-fau-logo">
        <div className="fau-logo-text-small">FAU</div>
        <div className="fau-logo-subtitle-small">Innovation Ecosystem</div>
      </div>

      <button className="back-btn" onClick={() => navigate('/')}>
        <ArrowLeft size={20} />
        Back
      </button>
    </div>
  );
}

export default GameSetup;

