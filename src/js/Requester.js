class Requester {
    constructor(data, url) {
        this.url = url;
        this.data = data;
    }

    get(getUrl) {
        return $.ajax({
            url: 'http://www.avisiteapi.tk/playerAPI/api/' + getUrl,
            async: false,
            data: this.data,
        });
    }
}