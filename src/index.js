import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";

import { RoomVuexPlugin } from "./rooms";
import config from "./config";

// const ipfsRoom = new RoomPlugin(config.ipfs);
const vuexRoom = new RoomVuexPlugin(config.ipfs);

Vue.use(Vuex);
// Vue.use(ipfsRoom);

// Vue.room

const store = new Vuex.Store({
  state: {
    title: "IPFS PubSub x Vue x Vuex",
    ipfsStatus: "created",
    peers: [],
    messages: [],
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
    increment(state) {
      state.count++;
    },
    michaelGoHome(state) {
      console.log("michael gohome");
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