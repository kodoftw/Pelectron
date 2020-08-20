import { Message, MessageType } from '../models/Messages';
import BulletEntity from '../entities/Bullet.entity';

export class OnBulletRemovalMessage implements Message {
  constructor(private bullet: BulletEntity) {}

  public GetMessageType(): MessageType {
    return MessageType.OnBulletRemoval;
  }

  public get BulletRemoved(): BulletEntity {
    return this.bullet;
  }
}
