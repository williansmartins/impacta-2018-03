package br.com.impacta.model;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity(name="pessoa")
public class Pessoa implements Serializable {

	private static final long serialVersionUID = -3689382195454890010L;

	@Id @GeneratedValue
	private Integer id;
	private String nome;
	private Integer idade;
	private char sexo;
	
	public Pessoa(){
	}
	
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
	public Integer getIdade() {
		return idade;
	}
	public void setIdade(Integer idade) {
		this.idade = idade;
	}
	public char getSexo() {
		return sexo;
	}
	public void setSexo(char sexo) {
		this.sexo = sexo;
	}
	
	public String toString() {
        return String.format("id:%d,nome:%s,idade:%d,sexo:%s", id, nome, idade, sexo);
    }
}