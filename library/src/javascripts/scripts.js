var socket = io.connect();

$('.get-content').click(function(e) {
    e.preventDefault();
    socket.emit('getContent', $(this).attr('data-target'));
});

socket.on('content', function(data) {
    console.log(data);
    $('body').append(data);
});
