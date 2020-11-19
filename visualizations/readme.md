# ![broamp logo](./src/images/pong.svg) broamp

A  music visualization and sharing app for bros!  
(because winamp is dead)

## Getting Started
- Brosef, check out the live page [here](https://bro-amp.herokuapp.com).
- Dude hit the play button at the bottom,  
  and my fave tunes will play and display.
- Bro chill if you don't dig, choose your own tunes from the top right button.
- You're welcome brodette!

![](./src/images/demo.gif)

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
- To get started, do the following:
  - `git clone` this repo
  - `yarn`
  - `yarn hack`
      
## Disclaimer
*By bros, we mean to address all users and contributors in a familial manner.*  
*You are like family to us.*  
*We do not welcome toxic masculinity in our community.*  