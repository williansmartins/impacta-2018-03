package br.com.impacta.teste;

import java.util.List;

import org.junit.Assert;
import org.junit.Test;

import br.com.impacta.dao.JpaGenericDao;
import br.com.impacta.dao.Lancamento2DAOImpl;
import br.com.impacta.model.Lancamento2;

public class lancamento2DAOTest {
	JpaGenericDao<Lancamento2> daoLancamento = new Lancamento2DAOImpl();
	
	@Test
	public void inserirLancamento() {
		Lancamento2 lancamento = new GerenciadorMassa().popularLancamento2();
		daoLancamento.insert(lancamento);
		Assert.assertTrue(lancamento.getId() != null);
	}
	
	@Test
	public void buscarLancamento() {
		List<Lancamento2> lista = daoLancamento.findAll();
		Assert.assertNotNull(lista);
	}
	
	
}
