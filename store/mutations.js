
export default {
  recieveAudioSrc(state, newAudioSrc) {
    console.log('recieveAudioSrc mttn');
    state.audioSrc = newAudioSrc;
    console.log(`audioSrc has changed (updateAudioSrc)`);
  },
  recieveAudioStatus(state, newAudioStatus) {
    console.log('recieveAudioStatus mttn');
    if (newAudioStatus !== undefined) {
      state.audioStatus = newAudioStatus;
    }
  },
  recieveAudioPlay(state) {
    console.log('recieveAudioPlay mttn');
    if (state.audioStatus !== 'canPlayThrough') {
      throw Error(`audio is not ready to play through. audioStatus: ${state.audioStatus}`);
    }
    state.audioPaused = false;
  },
  recieveAudioPause(state) {
    console.log('recieveAudioPause mttn');
    state.audioPaused = true;
  },


  broadcastAudioSrc(state, newAudioSrc) {
    state.audioSrc = newAudioSrc;
    console.log(`audioSrc has changed (broadcastAudioSrc)`);
  },
  broadcastAudioStatus(state, newAudioStatus) {
    if (newAudioStatus !== undefined) {
      state.audioStatus = newAudioStatus;
    }
  },
  broadcastAudioPlay(state) {
    if (state.audioStatus !== 'canPlayThrough') {
      throw Error(`audio is not ready to play through. audioStatus: ${state.audioStatus}`);
    }
    state.audioPaused = false;
  },
  broadcastAudioPause(state) {
    console.log('audioPause');
    state.audioPaused = true;
  },
}