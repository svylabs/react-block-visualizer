import React, { useEffect, useRef, useState } from "react";
import styles from "./Earn.module.scss";
import { blocks_submitted, blocks_confirmed } from "~/data/graph-data";
import { DataSet, Network } from "vis-network";
type Props = {};

const Earn = (props: Props) => {
  const [nodes, setNodes] = useState<any[]>([]);
  const [edges, setEdges] = useState<any[]>([]);
  const [data, setData] = useState<{ nodes: any; links: any }>({
    nodes: [],
    links: [],
  });
  let pos = useRef({ x: 0, y: 150 });
  const ref = useRef<HTMLDivElement>(null);

  // WARNING! do not try to refactor this
  useEffect(() => {
    setData({ nodes, links: edges });
  }, [nodes, edges]);

  useEffect(() => {
    blocks_submitted.forEach(([from, to]) => {
      setNodes((prev) => {
        const fromAlreadyExist = prev.some((i) => i.id === from);

        if (!fromAlreadyExist) {
          prev.push({
            id: from,
            label: from,
            ...(blocks_confirmed.includes(from)
              ? { color: "green", font: "14px Arial white" }
              : { color: "yellow" }),
            // x: pos.current.x,
            // y: pos.current.y,
          });
        }
        pos.current.x += 10;

        const toAlreadyExist = prev.some((i) => i.id === from);

        if (!toAlreadyExist) {
          prev.push({
            id: to,
            label: to,
            color: blocks_confirmed.includes(from) ? "green" : "yellow",
            // x: pos.current.x,
            // y: pos.current.y,
          });
        }
        pos.current.x += 10;

        return prev;
      });

      setEdges((prev) => {
        const edgeAlreadyExist = prev.some(
          (p) => p.from === from && p.to === to
        );

        if (!edgeAlreadyExist) {
          prev.push({
            from,
            to,
          });
        }
        return prev;
      });
    });
  }, [blocks_submitted]);

  useEffect(() => {
    var data = {
      nodes: nodes,
      edges: edges,
    };
    var options = {
      height: "100%",
      physics: false,
      nodes: {
        shape: "circle",
      },
      interaction: {
        dragNodes: false,
      },
      layout: {
        hierarchical: {
          // levelSeparation: 50,
          direction: "LR",
          // nodeSpacing: 400,
        },
      },
    };

    if (ref.current) {
      console.log("asfdasd");
      var network = new Network(ref.current, data, options);
    }
  }, [nodes, edges, blocks_submitted]);

  return (
    <div className={styles.earnPage}>
      <section>
        <h3>1. Earn coins by submitting Bitcoin block headers</h3>
        <div className={styles.box}>
          <p className={styles.subTitle}>Earn 10 coins</p>
          <div ref={ref} className={styles.graph}></div>
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
