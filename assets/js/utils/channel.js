import { Socket } from 'phoenix';
import logger from './logger';

export default function configureChannel() {
  const socket = new Socket('/socket', {
    logger: (kind, msg, data) => { logger.debug(`${kind}: ${msg}`, data); },
  });

  socket.connect();

  return socket;
}
