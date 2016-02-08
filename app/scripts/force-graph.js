var d3 = require('d3'),
    config = require('./config.js'),
    processData = require('./process-data.js');

module.exports = {
    prepareGraph: prepareGraph,
    drawData: drawData
};

function prepareGraph() {
    this.chart = d3.select('.chart')
        .attr('width', config.width)
        .attr('height', config.height);

    this.forceLayout = d3.layout.force()
        .size([
            config.size.x,
            config.size.y
        ]);
}

function drawData(data) {
    var processed = processData(data);

    // Add nodes and links
}