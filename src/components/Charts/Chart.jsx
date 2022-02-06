import React, { useLayoutEffect, useRef } from "react";
import * as d3 from "d3";
const data = [4, 8, 15, 16, 23, 42];
const width = 500;

export const Chart = () => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    // Определяем ось x
    const x = d3
      .scaleLinear()
      .domain([0, d3.max(data) + 5])
      .range([0, width]);

    const xAxis = d3.axisBottom(x).ticks(data.length).tickSizeOuter(0);

    //Определяем ось y
    const y = d3
      .scaleBand()
      .domain(d3.range(data.length))
      .range([0, 20 * data.length]);

    const yAxis = d3
      .axisLeft(y)
      .ticks(data.length)
      .tickFormat((val) => `#${val + 1}`)
      .tickSizeOuter(0);

    //Выбираем контейнер где будем показывать диаграмму
    const svg = d3.select(containerRef.current);

    //Определяем свойства контейнера
    svg
      .attr("width", width)
      .attr("font-family", "sans-serif")
      .attr("font-size", "10")
      .attr("text-anchor", "end");

    //Определяем столбцы диаграммы
    const bar = svg
      .selectAll("g")
      .data(data)
      .join("g")
      .attr("transform", (d, i) => `translate(20,${y(i)})`);

    // Рисуем столбцы
    bar
      .append("rect")
      .attr("fill", "steelblue")
      .attr("width", x)
      .attr("height", y.bandwidth() - 1);

    // Добавляем текст
    bar
      .append("text")
      .attr("fill", "white")
      .attr("x", (d) => x(d) - 3)
      .attr("y", (y.bandwidth() - 1) / 2)
      .attr("dy", "0.35em")
      .text((d) => d);

    // Отрисовывем оси
    svg
      .append("g")
      .call(xAxis)
      .attr("transform", `translate(20, ${y.range()[1] + 2})`);

    svg.append("g").call(yAxis).attr("transform", `translate(20, 0)`);
  }, []);

  return (
    <div style={{ display: "flex", width: "100%", alignItems: "center" }}>
      <svg width="100%" ref={containerRef}></svg>
    </div>
  );
};
