import React, { useEffect, useState } from 'react';
import { GameConfig } from '../models/GameConfig';

import Bullet from '../components/Bullet/Bullet';
import BulletEntity from '../entities/Bullet.entity';
import EntityFactory from '../services/EntityFactory';
import CollisionDetector from '../services/CollisionDetector';
import TrailContainer from './TrailContainer';
import Messenger from '../services/Messenger';
import { OnBulletCreationMessage } from '../messages/OnBulletCreationMessage';
import { OnBulletRemovalMessage } from '../messages/OnBulletRemovalMessage';

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
          const newBullet = entityFactory.CreateBullet(gameConfig);
          bullets.push(newBullet);
          Messenger.SendMessage(new OnBulletCreationMessage(newBullet));

          nextBulletSpawn = gameConfig.Bullet.SpawnRate;
        } else {
          nextBulletSpawn -= gameConfig.Tick;
        }

        const aliveBullets = bullets.filter(b => {
          const isAlive = b.IsAlive();
          if (!isAlive) {
            Messenger.SendMessage(new OnBulletRemovalMessage(b));
          }
          return isAlive;
        });

        return [...aliveBullets];
      });
    }, gameConfig.Tick);
  }, []);

  return (
    <div>
      {bullets.map(b => (
        <Bullet key={b.Data.Id} bullet={b} />
      ))}
      <TrailContainer gameConfig={gameConfig} entityFactory={entityFactory} />
    </div>
  );
};

export default BulletContainer;
