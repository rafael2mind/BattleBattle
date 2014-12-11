
var sorteio = Array;
 sorteio = [];
var num=-1,numqtd=1;
var armyCor = 1;


function rollTheDice(){		
	return Math.floor((Math.random()*6)+1); //Valor de 1 a 6 Simulando um dado
}

function animationScroll(){

	window.setTimeout(function() {
		num+=1;

		var place = $("#army"+sorteio[num]);
		var position = place.position();
		var top, left;
		top = position.top;
		left = position.left;

		document.getElementById("country").innerHTML = $("#army"+sorteio[num]).attr('title');
		document.getElementById("country").setAttribute('style', 'margin-left: '+left+'px;	margin-top: '+top+'px;'+
																  'transition-duration: 0.4s;opacity: 1.0;'+
																  'background-color: '+whatYourColor(armyCor)+';'+
																  'width: 100px; font-size: 18px; opacity: 0.8'
																  );
		localStorage.setItem("A"+sorteio[num],10);
 		localStorage.setItem("PlayerA"+sorteio[num], armyCor);//dominio player
 		// animationScroll(territory[nRandom]);
 		// reloadTerritory();

		armyCor++;
		if (armyCor > qntdPlayer){
			armyCor = 1;					
		};
		
		if (num<sorteio.length) {
			animationScroll();			
		};
		if(num>=sorteio.length-1){
			window.setTimeout(function() {
				loadingPage();
			}, 480);
		};
		window.setTimeout(function() {
			sound(5);
		}, 400);

	}, 500);

	window.setTimeout(function() {
		// document.getElementById("country").setAttribute('style', 'display: block;');
		document.getElementById("country").setAttribute('style', 'margin-left: 725px; margin-top: 260px; opacity: 1.0;');
		document.getElementById("country").innerHTML = $("#army"+sorteio[num+1]).attr('title');
		reloadTerritory();
	}, 490);
		
}

function compareDice(diceA,diceD,armyAttack,armyDefender){ //qntd de dados escolhidos para o embate
		var i, j, swap;
		var dice1 = document.getElementById("die1");
		var valueDice = new Array();
			valueDice[1]=0;
			valueDice[2]=0;
			valueDice[3]=0;
			valueDice[4]=0;
			valueDice[5]=0;
			valueDice[6]=0;

	document.getElementById("pushDice").setAttribute('style', 'display: block;');

	var anime={
		init:function(){
			anime.valueDiceD();
			anime.pullBar();

		},

		pullBar:function(){
			var controle=true;
			document.getElementById("diceBar").value = 100;
			document.getElementById("diceBar").setAttribute('style', 'opacity: 1.0;');
			document.getElementById("diceAnimation").setAttribute('style', 'margin-left: 10px;	margin-top: 20px;'+
																  'width: 80px; height: 80px;'+
																  'opacity: 1.0;'
																  );

			$("#diceBar").mousemove(function(){
				// document.g().text = document.getElementById("diceBar").value;
				if ((document.getElementById("diceBar").value < 50) && (controle)) {
					sound(8);
					document.getElementById("diceAnimation").src="img/dice.gif";
					controle=false;

					

				}
				else if((document.getElementById("diceBar").value > 60) && (controle==false)){
					document.getElementById("diceAnimation").src="img/dice.png";
					controle=true;
				}

			});
			$("#diceBar").mouseup(function(){


				if (document.getElementById("diceBar").value < 10) {
					document.getElementById("diceBar").setAttribute('style', 'opacity: 0.0;');
					controle=null;
					window.setTimeout(function() {
						document.getElementById("diceAnimation").src="img/dice.png";
						anime.trajetoriaDice();					

					}, 2000);

				};
				document.getElementById("diceBar").value = 100;
			});
		},

		trajetoriaDice:function(){
			document.getElementById("diceAnimation").setAttribute('style', 'margin-left: 240px;	margin-top: 130px;'+
																  'width: 40px; height: 40px;'+
																  'transition-duration: 0.9s;opacity: 1.0;'
																  );
			window.setTimeout(function() {
				document.getElementById("diceAnimation").setAttribute('style', 'opacity: 0.0;');
				anime.valueDiceA();
			}, 700);

			// anime.pullBar();
		},

		valueDiceA:function(){
				i=(numqtd);
		 		valueDice[i]= rollTheDice();
		 		document.getElementById("die"+i).innerHTML = parseInt(valueDice[i]);		 	
		 		document.getElementById("die"+i).setAttribute('style', 'opacity: 1.0; background: red');
		 		alert(valueDice[i]);

		 		numqtd++;
		 		
		 		if(numqtd<=diceA){
		 			anime.pullBar();
		 		}
		 		else{
		 			anime.calculate();
		 		}

		},

		valueDiceD:function(){
			for (i=4; i <= (diceD+3); i++){
		 		valueDice[i]= rollTheDice();
		 		document.getElementById("die"+i).innerHTML = parseInt(valueDice[i]);		 	
		 		document.getElementById("die"+i).setAttribute('style', 'opacity: 1.0; background: yellow');
		 		// alert(valueDice[i]);
			}
			//Ordenação dos dados, maior p/ menor
			for (i = 1; i <= 2 ; i++) {
				for (j = i+1; j <= 3; j++) {
					if(valueDice[i+3]<valueDice[j+3]){  //ordena dados de Defense
						swap=valueDice[i+3];
						valueDice[i+3]=valueDice[j+3];
						valueDice[j+3]=swap;	
					}
				};		
			};
			for (i=4; i <= (diceD+3); i++){
		 		document.getElementById("die"+i).innerHTML = parseInt(valueDice[i]);
			}

		},

		calculate:function(){
			// alert(teste);

			for (i = 1; i <= 2 ; i++) {
				for (j = i+1; j <= 3; j++) {
					if(valueDice[i]<valueDice[j]){  //ordena dados de Attack
						swap=valueDice[i];
						valueDice[i]=valueDice[j];
						valueDice[j]=swap;
					}
				};		
			};
			for (i=1; i <= 3; i++){
			 		document.getElementById("die"+i).innerHTML = parseInt(valueDice[i]);
			}


				// //Lógica para comparação dos Dados
					// 	// Calculos de perdas
			var qts,vArmy,qtsLose=0;	
			if (diceA < diceD){
				qts=diceA;		
			}
			else{
				qts=diceD;
			}
			for (i = 1; i <= qts; i++) {
				if(valueDice[i] > valueDice[i+3]){	//Se attack ganhar retira 1 da defenser
					vArmy = parseInt(localStorage.getItem("A"+armyDefender))-1;
					localStorage.setItem("A"+armyDefender,vArmy);
					conditionWinner(parseInt(localStorage.getItem("LS_objective")) );	
					sound(2);
					$("#die"+[i+3]).attr("style"," opacity: 0.5;");
						alert("Atack Win");
				}
				else{	//Defesa ganhou
					vArmy = parseInt(localStorage.getItem("A"+armyAttack))-1;
					localStorage.setItem("A"+armyAttack,vArmy);
					qtsLose++;
					sound(3);
					$("#die"+i).attr("style"," opacity: 0.5;");
						alert("Defense Win");
				}
			}

			if (localStorage.getItem("A"+armyDefender)==0) {	// transfere exercito para território vazio 
				vArmy = parseInt(localStorage.getItem("A"+armyAttack))-(diceA-qtsLose);
				localStorage.setItem("A"+armyAttack,vArmy);
				localStorage.setItem("A"+armyDefender,(diceA-qtsLose));
				localStorage.setItem("PlayerA"+armyDefender,(localStorage.getItem("LS_turn")));
			};

			conditionWinner(parseInt(localStorage.getItem("LS_objective")) );
			loadingPage();
		}

	}

	anime.init();
}


// 			// alert("Atack = "+diceA+"\nDefesa = "+ diceD);
// }




	// for (i=1; i <= diceA; i++){
	// 	valueDice[i]= rollTheDice();
	// 			//Who Dice //Value Dice
	// 	diceAnimation( i,parseInt(valueDice[i]) );


	// 	// alert("Dice Attack");

	// }

	// window.setTimeout(function() {
	// 	for (i=4; i <= (diceD+3); i++){
	// 	 	valueDice[i]= rollTheDice();
	// 	 	document.getElementById("die"+i).innerHTML = parseInt(valueDice[i]);
	// 	 	diceAnimation( i,parseInt(valueDice[i]) );
	// 	// alert("Dice Deffense");
	// 	}
	// }, 2000);
	// window.setTimeout(function() {

	// }, 2100);
	// // alert("A1 --> "+ valueDice[1] +
	// // 	"\nA2 --> "+ valueDice[2] +
	// // 	"\nA3 --> "+ valueDice[3] +
	// // 	"\nD1 --> "+ valueDice[4] +
	// // 	"\nD2 --> "+ valueDice[5] +
	// // 	"\nD3 --> "+ valueDice[6] 
	// // );

	// //Lógica para comparação dos Dados


	// 			//Ordenação dos dados, maior p/ menor
	// window.setTimeout(function() {
	// 	for (i = 1; i <= 2 ; i++) {
	// 		for (j = i+1; j <= 3; j++) {
	// 			if(valueDice[i]<valueDice[j]){  //ordena dados de Attack
	// 				swap=valueDice[i];
	// 				valueDice[i]=valueDice[j];
	// 				valueDice[j]=swap;
	// 			}
	// 			if(valueDice[i+3]<valueDice[j+3]){  //ordena dados de Defense
	// 				swap=valueDice[i+3];
	// 				valueDice[i+3]=valueDice[j+3];
	// 				valueDice[j+3]=swap;	
	// 			}
	// 		};		
	// 	};

	// 	for (i=1; i < valueDice.length; i++) {
	// 			document.getElementById("die"+i).innerHTML = valueDice[i];
	// 	};

	// 	// alert("A1 --> "+ valueDice[1] +
	// 	// 	"\nA2 --> "+ valueDice[2] +
	// 	// 	"\nA3 --> "+ valueDice[3] +
	// 	// 	"\nD1 --> "+ valueDice[4] +
	// 	// 	"\nD2 --> "+ valueDice[5] +
	// 	// 	"\nD3 --> "+ valueDice[6] 
	// 	// );
	// }, 4000);
	// window.setTimeout(function() {
	// 	// Calculos de perdas
	// 	var qts,vArmy,qtsLose=0;	
	// 	if (diceA < diceD){
	// 		qts=diceA;		
	// 	}
	// 	else{
	// 		qts=diceD;
	// 	}
	// 	for (i = 1; i <= qts; i++) {	
	// 		if(valueDice[i] > valueDice[i+3]){	//Se attack ganhar retira 1 da defenser
	// 			vArmy = parseInt(localStorage.getItem("A"+armyDefender))-1;
	// 			localStorage.setItem("A"+armyDefender,vArmy);
	// 			conditionWinner(parseInt(localStorage.getItem("LS_objective")) );	
	// 			// sound(2);
	// 			$("#die"+[i+3]).attr("style"," opacity: 0.5;");
	// 					alert("Atack Win");
	// 		}
	// 		else{	//Defesa ganhou
	// 			vArmy = parseInt(localStorage.getItem("A"+armyAttack))-1;
	// 			localStorage.setItem("A"+armyAttack,vArmy);
	// 			qtsLose++;
	// 			// sound(3);
	// 			$("#die"+i).attr("style"," opacity: 0.5;");
	// 					alert("Defense Win");
	// 		}
	// 	}

	// 	if (localStorage.getItem("A"+armyDefender)==0) {
	// 		vArmy = parseInt(localStorage.getItem("A"+armyAttack))-(diceA-qtsLose);
	// 		localStorage.setItem("A"+armyAttack,vArmy);
	// 		localStorage.setItem("A"+armyDefender,(diceA-qtsLose));
	// 		localStorage.setItem("PlayerA"+armyDefender,(localStorage.getItem("LS_turn")));
	// 	};

	// 	conditionWinner(parseInt(localStorage.getItem("LS_objective")) );
	// 	loadingPage();
	// 	// window.setTimeout("loadingPage()",5000);
	// }, 5500);




// var transicao=750;
// function animationScroll(army){
// 	// position(army);

// 	window.setTimeout(function() {

// 		var place = $("#army"+army);
// 		var position = place.position();
// 		var top, left;
// 		top = position.top;
// 		left = position.left;

// 		// document.getElementById("country").setAttribute('style', 'margin-top:'+transicao+'px;');
// 		document.getElementById("country").setAttribute('style', 'margin-left:'+transicao+'px;');

// 		// alert(transicao+" <T--Top> "+top);
		
// 		if (transicao > top) {
// 			transicao-=100;
// 			animationScroll(army);
// 		};

// 	}, 500);