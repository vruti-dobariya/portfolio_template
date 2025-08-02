// App.jsx
import React, { useEffect, lazy, Suspense, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

// Lazy-loaded components mapped by templateId like 'A1', 'B1', etc.
const componentMap = {
  'A1': lazy(() => import('./portfolio1/portfolio1.jsx')),
  'B1': lazy(() => import('./portfolio2/portfolio2.jsx')),
  'C1': lazy(() => import('./portfolio3/portfolio3.jsx')),
  'D1': lazy(() => import('./portfolio4/portfolio4.jsx')),
  'E1': lazy(() => import('./portfolio5/portfolio5.jsx')),
  'F1': lazy(() => import('./portfolio6/portfolio6.jsx')),
  'G1': lazy(() => import('./portfolio7/portfolio7.jsx')),
  'H1': lazy(() => import('./portfolio8/portfolio8.jsx')),
  'I1': lazy(() => import('./portfolio9/portfolio9.jsx')),
  'J1': lazy(() => import('./freecard/freecard.jsx')),
};

function App() {
  const [templateId, setTemplateId] = useState(null);

  useEffect(() => {
    axios
      .get('/template_section/all')
      .then((res) => {
        const id = res?.data?.data?.userTemplate?.[0]?.templateId;
        setTemplateId(id);
      })
      .catch((err) => {
        console.error('Error fetching template data:', err);
      });
  }, []);

  useEffect(() => {
    if (templateId === 'E1') {
      document.body.className =
        'home dark:dark font-Poppins text-fs-16 dark:text-white text-black-6 font-medium leading-lh-1.6 relative w-full h-full dark:bg-black bg-white overflow-hidden';
    } else {
      document.body.className = 'dark-body';
    }
  }, [templateId]);

  const DynamicComponent = templateId ? componentMap[templateId] || componentMap['A1'] : null;

  const content = (
    <Suspense fallback={<div>Loading Template...</div>}>
      {DynamicComponent && <DynamicComponent />}
    </Suspense>
  );

  return templateId === 'C1' ? <BrowserRouter>{content}</BrowserRouter> : content;
}

export default App;
