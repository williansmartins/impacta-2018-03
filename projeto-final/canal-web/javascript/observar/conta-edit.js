$(document).ready(function(){
	ContaEdit.init();
});

ContaEdit = {

	id: null,
		
	init: function(){
		//manter dados da busca
		$("#busca").val(Geral.getParameterByName("busca"));
		$("#id").val(Geral.getParameterByName("id"));
		
		$("#codigo").focus();
		$("#vencimento").mask("99/99/9999");
		$("#efetuado").mask("99/99/9999");
		MoneyUtil.aplicarMascaraMoney('#valor');
		MoneyUtil.aplicarMascaraMoney('#valorPago');
		
		$( ".data#vencimento" ).datepicker({
			dateFormat: "dd/mm/yy",
			dayNames: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'],
		    dayNamesMin: ['D','S','T','Q','Q','S','S','D'],
		    dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb','Dom'],
		    monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
		    monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
		    nextText: 'Próximo',
		    prevText: 'Anterior',
		    onSelect: function(dateText, inst) {
		        var date = $(this).val();
		        $("#vencimentoBrasil").val(date);
		    }
		});

		$( ".data#efetuado" ).datepicker({
			dateFormat: "dd/mm/yy",
			dayNames: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'],
		    dayNamesMin: ['D','S','T','Q','Q','S','S','D'],
		    dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb','Dom'],
		    monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
		    monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
		    nextText: 'Próximo',
		    prevText: 'Anterior',
		    onSelect: function(dateText, inst) {
		        var date = $(this).val();
		        $("#efetuadoBrasil").val(date);
		    }
		});

		ContaEdit.findEntity();
		ContaEdit.acoesDeElementos();
	},
	
	acoesDeElementos : function(){
		$("#ovo1").click(function(e){
			e.preventDefault();
			ContaController.ovo1();
		});
		
		$("#form-salvar").submit(function(e){
			e.preventDefault();
			ContaEdit.salvar();
		});
		
		$(".clear.vencimento").click(function(e){
			e.preventDefault();
			$("#vencimento").val("");
			$("#vencimentoBrasil").val("");
			$("#vencimentoBanco").val("");
		});

		$(".clear.efetuado").click(function(e){
			e.preventDefault();
			$("#efetuado").val("");
			$("#efetuadoBrasil").val("");
			$("#efetuadoBanco").val("");
		});


		$(".cancelar").click(function(e){
			e.preventDefault();
			var busca = Geral.getParameterByName("busca");
			setTimeout(Geral.redirecionar, 100, "conta-index.php?&busca="+busca);
		});
		
	},
	
	salvar: function(){
		if($("#acao").val()=="update"){
			ContaEdit.updateEntity();
		}else{
			ContaEdit.saveEntity();
		}
	},

	findEntity: function(){
		ContaEdit.id = Geral.getParameterByName("id");

		if(ContaEdit.id!=""){
			var url = "api.php/conta?transform=1&filter[]=id,eq,"+ContaEdit.id; 
			var type = "GET"; 
			var data = "";

			Geral.aplicarLoading();
			
			AjaxService.call(url, type, data)
			.success(function(response){
				var vo = response.conta;

				ContaEdit.preencherDadosDaEntity(vo);
				$("#acao").val("update");
				Geral.removerLoading();
			})
			.fail(function(response){
				Geral.apresentarMensagem("Ocorreu um erro.", 4, "erro");
				Geral.removerLoading();
			});

		}
	},
	
	saveEntity: function(){
		Geral.aplicarLoading();
		var vencimento = DateUtil.criarData( $("#vencimento").val() );
		$("#vencimento").val($.datepicker.formatDate('yy-mm-dd 00:00:00', vencimento));
		var params = $("#form-salvar").serialize();

		ContaService.createEntity(params)
		.success(function(response){
			Geral.apresentarMensagem("Sucesso!", 3, "sucesso");
			var busca = Geral.getParameterByName("busca");
			setTimeout(Geral.redirecionar, 3000, "conta-index.php?&busca="+busca);
		})
		.fail(function(response){
			Geral.removerLoading();
			Geral.apresentarMensagem("Ocorreu um erro.", 4, "erro");
		});
	},
	
	updateEntity: function(){
		if($("#vencimento").val()!=""){
			var vencimento = DateUtil.criarData( $("#vencimentoBrasil").val() );
			var vencimentoBanco = $.datepicker.formatDate('yy-mm-dd 00:00:00', vencimento);
			$("#vencimento").val(vencimentoBanco); 
		}

		if($("#efetuado").val()!=""){
			var efetuado = DateUtil.criarData( $("#efetuadoBrasil").val() );
			var efetuadoBanco = $.datepicker.formatDate('yy-mm-dd 00:00:00', efetuado);
			$("#efetuado").val(efetuadoBanco);
		}

		var params = $("#form-salvar").serialize();
		
		ContaService.updateEntity(params)
		.success(function(response){
			Geral.apresentarMensagem("Sucesso!", 3, "sucesso");
			$("#vencimento").val($("#vencimentoBrasil").val());
			$("#efetuado").val($("#efetuadoBrasil").val());
		})
		.fail(function(response){
			Geral.apresentarMensagem("Ocorreu um erro.", 4, "erro");
		});

	},
	
	preencherDadosDaEntity: function(entity){
		if(entity[0].vencimento != ""){
			vencimentoBrasil = $.datepicker.formatDate('dd/mm/yy', new Date(entity[0].vencimento));
			vencimentoBanco = entity[0].vencimento;
			$("#vencimentoBanco").val(vencimentoBanco);
			$("#vencimentoBrasil").val(vencimentoBrasil);
			$("#vencimento").val(vencimentoBrasil);
		}

		if(entity[0].efetuado != ""){
			efetuadoBrasil = $.datepicker.formatDate('dd/mm/yy', new Date(entity[0].efetuado));
			efetuadoBanco = entity[0].efetuado;
			$("#efetuadoBanco").val(efetuadoBanco);
			$("#efetuadoBrasil").val(efetuadoBrasil);
			$("#efetuado").val(efetuadoBrasil);
		}

		$(".id").val(entity[0].id);
		$("#forma").val(entity[0].forma);
		$("#valor").val(entity[0].valor);
		$("#valorPago").val(entity[0].valorPago);
		$("#descricao").val(entity[0].descricao);
		$("#categoria").val(entity[0].categoria);
	},

}