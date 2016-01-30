// DEPENDENCIES
var express     = require('express'),
    app         = express(),
    http        = require('http').Server(app),
    io          = require('socket.io')(http),
    compression = require('compression');

// HTML
var jade        = require('jade');

// DATABASE
var db = require('./db.js');

// EXPRESS
// CONFIGURATION
app.use(compression());
app.set('views', __dirname + '/templates');
app.set('view engine', 'jade');
app.engine('jade', require('jade').__express);

// ROUTES
// Static files
app.use('/', express.static(__dirname + '/library/built', { maxAge: 86400 }));
// Homepage
app.get('/', function(req, res) { res.render('index'); });

io.sockets.on('connection', function(socket) {

    var contact = jade.compileFile('./templates/contact.jade');
    socket.emit('content', contact());

});

http.listen(8080);
