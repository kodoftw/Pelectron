export enum MessageType {
  OnBulletPadCollision = 'OnBulletPadCollision',
}

export abstract class Message {
  public abstract GetMessageType(): MessageType;
}
