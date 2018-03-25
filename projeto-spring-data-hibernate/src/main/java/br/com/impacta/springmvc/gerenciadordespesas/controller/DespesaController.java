package br.com.impacta.springmvc.gerenciadordespesas.controller;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import br.com.impacta.springmvc.gerenciadordespesas.model.Categoria;
import br.com.impacta.springmvc.gerenciadordespesas.model.Despesa;
import br.com.impacta.springmvc.gerenciadordespesas.repositorio.Despesas;

@Controller
@RequestMapping("/despesas")
public class DespesaController {
	
	@Autowired
	private Despesas despesas;
		
	@RequestMapping("/nova")
	public ModelAndView nova(){
		ModelAndView mv = new ModelAndView("CadastroDespesa");
		return mv;
	}
	
	@RequestMapping(method=RequestMethod.POST)
	public ModelAndView salvar(Despesa despesa){
		despesas.save(despesa);
		ModelAndView mv = new ModelAndView("CadastroDespesa");
		mv.addObject("mensagem","Despesa salva com sucesso!");
		return mv;
	}
	
	@ModelAttribute("todasCategorias")
	public List<Categoria> todasCategorias(){
		return Arrays.asList(Categoria.values());
	}
	
}
