package br.com.impacta.teste;

import br.com.impacta.model.TipoUsuario;
import br.com.impacta.model.Usuario;

public class GerenciadorMassa {
	
	Usuario popularUsuario() {
		
		Usuario usuario = new Usuario();
		usuario.setNome("Caique");
		usuario.setPorcentagem(10);
		usuario.setTipo(TipoUsuario.ADMINITRADOR);
		
		return usuario;
	}
}
