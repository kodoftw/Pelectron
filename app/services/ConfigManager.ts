import KineticsConfigManager from './KineticsConfigManager';

import { GameConfig, BulletConfig, PadConfig } from '../models/GameConfig';
import { PadPosition } from '../models/Pad';

export default class ConfigManager {
  public gameConfig: GameConfig;

  constructor() {
    this.gameConfig = this.createInitialGameConfig();
  }

  private createInitialGameConfig(): GameConfig {
    const padConfig = this.padConfig();
    const bulletConfig = this.bulletConfig();
    const gameTick = 1000 / 120;
    const kineticsConfig = new KineticsConfigManager(bulletConfig, padConfig, gameTick);

    // @TODO: Move this to a config file
    return {
      Bullet: bulletConfig,
      Pad: padConfig,
      Kinetics: kineticsConfig.KineticsConfig(),
      Tick: gameTick,
    };
  }

  private bulletConfig(): BulletConfig {
    return {
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
}
