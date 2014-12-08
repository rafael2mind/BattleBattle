package br.edu.univas.lab6.beans;

import br.edu.univas.lab6.model.Controle;
import br.edu.univas.lab6.model.Login;


@javax.faces.bean.ManagedBean(name="bean")
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
	public String realizaLogin(){
		//verificar no banco se existe e encaminhar para painel
		return "painel";
	}
	
	//botao cadastrar
	public String cadastrar(){
		//salvar no banco e encaminhar para painel
		Login login = new Login();
		login.setNome(nome);
		login.setUsuario(usuario);
		login.setSenha(senha);
		login.setEmail(email);
		ctrl.incluirLogin(login);
		return "painel";
	}
	
	//botao atualizar
	public String atualizar(){
		//realizar update no banco e encaminhar para painel
		return "painel";
	}
	
	//botao desafiar
	public String desafiar(){
		//mostrar mensagem de desafio e encaminhar para painel
		return "painel";
	}
	
	//botao jogar
	public String jogar(){
		//encaminhar para jogo		
		return "jogo";
	}
	
	//Fazer um botao para deletar usuário
	
	//fazer um botao para sair
	

}
