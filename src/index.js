console.log('sup dawags');

const IPFS = require('ipfs');
const Room = require('ipfs-pubsub-room');

console.log(Room);
const repo = () => 'ipfs/pubsub-demo/' + Math.random();

const ipfs = new IPFS({
  repo: repo(),
  EXPERIMENTAL: {
    pubsub: true,
  },
  config: {
    Addresses: {
      Swarm: [
        // // experimental webrtc 
        // "/ip4/0.0.0.0/tcp/4002",
        // "/ip4/127.0.0.1/tcp/4003/ws",
        // "/dns4/wrtc-star.discovery.libp2p.io/tcp/443/wss/p2p-webrtc-star"
        '/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star',
      ]
    }
  }
});

ipfs.once('ready', () => {
  ipfs.id((err, info) => {
    if (err) throw err;
    console.log('IPFS node ready with address ', info.id);
  });

  const room = Room(ipfs, 'ipfs-pbsub-demo');
  console.log(room);

  room.on('subscribed', () => {
    console.log('now connected to room!');

    // setInterval(() => {
    //   console.log("broadcasting...");
    //   room.broadcast("supz");
    // }, 4000);
  });

  room.on("peer joined", (peer) => {
    console.log('peer with address', peer, "joined");
    room.sendTo(peer, "sup" + peer + "!");
  });

  room.on("peer left", (peer) => {
    console.log('peer with address', peer, "left")
  });

  room.on("message", message => {
    console.log('got message from', message.from, ":", message.data.toString());
  });
});

