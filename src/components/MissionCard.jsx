import { Zap, Users, TrendingDown, Sparkles } from 'lucide-react';

const iconMap = {
  Zap,
  Users,
  TrendingDown,
  Sparkles
};

function MissionCard({ mission }) {
  const progressPercentage = (mission.progress.current / mission.progress.max) * 100;

  return (
    <div className="mission-card">
      <h3 className="mission-card-title">{mission.title}</h3>
      <p className="mission-card-description">{mission.description}</p>
      
      {/* Progress Bar */}
      <div className="mission-progress-bar">
        <div 
          className="mission-progress-fill" 
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      
      <div className="mission-progress-text">
        {mission.progress.current}/{mission.progress.max}
      </div>
      
      {/* Rewards */}
      <div className="mission-rewards">
        {mission.rewards.map((reward, idx) => {
          const RewardIcon = iconMap[reward.icon] || Zap;
          return (
            <div key={idx} className="mission-reward-badge">
              <RewardIcon size={20} className="mission-reward-icon" />
              <span className="mission-reward-text">{reward.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MissionCard;

