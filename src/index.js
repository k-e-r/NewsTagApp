import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import { AuthProvider } from './store/AuthProvider';
import { CountryProvider } from './store/CountryProvider';
import { ArticlesProvider } from './store/ArticlesProvider';
import ScrollToTop from './hooks/ScrollToTop';
import SetBookmark from './hooks/SetBookmark';

ReactDOM.render(
  <CountryProvider>
    <ArticlesProvider>
      <AuthProvider>
        <BrowserRouter>
          <ScrollToTop>
            <SetBookmark>
              <App />
            </SetBookmark>
          </ScrollToTop>
        </BrowserRouter>
      </AuthProvider>
    </ArticlesProvider>
  </CountryProvider>,
  document.getElementById('root')
);
