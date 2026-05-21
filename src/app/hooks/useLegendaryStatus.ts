import { useState, useCallback } from "react";

const STORAGE_KEY = "legendary_nodes_v1";

function readStorage(): Set<string> {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? new Set(JSON.parse(stored)) : new Set();
  } catch {
    return new Set();
  }
}

function writeStorage(set: Set<string>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]));
  } catch {}
}

export function useLegendaryStatus() {
  const [legendaryNodes, setLegendaryNodes] = useState<Set<string>>(readStorage);

  const markAsLegendary = useCallback((nodeId: string) => {
    setLegendaryNodes(prev => {
      const next = new Set(prev);
      next.add(nodeId);
      writeStorage(next);
      return next;
    });
  }, []);

  const isLegendary = useCallback(
    (nodeId: string) => legendaryNodes.has(nodeId),
    [legendaryNodes]
  );

  return { legendaryNodes, markAsLegendary, isLegendary };
}