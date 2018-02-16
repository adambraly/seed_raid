import { Socket } from 'phoenix';

function configureChannel() {
  const socket = new Socket('/ws', {
    logger: (kind, msg, data) => { console.log(`${kind}: ${msg}`, data); };
  });

  socket.connect();

  return socket;
}

export default configureChannel;
