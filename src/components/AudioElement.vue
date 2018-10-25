<template>
  <audio
    id="audioElement"
    :src="$store.state.audioSrc"
    :paused="$store.state.audioPaused"
    :volume="$store.state.audioVolume"
    :currentTime="$store.state.currentTime"
    controls=true
    @canplaythrough="$store.dispatch('broadcastAudioStatus', 'canPlayThrough')"
    @waiting="$store.dispatch('broadcastAudioStatus', 'waiting')"
    @playing="$store.dispatch('broadcastAudioStatus', 'playing')"
    @emptied="$store.dispatch('broadcastAudioStatus', 'emptied')"
    @play="play()"
    @pause="pause()"
  >
  <!-- crossOrigin="anonymous" -->
  <!-- TODO: broadCastAudioStatus needs to be made irrelevant. -->
  </audio>
</template>

<script>
export default {
  name: "AudioElement",
  methods: {
    play: function(){
      this.$store.dispatch('broadcastAudioPlay');
    },
    pause: function(){
      this.$store.dispatch('broadcastAudioPause');
    }
  }
};
</script>

<style>
</style>