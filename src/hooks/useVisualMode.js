import React, { useState } from "react";

export default function useVisualMode(initialMode) {
  // const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);

  function transition(mode, replace = false)  {
    setHistory(prev => 
      replace ? [...prev.slice(0, prev.length - 1), mode] : [...prev, mode]
    );
  }

  function back() {
    if (history.length < 2) {
      return;
    } else {
    console.log('HISTORY LENGTH:', history.length)
    setHistory(prev => [...prev.slice(0, history.length - 1)]);
    } 
  }
  return { mode: history[history.length - 1], transition, back };
};