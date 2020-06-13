import React from 'react';

import GameScreen from '../components/GameScreen/GameScreen';
import ConfigManager from '../services/ConfigManager';

import EntityContainer from './EntityContainer';
import ScoreContainer from './ScoreContainer';

const configManager = new ConfigManager();

const Pel: React.FC = () => {
  return (
    <GameScreen>
      <ScoreContainer />
      <EntityContainer gameConfig={configManager.gameConfig} />
    </GameScreen>
  );
};

export default Pel;
