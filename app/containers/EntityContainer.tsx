import React, { useEffect, useState } from 'react';

import { GameConfig } from '../models/GameConfig';

import BulletContainer from './BulletContainer';
import PadContainer from './PadContainer';

import PadEntity from '../entities/Pad.entity';
import EntityFactory from '../entities/EntityFactory';

import CollisionDetector from '../services/CollisionDetector';
import InputHandler from '../services/InputHandler';

type EntityContainerProps = {
  gameConfig: GameConfig;
};

const entityFactory = new EntityFactory();
const collisionDetector = new CollisionDetector();
const inputHandler = new InputHandler();

const EntityContainer: React.FC<EntityContainerProps> = ({ gameConfig }) => {
  const [pad, setPad] = useState<PadEntity>();

  useEffect(() => {
    const pad = entityFactory.CreatePad(gameConfig);
    collisionDetector.SetPad(pad);
    setPad(pad);
  }, []);

  return (
    <div>
      <PadContainer pad={pad} inputHandler={inputHandler} />
      <BulletContainer
        gameConfig={gameConfig}
        entityFactory={entityFactory}
        collisionDetector={collisionDetector}
      />
    </div>
  );
};

export default EntityContainer;
