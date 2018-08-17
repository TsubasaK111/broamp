const IPFS = require('ipfs');
const Room = require('ipfs-pubsub-room');

const RoomVuexPlugin = function (ipfsConfig) {
  console.log(ipfsConfig);
  this.config = ipfsConfig;

  return async (store) => {
    new Promise((resolve, reject) => {
      const ipfs = new IPFS({ ...this.config });

      ipfs.once('ready', () => {
        ipfs.id((err, info) => {
          if (err) reject(err);
          store.commit('ipfsConnection', 'ready');
          console.log('IPFS node ready with address ', info.id);
        });

        const room = Room(ipfs, 'ipfs-pbsub-demo');
        console.log(room);
        resolve(room, ipfs);
      })
    })
      .then((room, ipfs) => {
        room.on('subscribed', () => {
          console.log('now connected to room!');
          store.commit('ipfsConnection', 'subscribed');

          // setInterval(() => {
          //   console.log("broadcasting...");
          //   room.broadcast("supz");
          // }, 4000);
        });

        room.on("peer joined", (peer) => {
          console.log('peer with address', peer, "joined");
          store.commit('peerJoined', peer);

          room.sendTo(peer, "sup" + peer + "!");
          // TODO: enable sending files
          // ipfs.files.add(ipfs.types.Buffer.from("'testtesttest"), (err, files) => {
          //   console.log(files);
          //   room.sendTo(peer, files);
          // });
        });

        room.on("peer left", (peer) => {
          console.log('peer with address', peer, "left");
          store.commit('peerLeft', peer);
        });

        room.on("message", message => {
          console.log('got message from', message.from, ":", message.data.toString());
          store.commit('addMessage', message);
        });
      });
  }
}

module.exports = { RoomVuexPlugin };
