<template>
  <div id="dapp">
    <h1> {{$store.state.title}} </h1>
    <div class="debug">{{$store.state.peers}}</div>
    <div class="debug">{{$store.state.audioSrc}}</div>

    <div class="inputBox">
      <label class="inputLabel">
        <i class="fa fa-cloud-upload"></i> select file
        <input id="fileInput" type="file" accept="audio/*" @change="loadFile($event)"/>
      </label>
      <audio
        id="audioElement"
        :src="$store.state.audioSrc"
        controls=true
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
    // console.log(this.$ipfs);
    // const audioElement = document.getElementById('audioElement');
    // audioElement.volume = 0.7; //don't destroy your speakers bro
    // TODO: start creating simple form that enables messaging
  },
  methods: {
    loadFile: function(event, options = {}) {
      const audioFile = event.target.files[0];
      if (!audioFile) throw Error("no file chosen");

      const audioEl = document.getElementById("audioElement");

      // listen for event
      const fr = new FileReader();
      fr.onload = event => {
        const newAudioSrc = event.target.result;
        saveToIpfs(fr);
        // this.$store.commit("changeAudioSrc", newAudioSrc);
      };

      // trigger event
      fr.readAsDataURL(audioFile);

      const saveToIpfs = reader => {
        let ipfsId;
        const buffer = Buffer.from(reader.result);
        this.$ipfs.files.add(buffer)
        .then(files => {
          const audioSrcUrl = `https://ipfs.io/ipfs/${files[0].path}`
          console.log(audioSrcUrl)
          this.$store.commit("changeAudioSrc", audioSrcUrl);
          // room.sendTo(peer, files);
        })
        .catch(error => {
          console.log(error);
        });
      };
    }
  }
};
</script>

<style>
#app {
  text-align: center;
}
</style>
