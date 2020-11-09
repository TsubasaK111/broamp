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
      <h2>audioSrc:</h2>
      <div>{{ $store.state.audioSrc }}</div>
      <h2>progress:</h2>
      <div id="progress-output"></div>
    </div>

    <div class="inputBox">
      <h2>controls:</h2>
      <AudioElement />
    </div>
    <Visualizations />
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
      const output = document.getElementById('progress-output')
      let message

      if (line.message) {
        message = `Error: ${line.message.toString()}`
      } else {
        message = line
      }

      if (message) {
        const node = document.createTextNode(`${message}\r\n`)
        output.appendChild(node)
        output.scrollTop = output.offsetHeight
        console.log(message)
        return node
      }
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
            progress.textContent = `IPFS: Adding ${file.name} ${parseInt(
              (addedBytes / file.size) * 100
            )}%\r\n`
            this.log(progress.textContent)
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
            this.log(`audioSrcUrl: ${audioSrcUrl}`)

            return audioSrcUrl
          })
          .then((audioSrcUrl) => {
            this.$store.dispatch('broadcastAudioSrc', audioSrcUrl)
          })
      }

      reader.readAsArrayBuffer(file)
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
