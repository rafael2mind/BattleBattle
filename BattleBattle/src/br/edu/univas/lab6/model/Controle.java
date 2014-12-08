package br.edu.univas.lab6.model;


public class Controle {
	
	private LoginDAO loginDAO ;
	
	public Controle () {
		loginDAO = new LoginDAO() ;
	}
	public void incluirLogin (Login login){
		try {
			loginDAO . incluirLogin (login) ;
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	public Login getLoginByUser (String usuario ){
		return loginDAO . getLoginByUser ( usuario ) ;
	}

	public void deletaLogin (String usuario){
		loginDAO . deletaLogin ( usuario ) ;
	}

}
