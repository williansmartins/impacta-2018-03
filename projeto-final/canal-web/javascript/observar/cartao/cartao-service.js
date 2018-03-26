angular.module('controlei')
  
.factory('CartaoService', [
    '$http',
    function CartaoService($http) {
        var api = "api.php";

        CartaoService.buscarCartoes = function() {
            return $http({
                method : 'GET',
                url : api + '/cartao?include=valores&transform=1&order=nomeDoBanco' 
            })
        };
        
        CartaoService.salvarNovoValor = function(novoValor, idDoBanco) {
            return $http({
                method : 'POST',
                url : api + '/valores/',
                data: { 'valor' : novoValor, 'data' : new Date(), 'cartao_id' : idDoBanco  }
            })
        };

        CartaoService.salvarNovoBanco = function(nomeNovoBanco) {
            return $http({
                method : 'POST',
                url : api + '/cartao/',
                data: { 'nomeDoBanco' : nomeNovoBanco }
            })
        };
        
        CartaoService.deletarValor = function(idValor) {
            return $http({
                method : 'DELETE',
                url : api + '/valores/'+idValor
            })
        };
        
        CartaoService.deletarBanco = function(id) {
            return $http({
                method : 'DELETE',
                url : api + '/cartao/'+id
            })
        };
        
        return CartaoService;
    }
]);