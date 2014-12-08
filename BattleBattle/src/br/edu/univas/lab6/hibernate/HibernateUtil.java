package br.edu.univas.lab6.hibernate;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

public class HibernateUtil {

	private static final EntityManagerFactory emFactory = buildSessionFactory();

	private static EntityManagerFactory buildSessionFactory () {
			try {
			return Persistence . createEntityManagerFactory ( "Login" ) ; // Create the Factory
			} catch ( Throwable e ) {
			// Make sure you log the exception , as it might be swallowed
			 System . err . println ( " Error creating EntityManagerFactory . " + e ) ;
			 throw new ExceptionInInitializerError ( e ) ;
			 }
			 }

	// metodo que utilizaremos para obter o EntityManager
	public static EntityManager getEntityManager() {
		return emFactory.createEntityManager();
	}
}
