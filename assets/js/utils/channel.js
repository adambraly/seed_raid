import { Socket } from 'phoenix';

export default function configureChannel() {
  const socket = new Socket('/socket', {
    logger: (kind, msg, data) => { console.log(`${kind}: ${msg}`, data); },
  });

  socket.connect();

  return socket;
}
