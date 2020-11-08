import chroma from "chroma-js";
import * as d3 from "d3";

class DynamicSpectrogram {
  constructor(audioSource, audioElement, options = {}) {
    this.audioElement = audioElement;
    this.audioContext = audioSource.context;
    this.analyser = audioSource.analyser;
    this.height = options.height || '512';
    this.width = options.width || '600';
    this.horizScrollRate = options.horizScrollRate || 1;
    this.chromaScale = options.chromaScale || 
      new chroma
      .scale([[0,0,0,1], [0,255,255,1], [0,255,0,1], [255,255,0,1], [ 255,0,0,1]])
      .domain([0, 45, 90, 150, 225])
      .mode('rgb');

    // get the context from the canvas to draw on
    this.d3Canvas = d3.select('#spectrogramVis')
      .append('canvas')
      .attr("id", "spectrogramCanvas")
      .attr('width', this.width)
      .attr('height', this.height)
      .style("background-color", this.chromaScale(0));

    this.canvasContext = this.d3Canvas.node().getContext("2d");

    // create a temp canvas that we will use for copying
    this.tempCanvas = document.createElement("canvas");
    this.tempContext = this.tempCanvas.getContext("2d");
    this.tempCanvas.width = this.width;
    this.tempCanvas.height = this.height;

    this.setupAudioProcessor();

    this.analyser.connect(this.audioProcessor);

    this.loadSound(this.audioElement.src);
  }

  setupAudioProcessor() {
    // setup a javascript node
    this.audioProcessor = this.audioContext.createScriptProcessor(2048, 1, 1);
    // connect to destination, else it isn't called
    this.audioProcessor.connect(this.audioContext.destination);

    // when javascript node is called, 
    // use information from analyzer node to draw volume
    this.audioProcessor.onaudioprocess = () => {
      // get the average for the first channel
      const frequencyData = new Uint8Array(this.analyser.frequencyBinCount);
      this.analyser.getByteFrequencyData(frequencyData);

      // draw the spectrogram
      if (this.audioElement.playbackState == this.audioElement.PLAYING_STATE) {
        this.drawSpectrogram(frequencyData);
      }
    }
  }
  // load the specified sound
  loadSound(url) {
    const request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';

    // When loaded decode the data
    request.onload = () => {
      // decode the data
      this.audioContext.decodeAudioData(request.response, (buffer) => {
        // TODO: when the audio is decoded play the sound
      }, (error) => console.log(error));
    }

    request.send();
  }

  drawSpectrogram(frequencyData) {
    // copy the current canvas onto the temp canvas
    const canvas = document.getElementById("spectrogramCanvas");

    this.tempContext.drawImage(canvas, 0, 0, this.width, this.height);

    frequencyData.forEach((value, i) => {
      // draw each pixel with the specific color
      this.canvasContext.fillStyle = this.chromaScale(value);
      // draw the line at the right side of the canvas
      this.canvasContext.fillRect(this.width - this.horizScrollRate, this.height - i, this.horizScrollRate, 1);
    });

    // set translate on the canvas
    this.canvasContext.translate(-this.horizScrollRate, 0);
    // draw the copied image
    this.canvasContext.drawImage(this.tempCanvas, 0, 0, this.width, this.height, 0, 0, this.width, this.height);
    // reset the transformation matrix
    this.canvasContext.setTransform(1, 0, 0, 1, 0, 0);
  }
}

export default DynamicSpectrogram;