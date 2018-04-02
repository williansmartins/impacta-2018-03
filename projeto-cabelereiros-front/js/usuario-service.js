angular
.module('app')
.factory('UsuarioService', UsuarioService);

function UsuarioService ($http) {
    return {

        buscar : function () {
            return $http({
                method : "GET",
                url : back + "/cabelereiro-back/rest/usuario/buscar"
            })
        },

        logar : function (entidade) {
            return $http({
                method : "POST",
                url : back + "/cabelereiro-back/rest/usuario/logar",
                data: entidade
            })
        },

        inserir : function (entidade) {
            return $http({
                method : "POST",
                url : back + "/cabelereiro-back/rest/usuario/inserir",
                data: entidade
            })
        },

        atualizar : function (entidade) {
            return $http({
                method : "PUT",
                url : back + "/api/v1/conta/"+ entidade.id,
                data: entidade
            })
        },

        excluir : function (id) {
            return $http({
                method : "DELETE",
                url : back + "/api/v1/conta/"+id
            })
        },

    };
}