import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import { AuthProvider } from './store/AuthProvider';
import { CountryProvider } from './store/CountryProvider';
import { ArticlesProvider } from './store/ArticlesProvider';
import ScrollToTop from './hooks/ScrollToTop';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <CountryProvider>
      <ArticlesProvider>
        <BrowserRouter>
          <ScrollToTop>
            <App />
          </ScrollToTop>
        </BrowserRouter>
      </ArticlesProvider>
    </CountryProvider>
  </AuthProvider>
);
