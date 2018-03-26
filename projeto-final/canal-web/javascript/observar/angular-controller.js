angular.module('myApp')

.controller('MyController', ['$scope','currencyConverter', function ($scope, currencyConverter) {
  $scope.greeting = 'Hola!';
  $scope.valor = currencyConverter.currencies;
}]);