angular.module('controlei')
  
.controller('CartaoController', ['$scope','CartaoService', function ($scope, CartaoService) {
   
    $scope.mostrarNovoValor = '';
    $scope.mostrarExcluir = '';
    $scope.mostrarNovo = true;

    $scope.novoValor = null;
    $scope.idDoBanco;
    $scope.nomeNovoBanco;
    $scope.total = 0;
    
    $scope.metodo = function() {
        $scope.mostrarNovo=false;
        angular.element('.nomeNovoBanco').trigger('focus');
    };
    
    $scope.salvarNovoBanco = function() {
        $scope.mostrarNovo=true;
        console.info("Criando novo banco: " + $scope.nomeNovoBanco);
        
        CartaoService.salvarNovoBanco($scope.nomeNovoBanco)
        .success(function(response){
            console.info("sucesso");
             $scope.nomeNovoBanco = "";
            $scope.init();
        })
        .error(function(response){
            console.info(response);
        }); 
        
    };
    
    $scope.adicionarNovoValor = function(valorDigitado, idDoBanco) {
        $scope.novoValor = valorDigitado;
        $scope.idDoBanco = idDoBanco;

        console.info("Salvando valor: " + $scope.novoValor + " no banco: " + $scope.idDoBanco);
        
        CartaoService.salvarNovoValor($scope.novoValor, $scope.idDoBanco)
        .success(function(response){
            console.info("sucesso");
            $scope.init();
        })
        .error(function(response){
            console.info(response);
        }); 
        
    };

    $scope.delete = function(idValor) {
        console.info("Deletando valor: " + idValor);
        
        CartaoService.deletarValor(idValor)
        .success(function(response){
            console.info("sucesso");
            $scope.init();
        })
        .error(function(response){
            console.info(response);
        }); 
        
    };

    $scope.deleteFilhos = function(idPai) {
        console.info("Deletando valor: " + idPai);
        
        CartaoService.deleteFilhos(idPai)
        .success(function(response){
            console.info("sucesso");
            $scope.init();
        })
        .error(function(response){
            console.info(response);
        }); 
        
    };

    $scope.deleteBanco = function(id) {
        console.info("Deletando banco: " + id);
        
        //
        CartaoService.deletarBanco(id)
        .success(function(response){
            if(response!=null){
                console.info("sucesso");
                $scope.init();
            }else{
                alert("Ocorreu um erro ao excluir, será que este banco possui dados de entrada ainda?");
            }
        })
        .error(function(response){
            console.info(response);
        }); 
        
    };

    $scope.buscarCartoes = function(){
        CartaoService.buscarCartoes()
        .success(function(response){
            $scope.cartoes = response.cartao;
            $scope.total = 0;

            for (var i = 0; i < $scope.cartoes.length; i++) {
                console.info(i); 
                var valores = $scope.cartoes[i].valores;
                if(valores[0]!=undefined){
                    $scope.total += parseFloat(valores[valores.length-1].valor);
                    console.info("Primeiro: " + valores[valores.length-1].valor)
                }
            }
        })
        .error(function(response){
            console.info(response);
        }); 
    }

    $scope.hoverIn = function(){
        this.hoverEdit = true;
    };

    $scope.hoverOut = function(){
        this.hoverEdit = false;
    };

    $scope.deleteIn = function(){
        this.deleteEdit = true;
    };

    $scope.deleteOut = function(){
        this.deleteEdit = false;
    };

    $scope.init = function() {
       $scope.buscarCartoes();
    };

    $scope.init();
}]);