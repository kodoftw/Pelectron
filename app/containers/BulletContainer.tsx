import React, { useEffect, useState } from 'react';
import { GameConfig } from '../models/GameConfig';

import Bullet from '../components/Bullet/Bullet';

import BulletEntity from '../entities/Bullet.entity';
import EntityFactory from '../entities/EntityFactory';

import CollisionDetector from '../services/CollisionDetector';

type BulletContainerProps = {
  gameConfig: GameConfig;
  entityFactory: EntityFactory;
  collisionDetector: CollisionDetector;
};

let nextBulletSpawn = 0;

const BulletContainer: React.FC<BulletContainerProps> = ({
  gameConfig,
  entityFactory,
  collisionDetector,
}) => {
  const [bullets, setBullets] = useState<BulletEntity[]>([]);

  useEffect(() => {
    setInterval(() => {
      setBullets(bullets => {
        bullets.forEach(b => b.AdvanceTick(collisionDetector));

        // TODO: move this out to a setTimeout
        if (nextBulletSpawn <= 0) {
          nextBulletSpawn = gameConfig.Bullet.SpawnRate;
          bullets.push(entityFactory.CreateBullet(gameConfig));
        } else {
          nextBulletSpawn -= gameConfig.Tick;
        }

        return [...bullets.filter(b => !b.IsOutOfBounds())];
      });
    }, gameConfig.Tick);
  }, []);

  return (
    <div>
      {bullets.map(b => (
        <Bullet key={b.Data.Id} bullet={b} />
      ))}
    </div>
  );
};

export default BulletContainer;
