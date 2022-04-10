import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import { AuthProvider } from './store/AuthProvider';
import { CountryProvider } from './store/CountryProvider';
import { ArticlesProvider } from './store/ArticlesProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <CountryProvider>
      <ArticlesProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ArticlesProvider>
    </CountryProvider>
  </AuthProvider>
);
