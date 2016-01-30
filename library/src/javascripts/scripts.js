var socket = io.connect();

socket.on('content', function(data) {
    console.log(data);
    $('body').append(data);
});
