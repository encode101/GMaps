angular.module('starter.controllers', [])

.controller('DashboardCtrl', function($scope) {
  $scope.title="Welcome To My World!";
   function initialize() {
    navigator.geolocation.getCurrentPosition(function(position) {
     
     var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);     
     var mapOptions = {
      center: pos,
      zoom: 18
    };
        var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
        var marker = new google.maps.Marker({
          position: pos
        });

          marker.setMap(map);

         var request = {
          location: pos,
          radius: '9000',
          types: ['restaurant']
        };

        service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request, callback);

        function createMarker(place) {
          var placeLoc = place.geometry.location;
          var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location
          });
        }


        function callback(results, status) { 
          console.info(results)         
          $scope.locations = [];
          if (status == google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
              var place = results[i];
              $scope.$apply(function(){
                $scope.locations.push(results[i]);
              });
              createMarker(results[i]);
            }
          }
      }
    });    
    }
     initialize();
})