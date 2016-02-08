var config = {
    width: 700,
    height: 700,
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
    },
    minRadius: 4,
    radiusMultiplier: 3,
    imageSize: 26
};

module.exports = config;

config.imageSizeHalved = config.imageSize/2;