import React, { useEffect, useState } from 'react';

import Trail from '../components/Trail/Trail';

import BulletEntity from '../entities/Bullet.entity';
import TrailEntity from '../entities/Trail.entity';

import { GameConfig } from '../models/GameConfig';
import { MessageType } from '../models/Messages';

import EntityFactory from '../services/EntityFactory';

type TrailContainerProps = {
  gameConfig: GameConfig;
  entityFactory: EntityFactory;
};

const TrailContainer: React.FC<TrailContainerProps> = ({ gameConfig, entityFactory }) => {
  const [trails, setTrails] = useState<TrailEntity[]>([]);
  const [bulletMap, setBulletMap] = useState<Map<number, BulletEntity>>(new Map());
  const [intervalsMap, setIntervalsMap] = useState<Map<number, NodeJS.Timeout>>(new Map());

  useEffect(() => {
    window.addEventListener(MessageType.OnBulletCreation, ((event: CustomEvent) => {
      const sourceBullet = event.detail.bullet as BulletEntity;

      setBulletMap(map => map.set(sourceBullet.Data.Id, sourceBullet));

      const interval = setInterval(() => {
        const bulletEntity = bulletMap.get(sourceBullet.Data.Id);

        if (bulletEntity != null) {
          const newTrail = entityFactory.CreateTrail(bulletEntity, gameConfig);
          setTrails(trails => [...trails, newTrail]);
        }
      }, gameConfig.Trail.CreationTickInterval);

      setIntervalsMap(map => map.set(sourceBullet.Data.Id, interval));
    }) as EventListener);

    window.addEventListener(MessageType.OnBulletRemoval, ((event: CustomEvent) => {
      const sourceBullet = event.detail.bullet as BulletEntity;
      setBulletMap(map => {
        map.delete(sourceBullet.Data.Id);
        return map;
      });

      const interval = intervalsMap.get(sourceBullet.Data.Id);
      if (interval) {
        clearInterval(interval);
        setIntervalsMap(map => {
          map.delete(sourceBullet.Data.Id);
          return map;
        });
      }
    }) as EventListener);

    setInterval(() => {
      setTrails(trails => {
        trails.forEach(b => b.AdvanceTick());
        return [...trails.filter(b => b.IsAlive())];
      });
    }, gameConfig.Tick);
  }, []);

  return (
    <div>
      {trails.map(b => (
        <Trail key={b.Data.Id} trail={b} />
      ))}
    </div>
  );
};

export default TrailContainer;
