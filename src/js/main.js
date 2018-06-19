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
var angle = document.getElementsByClassName('playlist-name')[0].offsetWidth
for (let index = 0; index < document.getElementsByClassName('playlist-name').length; index++) {
    new CircleType(document.getElementsByClassName('playlist-name')[index]).radius(angle / 1.5);
}

window.addEventListener('resize', () => {
    for (let index = 0; index < document.getElementsByClassName('playlist-name').length; index++) {
        new CircleType(document.getElementsByClassName('playlist-name')[index]).radius(angle / 1.5);
    }
});