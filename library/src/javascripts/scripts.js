var socket = io.connect();

function changePage(target) {
    socket.emit('getContent', target);
    var state = { 'title': target };
    window.history.pushState(state, target, '/page/' + target);
}

$('.get-content').click(function(e) {
    e.preventDefault();
    changePage($(this).attr('data-target'));
});

socket.on('content', function(data) {
    $('#main').html(data);
});
