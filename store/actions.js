export default {
  recieveAudioSrc(store, newAudioSrc) {
    // loadFile(event);
    store.commit("recieveAudioSrc", newAudioSrc);
  },
  recieveAudioStatus(store, newAudioStatus) {
    store.commit("recieveAudioStatus", newAudioStatus);
  },
  recieveAudioPlay(store) {
    const audioEl = document.getElementById("audioElement");
    audioEl.play();
    store.commit("recieveAudioPlay");
  },
  recieveAudioPause(store) {
    const audioEl = document.getElementById("audioElement");
    audioEl.pause();
    store.commit("recieveAudioPause");
  },

  // NOTE: additional actions take place in OrbitDbVuexPlugin
  broadcastAudioSrc(store, newAudioSrc) {
    // loadFile(event);
    store.commit("broadcastAudioSrc", newAudioSrc);
  },
  broadcastAudioStatus(store, newAudioStatus) {
    store.commit("broadcastAudioStatus", newAudioStatus);
  },
  broadcastPlay(store) {
    store.commit("broadcastAudioPlay");
  },
  broadcastPause(store) {
    store.commit("broadcastAudioPause");
  },
}

export const makeActions = (db) => {
  console.log("db:", db);
  return actions;
};