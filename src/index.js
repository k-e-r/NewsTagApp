import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import './index.css';
import App from './App';
import { AuthProvider } from './store/AuthProvider';
import ScrollToTop from './hooks/ScrollToTop';
import store from './store/index';

ReactDOM.render(
  <Provider store={store}>
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop>
          <App />
        </ScrollToTop>
      </BrowserRouter>
    </AuthProvider>
  </Provider>,
  document.getElementById('root')
);
