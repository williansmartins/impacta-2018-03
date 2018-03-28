package br.com.impacta.model;

public enum TipoUsuario {
	CLIENTE("Cliente"), FUNCIONARIO("Funcionario"), ADMINITRADOR("Adminitrador");
	
	private String nome;

	TipoUsuario(String nome){
		this.nome = nome;
	}
	
	public String getNome(){
		return this.nome;
	}
}
