package br.com.impacta.dao;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import br.com.impacta.model.Pessoa;

public class PessoaDAOImpl extends JpaGenericDao<Pessoa> implements IPessoaDAO{
	
	@PersistenceContext
	private EntityManager entityManager;

	public PessoaDAOImpl() {
		entityManager = getEntityManager();
	}
	
	
}