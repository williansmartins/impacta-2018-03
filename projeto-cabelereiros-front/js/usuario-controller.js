angular.module('app', [])
.controller('UsuarioController', function($scope, UsuarioService, $window) {
	
	$scope.flagErro = false;
	$scope.mensagem = "";

	$scope.usuario = {
		"email" : "contato2@williansmartins.com",
		"senha" : "secreta"
	}
	var sessao = $window.localStorage;

	$scope.logar = function(){
		UsuarioService.logar($scope.usuario).then(
			function(resposta){
				console.info(resposta);

				if(resposta.data.sucesso){
					var usuario = resposta.data.objeto[0];
					sessao.usuario_nome = usuario.nome;
					$scope.flagErro = false;
					window.location = "admin.html";
				}else{
					$scope.flagErro = true;
					$scope.mensagem = resposta.data.mensagem;
				}
			}, 
			function(resposta){
				$scope.flagErro = true;
				console.info(resposta);
			}
		);
	}
});