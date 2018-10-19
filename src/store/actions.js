// import { OrbitDBMgr } from "../shared_store/OrbitDbMgr";
// import config from "../config";

// const db = new OrbitDBMgr(config.ipfs);
// console.log(db);
export const actions = {
  recievePeerJoined(store, newPeer) {
    if (state.peers.includes(newPeer)) return;
    state.peers.push(newPeer);
  },
  recievePeerLeft(store, leftPeer) {
    state.peers = state.peers.filter(peer => peer !== leftPeer);
  },
  // broadCastPeerJoined(store, newPeer) {
  //   if (state.peers.includes(newPeer)) return;
  //   state.peers.push(newPeer);
  // },
  // broadCastPeerLeft(store, leftPeer) {
  //   state.peers = state.peers.filter(peer => peer !== leftPeer);
  // },

  recieveAudioSrc(store, newAudioSrc) {
    state.audioSrc = newAudioSrc;
  },
  recieveAudioStatus(store, newAudioStatus) {
    state.audioStatus = newAudioStatus;
  },
  recieveAudioPlay(store) {
    state.audioPaused = false;
  },
  recieveAudioPause(store) {
    state.audioPaused = true;
  },

  broadcastAudioSrc(store, newAudioSrc) {
    state.audioSrc = newAudioSrc;
  },
  broadcastAudioStatus(store, newAudioSrc) {
    state.audioSrc = newAudioSrc;
  },
  broadcastPlay(store) {

    state.audioPaused = false;
  },
  broadcastPause(store) {
    state.audioPaused = true;
  },
}