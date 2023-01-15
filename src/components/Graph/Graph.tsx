import React, { useEffect, useState } from "react";
import { blocks_submitted } from "~/data/graph-data";

type Props = {};

const Graph = (props: Props) => {
  const [blocks, setBlocks] = useState<string[]>([]);
  const [graph, setGraph] = useState(new Map());

  const getBlocks = (blocks: string[][]) => {
    return [...blocks]
      .map((block) => block.toString())
      .toString()
      .split(",");
  };

  useEffect(() => {
    setBlocks([...new Set(getBlocks(blocks_submitted))]);
  }, [blocks_submitted]);

  console.log(blocks);
  const addNode = (hash: string) => {
    setGraph((prev) => {
      prev.set(hash, []);
      return prev;
    });
  };

  const addEdge = (origin: string, destination: string) => {
    setGraph((prev) => {
      prev.get(origin)?.push(destination);
      prev.get(destination)?.push(origin);
      return prev;
    });
  };

  useEffect(() => {
    [...blocks].forEach((block) => addNode(block));
    blocks_submitted.forEach((block: string[]) => addEdge(block[0], block[1]));
  }, [blocks]);

  console.log(graph);

  return <div></div>;
};

export default Graph;
