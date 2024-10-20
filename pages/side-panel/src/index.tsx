import { createRoot } from 'react-dom/client';
import '@src/index.css';
import './styles/highlight.scss';
import './styles/markdown.scss';
import { space } from '@extension/shared';

import SidePanel from '@src/SidePanel';

function init() {
  const appContainer = document.querySelector('#app-container');
  if (!appContainer) {
    throw new Error('Can not find #app-container');
  }
  const root = createRoot(appContainer);
  root.render(<SidePanel />);
}

init();
