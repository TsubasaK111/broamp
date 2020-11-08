class AudioSource{
  // contains only logic and interfaces pertaining to AudioContext and it's analyzer.
  // will NOT contain any logic pertaining to visualization.
  constructor(options={}){
    // reflect options
    this.options = options;
    this.smoothing = options.smoothing || 0.0;
    this.fft_size = options.fft_size || 1024;
    // this.sampleSize = options.sampleSize || 512;
    this.decRange = options.decRange || [-100, -30];

    // setup audio context and analyzer
    this.context = new (window.AudioContext || window.webkitAudioContext)();
    this.analyser = this.context.createAnalyser();
    this.volume = this.context.createGain();
    
    // connect audio source
    const audioElement = document.getElementById('audioElement');
    const audioSrc = this.context.createMediaElementSource(audioElement);
    // Connect the output of the source to the input of the analyser
    audioSrc.connect(this.analyser);
    // Connect the output of the analyser to the destination
    audioSrc.connect(this.context.destination);
    
    // mute the sound
    // this.volume.gain.value = 0;
    
    this.analyser.minDecibels = this.decRange[0];
    this.analyser.maxDecibels = this.decRange[1];
    this.analyser.smoothingTimeConstant = this.smoothing;
    this.analyser.fftSize = this.fft_size;
    
    this.freqs = new Uint8Array(this.analyser.frequencyBinCount);
    this.data = [];

    this.isPlaying = false;
    this.isLoaded = false;
    this.startTime = 0;
    // this.startOffset = 0;
    this.count = 0;
    this.curSec = 0;
    this.maxCount = 0;
  }
}

export default AudioSource;