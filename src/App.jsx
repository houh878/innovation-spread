import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainMenu from './components/MainMenu';
import GameSetup from './components/GameSetup';
import GameScreen from './components/GameScreen';
import DevelopmentLab from './components/DevelopmentLab';
import StrategyArchive from './components/StrategyArchive';
import { GameProvider } from './context/GameContext';
import './index.css';
import './App.css';

function App() {
  return (
    <GameProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainMenu />} />
          <Route path="/setup" element={<GameSetup />} />
          <Route path="/game" element={<GameScreen />} />
          <Route path="/lab/:category" element={<DevelopmentLab />} />
          <Route path="/archive" element={<StrategyArchive />} />
        </Routes>
      </BrowserRouter>
    </GameProvider>
  );
}

export default App;
