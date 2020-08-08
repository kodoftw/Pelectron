import { Message, MessageType } from '../models/Messages';
import { BulletData } from '../models/Bullet';

export class OnBulletCreationMessage implements Message {
  constructor(private bullet: BulletData) {}

  public GetMessageType(): MessageType {
    return MessageType.OnBulletPadCollision;
  }

  public get BulletCreated(): BulletData {
    return this.bullet;
  }
}
