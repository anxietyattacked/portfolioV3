import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Button from "@mui/material/Button";
import * as d3 from "d3";
import React, { useRef, useEffect, useState } from "react";
import ComputerIcon from "@mui/icons-material/Computer";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import Paper from "@mui/material/Paper";
import Projects from "../components/Projects";

export default function Home() {
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
        marginBottom = 0, // the bottom margin, in pixels
        marginLeft = 5, // the left margin, in pixels
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
        .attr("fill", color)
        .selectAll("rect")
        .data(I)
        .join("rect")
        .attr("x", (i) => xScale(X[i]))
        .attr("y", (i) => yScale(Y[i]))
        .attr("height", (i) => yScale(0) - yScale(Y[i]))
        .attr("width", xScale.bandwidth())
        .attr("stroke", "white")
        .attr("stroke-width", "5px");

      if (title) bar.append("title").text(title);

      svg
        .append("g")
        .attr("transform", `translate(0,${height - marginBottom})`)
        .call(xAxis);

      return svg.node();
    }
    if (data) {
      BarChart(data);
    }
  }, [data, viz]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Michael Bergerson | Portfolio</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <section id="hero" className={styles.heroContainer}>
          <div className={styles.heroTextContainer}>
            <div className={styles.heroTextGroup}>
              <div className={styles.heroText}>
                Hi, I am{" "}
                <span className={styles.spanColor}>Michael Bergerson</span>,
              </div>
              <div className={styles.heroSubText}>
                Data Analyst / Web Developer
              </div>
              <div className={styles.heroButtonDiv}>
                <Button
                  size="large"
                  href="#contact"
                  variant="outlined"
                  className={`${styles.buttonFont} ${styles.heroButton}`}
                >
                  Contact Me
                </Button>
              </div>
            </div>
          </div>
          <div className={styles.vizContainer}>
            <svg className={styles.viz} ref={viz} />
          </div>
        </section>
        <section id="about" className={styles.aboutContainer}>
          <div className={styles.sectionHeader}>About</div>
          <div className={styles.bgDiv}>
            <div className={styles.aboutDiv}>
              <p className={`${styles.buttonFont} ${styles.aboutText}`}>
                I graduated from Oregon State University with a Bachelors of
                Science in Economics. After college I started learning Python
                for data analysis. After learning the basics of programing, I
                wanted to learn the data visualization library d3.js and web
                development in general. So I learned JavaScript, React, CSS,
                HTML and started building projects. I have also continued
                learning about data analysis and data science as well. For data
                analysis I frequently use Python, R, SQL, Tableau, Excel,
                Pandas, Tidyverse, and Plotly. For web development I frequently
                JavaScript TypeScript, React, CSS, HTML, Node, GraphQL, and
                D3.js.
              </p>
            </div>
          </div>
        </section>
        <section id="skills" className={styles.aboutContainer}>
          <div className={styles.sectionHeader}>Skills</div>
          <div className={styles.bgDiv}>
            <div className={styles.skillsDiv}>
              <div className={styles.dataDiv}>
                <div className={styles.dataIconDiv}>
                  <QueryStatsIcon className={styles.dataIcon} />
                </div>
                <h3
                  className={`${styles.buttonFont}`}
                  style={{ textAlign: "center" }}
                >
                  Data Science
                </h3>
                <p
                  className={`${styles.buttonFont}`}
                  style={{ textAlign: "center" }}
                >
                  <strong>Languages:</strong>Python, R, SQL, Javascript,
                  Typescript, CSS HTML
                </p>
                <p
                  className={`${styles.buttonFont}`}
                  style={{ textAlign: "center" }}
                >
                  <strong>Technologies:</strong> Tableau, Pandas, NumPy,
                  Tidyverse, Excel, Google Sheets, Plotly, Seaborn, ggplot2,
                  Statistics, Jupyter Notebook, BigQuery, APIs, React, D3.js,
                  Node.js, PostgreSQL, Git
                </p>
              </div>
              <div className={styles.dataDiv}>
                <div className={styles.webIconDiv}>
                  <ComputerIcon className={styles.webIcon} />
                </div>
                <h3
                  className={`${styles.buttonFont}`}
                  style={{ textAlign: "center" }}
                >
                  Web Developement
                </h3>
                <p
                  className={`${styles.buttonFont}`}
                  style={{ textAlign: "center" }}
                >
                  <strong>Languages:</strong>Javascript, Typescript, CSS HTML,
                  Python, R, SQL
                </p>
                <p
                  className={`${styles.buttonFont}`}
                  style={{ textAlign: "center" }}
                >
                  <strong>Technologies:</strong> React, D3.js, Plotly.js
                  Three.js, Material UI, Tailwind CSS, React Router, Formik,
                  React Table, Node.js, Next.js, Express, Redis, PostgreSQL,
                  GraphQL, Apollo Server, Argon2, Typeorm, Stripe, Git, Tableau,
                  Pandas, Tidyverse, Plotly
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="projects" className={styles.aboutContainer}>
          <div className={styles.sectionHeader}>Projects</div>
          <div className={styles.bgDiv}>
            <Projects />
          </div>
        </section>
        <section id="contact" className={styles.aboutContainer}>
          <div className={styles.sectionHeader}>Contact</div>
          <div style={{ display: "grid", placeContent: "center" }}>
            <div className={styles.contactDiv}>
              <Button href="https://www.linkedin.com/in/michaelbergerson">
                <LinkedInIcon className={styles.contactIcons} />
              </Button>
              <Button href="https://github.com/anxietyattacked">
                <GitHubIcon
                  className={styles.contactIcons}
                  href="https://github.com/anxietyattacked"
                />
              </Button>
              <Button href="mailto:michaelbergerson@gmail.com">
                <EmailIcon className={styles.contactIcons} />
              </Button>
            </div>
            <h6 className={`${styles.buttonFont}  ${styles.contactText}`}>
              Email: michaelbergerson@gmail.com
            </h6>
          </div>
        </section>
      </main>
      <footer className={styles.footer}>Michael Bergerson © 2022</footer>
    </div>
  );
}
