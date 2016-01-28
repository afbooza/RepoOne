var app = angular.module('app', [
    'ngRoute',
    'app.controllers'
]);

app.directive('head', ['$rootScope', '$compile',
    function ($rootScope, $compile) {
        return {
            restrict: 'E',
            link: function (scope, elem) {
                var html = '<link rel="stylesheet" ng-repeat="(routeCtrl, cssUrl) in routeStyles" ng-href="{{cssUrl}}" />';
                elem.append($compile(html)(scope));
                scope.routeStyles = {};
                $rootScope.$on('$routeChangeStart', function (e, next, current) {
                    if (current && current.$$route && current.$$route.css) {
                        if (!angular.isArray(current.$$route.css)) {
                            current.$$route.css = [current.$$route.css];
                        }
                        angular.forEach(current.$$route.css, function (sheet) {
                            delete scope.routeStyles[sheet];
                        });
                    }
                    if (next && next.$$route && next.$$route.css) {
                        if (!angular.isArray(next.$$route.css)) {
                            next.$$route.css = [next.$$route.css];
                        }
                        angular.forEach(next.$$route.css, function (sheet) {
                            scope.routeStyles[sheet] = sheet;
                        });
                    }
                });
            }
        };
    }
]);

app.config(['$routeProvider', '$locationProvider',
    function ($routeProvider) {
        //$locationProvider.html5Mode(true);
        $routeProvider.when('/', {
            templateUrl: 'home/homeBody.html',
            controller: 'homeController'
        }).when('/multimedia', {
            templateUrl: 'multimedia/multimedia.html',
            controller:'mediaController',
            css:['multimedia/multimediaStyle.css']
        }).when('/unplugged', {
            templateUrl: 'unplugged/unplugged.html',
            css: ['css/third-party/fontello.css', 'css/third-party/foundation.min.css', 'css/third-party/freelancer.css', 'css/myStyle.css']
        }).when('/career', {
            templateUrl: 'career/resume.html',
            css: ['css/third-party/fontello.css', 'css/third-party/foundation.min.css', 'css/third-party/freelancer.css', 'css/myStyle.css']
        }).when('/fun', {
            templateUrl: 'fun/game.html',
            controller:'gameController',
            css: ['css/third-party/foundation.min.css', 'css/third-party/freelancer.css', 'css/myStyle.css']
        }).otherwise({
            redirectTo: '/'
        });
    }]);
