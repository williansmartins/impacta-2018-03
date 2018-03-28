package br.com.impacta.teste;

import java.util.List;

import org.junit.Assert;
import org.junit.Test;

import br.com.impacta.dao.JpaGenericDao;
import br.com.impacta.dao.UsuarioDAOImpl;
import br.com.impacta.model.Usuario;

public class UsuarioDAOTest {
	JpaGenericDao<Usuario> dao = new UsuarioDAOImpl();
	
	@Test
	public void inserirUsuario() {
		Usuario usuario= new GerenciadorMassa().popularUsuario();
		dao.insert(usuario);
		Assert.assertTrue(usuario.getId() != null);
	}
	
	@Test
	public void buscarUsuarios() {
		List<Usuario> lista = dao.findAll();
		
		Assert.assertNotNull( lista );
	}
}
