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
            config.width,
            config.height
        ]);
}

function drawData(data) {
    var processed = processData(data),
        nodes = [],
        links = [];

    processed.domains.forEach(function(domain, index) {
        nodes.push({
            index: index
        });
    });

    processed.users.forEach(function(user, index) {
        nodes.push({
            index: index
        })
    });

    processed.links.forEach(function(link) {
        links.push({
            source: link.domain,
            target: processed.domains.length + link.user
        });
    });

    this.forceLayout
        .nodes(nodes)
        .links(links)
        .start();

    var node = this.chart.selectAll('.node')
        .data(nodes)
        .enter()
        .append('circle')
        .attr('class', 'node')
        .attr('cx', function(d) { return d.x; })
        .attr('cy', function(d) { return d.y; })
        .attr('r', function(d) { return d.weight; });

    var link = this.chart.selectAll('.link')
        .data(links)
        .enter()
        .append('line')
        .attr('class', 'link')
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });
}