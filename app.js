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
app.use(express.static(__dirname + '/library/built', { maxAge: 86400 }));
// Pages
app.get('/', function(req, res) {
    var target = 'home';
    generator.getJSON(target, function(JSON) {
        res.send(page(JSON));
    });
});
app.get('/page/:name*?', function(req, res) {
    var target = req.params.name;
    generator.getJSON(target, function(JSON) {
        res.send(page(JSON));
    });
});
// 404
app.use(function(req, res, next) {
      res.status(404).render('404');
});

io.sockets.on('connection', function(socket) {

    socket.on('getContent', function(target) {
        // If 'target' is sent blank, we send the homepage
        target = target ? target : 'home';
        var subContent = generator.getJSON(target, function(JSON) {
            socket.emit('content', content(JSON));
        });
    });

});

http.listen(8080);
