package br.com.impacta.teste;

import java.util.List;

import org.junit.Assert;
import org.junit.Test;

import br.com.impacta.dao.JpaGenericDao;
import br.com.impacta.dao.PessoaDAOImpl;
import br.com.impacta.model.Pessoa;

public class PessoaDAOTest {

	JpaGenericDao<Pessoa> dao = new PessoaDAOImpl();
	
	@Test
	public void inserirPessoa() {
		Pessoa pessoaMockada = new PessoaMassa().popularPessoa();
		dao.insert(pessoaMockada);
		Assert.assertTrue(pessoaMockada.getId() != null);
	}
	
	@Test
	public void buscarPessoas() {
		List<Pessoa> lista = dao.findAll();
		Assert.assertNotNull( lista );
	}

	@Test
	public void deletarPessoas() {
		Pessoa pessoa = dao.findById(1);
		Assert.assertNotNull( pessoa);
		dao.delete(1);
		pessoa = dao.findById(1);
		Assert.assertNull( pessoa);		
	}

}