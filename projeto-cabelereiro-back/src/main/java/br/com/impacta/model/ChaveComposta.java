package br.com.impacta.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Embeddable;

@Embeddable 
public class ChaveComposta implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	private Date data;
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