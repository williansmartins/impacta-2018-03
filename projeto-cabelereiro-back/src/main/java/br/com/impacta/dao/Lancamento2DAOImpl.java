package br.com.impacta.dao;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import br.com.impacta.model.Lancamento;

public class Lancamento2DAOImpl extends JpaGenericDao<Lancamento> implements ILancamento2DAO{
	
	@PersistenceContext
	private EntityManager entityManager;

	public Lancamento2DAOImpl() {
		entityManager = getEntityManager();
	}
	
	
}