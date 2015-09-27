
var app = angular.module('app', ['ngRoute']);


app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/homeBody.html',
        controller:'sunsetController'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);

app.controller('sunsetController',function($scope, $http){
  $http.get("http://api.openweathermap.org/data/2.5/weather?q=NewYork,us&units=imperial").
  success(function(data, status, headers, config)
  {
    $scope.weather = data;
  }).
  error(function(data,status,headers,config){
    messageBox.show("error");
  })
  
});

