var d3 = require('d3'),
    config = require('./config.js'),
    forceGraph = require('./force-graph.js');

window.addEventListener('load', init);

function init() {
    document.querySelector('.copyright-year').innerText = String((new Date()).getFullYear());

    d3.json(config.dataURL, processResponse);
    forceGraph.prepareGraph();
}

function processResponse(err, data) {
    if(err)
        return downloadError(err);

    forceGraph.drawData(data);
}

function downloadError(err) {
    console.error('Error while downloading data from ' + config.dataURL, err);
    var errorInfo = document.createElement('div'),
        chartWrapper = document.querySelector('.chart-wrapper');
    errorInfo.className = 'alert alert-danger';
    errorInfo.setAttribute('role', 'alert');
    errorInfo.innerHTML = '<strong>Error!</strong> There\'s been an error while downloading data. Please, try again later.';

    chartWrapper.innerHTML = '';
    chartWrapper.appendChild(errorInfo);
}