import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";

import { IpfsPlugin, RoomVuexPlugin } from "./rooms";
import config from "./config";

// const ipfsRoom = new IpfsPlugin(config.ipfs);
const vuexRoom = new RoomVuexPlugin(config.ipfs);
const ipfsPlugin = new IpfsPlugin(config.ipfs);

Vue.use(Vuex);
Vue.use(ipfsPlugin);

const store = new Vuex.Store({
  state: {
    title: "IPFS PubSub x Vue x Vuex",
    ipfsStatus: "created",
    peers: [],
    messages: [],
    audioSrc: "",
    audioPaused: true,
    audioVolume: "0.7",
    audioStatus: "created",
  },
  mutations: {
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
  },
  plugins: [vuexRoom]
});

const app = new Vue({
  el: "#app",
  store,
  render: (h) => h(App),
});

// roomManager(config.ipfs);