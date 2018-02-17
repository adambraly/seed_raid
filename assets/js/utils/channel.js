import { Socket } from 'phoenix';
import Logger from 'js-logger';

export default function configureChannel() {
  const socket = new Socket('/socket', {
    logger: (kind, msg, data) => { Logger.debug(`${kind}: ${msg}`, data); },
  });

  socket.connect();

  return socket;
}
