package br.com.impacta.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import br.com.impacta.dao.JpaGenericDao;
import br.com.impacta.model.Servico;

@Controller
@RequestMapping("/servico")
public class ServicoController {

	JpaGenericDao<Servico> dao = new JpaGenericDao<Servico>();
	
	@RequestMapping(value="/inserir", method=RequestMethod.POST)  
	@ResponseBody
	public void inserir(@RequestBody Servico entrada) {
		
		dao.insert(entrada);
	}

	@RequestMapping(value="/buscar", method=RequestMethod.GET)  
	@ResponseBody
	public List<Servico> buscar() {
		
		List<Servico> servico = dao.findAll();
		return servico;
	}	

	@RequestMapping(value="/delete", method=RequestMethod.GET)  
	@ResponseBody
	public void buscar(Integer idKey) {
		
		try {
			dao.delete(idKey);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}	
}
