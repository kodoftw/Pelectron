import { Message, MessageType } from '../models/Messages';
import BulletEntity from '../entities/Bullet.entity';

export class OnBulletCreationMessage implements Message {
  constructor(private bullet: BulletEntity) {}

  public GetMessageType(): MessageType {
    return MessageType.OnBulletCreation;
  }

  public get BulletCreated(): BulletEntity {
    return this.bullet;
  }
}
