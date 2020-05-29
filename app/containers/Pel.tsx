import React, { useState } from 'react';

import ConfigManager from '../services/ConfigManager';

import Score from '../components/Score/Score';
import GameScreen from '../components/GameScreen/GameScreen';

import EntityContainer from './EntityContainer';

const configManager = new ConfigManager();

const Pel: React.FC = () => {
  const [score] = useState(0);

  return (
    <GameScreen>
      <Score score={score} />
      <EntityContainer gameConfig={configManager.CurrentGameConfig()} />
    </GameScreen>
  );
};

export default Pel;
