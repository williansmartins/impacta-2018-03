package br.com.impacta.model;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity(name="usuario")
public class Usuario implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	@Id @GeneratedValue
	private Integer id;
	private String nome;
	private float porcentagem;
	private TipoUsuario tipo;
	
	public Integer getId() {
		return id;
	}
	
	public void setId(Integer id) {
		this.id = id;
	}
	
	public String getNome() {
		return nome;
	}
	
	public void setNome(String nome) {
		this.nome = nome;
	}
	
	public float getPorcentagem() {
		return porcentagem;
	}
	
	public void setPorcentagem(float porcentagem) {
		this.porcentagem = porcentagem;
	}
	
	public TipoUsuario getTipo() {
		return tipo;
	}
	
	public void setTipo(TipoUsuario tipo) {
		this.tipo = tipo;
	}
	
	public String toString() {
        return String.format("id:%d,nome:%s,porcentagem:%d,tipo:%s", id, porcentagem, tipo);
    }
	
}
