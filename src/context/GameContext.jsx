import { createContext, useContext, useState, useEffect } from 'react';

const GameContext = createContext();

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within GameProvider');
  }
  return context;
};

export const GameProvider = ({ children }) => {
  const [startupName, setStartupName] = useState('');
  const [startupClass, setStartupClass] = useState(null);
  const [round, setRound] = useState(1);
  const [maxRounds] = useState(20);
  const [innovationPoints, setInnovationPoints] = useState(10);
  const [marketCap, setMarketCap] = useState(15);
  const [companyValue, setCompanyValue] = useState(12.3);
  const [resilience, setResilience] = useState(5);
  const [maxResilience] = useState(5);
  const [savedIPPoints, setSavedIPPoints] = useState(0);
  const [unlockedNodes, setUnlockedNodes] = useState(new Set(['software-mechatronics']));
  const [decisionPath, setDecisionPath] = useState([]);
  const [currentEvent, setCurrentEvent] = useState({
    title: 'Adidas Seeking Innovative Solutions',
    description: 'Adidas HQ in Herzogenaurach is actively scouting for partners with innovative solutions for circular economy in materials and production.',
    type: 'economic'
  });

  const startupClasses = {
    'technology-visionary': {
      name: 'Technology-Visionary',
      icon: 'circuit',
      description: 'High research budget. Access to FAU labs.',
      bonuses: { research: 20, ip: 5 }
    },
    'market-breaker': {
      name: 'Market Breaker',
      icon: 'chart',
      description: 'Strong marketing. Quick breakthrough to Early Adopters.',
      bonuses: { marketing: 25, ip: 3 }
    },
    'network-architect': {
      name: 'Network-Architect',
      icon: 'handshake',
      description: 'Many contacts with Corporate Partners.',
      bonuses: { contacts: 30, ip: 4 }
    },
    'cost-leader': {
      name: 'Cost Leader',
      icon: 'coin',
      description: 'Efficient processes. Cost advantage in mass market.',
      bonuses: { efficiency: 20, ip: 6 }
    }
  };

  const developmentNodes = {
    product: {
      path1: [
        { id: 'software-mechatronics', name: 'Software-Mechatronics (Lv.1)', cost: 0, unlocked: true, description: 'Foster regional tech & business clusters. +10% local influence', icon: 'gear-circuit' },
        { id: 'modular-platform', name: 'MODULAR PLATFORM DESIGN (Lv.1)', cost: 20, description: 'Collaborate with FAU +8% Development Speed', icon: 'cubes' },
        { id: 'fraunhofer-prototyping', name: 'Fraunhofer Prototyping', cost: 80, description: 'utilize advanced hidden champions. +15% Prototype Fidelity', icon: 'brain-gear' }
      ],
      path2: [
        { id: 'industrial-iot', name: 'INDUSTRIAL IOT SYSTEMS', cost: 55, description: 'Advanced monitoring and data analysis for system reliability. -15% Failure Rate', icon: 'wifi-gear' },
        { id: 'durability-engineering', name: 'DURABILITY ENGINEERING', cost: 50, description: 'Develop robust materials +12% Product Lifespan', icon: 'blocks' },
        { id: 'adaptive-supply', name: 'ADAPTIVE SUPPLY CHAIN', cost: 70, description: 'Local & global suppliier network. +10% Supply Resilience', icon: 'shield-globe' }
      ]
    },
    strategy: [
      { id: 'strategy-1', name: 'STRATEGY NODE 1', cost: 30, description: 'Strategic planning enhancement', icon: 'strategy' },
      { id: 'strategy-2', name: 'STRATEGY NODE 2', cost: 45, description: 'Market analysis tools', icon: 'analysis' },
      { id: 'strategy-3', name: 'STRATEGY NODE 3', cost: 60, description: 'Competitive advantage', icon: 'advantage' }
    ],
    rnd: [
      { id: 'rnd-1', name: 'R&D NODE 1', cost: 40, description: 'Research acceleration', icon: 'research' },
      { id: 'rnd-2', name: 'R&D NODE 2', cost: 55, description: 'Innovation pipeline', icon: 'pipeline' },
      { id: 'rnd-3', name: 'R&D NODE 3', cost: 75, description: 'Breakthrough technology', icon: 'breakthrough' }
    ],
    partnerships: {
      path1: [
        { id: 'cluster-initiatives', name: 'CLUSTER INITIATIVES Lv.1', cost: 30, description: 'Foster regional tech & business clusters. +10% Local Influence.', icon: 'gear-plus' },
        { id: 'university-partnerships', name: 'UNIVERSITY PARTNERSHIPS Lv.1', cost: 50, description: 'Collaborate with FAU & TH Nürberg. +15% Talent Pool Access.', icon: 'handshake' },
        { id: 'sme-connections', name: 'SME- Connections', cost: 40, description: 'Engage in the hidden champions. +12% Supply Chain Resilience.', icon: 'brain' }
      ],
      path2: [
        { id: 'fraunhofer-alliance', name: 'Fraunhofer Alliance Lv.1', cost: 60, description: 'Joint projects with applied research +20% Innovation Output.', icon: 'gears' },
        { id: 'medical-campus', name: 'MEDICAL CAMPUS NETWORK', cost: 70, description: 'Develop health tech with Klinikum Erlangen +18% Biomedical Insights', icon: 'network' },
        { id: 'startup-accelerators', name: 'STARTUP ACCELERATORS', cost: 55, description: 'Mentor and invest in new ventures +25% Disruptive Potential', icon: 'accelerator' }
      ]
    }
  };

  const unlockNode = (category, nodeId) => {
    const node = findNode(category, nodeId);
    if (!node) return false;
    if (unlockedNodes.has(nodeId)) return false;
    if (innovationPoints < node.cost) return false;

    setInnovationPoints(prev => prev - node.cost);
    setUnlockedNodes(prev => new Set([...prev, nodeId]));
    setDecisionPath(prev => [...prev, { round, category, nodeId, nodeName: node.name }]);
    return true;
  };

  const findNode = (category, nodeId) => {
    const categoryData = developmentNodes[category];
    if (!categoryData) return null;

    if (Array.isArray(categoryData)) {
      return categoryData.find(n => n.id === nodeId);
    }

    if (categoryData.path1) {
      const found = categoryData.path1.find(n => n.id === nodeId) || categoryData.path2.find(n => n.id === nodeId);
      return found;
    }

    return null;
  };

  const nextRound = () => {
    if (round >= maxRounds) return;
    
    setRound(prev => prev + 1);
    setInnovationPoints(prev => prev + 5 + savedIPPoints);
    setSavedIPPoints(0);
    setMarketCap(prev => Math.min(100, prev + Math.random() * 5));
    setCompanyValue(prev => prev * (1 + Math.random() * 0.1));
    
    // Generate new event
    const events = [
      {
        title: 'Adidas Seeking Innovative Solutions',
        description: 'Adidas HQ in Herzogenaurach is actively scouting for partners with innovative solutions for circular economy in materials and production.',
        type: 'economic'
      },
      {
        title: 'FAU Research Partnership Opportunity',
        description: 'Friedrich-Alexander-Universität offers collaboration in AI and machine learning research.',
        type: 'research'
      },
      {
        title: 'Regional Startup Accelerator Program',
        description: 'Join the local accelerator to connect with investors and mentors.',
        type: 'network'
      }
    ];
    setCurrentEvent(events[Math.floor(Math.random() * events.length)]);
  };

  const saveIPPoint = () => {
    setSavedIPPoints(prev => prev + 1);
    setInnovationPoints(prev => Math.max(0, prev - 1));
  };

  // Store State
  const [storeOpen, setStoreOpen] = useState(false);
  const [activeStoreTab, setActiveStoreTab] = useState('pass');
  const [battlePassXP, setBattlePassXP] = useState(1200);
  const [battlePassLevel, setBattlePassLevel] = useState(12);
  const [battlePassPremium, setBattlePassPremium] = useState(false);
  const [claimedRewards, setClaimedRewards] = useState(new Set());
  const [inventory, setInventory] = useState({
    frames: [],
    banners: [],
    themes: ['default'],
    titles: [],
    hubDecorations: []
  });
  const [equipped, setEquipped] = useState({
    frame: 'default',
    banner: null,
    theme: 'default',
    title: null,
    hubDeco: []
  });
  const [rewardedAds, setRewardedAds] = useState({
    available: true,
    cooldownEnd: null,
    dailyCount: 2,
    dailyMax: 5
  });
  const [activeAdMission, setActiveAdMission] = useState(null);

  // Battle Pass Rewards Data
  const battlePassRewards = {
    free: [
      { level: 1, type: 'xp', amount: 100 },
      { level: 2, type: 'title', name: 'Networker', id: 'networker' },
      { level: 5, type: 'frame', name: 'Basic Frame', id: 'basic_gold' },
      { level: 10, type: 'skin', name: 'Minimal Theme', id: 'minimal' },
      { level: 15, type: 'badge', name: 'First Steps', id: 'first_steps' },
      { level: 20, type: 'xp', amount: 200 },
      { level: 25, type: 'title', name: 'Connector', id: 'connector' },
      { level: 30, type: 'xp', amount: 300 },
      { level: 35, type: 'frame', name: 'Silver Frame', id: 'silver_frame' },
      { level: 40, type: 'xp', amount: 400 },
      { level: 45, type: 'title', name: 'Master Networker', id: 'master_networker' },
      { level: 50, type: 'xp', amount: 500 }
    ],
    premium: [
      { level: 1, type: 'skin', name: 'Neon Theme', id: 'neon' },
      { level: 3, type: 'frame', name: 'Early Adopter', id: 'early_adopter' },
      { level: 5, type: 'title', name: 'Season 1 Pioneer', id: 'season1_pioneer' },
      { level: 7, type: 'banner', name: 'Innovation Banner', id: 'innovation_wave' },
      { level: 10, type: 'skin', name: 'Night Mode Theme', id: 'night_mode' },
      { level: 12, type: 'hubdeco', name: 'Holographic Display', id: 'holo_display' },
      { level: 15, type: 'frame', name: 'Beta Pioneer', id: 'beta_pioneer' },
      { level: 20, type: 'title', name: 'Top Connector', id: 'top_connector' },
      { level: 25, type: 'skin', name: 'Retro Theme', id: 'retro' },
      { level: 30, type: 'mission', name: 'Cross-Faculty Challenge', id: 'cross_faculty' },
      { level: 35, type: 'frame', name: 'FAU Founder', id: 'fau_founder' },
      { level: 40, type: 'title', name: 'Network Architect', id: 'network_architect' },
      { level: 45, type: 'hubdeco', name: 'Premium Office Setup', id: 'premium_office' },
      { level: 50, type: 'exclusive_bundle', name: 'Season 1 Complete Set', id: 'season1_complete' }
    ]
  };

  const seasonData = {
    currentSeason: 1,
    seasonName: 'Network Genesis',
    seasonEndDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000 + 12 * 60 * 60 * 1000 + 34 * 60 * 1000)
  };

  const xpForNextLevel = 2000;
  const xpPerLevel = 2000;

  const addBattlePassXP = (amount) => {
    setBattlePassXP(prev => {
      const newXP = prev + amount;
      const newLevel = Math.floor(newXP / xpPerLevel) + 1;
      if (newLevel > battlePassLevel) {
        setBattlePassLevel(newLevel);
      }
      return newXP;
    });
  };

  const claimReward = (track, level) => {
    const reward = track === 'free' 
      ? battlePassRewards.free.find(r => r.level === level)
      : battlePassRewards.premium.find(r => r.level === level);
    
    if (!reward) return false;
    if (claimedRewards.has(`${track}-${level}`)) return false;
    if (track === 'premium' && !battlePassPremium) return false;
    if (level > battlePassLevel) return false;

    setClaimedRewards(prev => new Set([...prev, `${track}-${level}`]));
    
    // Add to inventory
    if (reward.type === 'skin') {
      setInventory(prev => ({
        ...prev,
        themes: [...prev.themes, reward.id]
      }));
    } else if (reward.type === 'frame') {
      setInventory(prev => ({
        ...prev,
        frames: [...prev.frames, reward.id]
      }));
    } else if (reward.type === 'banner') {
      setInventory(prev => ({
        ...prev,
        banners: [...prev.banners, reward.id]
      }));
    } else if (reward.type === 'title') {
      setInventory(prev => ({
        ...prev,
        titles: [...prev.titles, reward.id]
      }));
    } else if (reward.type === 'hubdeco') {
      setInventory(prev => ({
        ...prev,
        hubDecorations: [...prev.hubDecorations, reward.id]
      }));
    } else if (reward.type === 'xp') {
      addBattlePassXP(reward.amount);
    }

    return true;
  };

  const purchasePremium = () => {
    setBattlePassPremium(true);
  };

  const equipItem = (type, id) => {
    setEquipped(prev => ({
      ...prev,
      [type]: id
    }));
  };

  const rewardedMissions = [
    {
      id: 'ad_mission_1',
      title: 'Speed Networker',
      description: 'Knüpfe 5 Kontakte in 10 Minuten',
      rewards: { xp: 400, reach: 5, impactPoints: 100 },
      duration: '10 Minuten'
    },
    {
      id: 'ad_mission_2',
      title: 'Synergy Boost',
      description: 'Erstelle 3 Kooperationen',
      rewards: { xp: 600, synergy: 30, impactPoints: 150 },
      duration: '15 Minuten'
    }
  ];

  const watchAd = () => {
    if (!rewardedAds.available) return false;
    if (rewardedAds.dailyCount >= rewardedAds.dailyMax) return false;

    const mission = rewardedMissions[Math.floor(Math.random() * rewardedMissions.length)];
    setActiveAdMission(mission);
    setRewardedAds(prev => ({
      ...prev,
      available: false,
      dailyCount: prev.dailyCount + 1,
      cooldownEnd: new Date(Date.now() + 4 * 60 * 60 * 1000)
    }));

    // Add rewards
    addBattlePassXP(mission.rewards.xp);
    setInnovationPoints(prev => prev + 2);

    return true;
  };

  const value = {
    startupName,
    setStartupName,
    startupClass,
    setStartupClass,
    startupClasses,
    round,
    maxRounds,
    innovationPoints,
    setInnovationPoints,
    marketCap,
    companyValue,
    resilience,
    maxResilience,
    savedIPPoints,
    currentEvent,
    developmentNodes,
    unlockedNodes,
    unlockNode,
    decisionPath,
    nextRound,
    saveIPPoint,
    // Store
    storeOpen,
    setStoreOpen,
    activeStoreTab,
    setActiveStoreTab,
    battlePassXP,
    battlePassLevel,
    battlePassPremium,
    battlePassRewards,
    seasonData,
    xpForNextLevel,
    claimedRewards,
    claimReward,
    purchasePremium,
    addBattlePassXP,
    inventory,
    equipped,
    equipItem,
    rewardedAds,
    watchAd,
    activeAdMission,
    setActiveAdMission
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

