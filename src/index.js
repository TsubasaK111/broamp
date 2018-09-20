import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";


import { IpfsPlugin, RoomVuexPlugin } from "./shared_store";
import { OrbitDBPlugin } from "./shared_store/OrbitDbPlugin";



import config from "./config";
import { mutations } from "./store/mutations";

// const ipfsRoom = new IpfsPlugin(config.ipfs);
const vuexRoom = new RoomVuexPlugin(config.ipfs);
const ipfsPlugin = new IpfsPlugin(config.ipfs);
const orbitDbPlugin = new OrbitDBPlugin(config.ipfs);

Vue.use(Vuex);
Vue.use(ipfsPlugin);
// Vue.use(orbitDbPlugin);

const store = new Vuex.Store({
  state: {
    title: "IPFS PubSub x Vue x Vuex",
    ipfsStatus: "created",
    peers: [],
    messages: [],
    audioSrc: "./audio/Odesza-Above_The_Middle.mp3",
    audioPaused: true,
    audioVolume: "0.7",
    audioStatus: "created",

  },
  mutations: mutations,
  plugins: [vuexRoom]
});

const app = new Vue({
  el: "#app",
  store,
  render: (h) => h(App),
});

// roomManager(config.ipfs);