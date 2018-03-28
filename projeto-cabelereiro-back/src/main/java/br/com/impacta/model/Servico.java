package br.com.impacta.model;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Servico implements Serializable {

	private static final long serialVersionUID = -3689382195454890010L;
	
	@Id @GeneratedValue
	private Integer id;
	private String descricao;
	private Float valor;
	private Integer porcentagem;
	
	public Servico(){
		
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public Float getValor() {
		return valor;
	}

	public void setValor(Float valor) {
		this.valor = valor;
	}

	public Integer getPorcentagem() {
		return porcentagem;
	}

	public void setPorcentagem(Integer porcentagem) {
		this.porcentagem = porcentagem;
	}
	
	public String toString() {
        return String.format("id:%d,descricao:%s,valor:%d,porcentagem:%s", id, descricao, valor, porcentagem);
    }	
}
