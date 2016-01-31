// DEPENDENCIES
var express     = require('express'),
    app         = express(),
    http        = require('http').Server(app),
    io          = require('socket.io')(http),
    compression = require('compression');

// HTML
var jade        = require('jade');

var generator   = require('./generator');

// EXPRESS
// CONFIGURATION
app.use(compression());
app.set('views', __dirname + '/templates');
app.set('view engine', 'jade');
app.engine('jade', require('jade').__express);

// TEMPLATES
var page    = jade.compileFile('./templates/page.jade'),
    content = jade.compileFile('./templates/content.jade');

// ROUTES
// Static files
app.use('/', express.static(__dirname + '/library/built', { maxAge: 86400 }));
// Homepage
app.get('/', function(req, res) {
    var pageContent = generator.getJSON('home', function(JSON) {
        res.send(page(JSON));
    });
});
// Pages
app.get('/:name', function(req, res) {
    var pageContent = generator.getJSON(req.params.name, function(JSON) {
        res.send(page(JSON));
    });
});

io.sockets.on('connection', function(socket) {

    socket.on('getContent', function(target) {
        // If 'target' is send blank, we send the homepage
        target = target ? target : 'home';
        var subContent = generator.getJSON(target, function(JSON) {
            socket.emit('content', content(JSON));
        });
    });

});

http.listen(8080);
