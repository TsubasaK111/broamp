<template>
  <div id="dapp">
    <h1> {{$store.state.title}} </h1>
    <div class="debug">{{$store.state.peers}}</div>
    <div class="debug">{{$store.state.audioSrc}}</div>

    <div id="output"></div>

    <div class="inputBox">
      <label class="inputLabel">
        <i class="fa fa-cloud-upload"></i> select file
        <input id="fileInput" type="file" accept="audio/*" @change="loadFile($event)"/>
      </label>
      <audio
        id="audioElement"
        :src="$store.state.audioSrc"
        controls=true
        volume="0.7"
      ></audio>
    </div>
  </div>
</template>

<script>
import "./style.css";

export default {
  name: "App",
  components: {},
  created() {
    // do nothing for now
  },
  methods: {
    loadFile: function(event, options = {}) {
      const log = line => {
        const output = document.getElementById("output");
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
      };

      const file = event.target.files[0];
      if (!file) throw Error("no file chosen");

      const audioEl = document.getElementById("audioElement");

      const progress = log(`IPFS: Adding ${file.name} 0%`);

      const reader = new window.FileReader();

      console.log(event.target.result);
      console.log(event.target);

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
                  addedBytes / file.size * 100
                )}%\r\n`;
                console.log(progress.textContent);
              }
            }
          )
          .then(added => {
            console.log(added);
            const hash = added[0].hash;
            log(`IPFS: Added ${hash}`);
            console.log(added[0]);

            // NOTE: dead, but possibly useful ideas:
            // const file = new Blob([added], { type: 'application/octet-stream' });
            // const fileURL = URL.createObjectURL(file);
            // console.log(fileURL);
            // window.open(fileURL);
            // window.open(added[0].path);

            const audioSrcUrl = `https://ipfs.io/ipfs/${added[0].hash}`;
            log(`sourceUrl: audioSrcUrl`);

            return audioSrcUrl;
          })
          .then(audioSrcUrl => {
            this.$store.commit("changeAudioSrc", audioSrcUrl);
          })
      };

      reader.readAsArrayBuffer(file);
    }
  }
};
</script>

<style>
#app {
  text-align: center;
}
</style>
