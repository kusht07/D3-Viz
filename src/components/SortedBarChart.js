import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { Box, generate } from "grommet";
import "../App.css";

const SortedBarChart = React.memo((props) => {
  const { yData, min, max } = props;
  const canvasRef = useRef(null);
  const yDataparse = yData.split(",").map(function (t) {
    return parseInt(t);
  });
  useEffect(() => {
    drawBarChart(yDataparse, min, max);
  });

  function drawBarChart(data, min, max) {

    var margin = { top: 30, right: 10, bottom: 10, left: 30 },
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    // add x and y scales
    var y = d3.scaleLinear().domain([min, max]).range([height, 0]).nice();
    var x = d3
      .scaleBand()
      .domain(d3.range(data.length))
      .range([0, width], 0.2)
      .padding(0.1);

    var yAxis = d3.axisLeft(y);

    d3.select(".BarViz > *").remove();

    // set svg dimensions
    var svg = d3
      .select(canvasRef.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      
    // draw bars  
    svg
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", function (d) {
        return d < 0 ? "bar negative" : "bar positive";
      })
      .attr("y", function (d) {
        return y(Math.max(0, d));
      })
      .attr("x", function (d, i) {
        return x(i);
      })
      .attr("height", function (d) {
        return Math.abs(y(d) - y(0));
      })
      .attr("width", x.bandwidth());


     // Generate axes
    svg.append("g").attr("class", "x axis").call(yAxis);

    svg
      .append("g")
      .attr("class", "y axis")
      .append("line")
      .attr("y1", y(0))
      .attr("y2", y(0))
      .attr("x1", 0)
      .attr("x2", width);
  }

  return <Box className="BarViz" ref={canvasRef}></Box>;
})
export default SortedBarChart;
