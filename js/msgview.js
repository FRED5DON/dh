function UIMsgVew() {
    var timeout = null;
    var time = 3000;
    this.show = function (text) {
        document.querySelector("div.msg-view-content").innerText=text;
        if (timeout) {
            clearTimeout(timeout);
        }
        document.querySelector("div.msg-view").style.display="block";
        document.querySelector("div.msg-view").className = document.querySelector("div.msg-view").className.replace(' msg-view-animation-out', '');
        document.querySelector("div.msg-view").className += ' msg-view-animation-in';
        timeout = setTimeout(this.hide, time);
    };
    this.hide = function () {
        document.querySelector("div.msg-view").style.display="none";
        document.querySelector("div.msg-view").className = document.querySelector("div.msg-view").className.replace(' msg-view-animation', '');
        document.querySelector("div.msg-view").className += ' msg-view-animation-out';
    };

}
