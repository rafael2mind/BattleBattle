package br.edu.univas.lab6.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name="Login")
public class Login implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="idJogador", length = 100)
	@GeneratedValue ( strategy = GenerationType . SEQUENCE ,generator =" id_gen ")

	@SequenceGenerator ( name =" id_gen ",sequenceName ="seq_id",allocationSize =1)
	private Integer idJogador;
	
	@Column(name="nome", length=30)
	private String nome;
	
	@Column(name="senha", length =20)
	private String senha;
	
	public Integer getIdJogador() {
		return idJogador;
	}

	public void setIdJogador(Integer idJogador) {
		this.idJogador = idJogador;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getSenha() {
		return senha;
	}

	public void setSenha(String senha) {
		this.senha = senha;
	}

	public String getUsuario() {
		return usuario;
	}

	public void setUsuario(String usuario) {
		this.usuario = usuario;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	@Column(name="usuario", length = 20)
	private String usuario;
	
	@Column(name="email", length = 50)
	private String email;
	
}
