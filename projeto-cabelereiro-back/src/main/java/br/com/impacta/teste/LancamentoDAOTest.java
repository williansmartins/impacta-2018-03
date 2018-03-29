package br.com.impacta.teste;

import java.util.List;

import org.junit.Assert;
import org.junit.Test;

import br.com.impacta.dao.JpaGenericDao;
import br.com.impacta.dao.Lancamento2DAOImpl;
import br.com.impacta.model.Lancamento;

public class LancamentoDAOTest {
	JpaGenericDao<Lancamento> daoLancamento = new Lancamento2DAOImpl();
	
	@Test
	public void inserirLancamento() {
		Lancamento lancamento = new GerenciadorMassa().popularLancamento2();
		daoLancamento.insert(lancamento);
		Assert.assertTrue(lancamento.getId() != null);
	}
	
	@Test
	public void buscarLancamento() {
		List<Lancamento> lista = daoLancamento.findAll();
		Assert.assertNotNull(lista);
	}
	
	
}
