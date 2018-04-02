angular.module('app', [])
.controller('AdminController', function($scope, $window) {
	
	var sessao = $window.localStorage;
	$scope.usuario = {
		"nome" : ""
	}

	$scope.sair = function(){
		window.location = "index.html";
	}

	$scope.voltar = function(){
		window.location = "admin.html";
	}

	$scope.apresentarGerenciarUsuarios = function(){
		window.location = "usuarios.html";
	}

	var init = function(){
		$scope.usuario.nome = sessao.usuario_nome;
	}

	init();

});