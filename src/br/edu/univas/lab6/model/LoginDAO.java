package br.edu.univas.lab6.model;


import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.Query;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;
import org.hibernate.criterion.Restrictions;
import org.hibernate.Transaction;

import br.edu.univas.lab6.hibernate.HibernateUtil;

import com.sun.accessibility.internal.resources.accessibility;
import com.sun.faces.util.Cache.Factory;

public class LoginDAO {
	
	private Session session; 
	
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
	      String usuario = login.getUsuario(); 
	     
	      if(usuario == null) {
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
	      //Consulta uma pessoa pelo seu usuario.
	      login = entityManager.find(Login.class, usuario);
	    } finally {
	      entityManager.close();
	    }
	    return login;
	  }
	
	
	public boolean verificaUsuario(String usuario, String senha){
		Criteria crt = this.session.createCriteria(Login.class);
		crt.add(Restrictions.eq("usuario", usuario));
		crt.add(Restrictions.eq("senha", senha));
		
		Login login = (Login) crt.uniqueResult();
		
		if(login != null){
			return true;
		}else{
			return false;
		}
	}
}
