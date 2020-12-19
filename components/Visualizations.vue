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
    // TODO: AudioElement and Visualizations components are too interlinked.
    // Design a way to decouple them.
    
    const audioElement = document.getElementById('audioElement')

    const audioSource = new AudioSource()

    new VerticalFrequencyVis(audioSource.analyser)
    new DynamicSpectrogram(audioSource, audioElement)
    // gkheadCanvas()
  },
}
</script>

<style>
.visBox {
  display: flex; 
}
</style>
