class Player {
    constructor(playlistId, playlistName, playlistImg) {
        this.playlistId = playlistId;
        this.playlistName = playlistName;
        this.playlistImg = playlistImg;
        this.getSongs();
    }

    getSongs() {
        $.get('http://www.avisiteapi.tk/playerAPI/api/playlist/' + this.playlistId + '/songs', function(response) {
            console.log(response.data.songs[0].url);
            this.songs = response.data.songs;
            this.build();
        }.bind(this));
    }

    build() {
        $('.player').remove();
        this.container = $('<div>', {
            class: "player"
        });
        var leftPlayerImage = $('<div>', {
            class: "left-list"
        }).appendTo(this.container);
        var rightPlayerContent = $('<div>', {
            class: "right-list"
        }).appendTo(this.container);

        $('<button>', {
            class: "playlist-close",
            click: () => {
                $('.player').remove();
            }
        }).append($('<i>', {
            class: "icon-remove-sign"
        })).appendTo(leftPlayerImage);

        $('<img>', {
            class: "playlist-image",
            src: this.playlistImg
        }).appendTo(leftPlayerImage);

        $('<h5>', {
            text: "Playlist Name: " + this.playlistName,
            class: "player-name"
        }).appendTo(rightPlayerContent);

        var audio = $('<audio>', {
            class: 'audio',
            text: "Your browser does not support the audio element.",
            controls: true,
            autoplay: true,
            'data-song_id': 0,
        }).on('ended', this.playNext.bind(this));
        audio.append($('<source>', {
            type: "audio/mpeg",
            src: this.songs[0].url,
        }));

        // audiojs.events.ready(function() {
        //     var as = audiojs.createAll();
        // });
        audio.appendTo(rightPlayerContent);
        //audio.appendTo(rightPlayerContent);

        $('<h6>', {
            text: "NOW PLAYING: " + this.songs[0].name.replace(/\.[0-9a-z]+$/i, ''),
            class: "font-weight-bold playing-now"
        }).appendTo(rightPlayerContent);

        rightPlayerContent.append(this.songsList.bind(this))
        $('main').prepend(this.container),
            audio.mediaelementplayer({
                features: ['playpause', 'progress', 'current', 'tracks', 'fullscreen']
            });
    }

    playNext(e) {
        var index = ++e.target.dataset.song_id;
        if (index >= this.songs.length) {
            return false;
        }

        e.target.src = this.songs[index].url;
        e.target.play();
        $('.playing-now').text("NOW PLAYING: " + this.songs[index].name.replace(/\.[0-9a-z]+$/i, ''));
    }

    songsList(e) {
        var songsList = $('<nav>');
        $.each(this.songs, function(index, value) {
            var songNumber = index + 1;
            var songName = value.name.replace(/\.[0-9a-z]+$/i, '');
            var song = $('<div>', {
                class: "song",
                'data-song_index': index,
            }).appendTo(songsList);

            $('<span>', {
                text: songNumber + ". "
            }).appendTo(song);
            $('<span>', {
                text: songName
            }).appendTo(song);

            song.click(function(e) {
                console.log(e);
                $('audio').attr({
                    src: value.url,
                    'data-song_id': index
                });
                $('.playing-now').text("NOW PLAYING: " + songName);
                // $('div').data('song_index', index).css("font-weight", "bold")
            });
        });
        return songsList;
    }

    //not working yet (bold & sign ▶)
    playSign(index) {
        // if ($('audio').attr('src')) {
        $("['song_index'=index]").css("font-weight", "bold")
        $('<span>', {
            class: "play-sign",
            text: "▶",
        }).prependTo($("['song_index'=index]"));
        // }
    }
}