// GLOBAL VARIABLES //
var songCounter = 0;
var url = 'playlist/api/playlist';
var playlistContainer = $('#playlist-container');
var player = $('#player');


// INIT COMMANDS //
$(function() {
    $('#player-modal').modal({
        keyboard: false,
        show: false,
        backdrop: 'static'
    })

    addSongInput($('#song-inputs'));
    removeLastSongInput($('#song-inputs'));
    loadPlaylist('all');
});

// Adds another line of song inputs to new playlist form
function addSongInput(element) {
    element.append($('<div>').data('id', songCounter++).css('margin-top', '5px')
        .addClass('form-row').append($('<div>').addClass('col-4').append(
                $('<input>').attr({
                    class: 'form-control',
                    type: 'text',
                }).on('change', function() {
                    nameValidation($(this), 'Song');
                    validateSendButton($('#input-form'), 'add');
                    validateSendButton($('#input-form'), 'edit');
                }),
                $('<div>').addClass('invalid-feedback')
            ),
            $('<div>').addClass('col-8').append(
                $('<input>').attr({
                    class: 'form-control',
                    type: 'text',
                }).on('change', function() {
                    urlValidation($(this));
                    validateSendButton($('#input-form'), 'add');
                    validateSendButton($('#input-form'), 'edit');
                }),
                $('<div>').addClass('invalid-feedback')
            )
        ));
    $('#remove-last-song-input-button').css('display', 'inline-block');
};

// remove the last line of song inputs 
function removeLastSongInput(inputs) {
    if (inputs.children().length > 2) {
        inputs.children().last().remove();
    }
    if (inputs.children().length < 3) {
        $('#remove-last-song-input-button').css('display', 'none');
    }
};

// return serialized object from the form for the API to process
function serializeForm(form) {
    var songs = [];
    var x = form.find('#song-inputs .form-row');
    for (var i = 1; i < x.length; i++) {
        songs.push({
            name: $(x[i]).find('input')[0].value,
            url: $(x[i]).find('input')[1].value,
        })
    }
    return {
        name: form.find('#pl-name-input').val(),
        image: form.find('#pl-url-input').val(),
        songs: songs
    }
}

// appends single playlist to the end of container
function appendPlaylist(from, to) {
    // to = playlist-container
    to.append(
        $('<div>').addClass('playlist').attr('id', 'pl-' + from.id).data(from)
        .append(
            $('<h3>')
            .html(from.name),
            $('<div>').addClass('playlist-circle').append(
                $('<img>')
                .attr({
                    src: from.image,
                    alt: 'Image not found',
                })
                .on('error', function() {
                    this.src = 'http://mehararts.com/category_image/demo.png';
                }),
                $('<div>').addClass('delete-edit-buttons-container').append(
                    $('<div>').addClass('delete-edit-buttons').append(
                        $('<a>').attr('href', '').append(
                            $('<i>').addClass('fas fa-trash-alt')
                        )
                        .click(function(e) {
                            e.preventDefault();
                            swalDelete(from.id);
                        })
                    ),
                    $('<div>').addClass('delete-edit-buttons').append(
                        $('<a>').attr('href', '').append(
                            $('<i>').addClass('fas fa-edit')
                        )
                        .attr({
                            'data-target': '#playlist-modal',
                            'data-toggle': 'modal'
                        }).click(function() {
                            populateEditForm(from);
                            $('#edit-playlist-button').css('display', 'block').data('id', from.id);
                            $('#add-playlist-button').css('display', 'none');
                        })
                    )
                ),
                $('<div>').addClass('play-button').append(
                    $('<a>').attr({
                        href: '',
                        class: 'play-sign'
                    }).append(
                        $('<i>').addClass('fa fa-play fa-2x fa-fw')
                    ).click(function(e) {

                        populatePlayer(from);
                        e.preventDefault();
                        var playlist = $(this).parent().parent().parent();

                        playlist.appendTo($('#player-container'))
                            .find('img')
                            .addClass('spinning')
                            .css('animation-play-state', 'paused');
                        $('#player-modal').modal('show');
                    }),
                    $('<a>').attr({
                        href: '',
                        class: 'play-control-sign'
                    }).append(
                        $('<i>').addClass('fa fa-play fa-2x fa-fw')
                    ).click(function(e) {
                        e.preventDefault();
                        player[0].play()
                    }).css('display', 'none'),
                    $('<a>').attr({
                        href: '',
                        class: 'pause-control-sign'
                    }).append(
                        $('<i>').addClass('fa fa-pause fa-2x fa-fw')
                    ).click(function(e) {
                        e.preventDefault();
                        player[0].pause();
                    }).css('display', 'none')
                )
            )
        )
    )

    // creater an arc from the header
    $('#pl-' + from.id + ' h3').arctext({
        radius: 170,
        dir: 1
    })
};

// loading data from api and calling to appendPlaylist function to initialize all the playlists
function loadPlaylist(x, searchString) {
    $.ajax({
        method: 'GET',
        url: x == 'all' ? url : url + '/' + x
    }).done(function(res) {
        if (x == 'all') {
            playlistContainer.empty();
            $.each(res.data, function(i, pl) {
                if (searchString) {
                    if (pl.name.toLowerCase().indexOf(searchString.toLowerCase()) > -1) {
                        appendPlaylist(pl, playlistContainer);
                    }
                } else {
                    appendPlaylist(pl, playlistContainer);
                }
            })
        } else if (typeof x === 'number') {
            appendPlaylist(res.data, playlistContainer);
        } else {
            return;
        }
    }).fail(function(err) {
        console.log(err);
        alert('Sorry, the server isn\'t responding right now, please try later!')
    })
}

// Populates form for easier edit purposes
function populateEditForm(data) {
    $.ajax({
        method: 'GET',
        url: url + '/' + data.id + '/songs'
    }).done(function(res) {
        $('#input-form input').val('').removeClass('is-valid is-invalid');
        $('#pl-name-input').val(data.name);
        $('#pl-url-input').val(data.image);
        $('#preview').attr('src', data.image);

        for (var i = 0; i < res.data.songs.length; i++) {
            if (res.data.songs.length > $('#song-inputs .form-row').length - 1) {
                addSongInput($('#song-inputs'));
            }
            $($('#song-inputs .form-row')[i + 1]).find('input')[0].value = res.data.songs[i].name
            $($('#song-inputs .form-row')[i + 1]).find('input')[1].value = res.data.songs[i].url
        }

        while (res.data.songs.length < $('#song-inputs .form-row').length - 1) {
            removeLastSongInput($('#song-inputs'));
        }
    }).fail(function(err) {
        console.log(err);
    })
}

// get the playlists songs and appending the to the music player
function populatePlayer(data) {
    $.ajax({
            method: 'GET',
            url: url + '/' + data.id + '/songs'
        }).done(function(res) {
            $('#song-container ul').empty();
            player.data('activePlaylist', res.data.songs);
            $.each(res.data.songs, function(i, item) {
                $('#song-container ul').append($('<li>').text(item.name).click(function() {
                    player.attr("src", item.url);
                    player.data("activeSong", item);
                    player.data("activeIndex", i);
                    $('#song-container ul li').css('font-weight', 'normal');
                    $('#song-container ul li').removeClass('playing-sign')
                    $(this).css('font-weight', 'bolder').addClass('playing-sign');
                    $('head title').html(item.name);
                    $('.play-sign').css('display', 'none')
                }))
            })
            $($('#song-container ul li')[0]).click();
        })
        .fail(function(err) {
            console.log(err);
        })
}

// cleans the edit form
function unpopulateEditForm() {
    $('#input-form input').val('').removeClass('is-valid is-invalid');
    while ($('#song-inputs .form-row').length > 2) {
        removeLastSongInput($('#song-inputs'));
    };
};

function nextSong() {
    var aIndex = player.data("activeIndex");
    var songs = $('#song-container ul li');
    if (aIndex + 1 < songs.length) {
        $(songs[aIndex + 1]).click();
    }
}

function prevSong() {
    var aIndex = player.data("activeIndex");
    var songs = $('#song-container ul li');
    if (aIndex > 0) {
        $(songs[aIndex - 1]).click();
    }
}