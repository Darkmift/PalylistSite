class Playlist {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.image = data.image;
        this.container = null;
    }
    getId() {
        return this.id;
    }

    build() {
        this.container = $('<section>', {
            class: "playlist",
        });
        var container = this.container;
        $('<h4>', {
            text: this.name,
            class: "playlist-name"
        }).appendTo(container)
        $('<img>', {
                src: this.image,
                class: "playlist-image",
            }).appendTo(container)
            // $('<button>', {
            //     class: "playlist-play-btn btn btn-dark",
            //     text: "▷",
            // }).appendTo(container)
        $('<button>', {
            class: "video-play-button",
        }).append($('<span>')).appendTo(container)

        this.container.appendTo($('main'))
    }

    registerPlaying() {
        this.container.find('.playlist-play-btn').click(function(event) {
            event.preventDefault();
            var player = new Player(this.id, this.name, this.image);
        }.bind(this));
    }
}