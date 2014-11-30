$(document).ready(function(){

    var INTERVAL = 5000;
    var dPos = {'lat': 13.75, 'lnt': 100.4667};

    var options = {
        zoom: 12,
        center: new google.maps.LatLng(dPos.lat, dPos.lnt),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById('map'), options);
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(dPos.lat, dPos.lnt),
        map: map,
        title: 'Click me'
    });

    getMarkers();

    var gblRandom = 0;

    function getMarkers(){

        //var cPos = marker.getPosition();
        ////console.log('lat'+cPos.lat()+',lnt'+cPos.lng());
        //var cll = new google.maps.LatLng(cPos.lat()+0.01, cPos.lng  ());
        //marker.setPosition(cll);
        //marker.setMap(map);

        $.ajax({
            url: 'http://localhost:8000/api/drive_historys/',
            type: 'GET',
            dataType: 'json',
            contentType: "application/json",
            success: function(json){
                var loc_array = json;
                var i = Math.floor(Math.random() * loc_array.length) + 1;
                if (i==gblRandom){
                    window.setTimeout(getMarkers, INTERVAL);
                    return;
                }else{
                    gblRandom = i;
                }

                var actual_i = i-1;
                var pLoc = marker.getPosition();
                console.log('pLat'+pLoc.lat()+',pLng'+pLoc.lng());
                var cLoc = new google.maps.LatLng(
                    loc_array[actual_i].latitude,
                    loc_array[actual_i].longitude
                )
                console.log(
                    'cLat'+loc_array[actual_i].latitude+',cLng'+loc_array[actual_i].longitude);
                marker.setPosition(cLoc);
                marker.setMap(map);

                window.setTimeout(getMarkers, INTERVAL);
            },
            error: function(xhr, errmsg,err){
                console.log("dam");
            }
        })
    }
});