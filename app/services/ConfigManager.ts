import { GameConfig, BulletConfig, PadConfig, KineticsConfig } from '../models/GameConfig';
import { PadPosition } from '../models/Pad';

class ConfigManager {
  public gameConfig: GameConfig;

  constructor() {
    this.gameConfig = this.createInitialGameConfig();
  }

  private createInitialGameConfig(): GameConfig {
    const padConfig = this.padConfig();
    const bulletConfig = this.bulletConfig();
    const kineticsConfig = this.kineticsConfig(padConfig, bulletConfig);

    // @TODO: Move this to a config file
    return {
      Bullet: bulletConfig,
      Pad: padConfig,
      Kinetics: kineticsConfig,
      Tick: 1000 / 120,
    };
  }

  private bulletConfig(): BulletConfig {
    return {
      Gravity: 0.0001,
      SpawnRate: 2000,
      Size: 1.3,
    };
  }

  private padConfig(): PadConfig {
    return {
      Position: PadPosition.Left,
      Width: 31,
      Top: 95,
      Padding: 3.5,
    };
  }

  private kineticsConfig(padConfig: PadConfig, bulletConfig: BulletConfig): KineticsConfig {
    return {
      DropTimes: this.dropTimes(padConfig, bulletConfig),
      PadCenter: this.padCenter(padConfig, bulletConfig),
    };
  }

  private dropTimes(padConfig: PadConfig, bulletConfig: BulletConfig): number[] {
    const baseHeight = padConfig.Top - bulletConfig.Size;
    const heights = [baseHeight, baseHeight - 19.48, baseHeight - 34.77, baseHeight - 47.13];

    return heights.map((h, i) => {
      const dropTime = ((2 * h) / bulletConfig.Gravity) ** 0.5;
      return i === 0 ? dropTime : 2 * dropTime;
    });
  }

  private padCenter(padConfig: PadConfig, bulletConfig: BulletConfig): number[] {
    const basePosition = padConfig.Padding - bulletConfig.Size / 2;

    return [
      basePosition + 0.5 * padConfig.Width,
      basePosition + 1.5 * padConfig.Width,
      basePosition + 2.5 * padConfig.Width,
      basePosition + 3.5 * padConfig.Width,
    ];
  }
}

export default ConfigManager;
