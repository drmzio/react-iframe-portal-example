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
      <FramePortal
        d={(d, w) => {
          console.log(d, w);

          const stylesheetEl = d.createElement('link');
          stylesheetEl.rel = 'stylesheet';
          stylesheetEl.href = 'https://unpkg.com/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css';
          d.head.appendChild(stylesheetEl);

          const styleEl = d.createElement('style');
          styleEl.textContent = 'body { background-color: var(--bs-pink); }';
          d.head.appendChild(styleEl);
        }}
      >
        <div>{count}</div>
      </FramePortal>
      {/*<FramePortal>
        <code>{count}</code>
        <textarea className="form-control" />
      </FramePortal>*/}
    </div>
  );
}

export default App;
