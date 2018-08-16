// for dev purposes, make repo different even if from same ip address.
const repo = () => 'ipfs/pubsub-demo/' + Math.random();

const config = {
  ipfs: {
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
          // "/dns4/wrtc-star.discovery.libp2p.io/tcp/443/wss/p2p-webrtc-star",
          '/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star',
        ]
      }
    }
  }
}

export default config;