package br.com.impacta.teste;

import java.math.BigDecimal;
import java.util.Date;

import br.com.impacta.model.ChaveComposta;
import br.com.impacta.model.Lancamento;
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

	public br.com.impacta.model.Lancamento popularLancamento(Usuario funcionario, Servico servico, Usuario cliente) {
		Lancamento lancamento = new Lancamento();
		lancamento.setValor(new BigDecimal(123.45));
		lancamento.setCliente(cliente);
		lancamento.setServico(servico);
		
		ChaveComposta chave = new ChaveComposta();
		chave.setFuncionario(funcionario);
		chave.setData(new Date());
		
		lancamento.setId(chave);
		
		return lancamento;
	}
}
