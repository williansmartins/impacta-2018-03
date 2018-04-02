angular.module('app', [])
.controller('AdminController', function($scope, $window) {
	
	var sessao = $window.localStorage;
	$scope.usuario = {
		"nome" : ""
	}

	$scope.sair = function(){
		window.location = "index.html";
	}

	var init = function(){
		// console.info(sessao.usuario_nome);
		$scope.usuario.nome = sessao.usuario_nome;
	}

	init();

});