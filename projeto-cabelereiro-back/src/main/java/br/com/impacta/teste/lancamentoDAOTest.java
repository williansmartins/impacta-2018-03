package br.com.impacta.teste;

import org.junit.Assert;
import org.junit.Test;

import br.com.impacta.dao.JpaGenericDao;
import br.com.impacta.model.Lancamento;

public class lancamentoDAOTest {
	JpaGenericDao<Lancamento> daoLancamento = new JpaGenericDao<Lancamento>();
//	JpaGenericDao<Usuario> daoUsuario = new JpaGenericDao<Usuario>("");
//	JpaGenericDao<Servico> daoServico = new JpaGenericDao<Servico>("");
	
	@Test
	public void inserirLancamento() {
//		Usuario funcionario = daoUsuario.findAll().get(0);
//		Usuario cliente = daoUsuario.findAll().get(1);
//		Servico servico = daoServico.findAll().get(0);
		
//		Lancamento Lancamento= new GerenciadorMassa().popularLancamento(funcionario, servico, cliente);
		Lancamento Lancamento= new GerenciadorMassa().popularLancamento();
		daoLancamento.insert(Lancamento);
		Assert.assertTrue(Lancamento.getId() != null);
	}
	
	
}
