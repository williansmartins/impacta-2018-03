angular.module('app', [])
.controller('UsuarioController', function($scope, UsuarioService, $window) {
	
	$scope.flagErro = false;
	$scope.mensagem = "";

	$scope.usuario = {
		"email" : "admin1@cabelereiros.com.br",
		"senha" : "abc123"
	}
	var sessao = $window.localStorage;

	$scope.logar = function(){
		UsuarioService.logar($scope.usuario).then(
			function(resposta){
				console.info(resposta);

				if(resposta.data.sucesso){
					$scope.flagErro = false;
					
					var usuario = resposta.data.objeto[0];
					sessao.usuario_nome = usuario.nome;

					if(usuario.tipo == "ADMINISTRADOR"){
						window.location = "admin.html";
					}else{
						window.location = "funcionario.html";
					}

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