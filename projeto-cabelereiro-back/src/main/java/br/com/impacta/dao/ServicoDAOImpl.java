package br.com.impacta.dao;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import br.com.impacta.model.Servico;

public class ServicoDAOImpl extends JpaGenericDao<Servico> implements IServicoDAO{
	
	@PersistenceContext
	private EntityManager entityManager;

	public ServicoDAOImpl() {
		entityManager = getEntityManager();
	}
	
	
}