require.config({
    baseUrl: '../common/lib',
    paths: {
        c: 'config',
        jq:"jquery-1.11.0.min",
        jqc:"jquery.cookie",
        swipe: "swiper.3.1.2.jquery.min",
        swipeAnim: "swiper.animate.min"
    }
});

define(['c', "swipe", "swipeAnim",], function (c, Swiper, swipeAnim) {
    window.http = c.http;
    new Swiper('.swiper-container', {
        pagination: '.swiper-pagination', direction: 'horizontal',
        loop: true, autoplay: 5000, autoplayDisableOnInteraction: false,
        effect: 'fade',
        fade: {
            crossFade: false,
        }
    });
    $("#signUp").click(function (e) {
        e.stopPropagation();
        $('input[name="name"]').val("");
        $('input[name="phone"]').val("");
        $('div[name="text"]').html("");
        $("div.modal").show();
    });
    $("div.modal").click(function (e) {
        if ($(e.target).hasClass("hide")) {
            $("div.modal").hide();
        }
    });
    $("span.close").click(function (e) {
        $("div.modal").hide();
    });

    $("#signUpBtn").click(function (e) {
        var name=$('input[name="name"]').val();
        var phone=$('input[name="phone"]').val();
        var text=$('div[name="text"]').html();
        var date=new Date().getTime();

        var jsonData={
            name:name,
            phone:phone,
            text:text,
            date:date
        };
        //先判断是否已经报过名
        /*http.post("",jsonData,function(data){
            if(data){
                mkListInHtml(data.rs.data,true);
            }
        });*/
        //FIXME 测试代码
        mkListInHtml([jsonData],true);
        $("div.modal").hide();

    });
    getTksList();
    //联网获取答谢列表
    function getTksList() {
        /* http.get("/tks/get", "", function (data) {
         if (data) {
         mkListInHtml(data.rs.data);
         }
         });*/

        //FIXME 测试代码
        var data = [
            {
                name: "张三",
                phone: "",
                text: "GoodForyou",
                date: new Date().getTime()
            }
            ,
            {
                name: "李四",
                phone: "",
                text: "Thks",
                date: new Date().getTime()
            }
        ];
        $.cookie("thks",JSON.stringify(data));
        if($.cookie("thks")){
            mkListInHtml($.parseJSON($.cookie("thks")));
        }

    }

    function mkListInHtml(data,isAppend) {
        if (data) {
            if(isAppend){
                var ck=$.parseJSON($.cookie("thks")).concat(data);
                $.cookie("thks",JSON.stringify(ck),{ expires: 7 });
            }else{
                var ul = document.createElement("ul");
                ul.className = "thk-list-ul";
                $("#thk-list").append(ul);
            }
            for (var i = 0; i < data.length; i++) {
                var item = data[i];
                var spanTime=(new Date().getTime()-item.date)/1000/60;
                spanTime=Math.floor(spanTime);
                var desc="";
                if(spanTime==0){
                    desc="刚刚";
                }
                else if(spanTime>=1 && spanTime<60){
                    desc=spanTime+"分钟前";
                }
                else if(spanTime/60<23){
                    spanTime=Math.floor(spanTime/60);
                    desc=spanTime+"小时前";
                }else{
                   var d= new Date(item.date);
                    desc= d.getFullYear()+"-"+ (d.getMonth()+1)+"-"+ d.getDate()+" "+ d.getHours()+":"+ d.getMinutes()+":"+ d.getSeconds();
                }
                var node = document.createElement("li");
                node.innerHTML = "<div><ul class='item-ul'><li>" + item.name + "</li><li>" + item.text + "</li><li class='time'>" + desc+ "</li></ul></div>";
                $(".thk-list-ul").append(node);
            }
        }

    }


});