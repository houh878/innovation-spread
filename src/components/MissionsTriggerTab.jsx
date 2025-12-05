import { Target } from 'lucide-react';

function MissionsTriggerTab({ onClick, missionsCount }) {
  return (
    <button 
      className="missions-trigger-tab"
      onClick={onClick}
      aria-label="Missionen öffnen"
    >
      <Target size={28} className="missions-trigger-icon" />
      <span className="missions-trigger-text">Missionen</span>
      {missionsCount > 0 && (
        <div className="missions-trigger-badge">{missionsCount}</div>
      )}
    </button>
  );
}

export default MissionsTriggerTab;

