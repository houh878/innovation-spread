import { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { Play, X, Gift, Zap, Clock, Target, Sparkles } from 'lucide-react';

function RewardedAds() {
  const {
    rewardedAds,
    watchAd,
    activeAdMission,
    setActiveAdMission,
    addBattlePassXP
  } = useGame();

  const [showAdModal, setShowAdModal] = useState(false);
  const [adWatching, setAdWatching] = useState(false);
  const [adComplete, setAdComplete] = useState(false);
  const [adTimeRemaining, setAdTimeRemaining] = useState(30);
  const [cooldownTime, setCooldownTime] = useState('');

  useEffect(() => {
    if (rewardedAds.cooldownEnd) {
      const updateCooldown = () => {
        const now = new Date();
        const diff = rewardedAds.cooldownEnd - now;
        if (diff <= 0) {
          setCooldownTime('');
          return;
        }
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setCooldownTime(`${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
      };
      updateCooldown();
      const interval = setInterval(updateCooldown, 1000);
      return () => clearInterval(interval);
    }
  }, [rewardedAds.cooldownEnd]);

  useEffect(() => {
    if (adWatching && adTimeRemaining > 0) {
      const timer = setTimeout(() => {
        setAdTimeRemaining(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (adWatching && adTimeRemaining === 0) {
      setAdWatching(false);
      setAdComplete(true);
    }
  }, [adWatching, adTimeRemaining]);

  const handleWatchAd = () => {
    if (watchAd()) {
      setShowAdModal(true);
      setAdWatching(true);
      setAdTimeRemaining(30);
      setAdComplete(false);
    }
  };

  const handleClose = () => {
    setShowAdModal(false);
    setAdWatching(false);
    setAdComplete(false);
    setAdTimeRemaining(30);
    setActiveAdMission(null);
  };

  const isAvailable = rewardedAds.available && rewardedAds.dailyCount < rewardedAds.dailyMax;

  return (
    <>
      <button
        className={`rewarded-ad-btn ${isAvailable ? 'available' : 'cooldown'}`}
        onClick={handleWatchAd}
        disabled={!isAvailable}
      >
        <Play size={18} />
        <span>Bonus-Mission</span>
        {!isAvailable && cooldownTime && (
          <span className="cooldown-timer">{cooldownTime}</span>
        )}
        {rewardedAds.dailyCount > 0 && (
          <span className="daily-count">{rewardedAds.dailyCount}/{rewardedAds.dailyMax}</span>
        )}
      </button>

      {showAdModal && (
        <div className="ad-modal-overlay" onClick={handleClose}>
          <div className="ad-modal" onClick={(e) => e.stopPropagation()}>
            {!adWatching && !adComplete && (
              <>
                <div className="ad-modal-header">
                  <h2 className="ad-modal-title">Bonus-Mission freischalten</h2>
                  <button className="ad-close-btn" onClick={handleClose}>
                    <X size={24} />
                  </button>
                </div>
                <div className="ad-modal-content">
                  <p className="ad-description">
                    Schaue eine kurze Werbung (30 Sek.) und erhalte:
                  </p>
                  <div className="ad-rewards-preview">
                    <div className="ad-reward-item">
                      <Target size={20} />
                      <span>1 Spezial-Mission (2x XP)</span>
                    </div>
                    <div className="ad-reward-item">
                      <Clock size={20} />
                      <span>+2 Zeit-Ressourcen</span>
                    </div>
                    <div className="ad-reward-item">
                      <Zap size={20} />
                      <span>+1 Wissen</span>
                    </div>
                  </div>
                  <button className="ad-watch-btn" onClick={handleWatchAd}>
                    <Play size={20} />
                    Werbung ansehen
                  </button>
                  <p className="ad-hint">Verfügbar alle 4 Stunden</p>
                </div>
              </>
            )}

            {adWatching && (
              <div className="ad-watching">
                <div className="ad-loading">
                  <Play size={48} className="ad-play-icon" />
                  <h2 className="ad-loading-title">Werbung läuft...</h2>
                  <div className="ad-timer">{adTimeRemaining} Sek.</div>
                  <div className="ad-progress-bar">
                    <div
                      className="ad-progress-fill"
                      style={{ width: `${((30 - adTimeRemaining) / 30) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            )}

            {adComplete && (
              <div className="ad-complete">
                <div className="ad-success-animation">
                  <Gift size={64} />
                  <Sparkles size={32} className="sparkle-1" />
                  <Sparkles size={32} className="sparkle-2" />
                  <Sparkles size={32} className="sparkle-3" />
                </div>
                <h2 className="ad-success-title">Belohnungen erhalten!</h2>
                {activeAdMission && (
                  <div className="ad-mission-unlocked">
                    <h3 className="ad-mission-title">{activeAdMission.title}</h3>
                    <p className="ad-mission-description">{activeAdMission.description}</p>
                    <div className="ad-mission-rewards">
                      <div className="ad-mission-reward">
                        <Zap size={16} />
                        <span>{activeAdMission.rewards.xp} XP</span>
                      </div>
                      {activeAdMission.rewards.reach && (
                        <div className="ad-mission-reward">
                          <Target size={16} />
                          <span>+{activeAdMission.rewards.reach} Reach</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                <button className="ad-success-btn" onClick={handleClose}>
                  Großartig!
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default RewardedAds;

