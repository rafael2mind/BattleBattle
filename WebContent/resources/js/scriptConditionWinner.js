var i;

function objective(){
	return Math.floor((Math.random()*3)); //Valor de 0 a 3
}

function conditionWinner(objective){

	switch (objective) {
		case 0:
			return mission0(); 	break;
		case 1:
			return mission1(); 	break;
		case 2:
			return mission2(); 	break;
	}

}

function askObjective(obj){

	document.getElementById("objective").src = "MEDIA/Objective/mission"+obj+".txt";
}

/*Abaixo seguem todos os objetivos do jogo:
		1- Conquistar na totalidade a EUROPA, a OCEANIA e mais um terceiro.
		2- Conquistar na totalidade a ASIA e a AMÉRICA DO SUL.
		3- Conquistar na totalidade a EUROPA, a AMÉRICA DO SUL e mais um terceiro.
		4- Conquistar 18 TERRITÓRIOS e ocupar cada um deles com pelo menos dois exércitos.
		5- Conquistar na totalidade a ASIA e a ÁFRICA.
		6- Conquistar na totalidade a AMÉRICA DO NORTE e a ÁFRICA.
		7- Conquistar 24 TERRITÓRIOS à sua escolha.
		8- Conquistar na totalidade a AMÉRICA DO NORTE e a OCEANIA.
		9- Destruir totalmente OS EXÉRCITOS AZUIS.
		10-Destruir totalmente OS EXÉRCITOS AMARELOS.
		11-Destruir totalmente OS EXÉRCITOS VERMELHOS.
		12-Destruir totalmente OS EXÉRCITOS PRETOS.
		13-Destruir totalmente OS EXÉRCITOS BRANCO.
		14-Destruir totalmente OS EXÉRCITOS VERDES.
*/

function mission0(){	// Conquistar o mundo! by Pink e Cerebro

	if (americaDoSulConquest()&&americaDoNorteConquest()&&africaConquest()&&europaConquest()
		&&asiaConquest()&&oceaniaConquest) {
		winner();
	};
	return false;
}

function mission1(){	// Conquistar na totalidade a EUROPA, a OCEANIA e mais um terceiro.
	if (  europaConquest()&&oceaniaConquest()&& ( americaDoSulConquest()||americaDoNorteConquest()||africaConquest()||asiaConquest() )  ) {
		winner();
	};
	return false;
}

function mission2(){	// Conquistar na totalidade a ASIA e a AMÉRICA DO SUL.
	if (  asiaConquest() && americaDoSulConquest() ) {
		winner();
	};
	return false;
}

function americaDoSulConquest(){
	for (i=0; i<=3; i++) {	// América do Sul
		if (localStorage.getItem("PlayerA"+i)!=localStorage.getItem("LS_turn")){
			return false;
		};
		reluzContinent(i);
	};
	return true;
}

function americaDoNorteConquest(){
	for (i=10; i<=18; i++) {	// América do Norte
		if (localStorage.getItem("PlayerA"+i)!=localStorage.getItem("LS_turn")){
			return false;
		};
		reluzContinent(i);
	};
	return true;
}

function africaConquest(){
	for (i=4; i<=9; i++) {	// África
		if (localStorage.getItem("PlayerA"+i)!=localStorage.getItem("LS_turn")){
			return false;
		};
		reluzContinent(i);
	};
	return true;
}

function europaConquest(){
	for (i=19; i<=25; i++) {	// Europa
		if (localStorage.getItem("PlayerA"+i)!=localStorage.getItem("LS_turn")){
			return false;
		};
		reluzContinent(i);
	};
	return true;
}

function asiaConquest(){
	for (i=26; i<=37; i++) {	// Ásia
		if (localStorage.getItem("PlayerA"+i)!=localStorage.getItem("LS_turn")){
			return false;
		};
		reluzContinent(i);
	};
	return true;
}

function oceaniaConquest(){
	for (i=38; i<=41; i++) {	// Oceania
		if (localStorage.getItem("PlayerA"+i)!=localStorage.getItem("LS_turn")){
			return false;
		};
		reluzContinent(i);
	};
	return true;
}

function winner(){
	sound(7);
	alert("WINNER");
}