import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";

import { IpfsPlugin, RoomVuexPlugin } from "./rooms";
import config from "./config";
import './audio/Odesza-Above_The_Middle.mp3';

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
    audioSrc: "./audio/Odesza-Above_The_Middle.mp3",
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
    changeAudioSrc(state, newAudioSrc){
      state.audioSrc = newAudioSrc;
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