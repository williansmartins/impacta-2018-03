package br.com.impacta.teste;

import java.math.BigDecimal;
import java.util.Date;

import br.com.impacta.model.ChaveComposta;
import br.com.impacta.model.Lancamento;
import br.com.impacta.model.Lancamento2;
import br.com.impacta.model.Servico;
import br.com.impacta.model.TipoUsuario;
import br.com.impacta.model.Usuario;

public class GerenciadorMassa {
	
	Usuario popularUsuario() {
		
		Usuario usuario = new Usuario();
		usuario.setNome("Willians");
		usuario.setPorcentagem(10);
		usuario.setTipo(TipoUsuario.CLIENTE);
		
		return usuario;
	}

	public br.com.impacta.model.Lancamento popularLancamento() {
		Lancamento lancamento = new Lancamento();
		lancamento.setValor(new BigDecimal(2123.45));
		Usuario cliente = new Usuario();
		cliente.setId(1);
		lancamento.setCliente(cliente );
		Servico servico = new Servico();
		servico.setId(1);
		lancamento.setServico(servico );
		
		ChaveComposta chave = new ChaveComposta();
		chave.setFuncionarioId(2);
		chave.setData(new Date());
		
		lancamento.setId(chave);
		
		return lancamento;
	}
	
	public br.com.impacta.model.Lancamento2 popularLancamento2() {
		Lancamento2 lancamento = new Lancamento2();
		lancamento.setValor(new BigDecimal(2123.45));
		
		Usuario cliente = new Usuario();
		cliente.setId(1);
		lancamento.setCliente(cliente );
		
		Usuario funcionario = new Usuario();
		funcionario.setId(2);
		lancamento.setFuncionario(funcionario);
		
		Servico servico = new Servico();
		servico.setId(1);
		lancamento.setServico(servico );
		
		return lancamento;
	}
}
