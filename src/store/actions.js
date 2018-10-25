// var Sntp = require('sntp');

export const actions = {
  // syncClock(store) {
  //   // All options are optional

  //   var options = {
  //     host: 'nist1-sj.ustiming.org',  // Defaults to pool.ntp.org
  //     port: 123,                      // Defaults to 123 (NTP)
  //     resolveReference: true,         // Default to false (not resolving)
  //     timeout: 1000                   // Defaults to zero (no timeout)
  //   };

  //   // Request server time
  //   Sntp.time(options, function (err, time) {
  //     if (err) {
  //       console.log('Failed: ' + err.message);
  //       process.exit(1);
  //     }

  //     console.log('Local clock is off by: ' + time.t + ' milliseconds');
  //     process.exit(0);
  //   });
  // },
  recieveAudioSrc(store, newAudioSrc) {
    // loadFile(event);
    store.commit("recieveAudioSrc", newAudioSrc);
  },
  recieveAudioStatus(store, newGroupAudioStatus) {
    store.commit("recieveAudioStatus", newGroupAudioStatus);
  },
  recieveAudioPlay(store) {
    const audioEl = document.getElementById("audioElement");
    audioEl.play();
    store.commit("recieveAudioPlay");
    // .fastSeek()
  },
  recieveAudioPause(store) {
    const audioEl = document.getElementById("audioElement");
    audioEl.pause();
    store.commit("recieveAudioPause");
    // .fastSeek()
  },

  // NOTE: additional actions take place in OrbitDbVuexPlugin
  broadcastAudioSrc(store, newAudioSrc) {
    // loadFile(event);
    store.commit("broadcastAudioSrc", newAudioSrc);
  },
  broadcastAudioStatus(store, newAudioStatus) {
    store.commit("broadcastAudioStatus", newAudioStatus);
  },
  broadcastAudioPlay(store) {
    store.commit("broadcastAudioPlay");
    
  },
  broadcastAudioPause(store) {
    store.commit("broadcastAudioPause");
  },
}

export const makeActions = (db) => {
  console.log("db:", db);
  return actions;
};