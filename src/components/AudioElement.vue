<template>
  <audio
    id="audioElement"
    :src="$store.state.audioSrc"
    :paused="$store.state.audioPaused"
    :volume="$store.state.audioVolume"
    :currentTime="$store.state.currentTime"
    controls=true
    @canplaythrough="$store.dispatch('broadcastAudioStatus', 'canPlayThrough')"
    @play="play()"
    @pause="pause()"
  >
  <!-- TODO: broadCastAudioStatus needs to be made irrelevant. -->
  </audio>
</template>

<script>
export default {
  name: "AudioElement",
  methods: {
    play: function(){
      this.$store.dispatch('boradcastAudioPlay');
    },
    pause: function(){
      this.$store.dispatch('boradcastAudioPause');
    }
  }
};
</script>

<style>
</style>