var cl = console.log.bind(console);
cl("online");

var request = new Requester(
    'GET',
    'http://localhost/playerAPI/api/playlist/2/songs'
);
cl(request.get());

$('.carousel').carousel()