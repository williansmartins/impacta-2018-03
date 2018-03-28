package br.com.impacta.teste;

import br.com.impacta.model.Servico;

public class ServicoMassa {
	
	Servico popularServico(){
		Servico servico = new Servico();
		servico.setDescricao("Corte");
		servico.setPorcentagem(10);
		servico.setValor(100.00f);
		
		return servico;
	}
}