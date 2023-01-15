import React, { useEffect, useRef, useState } from "react";
import styles from "./Earn.module.scss";
import { blocks_submitted, blocks_confirmed } from "~/data/graph-data";
import { Graph } from "react-d3-graph";

type Props = {};

const myConfig = {
  automaticRearrangeAfterDropNode: false,
  collapsible: false,
  directed: false,
  focusAnimationDuration: 0,
  focusZoom: 1,
  freezeAllDragEvents: false,
  height: 400,
  highlightDegree: 1,
  highlightOpacity: 1,
  linkHighlightBehavior: false,
  maxZoom: 8,
  minZoom: 0.1,
  nodeHighlightBehavior: false,
  panAndZoom: false,
  staticGraph: true,
  staticGraphWithDragAndDrop: false,
  width: 1000,
  d3: {
    alphaTarget: 0.05,
    gravity: -10,
    linkLength: 100,
    linkStrength: 1,
    disableLinkForce: false,
  },
  node: {
    color: "#d3d3d3",
    fontColor: "black",
    fontSize: 8,
    fontWeight: "normal",
    highlightColor: "SAME",
    highlightFontSize: 8,
    highlightFontWeight: "normal",
    highlightStrokeColor: "SAME",
    highlightStrokeWidth: 3,
    mouseCursor: "pointer",
    opacity: 1,
    renderLabel: true,
    size: 200,
    strokeColor: "none",
    strokeWidth: 1.5,
    svg: "",
    symbolType: "circle",
  },
  link: {
    color: "#d3d3d3",
    fontColor: "black",
    fontSize: 8,
    fontWeight: "normal",
    highlightColor: "SAME",
    highlightFontSize: 8,
    highlightFontWeight: "normal",
    mouseCursor: "pointer",
    opacity: 1,
    renderLabel: false,
    semanticStrokeWidth: false,
    strokeWidth: 1.5,
    markerHeight: 6,
    markerWidth: 6,
    strokeDasharray: 0,
    strokeDashoffset: 0,
    strokeLinecap: "butt",
  },
};

const Earn = (props: Props) => {
  const [nodes, setNodes] = useState<any[]>([]);
  const [edges, setEdges] = useState<any[]>([]);
  const [data, setData] = useState<{ nodes: any; links: any }>({
    nodes: [],
    links: [],
  });
  let pos = useRef({ x: 0, y: 150 });

  // WARNING! do not try to refactor this
  useEffect(() => {
    setData({ nodes, links: edges });
  }, [nodes, edges]);

  useEffect(() => {
    blocks_submitted.forEach(([source, target]) => {
      setNodes((prev) => {
        prev.push({
          id: source,
          label: source,
          color: blocks_confirmed.includes(source) ? "green" : "yellow",
          x: pos.current.x,
          y: pos.current.y,
        });
        pos.current.x += 10;
        prev.push({
          id: target,
          label: target,
          color: blocks_confirmed.includes(source) ? "green" : "yellow",
          x: pos.current.x,
          y: pos.current.y,
        });
        pos.current.x += 10;

        return prev;
      });

      setEdges((prev) => {
        prev.push({
          source,
          target,
        });
        return prev;
      });
    });
  }, [blocks_submitted]);

  return (
    <div className={styles.earnPage}>
      <section>
        <h3>1. Earn coins by submitting Bitcoin block headers</h3>
        <div className={styles.box}>
          <p className={styles.subTitle}>Earn 10 coins</p>
          <Graph
            id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
            data={data}
            config={myConfig}
            onClickNode={(nodeId, node) => {
              console.log(nodeId, node);
            }}
          />
        </div>
      </section>
      <section>
        <h3>2. Earn 0.05% on transaction by submitting proof of payment</h3>
        <div className={styles.box}>SOmething</div>
      </section>
    </div>
  );
};

export default Earn;
