import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";

import { IpfsPlugin, RoomVuexPlugin } from "./shared_store";
// import { OrbitDBPlugin } from "./shared_store/OrbitDbPlugin";
import { createOrbitDBVuexPlugin } from "./shared_store/OrbitDbVuexPlugin";

import config from "./config";
import { actions } from "./store/actions";
import { mutations } from "./store/mutations";
import "./assets/kessondalef.mp3";

const setupVue = async () => {
  // const vuexRoom = new RoomVuexPlugin(config.ipfs);
  const ipfsPlugin = new IpfsPlugin(config.ipfs);
  // const orbitDbPlugin = new OrbitDBPlugin(config.ipfs);
  const orbitDbVuexPlugin = await new createOrbitDBVuexPlugin(config.ipfs);


  Vue.use(Vuex);
  Vue.use(ipfsPlugin);
  // Vue.use(orbitDbPlugin);

  const store = new Vuex.Store({
    state: {
      ipfsStatus: "created",
      peers: [],
      messages: [],
      audioSrc: "./assets/kessondalef.mp3",
      audioPaused: true,
      audioVolume: "0.7",
      audioStatus: "created",
    },
    actions,
    mutations,
    plugins: [orbitDbVuexPlugin]
    // plugins: [vuexRoom]
  });

  const app = new Vue({
    el: "#app",
    store,
    render: (h) => h(App),
  });
}

setupVue();