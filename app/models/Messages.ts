export enum MessageType {
  OnBulletPadCollision = 'OnBulletPadCollision',
  OnBulletCreation = 'OnBulletCreation',
  OnBulletRemoval = 'OnBulletRemoval',
}

export abstract class Message {
  public abstract GetMessageType(): MessageType;
}
