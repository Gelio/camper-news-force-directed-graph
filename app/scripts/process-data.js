var url = require('url');

module.exports = function(data) {
    var returned = {
        domains: [],
        users: [],
        links: []
    };

    data.forEach(function(post) {
        var parsed = url.parse(post.link),
            domainIndex = -1,
            userIndex = -1,
            linkExists = false;

        // Look for the domain
        returned.domains.forEach(function(domain, index) {
            if(domain === parsed.hostname)
                domainIndex = index;
        });

        // Add the domain
        if(domainIndex == -1) {
            domainIndex = returned.domains.length;
            returned.domains.push(parsed.hostname);
        }


        // Look for the author
        returned.users.forEach(function(user, index) {
            if(user.name === post.author.username)
                userIndex = index;
        });

        // Add the author
        if(userIndex == -1) {
            userIndex = returned.users.length;

            returned.users.push({
                name: post.author.username,
                picture: post.author.picture
            });
        }

        // Look for the link between them
        returned.links.forEach(function(link) {
            if(link.user === userIndex && link.domain === domainIndex)
                linkExists = true;
        });

        // Add the link
        if(!linkExists) {
            returned.links.push({
                user: userIndex,
                domain: domainIndex
            })
        }
    });

    return returned;
};