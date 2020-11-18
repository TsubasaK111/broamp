const loadFile = (event, options = {}) => {
  const audioFile = event.target.files[0];

  if (!audioFile) throw Error("no file chosen");

  const audioEl = document.getElementById("audioElement");

  // listen for event
  const fr = new FileReader();
  fr.onload = (event) => { audioEl.src = event.target.result; };

  // trigger event
  fr.readAsDataURL(audioFile);

  // TODO: jesus christ this is terrible.
  // return event.target.result directly plz.
  const audioSource = document.getElementById("audioElement").src;
}

export default loadFile;