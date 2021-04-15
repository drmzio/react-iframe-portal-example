import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
//import FramePortalProvider from './FramePortalProvider';

const initialContent = '<!DOCTYPE html><html><head></head><body></body></html>';

interface FramePortalProps {
  children: any;
  d?: (d: Document, w: Window) => void;
}

/**
 * Renders the iframe itself and its initial contents to work properly.
 * No custom code should be added here.
 */
const FramePortal = React.memo(
  function FramePortal(props: FramePortalProps) {
    const [frameRef, setFrameRef] = useState<HTMLIFrameElement | null>(null);
    const hasRendered = useRef(false);
    const containerEl = useRef<HTMLDivElement>(
      document.createElement('div')
    );

    useEffect(() => {
      containerEl.current.id = 'frame-root';
    }, []);

    const renderFrame = useCallback(() => {
      if (!frameRef) {
        return null;
      }

      // Fix: Firefox refuses to generate default HTML markup.
      // @ts-ignore
      if (frameRef?.contentDocument?.body.children.length < 1) {
        frameRef?.contentDocument?.open('text/html', 'replace');
        frameRef?.contentDocument?.write(initialContent);
        frameRef?.contentDocument?.close();
      }

      if (!frameRef?.contentDocument?.body.contains(containerEl.current)) {
        frameRef?.contentDocument?.body.appendChild(containerEl.current);
      }

      if (!hasRendered.current && props.d) {
        props.d(
          frameRef.contentDocument as Document,
          frameRef.contentWindow as Window,
        );
        hasRendered.current = true;
      }

      return createPortal(props.children, containerEl.current);

      // return (
      //   <FramePortalProvider
      //     window={frameRef?.contentWindow}
      //     document={frameRef?.contentDocument}
      //     container={containerEl.current}
      //   >
      //     {createPortal(props.children, containerEl.current)}
      //   </FramePortalProvider>
      // );

    }, [frameRef, props.children]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
      <iframe
        ref={setFrameRef}
        title="iframe"
        scrolling="no"
        frameBorder="0"
        width="100%"
      >
        {renderFrame()}
      </iframe>
    );
  }
);

export default FramePortal;
