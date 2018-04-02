package br.com.impacta.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import br.com.impacta.dao.JpaGenericDao;
import br.com.impacta.dao.UsuarioDAOImpl;
import br.com.impacta.model.JsonResponse;
import br.com.impacta.model.Usuario;

@Controller
@RequestMapping("/usuario")
public class LancamentoController {

	private JpaGenericDao<Usuario> dao = new UsuarioDAOImpl();
	
	@RequestMapping(value="/inserir", method=RequestMethod.POST)
	@ResponseBody
	public JsonResponse inserir(@RequestBody Usuario entrada) {
		dao.insert(entrada);
		JsonResponse retorno = new JsonResponse(true, null, "Sucesso ao inserir");
		return retorno ;
	}
	
	@RequestMapping(value="/buscar", method=RequestMethod.GET)
	@ResponseBody
	public JsonResponse buscar() {
		List<Usuario> lista = dao.findAll();
		
		if(lista != null){
			return new JsonResponse(true, lista, "Sucesso ao buscar");
		}else{
			return new JsonResponse(false, null, "Erro ao buscar");
		}
	}
	
	@RequestMapping(value="/buscarPorId", method=RequestMethod.GET)
	@ResponseBody
	public JsonResponse buscarPorId(@RequestBody int primaryKey) {
		Usuario usuario = dao.findById(primaryKey);
		
		if(usuario != null){
			return new JsonResponse(true, usuario, "Sucesso ao buscar");
		}else{
			return new JsonResponse(false, null, "Erro ao buscar");
		}
	}
	
	@RequestMapping(value="/deletar", method=RequestMethod.DELETE)
	@ResponseBody
	public JsonResponse deletar(@RequestBody Usuario entrada) {
		try {
			dao.delete(entrada.getId());
			return new JsonResponse(true, null, "Sucesso ao deletar");
		} catch (Exception e) {
			return new JsonResponse(false, null, "Erro ao deletar");
		}
		
	}
	
	@RequestMapping(value="/atualizar", method=RequestMethod.PUT)
	@ResponseBody
	public JsonResponse atualizar(@RequestBody Usuario entrada) {
		dao.update(entrada);
		return new JsonResponse(true, null, "Sucesso ao atualizar");
	}
}