import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import { CountryProvider } from './store/CountryProvider';
import { ArticlesProvider } from './store/ArticlesProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CountryProvider>
    <ArticlesProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ArticlesProvider>
  </CountryProvider>
);
