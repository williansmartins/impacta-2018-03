package br.com.impacta.teste;

import java.util.List;

import org.junit.Assert;
import org.junit.Test;

import br.com.impacta.dao.JpaGenericDao;
import br.com.impacta.dao.ServicoDAOImpl;
import br.com.impacta.model.Servico;

public class ServicoDAOTest {

	JpaGenericDao<Servico> dao = new ServicoDAOImpl();
	
	@Test
	public void inserirPessoa() {
		Servico servicoUnico = new ServicoMassa().popularServico();
		dao.insert(servicoUnico);
		Assert.assertTrue(servicoUnico.getId() != null);
	}
	
	@Test
	public void buscarServico() {
		List<Servico> lista = dao.findAll();
		Assert.assertNotNull( lista );
	}

	@Test
	public void deletarServico() {
		Servico servico = dao.findById(1);
		Assert.assertNotNull(servico);
		dao.delete(1);
		servico = dao.findById(1);
		Assert.assertNull(servico);		
	}

}