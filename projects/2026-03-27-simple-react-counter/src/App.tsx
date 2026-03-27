import { useState } from "react";
import React  from "react";

export function App() {
  const [count, changeCount] = useState(0);
  return (
    <div>
      <p>count:{count}</p>
      <button onClick={()=>changeCount(c=> c+1)}>increment</button>
      <button onClick={()=> changeCount(c=> c-1)}>decrement</button>
    </div>
  )
}