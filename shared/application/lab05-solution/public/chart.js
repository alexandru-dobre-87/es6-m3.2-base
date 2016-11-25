$(document).ready(function () {

    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 0, lng: 0},
        zoom: 3
    });

    $.getJSON("/temperatures", function (data) {

        $.each(data.data, function (key, val) {

            var marker = new google.maps.Marker({
                position: {lat: val.station.location.coordinates[0], lng: val.station.location.coordinates[1]},
                map: map,
                title: val.station.name,
                label: parseFloat(val.temperature).toFixed(1)
            });

        });

    });

});
