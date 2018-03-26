var home = "";
var contentType = 'Content-type: text/plain; charset=UTF-8';

$(document).ready(function(){
	Geral.init();
});

Geral = {

	init: function(){
	},

	prepararModais: function(){
		Geral.buscarModalDeMensagem().done(function(response){
			$("body").append(response);
		});
		Geral.buscarModalDeExcluir().done(function(response){
			$("body").append(response);
		});
	},
		
	getParameterByName : function( name ){
	  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	  var regexS = "[\\?&]"+name+"=([^&#]*)";
	  var regex = new RegExp( regexS );
	  var results = regex.exec( window.location.href );
	  if( results == null )
	    return "";
	  else
	    return decodeURIComponent(results[1].replace(/\+/g, " "));
	},
	
	redirecionar: function(url){
		window.location = url;
	},

	aplicarLoading: function() {
		// add the overlay with loading image to the page
//			console.info("loading open...");
        var over = '<div id="overlay">' +
            '<img id="loading" src="img/w9.gif">' +
            '</div>';
        $(over).appendTo('body');

        // click on the overlay to remove it
        $('#overlay').click(function() {
            $(this).remove();
        });

        // hit escape to close the overlay
        $(document).keyup(function(e) {
            if (e.which === 27) {
                $('#overlay').remove();
            }
        });  
    },
    
    removerLoading: function() {
//	    	console.info("loading close...");
    	$('#overlay').remove();
    },
    
	sleep: function(milliseconds) {
	  	var start = new Date().getTime();
	  	for (var i = 0; i < 1e7; i++) {
	    	if ((new Date().getTime() - start) > milliseconds){
	      		break;
	    	}
	    }
	 },
	
	valorValido: function(item){
	 	return ((item!=undefined) && (item!=null) && (item!=""));
	},

	tratarCamposNullos: function(valor){
		if(!Geral.valorValido(valor)){
			valor = "-";
		}

		return valor;
	},

	apresentarMensagem : function(msg, segundos, tipo) {
		$('#mensagem-modal .mensagem').html(msg);
		// $(".modal-content .modal-body").append("<img class='icone'/>");
		// $(".modal-content .modal-body img").attr("src",
		// 		"/img/icone-mensagem-" + tipo + ".png");
		
		//se conseguiu salvar nome...
		var nome = "Usuário";
		if (typeof(Storage) !== "undefined") {
			nome = localStorage.getItem("nomeDoUsuario");
		}
		
		$(".modal-content #usuario").html(nome);
		$('#mensagem-modal').modal();
		setTimeout(Geral.fecharModal, segundos * 1000);
	},

	fecharModal : function() {
		$('#mensagem-modal').modal('hide');
		$('#mensagem-modal .mensagem').html("");
		// $(".modal-content .modal-body .icone").remove();
	},

	addZ: function(n){
		return n<10? '0'+n:''+n;
	},
	
	buscarModalDeMensagem: function(params){
		return $.ajax({
			type : "GET",
			contentType : contentType,
			url : "modais/modal-mensagem.html",
			data: params
		});
	},	

	buscarModalDeExcluir: function(params){
		return $.ajax({
			type : "GET",
			contentType : contentType,
			url : "modais/modal-excluir.html",
			data: params
		});
	},
}