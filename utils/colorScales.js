const greyScale = (steps = 275) => {
  const frequency = Math.PI / steps;
  const amplitude = 127;
  const center = 128;
  const slice = (Math.PI / 2) * 3.1;
  let colors = [];

  const toRGBString = (v) => {
    return 'rgba(' + [v, v, v, 1].toString() + ')';
  }

  for (var i = 0; i < steps; i++) {
    var v = (Math.sin((frequency * i) + slice) * amplitude + center) >> 0;

    colors.push(toRGBString(v));
  }

  return colors;
};

const rainbows = (steps = 275) => {
  const baseColors = [[0,0,255,1], [0,255,255,1], [0,255,0,1], [255,255,0,1], [ 255,0,0,1]];
  const positions = [0, 0.15, 0.30, 0.50, 0.75];

  var scale = new chroma
    .scale(baseColors, positions)
    .domain([0, steps]);

  var colors = [];

  for (var i = 0; i < steps; ++i) {
    var color = scale(i);
    colors.push(color.hex());
  }
  return colors;
}

export default greyScale;