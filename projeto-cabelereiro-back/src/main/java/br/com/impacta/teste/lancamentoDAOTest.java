package br.com.impacta.teste;

import org.junit.Assert;
import org.junit.Test;

import br.com.impacta.dao.JpaGenericDao;
import br.com.impacta.model.Lancamento;

public class lancamentoDAOTest {
	JpaGenericDao<Lancamento> dao = new JpaGenericDao<Lancamento>();
	
	@Test
	public void inserirLancamento() {
		Lancamento Lancamento= new GerenciadorMassa().popularLancamento();
		dao.insert(Lancamento);
		Assert.assertTrue(Lancamento.getId() != null);
	}
}
