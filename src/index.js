import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import './index.css';
import App from './App';
import { AuthProvider } from './store/AuthProvider';
import { ArticlesProvider } from './store/ArticlesProvider';
import ScrollToTop from './hooks/ScrollToTop';
import store from './store/index';

ReactDOM.render(
  <Provider store={store}>
    <ArticlesProvider>
      <AuthProvider>
        <BrowserRouter>
          <ScrollToTop>
            <App />
          </ScrollToTop>
        </BrowserRouter>
      </AuthProvider>
    </ArticlesProvider>
  </Provider>,
  document.getElementById('root')
);
