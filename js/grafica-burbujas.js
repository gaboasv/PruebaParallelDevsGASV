//CREACIÓN DEL GRÁFICO BURBUJA
var diameter = 1000, //máximo diametro que puede tener una burbuja
color = d3.scale.category10(); //paleta de colores utilizada

//creación de las burubujas
var bubble = d3.layout.pack()
  .sort(null)
  .size([diameter, diameter])
  .padding(1.5);

var svg2 = d3.select("#grafica-burbujas")
  .append("svg")
  .attr("id", "svg-2")
  .attr("preserveAspectRatio", "xMinYMin meet") //utilizado para la responsividad del gráfico
  .attr("viewBox", "0 0 980 990") //utilizado para la responsividad del gráfico
  .attr("class", "bubble");

var tip2 = d3.select("body")
  .append("div")
  .style("position", "absolute")
  .style("z-index", "10")
  .style("visibility", "hidden")
  .style("color", "white")
  .style("padding", "8px")
  .style("background-color", "rgba(0, 0, 0, 0.75)")
  .style("border-radius", "6px")
  .style("font", "12px sans-serif")
  .text("tip2");

d3.json("https://data.cityofchicago.org/resource/gtem-tu7s.json", function (error, data) {
  data.sort(function (a, b) {
      return d3.descending(a.birth_rate, b.birth_rate)
  })
  //Se pasa de string a número
  data = data.map(function (d) {
      d.value = +d.birth_rate;
      return d;
  });

  //Se pasan burbuja a nodos
  var nodes = bubble.nodes({
      children: data
  }).filter(function (d) {
      return !d.children;
  });

  var bubbles = svg2.append("g")
      .attr("transform", "translate(0,0)")
      .selectAll(".bubble")
      .data(nodes)
      .enter();

  //creación de las burbujas
  bubbles.append("circle")
      .attr("r", function (d) {
          return d.r;
      })
      .attr("cx", function (d) {
          return d.x;
      })
      .attr("cy", function (d) {
          return d.y;
      })
      .style("fill", function (d) {
          return color(d.value);
      }) // Manejo de eventos para la aparición del elemento tip
      .on("mouseover", function (d) {
          tip2.text("Birth rate: " + d.birth_rate);
          tip2.style("visibility", "visible");
      })
      .on("mousemove", function () {
          return tip2.style("top", (d3.event.pageY - 10) + "px").style("left", (d3
              .event.pageX + 10) + "px");
      })
      .on("mouseout", function () {
          return tip2.style("visibility", "hidden");
      });

  //se agrega el texto a la burbuja
  bubbles.append("text")
      .attr("x", function (d) {
          return d.x;
      })
      .attr("y", function (d) {
          return d.y + 5;
      })
      .attr("text-anchor", "middle")
      .text(function (d) {
          return d.community_area_name.substring(0, d.r / 4); // se corta de acuerdo a la medida de la burbuja
      })
      .style({
          "fill": "white",
          "font-size": "12px"
      });
})
