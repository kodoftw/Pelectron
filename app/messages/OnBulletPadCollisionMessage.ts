import { Message, MessageType } from '../models/Messages';

export class OnBulletPadCollisionMessage implements Message {
  public GetMessageType(): MessageType {
    return MessageType.OnBulletPadCollision;
  }
}
