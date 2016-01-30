var socket = io.connect();

socket.on('ready', function() {
    console.log('Socket.io connected');
});
