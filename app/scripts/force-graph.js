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

    // Configure force layout
    this.forceLayout = d3.layout.force()
        .size([
            config.width,
            config.height
        ])
        .linkStrength(config.forceLayout.linkStrength)
        .friction(config.forceLayout.friction)
        .linkDistance(config.forceLayout.linkDistance)
        .charge(config.forceLayout.charge)
        .gravity(config.forceLayout.gravity)
        .theta(config.forceLayout.theta)
        .alpha(config.forceLayout.alpha);
}

function drawData(data) {
    var processed = processData(data),
        nodes = [],
        links = [];

    processed.domains.forEach(function(domain, index) {
        nodes.push({
            index: index,
            domain: domain
        });
    });

    processed.users.forEach(function(user, index) {
        nodes.push({
            index: index,
            user: user
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

    var link = this.chart.selectAll('.link')
        .data(links).enter()
        .append('line')
        .attr('class', 'link');

    var node = this.chart.selectAll('.node')
        .data(nodes).enter()
        .append('circle')
        .attr('class', 'node')
        .attr('r', function(d) { return Math.max(d.weight * 3, 4); })
        .attr('fill', function(d) { return (d.domain ? 'blue' : 'red'); })
        .call(this.forceLayout.drag);

    node.on('mousemove', displayTooltip.bind(this));
    node.on('mouseout', hideTooltip.bind(this));
    this.tooltip = d3.select('.chart-tooltip');

    this.forceLayout.on('tick', forceTick(node, link));
}

function forceTick(node, link) {
    // Update lines and nodes
    return function() {
        link.attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });

        node.attr('cx', function(d) { return d.x; })
            .attr('cy', function(d) { return d.y; })
    }
}

function displayTooltip(d) {
    this.tooltip.classed('visible', true);
    this.tooltip.style({
        top: d3.event.clientY + config.tooltipOffset.top + 'px',
        left: d3.event.clientX + config.tooltipOffset.left + 'px'
    });

    if(d.domain) {
        // Mousing over a domain
        this.tooltip.text(d.domain);
    }
    else {
        // Mousing over a user
        this.tooltip.text(d.user.name);
    }
}

function hideTooltip() {
    this.tooltip.classed('visible', false);
}