import { Target } from 'lucide-react';

function MissionsTriggerTab({ onClick, missionsCount }) {
  return (
    <button 
      className="missions-trigger-tab"
      onClick={onClick}
      aria-label="Missionen öffnen"
    >
      {/* Badge mit Anzahl oben */}
      {missionsCount > 0 && (
        <div className="missions-trigger-badge">{missionsCount}</div>
      )}
      
      {/* Target Emblem Icon */}
      <div className="missions-trigger-emblem">
        <Target size={26} strokeWidth={2.5} className="missions-trigger-emblem-icon" />
      </div>
    </button>
  );
}

export default MissionsTriggerTab;

