# Broamp Visualizations

Music visualization for bros!  
(because winamp is dead)

## Developer Usage
- broamp is written in ES6 classes, and is highly modular.
- A spectrogram and frequency graph are currently available as visualizers:
  - DynamicSpectrogram
    - inputs: 
      - `audioSource`: expected to be a object with a preconfigured `.context` and `.analyzer` from the native `AudioContext` class and it's `createAnalyser`.
      - `audioElement`: any `Node` or `Element` with a playable `source`.  
        `AudioElement` is recommended.
      - `options`: *optional*. Accepts an object with the following params:  
        - `height`: visualizer svg element height.
        - `width`: visualizer svg element width.
        - `chromaScale`: Accepts `chroma-js` `scale`s. Put in your color scale of choice.
        - `horizScrollRate`: the rate at which the spectrogram scrolls rightward.
  - `VerticalFrequencyVis`
    - inputs:
      - `analyzer`: A preconfigured `AudioContext` class's `createAnalyser`.
      - `options`: *optional*. Accepts an object with the following params:  
        - `height`: visualizer svg element height.
        - `width`: visualizer svg element width.
        - `chromaScale`: Accepts `chroma-js` `scale`s. Put in your color scale of choice.