<template>
  <div class="visBox">
    <div id="spectrogramVis"></div>
    <div id="verticalFrequencyVis"></div>
  </div>
</template>

<script>
import AudioSource from "../utils/audioSource";
import VerticalFrequencyVis from "../visualizations/verticalFrequencyVis";
import DynamicSpectrogram from "../visualizations/dynamicSpectrogram";

export default {
  name: "Description",
  methods: {
  }
};
document.addEventListener("DOMContentLoaded", () => {
  const audioElement = document.getElementById("audioElement");

  const audioSource = new AudioSource();
  new VerticalFrequencyVis(audioSource.analyser);
  new DynamicSpectrogram(audioSource, audioElement);
  // gkheadCanvas();
});
</script>

<style>
</style>