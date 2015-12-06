$(document).ready(function(){
    var renderReverse = function (data) {
        console.log(data);
    };
    function geo() {
        navigator.geolocation.getCurrentPosition(function (position) {
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;
            var url = "http://api.map.baidu.com/geocoder/v2/?ak=pInR1if7DLXlvUQsybCrZEVH&callback=renderReverse&location=" + lat + "," + lon + "&output=json&pois=1";
            $.ajax({
                url: url,dataType:'jsonp',  success: function (data) {
                    $("iframe[name='sinaWeatherTool']").attr("src","http://weather.news.sina.com.cn/chajian/iframe/weatherStyle2.html?city="+encodeURI(data.result.addressComponent.city.replace('市','')));
                }
            });
        }, function (error) {
        }, {enableHighAccuracy: false, timeout: 30000, maximumAge: 60});

        /*$.getScript('http://php.weather.sina.com.cn/iframe/index/w_cl.php?code=js&day=0&city=&dfc=1&charset=utf-8',function(a){
            var s="",r="",q="";for(s in window.SWther.w){
                q=SWther.w[s][0];
                r={city:s,date:SWther.add.now.split(" ")[0]||"",day_weather:q.s1,night_weather:q.s2,day_temp:q.t1,night_temp:q.t2,day_wind:q.p1,night_wind:q.p2},
                    //$("#w").html(q.s1+" "+r.city);
                //alert(q[0])
            }
        });*/


    };
    geo();

});