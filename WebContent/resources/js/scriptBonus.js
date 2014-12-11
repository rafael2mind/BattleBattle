function acceptBonus(player){
	acceptBonusTerritory();
	acceptBonusContinent();

	reloadTerritory();
}

function acceptBonusContinent(){
	var i, bonus=0;


	if (americaDoSulConquest()) {
		bonus+=2;
		alert("americaDoSul");
		alert ("bonus->"+bonus)
	}
	if (americaDoNorteConquest()) {
		bonus+=5;
		alert("americaDoNorte");
	}
	if (africaConquest()) {
		bonus+=3;
		alert("africa");
	}
	if (europaConquest()) {
		bonus+=9;
		alert("euro");
	}
	if (asiaConquest()) {
		bonus+=9;
		alert("asi");
	}
	if (oceaniaConquest()) {
		bonus+=2;
		alert("americaDoSul");
	}

	if(localStorage.getItem("LS_turn") == localStorage.getItem("LS_player")){
		bonus=bonus+parseInt(localStorage.getItem("bonusContinent"+player));
		localStorage.setItem("bonusContinent"+player,bonus);
	}
	
}

function acceptBonusTerritory(){
	var bonus = 0;
	for (var i = 0; i < qntdTerritorios; i++){
		if (localStorage.getItem("PlayerA"+i)==localStorage.getItem("LS_turn")){
			bonus+= parseInt(localStorage.getItem("A"+i));
		};
	};
	bonus=(bonus/2)+parseInt(localStorage.getItem("bonusTerritory"+player));
	localStorage.setItem("bonusTerritory"+player,parseInt(bonus));

}