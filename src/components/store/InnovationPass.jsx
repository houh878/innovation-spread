import { useState, useEffect } from 'react';
import { useGame } from '../../context/GameContext';
import { Zap, Lock, Check, Sparkles, Gift } from 'lucide-react';

function InnovationPass() {
  const {
    battlePassXP,
    battlePassLevel,
    battlePassPremium,
    battlePassRewards,
    seasonData,
    xpForNextLevel,
    claimedRewards,
    claimReward,
    purchasePremium,
    setStoreOpen,
    setActiveStoreTab
  } = useGame();

  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState('');

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const diff = seasonData.seasonEndDate - now;
      if (diff <= 0) {
        setTimeRemaining('Beendet');
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      setTimeRemaining(`${days} Tage ${hours} Std ${minutes} Min`);
    };
    updateTimer();
    const interval = setInterval(updateTimer, 60000);
    return () => clearInterval(interval);
  }, []);

  const xpProgress = battlePassXP % xpForNextLevel;
  const xpPercent = (xpProgress / xpForNextLevel) * 100;

  const allRewards = [];
  for (let i = 1; i <= 50; i++) {
    const freeReward = battlePassRewards.free.find(r => r.level === i);
    const premiumReward = battlePassRewards.premium.find(r => r.level === i);
    allRewards.push({ level: i, free: freeReward, premium: premiumReward });
  }

  const getRewardIcon = (reward) => {
    if (!reward) return null;
    switch (reward.type) {
      case 'xp': return <Zap size={16} />;
      case 'title': return <Sparkles size={16} />;
      case 'frame': return <Gift size={16} />;
      case 'skin': return <Sparkles size={16} />;
      case 'banner': return <Gift size={16} />;
      case 'hubdeco': return <Gift size={16} />;
      default: return <Gift size={16} />;
    }
  };

  const getRewardName = (reward) => {
    if (!reward) return '';
    if (reward.type === 'xp') return `${reward.amount} XP`;
    return reward.name;
  };

  const isRewardClaimed = (track, level) => {
    return claimedRewards.has(`${track}-${level}`);
  };

  const canClaimReward = (track, level) => {
    if (isRewardClaimed(track, level)) return false;
    if (level > battlePassLevel) return false;
    if (track === 'premium' && !battlePassPremium) return false;
    return true;
  };

  return (
    <div className="innovation-pass">
      {/* Header */}
      <div className="pass-header">
        <div className="pass-season-info">
          <h1 className="pass-season-name">Season 1: {seasonData.seasonName}</h1>
          <p className="pass-timer">Endet in: {timeRemaining}</p>
        </div>
        <div className="pass-level-info">
          <div className="pass-level-display">
            <span className="pass-level-label">Level</span>
            <span className="pass-level-value">{battlePassLevel} / 50</span>
          </div>
          <div className="pass-xp-bar">
            <div className="pass-xp-fill" style={{ width: `${xpPercent}%` }} />
            <span className="pass-xp-text">{xpProgress} / {xpForNextLevel} XP bis Level {battlePassLevel + 1}</span>
          </div>
        </div>
        {!battlePassPremium && (
          <button className="premium-unlock-btn" onClick={() => setShowPremiumModal(true)}>
            <Sparkles size={20} />
            Premium freischalten
            <span className="premium-price">€3,99</span>
          </button>
        )}
      </div>

      {/* Pass Track */}
      <div className="pass-track-container">
        <div className="pass-track-header">
          <div className="track-label free-track-label">Free Track</div>
          <div className="track-label premium-track-label">
            Premium Track
            {!battlePassPremium && <Lock size={14} />}
          </div>
        </div>
        <div className="pass-track-scroll">
          {allRewards.map(({ level, free, premium }) => (
            <div key={level} className="pass-level-column">
              <div className="pass-level-number">{level}</div>
              
              {/* Free Track */}
              <div className={`pass-reward-card free ${canClaimReward('free', level) ? 'claimable' : ''} ${isRewardClaimed('free', level) ? 'claimed' : ''} ${level > battlePassLevel ? 'locked' : ''}`}>
                {free ? (
                  <>
                    <div className="reward-icon">{getRewardIcon(free)}</div>
                    <div className="reward-name">{getRewardName(free)}</div>
                    {canClaimReward('free', level) && (
                      <button
                        className="claim-btn"
                        onClick={() => claimReward('free', level)}
                      >
                        Claim
                      </button>
                    )}
                    {isRewardClaimed('free', level) && (
                      <div className="claimed-badge">
                        <Check size={16} />
                      </div>
                    )}
                    {level > battlePassLevel && (
                      <div className="locked-badge">Locked</div>
                    )}
                  </>
                ) : (
                  <div className="empty-reward">-</div>
                )}
              </div>

              {/* Premium Track */}
              <div className={`pass-reward-card premium ${!battlePassPremium ? 'premium-locked' : ''} ${canClaimReward('premium', level) ? 'claimable' : ''} ${isRewardClaimed('premium', level) ? 'claimed' : ''} ${level > battlePassLevel ? 'locked' : ''}`}>
                {premium ? (
                  <>
                    {!battlePassPremium && <Lock size={20} className="premium-lock-icon" />}
                    <div className="reward-icon">{getRewardIcon(premium)}</div>
                    <div className="reward-name">{getRewardName(premium)}</div>
                    {canClaimReward('premium', level) && (
                      <button
                        className="claim-btn premium-claim"
                        onClick={() => claimReward('premium', level)}
                      >
                        Claim
                      </button>
                    )}
                    {isRewardClaimed('premium', level) && (
                      <div className="claimed-badge">
                        <Check size={16} />
                      </div>
                    )}
                    {level > battlePassLevel && (
                      <div className="locked-badge">Locked</div>
                    )}
                  </>
                ) : (
                  <div className="empty-reward">-</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Premium Purchase Modal */}
      {showPremiumModal && (
        <div className="premium-modal-overlay" onClick={() => setShowPremiumModal(false)}>
          <div className="premium-modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="premium-modal-title">Innovation Pass Premium</h2>
            <div className="premium-features">
              <div className="premium-feature">
                <Sparkles size={20} />
                <span>Alle 50 Premium-Belohnungen freischalten</span>
              </div>
              <div className="premium-feature">
                <Gift size={20} />
                <span>Exklusive Saison-Titel und Frames</span>
              </div>
              <div className="premium-feature">
                <Sparkles size={20} />
                <span>Einzigartige Map-Themes</span>
              </div>
              <div className="premium-feature">
                <Zap size={20} />
                <span>Spezielle Challenges mit Bonus-XP</span>
              </div>
              <div className="premium-feature">
                <Zap size={20} />
                <span>25% XP-Boost für die gesamte Season</span>
              </div>
            </div>
            <div className="premium-preview">
              <p className="premium-preview-text">Premium Rewards Preview:</p>
              <div className="premium-rewards-preview">
                {battlePassRewards.premium.slice(0, 5).map((reward, idx) => (
                  <div key={idx} className="preview-reward">
                    {getRewardIcon(reward)}
                    <span>{getRewardName(reward)}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="premium-price-section">
              <div className="premium-price-large">€3,99</div>
              <p className="premium-price-note">Einmalig diese Season</p>
            </div>
            <div className="premium-modal-actions">
              <button className="premium-buy-btn" onClick={() => { purchasePremium(); setShowPremiumModal(false); }}>
                Kaufen
              </button>
              <button className="premium-cancel-btn" onClick={() => setShowPremiumModal(false)}>
                Abbrechen
              </button>
            </div>
            <p className="premium-disclaimer">Gültig nur für Season 1. Nächste Season separat erhältlich.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default InnovationPass;

