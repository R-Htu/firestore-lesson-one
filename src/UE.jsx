import { useState, useEffect } from "react";

export default function Timer2() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setTimeout(() => {
      setCount(c => c + 1);
    }, 1000);

    return () => clearTimeout(id);
  }, []);

  return <h1>{count}</h1>;
}