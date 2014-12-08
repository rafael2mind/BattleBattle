package br.edu.univas.lab6.model;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

public class LoginDAO {
	
	private EntityManager getEntityManager(){
	    EntityManagerFactory factory = null;
	    EntityManager entityManager = null;
	    try {
	      //Obtém o factory a partir da unidade de persistência.
	      factory = Persistence.createEntityManagerFactory("Login");
	      //Cria um entity manager.
	      entityManager = factory.createEntityManager();
	      //Fecha o factory para liberar os recursos utilizado.
	    } finally {
//	      factory.close();
	    }
	    return entityManager;
	  }
	
	public Login incluirLogin (Login login) throws Exception {
		System.out.println("entrou no incluir login");
		EntityManager entityManager = getEntityManager();
	    try {
	      // Inicia uma transação com o banco de dados.
	      entityManager.getTransaction().begin();
	      System.out.println("Salvando o cadastro.");
	      // Verifica se a pessoa ainda não está salva no banco de dados.
	      if(login.getUsuario() == null) {
	        //Salva os dados da pessoa.
	        entityManager.persist(login);
	      } else {
	        //Atualiza os dados da pessoa.
	        login = entityManager.merge(login);
	      }
	      // Finaliza a transação.
	      entityManager.getTransaction().commit();
	    } finally {
	      entityManager.close();
	    }
	    return login;
	  }
	

	public Login getLoginByUser (String usuario) {
		EntityManager entityManager = getEntityManager();
	    Login login = null;
	    try {
	      //Consulta uma pessoa pelo seu ID.
	      login = entityManager.find(Login.class, usuario);
	    } finally {
	      entityManager.close();
	    }
	    return login;
	  }
	
	public void deletaLogin (String usuario) {
		 EntityManager entityManager = getEntityManager();
		    try {
		      // Inicia uma transação com o banco de dados.
		      entityManager.getTransaction().begin();
		      // Consulta a pessoa na base de dados através do seu usuario.
		      Login login = entityManager.find(Login.class, usuario);
		      System.out.println("Excluindo os dados de: " + login.getNome());
		      // Remove a pessoa da base de dados.
		      entityManager.remove(login);
		      // Finaliza a transação.
		      entityManager.getTransaction().commit();
		    } finally {
		      entityManager.close();
		    }
		  }
}
