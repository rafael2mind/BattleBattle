var turn;
var player;
var qntdPlayer = 2;
var SelectionAttack;
var armyAttack;
var qntdTerritorios = 42;
var armyTranfer = 0;
var vArmy;
var cor1="yellow",cor2="gray";
var domination = new Array;

var testee;

function initialize(){
	localStorage.setItem("LS_fasesOfGame", 0); // Fases do Jogo  0-choiceTerritory()/ 1-battle()/ 2-UpdateBonus 
	localStorage.setItem("LS_turn", 1);
	localStorage.setItem("LS_player", 1);
	localStorage.setItem("LS_objective", objective());

	// Quantidade de exercito e Dominio - TERRITORIO

	for (var i = 0; i <= qntdTerritorios; i++) {
		localStorage.setItem("A"+i, 0);	//Qntde exercito
		localStorage.setItem("PlayerA"+i, 0);//dominio player
	};

	for (var i=1; i<=qntdPlayer; i++) {
		localStorage.setItem("bonusTerritory"+i, 0);
		localStorage.setItem("bonusContinent"+i, 0);
		localStorage.setItem("bonusCards"+i, 0);
	};

	reloadTerritory();
	choiceTerritory();

}

function choiceTerritory(){	
	var nRandom;
	var i = 0;
	// var armyCor = 1;
	// qntdPlayer=2;

	var territory = Array;
 	 territory = [];

 	 for (i=0; i < qntdTerritorios; i++) {
   		territory.push(i); 	 	
 	 };

 	 alert("Territórios selecionados aleatoriamente");

 	do{ /* RANDOM para não repetir numeros, metodo splice+-=POP*/
 		nRandom = Math.floor((Math.random()*territory.length)); // Random

 		sorteio.push(territory[nRandom]);
 		territory.splice(nRandom,1);
 		// localStorage.setItem("A"+territory[nRandom],2);
 		// localStorage.setItem("PlayerA"+territory[nRandom], armyCor);//dominio player
 		// animationScroll(territory[nRandom]);
 		// reloadTerritory();

		// armyCor++;

		// if (armyCor > qntdPlayer){
		// 	armyCor = 1;					
		// }
		// i++;
// alert();
 	}while(territory.length>0);

 	document.getElementById("country").setAttribute('style', 'opacity: 1.0;');
 	animationScroll();

	localStorage.setItem("LS_fasesOfGame", 2);
	reloadTerritory();

}

function whatYourColor(player){
	var cor;
	if (player==1){
		cor = "rgb(255,50,60)";
	}
	if (player==2) {
		cor = "rgb(70,90,255)";
	}
	if (player==3) {
		cor = "yellow";
	}
	if (player==4) {
		cor = "green";
	}
	if (player==5) {
		cor = "rgb(220,220,205)";
	}
	if (player==6) {
		cor = "rgb(0,255,255)";
	};

	return cor;

}

function whatYourCursor(player){
	document.body.style.cursor = 'url(img/cur'+player+'.png), default';

}

function changePhases(){ //0-choiceTerritory()/ 1-battle()/ 2-UpdateBonus()
	var vPlayer;

	vPlayer = localStorage.getItem("LS_turn");
	conditionWinner(parseInt(localStorage.getItem("LS_objective")) );

	if (localStorage.getItem("LS_fasesOfGame")==2){  //UPDATE
		localStorage.setItem("LS_fasesOfGame", 1);
	}
	else if(localStorage.getItem("LS_fasesOfGame")==1){  //BATTLE
		localStorage.setItem("LS_fasesOfGame", 2);
		vPlayer++;
		if (vPlayer>qntdPlayer) {
			vPlayer=1;
		};
		player=vPlayer;
		localStorage.setItem("LS_turn",vPlayer);
		localStorage.setItem("LS_player",vPlayer);
		acceptBonus(vPlayer);

	}
	loadingPage(); // carrega toda a pagina
}

function reloadTerritory(){
	// var totalArmyPlayer= new Array();
	// 	totalArmyPlayer[1]=0;
	// 	totalArmyPlayer[2]=0;
			
	if (turn == undefined){
		turn = localStorage.getItem("LS_turn");		
	};

	if (player == undefined){
		player = localStorage.getItem("LS_player");	
	};

	if (SelectionAttack == undefined){
		SelectionAttack = false;
	};

		//Quando Inicializa a Página os valores serão pegos no banco de Dados
			//Setando valores pelo LocalStore
		for (var i=0; i<qntdTerritorios; i++){  //Função prencher valores e dominios
			document.getElementById("army"+i).innerHTML = localStorage.getItem("A"+i);
			whatYourColor(localStorage.getItem("PlayerA"+i));			
			document.getElementById("army"+i).setAttribute('style', ' background-color:'+whatYourColor(localStorage.getItem("PlayerA"+i))+' ;');
		};


// document.body.style.cursor = 'url(img/cur1.png), default';
	whatYourCursor(player);

	explainStatus();

}

function updateTerritory(army){
	// alert("update");
	var valor;
	var valueFinalUpdate;

							
	if ((armyTranfer == 1)&&(connectArea(vArmy,army)==1) ){ // Tranferir exercito próprio para outra área 
		alert("VARMY: "+vArmy+" Army: "+army);
		reloadTerritory();
		reluzTransfer(army);
		$('#heightBar').unbind('mousemove');//Reseta evento do heightbar
		$("#volume").attr("style"," opacity: 1.0;");

		$("#heightBar").mousemove(function(){
			document.getElementById("valueBar").innerHTML= heightBar.value;
			valueFinalUpdate=parseInt(localStorage.getItem("A"+army))+parseInt(heightBar.value);
			document.getElementById("army"+army).innerHTML= valueFinalUpdate;
			document.getElementById("army"+vArmy).innerHTML= parseInt(localStorage.getItem("A"+vArmy))-document.getElementById("valueBar").innerHTML;//Retira army
			document.getElementById("armyYour").innerHTML= document.getElementById("army"+vArmy).innerHTML;
		});
		$("#confirm").click(function(){  //Confirma Update
			localStorage.setItem("A"+vArmy, document.getElementById("army"+vArmy).innerHTML);
			localStorage.setItem("A"+army, document.getElementById("army"+army).innerHTML);
			document.getElementById("armyYour").innerHTML= document.getElementById("army"+army).innerHTML;
			armyTranfer = 0;
			$('#valueBar').unbind('click');	
			$('#heightBar').unbind('mousemove');
			loadingPage();
		});
	}
	$('.bonus').unbind('click');
	$(".bonus").click(function(){

		reluzUpdate(this);
		var heightBar= document.getElementById("heightBar");
		valor=($(this).attr("value"));
		heightBar.value= "0";
		document.getElementById("valueBar").innerHTML = 0;


		if ( (valor==1)&&(localStorage.getItem("A"+army)>1) ) { //Transfer
			armyTranfer = 1;
			vArmy = army;
			alert("Selecionado Transfer");
			$("#volume").attr("style"," opacity: 1.0;");
			document.getElementById("heightBar").max= localStorage.getItem("A"+vArmy)-1;
		}

		if( ($(".bonus[value="+valor+"] span").html()>0)&&(armyTranfer==0) ){ //Normal update

			var vBonus
			if (valor==2) {
				vBonus = "bonusTerritory"+player;
				vArmy = "armyNextPhase1";
				// alert(vBonus);
			}
			else if (valor==3) {
				vBonus = "bonusContinent"+player;
				vArmy = "armyContinente";
				// alert(vBonus);
			}
			else if (valor==4) {
				vBonus = "bonusCards"+player;
				vArmy = "armyBonusCard";
				// alert(vBonus);
			}
			$("#volume").attr("style"," opacity: 1.0;");

			document.getElementById("heightBar").max= localStorage.getItem(vBonus);	

			$('#heightBar').unbind('mousemove');//Reseta evento do heightbar
			$("#heightBar").mousemove(function(){ // Escolher qntd de bonus para tranferir				
				document.getElementById("valueBar").innerHTML= heightBar.value;
				valueFinalUpdate=parseInt(localStorage.getItem("A"+army))+parseInt(heightBar.value);
				document.getElementById("army"+army).innerHTML= valueFinalUpdate;
				document.getElementById(vArmy).innerHTML= parseInt(localStorage.getItem(vBonus))-document.getElementById("valueBar").innerHTML;//Retira army bonus
				
			});
			$("#confirm").click(function(){  //Confirma Update
				localStorage.setItem("A"+army,valueFinalUpdate);
				// alert("Update Your Army");
				localStorage.setItem(vBonus,parseInt(localStorage.getItem(vBonus))-document.getElementById("valueBar").innerHTML);
				$('#valueBar').unbind('click');	
				loadingPage();
			});		

		}
		

	});

}

function battle(armyAttack, armyDefender){ //Verificar se territorios fazem fronteira e rolar os dados
	var qntdDiceAttack=0;
	var qntdDiceDefender=0;
	var i;

	// alert("esta atacando->"+armyAttack);
	// alert("esta defendendo->"+armyDefender);

	if (localStorage.getItem("A"+armyAttack) == 2 ) {
		document.getElementById('qntdYourAttack').options[0] = new Option( "1 army",1 );
	}
	else if (localStorage.getItem("A"+armyAttack) == 3 ) {
		document.getElementById('qntdYourAttack').options[0] = new Option( "1 army",1 );
		document.getElementById('qntdYourAttack').options[1] = new Option( "2 army's",2 );
	}
	else{
		document.getElementById('qntdYourAttack').options[0] = new Option( "1 army",1 );
		document.getElementById('qntdYourAttack').options[1] = new Option( "2 army's",2 );
		document.getElementById('qntdYourAttack').options[2] = new Option( "3 army's",3 );
	}	
			$("#qntdYourAttack").change(function(){
				sound(2);
			});

			//perguntar qtos dados usar??
		$('#btnAttack').unbind('click');//Reseta evento
		$("#btnAttack").click(function(){ //Evento de clicar no BtnAttck, para escolher qntd de armys atacantes
			qntdDiceAttack = parseInt(document.getElementById("qntdYourAttack").value);

			if (localStorage.getItem("A"+armyDefender)== 1) {
				qntdDiceDefender = 1;
			}
			else if(localStorage.getItem("A"+armyDefender)== 2){
				qntdDiceDefender = 2;
			}
			else if(localStorage.getItem("A"+armyDefender)> 2){
				qntdDiceDefender = 3;
			}
			
			compareDice(qntdDiceAttack,qntdDiceDefender,armyAttack,armyDefender);

			SelectionAttack=false;
			$('#btnAttack').unbind('click');
			document.getElementById("qntdYourAttack").options.length = 0;

		});
	
}

function clique(army){
	var valor = document.getElementById("army"+army).innerHTML;		
	var conquest;

	$('#army'+army).unbind('click');

			//De quem q é o domínio do território, deve ser feito pelo banco, retornando qual player conquistou

	conquest = localStorage.getItem("PlayerA"+army);


	if (player == turn){
		if (localStorage.getItem("LS_fasesOfGame")==1) {  //Fase de Batalha


			if ( (conquest == player)&&(localStorage.getItem("A"+army)>1) ){ //selecionado seu territorio como atacante

				SelectionAttack=true;
				armyAttack = army;

				// alert($("#army"+armyAttack).attr('title'));
				document.getElementById("b_qntd").innerHTML = localStorage.getItem("A"+armyAttack);
				document.getElementById("b_country").innerHTML = $("#army"+armyAttack).attr('title');

				// document.getElementById("attack").style.display = "block";
				reluzOn(army);
				// document.getElementById("attack").setAttribute('style', ' color: '+cor+';');

			}
			else if ( (SelectionAttack==true)&&(conquest != player) ){ // Já existe territorio atacante seleciona, agora será do oponente
				if ( connectArea(armyAttack,army) ) { //Verifica se há fronteira entre os territórios
					// alert("connectArea: TRUE pode atacar");

					document.getElementById("b_qntdE").innerHTML = localStorage.getItem("A"+army);
					document.getElementById("b_countryE").innerHTML = $("#army"+army).attr('title');
					
					// document.getElementById("attack").style.display = "none";				
				    reluzAttack(army);
					battle(armyAttack,army);
					SelectionAttack=false;
							    
				}

			}		

		}
		else if (localStorage.getItem("LS_fasesOfGame")==2) { //FASE UPDATE
			// alert("Fase 2");
			// reloadTerritory();
			if (conquest == player) {
				reluzOn(army);
				document.getElementById("armyYour").innerHTML = document.getElementById("army"+army).innerHTML;
				$('#heightBar').unbind('mousemove');//Reseta evento do heightbar
				$("#volume").attr("style"," opacity: 0.0;");
				updateTerritory(army);
			}

		}

	}	

}

function connectArea(armyAttack,armyDefender){
	var area;

				//FRONTEIRAS

	switch (armyAttack) {
		 case 0: area = [1,2]; 		break;
		 case 1: area = [0,2,3,7]; 	break;
		 case 2: area = [0,1,3];	break;
		 case 3: area = [1,2,10]; 	break;

		 case 4: area = [5,6,8]; 	break;
		 case 5: area = [4,6,8]; 	break;
		 case 6: area = [4,5,7,8]; 	break;
		 case 7: area = [1,6,8,9]; 	break;
		 case 8: area = [5,6,7,9]; 	break;
		 case 9: area = [7,8,27]; 	break;

		case 10: area = [3,11,12]; 		break;
		case 11: area = [10,12,14,17]; 	break;
		case 12: area = [10,11,12,13,14]; 	break;
		case 13: area = [12,14,15,16]; 	break;
		case 14: area = [11,12,13,16,17]; break;
		case 15: area = [13,16,37]; 	break;
		case 16: area = [13,15,18]; 	break;
		case 17: area = [11,14,18]; 	break;
		case 18: area = [16,17,20]; 	break;

		case 19: area = [20,21,22,25];	break;
		case 20: area = [18,19,25]; 	break;
		case 21: area = [7,9,19,22]; 	break;
		case 22: area = [19,21,23]; 	break;
		case 23: area = [7,8,27]; 		break;
		case 24: area = [23,25,27,29,32]; break;
		case 25: area = [19,20,24]; 	break;

		case 26: area = [9,23,24,27,29];	break;
		case 27: area = [26,28,29,30,39]; 	break;
		case 28: area = [27,30,40]; 		break;
		case 29: area = [24,26,27,30,32]; 	break;
		case 30: area = [27,28,29,31,32,33,34,37]; break;
		case 31: area = [30,37]; 			break;
		case 32: area = [24,29,30,33,34]; 	break;
		case 33: area = [30,32,34,35]; 		break;
		case 34: area = [32,33,35]; 		break;
		case 35: area = [33,34,36,37]; 		break;
		case 36: area = [34,35,37]; 		break;
		case 37: area = [15,30,31,35,36];	break;

		case 38: area = [39,40,41]; 	break;
		case 39: area = [27,38]; 		break;
		case 40: area = [28,38,41]; 	break;
		case 41: area = [38,40]; 		break;
	}
	
	for (var i=0; i < area.length; i++) {
		if (armyDefender==area[i]){
			return 1;
		}	
	};	
	return 0;
	
}

function reluzOn(army){
	reloadTerritory();
	document.getElementById("army"+army).style.border = "2px solid "+cor1;

}

function reluzAttack(army){
	document.getElementById("army"+army).style.border = "2px solid "+cor1;
	document.getElementById("army"+armyAttack).style.border = "2px solid "+cor2;

}

function reluzTransfer(army){
	reloadTerritory();
	document.getElementById("army"+army).style.border = "2px solid "+cor1;
	document.getElementById("army"+vArmy).style.border = "2px solid "+cor2;

}

function reluzUpdate(bonus){
	alert(bonus);
	// document.getElementById(".bonus").style.border = "2px solid "+cor1;
	// $(".bonus").css("border","1px solid #222");
	// document.getElementById("army"+army).setAttribute('style', 'background-color: yellow; border: 4px; solid #A0F ;');

}

function reluzContinent(army){
	document.getElementById("army"+army).style.border = "2px solid white";

}

function diceAnimation(who,value){
	//fazer animação dos dados


		diceAnima();
		// document.getElementById("diceAnimation").setAttribute('style', 'opacity: 1.0;');
	window.setTimeout(function() {
		document.getElementById("die"+who).innerHTML = parseInt(value);
		$("#die"+who).attr("style"," opacity: 1.0;"); // Dice Visible
		document.getElementById("diceAnimation").setAttribute('style', 'margin-left: -250px;margin-top: 300px;opacity: 0.0;');
		// alert("Tirou: "+value);
	}, 1100);

	// window.setTimeout("diceAnima",1000);
	// alert();
}


function explainStatus(){

	document.getElementById("armyNextPhase1").innerHTML= localStorage.getItem("bonusTerritory"+player);	
	document.getElementById("armyContinente").innerHTML = localStorage.getItem("bonusContinent"+player);
	document.getElementById("armyBonusCard").innerHTML = localStorage.getItem("bonusCards"+player);

	document.getElementById("showPlayer").innerHTML= "TURN -> Player: "+localStorage.getItem("LS_turn");

	if (localStorage.getItem("LS_fasesOfGame")==1) {
		document.getElementById("showPhase").innerHTML= "BATTLE";
		
	}
	else if (localStorage.getItem("LS_fasesOfGame")==2) {
		document.getElementById("showPhase").innerHTML= "UPDATE";
	}

		var list,h3,span;
		var count=0;

		list = document.getElementById("listPlayer");

		while (list.firstChild) {
			list.removeChild(list.firstChild);
		}

		for (var i=1; i<=qntdPlayer; i++) {  // Criação dinamica de Status de Players (Qntd de exercitos)
			for (var j=0; j<qntdTerritorios; j++) {
				if (parseInt(localStorage.getItem("PlayerA"+j)) == i){  // Saber qntd de exercitos
					count+= parseInt(localStorage.getItem("A"+j) );

				}
			};
			h3 = document.createElement("h3");
			span = document.createElement("span");
			h3.id = "Play"+i;
			span.id = "span"+i;
			h3.innerHTML = "Player "+i+"->  "+count;
			var sum= parseInt(localStorage.getItem("bonusTerritory"+i))+parseInt(localStorage.getItem("bonusContinent"+i))
				+parseInt(localStorage.getItem("bonusCards"));

			span.innerHTML = " +"+sum;
			list.appendChild(h3);
			h3.appendChild(span);

			document.getElementById("Play"+i).setAttribute('style', 'background-color: '+ whatYourColor(i)+";");
			document.getElementById("span"+i).setAttribute('style', 'font-size: 9px;');
			
			pieceTortaPie(count); // insere valor de cada pedaço do Torta pie
			count=0;
		};
	tortaPie(); // Função que desenha o Torta Pie
	document.getElementById('Play'+localStorage.getItem("LS_turn")).style.fontFamily='tahoma';
	document.getElementById('Play'+localStorage.getItem("LS_turn")).style.fontSize='16px';
	askObjective(localStorage.getItem("LS_objective"));
}

function sound(number){
	// alert("souu");
	switch (number) {
		case 1:
			$("#sound").attr('src','media/sounds/sample 7.wav'); 	break; // sound dice
		case 2:
			$("#sound").attr('src','media/sounds/sample 64.wav');	break;
		case 3:
			$("#sound").attr('src','media/sounds/sample 27.wav');	break;
		case 4:
			document.getElementById('sound').volume=0.5;
			$("#sound").attr('src','media/sounds/sample 59.wav');
			break;
		case 5:
			$("#sound").attr('src','media/sounds/sample 98.wav');	break;
		case 6:
			$("#sound").attr('src','media/sounds/battle.mp3');		break;
		case 7:
			$("#sound").attr('src','media/sounds/goal.mp3');		break;
		case 8:
			$("#sound").attr('src','media/sounds/sample 99.wav');	break;

	}document.getElementById("sound").play();

}

function loadingPage(){
	window.location.href = "thegame.html";

}

function teste(){





		
			// window.setTimeout(function() {
			// 	document.getElementById("diceAnimation").setAttribute('style', 'margin-left: -370px; margin-top: 500px;'+
			// 															  'transition-duration: 0.4s;opacity: 1.0;'
			// 															  );
			// }, 800);


	// document.getElementById("diceAnimation").src="img/dice.gif";

	// animationScroll(1);
	// window.open("teets");

 // localStorage.setItem("PlayerA2",1);
 // localStorage.setItem("bonusTerritory4",0);
 // alert(localStorage.getItem("bonusTerritory3"));
 // piece.push(10);
	// piece[1]=20;
	// alert(piece.length);
	// localStorage.setItem("bonusTerritory1",5);
	// alert(localStorage.getItem("bonusTerritory1"));
	// askObjective(6);
	// alert("souu");

	sound(8); //attack
	// $("#sound").attr('src','media/sounds/sample 27.wav');
	// document.getElementById("sound").play();
// $(function(){
//        $.get('teste.txt',function(data){
//               var contents = $.trim(data).split(/\n/);
//               alert(contents.shift());
//        });
// });


// 	String[] linhaDoArquivo = reader.readLine().split(";");  
// String numero = linhaDoArquivo[0];  
// String matricula = linhaDoArquivo[1];  
// String materia = linhaDoArquivo[2];  
// String prova = linhaDoArquivo[3];  
// String nota = linhaDoArquivo[4]; 

	// document.getElementById('texto').style.fontSize='20px' ;

	// // explainStatus();
	// document.getElementById('Play2').style.fontFamily='tahoma';
	// alert(localStorage.getItem("LS_turn"));
	// document.getElementById("Play2").setAttribute('style', 'background-color: yellow; border: 4px; solid #A0F ;');
	// document.getElementById("Play2").setAttribute('style', 'color: yellow; border: 4px; solid #A0F ;');

	// document.getElementById('Play2').style.border="red";

	// alert(document.getElementById("Play2").innerHTML);
	// conditionWinner(1);
	// document.getElementById("army2").style.border = "2px solid #FF0000";
	// load('index.html'); // carrega todo o arquivos
	// window.location.href = "index.html";

	// alert("conect "+connectArea(5,8));bonus
	// document.getElementById("showPhase").innerHTML= "UPDATE";
	// explainStatus();
	// $('#heightBar').unbind('change');
	// $(".bonus").css("border","1px solid #222 background-color black");

	// $("#die"+1).attr("style"," display: block;");
	// alert( conditionWinner( 1,parseInt(localStorage.getItem("LS_objective")) )  );

//showPhase

	// window.setTimeout("sound(2)",3000);
	
// $("#die"+1).attr("style"," opacity: 1.0;"); // Dice Visible


// $(document).ready(function(){
// 	$("h2").click(function(){					//API JQUERY
// 		$("#armyContinente").css("color","red");		
// 		$("#army"+1).css("border","1px solid #FFF");
// 	})
// });
}