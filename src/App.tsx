import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const initialContent = '<!DOCTYPE html><html><head></head><body></body></html>';

interface FramePortalProviderProps {
  window: Window | null | undefined;
  document: Document | null | undefined;
  container: HTMLElement;
  children: any;
}

/**
 * Access to the window and document of the iframe.
 * Apply any custom code here, such as Stylesheets, Meta tags, etc.. to the head.
 * Or inject script tags into the document.body, what ever the fuck you want.
 */
const FramePortalProvider = React.memo(
  function FramePortalProvider(props: FramePortalProviderProps) {
    useEffect(() => {
      console.log(props.container, props.window, props.document);

      // Create a style tag.
      const styleEl = document.createElement('style');
      styleEl.textContent = 'body { margin: 0; background-color: red; }';
      props.document?.head.appendChild(styleEl);

      // Create a script tag.
      const scriptEl = document.createElement('script');
      scriptEl.type = 'text/javascript';
      scriptEl.textContent = `console.log('Hello world!', document.getElementById('frame-root'));`;
      props.document?.body.appendChild(scriptEl);

    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return props.children;
  }
);

interface FramePortalProps {
  children: any;
}

/**
 * Renders the iframe itself and its initial contents to work properly.
 * No custom code should be added here.
 */
const FramePortal = React.memo(
  function FramePortal(props: FramePortalProps) {
    const [isMounted, setIsMounted] = useState(false);
    const iframeRef = useRef<HTMLIFrameElement | null>(null);
    const containerEl = useRef<HTMLDivElement>(
      document.createElement('div')
    );

    useEffect(() => {
      containerEl.current.id = 'frame-root';

      setIsMounted(true);
    }, []);

    const renderFrame = useCallback(() => {
      if (!isMounted) {
        return null;
      }

      // @ts-ignore
      if (iframeRef.current?.contentDocument?.body.children.length < 1) {
        iframeRef.current?.contentDocument?.open('text/html', 'replace');
        iframeRef.current?.contentDocument?.write(initialContent);
        iframeRef.current?.contentDocument?.close();
      }


      if (iframeRef.current?.contentDocument?.body.firstChild !== containerEl.current) {
        iframeRef.current?.contentDocument?.body.appendChild(containerEl.current);
      }

      return (
        <FramePortalProvider
          window={iframeRef.current?.contentWindow}
          document={iframeRef.current?.contentDocument}
          container={containerEl.current}
        >
          {createPortal(props.children, containerEl.current)}
        </FramePortalProvider>
      );

    }, [isMounted, props.children]);

    return (
      <iframe title="iframe" ref={iframeRef}>
        {renderFrame()}
      </iframe>
    );
  }
);

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
