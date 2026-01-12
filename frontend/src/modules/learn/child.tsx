"use client"
import React from "react";

function Child({ onHello }) {
  console.log("Child rendered!");
  return <button onClick={onHello}>Click Child</button>;
}

export default React.memo(Child); // Memo to test re-render prevention
