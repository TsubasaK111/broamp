<template>
  <audio
    id="audioElement"
    :src="$store.state.audioSrc"
    :paused="$store.state.audioPaused"
    :volume="$store.state.audioVolume"
    @canplaythrough="$store.dispatch('broadcastAudioStatus', 'canPlayThrough')"
    @play="$store.dispatch('broadcastPlay')"
    @pause="$store.dispatch('broadcastPause')"
    controls="true"
    preload="auto"
    crossorigin="anonymous"
  ></audio>
</template>

<script>
export default {
  name: 'AudioElement',
  methods: {},
}
</script>

<style></style>
