angular.module('app.controllers', [])
.controller('homeController',['$scope', '$http', function($scope, $http){
	$http.get("http://api.openweathermap.org/data/2.5/weather?q=NewYork,us&appid=000547a82f0019492affae60ec6e0b88")
		.success(function(data, status, headers, config)
	{
		$scope.weather = data;
		var tempKelvin = data.main.temp;
		var tempFaren = tempKelvin * (9/5) - 459.67;
		var maxTemp = data.main.temp_max * (9/5) - 459.67;
		$scope.maxTemp = maxTemp.toPrecision(3);
		var minTemp = data.main.temp_min * (9/5) - 459.67;
		$scope.minTemp = minTemp.toPrecision(3);
		$scope.tempFaren = tempFaren.toPrecision(3)	;
	}).
	error(function(data,status,headers,config){
		messageBox.show("error");
	})
}]);
