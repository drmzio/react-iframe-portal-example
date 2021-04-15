import React, { useEffect, useState } from 'react';
import FramePortal from './components/FramePortal';

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    window.setInterval(() => {
      setCount(prevCount => prevCount + 1);
    }, 1000);
  }, []);

  return (
    <div>
      <p>{count}</p>
      <FramePortal>
        <code>{count}</code>
      </FramePortal>
    </div>
  );
}

export default App;
