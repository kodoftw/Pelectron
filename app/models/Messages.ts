export enum MessageType {
  OnBulletPadCollision = 'OnBulletPadCollision',
  OnBulletCreation = 'OnBulletCreation',
}

export abstract class Message {
  public abstract GetMessageType(): MessageType;
}
