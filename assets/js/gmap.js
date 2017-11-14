// home page google maps

function initMap() {
    var myLatLng = new google.maps.LatLng(38.9018, -77.0601);
    var myStyles = [
        {
            featureType: 'poi', 
            elementType: 'all', 
            stylers: [ 
                { hue: '#68b897' }, 
                { saturation: -16 }, 
                { lightness: -28 }, 
                { visibility: 'off' } 
            ]
        },{
            featureType: 'road.highway',
            elementType: 'all',
            stylers: [
                { hue: '#ffffff' },
                { saturation: -100 },
                { lightness: 100 },
                { visibility: 'on' }
            ]
        },{
            featureType: 'water',
            elementType: 'all',
            stylers: [
                { hue: '#0091e5' },
                { saturation: 100 },
                { lightness: -41 },
                { visibility: 'on' }
            ]
        },{
            featureType: 'landscape',
            elementType: 'all',
            stylers: [
                { hue: '#e3e3e3' },
                { saturation: -100 },
                { lightness: 0 },
                { visibility: 'on' }
            ]
        },{
            featureType: 'landscape',
            elementType: 'all',
            stylers: [
                { hue: '#e3e3e3' },
                { saturation: -100 },
                { lightness: 0 },
                { visibility: 'off' }
            ]
        },{
            featureType: 'landscape.man_made',
            elementType: 'all',
            stylers: [
                { hue: '#e3e3e3' },
                { saturation: -100 },
                { lightness: 0 },
                { visibility: 'on' }
            ]
        },{
            featureType: 'road.local',
            elementType: 'all',
            stylers: [
                { hue: '#ffffff' },
                { saturation: -100 },
                { lightness: 100 },
                { visibility: 'on' }
            ]
        },
        
        {
            featureType: 'poi.park',
            elementType: 'all',
            stylers: [
                { hue: '#68b897' },
                { saturation: -16 },
                { lightness: -28 },
                { visibility: 'on' }
            ]
        }
    ];


    var mapOptions = {
        zoom: 16,
        panControl: false,
        zoomControl: false,
        scaleControl: false,
        scrollwheel: false,
        center: new google.maps.LatLng(38.9018, -77.0601),
        styles: myStyles
    }
    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    var infowindow = new google.maps.InfoWindow({
        content: '<center><b>THE WASHINGTON HARBOUR</b><br><a style="color:#000" href="https://www.google.com/maps/place/3050+K+St+NW,+Washington,+DC+20007/@38.9021905,-77.0604835,17z/data=!3m1!4b1!4m2!3m1!1s0x89b7b64c46c3fb73:0x7aed7e917d7c28c3" target="_blank">3050 K STREET NW WASHINGTON, DC</a><br>202.295.5007</center>'
    });

    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        icon: '/assets/img/wh-maps-icon.png',
        title: ''
    });

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(map,marker);
    });
}

    google.maps.event.addDomListener(window, 'load', initMap);

