<template>
  <div id="dapp">
    <h1> {{$store.state.title}} </h1>
    <div class="debug">{{$store.state}}</div>

    <div class="inputBox">
      <label class="inputLabel">
        <i class="fa fa-cloud-upload"></i> select file
        <input id="fileInput" type="file" accept="audio/*" />
      </label>
      <audio id="audioElement"></audio>
    </div>
  </div>
</template>

<script>
import './audio/Odesza-Above_The_Middle.mp3';
import './style.css';

export default {
  name: "App",
  components: {},
  created() {
    const audioElement = document.getElementById('audioElement');
    audioElement.src = "./audio/Odesza-Above_The_Middle.mp3";
    audioElement.controls = true;
    audioElement.volume = 0.7; //don't destroy your speakers bro

    // TODO: start creating simple form that enables messaging
  },
  methods: {}
};
</script>

<style>
#app {
  text-align: center;
}
</style>
