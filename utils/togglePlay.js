const togglePlay = (event) => {
  const buttonEl = event.target;
  const audioEl = document.getElementById("audioElement");
  
  if (audioEl.paused) {
    buttonEl.textContent = "⏸";
    audioEl.play()
  } else {
    buttonEl.textContent = "▶️";
    audioEl.pause();
  }
};

export default togglePlay;