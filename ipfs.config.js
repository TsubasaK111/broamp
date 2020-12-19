// for dev purposes, make repo different even if from same ip address.
const repo = () => 'ipfs/broamp-demo/' + Math.random()

const config = {
  ipfs: {
    repo: repo(),
    // repo: "ipfs/shared",
    EXPERIMENTAL: {
      ipnsPubsub: true,
    },
    config: {
      Addresses: {
        Swarm: [
          // Libp2p hosted rendezvous server https://github.com/libp2p/js-libp2p-webrtc-star#hosted-rendezvous-server
          "/dns4/wrtc-star1.par.dwebops.pub/tcp/443/wss/p2p-webrtc-star/",
          "/dns4/wrtc-star2.sjc.dwebops.pub/tcp/443/wss/p2p-webrtc-star/",
          
          // experimental webrtc
          '/ip4/198.46.197.197/tcp/4001/ipfs/QmdXiwDtfKsfnZ6RwEcovoWsdpyEybmmRpVDXmpm5cpk2s',

          // IPFS dev rendezvous server
          // '/dns4/star-signal.cloud.ipfs.team/wss/p2p-webrtc-star',

          // locally hosted websocket star
          // "/ip4/0.0.0.0/tcp/9090/wss/p2p-webrtc-star",
          // local brave browser hosted star
          // "/ip4/127.0.0.1:5001/", 

          // config default
          // "/ip4/0.0.0.0/tcp/4002",
          // another config default, however creating ws server in browser is not allowed
          // "/ip4/127.0.0.1/tcp/4003/ws",
        ],
      },
    },
  },
}

module.exports = config
