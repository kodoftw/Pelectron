import { Message } from '../models/Messages';

class Messenger {
  public static SendMessage(message: Message): void {
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent(message.GetMessageType(), { detail: message }));
    }, 0);
  }
}

export default Messenger;
