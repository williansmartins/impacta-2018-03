angular.module('app', [])
.controller('UsuarioController', function($scope, UsuarioService, $window) {
	
	$scope.flagErro = false;
	$scope.mensagem = "";
	$scope.flagApresentarLogin = true;

	var sessao = $window.localStorage;

	var limparCampos = function(){
		$scope.usuario = {
			"email" : "",
			"senha" : "",
			"id" : "",
			"tipo" : null,
			"nome" : ""
		}
	}

	$scope.preencherUsuario = function(){
		$scope.usuario = {
			"email" : "admin1@cabelereiros.com.br",
			"senha" : "abc123"
		}
	}

	$scope.apresentarLogin = function(flag){
		$scope.flagApresentarLogin = flag;
	}

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
				$scope.mensagem = "Erro ao fazer login";
				console.info(resposta);
			}
		);
	}

	$scope.cadastrar = function(){
		UsuarioService.inserir($scope.usuario).then(
			function(resposta){
				console.info(resposta);

				if(resposta.data.sucesso){
					$scope.flagErro = false;
					limparCampos();
					alert("sucesso ao inserir");
					$scope.flagApresentarLogin = true;
				}else{
					alert("erro ao inserir");
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

	var init = function(){
		limparCampos();
	}

	init();
});