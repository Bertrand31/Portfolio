var fs  = require('fs');

exports.getJSON = function(target, callback) {
    fs.readFile(__dirname + '/content/' + target + '.json', 'utf8', function(err, data) {
        if (err) throw err;
        callback(JSON.parse(data));
    });
};
