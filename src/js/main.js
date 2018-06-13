var cl = console.log.bind(console);
cl("online!");
var mainDiv = $('main');

var request = new Requester('', '');
//get all from DB
request.get('playlist')
    .done((response) => {
        console.log('success', response.data);
        mainDiv.empty();
        response.data.forEach(playlist => {
            var playlistDiv = new Playlist(playlist);
            playlistDiv.build();
        });
        response.data.forEach(playlist => {
            var playlistDiv = new Playlist(playlist);
            playlistDiv.build();
        });
        response.data.forEach(playlist => {
            var playlistDiv = new Playlist(playlist);
            playlistDiv.build();
        });
        response.data.forEach(playlist => {
            var playlistDiv = new Playlist(playlist);
            playlistDiv.build();
        });
    })
    .fail(function(xhr) {
        console.log('error', xhr);
        mainDiv.empty();
        mainDiv.append(
            $('<div>', {
                text: 'Error occured fetching playlist. 😓',
                class: 'alert-info'
            }).css({
                'padding': '15px',
                'border-radius': '3px'
            })
        );
    });

$('*.playlist-name').arctext({
    radius: 170,
    dir: 1
});