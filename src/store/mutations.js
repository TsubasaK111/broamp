
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
  broadcastChange(state, newAudioSrc){
    console.log(`broadcastChange is trigged`)
    state.audioSrc = newAudioSrc;
  },
  broadcastPlay(state) {
    if (state.audioStatus !== 'canPlayThrough') throw Error('audio is not ready to play through, wait!')

    state.audioPaused = false;
  },
  broadcastPause(state) {
    state.audioPaused = true;
  },
  setTime(state, datetime) {
    state.time = datetime;
  },
}