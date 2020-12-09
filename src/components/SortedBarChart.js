import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { Box } from "grommet";

const SortedBarChart = React.memo((props) => {
  const { yData, min, max, len } = props;
  const canvasRef = useRef(null);
  const yDataparse = yData.split(",").map(function (t) {
    return parseInt(t);
  });

  let dataset = [];
  let datasetObj = {};
  for (let i = 0; i < len; i++) {
    datasetObj["x"] = i;
    datasetObj["value"] = yDataparse[i];
    dataset.push(datasetObj);
    datasetObj = {};
  }

  useEffect(() => {
    updateChart(dataset, min, max);
  });

  const updateChart = (data, min, max) => {
    let margin = { top: 20, right: 20, bottom: 20, left: 30 },
      width = 950 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    const xScale = d3
      .scaleBand()
      .domain(d3.range(data.length))
      .range([0, width])
      .padding(0.1);

    const yScale = d3.scaleLinear().domain([0, 90]).range([height, 0]);

    var yAxis = d3.axisLeft(yScale);

    let bars = d3.select(canvasRef.current).selectAll("rect").data(data);

    bars
      .enter()
      .append("rect")
      .merge(bars)
      .transition()
      .duration(1000)
      .attr("x", (d) => xScale(d.x))
      .attr("y", (d) => yScale(d.value))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => height - yScale(d.value))
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var svg = d3
      .selectAll(".BarViz")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xScale));

    svg.append("g").call(yAxis);
  };

  return (
    <Box direction="row">
      <div>
        <svg className="BarViz" width="1000" height="500" ref={canvasRef} />
      </div>
    </Box>
  );
});

export default SortedBarChart;
