package br.edu.univas.lab6.beans;

import br.edu.univas.lab6.model.Controle;
import br.edu.univas.lab6.model.Login;

@javax.faces.bean.ManagedBean(name = "bean")
public class Bean {

	Controle ctrl = new Controle();

	private String nome;
	private String usuario;
	private String senha;
	private String email;
	private String emailDesafiado;

	public String getEmailDesafiado() {
		return emailDesafiado;
	}

	public void setEmailDesafiado(String emailDesafiado) {
		this.emailDesafiado = emailDesafiado;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getUsuario() {
		return usuario;
	}

	public void setUsuario(String usuario) {
		this.usuario = usuario;
	}

	public String getSenha() {
		return senha;
	}

	public void setSenha(String senha) {
		this.senha = senha;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	// botao login
	public String realizaLogin() {
		// verificar no banco se existe e encaminhar para painel
		try {
			if (ctrl.logar(usuario, senha)) {
				return "painel";
			} else {
				return "principal";
			}
		} catch (Exception e) {
			// TODO: handle exception
		}
		return "jogo";
	}

	// botao cadastrar/atualizar
	public String cadastrar() {
		Login login = new Login();
		login.setNome(nome);
		login.setUsuario(usuario);
		login.setSenha(senha);
		login.setEmail(email);
		ctrl.incluirLogin(login);
		return "painel";
	}

	// botao desafiar
	public String desafiar() {
		System.out.println("Enviado email de desafio para :" + emailDesafiado);
		return "painel";
	}

	// botao jogar
	public String jogar() {
		return "jogo";
	}

	// botao para sair
	public String sair() {
		return "principal";
	}

}
