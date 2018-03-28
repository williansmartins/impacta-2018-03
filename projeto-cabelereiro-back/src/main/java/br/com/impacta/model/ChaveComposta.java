package br.com.impacta.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Embeddable;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

@Embeddable 
public class ChaveComposta implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	private Date data;
	@OneToOne
    @JoinColumn(name="idFuncionario")
	private Usuario funcionario;
	
	public Date getData() {
		return data;
	}

	public void setData(Date data) {
		this.data = data;
	}

	public Usuario getFuncionario() {
		return funcionario;
	}
	
	public void setFuncionario(Usuario funcionario) {
		this.funcionario = funcionario;
	}

}