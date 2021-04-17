import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
//import FramePortalProvider from './FramePortalProvider';

const initialContent = '<!DOCTYPE html><html><head></head><body></body></html>';

interface FramePortalProps {
  children: any;
  inject?: (d: Document, w: Window) => void;
  style?: React.CSSProperties,
}

let hasRendered = false;

/**
 * Renders the iframe itself and its initial contents to work properly.
 * No custom code should be added here.
 */
const FramePortal = React.memo(
  function FramePortal(props: FramePortalProps) {
    const [frameRef, setFrameRef] = useState<HTMLIFrameElement | null>(null);
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

      if (!hasRendered && props.inject) {
        props.inject(
          frameRef.contentDocument as Document,
          frameRef.contentWindow as Window,
        );

        hasRendered = true;
      }

      return createPortal(
        (typeof props.children === 'string')
          ? (<div dangerouslySetInnerHTML={{ __html: props.children }} />)
          : props.children,
        containerEl.current
      );

    }, [frameRef, props.children]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
      <iframe
        ref={setFrameRef}
        title="iframe"
        scrolling="no"
        frameBorder="0"
        width="100%"
        style={props.style}
      >
        {renderFrame()}
      </iframe>
    );
  }
);

export default FramePortal;
