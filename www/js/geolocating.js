function getGeoLocation() {
    //Call the Cordova Geolocation API
    navigator.geolocation.getCurrentPosition(onGetLocationSuccess, onGetLocationError,
        { enableHighAccuracy: true });
    $('#error-msg').show();
    $('#error-msg').text('Determining your current location ...');


}

function onGetLocationSuccess(position) {
    //Retrieve the location information from the position object
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var LatLong = new google.maps.LatLng(latitude, longitude);
    var mapOptions = {
        center: LatLong,
        zoom: 13,
        mapTypeId:'roadmap'
    };
    console.log('ok');

    //var map = new google.maps.Map($('#map'), mapOptions);
    var map = new google.maps.Map(document.getElementById('map'), {
                            zoom: 12,
                            center: LatLong,
                            mapTypeId:'roadmap'
                        });

    var marker = new google.maps.Marker({
              position: LatLong,
              map: map,
              title: 'Minha localização'
    });
    marker.setAnimation(google.maps.Animation.BOUNCE);
    
            $.getJSON("https://gpromo.com.br/getcompanys.php?find=companys&cat=9999", function(json1) {
                $.each(json1, function(key, data) {
                    var latLng = new google.maps.LatLng(data.lat, data.log); 
                    // Creating a marker and putting it on the map
                    var marker = new google.maps.Marker({
                        position: latLng,
                        map: map,
                        title: data.nomeemp
                    });
                });
            });
}

function onGetLocationError(error) {
    $('#error-msg').text('Error getting location');
    $('#get-weather-btn').prop('disabled', false);
}