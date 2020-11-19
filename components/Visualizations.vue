<template>
  <div class="visBox">
    <div id="spectrogramVis"></div>
    <div id="verticalFrequencyVis"></div>
    <div id="gkheadCanvas"></div>
  </div>
</template>

<script>
import AudioSource from '../utils/audioSource'
import VerticalFrequencyVis from '../visualizations/verticalFrequencyVis'
import DynamicSpectrogram from '../visualizations/dynamicSpectrogram'
import gkheadCanvas from '../utils/gkheadCanvas'

export default {
  name: 'Visualizations',
  mounted() {
    document.addEventListener('DOMContentLoaded', () => {
      const audioElement = document.getElementById('audioElement')

      console.log('audioElement', audioElement)
      const audioSource = new AudioSource()
      new VerticalFrequencyVis(audioSource.analyser)
      new DynamicSpectrogram(audioSource, audioElement)
      gkheadCanvas()
    })
  },
}
</script>

<style>
.visBox {
  display: flex; 
}
</style>
