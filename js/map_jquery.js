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

    function getMarkers(){
        $.ajax({
            url: 'http://localhost:8000/api/drive_historys/1/',
            type: 'GET',
            dataType: 'json',
            contentType: "application/json",
            success: function(json){
                // Expect array with one element.
                var latestVLoc = json;
                console.log(latestVLoc);
                var cLoc = new google.maps.LatLng(
                    latestVLoc.latitude,
                    latestVLoc.longitude
                );

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