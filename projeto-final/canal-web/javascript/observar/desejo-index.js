$(document).ready(function(){
	if($("body").hasClass("desejoIndex")){
		DesejoIndex.init();
	}
});

DesejoIndex = {

	id: null,
	
	table: null,
		
	init: function(){
		this.buscaInicial();
		DesejoIndex.acoesDeElementos();
		DesejoIndex.buscarFaltaPagar();
	},
		
	acoesDeElementos : function(){
		$("#anos").unbind().click(function(e){
			window.location = "conta-anos.php";
		});

		$(".btn-excluir-confirmar").unbind().click(function(e){
			e.preventDefault();
			$('#delete-modal').modal('hide');
			DesejoIndex.deleteEntity();
		});
		
		$(".btn-excluir").click(function(e){
			e.preventDefault();
			var id = $(this).parent().parent().data("id");
			$("#id").val(id);
		});
		
		$(".btn-editar").click(function(e){
			e.preventDefault();
			
			var id = $(this).parent().parent().data("id");
			$("#id").val(id);
			var busca = Geral.getParameterByName("busca");
			window.location = "conta-edit.php?id="+id+"&busca="+busca;
		});

		// $("#search").parent().find("button").click(function(e){
		// 	DesejoIndex.find();
		// });

		$('#search').on( 'keyup', function () {
		    DesejoIndex.table.search( this.value ).draw();
		} );
		
		$(".prioridades").unbind().click(function(e){
			e.preventDefault();
			$("#prioridades").toggle();
			DesejoIndex.trocarFundosDasPrioridades();
		});

		$(".paginacao").unbind().click(function(e){
			e.preventDefault();
			$("#bottom").toggle();
		});

		$(".pesquisa").unbind().click(function(e){
			e.preventDefault();
			$(".search").toggle();
		});
		
		$(".mes-atual").unbind().click(function(e){
			e.preventDefault();
			DesejoIndex.buscarContasDoMes();
		});
		
		$(".todos-meses").unbind().click(function(e){
			e.preventDefault();
			$("#meses").toggle();
		});
		
		$(".mes").unbind().click(function(e){
			e.preventDefault();
			DesejoIndex.buscarPorMes(this);
		});
		
		$("#nova_conta").unbind().click(function(e){
			e.preventDefault();
			var busca = Geral.getParameterByName("busca");
			window.location = "conta-edit.php?busca="+busca;
		});
	},

	buscarFaltaPagar: function(){
		var busca = Geral.getParameterByName("busca");

		ContaService.buscarFaltaPagar(busca)
		.success(function(response){
			var resultado = response.conta;
			var total = DesejoIndex.calcularFaltaPagar(resultado);
			$("#resumo2 #falta-pagar .resumo-valor").html(total);
			MoneyUtil.formatCurrency();
		})
		.fail(function(response){
			Geral.apresentarMensagem("Ocorreu um erro.", 4, "erro");
		});
	},

	calcularFaltaPagar: function(resultado){
		var total = 0;
		var cont = 0;
		for (var i = 0; i<resultado.length; i++) {
			var valor = MoneyUtil.converterValorLiteralEmFloat(resultado[i]["valor"]);
			total += valor;
			cont++;
		}
		$("#cont-falta-pagar").html(cont);
		return total;
	},

	buscaInicial: function(){
		
		var busca = Geral.getParameterByName("busca");
		
		var url = "api.php/conta?order=vencimento&page=1,200&transform=1&filter[]=vencimento,cs,"+busca; 
		var type = "GET"; 
		var data = "";

		Geral.aplicarLoading();

		//chamada
		AjaxService.call(url, type, data)
		.success(function(response){
			var vos = response.conta;

			$(".mes span").html("");
			Geral.removerLoading();
			DesejoIndex.preencherTabelaDeCadastro(vos);
			$(".total").html("("+ vos.length +")");

			DesejoIndex.acoesDeElementos();
			Geral.removerLoading();
			DesejoIndex.table = $(".table").DataTable({
				"pageLength": 100,
				"language": {
	                "url": "js/vendor/datatables/Portuguese-Brasil.json"
	            },
	            "dom": 'lrtip'
			});
			
		})
		.fail(function(response){
			Geral.apresentarMensagem("Ocorreu um erro.", 4, "erro");
			Geral.removerLoading();
		});
	},

	preencherTabelaDeCadastro: function(vos){
		var $container = $(".listagem");
		$container.empty();
		
		if(Geral.valorValido(vos)){
			var cont = 0;
			vos.forEach(function(entity){
				DesejoIndex.adicionarLinha($container, entity, ++cont);
				DesejoIndex.validarStatus(entity);
			});
			
			MoneyUtil.formatCurrency();

			$("#resumo #saida .resumo-valor").html(MoneyUtil.calcularSaida());
			$("#resumo #entrada .resumo-valor").html(MoneyUtil.calcularEntrada());
			$("#resumo #balanco-do-mes .resumo-valor").html(MoneyUtil.calcularBalanco());
			$("#resumo2 #ja-pago .resumo-valor").html(MoneyUtil.calcularJaPago());
			
			$("#resumo #prioridade0 .resumo-valor").html(MoneyUtil.calcularPrioridade(0));
			$("#resumo #prioridade1 .resumo-valor").html(MoneyUtil.calcularPrioridade(1));
			$("#resumo #prioridade2 .resumo-valor").html(MoneyUtil.calcularPrioridade(2));
			$("#resumo #prioridade3 .resumo-valor").html(MoneyUtil.calcularPrioridade(3));
			$("#resumo #prioridade4 .resumo-valor").html(MoneyUtil.calcularPrioridade(4));
			
			
			MoneyUtil.formatCurrency();
		}
	}, 
	
	validarStatus: function(entity){
		var $labelDeStatus = $("#status_"+entity.id);
		if(Geral.valorValido(entity.efetuado)){
			$labelDeStatus.addClass("label-success");
		}else{
			$labelDeStatus.addClass("label-danger");
		}
	},
	
	adicionarLinha: function($container, entity, cont){
		entity.vencimento = $.datepicker.formatDate('dd/mm/yy', new Date(entity.vencimento));

		var element ='' +
		'<tr data-id="'+entity.id+'" >' +
		'	<td>'+cont+'</td>' +
		'	<td class="hide">'+entity.id+'</td>' +
		'	<td>'+entity.vencimento+'</td>' +
		'	<td>'+entity.efetuado+'</td>' +
		'	<td>'+entity.descricao+'</td>' +
		'	<td class="hide">'+entity.forma+'</td>' +
		'	<td class="valor formatCurrency">'+entity.valor+'</td>' +
		'	<td class="valorPago formatCurrency">'+entity.valorPago+'</td>' +
		'	<td> <span class="status label" id="status_'+entity.id+'">--</span></td>' +
		'	<td> <span class="categoria categoria_'+entity.categoria+'">'+entity.categoria+'</span></td>' +
		'	<td class="actions">' +
		'		<a class="btn btn-success btn-xs btn-editar"" href="#">Editar</a>' +
		'		<a class="btn btn-danger btn-xs btn-excluir"  href="#" data-toggle="modal" data-target="#delete-modal">Excluir</a>' +
		'	</td>' +
		'</tr>';
		
		$container.append(element);
	},
	
	deleteEntity: function(){
		var id = $("#id").val();
		
		Geral.aplicarLoading();
		ContaService.deleteEntity(id)
		.success(function(response){
			Geral.removerLoading();
			Geral.apresentarMensagem("sucesso!", 3, "sucesso");
			setTimeout(DesejoIndex.removerLinha, 3000, id);
		})
		.fail(function(response){
			Geral.removerLoading();
			Geral.apresentarMensagem("Ocorreu um erro.", 4, "erro");
		});
	},

	removerLinha: function(id){
		$(".listagem tr[data-id='"+id+"']").fadeToggle();
	},
	
}