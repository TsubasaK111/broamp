const IPFS = require('ipfs');
const Room = require('ipfs-pubsub-room');
const { Buffer } = require('buffer');

export const roomManager = (config) => {
  console.log(config)
  const ipfs = new IPFS({ ...config.ipfs });

  ipfs.once('ready', () => {
    ipfs.id((err, info) => {
      if (err) throw err;
      console.log('IPFS node ready with address ', info.id);
    });

    const room = Room(ipfs, 'ipfs-pbsub-demo');
    console.log(room);

    room.on('subscribed', () => {
      console.log('now connected to room!');

      setInterval(() => {
        console.log("broadcasting...");
        room.broadcast("supz");
      }, 4000);
    });

    room.on("peer joined", (peer) => {
      console.log('peer with address', peer, "joined");
      room.sendTo(peer, "sup" + peer + "!");
      ipfs.files.add(ipfs.types.Buffer.from("'testtesttest"), (err, files) => {
        console.log(files);
        room.sendTo(peer, files);
      });
    });

    room.on("peer left", (peer) => {
      console.log('peer with address', peer, "left")
    });

    room.on("message", message => {
      console.log('got message from', message.from, ":", message.data.toString());
    });
  });

  // TODO: send files from peer to peer
  // TODO: make simple interface to ad-hoc send messages/files to each other.

}