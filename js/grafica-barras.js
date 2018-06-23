 //CREACIÓN DEL GRÁFICO DEL BARRAS
 // Se establece el tamaño del Gráfico
 var margin = {
         top: 40,
         right: 40,
         bottom: 40,
         left: 60
     },
     width = 960 - margin.left - margin.right,
     height = 500 - margin.top - margin.bottom;

 var x = d3.scale.ordinal().rangeRoundBands([0, width], .1);

 var y = d3.scale.linear().range([height, 0]);

 // Se crean el eje 'x' y 'y'
 var xAxis = d3.svg.axis()
     .scale(x)
     .orient("bottom")


 var yAxis = d3.svg.axis()
     .scale(y)
     .orient("left")
     .ticks(10);

 // se crea el tip que aparece cuando se está en una barra
 var tip = d3.tip()
     .attr('class', 'd3-tip')
     .offset([-10, 0])
     .html(function (d) {
         return "<strong>No Diploma HS: </strong><span style='color:white'>" + d.no_high_school_diploma +
             "</span>";
     })

 // Se agrega el elemento svg en el div con el id: #grafica-barras
 var svg = d3.select("#grafica-barras").append("svg")
     .attr("id", "svg-1")
     .attr("preserveAspectRatio", "xMinYMin meet") // se utiliza para la responsividad del gráfico
     .attr("viewBox", "0 0 950 500") // se utiliza para la responsividad del gráfico
     .append("g")
     .attr("transform",
         "translate(" + margin.left + "," + margin.top + ")");

 svg.call(tip); //llamado del elemento tip

 // se traen los datos del API
 d3.json("https://data.cityofchicago.org/resource/gtem-tu7s.json", function (error, data) {

     data.forEach(function (d) {
         d.community_area = d.community_area;
         d.no_high_school_diploma = +d.no_high_school_diploma; //Se pasa cada elemento a número
     });

     // función utilizada para el orden de las barras
     data.sort(function (a, b) {
         return d3.descending(a.no_high_school_diploma, b.no_high_school_diploma)
     })

     // Números del eje X
     x.domain(data.map(function (d) {
         return d.community_area;
     }));

     // Números del eje Y
     y.domain([0, d3.max(data, function (d) {
         return d.no_high_school_diploma;
     })]);

     //Se le da estilo al eje X
     svg.append("g")
         .attr("class", "x axis")
         .attr("transform", "translate(0," + height + ")")
         .call(xAxis) //llamada de la instancia creada anteriormente con la orientación del eje
         .selectAll("text")
         .style("text-anchor", "end")
         .attr("dx", "-.8em")
         .attr("dy", "-.55em")
         .attr("transform", "rotate(-90)");

     //Se le da estilo al eje Y
     svg.append("g")
         .attr("class", "y axis")
         .call(yAxis) //llamada de la instancia creada anteriormente con la orientación del eje
         .append("text")
         .attr("y", -22)
         .attr("x", -60)
         .attr("dy", ".71em")
         .text("No Diploma High School")
         .style({
             "font-weight": "bold"
         });

     svg.append("text")
         .attr("text-anchor", "end")
         .attr("x", width + 20)
         .attr("y", height + 35)
         .text("Area")
         .style({
             "font-weight": "bold"
         });

     //Se crean las barras 
     svg.selectAll("bar")
         .data(data) //adjunto datos
         .enter().append("rect") //creación del elemento RECT
         .attr("class", "bar")
         .attr("x", function (d) {
             return x(d.community_area);
         })
         .attr("width", x.rangeBand())
         .attr("y", function (d) {
             return y(d.no_high_school_diploma);
         })
         .attr("height", function (d) {
             return height - y(d.no_high_school_diploma);
         })
         .on('mouseover', tip.show) //se muestra el tip
         .on('mouseout', tip.hide)
 });