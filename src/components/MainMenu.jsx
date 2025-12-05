import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';

function MainMenu() {
  const navigate = useNavigate();
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    setAnimated(true);
  }, []);

  const cities = [
    { name: 'Nürnberg', x: 20, y: 60, color: 'green' },
    { name: 'Fürth', x: 50, y: 45, color: 'green' },
    { name: 'Erlangen', x: 75, y: 50, color: 'blue' }
  ];

  return (
    <div className="main-menu-container">
      <div className="main-menu-background">
        {/* Animated Network Lines */}
        <svg className="network-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="lineGradientGreen" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="lineGradientBlue" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          
          {/* Lines from Nürnberg */}
          <line x1="20" y1="60" x2="35" y2="50" stroke="url(#lineGradientGreen)" strokeWidth="0.3" className="glow-line" />
          <line x1="20" y1="60" x2="45" y2="45" stroke="url(#lineGradientGreen)" strokeWidth="0.3" className="glow-line" />
          <line x1="20" y1="60" x2="60" y2="55" stroke="url(#lineGradientGreen)" strokeWidth="0.3" className="glow-line" />
          <line x1="20" y1="60" x2="70" y2="50" stroke="url(#lineGradientGreen)" strokeWidth="0.3" className="glow-line" />
          
          {/* Lines from Fürth */}
          <line x1="50" y1="45" x2="30" y2="55" stroke="url(#lineGradientGreen)" strokeWidth="0.3" className="glow-line" />
          <line x1="50" y1="45" x2="65" y2="50" stroke="url(#lineGradientGreen)" strokeWidth="0.3" className="glow-line" />
          <line x1="50" y1="45" x2="75" y2="50" stroke="url(#lineGradientGreen)" strokeWidth="0.3" className="glow-line" />
          
          {/* Lines from Erlangen */}
          <line x1="75" y1="50" x2="55" y2="45" stroke="url(#lineGradientBlue)" strokeWidth="0.3" className="glow-line" />
          <line x1="75" y1="50" x2="40" y2="55" stroke="url(#lineGradientBlue)" strokeWidth="0.3" className="glow-line" />
          <line x1="75" y1="50" x2="25" y2="60" stroke="url(#lineGradientBlue)" strokeWidth="0.3" className="glow-line" />
        </svg>

        {/* City Labels */}
        {cities.map((city, idx) => (
          <div
            key={city.name}
            className={`city-label city-${city.color}`}
            style={{
              left: `${city.x}%`,
              top: `${city.y}%`,
              animationDelay: `${idx * 0.2}s`
            }}
          >
            {city.name}
          </div>
        ))}

        {/* Animated Dots */}
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="network-dot"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className={`main-menu-content ${animated ? 'fade-in' : ''}`}>
        <h1 className="main-menu-title">INNOVATION SURGE</h1>
        <p className="main-menu-subtitle">Master the Ecosystem. Conquer the Market</p>

        <div className="main-menu-buttons">
          <button className="menu-btn" onClick={() => navigate('/setup')}>
            New Game
          </button>
          <button className="menu-btn" onClick={() => navigate('/game')}>
            Load Game
          </button>
          <button className="menu-btn" onClick={() => alert('Options coming soon!')}>
            Options
          </button>
        </div>
      </div>

      <div className="fau-logo">
        <div className="fau-logo-text">FAU</div>
        <div className="fau-logo-subtitle">Friedrich-Alexander-Universität</div>
        <div className="fau-logo-subtitle-small">School of Business, Economics and Society</div>
      </div>
    </div>
  );
}

export default MainMenu;

