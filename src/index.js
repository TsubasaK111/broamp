import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";

import { RoomPlugin , roomManager } from "./rooms";
import config from "./config";

Vue.use(Vuex);
const ipfsRoom = new RoomPlugin(config.ipfs);

Vue.use(ipfsRoom);

const store = new Vuex.Store({
  state: {
    title: "photo viewer 2000",
    photos: [],
    currentView: "AllPhotos",
    selectedPhoto: null,
  },
  mutations: {
    increment(state) {
      state.count++;
    },
    gohome(state) {
      console.log("vuex gohome");
      state.currentView = "AllPhotos";
    },
    singlePhoto(state, photo) {
      state.currentView = "SinglePhoto";
      state.selectedPhoto = photo;
    },
  },
});

const app = new Vue({
  el: "#app",
  store,
  render: (h) => h(App),
});

// roomManager(config.ipfs);