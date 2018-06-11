class Requester {
    constructor(type, url) {
        this.type = type;
        this.url = url;
    }

    get() {
        var result = "";
        $.ajax({
            url: this.url,
            async: false,
            data: this.data,
            success: function(data) {
                result = data;
            }
        });
        return result;
    }
}