package br.com.impacta.controller;

import java.util.List;

import org.junit.Assert;
import org.junit.Test;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import br.com.impacta.dao.JpaGenericDao;
import br.com.impacta.dao.UsuarioDAOImpl;
import br.com.impacta.model.Pessoa;
import br.com.impacta.model.Usuario;

@Controller
@RequestMapping("/usuario")
public class UsuarioController {

	private JpaGenericDao<Usuario> dao = new UsuarioDAOImpl();
	
	@RequestMapping(value="/inserir", method=RequestMethod.POST)
	@ResponseBody
	public Usuario inserir(@RequestBody Usuario entrada) {
		dao.insert(entrada);
		return entrada;
	}
	
	@RequestMapping(value="/buscar", method=RequestMethod.GET)
	@ResponseBody
	public List<Usuario> buscar() {
		return dao.findAll();
	}
	
	@RequestMapping(value="/buscarEspecifico", method=RequestMethod.GET)
	@ResponseBody
	public Usuario buscarPessoasEspecifico(@RequestBody int primaryKey) {
		return dao.findById(primaryKey);
	}
	
	@RequestMapping(value="/deletar", method=RequestMethod.GET)
	@ResponseBody
	public boolean deletarPessoa(@RequestBody int primaryKey) {
		dao.delete(primaryKey);
		
		if(dao.findById(primaryKey) == null) {
			return false;
		}
		
		return true;
	}
}
