import React, { useEffect, useRef, useState } from "react";
import { Network } from "vis-network";
import styles from "./Graph.module.scss";

type Props = {
  submittedBlocks: string[][];
  confirmedBlocks?: string[];
};

const options = {
  height: "100%",
  physics: false,
  nodes: {
    shape: "circle",
  },
  interaction: {
    dragNodes: false,
    zoomView: false,
  },
  layout: {
    hierarchical: {
      direction: "LR",
    },
  },
};

const Graph = ({ submittedBlocks, confirmedBlocks }: Props) => {
  const [nodes, setNodes] = useState<any[]>([]);
  const [edges, setEdges] = useState<any[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    submittedBlocks.forEach(([from, to]) => {
      setNodes((prev) => {
        const fromAlreadyExist = prev.some((i) => i.id === from);
        const toAlreadyExist = prev.some((i) => i.id === to);

        if (!fromAlreadyExist) {
          prev.push({
            id: from,
            label: from,
            ...(confirmedBlocks?.includes(from)
              ? { color: "green", font: "14px Arial white" }
              : { color: "orange" }),
          });
        }
        if (!toAlreadyExist) {
          prev.push({
            id: to,
            label: to,
            ...(confirmedBlocks?.includes(from)
              ? { color: "green", font: "14px Arial white" }
              : { color: "orange" }),
          });
        }

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
  }, [submittedBlocks]);

  useEffect(() => {
    if (ref.current) {
      const data = { nodes, edges };
      const network = new Network(ref.current, data, options);
    }
  }, [nodes, edges, ref]);

  return <div className={styles.root} ref={ref}></div>;
};

export default Graph;
