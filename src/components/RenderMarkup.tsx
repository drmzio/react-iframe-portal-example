import React, { ReactElement } from 'react';
import ReactDOMServer from 'react-dom/server';
import FramePortal from './FramePortal';
import { INode } from '../App';

interface IProps {
  markup: INode;
}

type NextType = (children: INode[]) => ReactElement[] | null;

const renderMarkup = (markup: INode) => {
  const next: NextType = (children) => {
    if (children.length > 0) {
      return children.map(n => renderNode(n, next));
    } else {
      return null;
    }
  };

  const renderNode = (node: INode, next: NextType) => {
    return React.createElement(node.component, {
      key: node.key,
      'data-key': node.key,
      ...node.props,
      children: (node.props?.text) ? node.props.text : next(node.children),
    });
  };

  return renderNode(markup, next);
};

export default function RenderMarkup(props: IProps) {
  const injectToFrame = (contentDocument: Document, contentWindow: Window) => {
    console.log(contentDocument, contentWindow);
    const htmlHead = [];

    contentDocument.documentElement.lang = 'en';
    contentDocument.title = 'Document';

    const metaCharset = contentDocument.createElement('meta');
    metaCharset.setAttribute('charset', 'utf-8');
    htmlHead.push(metaCharset);

    const metaViewport = contentDocument.createElement('meta');
    metaViewport.name = 'viewport'; metaViewport.content = 'width=device-width, initial-scale=1';
    htmlHead.push(metaViewport);

    const stylesheetEl = contentDocument.createElement('link');
    stylesheetEl.rel = 'stylesheet';
    stylesheetEl.href = 'https://unpkg.com/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css';
    htmlHead.push(stylesheetEl);

    const styleEl = contentDocument.createElement('style');
    styleEl.textContent = 'body { background-color: var(--bs-light); }';
    htmlHead.push(styleEl);

    htmlHead.forEach(headElement => {
      contentDocument.head.appendChild(headElement);
    });

    const scriptEl = contentDocument.createElement('script');
    scriptEl.src = 'https://unpkg.com/bootstrap@5.0.0-beta3/dist/js/bootstrap.bundle.min.js';
    contentDocument.body.appendChild(scriptEl);

    const tooltipScript = contentDocument.createElement('script');
    tooltipScript.innerText = `console.log('e', document.querySelectorAll('[data-bs-toggle="tooltip"]'));`;
    contentDocument.body.appendChild(tooltipScript);
  };

  return (
    <FramePortal
      inject={injectToFrame}
      style={{ height: '100%' }}
    >
      {ReactDOMServer.renderToStaticMarkup(renderMarkup(props.markup))}
    </FramePortal>
  )
}
