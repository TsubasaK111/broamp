import chroma from "chroma-js";
import * as d3 from "d3";

class VerticalFrequencyVis {
  constructor(analyser, options = {}) {
    this.analyser = analyser;
    this.height = options.height || '512';
    this.width = options.width || '300';
    // prevent number of bars being more than height
    this.bars = options.bars ||
      this.height >= analyser.frequencyBinCount ?
      analyser.frequencyBinCount :
      300;
    // used for color distribution
    this.chromaScale = options.chromaScale ||
      new chroma
        .scale([[0, 0, 0, 1], [0, 255, 255, 1], [0, 255, 0, 1], [255, 255, 0, 1], [255, 0, 0, 1]])
        .domain([0, 45, 90, 150, 225])
        .mode('rgb');
    // declare number of bars
    this.frequencyData = new Uint8Array(this.bars);

    // initialize D3 chart space.
    this.svg = d3.select('#verticalFrequencyVis')
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .style("background-color", this.chromaScale(0));

    // create initial D3 chart.
    this.svg.selectAll('rect')
      .data(this.frequencyData)
      .enter()
      .append('rect')
      .attr('y', (d, i) => this.height - (i * (this.height / this.frequencyData.length)))
      .attr('height', (this.height / this.frequencyData.length));

    //since renderChart is a recursive class method, make static reference to class;
    this.renderChart = this.renderChart.bind(this);
    // Run loop
    this.renderChart();
  }

  renderChart() {
    // Continuously loop and update chart with frequency data.
    window.requestAnimationFrame(this.renderChart);

    // Copy frequency data to this.frequencyData array.
    this.analyser.getByteFrequencyData(this.frequencyData);

    // Update d3 chart with new data.
    this.svg.selectAll('rect')
      .data(this.frequencyData)
      // default is perfectly fine (x=0 aligns bars to left).
      // .attr('x', () => 0) 
      .attr('width', (d) => d)
      .attr('fill', (d) => this.chromaScale(d));
  }
};

export default VerticalFrequencyVis;