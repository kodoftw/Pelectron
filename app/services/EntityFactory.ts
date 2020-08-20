import { BulletData } from '../models/Bullet';
import { GameConfig, PadConfig } from '../models/GameConfig';
import { PadData } from '../models/Pad';
import { TrailData } from '../models/Trail';

import BulletEntity from '../entities/Bullet.entity';
import PadEntity from '../entities/Pad.entity';
import TrailEntity from '../entities/Trail.entity';

class EntityFactory {
  private bulletCount = 0;
  private trailCount = 0;

  public CreatePad(gameConfig: GameConfig): PadEntity {
    const padData = this.mapToPadData(gameConfig.Pad);

    return new PadEntity(padData);
  }

  public CreateBullet(gameConfig: GameConfig): BulletEntity {
    const bulletData = this.generateBulletData(gameConfig);

    return new BulletEntity(bulletData, gameConfig);
  }

  public CreateTrail(sourceEntity: BulletEntity, gameConfig: GameConfig): TrailEntity {
    const trailData = this.generateTrailData(sourceEntity);

    return new TrailEntity(trailData, gameConfig);
  }

  private mapToPadData(config: PadConfig): PadData {
    return {
      Position: config.Position,
      Width: config.Width,
      Top: config.Top,
      Padding: config.Padding,
    };
  }

  private generateBulletData(gameConfig: GameConfig): BulletData {
    return {
      Id: this.bulletCount++,
      Color: this.generateBulletColor(this.bulletCount),
      Position: {
        Top: 0,
        Left: 0,
      },
      Velocity: {
        X: 0,
        Y: 0,
      },
      Size: gameConfig.Bullet.Size,
    };
  }

  private generateBulletColor(index: number): string {
    const colors = this.bulletColors();
    return colors[index % colors.length];
  }

  private bulletColors(): string[] {
    return [
      '#1E88E5', // blue
      '#F44336', // red
      '#43A047', // green
      '#3949AB', // indigo
      '#FB8C00', // orange
      '#5E35B1', // deeppurple
      '#6D4C41', // brown
      '#FDD835', // yellow
      '#880E4F', // deeppink
      '#039BE5', // lightblue
    ];
  }

  private generateTrailData(sourceEntity: BulletEntity): TrailData {
    return {
      Id: this.trailCount++,
      Color: sourceEntity.Data.Color,
      Position: sourceEntity.Position,
      Size: sourceEntity.Size,
    };
  }
}

export default EntityFactory;
