angular.module('app', [])
.controller('AdminController', function($scope, $window, $http) {
	
	var sessao = $window.localStorage;
	$scope.usuario = {
		"nome" : ""
	}
	$scope.usuarios = null;

	$scope.sair = function(){
		window.location = "index.html";
	}

	$scope.voltar = function(){
		window.location = "admin.html";
	}

	$scope.apresentarGerenciarUsuarios = function(){
		window.location = "usuarios.html";
	}

	var buscarUsuarios = function(){
		$http({
            method : "GET",
            url : back + "/cabelereiro-back/rest/usuario/buscar"
        }).then(function(response){
        	$scope.usuarios = response.data.objeto;
        }, function(response){
        	alert("deu pau");
        });

	}

	var init = function(){
		$scope.usuario.nome = sessao.usuario_nome;
		buscarUsuarios();
		

		
	}

	init();

});