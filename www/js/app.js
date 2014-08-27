function mostrarPelicula(p){
	;//do nothing
}
var app = angular.module('starter', ['ionic'])
app.controller('StarterCtrl', function($scope, $http) {

	navigator.geolocation.getCurrentPosition(function(pos) {
		$scope.mensaje = "Buscando posicion...";
		$scope.latitude = pos.coords.latitude;
		$scope.longitude= pos.coords.longitude;
	}, function(error) {
		$scope.mensaje = "No se puede encontrar la ubicacion: " + error.message;
	});

	$scope.$watch( "latitude" , function(n,o){
		if(n==o) return;
		
		$scope.mensaje = "Buscando paraderos en 200 metros";

		var currentLocation = new google.maps.LatLng($scope.latitude,$scope.longitude);

		$scope.map = new google.maps.Map(document.getElementById('map'), {
			center: currentLocation,
			zoom: 15
		});

		var request = {
				location: currentLocation,
				radius: '200',
				types: ['bus_station'],
				key: 'AIzaSyCn9HYnrYkevPssmU0vATjx_TsMvxzTN8k'
		};

		service = new google.maps.places.PlacesService(map);
		service.nearbySearch(request, function(results, status) {
			if (status == google.maps.places.PlacesServiceStatus.OK) {
				$scope.results = results;
			}
		});

	},true);

	$scope.$watch( "results" , function(n,o){
		if(n==o) return;
		doSearch($scope.results[0]);
	},true);

	$scope.buscar = function(result){
		return doSearch(result);
	}

	var doSearch = function(result){
		$scope.mensaje = "Buscando recorridos en paradero " + result.name;
		var codigoParadero = result.name.split(" ")[0];
		var iframe = document.getElementById('youriframe');
		iframe.src = "http://web.smsbus.cl/web/buscarAction.do?d=busquedaParadero"+
				"&ingresar_paradero="+codigoParadero;
	}

});
