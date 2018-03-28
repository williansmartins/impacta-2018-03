package br.com.impacta.dao;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import br.com.impacta.model.Usuario;

public class UsuarioDAOImpl extends JpaGenericDao<Usuario> implements IUsuarioDao{
	
	@PersistenceContext
	private EntityManager entityManager;

	public UsuarioDAOImpl() {
		entityManager = getEntityManager();
	}
	
	
}