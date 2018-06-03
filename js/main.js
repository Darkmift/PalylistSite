var cl = console.log.bind(console);
cl("online");

var request = new Requester(
    'GET',
    'http://localhost/playlistAPI/api/playlist'
);
cl(request.get().data);