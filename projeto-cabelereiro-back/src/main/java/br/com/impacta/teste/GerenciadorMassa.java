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
		usuario.setNome("Caique");
		usuario.setPorcentagem(10);
		usuario.setTipo(TipoUsuario.ADMINISTRADOR);
		
		return usuario;
	}

	public br.com.impacta.model.Lancamento popularLancamento() {
		Lancamento lancamento = new Lancamento();
		lancamento.setValor(new BigDecimal(123.45));
		lancamento.setCliente(new Usuario());
		lancamento.setServico(new Servico());
		
		ChaveComposta chave = new ChaveComposta();
		chave.setData(new Date());
		chave.setFuncionario(new Usuario());
		
		lancamento.setId(chave);
		
		return lancamento;
	}
}
