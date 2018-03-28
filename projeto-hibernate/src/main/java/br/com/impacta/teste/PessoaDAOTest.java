package br.com.impacta.teste;

import java.util.List;

import org.junit.Assert;
import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runners.MethodSorters;

import br.com.impacta.dao.JpaGenericDao;
import br.com.impacta.dao.PessoaDAOImpl;
import br.com.impacta.model.Pessoa;

@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class PessoaDAOTest {

	JpaGenericDao<Pessoa> dao = new PessoaDAOImpl();
	
	@Test
	public void inserirPessoa() {
		Pessoa pessoaMockada = new PessoaMassa().popularPessoa();
		dao.insert(pessoaMockada);
		Assert.assertTrue(pessoaMockada.getId() != null);
	}
	
	public void buscarPessoas() {
		List<Pessoa> lista = dao.findAll();
		Assert.assertNotNull( lista );
	}
	

}