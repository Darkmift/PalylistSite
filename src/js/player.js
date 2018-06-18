class Player {
    constructor(playlistId, playlistName) {
        this.playlistId = playlistId;
        this.playlistName = playlistName;
        this.getSongs();
    }

    getSongs() {
        $.get('api/playlist/' + this.playlistId, function(response) {
            this.songs = response.data.songs;
            this.build();
        }.bind(this));
    }

    build() {
        this.container = $('<div>', { class: "player" });
        $('<h4>', {
            text: this.playlistName,
            class: "player-name"
        }).appendTo(container)

        $('<audio>', {
            src: this.songs[0],
            'data-song_id': 0,
        }).on('ended', this.playNext.bind(this))

        this.container.appendTo($('main'))
    }

    playNext(e) {
        var index = ++e.target.dataset.song_id;
        if (index >= this.songs.length) { return false; }

        e.target.src = this.songs[index].url;
        e.target.play();
    }
}