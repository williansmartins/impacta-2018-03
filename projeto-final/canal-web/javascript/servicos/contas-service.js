angular
.module('controlei')
.factory('ContasService', ContasService);

function ContasService ($q, $window, $http) {
    return {

        buscarContas : function (ano, mes) {
            return $http({
                method : "GET",
                url : barramento + "/api/v1/conta/ano/"+ano+"/mes/"+mes
            })
        },

        inserir : function (objeto) {
            // objeto.vencimento = inverterData(objeto.vencimento);
            // objeto.efetuado = inverterData(objeto.efetuado);

            return $http({
                method : "POST",
                url : barramento + "/api/v1/conta",
                data: objeto
            })
        },

        atualizar : function (objeto) {
            // objeto.vencimento = inverterData(objeto.vencimento);
            // objeto.efetuado = inverterData(objeto.efetuado);

            return $http({
                method : "PUT",
                url : barramento + "/api/v1/conta/"+ objeto.id,
                data: objeto
            })
        },

        excluir : function (id) {
            return $http({
                method : "DELETE",
                url : barramento + "/api/v1/conta/"+id
            })
        },

    };
}