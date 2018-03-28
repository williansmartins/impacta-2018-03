package br.com.impacta.model;

import java.io.Serializable;
import java.math.BigDecimal;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;

@Entity
public class Lancamento implements Serializable{

	private static final long serialVersionUID = 1L;
	
	@EmbeddedId 
	private ChaveComposta id;
	private BigDecimal valor;
	private Servico servico;
	private Usuario cliente;

	public Lancamento() {
		super();
	}

	public Lancamento(BigDecimal valor, Servico servico, Usuario cliente) {
		super();
		this.valor = valor;
		this.servico = servico;
		this.cliente = cliente;
	}


	public BigDecimal getValor() {
		return valor;
	}

	public void setValor(BigDecimal valor) {
		this.valor = valor;
	}

	public Servico getServico() {
		return servico;
	}

	public void setServico(Servico servico) {
		this.servico = servico;
	}


	public Usuario getCliente() {
		return cliente;
	}

	public void setCliente(Usuario cliente) {
		this.cliente = cliente;
	}
	

	public ChaveComposta getId() {
		return id;
	}

	public void setId(ChaveComposta id) {
		this.id = id;
	}

	@Override
	public String toString() {
		return "Lancamento [valor=" + valor + ", servico=" + servico + " cliente=" + cliente + "]";
	}
	


}

