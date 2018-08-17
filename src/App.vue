<template>
  <div id="dapp">
    <h1> {{$store.state.title}} </h1>
    <div class="debug">{{$store.state}}</div>
  </div>
</template>

<script>
import Vue from 'Vue';

export default {
  name: "App",
  components: {

  },
  created() {
    // TODO: start creating simple form that enables messaging

  },
  methods: {

  }
};
</script>

<style>
#app {
  text-align: center;
}
</style>
