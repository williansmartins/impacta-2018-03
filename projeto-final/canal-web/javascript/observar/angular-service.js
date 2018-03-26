angular.module('myApp')

.factory('currencyConverter', function() {
  var currencies = ['USD', 'EUR', 'CNY'];
  var usdToForeignRates = {
    USD: 1,
    EUR: 0.74,
    CNY: 6.09
  };
  var convert = function() {
    return 123;
  };

  return {
    currencies: currencies,
    convert: convert
  };
})  