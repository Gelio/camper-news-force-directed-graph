var url = require('url');

module.exports = function(data) {
    var returned = {
        domains: {},
        users: {}
    };

    data.forEach(function(post) {
        var parsed = url.parse(post.link);
        returned.domains[parsed.hostname] = true;

        if(!returned.users[post.author.username])
            returned.users[post.author.username] = {
                picture: post.author.picture,
                linkedTo: {}
            };

        returned.users[post.author.username].linkedTo[parsed.hostname] = true;
    });

    return returned;
};