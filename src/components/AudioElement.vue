<template>
  <audio
    id="audioElement"
    :src="$store.state.audioSrc"
    :paused="$store.state.audioPaused"
    :volume="$store.state.audioVolume"
    controls=true
    @canplaythrough="$store.dispatch('broadcastAudioStatus', 'canPlayThrough')"
    @play="$store.dispatch('broadcastPlay')"
    @pause="$store.dispatch('broadcastPause')"
  >
  </audio>
</template>

<script>
export default {
  name: "AudioElement",
  methods: {
    log: function(line) {
      const output = document.getElementById("progress-output");
      let message;

      if (line.message) {
        message = `Error: ${line.message.toString()}`;
      } else {
        message = line;
      }

      if (message) {
        const node = document.createTextNode(`${message}\r\n`);
        output.appendChild(node);
        output.scrollTop = output.offsetHeight;
        console.log(message);
        return node;
      }
    },

    loadFile: function(event, options = {}) {
      const file = event.target.files[0];
      if (!file) throw Error("no file chosen");

      const audioEl = document.getElementById("audioElement");
      const progress = this.log(`IPFS: Adding ${file.name} 0%`);
      const reader = new window.FileReader();

      reader.onload = event => {
        this.$ipfs.files
          .add(
            {
              path: file.name,
              content: this.$ipfs.types.Buffer.from(event.target.result)
            },
            {
              progress: addedBytes => {
                progress.textContent = `IPFS: Adding ${file.name} ${parseInt(
                  (addedBytes / file.size) * 100
                )}%\r\n`;
                this.log(progress.textContent);
              }
            }
          )
          .then(added => {
            const hash = added[0].hash;
            // this.$orbit.put("audio", {src: $store.state.audioSrc})
            this.log(`IPFS: Added ${hash}`);

            // if audioEl.readyState = HAVE_ENOUGH_DATA	4

            // NOTE: dead, but possibly useful ideas:
            // const file = new Blob([added], { type: 'application/octet-stream' });
            // const fileURL = URL.createObjectURL(file);
            // console.this.log(fileURL);
            // window.open(fileURL);
            // window.open(added[0].path);

            const audioSrcUrl = `https://ipfs.io/ipfs/${added[0].hash}`;
            this.log(`sourceUrl: audioSrcUrl`);

            return audioSrcUrl;
          })
          .then(audioSrcUrl => {
            this.$store.dispatch("broadcastAudioSrc", audioSrcUrl);
          });
      };

      reader.readAsArrayBuffer(file);
    }
  }
};
</script>

<style>
</style>