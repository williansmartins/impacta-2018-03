angular.module('app', [])
.controller('UsuarioController', function($scope, UsuarioService) {
	
	$scope.resposta = false;
	$scope.usuario = {
		"email" : "contato@williansmartins.com",
		"senha" : "secreta"
	}

	$scope.logar = function(){
		UsuarioService.logar($scope.usuario).then(
			function(resposta){
				console.info(resposta);

				if(resposta.data.sucesso){
					$scope.resposta = true;
				}
			}, 
			function(resposta){
				$scope.resposta = false;
				console.info(resposta);
			}
		);
	}
});