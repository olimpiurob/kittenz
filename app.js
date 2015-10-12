var app=angular.module('kittenz',['ngRoute', 'kittenzControllers']);
app.config(function($routeProvider){
      $routeProvider
          .when('/',{
                templateUrl: 'pages/home.html',
                controller: 'kittenzController'
          })
          .when('/kittenz',{
                templateUrl: 'pages/kittenz.html',
                controller: 'kittenzController'
          })
          .when('/kittenz/:kittenId',{
                templateUrl: 'pages/details.html',
                controller: 'kittenDetailController'
          })
          .otherwise({
            redirectTo: '/kittenz'
          });;
});

app.factory('kittenzFactory', function() {
  var kittenz = [
      {'id': 1, 'name': 'Fluffy'},
      {'id': 2, 'name': 'Puffy (Not the rapper)'},
      {'id': 3, 'name': 'Muffin'},
      {'id': 4, 'name': 'Snowball'},
      {'id': 5, 'name': 'Grumpy'},
      {'id': 6, 'name': 'Lorem'},
      {'id': 7, 'name': 'Ipsum'},
      {'id': 8, 'name': 'Ran out of names'}
  ];
  var factory = {};
  factory.getKittenz = function () {
    return kittenz;
  }

  return factory;
});

var kittenzControllers = angular.module('kittenzControllers', []);
kittenzControllers.controller('kittenzController',['$scope', 'kittenzFactory', function($scope, kittenzFactory) {
  $scope.kittenz = kittenzFactory.getKittenz();
}]);

kittenzControllers.controller('kittenDetailController', ['$scope', '$routeParams', '$filter', 'kittenzFactory',
  function($scope, $routeParams, $filter, kittenzFactory) {
    $scope.kitten = $filter('filter')(kittenzFactory.getKittenz(), {id: $routeParams.kittenId})[0];
  }]);
