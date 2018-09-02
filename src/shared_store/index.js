const IPFS = require('ipfs');
const Room = require('ipfs-pubsub-room');

const IpfsPlugin = function (ipfsConfig) {
  this.config = ipfsConfig;

  return {
    install: async (Vue, ipfsConfig, state) => {
      new Promise((resolve, reject) => {
        const ipfs = new IPFS({ ...this.config });

        ipfs.on('ready', () => {
          ipfs.id((err, info) => {
            if (err) reject(err);
            console.log('IPFS node ready with address ', info.id);
            resolve(ipfs);
          });
        });
      })
        .then(ipfs => {
          Vue.prototype.$ipfs = ipfs;
          Vue.prototype.$room
        });
    }
  }
}

const RoomVuexPlugin = function (ipfsConfig) {
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

          const [header, payload] = message.data.toString().split("::");

          const audioEl = document.getElementById("audioElement");

          switch (header) {
            case ('broadcastChange'):
              store.commit('updateAudioSrc', payload);
              return;
            case ("broadcastPlay"):
              // todo: make sure you're playing the right track by comparing audioSrcUrl. 
              // if store.state.

              store.commit('audioPlay');
              audioEl.play(); //TODO: this is janky.
              return;

            case ("broadcastPause"):
              store.commit('audioPause');
              audioEl.pause();
              return;
            default:
            // do nothing.
          }
          store.commit('addMessage', message);
        });

        store.subscribe((mutation, state) => {
          const audioEl = document.getElementById("audioElement");

          // called after every mutation.
          // The mutation comes in the format of `{ type, payload }`.
          switch (mutation.type) {
            case ('broadcastChange'):
              room.broadcast(`broadcastChange::${mutation.payload}`);
              
              // store.commit('updateAudioSrc', audioSrcUrl);
              return;
            case ("broadcastPlay"):
              room.broadcast(`broadcastPlay::${store.audioSrc}`);
              audioEl.currentTime -= 0.1;
              return;
            case ("broadcastPause"):
              room.broadcast(`broadcastPause::${store.audioSrc}`);
              return;
            default:
            // do nothing.
          }
        });
      });
  };
};

module.exports = { IpfsPlugin, RoomVuexPlugin };
