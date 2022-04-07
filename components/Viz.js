import React, { useRef, useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import * as d3 from "d3";

const Viz = () => {
  const viz = useRef();
  const [data, setData] = useState();

  useEffect(() => {
    const row = (d) => {
      (d["speed"] = +d["speed"]),
        (d["stuff"] = +d["stuff"]),
        (d["cargo"] = +d["cargo"]);
      return d;
    };
    d3.csv("/data/multibar.csv", row).then((d) => setData(d));
  }, []);
  useEffect(() => {
    console.log(data);
  }, [data]);

  useEffect(() => {
    function BarChart(
      data,
      {
        x = (d, i) => d["item"], // given d in data, returns the (ordinal) x-value
        y = (d) => d["speed"], // given d in data, returns the (quantitative) y-value
        title, // given d in data, returns the title text
        marginTop = 5, // the top margin, in pixels
        marginRight = 0, // the right margin, in pixels
        marginBottom = 5, // the bottom margin, in pixels
        marginLeft = 0, // the left margin, in pixels
        width = 750, // the outer width of the chart, in pixels
        height = 422, // the outer height of the chart, in pixels
        xDomain, // an array of (ordinal) x-values
        xRange = [marginLeft, width - marginRight], // [left, right]
        yType = d3.scaleLinear, // y-scale type
        yDomain, // [ymin, ymax]
        yRange = [height - marginBottom, marginTop], // [bottom, top]
        xPadding = 0.1, // amount of x-range to reserve to separate bars
        yFormat, // a format specifier string for the y-axis
        yLabel, // a label for the y-axis
        color = "#7ed957", // bar fill color
      } = {}
    ) {
      // Compute values.
      const X = d3.map(data, x);
      const Y = d3.map(data, y);
      const colors = ["#ffbd59", "#ff5757", "#2d8bba", "#8C52FF", "#7ED957"];
      // Compute default domains, and unique the x-domain.
      if (xDomain === undefined) xDomain = X;
      if (yDomain === undefined) yDomain = [0, d3.max(Y)];
      xDomain = new d3.InternSet(xDomain);

      // Omit any data not present in the x-domain.
      const I = d3.range(X.length).filter((i) => xDomain.has(X[i]));

      // Construct scales, axes, and formats.
      const xScale = d3.scaleBand(xDomain, xRange).padding(xPadding);
      const yScale = yType(yDomain, yRange);
      const xAxis = d3.axisBottom(xScale).tickSizeOuter(0);
      const yAxis = d3.axisLeft(yScale).ticks(height / 40, yFormat);

      const svg = d3
        .select(viz.current)
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

      const bar = svg
        .append("g")
        .selectAll("rect")
        .data(I)
        .join("rect")
        .attr("fill", (i) => colors[i])
        .attr("x", (i) => xScale(X[i]))
        .attr("y", (i) => yScale(Y[i]))
        .attr("height", (i) => yScale(0) - yScale(Y[i]))
        .attr("width", xScale.bandwidth())
        // .attr("stroke", "white")
        // .attr("stroke-width", "5px")
        .attr("rx", "0.5rem") // how much to round corners - to be transitioned below
        .attr("ry", "0.5rem")
        .attr("opacity", 1);

      return svg.node();
    }
    if (data) {
      BarChart(data);
    }
  }, [data, viz]);
  return (
    <div className={styles.vizContainer}>
      <svg className={styles.viz} ref={viz} />
    </div>
  );
};

export default Viz;
