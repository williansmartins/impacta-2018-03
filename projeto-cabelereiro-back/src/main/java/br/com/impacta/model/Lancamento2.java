package br.com.impacta.model;

import java.io.Serializable;
import java.math.BigDecimal;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

@Entity
public class Lancamento2 implements Serializable{

	private static final long serialVersionUID = 1L;
	
	private BigDecimal valor;
	
	@Id
	@GeneratedValue
	private Integer id;
	
	@OneToOne
    @JoinColumn(name="idServico")
	private Servico servico;
	
	@OneToOne
    @JoinColumn(name="idCliente")
	private Usuario cliente;
	
	@OneToOne
    @JoinColumn(name="idFuncionario")
	private Usuario funcionario;

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

	public Usuario getFuncionario() {
		return funcionario;
	}

	public void setFuncionario(Usuario funcionario) {
		this.funcionario = funcionario;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}
	
}

