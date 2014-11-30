(function() {
    window.onload = function() {
// Creating an object literal containing the properties
// we want to pass to the map

        var dPos = {'lat': 13.75, 'lnt': 100.4667};

        var options = {
            zoom: 12,
            center: new google.maps.LatLng(dPos.lat, dPos.lnt),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
// Creating the map
        var map = new google.maps.Map(document.getElementById('map'), options);
// Adding a marker to the map
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(dPos.lat, dPos.lnt),
            map: map,
            title: 'Click me'
        });
// Creating an InfoWindow with the content text: "Hello World"
        var infowindow = new google.maps.InfoWindow({
            content: 'Hello world'
        });
// Adding a click event to the marker
        google.maps.event.addListener(marker, 'click', function() {
// Calling the open method of the infoWindow
            infowindow.open(map, marker);
        });

        // Getting values
        document.getElementById('fake-move').onclick = function() {
            //alert('Current Zoom level is ' + map.getZoom());
            //alert('Current center is ' + map.getCenter());
            //alert('The current mapType is ' + map.getMapTypeId());
            var cPos = marker.getPosition();
            console.log('lat'+cPos.lat()+',lnt'+cPos.lng());
            var cll = new google.maps.LatLng(cPos.lat()+0.01, cPos.lng());
            marker.setPosition(cll);
            marker.setMap(map);
        }

    };


})();
