const IPFS = require('ipfs');
const Room = require('ipfs-pubsub-room');

const IpfsPlugin = function (ipfsConfig) {
  return {
    install: async (Vue, ipfsConfig, state) => {
      new Promise((resolve, reject) => {
        const ipfs = new IPFS({ ...this.config });

        ipfs.once('ready', () => {
          ipfs.id((err, info) => {
            if (err) reject(err);
            console.log('IPFS node ready with address ', info.id);
            resolve(ipfs);
          });
        });
      })
        .then(ipfs => {
          Vue.prototype.$ipfs = ipfs;
        });
    }
  }
}

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
          resolve(ipfs);
        });
      });
    })
      .then(ipfs => {
        const room = Room(ipfs, 'ipfs-pbsub-demo');
        return { room, ipfs };
      })
      .then(({ room, ipfs }) => {
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
        });

        room.on("peer left", (peer) => {
          console.log('peer with address', peer, "left");
          store.commit('peerLeft', peer);
        });

        room.on("message", message => {
          console.log('got message from', message.from, ":", message.data.toString());
          const payload = message.data.toString()
          if(payload.startsWith('newAudioSrc:')){
            const audioSrcUrl = payload.replace('newAudioSrc:','')
            window.open(audioSrcUrl);
          }

          store.commit('addMessage', message);
        });

        // store.subscribe((mutation, state) => {
        store.subscribe((mutation) => {
          // called after every mutation.
          // The mutation comes in the format of `{ type, payload }`.
          if (mutation.type === 'changeAudioSrc') {
            room.broadcast(`newAudioSrc:${mutation.payload}`);
          }
        });
      });
  };
};

module.exports = { IpfsPlugin, RoomVuexPlugin };
