$(document).ready(function () {
    $("#draggable-1").draggable({helper: 'clone',
        stop: function (e) {
            var point = new google.maps.Point(e.pageX, e.pageY);
            var ll = overlay.getProjection().fromContainerPixelToLatLng(point);
            placeMarker(ll, 'node');
        }
    });

    $("#draggable-2").draggable({helper: 'clone',
        stop: function (e) {
            var point = new google.maps.Point(e.pageX, e.pageY);
            var ll = overlay.getProjection().fromContainerPixelToLatLng(point);
            placeMarker(ll, 'poi');
        }
    });
});

var $map;
var $latlng;
var overlay;
var c = 1;
function cuniq() {
    var d = new Date(),
            m = d.getMilliseconds() + "",
            u = ++d + m + (++c === 10000 ? (c = 1) : c);
    return u;
}
function initialize() {
    var $latlng = new google.maps.LatLng(44.856474, -93.241643);
    var myOptions = {
        zoom: 15,
        center: $latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
            position: google.maps.ControlPosition.TOP_LEFT
        },
        zoomControl: true,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.LARGE,
            position: google.maps.ControlPosition.LEFT_TOP
        },
        scaleControl: true,
        scaleControlOptions: {
            position: google.maps.ControlPosition.TOP_LEFT
        },
        streetViewControl: false,
        panControl: false,
    };
    $map = new google.maps.Map(document.getElementById("map_canvas"),
            myOptions);

    overlay = new google.maps.OverlayView();
    overlay.draw = function () {
    };
    overlay.setMap($map);
}

function placeMarker(location, type) {
    var color = null;
    if (type === 'node') {
        color = '#FF0000';
    } else if (type === 'poi')
    {
        color = '#0000FF';
    }
    var cityCircle = new google.maps.Circle({
        strokeColor: color,
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: color,
        fillOpacity: 0.35,
        map: $map,
        //position: location,
        center: location,
        radius: 60,
        editable: true,
        draggable: true,
    });
    cityCircle.set('id', cuniq());
    cityCircle.set('type', type);
    saveCirle(cityCircle);
    google.maps.event.addListener(cityCircle, 'center_changed', function ()
    {
        //console.log(cityCircle.getCenter());
    });
    google.maps.event.addListener(cityCircle, 'radius_changed', function ()
    {
        saveCirle(cityCircle);
    });
    google.maps.event.addListener(cityCircle, 'dragend', function ()
    {

        saveCirle(cityCircle);
    });

    function saveCirle(cityCircle)
    {
        var lat = cityCircle.getCenter().lat();
        var lng = cityCircle.getCenter().lng();
        var radius = cityCircle.getRadius();
        var id = cityCircle.get('id');
        var type = cityCircle.get('type');
        console.log(lat);
        console.log(lng);
        console.log(radius);
        console.log(id);
        console.log(type);
        $.ajax({
            type: 'POST',
            url: 'http://localhost/crawler/public/saveCircle',
            data: {
                lat: lat, lng: lng, radius: radius, id: id, type: type
            },
            success: function (response)
            {

            },
            error: function ()
            {

            }
        });
    }
}