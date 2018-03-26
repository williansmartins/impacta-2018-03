angular.module('controlei')
.controller('ContasController', ['$scope', '$compile', '$uibModal', '$log', '$document', '$location', '$window', '$filter', '$localStorage', 'ContasService', '$anchorScroll', '$filter', '$rootScope',
	function ($scope, $compile, $uibModal, $log, $document, $location, $window, $filter, $localStorage, ContasService, $anchorScroll, $filter, $rootScope) {

    var meses = [];
    var valoresDasContas = [];
    var valoresDoGrafico = [];
    var movimentacoes = [];

    $scope.$storage = $localStorage;
    $scope.contas = null;

    //resumo
    $scope.totalEntradas = 0;
    $scope.totalSaidas = 0;
    $scope.quantidadeDeEntradas = 0;
    $scope.quantidadeDeSaidas = 0;
    $scope.totalContasPagas = 0;
    $scope.quantidadeDeContasPagas = 0;
    $scope.totalContasAPagar = 0;
    $scope.quantidadeContasAPagar = 0;

    $scope.anoAtual;
    $scope.mesAtual;

    //flags
    $scope.flagResumo = true;
    $scope.flagPesquisa = true;
    $scope.flagSemConteudo = true;
    $scope.flagIncAlt = false;
    $scope.flagGrafico = true;
    $scope.flagClean = true;

    $scope.required = true;
    $scope.isW = false;
    
    $scope.conta = {
        vencimento: "",
        efetuado: "",
        codigo: "",
        descricao: "",
        forma: "",
        valor: "",
        valorPago: "",
        categoria: "",
    };

    $scope.formats = ['yyyy-MM-dd', 'dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate', 'yyyy-MM'];
    $scope.format = $scope.formats[0];
    $scope.altInputFormats = ['M!/d!/yyyy'];
	$scope.dataClonada = new Date(new Date().setMonth(new Date().getMonth() + 1));
	
	$scope.dynamicPopover = {
		templateUrl: 'myPopoverTemplate.html',
		title: 'Vamos clonar?',
		show: false,
		contador: 0
	};

    $scope.dateOptions = {
        formatYear: 'yy',
        maxDate: new Date(2020, 5, 22),
        minDate: new Date(1982, 7, 8),
        startingDay: 1
    };

    $scope.dateOptionsClone = {
        minDate: new Date(),
        maxDate: new Date(2020, 5, 22),
        startingDay: 1,
        showWeeks: true,
        startView: 3
    };

    $scope.popup1 = {
        opened: false
    };

    $scope.popup2 = {
        opened: false
    }

    $scope.open1 = function() {
        $scope.popup1.opened = true;
    };

    $scope.open2 = function() {
        $scope.popup2.opened = true;
    };

    $scope.setDate = function(year, month, day) {
        $scope.dt = new Date(year, month, day);
    };  
    
    var nomesDosMeses = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];

    $scope.clonar = function(){

    	angular.forEach($scope.contas, function(conta){
    		var contaNova = tratarConta(conta);
    		gerarContaClonada(contaNova);
    	});

    	//alert("Clone efetuado com sucesso! Cuidado, grandes poderes trazem grandes responsabilidades!");
    	$scope.dynamicPopover.show = false;

    }    

    $scope.excluirTodas = function(){
    	angular.forEach($scope.contas, function(conta){
    		excluirVarias(conta);
    	});
    }

    var tratarConta = function(conta){
    	var contaNova = angular.copy(conta);

    	console.info(contaNova);    	

    	//removendo id
    	contaNova.id = null;
    	contaNova.created_at = new Date();
    	contaNova.updated_at = new Date();
    	contaNova.valorPago = "";
    	contaNova.efetuado = "";


    	//trocando o mes
   		contaNova.vencimento = contaNova.vencimento.replace($scope.anoAtual+"-"+$scope.mesAtual, $filter('date')($scope.dataClonada, "yyyy-MM"));

    	//tratando fevereiro
    	if($filter('date')($scope.dataClonada, "MM") == "02"){
    		//dia acima de 28
    		if(contaNova.vencimento.substring(8) == 29 || contaNova.vencimento.substring(8) == 30 || contaNova.vencimento.substring(8) == 31){
	    		contaNova.vencimento = contaNova.vencimento.substring(0, 7) + "-28"
    		}

    	}

    	return contaNova;

    }

    $scope.buscarNomeDoMes = function(indice){
        var numeroDoMes = parseInt($scope.mesAtual) + indice;
        if(numeroDoMes==-2){numeroDoMes=10}
        if(numeroDoMes==-1){numeroDoMes=11}
        if(numeroDoMes==0){numeroDoMes=12}
        if(numeroDoMes==13){numeroDoMes=1}
        if(numeroDoMes==14){numeroDoMes=2}
        if(numeroDoMes==15){numeroDoMes=3}
        return nomesDosMeses[numeroDoMes-1];
    }

    var getAnoMesByIndice = function(mes, ano, indice){
        var date = new Date( parseInt(ano,10), parseInt(mes,10)-1, parseInt(01,10) );
        date.setMonth(date.getMonth() + (indice));

        //atualiza o ano e mes sendo apresentado
        $scope.anoAtual = date.getFullYear();
        $scope.mesAtual = addZ(date.getMonth()+1);
        
        return date.getFullYear()+"-"+(addZ(date.getMonth()+1));
    }

    var addZ = function(n){
        return n<10? '0'+n:''+n;
    }

    $scope.scrollTo = function(location){
        $location.hash(location);
        $anchorScroll.yOffset = 100;
        $anchorScroll();
    }

    $scope.buscarContasAtuais = function(){
        $scope.anoAtual = new Date().getFullYear();
        $scope.mesAtual = addZ(new Date().getMonth()+1);
        $scope.anoMes = getAnoMesByIndice($scope.mesAtual, $scope.anoAtual, 0);

        $scope.buscarContas();
    } 

    $scope.buscarPorIndice = function(indice){
        $scope.anoMes = getAnoMesByIndice($scope.mesAtual, $scope.anoAtual, indice);
        $scope.buscarContas();
    }

    $scope.buscarContas = function(){
        ContasService.buscarContas($scope.anoMes.substring(0,4),$scope.anoMes.substring(5,7))
        .success(function(response){
            $scope.contas = response;
            if( $scope.contas.length!=0 ){
                $scope.flagSemConteudo = false;

                //tratar temporariamente(para producao) os valores que deveriam ser:
                //- R$ 200,33 --> -200.00
                //tratamentoTemporario();

                $scope.calcTotal();
                apresentarGrafico(111, 222, 333);
            }else{
                $scope.mensagem = "Não há registros para esta data.";
                $scope.flagSemConteudo = true;
                limparGrafico();
                limparTotalizadores();
            }
        })
        .error(function(response){
            // Geral.apresentarMensagem("Ocorreu um erro.", 4, "erro");
            $scope.mensagem = "Erro ao buscar registros para esta data.";
            $scope.flagSemConteudo = true;
        });
    }

    var limparTotalizadores = function(){
        $scope.totalEntradas = 0;
        $scope.totalSaidas = 0;
        $scope.quantidadeDeEntradas = 0;
        $scope.quantidadeDeSaidas = 0;
        $scope.totalContasPagas = 0;
        $scope.quantidadeDeContasPagas = 0;
        $scope.totalContasAPagar = 0;
        $scope.quantidadeContasAPagar = 0;
    }

    $scope.calcTotal = function(){
        limparTotalizadores();
        angular.forEach($scope.contas, function(conta){

            //olhando crédito e débitos
            if(conta.valor>0){
                $scope.totalEntradas += parseFloat(conta.valor);
                $scope.quantidadeDeEntradas++;
            }else{
                $scope.totalSaidas += parseFloat(conta.valor);
                $scope.quantidadeDeSaidas++;

                if(conta.valorPago==null || conta.valorPago==0){
                    $scope.totalContasAPagar -= parseFloat(conta.valor);
                    $scope.quantidadeContasAPagar++;
                }
            }

            //olhar as contas pagas
            if(conta.valorPago<0){
                $scope.totalContasPagas += parseFloat(conta.valorPago);
                $scope.quantidadeDeContasPagas++;
            }
        });

        $scope.balanco = $scope.totalEntradas - $scope.totalSaidas;
    }

    $scope.novaConta = function(){
        $scope.flagIncAlt = true;
        //$scope.scrollTo("incAlt");
        $scope.conta = {
            vencimento: new Date(),
            efetuado: "",
            codigo: "",
            descricao: "",
            forma: "",
            valor: "",
            valorPago: "",
            categoria: "",
        };
    }

    $scope.salvar = function(){
        $scope.flagIncAlt = false;

        if(isEmpytNullOrUndefined($scope.conta.id)){
            ContasService.inserir($scope.conta)
            .success(function(response){
                $scope.buscarContas();
                $scope.conta = new Object();
            })
            .error(function(response){
                console.error(response);
                $scope.mensagem("Ocorreu um erro.");
            });
        }else{
            ContasService.atualizar($scope.conta)
            .success(function(response){
                $scope.buscarContas();
                $scope.conta = new Object();
            })
            .error(function(response){
                console.error(response);
                $scope.mensagem("Ocorreu um erro.");
            });
        }
    }

    var gerarContaClonada = function(conta){

    	ContasService.inserir(conta)
        .success(function(response){
            console.info("Clone efetuado com sucesso!");
        })
        .error(function(response){
            console.error(response);
            console.info("Ocorreu um erro.");
        });
    }

    var deletar = function(conta){

    	ContasService.inserir(conta)
        .success(function(response){
            console.info("Clone efetuado com sucesso!");
        })
        .error(function(response){
            console.error(response);
            console.info("Ocorreu um erro.");
        });
    }

    $scope.cancelar = function(){
        $scope.flagIncAlt = false;
    }

    $scope.editar = function(contaParaEditar){
        $scope.flagIncAlt = true;
        $scope.conta = contaParaEditar;

        if( $scope.conta.vencimento!=null && !($scope.conta.vencimento instanceof Date)){
            $scope.conta.vencimento = criarData($scope.conta.vencimento);
        }

        if( $scope.conta.efetuado!=null && !($scope.conta.efetuado instanceof Date) ){
            $scope.conta.efetuado = criarData($scope.conta.efetuado);
        }
        
    }

    $scope.excluir = function(conta){
        ContasService.excluir(conta.id)
        .success(function(response){
            $scope.buscarContas();
            $scope.conta = new Object();
        })
        .error(function(response){
            console.error(response);
            $scope.mensagem("Ocorreu um erro.");
        });
    }

    $scope.mudarSinal = function(sinal){
    	if( sinal == 'positivo' ) {
    		if (Math.sign( $scope.conta.valor ) == -1) {
    			$scope.conta.valor = $scope.conta.valor * -1;
    		}
    	}else{
    		if (Math.sign( $scope.conta.valor ) == 1) {
    			$scope.conta.valor = $scope.conta.valor * -1;
    		}
    	}
    }

    var excluirVarias = function(conta){
        ContasService.excluir(conta.id)
        .success(function(response){
            console.info("conta excluida com sucesso - id:" + conta.id);
        })
        .error(function(response){
            console.error(response);
        });
    }

    var limparGrafico = function(){
        var graficoWrapper = document.getElementById("grafico-wrapper");
        graficoWrapper.innerHTML = "";

        var canvas = document.createElement("canvas");
        canvas.className  = "myClass";
        canvas.id = "myChart2";
        graficoWrapper.appendChild(canvas);
    }

    var apresentarGrafico = function(disponivel, utilizado, total){
        var graficoWrapper = document.getElementById("grafico-wrapper");
        graficoWrapper.innerHTML = "";

        var canvas = document.createElement("canvas");
        canvas.className  = "myClass";
        canvas.id = "myChart2";
        graficoWrapper.appendChild(canvas);
        

        // var meses = ["01/08", "01/08", "02/08", "03/08", "04/08", "04/08", "05/08", "05/08", "05/08", "05/08", "05/08", "05/08", "06/08", "09/08", "10/08", "10/08", "10/08", "10/08", "12/08", "12/08", "12/08", "15/08", "15/08", "19/08", "20/08", "20/08", "20/08", "20/08", "20/08", "20/08", "25/08", "26/08", "30/08", "30/08", "30/08"];
        // var valoresDasContas = [0.00, -300.00, -25.90, 4000.00, 200.00, -388.30, 670.00, 500.00, 350.00, -482.03, -230.00, -624.00, -31.67, -500.00, -277.66, -225.09, -294.35, -298.22, -704.00, -22.20, -1900.00, 4020.97, -352.00, -22.90, 850.00, -400.00, -950.00, -59.90, -1779.37, -530.00, -1500.00, -29.35, 500.00, -92.79, -1000.00];
        // var valoresDoGrafico = [-440.06, -740.06, -765.96, 3234.04, 3434.04, 3045.74, 3715.74, 4215.74, 4565.74, 4083.71, 3853.71, 3229.71, 3198.04, 2698.04, 2420.38, 2195.29, 1900.94, 1602.72, 898.72, 876.52, -1023.48, 2997.49, 2645.49, 2622.59, 3472.59, 3072.59, 2122.59, 2062.69, 283.32, -246.68, -1746.68, -1776.03, -1276.03, -1368.82, -2368.82, -2368.82, -2368.82, -2368.82];
        // var movimentacoes = ["mes anterior", "itau - festa", "Tarifa Itau", "Emprestimo Original", "aluguel cotia - diferença", "Iptu - AP (ago/Dez)", "Aluguel Jandira", "Gracie Barra", "Fotos Nayara", "Juros - Caixa", "Material de construção Telha Norte(1/10)", "natação", "Integrator - Waiso", "Creche do Fefê", "Seguro Carro (4/7)", "Condomínio - Casa", "Condomínio - AP", "Material de Construção Nascimento (5/10)", "Manutenção Carro (3/3)", "Tarifa Bradesco", "Cartão Santander", "GFT - adiantamento", "Condomínio - Terreno", "Netflix", "Aluguel Cotia", "Cartão Caixa 5/6", "Armário Escritorio (3/4)", "Internet", "Parcela Casa", "Armário cozinha (1/6)", "Cartão Ná Itau", "Tarifa Caixa", "GFT - pagamento", "Eletropaulo - Luz ( DA )", "Tia Cá Total R$ 1.000/9.500,00(parcela 1)"];
        
        // var meses = buscarDias();
        // var valoresDasContas = [0, -200];
        // var valoresDoGrafico = [0, -200];
        // var movimentacoes = ["0", "200"];
        buscarValores();

        var presets = window.chartColors;
        var utils = Samples.utils;

        var config2 = {
          type: 'line',
          data: {
            labels: meses,
            datasets: [
                    {
                        label: 'R$',
                        movimentacao: movimentacoes,
                        valoresDasContas: valoresDasContas,
                        data: valoresDoGrafico,
                        borderWidth: 2,
                        backgroundColor: utils.transparentize('rgb(255, 99, 132)'),
                        borderColor: presets.red,
                    }
                ]
          },
          options: {
            legend: {
                display: false
            },
            tooltips: {
                filter: function (tooltipItem) {
                    return tooltipItem.datasetIndex === 0;
                },
                callbacks: {
                    label: function(tooltipItem, data) {
                        var datasetLabel = data.datasets[tooltipItem.datasetIndex].label || 'Other';
                        var movimentacao = data.datasets[tooltipItem.datasetIndex].movimentacao[tooltipItem.index] || 'Other';
                        var valorDoGrafico = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] || 'Other';
                        var valorDaConta = data.datasets[tooltipItem.datasetIndex].valoresDasContas[tooltipItem.index] || 'Other';
                        var dia = data.labels[tooltipItem.index];
                        return dia + "-Banco: R$ " + valorDoGrafico + " - Movimentacao: "+ movimentacao + "(R$ "+valorDaConta+")";
                    }
                }
            },

            maintainAspectRatio: false,
            spanGaps: false,
            elements: {
                line: {
                    tension: 0.4
                }
            },
            plugins: {
                filler: {
                    propagate: false
                }
            },
            scales: {
                xAxes: [{
                    ticks: {
                        autoSkip: false,
                        maxRotation: 0
                    }
                }]
            }
          }
        }

        var ctx2 = document.getElementById("myChart2");
        myChart2 = new Chart(ctx2, config2);

    }

    var tratamentoTemporario = function(){
        angular.forEach($scope.contas, function(value, key){
            value.valor = converterValorLiteralEmFloat(value.valor);
        });
    }

    var buscarValores = function(){
        $scope.contas = $filter('orderBy')($scope.contas, 'vencimento', false) ;
        meses = [];
        valoresDasContas = [];
        valoresDoGrafico = [];
        movimentacoes = [];

        var novoValor = 0;

        angular.forEach($scope.contas, function(value, key){
            meses.push(value.vencimento.substring(8, 10));
            valoresDasContas.push(value.valor);
            movimentacoes.push(value.descricao);
            novoValor += parseFloat( value.valor );
            valoresDoGrafico.push(novoValor.toFixed(2));
        });
    }

    var tratarTipo = function(){
        $scope.isW = $localStorage.tipo=="w";
    }

    var atualizarTopico = function(){
    	var objetoGlogal = {
        	"localstorage" : $localStorage,
        	"flagMostrarMenu" : true
        }

        $rootScope.$broadcast('topic', objetoGlogal);
    }

    init = function() {
        $scope.mesAtual = $filter('date')(new Date(), 'MM');
        $scope.anoAtual = $filter('date')(new Date(), 'yyyy');
        $scope.buscarPorIndice(0);
        tratarTipo();
        atualizarTopico();
    };
    
	init();
}]);