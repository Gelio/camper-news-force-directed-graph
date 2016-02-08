var config = {
    width: 900,
    height: 600,
    dataURL: 'http://www.freecodecamp.com/news/hot',
    forceLayout: {
        linkStrength: 0.3,
        friction: 0.9,
        linkDistance: 60,
        charge: -30,
        gravity: 0.04,
        theta: 0.8,
        alpha: 0.1
    },
    tooltipOffset: {
        top: 20,
        left: 20
    }
};

module.exports = config;