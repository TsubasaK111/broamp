
export const mutations = {
  ipfsConnection(state, newStatus) {
    state.ipfsStatus = newStatus;
  },
  peerJoined(state, newPeer) {
    if (state.peers.includes(newPeer)) return;
    state.peers.push(newPeer);
  },
  peerLeft(state, leftPeer) {
    state.peers = state.peers.filter(peer => peer !== leftPeer);
  },
  addMessage(state, newMessage) {
    state.messages.push(newMessage);
  },
  updateAudioSrc(state, newAudioSrc) {
    state.audioSrc = newAudioSrc;
  },
  updateAudioStatus(state, newAudioStatus) {
    state.audioStatus = newAudioStatus;
  },
  audioPlay(state){
    state.audioPaused = false;
  },
  audioPause(state){
    state.audioPaused = true;
  },


  broadcastAudioSrc(state, newAudioSrc){
    state.audioSrc = newAudioSrc;
    console.log(`audioSrc has changed (broadcastAudioSrc)`);
  },
  broadcastAudioStatus(state, audioStatus) {
    state.audioStatus = audioStatus;
  },
  broadcastPlay(state) {
    if (state.audioStatus !== 'canPlayThrough') throw Error('audio is not ready to play through, wait!')
    state.audioPaused = false;
    console.log('broadcastPlayMttn');
  },
  broadcastPause(state) {
    state.audioPaused = true;
    console.log('broadcastPauseMttn');
  },
}