import React, { useEffect } from 'react';

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
      // const styleEl = document.createElement('style');
      // styleEl.textContent = 'body { margin: 0; background-color: red; }';
      // props.document?.head.appendChild(styleEl);

      // Create a script tag.
      const scriptEl = document.createElement('script');
      scriptEl.type = 'text/javascript';
      scriptEl.textContent = `console.log('Hello world!', document.getElementById('frame-root'));`;
      props.document?.body.appendChild(scriptEl);

    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return props.children;
  }
);

export default FramePortalProvider;
