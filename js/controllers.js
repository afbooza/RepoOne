

angular.module('app.controllers', [])
.controller('homeController',function($scope, $http){
	$http.get("http://api.openweathermap.org/data/2.5/weather?q=NewYork,us&units=imperial").
	success(function(data, status, headers, config)
	{
		$scope.weather = data;
	}).
	error(function(data,status,headers,config){
		messageBox.show("error");
	})
});
