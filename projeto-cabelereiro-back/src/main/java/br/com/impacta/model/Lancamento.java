package br.com.impacta.model;

import java.io.Serializable;
import java.math.BigDecimal;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

@Entity
public class Lancamento implements Serializable{

	private static final long serialVersionUID = 1L;
	
	@EmbeddedId 
	private ChaveComposta id;
	private BigDecimal valor;
	
	@OneToOne
    @JoinColumn(name="idServico")
	private Servico servico;
	
	@OneToOne
    @JoinColumn(name="idCliente")
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
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Lancamento other = (Lancamento) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

	

}

