import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { Box } from "grommet";
import "../App.css";

export default function SortedBarChart({ yData, min, max }) {
  const canvasRef = useRef(null);
  const yDataparse = yData.split(",").map(function (t) {
    return parseInt(t);
  });
  useEffect(() => {
    updateChart(yDataparse, min, max);
  });

  const updateChart = (data, min, max) => {
    // Generate Margins
    let margin = { top: 20, right: 20, bottom: 20, left: 30 },
      width = 1000 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    // Create Scales
    const xScale = d3
      .scaleBand()
      .domain(d3.range(data.length))
      .range([0, width])
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([-min, max])
      .range([height, 0])
      .nice();

    var yAxis = d3.axisLeft(yScale); //define Yaxis

    // Set svg to width and height

    var svg = d3
      .select(canvasRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    let bars = d3.select(canvasRef.current).selectAll("rect").data(data);
    // Generate and merge bars
    bars
      .enter()
      .append("rect")
      .merge(bars)
      .attr("class", function (d) {
        return d < 0 ? "bar negative" : "bar positive";
      })
      .transition()
      .duration(1000)
      .attr("y", function (d) {
        return yScale(Math.max(0, d));
      })
      .attr("x", function (d, i) {
        return xScale(i);
      })
      .attr("height", function (d) {
        return Math.abs(yScale(d) - yScale(0));
      })
      .attr("width", xScale.bandwidth())
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Create axes
    svg
      .append("g")
      .attr("class", "x axis")
      .append("line")
      .attr("y1", yScale(0))
      .attr("y2", yScale(0))
      .attr("x1", 0)
      .attr("x2", width);

    svg.append("g").attr("class", "y axis").call(yAxis);
    bars.exit().remove();
  };

  return (
    <Box>
        <svg width="1000" height="500" ref={canvasRef} />
    </Box>
  );
};

// export default SortedBarChart;
