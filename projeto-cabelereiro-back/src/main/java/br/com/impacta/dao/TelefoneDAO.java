package br.com.impacta.dao;

import javax.persistence.EntityExistsException;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import br.com.impacta.model.Telefone;
import br.com.impacta.model.TelefonePK;

/**
 * Classe utilizada para testar as operações Salvar, Altera, Consultar por Id e
 * Apagar o registro de um telefone.
 */
public class TelefoneDAO {
	public EntityManager getEntityManager() {
		EntityManagerFactory factory = null;
		EntityManager entityManager = null;
		try {
			factory = Persistence.createEntityManagerFactory("manager-mysql");
			entityManager = factory.createEntityManager();
		} finally {
			factory.close();
		}
		return entityManager;
	}

	public Telefone consultarPorId(TelefonePK id) {
		EntityManager entityManager = getEntityManager();
		Telefone telefone = null;
		try {
			telefone = entityManager.find(Telefone.class, id);
		} finally {
			entityManager.close();
		}
		return telefone;
	}

	public Telefone salvar(Telefone telefone) throws Exception {
		EntityManager entityManager = getEntityManager();
		try {
			entityManager.getTransaction().begin();
			entityManager.persist(telefone);
			entityManager.flush();
			entityManager.getTransaction().commit();
			/*
			 * Esta exceção pode ser lançada caso já exista um registro com a
			 * mesma chave composta.
			 */
		} catch (EntityExistsException ex) {
			entityManager.getTransaction().rollback();
			throw new Exception("Este telefone já está registrado para outro cliente.");
		} catch (Exception ex) {
			entityManager.getTransaction().rollback();
		} finally {
			//entityManager.close();
		}
		return telefone;
	}

	public Telefone atualizar(Telefone telefone) throws Exception {
		EntityManager entityManager = getEntityManager();
		try {
			entityManager.getTransaction().begin();
			entityManager.merge(telefone);
			entityManager.flush();
			entityManager.getTransaction().commit();
		} catch (Exception ex) {
			entityManager.getTransaction().rollback();
		} finally {
			entityManager.close();
		}
		return telefone;
	}

	public void apagar(TelefonePK id) {
		EntityManager entityManager = getEntityManager();
		try {
			entityManager.getTransaction().begin();
			Telefone telefone = entityManager.find(Telefone.class, id);
			entityManager.remove(telefone);
			entityManager.flush();
			entityManager.getTransaction().commit();
		} catch (Exception ex) {
			entityManager.getTransaction().rollback();
		} finally {
			entityManager.close();
		}
	}
}
