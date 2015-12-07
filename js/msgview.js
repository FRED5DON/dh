window.IsURL = function (str_url) {
    var strRegex = '^((https|http|ftp|rtsp|mms)?://)' + '?(([0-9a-z_!~*\'().&=+win%-]+: )?[0-9a-z_!~*\'().&=+win%-]+@)?' //ftp的user@
        + '(([0-9]{1,3}.){3}[0-9]{1,3}' // IP形式的URL- 199.194.52.184
        + '|' // 允许IP和DOMAIN（域名）
        + '([0-9a-z_!~*\'()-]+.)*' // 域名- www.
        + '([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].' // 二级域名
        + '[a-z]{2,6})' // first level domain- .com or .museum
        + '(:[0-9]{1,4})?' // 端口- :80
        + '((/?)|' // a slash isn't required if there is no file name
        + '(/[0-9a-zA-Z_!~*\'().;?:@&=+win,%#-]+)+/?)$';
    var re = new RegExp(strRegex);
    //re.test()
    if (re.test(str_url)) {
        return (true);
    } else {
        re=new RegExp("file:///[c-zC-Z]:(//([0-9a-zA-Z]+))+|(/([0-9a-zA-Z]+))+");
        if(re.test(str_url)){
            return (true);
        }
        return (false);
    }
};
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
