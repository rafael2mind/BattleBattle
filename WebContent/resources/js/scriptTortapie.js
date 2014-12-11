var piece = Array;
 piece = [];
function pieceTortaPie(count){
   piece.push(count);

}

function tortaPie() {

	     // Load the Visualization API and the piechart package.
      google.load('visualization', '1.0', {'packages':['corechart']});
       
      // Set a callback to run when the Google Visualization API is loaded.
      google.setOnLoadCallback(drawChart);
 
      // Função q carrega os dados e desenha o grafico em pizza
       
      function drawChart() {
 
      // Criar tipo data table
      var data = new google.visualization.DataTable();
     //no caso do grafico  pizza possui duas colunas, com duas colunas
      data.addColumn('string', 'Bebida');
      data.addColumn('number', 'Quantidade');
     //linha da tabela

      for (var i=0; i< piece.length; i++) {
        data.addRows([
          ['', piece[i]]
        ]);
      };

     // data.addRows([

     //    // ['', 20],
     //    // ['', 10],
     //    // ['', 10],
     //    // ['', 10],
     //    ['', 10]
     //  ]);
 
      // Options do chart, podemos alterar varios campos, segue a documentação de options para pizza, http://code.google.com/apis/chart/interactive/docs/gallery/piechart.html
      var options = {
      				 // 'title':'Domination', //titulo
                     // 'titleTextStyle': {fontSize: 6},//estilo do texto, é possivel alterar fonte e cor tb
                      // 'legend':{position: 'right', textStyle: {color: 'black', fontSize: 12}},//legenda
                     'slices': {
                     		0: {color: whatYourColor(1)},
                     		1: {color: whatYourColor(2)},
                     		2: {color: whatYourColor(3)},
                     		3: {color: whatYourColor(4)},
                     		4: {color: whatYourColor(5)},
                        5: {color: whatYourColor(6)}
                     }, //personalizar a cor do slice
                     // 'slices': {1: {color: 'red'}},
            		 // 'width':400, //size
               //       'height':240
                 	};
 
      // desenho do grafico
      var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
      chart.draw(data, options);
    }

}