import React, { useEffect, useState } from "react";

import API from "../utils/api";

import "../styles/styles.sass";

const AnkiStats = (props) => {
  useEffect(() => {
    const fetchStats = async () => {
      const response = await API.getAnkiStats();
      if (!response.result) {
        return;
      }

      // Just keep first section with the summary stats
      const doc = new DOMParser().parseFromString(response.result, "text/html");
      const result = doc.evaluate(
        "//center/*[position()=2]", // 1-indexed in xpath
        doc,
        null,
        XPathResult.ANY_TYPE,
        null
      );
      let nodes = [];
      let node = null;
      while ((node = result.iterateNext())) {
        nodes.push(node);
      }
      // Remove conflicting class name "section"
      nodes.forEach((node) => {
        if (node.classList && node.classList.contains("section")) {
          node.classList.remove("section");
        }
      });
      const parentNode = document.getElementById("stats");
      parentNode.innerHTML = "";
      parentNode.append(...nodes);
    };

    fetchStats();
  });

  return (
    <div>
      <center id="stats">
        <div className="panel-block loading-panel">
          <progress className="progress is-small is-primary" max="100">
            15%
          </progress>
          <div className="loading-text">Loading...</div>
        </div>
      </center>
      <style jsx>{`
        .progress {
          margin-bottom: 0px;
        }

        .loading-text {
          margin-left: 12px;
        }
      `}</style>
    </div>
  );
};

export default AnkiStats;
