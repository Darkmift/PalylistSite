var cl = console.log.bind(console);
cl("online baby!");

var request = new Requester(
    'GET',
    'http://www.avisiteapi.tk/playerAPI/api/'
);
cl(request.get());

$('.carousel').carousel()