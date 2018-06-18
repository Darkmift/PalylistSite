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
        var self = this;
        this.container = $('<section>', {
            class: "playlist",
        });
        var container = this.container;
        $('<h4>', {
            text: this.name.substr(0, 50) + '...',
            class: "playlist-name"
        }).appendTo(container)
        $('<img>', {
            src: this.image,
            class: "playlist-image",
        }).appendTo(container)
        $('<button>', {
            class: "video-play-button",
        }).click(() => {
            cl('clicked on: ' + self.id);
            new Player(this.id, this.name, this.image);
        }).append($('<span>')).appendTo(container)
        this.container.appendTo($('main'));

    }
}