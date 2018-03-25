package br.com.impacta.teste;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

public class PersistidorDeAutomovel {
	public static void main(String[] args) {
		EntityManager em = JPAUtil.getEntityManager();
		
		/* FAZENDO COM CONSULTA SIMPLES NO BANCO DE DADOS.
		 * Query q = em.createQuery("select a from Automovel a", Automovel.class);
		List<Automovel> auto = q.getResultList();
		
		for (Automovel a : auto) {
			System.out.println(a.getModelo());
		}*/
		
		/* FAZENDO A INSERÇÃO NO BANCO DE DADOS N VEZES.
		 * EntityTransaction tx = em.getTransaction();
		tx.begin();
		
		Automovel auto;
		for (int i = 0; i < 10; i++) {
			auto = new Automovel();
			auto.setAnoFabricacao(2010);
			auto.setModelo("Ferrari");
			auto.setObservacoes("Nunca foi batido");
			em.persist(auto);
		}
		
		tx.commit();*/
		em.close();
	}
}
