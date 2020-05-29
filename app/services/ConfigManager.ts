import { GameConfig } from '../models/GameConfig';
import { PadPosition } from '../models/Pad';

class ConfigManager {
  private gameConfig: GameConfig;

  constructor() {
    this.gameConfig = this.createInitialGameConfig();
  }

  public CurrentGameConfig(): GameConfig {
    return this.gameConfig;
  }

  private createInitialGameConfig(): GameConfig {
    // @TODO: Move this to a config file
    return {
      Bullet: {
        DropTime: 2000,
        SpawnRate: 2000,
        Size: 1.3,
      },
      Pad: {
        Position: PadPosition.Left,
        Width: 31,
        Top: 95,
        Padding: 3.5,
      },
      Tick: 1000 / 60,
    };
  }
}

export default ConfigManager;
