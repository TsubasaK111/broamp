// for dev purposes, make repo different even if from same ip address.
const repo = () => 'ipfs/pubsub-demo/' + Math.random();

const config = {
  ipfs: {
    // repo: repo(),
    repo: "ipfs/shared",
    EXPERIMENTAL: {
      pubsub: true,
    },
    config: {
      Addresses: {
        Swarm: [
          '/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star',
          // // experimental webrtc 
          // "/ip4/0.0.0.0/tcp/4002",
          // "/ip4/127.0.0.1/tcp/4003/ws",
          // "/dns4/wrtc-star.discovery.libp2p.io/tcp/443/wss/p2p-webrtc-star",

          // Use local signal server
          // '/ip4/0.0.0.0/tcp/9090/wss/p2p-webrtc-star',
          // Use IPFS dev signal server
          // '/dns4/star-signal.cloud.ipfs.team/wss/p2p-webrtc-star',
        ]
      }
    }
  }
}

module.exports = config;
// export default config;