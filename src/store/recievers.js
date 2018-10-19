import { OrbitDBMgr } from "../shared_store/OrbitDbMgr";
import config from "../config";

// TODO: utilize/invoke these actions in the OrbitDbVuexPlugin.

const db = new OrbitDBMgr(config.ipfs);
console.log(db);

export const listen = async (callback) => {
  await db.events.on('replicated', callback);
}
const recievers = {
  recievePeerJoined: async (store, newPeer) => {
    if (state.peers.includes(newPeer)) return;
    state.peers.push(newPeer);
  },
  recievePeerLeft: async (store, leftPeer) => {
    state.peers = state.peers.filter(peer => peer !== leftPeer);
  },
  recieveAudioSrc: async (store, newAudioSrc) => {
    state.audioSrc = newAudioSrc;
  },
  recieveAudioStatus: async (store, newAudioStatus) => {
    state.audioStatus = newAudioStatus;
  },
  recieveAudioPlay: async (store) => {
    state.audioPaused = false;
  },
  recieveAudioPause: async (store) => {
    state.audioPaused = true;
  },
}