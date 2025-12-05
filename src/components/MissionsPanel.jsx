import { X } from 'lucide-react';
import MissionCard from './MissionCard';

function MissionsPanel({ isOpen, onClose, missions }) {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className={`missions-overlay ${isOpen ? 'open' : ''}`}
          onClick={onClose}
        />
      )}

      {/* Panel */}
      <div className={`missions-panel ${isOpen ? 'open' : ''}`}>
        {/* Header */}
        <div className="missions-panel-header">
          <div className="missions-panel-title-section">
            <h2 className="missions-panel-title">Aktive Missionen</h2>
            <div className="missions-panel-badge">{missions.length}</div>
          </div>
          <button 
            className="missions-panel-close-btn"
            onClick={onClose}
            aria-label="Panel schließen"
          >
            <X size={26} />
          </button>
        </div>
        
        {/* Content */}
        <div className="missions-panel-content">
          {missions.map(mission => (
            <MissionCard key={mission.id} mission={mission} />
          ))}
        </div>
      </div>
    </>
  );
}

export default MissionsPanel;

