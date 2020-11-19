<template>
  <div class="debug">
    <div class="inputBox">
      <label class="inputLabel">
        <i class="fa fa-cloud-upload" /> select file
        <input
          id="fileInput"
          type="file"
          accept="audio/*"
          @change="loadFile($event)"
        />
        <!-- @change="$store.dispatch('broadcastAudioSrc', $event)" -->
      </label>
    </div>

    <div class="debug-box">
      <h2>peers:</h2>
      <div>{{ $store.state.peers }}</div>
      <h2>audio url:</h2>
      <div>{{ $store.state.audioSrc || 'n/a' }}</div>
      <h2>status:</h2>
      <div id="progress-output">{{ $store.state.log }}</div>
    </div>

    <div class="inputBox">
      <h2>controls:</h2>
      <AudioElement />
    </div>
    <Visualizations v-if="audioCanPlay" />
  </div>
</template>

<script>
export default {
  name: 'debug',
  created() {
    // do nothing for now
  },
  methods: {
    log: function (line) {
      let message

      if (line.message) {
        message = `Error: ${line.message.toString()}`
      } else {
        message = line
      }

      this.$store.dispatch('log', message)
    },

    loadFile: function (event, options = {}) {
      const file = event.target.files[0]
      if (!file) throw Error('no file chosen')

      const audioEl = document.getElementById('audioElement')
      const progress = this.log(`IPFS: Adding ${file.name} 0%`)
      const reader = new window.FileReader()

      reader.onload = (event) => {
        const fileObject = {
          path: file.name,
          content: Buffer.from(event.target.result),
        }
        const options = {
          progress: (addedBytes) => {
            const progressText = `IPFS: Adding ${file.name} ${parseInt(
              (addedBytes / file.size) * 100
            )}%\r\n`
            this.log(progressText)
          },
        }

        this.$ipfs
          .add(fileObject, options)
          .then((added) => {
            const cid = added.cid.string
            // this.$orbit.put("audio", {src: $store.state.audioSrc})
            this.log(`IPFS: Added ${cid}`)

            // if audioEl.readyState = HAVE_ENOUGH_DATA	4

            // NOTE: dead, but possibly useful ideas:
            // const file = new Blob([added], { type: 'application/octet-stream' });
            // const fileURL = URL.createObjectURL(file);
            // console.this.log(fileURL);
            // window.open(fileURL);
            // window.open(added.path);

            const audioSrcUrl = `https://ipfs.io/ipfs/${cid}`
            this.log(`url generated, propagating through network...`)

            return audioSrcUrl
          })
          .then((audioSrcUrl) => {
            this.$store.dispatch('broadcastAudioSrc', audioSrcUrl)
          })
      }

      reader.readAsArrayBuffer(file)
    },
  },
  computed: {
    audioCanPlay: function () {
      return this.$store.state.audioStatus==="canPlayThrough"
    },
  },
}
</script>

<style>
.debug {
  height: 100%;
}
#app {
  text-align: center;
}
</style>
