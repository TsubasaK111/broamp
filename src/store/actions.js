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

  // NOTE: additional actions take place in OrbitDbVuexPlugin (planned)
  broadcastAudioSrc(store, newAudioSrc) {
    // loadFile(event);
    store.commit("broadcastAudioSrc", newAudioSrc);
  },
  broadcastAudioStatus(store, audioStatus) {
    store.commit("broadcastAudioStatus");
  },
  broadcastPlay(store) {
    store.commit("broadcastPlay");
  },
  broadcastPause(store) {
    store.commit("broadcastPause");
  },
}

export const makeActions = (db) => {
  console.log("db:", db);
  return actions;
};