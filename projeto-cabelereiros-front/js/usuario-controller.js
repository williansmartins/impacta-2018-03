angular.module('app', [])
.controller('UsuarioController', function($scope, UsuarioService) {
	
	$scope.resposta = false;
	$scope.usuario = {
		"email" : "professorwillians@gmail.com",
		"senha" : "secreta"
	}

	$scope.logar = function(){
		UsuarioService.inserir($scope.usuario).then(
			function(resposta){
				$scope.resposta = true;
			}, 
			function(resposta){
				$scope.resposta = false;
			}
		);
	}
});