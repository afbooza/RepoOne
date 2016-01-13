
var app = angular.module('app', [
  'ngRoute',
  'app.controllers',
  'angular-carousel-3d'
]);


  app.directive('head', ['$rootScope','$compile',
    function($rootScope, $compile){
        return {
            restrict: 'E',
            link: function(scope, elem){
                var html = '<link rel="stylesheet" ng-repeat="(routeCtrl, cssUrl) in routeStyles" ng-href="{{cssUrl}}" />';
                elem.append($compile(html)(scope));
                scope.routeStyles = {};
                $rootScope.$on('$routeChangeStart', function (e, next, current) {
                    if(current && current.$$route && current.$$route.css){
                        if(!angular.isArray(current.$$route.css)){
                            current.$$route.css = [current.$$route.css];
                        }
                        angular.forEach(current.$$route.css, function(sheet){
                            delete scope.routeStyles[sheet];
                        });
                    }
                    if(next && next.$$route && next.$$route.css){
                        if(!angular.isArray(next.$$route.css)){
                            next.$$route.css = [next.$$route.css];
                        }
                        angular.forEach(next.$$route.css, function(sheet){
                            scope.routeStyles[sheet] = sheet;
                        });
                    }
                });
            }
        };
    }
]);


app.config(['$routeProvider', '$locationProvider',
	function($routeProvider) {
        //$locationProvider.html5Mode(true);
		$routeProvider.
			when('/', {
				templateUrl: 'partials/homeBody.html',
				controller:['homeController', 'Carousel3dController']
			}).
      when('/Resume',{
        templateUrl: 'partials/resume.html',
        css:['css/fontello.css', 'css/foundation.min.css','css/freelancer.css','css/myStyle.css']
      }).
      when('/contact',{
        templateUrl:'partials/contact.html',
        css:['css/foundation.min.css','css/freelancer.css','css/myStyle.css']
      }).
    when('/game',{
        templateUrl:'partials/game.html',
        css:['css/foundation.min.css','css/freelancer.css','css/myStyle.css']
    }).
			otherwise({
				redirectTo: '/'
			});
	}]);
