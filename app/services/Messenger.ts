import { OnBulletPadCollisionMessage } from '../messages/OnBulletPadCollisionMessage';

import { MessageType, Message } from '../models/Messages';

class Messenger {
  public static Send(messageType: MessageType): void {
    const message = this.create(messageType);

    setTimeout(() => {
      window.dispatchEvent(new CustomEvent(MessageType.OnBulletPadCollision, { detail: message }));
    }, 0);
  }

  private static create(messageType: MessageType): Message {
    switch (messageType) {
      case MessageType.OnBulletPadCollision:
        return new OnBulletPadCollisionMessage();

      default:
        throw new Error(`Unknown MessageType ${messageType}`);
    }
  }
}

export default Messenger;
