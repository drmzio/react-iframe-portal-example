import React, { useState } from 'react';
import RenderMarkup from './components/RenderMarkup';

export interface INode {
  key: string;
  component: keyof JSX.IntrinsicElements;
  props: any;
  children: INode[];
}

function App() {
  const [markup, setMarkup] = useState<INode>({
    key: 'id_001', component: 'div',
    props: { className: 'position-relative' },
    children: [
      {
        key: 'id_004', component: 'nav',
        props: { className: 'navbar navbar-expand-md navbar-dark bg-dark mb-4' },
        children: [
          {
            key: 'id_005', component: 'div',
            props: { className: 'container' },
            children: [
              {
                key: 'id_006', component: 'a',
                props: { className: 'navbar-brand', href: '#', text: 'Top navbar' },
                children: [],
              },
              {
                key: 'id_007', component: 'div',
                props: { className: 'collapse navbar-collapse', id: 'navbarCollapse' },
                children: [
                  {
                    key: 'id_008', component: 'ul',
                    props: { className: 'navbar-nav me-auto mb-2 mb-md-0' },
                    children: [
                      {
                        key: 'id_009', component: 'li',
                        props: { className: 'nav-item' },
                        children: [
                          {
                            key: 'id_010', component: 'a',
                            props: { className: 'nav-link', href: '#', text: 'Home' },
                            children: [],
                          },
                        ],
                      },
                      {
                        key: 'id_011', component: 'li',
                        props: { className: 'nav-item' },
                        children: [
                          {
                            key: 'id_012', component: 'a',
                            props: { className: 'nav-link', href: '#', text: 'Projects' },
                            children: [],
                          },
                        ],
                      },
                      {
                        key: 'id_013', component: 'li',
                        props: { className: 'nav-item' },
                        children: [
                          {
                            key: 'id_014', component: 'a',
                            props: { className: 'nav-link', href: '#', text: 'Contact' },
                            children: [],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        key: 'id_016', component: 'main',
        props: { className: 'container' },
        children: [
          {
            key: 'id_017', component: 'div',
            props: { className: 'border border-1 mb-4 p-5 rounded' },
            children: [
              {
                key: 'id_018', component: 'h1',
                props: { text: 'Navbar example' },
                children: []
              },
              {
                key: 'id_019', component: 'p',
                props: { className: 'lead', text: 'ansdj ansjdn ajsnd jansdj najsnd jansjd najsndj najsd najsd.' },
                children: []
              },
              {
                key: 'id_020', component: 'button',
                props: { className: 'btn btn-lg btn-primary', type: 'button', text: 'View Docs',
                  'data-bs-toggle': 'tooltip', 'data-bs-placement': 'top', title: 'Hello world!' },
                children: []
              },
            ]
          },
          {
            key: 'id_002', component: 'form',
            props: { method: 'POST', action: '/' },
            children: [
              {
                key: 'id_003', component: 'input',
                props: { type: 'text', className: 'form-control form-control-lg', placeholder: 'John Doe' },
                children: []
              }
            ]
          },
        ]
      },
    ]
  });

  // const [count, setCount] = useState(0);
  // useEffect(() => {
  //   setInterval(() => {
  //     setCount(c => c + 1);
  //   }, 1000);
  // }, []);

  return (
    <div style={{ height: '100vh', overflow: 'hidden' }}>
      <RenderMarkup
        markup={markup}
      />
    </div>
  );
}

export default App;
