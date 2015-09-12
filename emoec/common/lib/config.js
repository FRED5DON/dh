define(function () {
    var config = {};
    config.host = "http://localhost";
    config.http = {};
    config.http.get = function (url, params, success) {
        var $json = params;
        var $url = config.host + url + "?data=" + encodeURIComponent(JSON.stringify($json));
        $.get($url, success);
    }
    config.http.post = function (url, params, success) {
        var $json = params;
        var $url = config.host + url;
        $json.reqData = params;
        $.post(url, $json, success);
    }
    return config;
});