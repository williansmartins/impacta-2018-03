DateUtil = {

	monthNames:["January", "February", "March", "April", "May", "June",
	  "July", "August", "September", "October", "November", "December"
	],

	nomesDosMeses:['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'],

	getMes: function(param){
		var buscaAtual = Geral.getParameterByName("busca");

		var date = new Date( parseInt(ano,10), parseInt(mes,10)-1, parseInt(01,10) );
		date.setMonth(date.getMonth() + (param));
		return date.getFullYear()+"-"+(Geral.addZ(date.getMonth()+1));
	},

	navegarMes: function(mes, ano, param){
		var date = new Date( parseInt(ano,10), parseInt(mes,10)-1, parseInt(01,10) );
		date.setMonth(date.getMonth() + (param));
		return date.getFullYear()+"-"+(Geral.addZ(date.getMonth()+1));
	},


	criarData: function(string){
		//from: 11/12/2013
		//to: new Date()
		
		var DD = string.substring(0,2); 
		var MM = string.substring(3,5);
		var YYYY = string.substring(6,10);

		var myDate = new Date( parseInt(YYYY,10), parseInt(MM,10)-1, parseInt(DD,10) );
		return myDate;
	},


	validarData: function(campo){
		var dataValida = DateUtil.isValidDate($(campo).val());
		if(!dataValida){
			alert("data inválida");
			$(campo).parent().addClass("has-error");
		}else{
			$(campo).parent().removeClass("has-error");
		}
	},

	isValidDate: function(stringval){
		var parts = stringval.split('/');
	    if (parts.length < 3)
	        return false;
	    else {
	        var day = parseInt(parts[0]);
	        var month = parseInt(parts[1]);
	        var year = parseInt(parts[2]);
	        if (isNaN(day) || isNaN(month) || isNaN(year)) {
	            return false;
	        }
	        if (day < 1 || year < 1)
	            return false;
	        if(month>12||month<1)
	            return false;
	        if ((month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) && day > 31)
	            return false;
	        if ((month == 4 || month == 6 || month == 9 || month == 11 ) && day > 30)
	            return false;
	        if (month == 2) {
	            if (((year % 4) == 0 && (year % 100) != 0) || ((year % 400) == 0 && (year % 100) == 0)) {
	                if (day > 29)
	                    return false;
	            } else {
	                if (day > 28)
	                    return false;
	            }      
	        }
	        return true;
	    }
	},
	
	
		
}