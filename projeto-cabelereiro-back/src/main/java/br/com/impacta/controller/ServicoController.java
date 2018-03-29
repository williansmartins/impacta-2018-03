package br.com.impacta.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import br.com.impacta.dao.JpaGenericDao;
import br.com.impacta.dao.ServicoDAOImpl;
import br.com.impacta.model.JsonResponse;
import br.com.impacta.model.Servico;

@Controller
@RequestMapping("/servico")
public class ServicoController {

	JpaGenericDao<Servico> dao = new ServicoDAOImpl();
	
	@RequestMapping(value="/inserir", method=RequestMethod.POST)  
	@ResponseBody
	public JsonResponse inserir(@RequestBody Servico entrada) {		
		dao.insert(entrada);
		JsonResponse retorno = new JsonResponse(true, null, "Sucesso ao inserir");
		return retorno ;
	}

	@RequestMapping(value="/buscar", method=RequestMethod.GET)  
	@ResponseBody
	public JsonResponse buscar() {
		
		List<Servico> servico = dao.findAll();
		if(servico != null){
			return new JsonResponse(true, servico, "Sucesso ao buscar");
		}else{
			return new JsonResponse(false, null, "Erro ao buscar");
		}
	}	

	@RequestMapping(value="/buscarPorId", method=RequestMethod.GET)
	@ResponseBody
	public JsonResponse buscarPorId(@RequestBody int primaryKey) {
		Servico servico = dao.findById(primaryKey);
		
		if(servico != null){
			return new JsonResponse(true, servico, "Sucesso ao buscar");
		}else{
			return new JsonResponse(false, null, "Erro ao buscar");
		}
	}
	
	@RequestMapping(value="/deletar", method=RequestMethod.DELETE)  
	@ResponseBody
	public JsonResponse delete(@RequestBody Servico entrada) {
		
		try {
			dao.delete(entrada.getId());
			return new JsonResponse(true, null, "Sucesso ao deletar");
		} catch (Exception e) {
			return new JsonResponse(false, null, "Erro ao deletar");
		}
		
	}
	
	@RequestMapping(value="/atualizar", method=RequestMethod.PUT)
	@ResponseBody
	public JsonResponse atualizar(@RequestBody Servico entrada) {
		dao.update(entrada);
		return new JsonResponse(true, null, "Sucesso ao atualizar");
	}	
	
}
