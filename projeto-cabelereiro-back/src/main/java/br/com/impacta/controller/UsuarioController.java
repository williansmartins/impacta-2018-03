package br.com.impacta.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import br.com.impacta.dao.JpaGenericDao;
import br.com.impacta.model.Servico;

@Controller
@RequestMapping("/cabelereiro/servico")
public class UsuarioController {

	JpaGenericDao<Servico> dao = new JpaGenericDao<Servico>();
	
}
